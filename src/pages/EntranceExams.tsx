import { useState, useMemo } from 'react';
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
import { ENTRANCE_EXAMS, Exam } from '@/data/exams';
import {
  GraduationCap, Calendar, Globe, ChevronDown, ChevronUp,
  BookOpen, Lightbulb, ExternalLink, Shield, Award, Building2,
  Stethoscope, Briefcase, Scale, Search, Filter
} from 'lucide-react';
import { Input } from '@/components/ui/input';

const LEVEL_FILTERS = ['All', 'State', 'National'] as const;
const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  Engineering: <GraduationCap className="w-4 h-4" />,
  Medical: <Stethoscope className="w-4 h-4" />,
  'Medical Jobs': <Stethoscope className="w-4 h-4" />,
  'Government Jobs': <Shield className="w-4 h-4" />,
  'Police / Defence': <Shield className="w-4 h-4" />,
  'Engineering (IIT)': <Award className="w-4 h-4" />,
  'M.Tech / PSU Jobs': <Building2 className="w-4 h-4" />,
  MBA: <Briefcase className="w-4 h-4" />,
  Law: <Scale className="w-4 h-4" />,
  Teaching: <BookOpen className="w-4 h-4" />,
  'Lecturership / PhD': <BookOpen className="w-4 h-4" />,
  'PG (MBA / MCA / M.Tech)': <GraduationCap className="w-4 h-4" />,
};

const LEVEL_STYLES: Record<string, string> = {
  State: 'gradient-orange',
  National: 'gradient-blue',
  University: 'gradient-purple',
};

function ExamCard({ exam }: { exam: Exam }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-card rounded-2xl overflow-hidden card-shadow border border-border animate-fade-in">
      {/* Header */}
      <div className={`${LEVEL_STYLES[exam.level] || 'gradient-primary'} p-4 relative overflow-hidden`}>
        <GraduationCap className="absolute -right-3 -top-3 w-20 h-20 text-white/[0.07] rotate-12" />
        <div className="flex items-start justify-between gap-2 relative z-10">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-white/20 text-white backdrop-blur-sm">
                {exam.level}
              </span>
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-white/15 text-white/90 backdrop-blur-sm flex items-center gap-1">
                {CATEGORY_ICONS[exam.category] || <BookOpen className="w-3.5 h-3.5" />}
                {exam.category}
              </span>
            </div>
            <h3 className="font-bold text-white text-lg leading-tight">{exam.name}</h3>
            <p className="text-white/70 text-xs mt-0.5">{exam.fullName}</p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 space-y-3">
        <p className="text-sm text-muted-foreground leading-relaxed">{exam.description}</p>

        {/* Quick Info */}
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2 p-2.5 bg-muted/50 rounded-xl">
            <Calendar className="w-4 h-4 text-edu-blue flex-shrink-0" />
            <span className="text-xs text-foreground font-medium">{exam.frequency}</span>
          </div>
          <a
            href={exam.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-2.5 bg-muted/50 rounded-xl hover:bg-primary/10 transition-colors"
          >
            <Globe className="w-4 h-4 text-edu-green flex-shrink-0" />
            <span className="text-xs text-primary font-medium">Official Site</span>
            <ExternalLink className="w-3 h-3 text-primary ml-auto" />
          </a>
        </div>

        {/* Eligibility */}
        <div className="p-3 bg-muted/50 rounded-xl">
          <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider mb-1">Eligibility</p>
          <p className="text-xs text-foreground leading-relaxed">{exam.eligibility}</p>
        </div>

        {/* Expand/Collapse */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
        >
          {expanded ? 'Show Less' : 'View Dates, Tips & Resources'}
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {expanded && (
          <div className="space-y-3 animate-fade-in">
            {/* Important Dates */}
            <div className="p-3 bg-edu-blue-light rounded-xl">
              <h4 className="font-semibold text-edu-blue text-sm mb-2 flex items-center gap-1.5">
                <Calendar className="w-4 h-4" /> Important Dates
              </h4>
              <div className="space-y-2">
                {exam.importantDates.map((d, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-xs text-edu-blue/80">{d.label}</span>
                    <span className="text-xs font-semibold text-edu-blue">{d.date}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Preparation Tips */}
            <div className="p-3 bg-edu-green-light rounded-xl">
              <h4 className="font-semibold text-edu-green text-sm mb-2 flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4" /> Preparation Tips
              </h4>
              <div className="space-y-2">
                {exam.preparationTips.map((tip, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-edu-green text-xs mt-0.5">✓</span>
                    <p className="text-xs text-foreground leading-relaxed">{tip}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Resources */}
            <div className="p-3 bg-edu-purple-light rounded-xl">
              <h4 className="font-semibold text-edu-purple text-sm mb-2 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" /> Resources
              </h4>
              <div className="space-y-2">
                {exam.resources.map((r, i) => (
                  <a
                    key={i}
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs text-edu-purple hover:underline"
                  >
                    <ExternalLink className="w-3 h-3 flex-shrink-0" />
                    {r.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Relevant streams */}
            {exam.forStreams.length > 0 && (
              <div>
                <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider mb-1.5">Recommended For</p>
                <div className="flex flex-wrap gap-1.5">
                  {exam.forStreams.map((s) => (
                    <span key={s} className="text-[11px] font-medium bg-primary/8 text-primary px-2.5 py-1 rounded-lg border border-primary/10">{s}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function EntranceExams() {
  const [level, setLevel] = useState<'All' | 'State' | 'National'>('All');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return ENTRANCE_EXAMS.filter((e) => {
      if (level !== 'All' && e.level !== level) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          e.name.toLowerCase().includes(q) ||
          e.fullName.toLowerCase().includes(q) ||
          e.category.toLowerCase().includes(q) ||
          e.forStreams.some(s => s.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [level, search]);

  return (
    <PageWrapper>
      <AppHeader title="Entrance Exams" subtitle="TN & National exam guide with dates & tips" showBack gradient />
      <div className="p-4 space-y-4 max-w-lg mx-auto">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search exams (NEET, TNPSC, JEE...)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 rounded-xl"
          />
        </div>

        {/* Level filter */}
        <div className="flex gap-2">
          {LEVEL_FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setLevel(f)}
              className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${level === f ? 'gradient-primary text-white shadow' : 'bg-card border border-border text-foreground'}`}
            >
              {f === 'All' ? <span className="flex items-center justify-center gap-1"><Filter className="w-3.5 h-3.5" /> All</span> : f}
            </button>
          ))}
        </div>

        {/* Count */}
        <p className="text-xs text-muted-foreground">{filtered.length} exam{filtered.length !== 1 ? 's' : ''} found</p>

        {/* Cards */}
        <div className="space-y-4">
          {filtered.map((exam, i) => (
            <motion.div
              key={exam.id}
              custom={i % 10}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
            >
              <ExamCard exam={exam} />
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <GraduationCap className="w-12 h-12 mx-auto mb-2 opacity-30" />
            <p>No exams match your search.</p>
          </div>
        )}
      </div>
      <BottomNav />
    </PageWrapper>
  );
}
