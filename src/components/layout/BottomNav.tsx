import { useLocation, useNavigate } from 'react-router-dom';
import { Home, ClipboardList, Sparkles, Bookmark, User } from 'lucide-react';
import { motion, LayoutGroup } from 'framer-motion';
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
      {/* Fade-out gradient so content doesn't hard-cut behind the bar */}
      <div
        className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
        style={{ background: 'linear-gradient(to top, hsl(var(--background)), transparent)' }}
      />

      <LayoutGroup id="bottom-nav">
        <div className="relative mx-4 mb-3">
          <div
            className="relative grid grid-cols-5 items-center rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(15,15,20,0.88), rgba(25,25,35,0.92))',
              backdropFilter: 'blur(24px) saturate(1.8)',
              WebkitBackdropFilter: 'blur(24px) saturate(1.8)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.06) inset, 0 1px 0 rgba(255,255,255,0.04) inset',
            }}
          >
            {NAV_ITEMS.map((item) => {
              const { icon: Icon, label, path } = item;
              const active = isActive(item);
              return (
                <motion.button
                  key={path}
                  onClick={() => handleNavigate(path)}
                  whileTap={{ scale: 0.92, transition: { duration: 0.05 } }}
                  className="relative flex flex-col items-center justify-center py-2.5 gap-[3px]"
                >
                  {/* Top accent bar */}
                  {active && (
                    <motion.div
                      layoutId="topBar"
                      className="absolute top-0 inset-x-3 h-[2.5px] rounded-b-full"
                      style={{ background: 'linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)))' }}
                      transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                    />
                  )}

                  {/* Icon */}
                  <motion.div
                    animate={active
                      ? { scale: [1, 1.15, 1], y: 0 }
                      : { scale: 1, y: 0 }
                    }
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Icon
                      className={`w-[20px] h-[20px] transition-colors duration-200 ${
                        active ? 'text-white' : 'text-white/30'
                      }`}
                      strokeWidth={active ? 2.3 : 1.5}
                    />
                  </motion.div>

                  {/* Label */}
                  <span
                    className={`text-[9px] font-semibold tracking-wide transition-colors duration-200 ${
                      active ? 'text-white' : 'text-white/25'
                    }`}
                  >
                    {label}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </LayoutGroup>
    </nav>
  );
}
