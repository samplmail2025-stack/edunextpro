import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { AppHeader } from '@/components/layout/AppHeader';
import { BottomNav } from '@/components/layout/BottomNav';
import { INTERVIEW_QUESTIONS, InterviewQuestion } from '@/data/interviewQuestions';
import { ChevronDown, Lightbulb, MessageSquare, Users, BookOpen, Shield, Sparkles } from 'lucide-react';
import interviewHeroImg from '@/assets/interview-prep-hero.jpg';

const TABS = [
  { key: 'HR', label: 'HR Questions', icon: MessageSquare },
  { key: 'Technical', label: 'Technical', icon: BookOpen },
  { key: 'Group Discussion', label: 'Group Discussion', icon: Users },
  { key: 'Government Exam', label: 'Govt Exams', icon: Shield },
] as const;

const difficultyColor: Record<string, string> = {
  Easy: 'bg-emerald-100 text-emerald-700',
  Medium: 'bg-amber-100 text-amber-700',
  Hard: 'bg-rose-100 text-rose-700',
};

const tabGradients: Record<string, string> = {
  HR: 'from-violet-500 to-purple-600',
  Technical: 'from-blue-500 to-cyan-600',
  'Group Discussion': 'from-emerald-500 to-teal-600',
  'Government Exam': 'from-orange-500 to-amber-600',
};

function QuestionCard({ q, index }: { q: InterviewQuestion; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left p-4 flex items-start gap-3"
      >
        <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
          <span className="text-xs font-bold text-primary">{index + 1}</span>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground text-sm leading-snug">{q.question}</h3>
          <div className="flex gap-1.5 mt-1.5">
            <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${difficultyColor[q.difficulty]}`}>
              {q.difficulty}
            </span>
            {q.jobType.slice(0, 2).map((jt) => (
              <span key={jt} className="text-[10px] bg-secondary text-secondary-foreground px-1.5 py-0.5 rounded-full">{jt}</span>
            ))}
          </div>
        </div>
        <ChevronDown className={`w-4 h-4 text-muted-foreground flex-shrink-0 transition-transform mt-1 ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-3">
              <div className="bg-primary/5 rounded-xl p-3">
                <p className="text-xs font-semibold text-primary mb-1 flex items-center gap-1">
                  <MessageSquare className="w-3 h-3" /> Model Answer
                </p>
                <p className="text-xs text-foreground leading-relaxed">{q.answer}</p>
              </div>
              <div className="bg-amber-50 dark:bg-amber-950/30 rounded-xl p-3">
                <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 mb-1 flex items-center gap-1">
                  <Lightbulb className="w-3 h-3" /> Pro Tip
                </p>
                <p className="text-xs text-foreground leading-relaxed">{q.tips}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function InterviewPrep() {
  const [activeTab, setActiveTab] = useState<string>('HR');

  const filtered = INTERVIEW_QUESTIONS.filter((q) => q.category === activeTab);

  return (
    <PageWrapper>
      <AppHeader title="Interview Prep" subtitle="Ace your next interview" showBack />

      <div className="px-4 py-4 space-y-4 pb-24">
        {/* Hero */}
        <div className={`bg-gradient-to-r ${tabGradients[activeTab]} rounded-2xl p-5 relative overflow-hidden`}>
          <div className="absolute top-2 right-3 opacity-10">
            <Sparkles className="w-20 h-20 text-white" />
          </div>
          <div className="relative">
            <h2 className="text-white font-bold text-lg">
              {TABS.find((t) => t.key === activeTab)?.label}
            </h2>
            <p className="text-white/80 text-xs mt-1">{filtered.length} questions with model answers & tips</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`whitespace-nowrap text-xs font-semibold px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                  activeTab === tab.key
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'bg-secondary text-secondary-foreground'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Questions */}
        <div className="space-y-3">
          {filtered.map((q, i) => (
            <QuestionCard key={q.id} q={q} index={i} />
          ))}
        </div>
      </div>

      <BottomNav />
    </PageWrapper>
  );
}
