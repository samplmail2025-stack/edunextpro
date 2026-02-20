import { useState } from 'react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { BottomNav } from '@/components/layout/BottomNav';
import { AppHeader } from '@/components/layout/AppHeader';
import { JobCard } from '@/components/cards/JobCard';
import { JOBS } from '@/data/jobs';
import { useBookmarks } from '@/hooks/useBookmarks';
import { Briefcase } from 'lucide-react';

const CATEGORIES = ['Government', 'Private', 'Internship', 'Skill-based'] as const;
type Category = typeof CATEGORIES[number];

export default function Jobs() {
  const [activeCategory, setActiveCategory] = useState<Category>('Government');
  const { saveItem, isItemSaved } = useBookmarks();

  const filtered = JOBS.filter((j) => j.category === activeCategory);

  const categoryEmoji: Record<Category, string> = {
    Government: '🏛️',
    Private: '🏢',
    Internship: '🎯',
    'Skill-based': '⚡',
  };

  return (
    <PageWrapper>
      <AppHeader title="Job Opportunities" subtitle="Govt • Private • Internships" gradient />
      <div className="p-4 space-y-4 max-w-lg mx-auto">
        {/* Category tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 px-3 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
                activeCategory === cat ? 'gradient-primary text-white shadow' : 'bg-card border border-border text-foreground'
              }`}
            >
              {categoryEmoji[cat]} {cat}
            </button>
          ))}
        </div>

        {/* Results */}
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Briefcase className="w-12 h-12 mx-auto mb-2 opacity-30" />
              <p className="font-medium">No jobs in this category</p>
            </div>
          ) : (
            filtered.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onSave={() => saveItem('job', job as unknown as Record<string, unknown>)}
                isSaved={isItemSaved(job.id)}
              />
            ))
          )}
        </div>
      </div>
      <BottomNav />
    </PageWrapper>
  );
}
