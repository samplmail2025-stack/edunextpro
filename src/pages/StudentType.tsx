import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, type PanInfo } from 'framer-motion';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { BottomNav } from '@/components/layout/BottomNav';
import {
  School, GraduationCap, Sparkles, BookOpen, Building2, Briefcase,
  Target, Lightbulb, PenTool, FileText, Award, MessageSquare, FileUser,
  TrendingUp, BarChart3, Loader2, ChevronRight, ChevronLeft,
  Trophy, Star, Zap, Trash2 } from
'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { useMarks, type MarksEntry } from '@/hooks/useMarks';
import { CircularProgress } from '@/components/charts/CircularProgress';
import { GradeBarChart } from '@/components/charts/GradeBarChart';
import { Button } from '@/components/ui/button';
import studentsStudyingImg from '@/assets/students-studying.jpg';
import resultsImg from '@/assets/results-celebration.jpg';

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
          className="bg-card rounded-[1.25rem] p-6 border border-border shadow-lg text-center space-y-4">
          
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
              <BarChart3 className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground">No Marks Yet</h3>
              <p className="text-sm text-muted-foreground mt-1">Enter your marks to see performance analytics</p>
            </div>
            <Button onClick={() => navigate('/marks')} className="rounded-xl bg-gradient-to-r from-primary to-primary/85 text-primary-foreground">
              Enter Marks <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </motion.div>
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
            { path: '/scholarships', icon: Award, label: 'Scholarship Finder', desc: '40+ scholarships for TN students', gradient: 'from-emerald-500 to-teal-600', bg: 'bg-emerald-50/80 dark:bg-emerald-950/20' },
            { path: '/interview-prep', icon: MessageSquare, label: 'Interview Prep', desc: 'HR, Technical & GD questions', gradient: 'from-violet-500 to-purple-600', bg: 'bg-violet-50/80 dark:bg-violet-950/20' },
            { path: '/resume-builder', icon: FileUser, label: 'Resume Builder', desc: 'Create professional CV instantly', gradient: 'from-blue-500 to-indigo-600', bg: 'bg-blue-50/80 dark:bg-blue-950/20' }].
            map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + i * 0.08 }}
                  onClick={() => navigate(item.path)}
                  className={`w-full ${item.bg} rounded-2xl p-4 flex items-center gap-3.5 cursor-pointer hover:shadow-md transition-all border border-border/40 group`}>
                  
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center flex-shrink-0 shadow-sm`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground text-sm">{item.label}</h3>
                      <p className="text-xs text-muted-foreground truncate">{item.desc}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                  </motion.div>);

            })}
            </div>

            {/* Entrance Exams */}
            <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            onClick={() => navigate('/entrance-exams')}
            className="w-full bg-edu-yellow-light/80 rounded-2xl p-4 flex items-center gap-3.5 cursor-pointer hover:shadow-md transition-all border border-edu-yellow/15 group">
            
              <div className="w-11 h-11 rounded-xl gradient-yellow flex items-center justify-center flex-shrink-0 shadow-sm">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground text-sm">Entrance Exams Guide</h3>
                <p className="text-xs text-muted-foreground">TNEA, NEET, JEE, TNPSC & more</p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-edu-yellow transition-colors flex-shrink-0" />
            </motion.div>

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
        <div className="flex gap-2.5">
          <button
            onClick={onRecommendations}
            className="flex-1 relative overflow-hidden rounded-2xl h-12 font-bold text-xs sm:text-sm text-white shadow-lg shadow-primary/25 transition-all active:scale-[0.97] group/btn"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-violet-600" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_60%)]" />
            <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity bg-gradient-to-r from-violet-600 via-primary to-primary" />
            <span className="relative flex items-center justify-center gap-1.5">
              <Target className="w-4 h-4" />
              Recommendations
            </span>
          </button>
          <button
            onClick={onViewResults}
            className="flex-1 relative overflow-hidden rounded-2xl h-12 font-bold text-xs sm:text-sm text-foreground border-2 border-border/60 bg-card hover:bg-muted/60 transition-all active:scale-[0.97] group/btn2"
          >
            <span className="relative flex items-center justify-center gap-1.5">
              <BarChart3 className="w-4 h-4 text-primary" />
              Full Results
            </span>
          </button>
        </div>
      </div>
    </div>);

}