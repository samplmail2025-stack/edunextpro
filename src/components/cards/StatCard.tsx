import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  gradient: string;
  iconBg?: string;
  className?: string;
}

export function StatCard({ title, value, subtitle, icon: Icon, gradient, className = '' }: StatCardProps) {
  return (
    <div className={`rounded-2xl p-4 text-white card-shadow animate-bounce-in ${gradient} ${className}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-white/80 text-xs font-medium mb-1">{title}</p>
          <p className="text-2xl font-bold leading-none">{value}</p>
          {subtitle && <p className="text-white/70 text-xs mt-1">{subtitle}</p>}
        </div>
        <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>
    </div>
  );
}
