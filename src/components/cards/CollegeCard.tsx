import { ExternalLink, MapPin, Phone, Star, Bookmark } from 'lucide-react';
import { College } from '@/data/colleges';
import { Button } from '@/components/ui/button';

interface CollegeCardProps {
  college: College;
  onSave?: () => void;
  isSaved?: boolean;
}

const naacColors: Record<string, string> = {
  'A++': 'bg-edu-green-light text-edu-green',
  'A+': 'bg-edu-blue-light text-edu-blue',
  'A': 'bg-edu-teal-light text-edu-teal',
  'B+': 'bg-edu-yellow-light text-edu-yellow',
  'B': 'bg-edu-orange-light text-edu-orange',
};

export function CollegeCard({ college, onSave, isSaved }: CollegeCardProps) {
  return (
    <div className="bg-card rounded-2xl p-4 card-shadow border border-border animate-fade-in">
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-foreground text-sm leading-tight">{college.name}</h3>
          <p className="text-muted-foreground text-xs mt-0.5">{college.type} • Est. {college.established}</p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${naacColors[college.naacGrade] || 'bg-muted text-muted-foreground'}`}>
            NAAC {college.naacGrade}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-1 mb-3">
        {college.courses.slice(0, 4).map((c) => (
          <span key={c} className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{c}</span>
        ))}
        {college.courses.length > 4 && (
          <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">+{college.courses.length - 4}</span>
        )}
      </div>

      <div className="space-y-1 mb-3">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin className="w-3 h-3 flex-shrink-0" />
          <span className="truncate">{college.address}</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Phone className="w-3 h-3 flex-shrink-0" />
          <span>{college.phone}</span>
        </div>
      </div>

      <div className="flex gap-2">
        <a href={college.website} target="_blank" rel="noopener noreferrer" className="flex-1">
          <Button variant="outline" size="sm" className="w-full rounded-xl text-xs gap-1">
            <ExternalLink className="w-3 h-3" /> Website
          </Button>
        </a>
        <a href={college.mapLink} target="_blank" rel="noopener noreferrer" className="flex-1">
          <Button size="sm" className="w-full rounded-xl text-xs gradient-primary border-0 gap-1">
            <MapPin className="w-3 h-3" /> Maps
          </Button>
        </a>
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
  );
}
