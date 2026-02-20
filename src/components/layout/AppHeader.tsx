import { ArrowLeft, Bell, MoreVertical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface AppHeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  backPath?: string;
  rightElement?: React.ReactNode;
  gradient?: boolean;
}

export function AppHeader({ title, subtitle, showBack = false, backPath, rightElement, gradient = false }: AppHeaderProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (backPath) navigate(backPath);
    else navigate(-1);
  };

  return (
    <header className={`sticky top-0 z-40 ${gradient ? 'gradient-primary text-white' : 'bg-card/80 backdrop-blur-md border-b border-border'}`}>
      <div className="flex items-center gap-3 px-4 py-3">
        {showBack && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBack}
            className={`rounded-full -ml-2 ${gradient ? 'text-white hover:bg-white/20' : ''}`}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
        )}
        <div className="flex-1 min-w-0">
          <h1 className={`font-bold text-lg leading-tight truncate ${gradient ? 'text-white' : 'text-foreground'}`}>
            {title}
          </h1>
          {subtitle && (
            <p className={`text-xs truncate ${gradient ? 'text-white/80' : 'text-muted-foreground'}`}>
              {subtitle}
            </p>
          )}
        </div>
        {rightElement || (
          <Button
            variant="ghost"
            size="icon"
            className={`rounded-full ${gradient ? 'text-white hover:bg-white/20' : ''}`}
          >
            <Bell className="w-5 h-5" />
          </Button>
        )}
      </div>
    </header>
  );
}
