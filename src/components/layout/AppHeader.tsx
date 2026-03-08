import { ArrowLeft, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface AppHeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  backPath?: string;
  rightElement?: React.ReactNode;
  gradient?: boolean;
  icon?: React.ReactNode;
}

export function AppHeader({ title, subtitle, showBack = false, backPath, rightElement, gradient = false, icon }: AppHeaderProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (backPath) navigate(backPath);
    else navigate(-1);
  };

  if (gradient) {
    return (
      <header className="sticky top-0 z-40">
        <div className="relative overflow-hidden bg-gradient-to-r from-primary via-primary/95 to-primary/85">
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/[0.04]" />
            <div className="absolute top-1/2 -left-4 w-16 h-16 rounded-full bg-white/[0.03]" />
            <div className="absolute -bottom-3 right-1/3 w-20 h-20 rounded-full bg-white/[0.03]" />
          </div>

          <div className="relative flex items-center gap-3 px-4 py-3.5">
            {showBack && (
              <motion.button
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                onClick={handleBack}
                className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center -ml-1 hover:bg-white/20 active:scale-95 transition-all"
              >
                <ArrowLeft className="w-4.5 h-4.5 text-white" />
              </motion.button>
            )}

            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.05 }}
              className="flex-1 min-w-0"
            >
              <div className="flex items-center gap-2">
                {icon && <span className="flex-shrink-0">{icon}</span>}
                <h1 className="font-bold text-lg text-white leading-tight truncate tracking-tight">
                  {title}
                </h1>
              </div>
              {subtitle && (
                <p className="text-[11px] text-white/60 truncate mt-0.5 font-medium tracking-wide">
                  {subtitle}
                </p>
              )}
            </motion.div>

            {rightElement && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                {rightElement}
              </motion.div>
            )}
          </div>

          {/* Bottom edge gradient fade */}
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>
      </header>
    );
  }

  // Non-gradient variant
  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border/60">
      <div className="flex items-center gap-3 px-4 py-3">
        {showBack && (
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleBack}
            className="w-9 h-9 rounded-xl bg-muted/80 flex items-center justify-center -ml-1 hover:bg-muted active:scale-95 transition-all"
          >
            <ArrowLeft className="w-4.5 h-4.5 text-foreground" />
          </motion.button>
        )}

        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="flex-1 min-w-0"
        >
          <div className="flex items-center gap-2">
            {icon && <span className="flex-shrink-0">{icon}</span>}
            <h1 className="font-bold text-lg text-foreground leading-tight truncate tracking-tight">
              {title}
            </h1>
          </div>
          {subtitle && (
            <p className="text-[11px] text-muted-foreground truncate mt-0.5 font-medium">
              {subtitle}
            </p>
          )}
        </motion.div>

        {rightElement && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {rightElement}
          </motion.div>
        )}
      </div>
    </header>
  );
}
