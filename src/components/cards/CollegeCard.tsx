import { ExternalLink, MapPin, Phone, Bookmark, ArrowRight, Award, Calendar, Building2, GraduationCap } from 'lucide-react';
import { College } from '@/data/colleges';
import { Button } from '@/components/ui/button';

interface CollegeCardProps {
  college: College;
  highlightCourse?: string;
  onSave?: () => void;
  isSaved?: boolean;
}

const naacConfig: Record<string, { bg: string; text: string; glow: string }> = {
  'A++': { bg: 'bg-edu-green/10', text: 'text-edu-green', glow: 'shadow-[0_0_8px_hsl(var(--green)/0.2)]' },
  'A+': { bg: 'bg-edu-blue/10', text: 'text-edu-blue', glow: 'shadow-[0_0_8px_hsl(var(--blue)/0.2)]' },
  'A': { bg: 'bg-edu-teal/10', text: 'text-edu-teal', glow: '' },
  'B+': { bg: 'bg-edu-yellow/10', text: 'text-edu-yellow', glow: '' },
  'B': { bg: 'bg-edu-orange/10', text: 'text-edu-orange', glow: '' },
};

const typeGradients: Record<string, string> = {
  Government: 'gradient-green',
  Central: 'gradient-blue',
  Aided: 'gradient-teal',
  Private: 'gradient-purple',
  Deemed: 'gradient-orange',
};

export function CollegeCard({ college, highlightCourse, onSave, isSaved }: CollegeCardProps) {
  const naac = naacConfig[college.naacGrade] || naacConfig['B'];
  const typeGradient = typeGradients[college.type] || 'gradient-primary';

  // Determine which courses to highlight
  const searchTerms = highlightCourse ? highlightCourse.toLowerCase().split(' ').filter(t => t.length > 1) : [];
  const isHighlighted = (course: string) => {
    if (!highlightCourse) return false;
    const cl = course.toLowerCase();
    const hl = highlightCourse.toLowerCase();
    return cl.includes(hl) || hl.includes(cl) || searchTerms.some(t => cl.includes(t));
  };

  return (
    <div className="group bg-card rounded-2xl overflow-hidden card-shadow border border-border animate-fade-in hover:shadow-lg transition-all duration-300">
      {/* Colored top bar */}
      <div className={`${typeGradient} h-1.5`} />

      <div className="p-4 space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${naac.bg} ${naac.text} ${naac.glow}`}>
                NAAC {college.naacGrade}
              </span>
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-muted text-muted-foreground">
                {college.type}
              </span>
            </div>
            <h3 className="font-bold text-foreground text-[15px] leading-snug tracking-tight">{college.name}</h3>
          </div>
          {onSave && (
            <button
              onClick={onSave}
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all flex-shrink-0 ${
                isSaved ? 'bg-edu-yellow/15 text-edu-yellow' : 'bg-muted/50 text-muted-foreground hover:bg-muted'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            </button>
          )}
        </div>

        {/* Info row */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-primary" />
            <span>{college.district}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Calendar className="w-3.5 h-3.5 flex-shrink-0 text-edu-teal" />
            <span>Est. {college.established}</span>
          </div>
        </div>

        {/* Courses with highlighting */}
        <div>
          <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider mb-1.5 flex items-center gap-1">
            <GraduationCap className="w-3 h-3" /> Departments
          </p>
          <div className="flex flex-wrap gap-1.5">
            {college.courses.slice(0, 5).map((c) => (
              <span
                key={c}
                className={`text-[11px] font-medium px-2.5 py-1 rounded-lg border ${
                  isHighlighted(c)
                    ? 'bg-primary/10 text-primary border-primary/20 font-semibold'
                    : 'bg-muted/40 text-foreground border-transparent'
                }`}
              >
                {c}
              </span>
            ))}
            {college.courses.length > 5 && (
              <span className="text-[11px] text-muted-foreground px-2 py-1">+{college.courses.length - 5} more</span>
            )}
          </div>
        </div>

        {/* Address */}
        <div className="p-2.5 bg-muted/30 rounded-xl">
          <div className="flex items-start gap-2">
            <MapPin className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground truncate">{college.address}</p>
              <div className="flex items-center gap-1.5 mt-1">
                <Phone className="w-3 h-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{college.phone}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <a href={college.website} target="_blank" rel="noopener noreferrer" className="flex-1">
            <Button variant="outline" size="sm" className="w-full rounded-xl text-xs gap-1.5 h-9">
              <ExternalLink className="w-3.5 h-3.5" /> Website
            </Button>
          </a>
          <a href={college.mapLink} target="_blank" rel="noopener noreferrer" className="flex-1">
            <Button size="sm" className="w-full rounded-xl text-xs gradient-primary border-0 gap-1.5 h-9">
              <MapPin className="w-3.5 h-3.5" /> Directions
              <ArrowRight className="w-3 h-3 ml-auto" />
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
