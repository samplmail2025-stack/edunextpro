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
      className="fixed bottom-0 left-0 right-0 z-[100] flex justify-center"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="mb-4">
        <div
          className="relative flex items-center rounded-full px-1.5 py-1.5"
          style={{
            background: 'linear-gradient(135deg, hsl(var(--secondary)), hsl(var(--card)))',
            boxShadow: '0 4px 24px hsl(var(--primary) / 0.12), 0 0 0 1px hsl(var(--border) / 0.5)',
          }}
        >
          {NAV_ITEMS.map((item) => {
            const { icon: Icon, label, path } = item;
            const active = isActive(item);
            return (
              <motion.button
                key={path}
                onClick={() => handleNavigate(path)}
                whileTap={{ scale: 0.9, transition: { duration: 0.05 } }}
                className="relative flex items-center justify-center z-10 h-10 rounded-full overflow-hidden"
                style={{ width: active ? 96 : 44 }}
              >
                {/* Active pill bg */}
                <AnimatePresence>
                  {active && (
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))',
                        boxShadow: '0 2px 12px hsl(var(--primary) / 0.35)',
                      }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                    />
                  )}
                </AnimatePresence>

                <div className="relative z-10 flex items-center justify-center gap-1.5">
                  <motion.div
                    animate={active ? { scale: [1, 1.12, 1] } : { scale: 1 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Icon
                      className={`w-[20px] h-[20px] transition-colors duration-200 ${
                        active ? 'text-primary-foreground' : 'text-muted-foreground'
                      }`}
                      strokeWidth={active ? 2.3 : 1.6}
                    />
                  </motion.div>

                  {active && (
                    <motion.span
                      initial={{ opacity: 0, x: -4 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.15, delay: 0.05 }}
                      className="text-[11px] font-semibold text-primary-foreground whitespace-nowrap"
                    >
                      {label}
                    </motion.span>
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
