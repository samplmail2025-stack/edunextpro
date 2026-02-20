import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface GradeBarChartProps {
  data: { subject: string; marks: number; maxMarks: number }[];
}

const COLORS = ['#6366f1', '#a855f7', '#06b6d4', '#22c55e', '#f97316', '#ec4899', '#eab308'];

export function GradeBarChart({ data }: GradeBarChartProps) {
  const chartData = data.map((d) => ({
    subject: d.subject.length > 8 ? d.subject.slice(0, 8) + '…' : d.subject,
    marks: d.marks,
    percentage: parseFloat(((d.marks / d.maxMarks) * 100).toFixed(1)),
  }));

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <XAxis dataKey="subject" tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} />
        <YAxis tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} domain={[0, 100]} />
        <Tooltip
          contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 12, fontSize: 12 }}
          formatter={(value: number) => [`${value}%`, 'Score']}
        />
        <Bar dataKey="percentage" radius={[6, 6, 0, 0]}>
          {chartData.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
