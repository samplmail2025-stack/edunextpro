import { ExternalLink, Briefcase, DollarSign, BookOpen, Bookmark } from 'lucide-react';
import { Job } from '@/data/jobs';
import { Button } from '@/components/ui/button';

interface JobCardProps {
  job: Job;
  onSave?: () => void;
  isSaved?: boolean;
}

const categoryColors: Record<string, string> = {
  Government: 'gradient-blue',
  Private: 'gradient-purple',
  Internship: 'gradient-green',
  'Skill-based': 'gradient-orange',
};

const categoryBadge: Record<string, string> = {
  Government: 'bg-edu-blue-light text-edu-blue',
  Private: 'bg-edu-purple-light text-edu-purple',
  Internship: 'bg-edu-green-light text-edu-green',
  'Skill-based': 'bg-edu-orange-light text-edu-orange',
};

export function JobCard({ job, onSave, isSaved }: JobCardProps) {
  return (
    <div className="bg-card rounded-2xl overflow-hidden card-shadow border border-border animate-fade-in">
      <div className={`${categoryColors[job.category] || 'gradient-primary'} p-4 pb-3`}>
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-bold text-white text-sm leading-tight">{job.title}</h3>
            <p className="text-white/80 text-xs mt-0.5">{job.organization}</p>
          </div>
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full bg-white/20 text-white flex-shrink-0`}>
            {job.category}
          </span>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div className="flex items-center gap-1.5">
          <DollarSign className="w-3.5 h-3.5 text-edu-green flex-shrink-0" />
          <span className="text-sm font-semibold text-foreground">{job.salaryRange}</span>
        </div>

        <div>
          <p className="text-xs font-medium text-muted-foreground mb-1">Required Qualification</p>
          <div className="flex flex-wrap gap-1">
            {job.qualification.map((q) => (
              <span key={q} className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">{q}</span>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-medium text-muted-foreground mb-1">Skills Needed</p>
          <div className="flex flex-wrap gap-1">
            {job.skills.slice(0, 4).map((s) => (
              <span key={s} className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{s}</span>
            ))}
          </div>
        </div>

        {job.prepResources.length > 0 && (
          <div className="bg-muted rounded-xl p-2.5">
            <p className="text-xs font-medium text-muted-foreground mb-1 flex items-center gap-1">
              <BookOpen className="w-3 h-3" /> Preparation
            </p>
            <p className="text-xs text-foreground">{job.prepResources.slice(0, 2).join(', ')}</p>
          </div>
        )}

        <div className="flex gap-2">
          <a href={job.applyLink} target="_blank" rel="noopener noreferrer" className="flex-1">
            <Button size="sm" className="w-full rounded-xl text-xs gradient-primary border-0 gap-1">
              <ExternalLink className="w-3 h-3" /> Apply Now
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
    </div>
  );
}
