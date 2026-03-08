import { useState } from 'react';
import { motion } from 'framer-motion';

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { delay: i * 0.08, duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }
  })
};
import { PageWrapper } from '@/components/layout/PageWrapper';
import { BottomNav } from '@/components/layout/BottomNav';
import { AppHeader } from '@/components/layout/AppHeader';
import { JobCard } from '@/components/cards/JobCard';
import { JOBS } from '@/data/jobs';
import { useBookmarks } from '@/hooks/useBookmarks';
import { Briefcase, Building2, Target, Zap } from 'lucide-react';
import jobHeroImg from '@/assets/job-interview.jpg';

const CATEGORIES = ['Government', 'Private', 'Internship', 'Skill-based'] as const;
type Category = typeof CATEGORIES[number];

export default function Jobs() {
  const [activeCategory, setActiveCategory] = useState<Category>('Government');
  const { saveItem, isItemSaved } = useBookmarks();

  const filtered = JOBS.filter((j) => j.category === activeCategory);

  const categoryIcon: Record<Category, React.ReactNode> = {
    Government: <Building2 className="w-4 h-4" />,
    Private: <Briefcase className="w-4 h-4" />,
    Internship: <Target className="w-4 h-4" />,
    'Skill-based': <Zap className="w-4 h-4" />,
  };

  return (
    <PageWrapper>
      <AppHeader title="Job Opportunities" subtitle="Govt • Private • Internships" showBack gradient />
      <div className="p-4 space-y-4 max-w-lg mx-auto">
        {/* Hero image banner */}
        <div className="relative rounded-2xl overflow-hidden h-36 card-shadow">
          <img src={jobHeroImg} alt="Professional career opportunities" loading="lazy" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-3 left-4 right-4">
            <h2 className="text-white font-bold text-lg leading-tight">Find Your Dream Career</h2>
            <p className="text-white/80 text-xs mt-0.5">Explore government, private & internship opportunities</p>
          </div>
        </div>

        {/* Category tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 px-3 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeCategory === cat ? 'gradient-primary text-white shadow' : 'bg-card border border-border text-foreground'
              }`}
            >
              {categoryIcon[cat]} {cat}
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
            filtered.map((job, i) => (
              <motion.div
                key={job.id}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
              >
                <JobCard
                  job={job}
                  onSave={() => saveItem('job', job as unknown as Record<string, unknown>)}
                  isSaved={isItemSaved(job.id)}
                />
              </motion.div>
            ))
          )}
        </div>
      </div>
      <BottomNav />
    </PageWrapper>
  );
}
