import { ExternalLink, DollarSign, BookOpen, Bookmark, MapPin, Clock, IndianRupee } from 'lucide-react';
import { Job } from '@/data/jobs';
import { Button } from '@/components/ui/button';

import govImg from '@/assets/job-government.jpg';
import privateImg from '@/assets/job-private.jpg';
import internImg from '@/assets/job-internship.jpg';
import skillImg from '@/assets/job-skillbased.jpg';

interface JobCardProps {
  job: Job;
  onSave?: () => void;
  isSaved?: boolean;
}

const categoryImages: Record<string, string> = {
  Government: govImg,
  Private: privateImg,
  Internship: internImg,
  'Skill-based': skillImg,
};

const categoryBadge: Record<string, string> = {
  Government: 'from-blue-500 to-indigo-600',
  Private: 'from-violet-500 to-purple-600',
  Internship: 'from-emerald-500 to-teal-600',
  'Skill-based': 'from-orange-500 to-amber-600',
};

export function JobCard({ job, onSave, isSaved }: JobCardProps) {
  const heroImg = categoryImages[job.category] || govImg;
  const badgeGradient = categoryBadge[job.category] || categoryBadge.Government;
  const daysLeft = job.deadline ? Math.max(0, Math.ceil((new Date(job.deadline).getTime() - Date.now()) / 86400000)) : null;

  return (
    <div className="group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 border border-border bg-card">
      {/* Image Header */}
      <div className="relative h-36 overflow-hidden">
        <img
          src={heroImg}
          alt={job.category}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />

        {/* Top badges */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className={`text-[11px] font-bold px-3 py-1.5 rounded-xl bg-gradient-to-r ${badgeGradient} text-white shadow-lg`}>
              {job.category}
            </span>
            {daysLeft !== null && daysLeft <= 30 && (
              <span className="text-[10px] font-bold px-2.5 py-1.5 rounded-xl bg-red-500/90 text-white flex items-center gap-0.5 shadow-lg">
                <Clock className="w-2.5 h-2.5" /> {daysLeft}d left
              </span>
            )}
          </div>
          {onSave && (
            <button
              onClick={(e) => { e.stopPropagation(); onSave(); }}
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all backdrop-blur-md border border-white/15 ${
                isSaved
                  ? 'bg-white/30 text-white'
                  : 'bg-black/20 text-white/70 hover:bg-white/20 hover:text-white'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            </button>
          )}
        </div>

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="font-bold text-white text-[15px] leading-snug tracking-tight drop-shadow-md">
            {job.title}
          </h3>
          <p className="text-white/70 text-xs mt-0.5 font-medium">{job.organization}</p>
        </div>
      </div>

      {/* Stats bar */}
      <div className={`grid ${job.location ? 'grid-cols-2' : 'grid-cols-1'} divide-x divide-border border-b border-border`}>
        <div className="flex items-center justify-center gap-2 py-3">
          <IndianRupee className="w-4 h-4 text-primary/60" />
          <span className="text-xs font-bold text-foreground">{job.salaryRange}</span>
        </div>
        {job.location && (
          <div className="flex items-center justify-center gap-2 py-3">
            <MapPin className="w-4 h-4 text-primary/60" />
            <span className="text-xs font-bold text-foreground">{job.location}</span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-4 space-y-3">
        {/* Qualification */}
        <div>
          <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider mb-1.5">Required Qualification</p>
          <div className="flex flex-wrap gap-1">
            {job.qualification.map((q) => (
              <span key={q} className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full font-medium">{q}</span>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div>
          <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider mb-1.5">Skills Needed</p>
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
          <div className="bg-muted/50 rounded-xl p-2.5 border border-border/50">
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1 flex items-center gap-1">
              <BookOpen className="w-3 h-3" /> Preparation
            </p>
            <p className="text-xs text-foreground">{job.prepResources.slice(0, 2).join(', ')}</p>
          </div>
        )}

        {/* Apply button */}
        <a href={job.applyLink} target="_blank" rel="noopener noreferrer">
          <Button
            size="sm"
            className={`w-full rounded-xl text-xs font-semibold h-10 bg-gradient-to-r ${badgeGradient} border-0 text-white shadow-md hover:shadow-lg transition-all gap-1`}
          >
            <ExternalLink className="w-3 h-3" /> Apply Now
          </Button>
        </a>
      </div>
    </div>
  );
}
