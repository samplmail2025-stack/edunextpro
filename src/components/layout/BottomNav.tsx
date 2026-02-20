import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Calculator, Star, Bookmark, User } from 'lucide-react';

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

  const isActive = (path: string) => location.pathname === path || (path === '/school-marks' && ['/school-marks', '/college-marks', '/results'].includes(location.pathname));

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-border" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <div className="flex items-center justify-around px-2 py-2">
        {NAV_ITEMS.map(({ icon: Icon, label, path }) => {
          const active = isActive(path);
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-2xl transition-all duration-200 ${
                active
                  ? 'gradient-primary text-white shadow-md scale-105'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon className={`w-5 h-5 ${active ? 'text-white' : ''}`} />
              <span className={`text-[10px] font-medium ${active ? 'text-white' : ''}`}>{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
