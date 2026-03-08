import { ExternalLink, DollarSign, BookOpen, Bookmark, Briefcase, MapPin, Clock } from 'lucide-react';
import { Job } from '@/data/jobs';
import { Button } from '@/components/ui/button';

interface JobCardProps {
  job: Job;
  onSave?: () => void;
  isSaved?: boolean;
}

const categoryConfig: Record<string, { gradient: string; icon: string }> = {
  Government: { gradient: 'from-blue-600 to-indigo-700', icon: '🏛️' },
  Private: { gradient: 'from-violet-500 to-purple-600', icon: '🏢' },
  Internship: { gradient: 'from-emerald-500 to-teal-600', icon: '🎯' },
  'Skill-based': { gradient: 'from-orange-500 to-amber-600', icon: '⚡' },
};

export function JobCard({ job, onSave, isSaved }: JobCardProps) {
  const config = categoryConfig[job.category] || categoryConfig.Government;
  const daysLeft = job.deadline ? Math.max(0, Math.ceil((new Date(job.deadline).getTime() - Date.now()) / 86400000)) : null;

  return (
    <div className="bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:-translate-y-0.5 transition-transform">
      {/* Gradient header */}
      <div className={`bg-gradient-to-r ${config.gradient} p-4 relative overflow-hidden`}>
        <div className="absolute -right-4 -top-4 w-20 h-20 rounded-full bg-white/5" />
        <div className="absolute right-6 bottom-2 opacity-10">
          <Briefcase className="w-14 h-14 text-white" />
        </div>
        <div className="relative flex items-start justify-between gap-2">
          <div className="flex-1">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-base">{config.icon}</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-white/20 text-white backdrop-blur-sm">
                {job.category}
              </span>
              {daysLeft !== null && daysLeft <= 30 && (
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-red-500/80 text-white flex items-center gap-0.5">
                  <Clock className="w-2.5 h-2.5" /> {daysLeft}d left
                </span>
              )}
            </div>
            <h3 className="font-bold text-white text-sm leading-tight">{job.title}</h3>
            <p className="text-white/80 text-xs mt-0.5">{job.organization}</p>
          </div>
          {onSave && (
            <button
              onClick={onSave}
              className="w-8 h-8 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center flex-shrink-0 hover:bg-white/25 transition-colors"
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-white text-white' : 'text-white/80'}`} />
            </button>
          )}
        </div>
      </div>

      <div className="p-4 space-y-3">
        {/* Salary & Location */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded-lg bg-emerald-100 flex items-center justify-center">
              <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
            </div>
            <span className="text-sm font-bold text-foreground">{job.salaryRange}</span>
          </div>
          {job.location && (
            <div className="flex items-center gap-1 text-muted-foreground">
              <MapPin className="w-3 h-3" />
              <span className="text-xs">{job.location}</span>
            </div>
          )}
        </div>

        {/* Qualification */}
        <div>
          <p className="text-xs font-medium text-muted-foreground mb-1.5">Required Qualification</p>
          <div className="flex flex-wrap gap-1">
            {job.qualification.map((q) => (
              <span key={q} className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full font-medium">{q}</span>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div>
          <p className="text-xs font-medium text-muted-foreground mb-1.5">Skills Needed</p>
          <div className="flex flex-wrap gap-1">
            {job.skills.slice(0, 4).map((s) => (
              <span key={s} className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">{s}</span>
            ))}
            {job.skills.length > 4 && (
              <span className="text-xs text-muted-foreground px-1">+{job.skills.length - 4} more</span>
            )}
          </div>
        </div>

        {/* Prep Resources */}
        {job.prepResources.length > 0 && (
          <div className="bg-muted rounded-xl p-2.5">
            <p className="text-xs font-medium text-muted-foreground mb-1 flex items-center gap-1">
              <BookOpen className="w-3 h-3" /> Preparation
            </p>
            <p className="text-xs text-foreground">{job.prepResources.slice(0, 2).join(', ')}</p>
          </div>
        )}

        {/* Apply button */}
        <a href={job.applyLink} target="_blank" rel="noopener noreferrer">
          <Button size="sm" className={`w-full rounded-xl text-xs bg-gradient-to-r ${config.gradient} border-0 text-white gap-1`}>
            <ExternalLink className="w-3 h-3" /> Apply Now
          </Button>
        </a>
      </div>
    </div>
  );
}
