import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface CircularProgressProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  sublabel?: string;
  colorClass?: 'primary' | 'green' | 'orange' | 'purple' | 'teal';
}

const COLORS = {
  primary: ['#6366f1', '#e0e7ff'],
  green: ['#22c55e', '#dcfce7'],
  orange: ['#f97316', '#fff7ed'],
  purple: ['#a855f7', '#faf5ff'],
  teal: ['#06b6d4', '#f0fdff'],
};

export function CircularProgress({
  percentage,
  size = 160,
  label,
  sublabel,
  colorClass = 'primary',
}: CircularProgressProps) {
  const clamped = Math.min(100, Math.max(0, percentage));
  const data = [
    { value: clamped },
    { value: 100 - clamped },
  ];
  const colors = COLORS[colorClass];

  return (
    <div className="flex flex-col items-center gap-2">
      <div style={{ width: size, height: size }} className="relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius="65%"
              outerRadius="85%"
              startAngle={90}
              endAngle={-270}
              dataKey="value"
              strokeWidth={0}
            >
              <Cell fill={colors[0]} />
              <Cell fill={colors[1]} />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-foreground">{clamped.toFixed(1)}%</span>
          {sublabel && <span className="text-xs text-muted-foreground">{sublabel}</span>}
        </div>
      </div>
      {label && <p className="text-sm font-medium text-foreground">{label}</p>}
    </div>
  );
}
