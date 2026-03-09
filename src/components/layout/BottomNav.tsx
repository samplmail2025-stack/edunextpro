import { useLocation, useNavigate } from 'react-router-dom';
import { Home, ClipboardList, Sparkles, Bookmark, User } from 'lucide-react';
import { LayoutGroup, motion } from 'framer-motion';
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
      <LayoutGroup id="bottom-nav">
        <div className="relative mx-3 mb-3">
          {/* Soft glow behind the bar */}
          <div
            className="absolute inset-0 rounded-[22px] opacity-40 blur-xl -z-10"
            style={{ background: 'linear-gradient(135deg, hsl(var(--primary) / 0.3), hsl(var(--accent) / 0.2))' }}
          />

          <div
            className="relative flex items-center justify-around bg-card/90 backdrop-blur-2xl border border-border/50 rounded-[22px] px-1 py-1"
            style={{ boxShadow: '0 -2px 20px rgba(0,0,0,0.06), 0 4px 30px rgba(0,0,0,0.1)' }}
          >
            {NAV_ITEMS.map((item) => {
              const { icon: Icon, label, path } = item;
              const active = isActive(item);
              return (
                <motion.button
                  key={path}
                  onClick={() => handleNavigate(path)}
                  whileTap={{ scale: 0.9 }}
                  className="relative flex flex-col items-center justify-center z-10 py-2 px-3 min-w-[52px]"
                >
                  {/* Active pill background */}
                  {active && (
                    <motion.div
                      layoutId="navPill"
                      className="absolute inset-1 rounded-2xl"
                      style={{
                        background: 'linear-gradient(135deg, hsl(var(--primary) / 0.12), hsl(var(--accent) / 0.1))',
                      }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}

                  {/* Icon */}
                  <motion.div
                    animate={active ? { scale: [1, 1.15, 1] } : { scale: 1 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="relative z-10 mb-0.5"
                  >
                    <Icon
                      className={`w-[22px] h-[22px] transition-colors duration-200 ${
                        active ? 'text-primary' : 'text-muted-foreground'
                      }`}
                      strokeWidth={active ? 2.5 : 1.8}
                    />
                  </motion.div>

                  {/* Label */}
                  <motion.span
                    animate={{ opacity: active ? 1 : 0.7 }}
                    className={`text-[10px] font-semibold tracking-wide relative z-10 transition-colors duration-200 ${
                      active ? 'text-primary' : 'text-muted-foreground'
                    }`}
                  >
                    {label}
                  </motion.span>

                  {/* Active dot indicator */}
                  {active && (
                    <motion.div
                      layoutId="navDot"
                      className="absolute -bottom-0.5 w-1 h-1 rounded-full bg-primary"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </LayoutGroup>
    </nav>
  );
}
