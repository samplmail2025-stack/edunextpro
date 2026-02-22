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

  const activeIndex = NAV_ITEMS.findIndex((item) => isActive(item.path));

  return (
    <nav
      className="fixed bottom-4 left-4 right-4 z-50"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div
        className="relative flex items-center justify-around bg-card/95 backdrop-blur-xl border border-border rounded-[28px] px-2 py-2"
        style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)' }}
      >
        {NAV_ITEMS.map(({ icon: Icon, label, path }, index) => {
          const active = isActive(path);
          return (
            <motion.button
              key={path}
              onClick={() => navigate(path)}
              whileTap={{ scale: 0.85 }}
              className="relative flex flex-col items-center gap-0.5 z-10 px-3 py-1.5"
            >
              {active && (
                <motion.div
                  layoutId="navBubble"
                  className="absolute -top-1 left-1/2 -translate-x-1/2 w-12 h-[calc(100%+8px)] gradient-primary rounded-[20px]"
                  style={{ boxShadow: '0 6px 20px rgba(99,102,241,0.4)' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <Icon className={`relative z-10 w-5 h-5 transition-colors duration-200 ${active ? 'text-white' : 'text-muted-foreground'}`} />
              <span className={`relative z-10 text-[9px] font-bold tracking-wide transition-colors duration-200 ${active ? 'text-white' : 'text-muted-foreground'}`}>
                {label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
}
