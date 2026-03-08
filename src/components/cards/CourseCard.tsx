import { Clock, IndianRupee, BookOpen, GraduationCap, Bookmark, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { Course } from '@/data/courses';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface CourseCardProps {
  course: Course;
  onSave?: () => void;
  isSaved?: boolean;
}

const levelConfig: Record<string, { gradient: string; badge: string; icon: string }> = {
  UG: { gradient: 'gradient-blue', badge: 'bg-white/20 text-white', icon: '🎓' },
  PG: { gradient: 'gradient-purple', badge: 'bg-white/20 text-white', icon: '📚' },
  PhD: { gradient: 'gradient-teal', badge: 'bg-white/20 text-white', icon: '🔬' },
};

export function CourseCard({ course, onSave, isSaved }: CourseCardProps) {
  const navigate = useNavigate();
  const config = levelConfig[course.level] || levelConfig.UG;

  return (
    <div className="group bg-card rounded-2xl overflow-hidden card-shadow border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
      {/* Header with gradient */}
      <div className={`${config.gradient} p-4 pb-5 relative overflow-hidden`}>
        {/* Decorative background icons */}
        <GraduationCap className="absolute -right-3 -top-3 w-20 h-20 text-white/[0.07] rotate-12" />
        <BookOpen className="absolute right-10 bottom-0 w-12 h-12 text-white/[0.06] -rotate-6" />

        <div className="flex items-start justify-between gap-3 relative z-10">
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-white text-[15px] leading-snug tracking-tight">{course.name}</h3>
            <p className="text-white/70 text-xs mt-1 font-medium">{course.category}</p>
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${config.badge} backdrop-blur-sm`}>
              {course.level}
            </span>
            {onSave && (
              <button
                onClick={(e) => { e.stopPropagation(); onSave(); }}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${isSaved ? 'bg-white/30 text-white' : 'bg-white/10 text-white/60 hover:bg-white/20 hover:text-white'}`}
              >
                <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
              </button>
            )}
          </div>
        </div>

        {/* Stats pills overlapping the border */}
        <div className="flex gap-2 mt-4">
          <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm rounded-full px-3 py-1.5">
            <Clock className="w-3.5 h-3.5 text-white/80" />
            <span className="text-[11px] font-semibold text-white">{course.duration}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm rounded-full px-3 py-1.5">
            <IndianRupee className="w-3.5 h-3.5 text-white/80" />
            <span className="text-[11px] font-semibold text-white">{course.approxFees}</span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 space-y-3">
        {/* Requirements row */}
        <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl">
          <div className="flex-1">
            <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider">Min. Score</p>
            <p className="text-sm font-bold text-foreground mt-0.5">{course.minPercentage}%</p>
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="flex-1">
            <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider">Entrance</p>
            {course.entranceExam ? (
              <div className="flex items-center gap-1 mt-0.5">
                <AlertCircle className="w-3 h-3 text-edu-orange flex-shrink-0" />
                <p className="text-xs font-semibold text-edu-orange">{course.entranceExam}</p>
              </div>
            ) : (
              <div className="flex items-center gap-1 mt-0.5">
                <CheckCircle2 className="w-3 h-3 text-edu-green flex-shrink-0" />
                <p className="text-xs font-semibold text-edu-green">Not Required</p>
              </div>
            )}
          </div>
        </div>

        {/* Career scope */}
        <div>
          <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <BookOpen className="w-3 h-3" /> Career Paths
          </p>
          <div className="flex flex-wrap gap-1.5">
            {course.careerScope.slice(0, 3).map((c) => (
              <span key={c} className="text-[11px] font-medium bg-primary/8 text-primary px-2.5 py-1 rounded-lg border border-primary/10">{c}</span>
            ))}
            {course.careerScope.length > 3 && (
              <span className="text-[11px] text-muted-foreground px-2 py-1">+{course.careerScope.length - 3} more</span>
            )}
          </div>
        </div>

        {/* CTA */}
        <Button
          size="sm"
          className="w-full rounded-xl text-xs font-semibold gradient-primary border-0 group/btn h-10"
          onClick={() => navigate(`/college-finder?course=${encodeURIComponent(course.name)}`)}
        >
          View Colleges
          <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover/btn:translate-x-0.5" />
        </Button>
      </div>
    </div>
  );
}
