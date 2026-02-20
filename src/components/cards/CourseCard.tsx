import { Clock, IndianRupee, BookOpen, ExternalLink, Bookmark } from 'lucide-react';
import { Course } from '@/data/courses';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface CourseCardProps {
  course: Course;
  onSave?: () => void;
  isSaved?: boolean;
}

const levelColors: Record<string, string> = {
  UG: 'gradient-blue',
  PG: 'gradient-purple',
  PhD: 'gradient-teal',
};

export function CourseCard({ course, onSave, isSaved }: CourseCardProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-card rounded-2xl overflow-hidden card-shadow border border-border animate-fade-in">
      <div className={`${levelColors[course.level] || 'gradient-primary'} p-4 pb-3`}>
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-bold text-white text-sm leading-tight">{course.name}</h3>
            <p className="text-white/80 text-xs mt-0.5">{course.category}</p>
          </div>
          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-white/25 text-white flex-shrink-0">
            {course.level}
          </span>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-edu-blue flex-shrink-0" />
            <span className="text-xs text-foreground">{course.duration}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <IndianRupee className="w-3.5 h-3.5 text-edu-green flex-shrink-0" />
            <span className="text-xs text-foreground">{course.approxFees}</span>
          </div>
        </div>

        <div className="bg-muted/50 rounded-xl p-2.5">
          <p className="text-xs text-muted-foreground mb-0.5">Min. Required: <span className="font-semibold text-foreground">{course.minPercentage}%</span></p>
          {course.entranceExam && (
            <p className="text-xs text-muted-foreground">Entrance: <span className="font-semibold text-edu-orange">{course.entranceExam}</span></p>
          )}
          {!course.entranceExam && (
            <p className="text-xs text-edu-green font-medium">✓ No Entrance Exam</p>
          )}
        </div>

        <div>
          <p className="text-xs font-medium text-muted-foreground mb-1 flex items-center gap-1">
            <BookOpen className="w-3 h-3" /> Career Scope
          </p>
          <div className="flex flex-wrap gap-1">
            {course.careerScope.slice(0, 3).map((c) => (
              <span key={c} className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{c}</span>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            size="sm"
            className="flex-1 rounded-xl text-xs gradient-primary border-0"
            onClick={() => navigate(`/college-finder?course=${encodeURIComponent(course.name)}`)}
          >
            View Colleges
          </Button>
          {onSave && (
            <Button
              variant="outline"
              size="sm"
              onClick={onSave}
              className={`rounded-xl px-3 ${isSaved ? 'text-edu-yellow border-edu-yellow' : ''}`}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-edu-yellow' : ''}`} />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
