import { useLocation, useNavigate } from 'react-router-dom';
import { Home, ClipboardList, Sparkles, Bookmark, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigationDirection, getRouteIndex } from '@/contexts/NavigationDirection';
import { useRef } from 'react';

const NAV_ITEMS = [
  { icon: Home, label: 'Home', path: '/student-type', id: 'home' },
  { icon: ClipboardList, label: 'Marks', path: '/marks', id: 'marks' },
  { icon: Sparkles, label: 'Reco', path: '/recommendations', id: 'reco' },
  { icon: Bookmark, label: 'Saved', path: '/bookmarks', id: 'saved' },
  { icon: User, label: 'Profile', path: '/profile', id: 'profile' },
];

export function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const { setDirection } = useNavigationDirection();
  const lastRouteRef = useRef(location.pathname);

  const marksPages = ['/marks', '/school-marks', '/college-marks', '/results'];

  const isActive = (item: typeof NAV_ITEMS[0]) => {
    if (item.id === 'marks') return marksPages.includes(location.pathname);
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
      className="fixed bottom-0 left-0 right-0 z-[100]"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="mx-5 mb-4">
        <div
          className="relative flex items-center justify-around bg-card/80 backdrop-blur-2xl border border-border/30 rounded-2xl px-1 py-2"
          style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}
        >
          {NAV_ITEMS.map((item) => {
            const { icon: Icon, label, path } = item;
            const active = isActive(item);
            return (
              <motion.button
                key={path}
                onClick={() => handleNavigate(path)}
                whileTap={{ scale: 0.85, transition: { duration: 0.06 } }}
                className="relative flex flex-col items-center justify-center z-10 gap-1 min-w-[44px]"
              >
                {/* Icon */}
                <motion.div
                  animate={active
                    ? { y: -2, scale: [1, 1.18, 1] }
                    : { y: 0, scale: 1 }
                  }
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Icon
                    className={`w-[21px] h-[21px] transition-colors duration-300 ${
                      active ? 'text-primary' : 'text-muted-foreground/60'
                    }`}
                    strokeWidth={active ? 2.4 : 1.5}
                  />
                </motion.div>

                {/* Line connector + dot */}
                {active && (
                  <motion.div
                    className="flex flex-col items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2, delay: 0.05 }}
                  >
                    <motion.div
                      className="w-[1.5px] h-[6px] bg-primary/40 rounded-full"
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                    />
                    <motion.div
                      layoutId="navDot"
                      className="w-[5px] h-[5px] rounded-full bg-primary mt-[1px]"
                      transition={{ type: 'spring', stiffness: 500, damping: 32 }}
                    />
                  </motion.div>
                )}
                {!active && <div className="h-[14px]" />}
              </motion.button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
