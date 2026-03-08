import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Calculator, Star, Bookmark, User } from 'lucide-react';
import { LayoutGroup, motion } from 'framer-motion';
import { useNavigationDirection, getRouteIndex } from '@/contexts/NavigationDirection';
import { useRef } from 'react';

const NAV_ITEMS = [
  { icon: Home, label: 'Home', path: '/student-type', id: 'home' },
  { icon: Calculator, label: 'Marks', path: '/student-type', id: 'marks' },
  { icon: Star, label: 'Reco.', path: '/recommendations', id: 'reco' },
  { icon: Bookmark, label: 'Saved', path: '/bookmarks', id: 'saved' },
  { icon: User, label: 'Profile', path: '/profile', id: 'profile' },
];

export function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const { setDirection } = useNavigationDirection();
  const lastRouteRef = useRef(location.pathname);

  const marksPages = ['/school-marks', '/college-marks', '/results'];

  const isActive = (item: typeof NAV_ITEMS[0]) => {
    if (item.id === 'marks') {
      return marksPages.includes(location.pathname);
    }
    if (item.id === 'home') {
      return location.pathname === '/student-type' && !marksPages.includes(location.pathname);
    }
    return location.pathname === item.path;
  };

  const handleNavigate = (targetPath: string) => {
    const currentIdx = getRouteIndex(location.pathname);
    const targetIdx = getRouteIndex(targetPath);

    if (currentIdx >= 0 && targetIdx >= 0) {
      setDirection(targetIdx > currentIdx ? 'right' : targetIdx < currentIdx ? 'left' : 'none');
    } else {
      setDirection('none');
    }

    lastRouteRef.current = targetPath;
    navigate(targetPath);
  };

  return (
    <nav
      className="fixed bottom-4 left-4 right-4 z-[100]"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <LayoutGroup id="bottom-nav">
        <div
          className="relative flex items-center justify-around bg-card/95 backdrop-blur-xl border border-border rounded-[28px] px-2 py-2.5"
          style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)' }}
        >
          {NAV_ITEMS.map(({ icon: Icon, label, path }) => {
            const active = isActive(path);
            return (
              <motion.button
                key={path}
                onClick={() => handleNavigate(path)}
                whileTap={{ scale: 0.85 }}
                className="relative flex flex-col items-center gap-0.5 z-10 px-2"
              >
                <motion.div
                  className="relative flex items-center justify-center"
                  animate={active ? { y: -14, scale: 1 } : { y: 0, scale: 1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                >
                  {active && (
                    <motion.div
                      layoutId="navSquare"
                      className="absolute w-14 h-14 rounded-2xl gradient-primary"
                      style={{ boxShadow: '0 8px 24px rgba(99,102,241,0.45)' }}
                      transition={{ type: 'spring', stiffness: 500, damping: 32 }}
                    />
                  )}
                  <motion.div
                    animate={active ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  >
                    <Icon className={`relative z-10 w-5 h-5 transition-colors duration-200 ${active ? 'text-white' : 'text-muted-foreground'}`} />
                  </motion.div>
                </motion.div>
                <span className={`text-[9px] font-bold tracking-wide transition-colors duration-200 ${active ? 'text-primary' : 'text-muted-foreground'}`}>
                  {label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </LayoutGroup>
    </nav>
  );
}
