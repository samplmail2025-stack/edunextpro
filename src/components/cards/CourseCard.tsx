import { Clock, IndianRupee, BookOpen, GraduationCap, Bookmark, ArrowRight, CheckCircle2, AlertCircle, Sparkles, TrendingUp } from 'lucide-react';
import { Course } from '@/data/courses';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface CourseCardProps {
  course: Course;
  onSave?: () => void;
  isSaved?: boolean;
}

const levelConfig: Record<string, { gradient: string; glow: string; accent: string }> = {
  UG: {
    gradient: 'from-blue-600 via-indigo-600 to-blue-700',
    glow: 'shadow-blue-500/25',
    accent: 'bg-blue-400/20 text-blue-100',
  },
  PG: {
    gradient: 'from-violet-600 via-purple-600 to-fuchsia-600',
    glow: 'shadow-purple-500/25',
    accent: 'bg-purple-400/20 text-purple-100',
  },
  PhD: {
    gradient: 'from-teal-600 via-cyan-600 to-emerald-600',
    glow: 'shadow-teal-500/25',
    accent: 'bg-teal-400/20 text-teal-100',
  },
};

export function CourseCard({ course, onSave, isSaved }: CourseCardProps) {
  const navigate = useNavigate();
  const config = levelConfig[course.level] || levelConfig.UG;

  return (
    <div className={`group rounded-2xl overflow-hidden shadow-lg ${config.glow} hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5`}>
      {/* Gradient Header with layered depth */}
      <div className={`bg-gradient-to-br ${config.gradient} p-5 pb-5 relative overflow-hidden`}>
        {/* Mesh gradient overlays */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,0,0,0.1),transparent_60%)]" />

        {/* Decorative floating shapes */}
        <div className="absolute -right-6 -top-6 w-28 h-28 rounded-full bg-white/[0.04] blur-sm" />
        <div className="absolute right-8 bottom--2 w-16 h-16 rounded-2xl bg-white/[0.04] rotate-12 blur-[1px]" />
        <GraduationCap className="absolute right-4 top-4 w-16 h-16 text-white/[0.06] rotate-12" />
        <Sparkles className="absolute left-1/2 top-2 w-6 h-6 text-white/[0.08]" />

        {/* Top row: Title + badges */}
        <div className="flex items-start justify-between gap-3 relative z-10">
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-white text-base leading-snug tracking-tight drop-shadow-sm">
              {course.name}
            </h3>
            <p className="text-white/60 text-xs mt-1 font-medium">{course.category}</p>
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <span className={`text-[11px] font-bold px-3 py-1.5 rounded-xl ${config.accent} backdrop-blur-md border border-white/10`}>
              {course.level}
            </span>
            {onSave && (
              <button
                onClick={(e) => { e.stopPropagation(); onSave(); }}
                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all backdrop-blur-sm border border-white/10 ${
                  isSaved
                    ? 'bg-white/25 text-white'
                    : 'bg-white/10 text-white/60 hover:bg-white/20 hover:text-white'
                }`}
              >
                <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
              </button>
            )}
          </div>
        </div>

        {/* Stats pills */}
        <div className="flex gap-2 mt-4 relative z-10">
          <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md rounded-xl px-3 py-2 border border-white/[0.08]">
            <Clock className="w-3.5 h-3.5 text-white/70" />
            <span className="text-[11px] font-semibold text-white/90">{course.duration}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md rounded-xl px-3 py-2 border border-white/[0.08]">
            <IndianRupee className="w-3.5 h-3.5 text-white/70" />
            <span className="text-[11px] font-semibold text-white/90">{course.approxFees}</span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="bg-card p-4 space-y-3 border-x border-b border-border rounded-b-2xl">
        {/* Requirements row */}
        <div className="flex items-center gap-3 p-3 bg-muted/40 rounded-xl border border-border/50">
          <div className="flex-1">
            <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">Min. Score</p>
            <p className="text-sm font-bold text-foreground mt-0.5">{course.minPercentage}%</p>
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="flex-1">
            <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">Entrance</p>
            {course.entranceExam ? (
              <div className="flex items-center gap-1 mt-0.5">
                <AlertCircle className="w-3 h-3 text-amber-500 flex-shrink-0" />
                <p className="text-xs font-semibold text-amber-600 dark:text-amber-400">{course.entranceExam}</p>
              </div>
            ) : (
              <div className="flex items-center gap-1 mt-0.5">
                <CheckCircle2 className="w-3 h-3 text-emerald-500 flex-shrink-0" />
                <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">Not Required</p>
              </div>
            )}
          </div>
        </div>

        {/* Career scope */}
        <div>
          <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <TrendingUp className="w-3 h-3" /> Career Paths
          </p>
          <div className="flex flex-wrap gap-1.5">
            {course.careerScope.slice(0, 3).map((c) => (
              <span
                key={c}
                className="text-[11px] font-medium bg-primary/8 text-primary px-2.5 py-1 rounded-lg border border-primary/10"
              >
                {c}
              </span>
            ))}
            {course.careerScope.length > 3 && (
              <span className="text-[11px] text-muted-foreground px-2 py-1">
                +{course.careerScope.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* CTA */}
        <Button
          size="sm"
          className={`w-full rounded-xl text-xs font-semibold h-10 bg-gradient-to-r ${config.gradient} border-0 text-white shadow-md group/btn hover:shadow-lg transition-all`}
          onClick={() => navigate(`/college-finder?course=${encodeURIComponent(course.name)}`)}
        >
          View Colleges
          <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover/btn:translate-x-0.5" />
        </Button>
      </div>
    </div>
  );
}
