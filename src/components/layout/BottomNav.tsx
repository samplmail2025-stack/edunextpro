import { useLocation, useNavigate } from 'react-router-dom';
import { Home, ClipboardList, Sparkles, Bookmark, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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
    if (item.id === 'marks') {
      return marksPages.includes(location.pathname);
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
      className="fixed bottom-0 left-0 right-0 z-[100]"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="mx-4 mb-4">
        <div
          className="relative flex items-center justify-around bg-foreground/95 backdrop-blur-xl rounded-full px-2 py-1.5"
          style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.05) inset' }}
        >
          {NAV_ITEMS.map((item) => {
            const { icon: Icon, label, path } = item;
            const active = isActive(item);
            return (
              <motion.button
                key={path}
                onClick={() => handleNavigate(path)}
                whileTap={{ scale: 0.88, transition: { duration: 0.06 } }}
                className="relative flex flex-col items-center justify-center z-10 py-1.5 px-3 min-w-[48px]"
              >
                {/* Active background bubble */}
                <AnimatePresence>
                  {active && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0.5 rounded-full"
                      style={{
                        background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))',
                      }}
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.6 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </AnimatePresence>

                {/* Icon */}
                <motion.div
                  animate={active
                    ? { scale: [1, 1.2, 0.95, 1.05, 1], y: [0, -2, 0] }
                    : { scale: 1, y: 0 }
                  }
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="relative z-10 mb-0.5"
                >
                  <Icon
                    className={`w-[20px] h-[20px] transition-colors duration-200 ${
                      active ? 'text-primary-foreground' : 'text-muted-foreground'
                    }`}
                    strokeWidth={active ? 2.5 : 1.6}
                  />
                </motion.div>

                {/* Label */}
                <motion.span
                  animate={{ opacity: active ? 1 : 0.5 }}
                  className={`text-[9px] font-bold uppercase tracking-widest relative z-10 transition-colors duration-200 ${
                    active ? 'text-primary-foreground' : 'text-muted-foreground'
                  }`}
                >
                  {label}
                </motion.span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
