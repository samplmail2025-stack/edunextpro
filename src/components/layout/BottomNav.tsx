import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Calculator, Star, Bookmark, User } from 'lucide-react';
import { motion } from 'framer-motion';

const NAV_ITEMS = [
  { icon: Home, label: 'Home', path: '/student-type' },
  { icon: Calculator, label: 'Marks', path: '/school-marks' },
  { icon: Star, label: 'Reco.', path: '/recommendations' },
  { icon: Bookmark, label: 'Saved', path: '/bookmarks' },
  { icon: User, label: 'Profile', path: '/profile' },
];

export function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) =>
    location.pathname === path ||
    (path === '/school-marks' && ['/school-marks', '/college-marks', '/results'].includes(location.pathname));

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-2xl border-t border-border/50"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="flex items-center justify-around px-2 py-2">
        {NAV_ITEMS.map(({ icon: Icon, label, path }) => {
          const active = isActive(path);
          return (
            <motion.button
              key={path}
              onClick={() => navigate(path)}
              whileTap={{ scale: 0.85 }}
              className="relative flex flex-col items-center gap-1 px-4 py-1.5 rounded-2xl transition-colors duration-200"
            >
              <Icon
                className={`w-5 h-5 transition-colors duration-200 ${active ? 'text-primary' : 'text-muted-foreground'}`}
                strokeWidth={active ? 2.5 : 1.8}
              />
              <span className={`text-[10px] font-semibold transition-colors duration-200 ${active ? 'text-primary' : 'text-muted-foreground'}`}>
                {label}
              </span>
              {active && (
                <motion.div
                  layoutId="navPill"
                  className="absolute -bottom-1 w-5 h-1 rounded-full gradient-primary"
                  style={{ boxShadow: '0 2px 8px hsl(var(--primary) / 0.4)' }}
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
}
