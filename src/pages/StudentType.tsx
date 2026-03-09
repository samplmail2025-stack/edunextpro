import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { motion, AnimatePresence, type PanInfo } from 'framer-motion';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { BottomNav } from '@/components/layout/BottomNav';
import {
  School, GraduationCap, Sparkles, BookOpen, Building2, Briefcase,
  Target, Lightbulb, PenTool, FileText, Award, MessageSquare, FileUser,
  TrendingUp, BarChart3, Loader2, ChevronRight, ChevronLeft,
  Trophy, Star, Zap, Trash2, ClipboardList, Search, Calendar, IndianRupee, Clock, Flame
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { useMarks, type MarksEntry } from '@/hooks/useMarks';
import { CircularProgress } from '@/components/charts/CircularProgress';
import edunextLogo from '@/assets/edunext-logo.png';
import voorheesLogo from '@/assets/voorhees-logo.png';
import { GradeBarChart } from '@/components/charts/GradeBarChart';
import { Button } from '@/components/ui/button';
import studentsStudyingImg from '@/assets/students-studying.jpg';
import resultsImg from '@/assets/results-celebration.jpg';
import { BenefitsCarousel } from '@/components/BenefitsCarousel';
import { COURSES } from '@/data/courses';
import { ENTRANCE_EXAMS } from '@/data/exams';
import { SCHOLARSHIPS } from '@/data/scholarships';
import scienceImg from '@/assets/course-science.jpg';
import engineeringImg from '@/assets/course-engineering.jpg';
import businessImg from '@/assets/course-business.jpg';
import medicalImg from '@/assets/course-medical.jpg';
import artsImg from '@/assets/course-arts.jpg';
import lawImg from '@/assets/course-law.jpg';
import educationImg from '@/assets/course-education.jpg';

const COURSE_CATEGORY_IMAGES: Record<string, string> = {
  Science: scienceImg,
  'Science & Technology': engineeringImg,
  Engineering: engineeringImg,
  Management: businessImg,
  Commerce: businessImg,
  Medical: medicalImg,
  Arts: artsImg,
  Law: lawImg,
  Education: educationImg,
};

const DAILY_TIPS = [
  { tip: "Consistency beats intensity. Study 2 hours daily rather than 10 hours once a week.", icon: "📚" },
  { tip: "Use the Pomodoro technique: 25 min focus + 5 min break. Your brain retains more.", icon: "⏱️" },
  { tip: "Teach what you learn to someone else — it's the fastest way to master a topic.", icon: "🎓" },
  { tip: "Don't skip NCERT textbooks. 70% of competitive exam questions come from them.", icon: "📖" },
  { tip: "Start your day with the hardest subject. Your willpower is strongest in the morning.", icon: "🌅" },
  { tip: "Practice previous year papers. Patterns repeat more than you think.", icon: "📝" },
  { tip: "Sleep 7-8 hours. Your brain consolidates memory during deep sleep.", icon: "😴" },
  { tip: "Set SMART goals: Specific, Measurable, Achievable, Relevant, Time-bound.", icon: "🎯" },
  { tip: "Join a study group for difficult subjects. Discussion deepens understanding.", icon: "👥" },
  { tip: "Keep a mistake journal. Reviewing errors is more valuable than re-reading notes.", icon: "✍️" },
  { tip: "Apply to multiple scholarships — even small amounts add up over your degree.", icon: "💰" },
  { tip: "Read The Hindu or Dinamani daily for 20 minutes. It helps in every competitive exam.", icon: "📰" },
];

// Helper to parse subjects from a marks entry
function parseSubjects(entry: MarksEntry): {name: string;marks: number;maxMarks: number;}[] {
  if (!entry.subjects) return [];
  if (Array.isArray(entry.subjects)) return entry.subjects as {name: string;marks: number;maxMarks: number;}[];
  return Object.entries(entry.subjects as Record<string, number>).map(([name, marks]) => ({
    name, marks: marks as number, maxMarks: 100
  }));
}

function getPerformanceEmoji(pct: number) {
  if (pct >= 90) return '🏆';
  if (pct >= 75) return '🌟';
  if (pct >= 60) return '💪';
  if (pct >= 50) return '📈';
  return '🎯';
}

function getPerformanceLabel(pct: number) {
  if (pct >= 90) return 'Outstanding';
  if (pct >= 75) return 'Excellent';
  if (pct >= 60) return 'Good';
  if (pct >= 50) return 'Average';
  return 'Keep Going';
}

// Slide variants for left/right animation
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0
  }),
  center: {
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    x: direction > 0 ? '-100%' : '100%',
    opacity: 0
  })
};

