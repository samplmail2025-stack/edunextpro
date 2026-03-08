import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { BottomNav } from '@/components/layout/BottomNav';
import { AppHeader } from '@/components/layout/AppHeader';
import { CourseCard } from '@/components/cards/CourseCard';
import { JobCard } from '@/components/cards/JobCard';
import { useRecommendations } from '@/hooks/useRecommendations';
import { useBookmarks } from '@/hooks/useBookmarks';
import { useMarks } from '@/hooks/useMarks';
import { Lightbulb, BookOpen, Briefcase, TrendingUp, Loader2 } from 'lucide-react';
import type { RecommendationContext } from '@/data/recommendations';
import recsHeroImg from '@/assets/recommendations-study.jpg';

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { delay: i * 0.08, duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }
  })
};

interface LocationState extends RecommendationContext {}

export default function Recommendations() {
  const { state } = useLocation() as { state: LocationState | null };
  const [tab, setTab] = useState<'higher' | 'jobs' | 'skills'>('higher');
  const { saveItem, isItemSaved } = useBookmarks();
  const { latestMarks, loading } = useMarks();

  // Build context from navigation state OR from saved marks
  const ctx: RecommendationContext = state || (latestMarks ? {
    studentType: (latestMarks.student_type as 'school' | 'college') || 'school',
    percentage: latestMarks.percentage ?? 60,
    cgpa: latestMarks.cgpa ?? undefined,
    stream: latestMarks.stream ?? undefined,
    level: latestMarks.level ?? undefined,
    course: latestMarks.course ?? undefined,
    classification: latestMarks.classification ?? undefined,
  } : {
    studentType: 'school',
    percentage: 60,
    stream: 'Science',
  });

  const { higherStudies, jobs, skills } = useRecommendations(ctx);

  const tabs = [
    { key: 'higher', label: '🎓 Higher Studies', count: higherStudies.length },
    { key: 'jobs', label: '💼 Jobs', count: jobs.length },
    { key: 'skills', label: '⚡ Skills', count: skills.length },
  ] as const;

  return (
    <PageWrapper>
      <AppHeader title="Recommendations" subtitle={`Based on ${ctx.percentage?.toFixed(0)}% • ${ctx.stream || ctx.course || ''}`} gradient />
      <div className="p-4 space-y-4 max-w-lg mx-auto">
        {/* Hero image banner */}
        <div className="relative rounded-2xl overflow-hidden h-36 card-shadow">
          <img src={recsHeroImg} alt="Study recommendations" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-3 left-4 right-4">
            <h2 className="text-white font-bold text-lg leading-tight">Personalized For You</h2>
            <p className="text-white/80 text-xs mt-0.5">AI-powered recommendations based on your performance</p>
          </div>
        </div>

        {/* Score summary */}
        <div className="bg-card rounded-2xl p-4 card-shadow border border-border">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="font-bold text-foreground">{ctx.percentage?.toFixed(1)}% • {ctx.classification || 'Good'}</p>
              <p className="text-xs text-muted-foreground">
              {ctx.studentType === 'college' && ctx.cgpa ? `CGPA: ${ctx.cgpa.toFixed(2)} • ` : ''}
              {ctx.level || ''} {ctx.stream || ctx.course || ''}
              </p>
            </div>
          </div>
        </div>

        {/* Tab buttons */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {tabs.map(({ key, label, count }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${tab === key ? 'gradient-primary text-white shadow' : 'bg-card border border-border text-foreground'}`}
            >
              {label} ({count})
            </button>
          ))}
        </div>

        {/* Higher Studies */}
        {tab === 'higher' && (
          <div className="space-y-3">
            {higherStudies.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <BookOpen className="w-12 h-12 mx-auto mb-2 opacity-30" />
                <p>No courses matched your score. Try improving your marks!</p>
              </div>
            ) : (
              higherStudies.map((course, i) => (
                <motion.div
                  key={course.id}
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                >
                  <CourseCard
                    course={course}
                    onSave={() => saveItem('course', course as unknown as Record<string, unknown>)}
                    isSaved={isItemSaved(course.id)}
                  />
                </motion.div>
              ))
            )}
          </div>
        )}

        {/* Jobs */}
        {tab === 'jobs' && (
          <div className="space-y-3">
            {jobs.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Briefcase className="w-12 h-12 mx-auto mb-2 opacity-30" />
                <p>No jobs matched. Explore skill-based opportunities!</p>
              </div>
            ) : (
              jobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  onSave={() => saveItem('job', job as unknown as Record<string, unknown>)}
                  isSaved={isItemSaved(job.id)}
                />
              ))
            )}
          </div>
        )}

        {/* Skills */}
        {tab === 'skills' && (
          <div className="space-y-3">
            <div className="bg-card rounded-2xl p-4 card-shadow border border-border">
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-edu-yellow" />
                Skills to Improve
              </h3>
              <div className="space-y-3">
                {skills.map((skill, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-muted/50 rounded-xl animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
                    <span className="text-lg flex-shrink-0">{['🚀', '💡', '📚', '🎯', '💼'][i % 5]}</span>
                    <p className="text-sm text-foreground">{skill}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-edu-blue-light rounded-2xl p-4">
              <h3 className="font-semibold text-edu-blue mb-2">📈 Resources to Explore</h3>
              <div className="space-y-2">
                {['SWAYAM (Free Online Courses)', 'NPTEL Platform', 'Coursera India', 'edX Free Courses', 'YouTube Learning Channels'].map((r) => (
                  <div key={r} className="flex items-center gap-2">
                    <span className="text-edu-blue">•</span>
                    <span className="text-sm text-edu-blue">{r}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <BottomNav />
    </PageWrapper>
  );
}
