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
      className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-xl border-t border-border"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)', boxShadow: '0 -4px 30px rgba(0,0,0,0.08)' }}
    >
      <div className="flex items-center justify-around px-1 py-1.5">
        {NAV_ITEMS.map(({ icon: Icon, label, path }) => {
          const active = isActive(path);
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className="relative flex flex-col items-center gap-0.5 px-4 py-2 rounded-2xl transition-all duration-200"
            >
              {active && (
                <motion.div
                  layoutId="navIndicator"
                  className="absolute inset-0 gradient-primary rounded-2xl"
                  style={{ boxShadow: '0 4px 15px rgba(99,102,241,0.35)' }}
                  transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
                />
              )}
              <Icon className={`relative z-10 w-5 h-5 transition-colors ${active ? 'text-white' : 'text-muted-foreground'}`} />
              <span className={`relative z-10 text-[10px] font-semibold transition-colors ${active ? 'text-white' : 'text-muted-foreground'}`}>
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