export default function StudentType() {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const { marks, loading, deleteMarks } = useMarks();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const hasMarks = marks.length > 0;
  const firstName = profile?.full_name?.split(' ')[0] || 'Student';

  // Carousel state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const goNext = useCallback(() => {
    if (marks.length <= 1) return;
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % marks.length);
  }, [marks.length]);

  const goPrev = useCallback(() => {
    if (marks.length <= 1) return;
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + marks.length) % marks.length);
  }, [marks.length]);

  // Auto-slide every 5 seconds
  useEffect(() => {
    if (marks.length <= 1 || isPaused) return;
    const timer = setInterval(goNext, 5000);
    return () => clearInterval(timer);
  }, [marks.length, isPaused, goNext]);

  const currentEntry = marks[currentIndex];

  const handleRecommendations = (entry: MarksEntry) => {
    navigate('/recommendations', {
      state: {
        studentType: entry.student_type,
        percentage: entry.percentage ?? 0,
        cgpa: entry.cgpa,
        stream: entry.stream,
        level: entry.level,
        course: entry.course,
        classification: entry.classification
      }
    });
  };

  const handleViewResults = (entry: MarksEntry) => {
    const subjects = parseSubjects(entry);
    navigate('/results', {
      state: {
        studentType: entry.student_type,
        class: entry.class,
        stream: entry.stream,
        level: entry.level,
        course: entry.course,
        subjects,
        percentage: entry.percentage ?? 0,
        grade: entry.grade,
        classification: entry.classification ?? '-',
        cgpa: entry.cgpa
      }
    });
  };

  return (
    <PageWrapper>
      {/* Hero Banner */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={hasMarks ? resultsImg : studentsStudyingImg} alt="Banner" loading="lazy" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/80 to-background" />
        </div>
        <div className="relative pt-10 pb-16 px-6 text-center">
          <div className="absolute inset-0 opacity-[0.05]">
            <BookOpen className="absolute top-6 right-12 w-10 h-10 text-white" />
            <GraduationCap className="absolute bottom-8 left-12 w-12 h-12 text-white" />
            <Lightbulb className="absolute top-16 left-1/2 w-8 h-8 text-white" />
            <PenTool className="absolute bottom-12 right-1/3 w-7 h-7 text-white" />
          </div>
          <motion.div initial={{ opacity: 0, y: -15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="relative">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span className="text-white/90 text-xs font-medium tracking-wide uppercase">Welcome back, {firstName}! 👋</span>
            </div>
            <h1 className="text-2xl font-bold text-white mt-1 tracking-tight">
              {hasMarks ? 'Academic Dashboard' : 'Get Started'}
            </h1>
            <p className="text-white/70 text-sm mt-1.5 max-w-xs mx-auto">
              {hasMarks ? 'Track performance & discover opportunities' : 'Select your student category to begin'}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="px-4 -mt-10 pb-8 space-y-5 max-w-lg mx-auto relative z-10">
        {/* Loading */}
        {loading &&
        <div className="flex flex-col items-center justify-center py-16 gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Loading your data...</p>
          </div>
        }

        {/* ========== MARKS CAROUSEL ========== */}
        {!loading && hasMarks && currentEntry &&
        <>
            {/* Slide counter + controls */}
            {marks.length > 1 &&
          <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-muted-foreground">
                  {currentIndex + 1} / {marks.length} Records
                </p>
                












            
              </div>
          }

            {/* Animated Slide */}
            <div
            className="relative overflow-hidden touch-pan-y"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}>
            
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                key={currentEntry.id || currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                drag={marks.length > 1 ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.15}
                onDragEnd={(_: unknown, info: PanInfo) => {
                  const swipeThreshold = 50;
                  if (info.offset.x < -swipeThreshold) {
                    goNext();
                    setIsPaused(true);
                    setTimeout(() => setIsPaused(false), 5000);
                  } else if (info.offset.x > swipeThreshold) {
                    goPrev();
                    setIsPaused(true);
                    setTimeout(() => setIsPaused(false), 5000);
                  }
                }}>
                
                  <MarksSlideCard
                  entry={currentEntry}
                  onRecommendations={() => handleRecommendations(currentEntry)}
                  onViewResults={() => handleViewResults(currentEntry)}
                  onDelete={async () => {
                    if (!currentEntry.id) return;
                    setDeletingId(currentEntry.id);
                    const { error } = await deleteMarks(currentEntry.id);
                    setDeletingId(null);
                    if (error) {
                      toast({ title: 'Error', description: 'Failed to delete entry', variant: 'destructive' });
                    } else {
                      toast({ title: 'Deleted', description: 'Marks entry removed' });
                      if (currentIndex >= marks.length - 1) setCurrentIndex(Math.max(0, marks.length - 2));
                    }
                  }}
                  isDeleting={deletingId === currentEntry.id} />
                
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Dot indicators */}
            {marks.length > 1 &&
          <div className="flex items-center justify-center gap-1.5">
                {marks.map((_, i) =>
            <button
              key={i}
              onClick={() => {setDirection(i > currentIndex ? 1 : -1);setCurrentIndex(i);setIsPaused(true);}}
              className={`h-1.5 rounded-full transition-all duration-300 ${
              i === currentIndex ? 'w-6 bg-primary' : 'w-1.5 bg-muted-foreground/30'}`
              } />

            )}
              </div>
          }
          </>
        }

        {/* No marks - prompt */}
        {!loading && !hasMarks &&
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-[1.25rem] p-6 border border-border shadow-lg text-center space-y-5">
          
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/15 to-violet-500/10 flex items-center justify-center mx-auto ring-4 ring-primary/5">
              <BarChart3 className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground">No Marks Yet</h3>
              <p className="text-sm text-muted-foreground mt-1">Enter your marks to see performance analytics</p>
            </div>
            <button
              onClick={() => navigate('/marks')}
              className="relative w-full overflow-hidden rounded-2xl h-14 font-bold text-sm text-white shadow-lg shadow-primary/25 transition-all active:scale-[0.95] group/cta">
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-violet-600 to-fuchsia-500" />
              <div className="absolute -top-2 -right-2 w-20 h-20 bg-white/10 rounded-full blur-xl group-hover/cta:scale-150 transition-transform duration-500" />
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              <span className="relative flex items-center justify-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <ClipboardList className="w-3.5 h-3.5" />
                </span>
                Enter Your Marks
                <ChevronRight className="w-4 h-4 opacity-60 group-hover/cta:translate-x-0.5 transition-transform" />
              </span>
            </button>
          </motion.div>
        }

        {/* Quick Actions Grid */}
        {!loading &&
        <div className="space-y-3 pt-1">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-primary" />
            <p className="text-xs font-bold text-foreground uppercase tracking-wider">Quick Actions</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { path: '/marks', icon: ClipboardList, label: 'Enter Marks', desc: 'Add your scores', gradient: 'from-primary to-primary/80', bg: 'bg-primary/5' },
              { path: '/college-finder', icon: Search, label: 'Find Colleges', desc: '170+ TN colleges', gradient: 'from-emerald-500 to-teal-600', bg: 'bg-emerald-500/5' },
              { path: '/recommendations', icon: BookOpen, label: 'Browse Courses', desc: '110+ programs', gradient: 'from-violet-500 to-purple-600', bg: 'bg-violet-500/5' },
              { path: '/jobs', icon: Briefcase, label: 'Explore Jobs', desc: '75+ career paths', gradient: 'from-amber-500 to-orange-600', bg: 'bg-amber-500/5' },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 + i * 0.06 }}
                  onClick={() => navigate(item.path)}
                  className="relative overflow-hidden rounded-2xl p-4 cursor-pointer hover:shadow-lg transition-all border border-border/40 active:scale-[0.95] group/qa bg-card">
                  <div className={`absolute top-0 right-0 w-24 h-24 rounded-full bg-gradient-to-br ${item.gradient} opacity-[0.07] -translate-y-8 translate-x-8 group-hover/qa:scale-150 transition-transform duration-500`} />
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-3 shadow-md`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-bold text-foreground text-sm">{item.label}</h3>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{item.desc}</p>
                  <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/50 absolute top-4 right-3.5 group-hover/qa:text-primary transition-colors" />
                </motion.div>
              );
            })}
          </div>
        </div>
        }


        {!loading && <BenefitsCarousel />}

        {/* Popular Courses */}
        {!loading &&
        <div className="space-y-3 pt-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-primary" />
              <p className="text-xs font-bold text-foreground uppercase tracking-wider">Popular Courses</p>
            </div>
            <button onClick={() => navigate('/recommendations')} className="text-xs font-medium text-primary flex items-center gap-0.5">
              View All <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2 -mx-1 px-1 scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
            {COURSES.filter(c => c.level === 'UG').slice(0, 6).map((course, i) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
                onClick={() => navigate(`/college-finder?course=${encodeURIComponent(course.name)}`)}
                className="flex-shrink-0 w-36 snap-start bg-card rounded-2xl border border-border/50 overflow-hidden cursor-pointer hover:shadow-md transition-all active:scale-95">
                <div className="relative h-20 overflow-hidden">
                  <img
                    src={COURSE_CATEGORY_IMAGES[course.category] || scienceImg}
                    alt={course.name}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <GraduationCap className="absolute bottom-2 right-2 w-5 h-5 text-white/70" />
                </div>
                <div className="p-3">
                  <h4 className="text-xs font-bold text-foreground line-clamp-2 leading-tight">{course.name}</h4>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <span className="text-[10px] text-muted-foreground">{course.duration}</span>
                    <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                    <span className="text-[10px] font-medium text-primary">{course.level}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        }

        {/* Career Tools */}
        {!loading &&
        <>
            <div className="space-y-3 pt-1">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-primary" />
                <p className="text-xs font-bold text-foreground uppercase tracking-wider">Career Tools</p>
              </div>
              {[
            { path: '/scholarships', icon: Award, label: 'Scholarship Finder', desc: '40+ scholarships for TN students', gradient: 'from-emerald-500 to-teal-600', accent: 'text-emerald-600', accentBg: 'bg-emerald-500/8' },
            { path: '/interview-prep', icon: MessageSquare, label: 'Interview Prep', desc: 'HR, Technical & GD questions', gradient: 'from-violet-500 to-purple-600', accent: 'text-violet-600', accentBg: 'bg-violet-500/8' },
            { path: '/resume-builder', icon: FileUser, label: 'Resume Builder', desc: 'Create professional CV instantly', gradient: 'from-blue-500 to-indigo-600', accent: 'text-blue-600', accentBg: 'bg-blue-500/8' }].
            map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + i * 0.08 }}
                  onClick={() => navigate(item.path)}
                  className="w-full bg-card rounded-2xl p-4 flex items-center gap-3.5 cursor-pointer hover:shadow-lg transition-all border border-border/50 group relative overflow-hidden active:scale-[0.98]">
                  <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${item.gradient} rounded-l-2xl`} />
                  <div className={`absolute -bottom-8 -right-8 w-32 h-32 rounded-full ${item.accentBg} group-hover:scale-150 transition-transform duration-700`} />
                    <div className={`relative w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center flex-shrink-0 shadow-md`}>
                      <Icon className="w-5.5 h-5.5 text-white" />
                    </div>
                    <div className="relative flex-1 min-w-0">
                      <h3 className="font-bold text-foreground text-sm">{item.label}</h3>
                      <p className="text-xs text-muted-foreground truncate mt-0.5">{item.desc}</p>
                    </div>
                    <div className={`relative w-8 h-8 rounded-lg ${item.accentBg} flex items-center justify-center flex-shrink-0`}>
                      <ChevronRight className={`w-4 h-4 ${item.accent} group-hover:translate-x-0.5 transition-transform`} />
                    </div>
                  </motion.div>);

            })}
            </div>

            {/* Entrance Exams */}
            <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            onClick={() => navigate('/entrance-exams')}
            className="w-full bg-card rounded-2xl p-4 flex items-center gap-3.5 cursor-pointer hover:shadow-lg transition-all border border-border/50 group relative overflow-hidden active:scale-[0.98]">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-amber-500 to-orange-500 rounded-l-2xl" />
              <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-amber-500/8 group-hover:scale-150 transition-transform duration-700" />
              <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center flex-shrink-0 shadow-md">
                <FileText className="w-5.5 h-5.5 text-white" />
              </div>
              <div className="relative flex-1">
                <h3 className="font-bold text-foreground text-sm">Entrance Exams Guide</h3>
                <p className="text-xs text-muted-foreground mt-0.5">TNEA, NEET, JEE, TNPSC & more</p>
              </div>
              <div className="relative w-8 h-8 rounded-lg bg-amber-500/8 flex items-center justify-center flex-shrink-0">
                <ChevronRight className="w-4 h-4 text-amber-600 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </motion.div>

            {/* Upcoming Exam Deadlines */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  <p className="text-xs font-bold text-foreground uppercase tracking-wider">Upcoming Exams</p>
                </div>
                <button onClick={() => navigate('/entrance-exams')} className="text-xs font-medium text-primary flex items-center gap-0.5">
                  All Exams <ChevronRight className="w-3 h-3" />
                </button>
              </div>
              <div className="bg-card rounded-2xl border border-border/50 overflow-hidden divide-y divide-border/40">
                {ENTRANCE_EXAMS.slice(0, 4).map((exam, i) => {
                  const nextDate = exam.importantDates[0];
                  return (
                    <motion.div
                      key={exam.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                      onClick={() => navigate('/entrance-exams')}
                      className="flex items-center gap-3 p-3.5 cursor-pointer hover:bg-muted/40 transition-colors">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        exam.level === 'National' ? 'bg-primary/10' : 'bg-amber-500/10'
                      }`}>
                        <FileText className={`w-4 h-4 ${exam.level === 'National' ? 'text-primary' : 'text-amber-600'}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-foreground">{exam.name}</h4>
                        <p className="text-[11px] text-muted-foreground truncate">{exam.category}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-[11px] font-medium text-foreground">{nextDate?.date}</p>
                        <p className="text-[10px] text-muted-foreground">{nextDate?.label}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Top Scholarships */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <IndianRupee className="w-4 h-4 text-primary" />
                  <p className="text-xs font-bold text-foreground uppercase tracking-wider">Top Scholarships</p>
                </div>
                <button onClick={() => navigate('/scholarships')} className="text-xs font-medium text-primary flex items-center gap-0.5">
                  View All <ChevronRight className="w-3 h-3" />
                </button>
              </div>
              <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2 -mx-1 px-1" style={{ scrollbarWidth: 'none' }}>
                {SCHOLARSHIPS.slice(0, 4).map((sch, i) => (
                  <motion.div
                    key={sch.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.06 }}
                    onClick={() => navigate('/scholarships')}
                    className="flex-shrink-0 w-52 snap-start bg-card rounded-2xl border border-border/50 p-4 cursor-pointer hover:shadow-md transition-all active:scale-95 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                        <Award className="w-4 h-4 text-emerald-600" />
                      </div>
                      <h4 className="text-xs font-bold text-foreground line-clamp-2 leading-tight">{sch.name}</h4>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5">
                        <IndianRupee className="w-3 h-3 text-emerald-500" />
                        <span className="text-xs font-semibold text-emerald-600">{sch.amount}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-muted-foreground" />
                        <span className="text-[11px] text-muted-foreground">{sch.deadline}</span>
                      </div>
                    </div>
                    <span className={`inline-block text-[10px] font-medium px-2 py-0.5 rounded-full ${
                      sch.category === 'Merit' ? 'bg-blue-500/10 text-blue-600' :
                      sch.category === 'Income' ? 'bg-amber-500/10 text-amber-600' :
                      'bg-violet-500/10 text-violet-600'
                    }`}>{sch.category}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Daily Tip */}
            {(() => {
              const dayIndex = Math.floor(Date.now() / 86400000) % DAILY_TIPS.length;
              const todayTip = DAILY_TIPS[dayIndex];
              return (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-2xl p-5 border border-primary/10 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{todayTip.icon}</span>
                    <div className="flex items-center gap-1.5">
                      <Lightbulb className="w-3.5 h-3.5 text-primary" />
                      <p className="text-xs font-bold text-primary uppercase tracking-wider">Tip of the Day</p>
                    </div>
                  </div>
                  <p className="text-sm text-foreground leading-relaxed font-medium">{todayTip.tip}</p>
                </motion.div>
              );
            })()}

            {/* Info Cards */}
            <div className="grid grid-cols-2 gap-3">
              {[
            { icon: BookOpen, label: '110+ Courses', bg: 'bg-edu-blue-light', color: 'text-edu-blue', desc: 'Available' },
            { icon: Building2, label: '170+ Colleges', bg: 'bg-edu-green-light', color: 'text-edu-green', desc: 'Listed' },
            { icon: Briefcase, label: '75+ Job Paths', bg: 'bg-edu-orange-light', color: 'text-edu-orange', desc: 'Career paths' },
            { icon: Target, label: 'Smart AI', bg: 'bg-edu-purple-light', color: 'text-edu-purple', desc: 'Recommendations' }].
            map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.45 + i * 0.08 }}
                  className={`${item.bg} rounded-2xl p-4 text-center border border-border/30`}>
                  
                    <Icon className={`w-6 h-6 mx-auto mb-1.5 ${item.color}`} />
                    <p className={`text-sm font-bold ${item.color}`}>{item.label}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{item.desc}</p>
                  </motion.div>);

            })}
            </div>

            {/* Developer Credit Banner */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="mt-6 mb-24 rounded-2xl overflow-hidden border border-border/30"
              style={{ background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(262 83% 58%))' }}
            >
              <div className="px-5 py-5">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-white/95 flex items-center justify-center shadow-lg">
                    <img src={edunextLogo} alt="EduNext" className="w-9 h-9 object-contain" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-white/60" />
                    <div className="w-6 h-0.5 bg-white/40 rounded-full" />
                    <div className="w-2 h-2 rounded-full bg-white/60" />
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-white/95 flex items-center justify-center shadow-lg">
                    <img src={voorheesLogo} alt="Voorhees College" className="w-9 h-9 object-contain" />
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-white/70 text-[10px] font-semibold tracking-widest uppercase">Developed by</p>
                  <p className="text-white font-bold text-sm mt-0.5">Voorhees College</p>
                  <p className="text-white/80 text-xs">BCA Department · Vellore</p>
                </div>
              </div>
            </motion.div>
          </>
        }
      </div>
      <BottomNav />
    </PageWrapper>);

}

