import { ExternalLink, MapPin, Phone, Bookmark, ArrowRight, Calendar, GraduationCap, Globe, Star, GitCompareArrows } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { College } from '@/data/colleges';
import { Button } from '@/components/ui/button';
import { useCompare } from '@/contexts/CompareContext';

interface CollegeCardProps {
  college: College;
  highlightCourse?: string;
  onSave?: () => void;
  isSaved?: boolean;
}

const naacConfig: Record<string, { gradient: string; badge: string }> = {
  'A++': { gradient: 'from-emerald-500 to-teal-500', badge: 'bg-emerald-500' },
  'A+': { gradient: 'from-blue-500 to-cyan-500', badge: 'bg-blue-500' },
  'A': { gradient: 'from-sky-500 to-blue-400', badge: 'bg-sky-500' },
  'B+': { gradient: 'from-amber-500 to-yellow-400', badge: 'bg-amber-500' },
  'B': { gradient: 'from-orange-500 to-amber-400', badge: 'bg-orange-500' },
};

const typeConfig: Record<string, { color: string; bg: string; gradient: string }> = {
  Government: { color: 'text-edu-green', bg: 'bg-edu-green/10', gradient: 'gradient-green' },
  Central: { color: 'text-edu-blue', bg: 'bg-edu-blue/10', gradient: 'gradient-blue' },
  Aided: { color: 'text-edu-teal', bg: 'bg-edu-teal/10', gradient: 'gradient-teal' },
  Private: { color: 'text-edu-purple', bg: 'bg-edu-purple/10', gradient: 'gradient-purple' },
  Deemed: { color: 'text-edu-orange', bg: 'bg-edu-orange/10', gradient: 'gradient-orange' },
};

export function CollegeCard({ college, highlightCourse, onSave, isSaved }: CollegeCardProps) {
  const naac = naacConfig[college.naacGrade] || naacConfig['B'];
  const { toggleCollege, isSelected, canAdd } = useCompare();
  const compared = isSelected(college.id);
  const navigate = useNavigate();

  const searchTerms = highlightCourse ? highlightCourse.toLowerCase().split(' ').filter(t => t.length > 1) : [];
  const isHighlighted = (course: string) => {
    if (!highlightCourse) return false;
    const cl = course.toLowerCase();
    const hl = highlightCourse.toLowerCase();
    return cl.includes(hl) || hl.includes(cl) || searchTerms.some(t => cl.includes(t));
  };

  return (
    <div
      onClick={() => navigate(`/college/${college.id}`)}
      className="group bg-card rounded-2xl overflow-hidden border border-border animate-fade-in hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
      style={{ boxShadow: '0 4px 24px -4px rgba(0,0,0,0.08), 0 2px 8px -2px rgba(0,0,0,0.04)' }}>

      {/* Gradient Header */}
      <div className={`bg-gradient-to-r ${naac.gradient} p-4 pb-5 relative overflow-hidden`}>
        {/* Decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/[0.08] rounded-full" />
          <div className="absolute right-8 bottom--2 w-16 h-16 bg-white/[0.06] rounded-full" />
          <GraduationCap className="absolute right-3 top-3 w-12 h-12 text-white/[0.1]" />
        </div>

        <div className="relative z-10">
          {/* Badges row */}
          <div className="flex items-center gap-2 mb-2.5">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/25 text-white backdrop-blur-sm flex items-center gap-1">
              <Star className="w-3 h-3 fill-current" />
              NAAC {college.naacGrade}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/15 text-white/90 backdrop-blur-sm">
              {college.type}
            </span>
          </div>

          {/* College name */}
          <h3 className="font-bold text-white text-[17px] leading-snug tracking-tight pr-8">
            {college.name}
          </h3>

          {/* Location & Year pills */}
          <div className="flex items-center gap-3 mt-2">
            <div className="flex items-center gap-1 text-white/80">
              <MapPin className="w-3.5 h-3.5" />
              <span className="text-xs font-medium">{college.district}</span>
            </div>
            <div className="flex items-center gap-1 text-white/70">
              <Calendar className="w-3.5 h-3.5" />
              <span className="text-xs font-medium">Est. {college.established}</span>
            </div>
          </div>
        </div>

        {/* Bookmark button */}
        {onSave && (
          <button
            onClick={(e) => { e.stopPropagation(); onSave(); }}
            className={`absolute top-3 right-3 w-9 h-9 rounded-xl flex items-center justify-center transition-all z-10 ${
              isSaved ? 'bg-white/30 text-white' : 'bg-white/10 text-white/60 hover:bg-white/20 hover:text-white'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
          </button>
        )}
      </div>

      {/* Body */}
      <div className="p-4 space-y-3">
        {/* Departments */}
        <div>
          <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-widest mb-2 flex items-center gap-1.5">
            <GraduationCap className="w-3.5 h-3.5 text-primary" /> Departments Offered
          </p>
          <div className="flex flex-wrap gap-1.5">
            {college.courses.slice(0, 6).map((c) => (
              <span
                key={c}
                className={`text-[11px] font-medium px-2.5 py-1 rounded-lg transition-colors ${
                  isHighlighted(c)
                    ? 'bg-primary text-primary-foreground font-semibold shadow-sm'
                    : 'bg-muted/60 text-foreground border border-border/50 hover:bg-muted'
                }`}
              >
                {c}
              </span>
            ))}
            {college.courses.length > 6 && (
              <span className="text-[11px] font-semibold text-primary bg-primary/8 px-2.5 py-1 rounded-lg">
                +{college.courses.length - 6} more
              </span>
            )}
          </div>
        </div>

        {/* Contact info */}
        <div className="flex gap-2">
          <div className="flex-1 p-2.5 bg-muted/40 rounded-xl flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-3.5 h-3.5 text-primary" />
            </div>
            <p className="text-[11px] text-muted-foreground leading-tight truncate">{college.address}</p>
          </div>
          <div className="p-2.5 bg-muted/40 rounded-xl flex items-center gap-2 flex-shrink-0">
            <div className="w-7 h-7 rounded-lg bg-edu-green/10 flex items-center justify-center">
              <Phone className="w-3.5 h-3.5 text-edu-green" />
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 pt-0.5">
          <a href={college.website} target="_blank" rel="noopener noreferrer" className="flex-1" onClick={(e) => e.stopPropagation()}>
            <Button variant="outline" size="sm" className="w-full rounded-xl text-xs gap-1.5 h-10 font-semibold hover:bg-muted/80 border-border/80">
              <Globe className="w-3.5 h-3.5" /> Website
            </Button>
          </a>
          <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(college.name + ', ' + college.address)}`} target="_blank" rel="noopener noreferrer" className="flex-1" onClick={(e) => e.stopPropagation()}>
            <Button size="sm" className="w-full rounded-xl text-xs gradient-primary border-0 gap-1.5 h-10 font-semibold group/btn">
              <MapPin className="w-3.5 h-3.5" /> Directions
              <ArrowRight className="w-3.5 h-3.5 ml-auto transition-transform group-hover/btn:translate-x-0.5" />
            </Button>
          </a>
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => { e.stopPropagation(); toggleCollege(college); }}
            disabled={!compared && !canAdd}
            className={`rounded-xl px-3 h-10 ${compared ? 'bg-edu-teal/10 border-edu-teal text-edu-teal' : ''}`}
          >
            <GitCompareArrows className={`w-4 h-4 ${compared ? 'text-edu-teal' : ''}`} />
          </Button>
        </div>
      </div>
    </div>
  );
}
