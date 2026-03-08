import { motion } from 'framer-motion';

interface CircularProgressProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  sublabel?: string;
  colorClass?: 'primary' | 'green' | 'orange' | 'purple' | 'teal';
}

const COLORS: Record<string, { main: string; glow: string; bg: string; track: string }> = {
  primary: { main: '#6366f1', glow: '#818cf8', bg: '#eef2ff', track: '#e0e7ff' },
  green: { main: '#16a34a', glow: '#22c55e', bg: '#f0fdf4', track: '#dcfce7' },
  orange: { main: '#ea580c', glow: '#f97316', bg: '#fff7ed', track: '#ffedd5' },
  purple: { main: '#9333ea', glow: '#a855f7', bg: '#faf5ff', track: '#f3e8ff' },
  teal: { main: '#0891b2', glow: '#06b6d4', bg: '#ecfeff', track: '#cffafe' },
};

export function CircularProgress({
  percentage,
  size = 120,
  strokeWidth = 10,
  label,
  sublabel,
  colorClass = 'primary',
}: CircularProgressProps) {
  const clamped = Math.min(100, Math.max(0, percentage));
  const colors = COLORS[colorClass];

  const center = size / 2;
  const radius = center - strokeWidth;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (clamped / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <div style={{ width: size, height: size }} className="relative">
        {/* Glow effect */}
        <div
          className="absolute inset-0 rounded-full blur-xl opacity-20"
          style={{ background: colors.main }}
        />

        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="relative z-10 drop-shadow-sm"
          style={{ transform: 'rotate(-90deg)' }}
        >
          {/* Background track */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={colors.track}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />

          {/* Progress arc */}
          <motion.circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={`url(#gradient-${colorClass})`}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
          />

          {/* Gradient definition */}
          <defs>
            <linearGradient id={`gradient-${colorClass}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={colors.glow} />
              <stop offset="100%" stopColor={colors.main} />
            </linearGradient>
          </defs>
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6, ease: 'easeOut' }}
            className="text-xl font-extrabold text-foreground tracking-tight leading-none"
          >
            {clamped.toFixed(1)}%
          </motion.span>
          {sublabel && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.9 }}
              className="text-[10px] font-medium text-muted-foreground mt-0.5 uppercase tracking-wider"
            >
              {sublabel}
            </motion.span>
          )}
        </div>
      </div>
      {label && <p className="text-sm font-semibold text-foreground">{label}</p>}
    </div>
  );
}