// ============ Individual Marks Slide Card ============
function MarksSlideCard({
  entry,
  onRecommendations,
  onViewResults,
  onDelete,
  isDeleting
}: {entry: MarksEntry;onRecommendations: () => void;onViewResults: () => void;onDelete: () => void;isDeleting: boolean;}) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const pct = entry.percentage ?? 0;
  const cgpa = entry.cgpa;
  const classification = entry.classification ?? '-';
  const grade = entry.grade ?? '-';
  const isSchool = entry.student_type === 'school';
  const subjects = parseSubjects(entry);

  const typeLabel = isSchool ?
  `${entry.class || ''}${entry.stream ? ` · ${entry.stream}` : ''}` :
  `${entry.level || ''}${entry.course ? ` · ${entry.course}` : ''}`;

  const dateLabel = entry.created_at ?
  new Date(entry.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) :
  '';

  return (
    <div className="bg-card rounded-[1.25rem] overflow-hidden border border-border shadow-xl shadow-primary/5">
      {/* Gradient Header */}
      <div className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/80 p-4 sm:p-5 pb-4">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent_60%)]" />
        <div className="relative">
          {/* Badges row */}
          <div className="flex items-center justify-between gap-2 mb-3 flex-wrap">
            <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm rounded-full px-2.5 py-1.5 min-w-0">
              {isSchool ?
              <School className="w-3.5 h-3.5 text-white/90 flex-shrink-0" /> :
              <GraduationCap className="w-3.5 h-3.5 text-white/90 flex-shrink-0" />
              }
              <span className="text-[11px] sm:text-xs font-medium text-white/90 truncate">{typeLabel}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm rounded-full px-2.5 py-1.5 flex-shrink-0">
                <Trophy className="w-3.5 h-3.5 text-yellow-300" />
                <span className="text-[11px] sm:text-xs font-semibold text-white">{classification}</span>
              </div>
              {!confirmDelete ? (
                <button
                  onClick={(e) => { e.stopPropagation(); setConfirmDelete(true); }}
                  className="w-7 h-7 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-red-500/30 transition-colors"
                  title="Delete entry">
                  <Trash2 className="w-3.5 h-3.5 text-white/70" />
                </button>
              ) : (
                <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => { onDelete(); setConfirmDelete(false); }}
                    disabled={isDeleting}
                    className="px-2 py-1 rounded-full bg-red-500/80 text-[10px] font-semibold text-white hover:bg-red-600 transition-colors disabled:opacity-50">
                    {isDeleting ? '...' : 'Delete'}
                  </button>
                  <button
                    onClick={() => setConfirmDelete(false)}
                    className="px-2 py-1 rounded-full bg-white/15 text-[10px] font-medium text-white hover:bg-white/25 transition-colors">
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Scores */}
          <div className="flex items-end justify-between gap-3">
            <div className="min-w-0">
              <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">{pct}%</p>
              <p className="text-xs sm:text-sm text-white/60 mt-0.5 font-medium">Overall Percentage</p>
            </div>
            {cgpa != null &&
            <div className="text-right flex-shrink-0">
                <p className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">{cgpa}</p>
                <p className="text-xs sm:text-sm text-white/60 mt-0.5 font-medium">CGPA</p>
              </div>
            }
          </div>

          {/* Progress bar */}
          <div className="mt-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] text-white/60">{getPerformanceEmoji(pct)} {getPerformanceLabel(pct)}</span>
              {dateLabel && <span className="text-[10px] text-white/40">{dateLabel}</span>}
            </div>
            <div className="h-1.5 bg-white/15 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(pct, 100)}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-yellow-300 to-emerald-300 rounded-full" />
              
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 sm:p-5 space-y-4">
        {/* Circular + Stats */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex-shrink-0">
            <CircularProgress
              percentage={pct}
              size={90}
              strokeWidth={8}
              sublabel="Score"
              colorClass={pct >= 75 ? 'green' : pct >= 50 ? 'orange' : 'primary'} />
            
          </div>
          <div className="w-full flex-1 space-y-2">
            {[
            { label: 'Grade', value: grade, icon: Star, color: 'text-yellow-500' },
            { label: 'Classification', value: classification, icon: TrendingUp, color: 'text-emerald-500' },
            ...(cgpa != null ? [{ label: 'CGPA', value: String(cgpa), icon: Target, color: 'text-primary' }] : [])].
            map((stat) =>
            <div key={stat.label} className="flex items-center gap-2 bg-muted/40 rounded-xl px-3 py-2 border border-border/50">
                <div className="w-6 h-6 rounded-lg bg-background flex items-center justify-center flex-shrink-0 shadow-sm">
                  <stat.icon className={`w-3 h-3 ${stat.color}`} />
                </div>
                <span className="text-xs text-muted-foreground flex-1 truncate">{stat.label}</span>
                <span className="text-sm font-bold text-foreground flex-shrink-0">{stat.value}</span>
              </div>
            )}
          </div>
        </div>

        {/* Subject chart */}
        {subjects.length > 0 &&
        <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <BarChart3 className="w-3.5 h-3.5 text-primary" />
                <p className="text-xs font-semibold text-foreground">Subjects</p>
              </div>
              <span className="text-[10px] text-muted-foreground">{subjects.length} subjects</span>
            </div>
            <div className="bg-muted/20 rounded-xl p-2.5 border border-border/40">
              <GradeBarChart data={subjects.map((s) => ({ subject: s.name, marks: s.marks, maxMarks: s.maxMarks }))} />
            </div>
          </div>
        }

        {/* Actions */}
        <motion.div
          className="grid grid-cols-2 gap-3"
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
        >
          <motion.button
            variants={{ hidden: { opacity: 0, y: 20, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } } }}
            onClick={onRecommendations}
            className="relative overflow-hidden rounded-2xl p-4 text-left transition-all active:scale-[0.96] group/btn bg-card border border-border/50 hover:shadow-xl hover:shadow-primary/10"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-violet-500 to-fuchsia-500" />
            <div className="absolute -bottom-6 -right-6 w-28 h-28 rounded-full bg-gradient-to-br from-primary/8 to-violet-500/5 group-hover/btn:scale-125 transition-transform duration-700" />
            <div className="relative space-y-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-violet-600 flex items-center justify-center shadow-md shadow-primary/20">
                <Target className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-foreground">Recommendations</h4>
                <p className="text-[11px] text-muted-foreground mt-0.5">AI-powered suggestions</p>
              </div>
              <div className="flex items-center gap-1 text-[11px] font-semibold text-primary">
                <span>Explore</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
              </div>
            </div>
          </motion.button>

          <motion.button
            onClick={onViewResults}
            variants={{ hidden: { opacity: 0, y: 20, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } } }}
            className="relative overflow-hidden rounded-2xl p-4 text-left transition-all active:scale-[0.96] group/btn2 bg-card border border-border/50 hover:shadow-xl hover:shadow-emerald-500/10"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500" />
            <div className="absolute -bottom-6 -right-6 w-28 h-28 rounded-full bg-gradient-to-br from-emerald-500/8 to-teal-500/5 group-hover/btn2:scale-125 transition-transform duration-700" />
            <div className="relative space-y-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-md shadow-emerald-500/20">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-foreground">Full Results</h4>
                <p className="text-[11px] text-muted-foreground mt-0.5">Detailed analytics</p>
              </div>
              <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
                <span>View</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover/btn2:translate-x-1 transition-transform" />
              </div>
            </div>
          </motion.button>
        </motion.div>
      </div>
    </div>);

}