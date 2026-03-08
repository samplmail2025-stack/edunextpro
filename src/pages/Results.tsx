import { useLocation, useNavigate } from 'react-router-dom';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { BottomNav } from '@/components/layout/BottomNav';
import { AppHeader } from '@/components/layout/AppHeader';
import { CircularProgress } from '@/components/charts/CircularProgress';
import { GradeBarChart } from '@/components/charts/GradeBarChart';
import { Button } from '@/components/ui/button';
import { Trophy, Star, TrendingUp, BookOpen, Loader2, Download, Share2, Sparkles, Award, GraduationCap } from 'lucide-react';
import { useMarks } from '@/hooks/useMarks';
import { useAuth } from '@/hooks/useAuth';
import { generateResultsPDF } from '@/lib/generateResultsPDF';
import resultsHeroImg from '@/assets/results-celebration.jpg';
import { motion, AnimatePresence } from 'framer-motion';

interface SemSubject { name: string; marks: number; maxMarks: number; credits?: number }
interface SemesterData { semester: number; subjects: SemSubject[] }

interface LocationState {
  studentType: 'school' | 'college';
  class?: string;
  stream?: string;
  level?: string;
  course?: string;
  subjects?: SemSubject[];
  percentage: number;
  grade?: string;
  classification: string;
  cgpa?: number;
  semesters?: SemesterData[];
}

function flattenSemesters(semesters?: SemesterData[]): SemSubject[] {
  if (!semesters) return [];
  return semesters.flatMap(sem => sem.subjects.filter(s => s.name));
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { type: 'spring', stiffness: 300, damping: 24 }
  }
};

const floatVariants = {
  animate: {
    y: [0, -6, 0],
    transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
  }
};

const pulseGlow = {
  animate: {
    boxShadow: [
      '0 0 0 0 rgba(99,102,241,0)',
      '0 0 20px 8px rgba(99,102,241,0.15)',
      '0 0 0 0 rgba(99,102,241,0)',
    ],
    transition: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }
  }
};

const classificationEmoji: Record<string, string> = {
  Distinction: '🌟',
  'First Class': '🎖️',
  'Second Class': '📘',
  'Third Class': '📙',
  Outstanding: '💎',
  Fail: '📕',
};

const classificationGradient: Record<string, string> = {
  Distinction: 'from-emerald-500 via-green-500 to-teal-500',
  'First Class': 'from-blue-500 via-indigo-500 to-violet-500',
  'Second Class': 'from-amber-400 via-yellow-500 to-orange-400',
  'Third Class': 'from-orange-400 via-red-400 to-rose-400',
  Outstanding: 'from-violet-500 via-purple-500 to-fuchsia-500',
  Fail: 'from-red-500 via-rose-500 to-pink-500',
};

export default function Results() {
  const navigate = useNavigate();
  const { state } = useLocation() as { state: LocationState | null };
  const { latestMarks, loading } = useMarks();
  const { profile } = useAuth();

  const source = state || (latestMarks ? buildStateFromMarks(latestMarks) : null);

  const handleDownloadPDF = () => {
    if (!source) return;
    const { studentType, class: cls, stream, level, course, subjects: rawSubjects, percentage, grade, classification, cgpa, semesters } = source;
    const subjects = rawSubjects && rawSubjects.length > 0 ? rawSubjects : flattenSemesters(semesters);
    generateResultsPDF({
      studentName: profile?.full_name || 'Student',
      district: profile?.district || '',
      studentType, class: cls, stream, level, course, subjects, semesters, percentage, grade, classification, cgpa,
    });
  };

  if (loading && !source) {
    return (
      <PageWrapper>
        <AppHeader title="Your Results" subtitle="Academic Performance" showBack gradient />
        <div className="flex items-center justify-center py-20">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
            <Loader2 className="w-8 h-8 text-primary" />
          </motion.div>
        </div>
        <BottomNav />
      </PageWrapper>
    );
  }

  if (!source) {
    navigate('/student-type');
    return null;
  }

  const { studentType, class: cls, stream, level, course, subjects: rawSubjects, percentage, grade, classification, cgpa, semesters } = source;
  const subjects = rawSubjects && rawSubjects.length > 0 ? rawSubjects : flattenSemesters(semesters);
  const gradientCls = classificationGradient[classification] || 'from-primary via-accent to-primary';
  const emoji = classificationEmoji[classification] || '📊';

  return (
    <PageWrapper>
      <AppHeader title="Your Results" subtitle="Academic Performance" showBack gradient />
      <motion.div
        className="p-4 space-y-4 max-w-lg mx-auto pb-24"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Banner with parallax feel */}
        <motion.div variants={itemVariants} className="relative rounded-3xl overflow-hidden h-44 card-shadow group">
          <motion.img
            src={resultsHeroImg}
            alt="Students celebrating results"
            loading="lazy"
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <motion.div
            className="absolute top-3 right-3"
            variants={floatVariants}
            animate="animate"
          >
            <div className="bg-white/15 backdrop-blur-md rounded-full px-3 py-1.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              <span className="text-white text-[10px] font-bold tracking-wide">RESULTS</span>
            </div>
          </motion.div>
          <div className="absolute bottom-4 left-5 right-5">
            <motion.h2
              className="text-white font-extrabold text-xl leading-tight tracking-tight"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Your Academic Journey
            </motion.h2>
            <motion.p
              className="text-white/70 text-xs mt-1 font-medium"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.5 }}
            >
              Detailed performance analysis & insights
            </motion.p>
          </div>
        </motion.div>

        {/* Main Result Card — Glassmorphic */}
        <motion.div variants={itemVariants}>
          <motion.div
            className={`relative bg-gradient-to-br ${gradientCls} rounded-3xl p-6 text-white text-center overflow-hidden`}
            {...pulseGlow}
          >
            {/* Decorative blobs */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-8 -left-8 w-28 h-28 bg-white/10 rounded-full blur-2xl" />
            <div className="absolute top-4 left-4 w-12 h-12 bg-white/5 rounded-xl rotate-12" />

            <motion.div
              className="relative z-10"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
            >
              <motion.div
                animate={{ rotateY: [0, 360] }}
                transition={{ duration: 2, delay: 0.5, ease: 'easeInOut' }}
                className="inline-block"
              >
                <Trophy className="w-12 h-12 mx-auto mb-3 drop-shadow-lg" />
              </motion.div>

              <motion.h2
                className="text-5xl font-black tracking-tight drop-shadow-md"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 250, damping: 12, delay: 0.4 }}
              >
                {percentage.toFixed(1)}%
              </motion.h2>

              {cgpa && (
                <motion.p
                  className="text-white/90 text-lg font-bold mt-1"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  CGPA: {cgpa.toFixed(2)}
                </motion.p>
              )}
              {grade && grade !== '-' && (
                <p className="text-white/75 text-sm font-semibold mt-0.5">Grade: {grade}</p>
              )}

              <motion.div
                className="mt-4 inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-5 py-2 border border-white/20"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-lg">{emoji}</span>
                <span className="font-extrabold text-base tracking-wide">{classification}</span>
              </motion.div>

              <div className="flex justify-center gap-3 mt-4 flex-wrap">
                {cls && (
                  <span className="bg-white/15 backdrop-blur-sm rounded-full px-3 py-1 text-[11px] font-semibold flex items-center gap-1">
                    📚 {cls}
                  </span>
                )}
                {stream && (
                  <span className="bg-white/15 backdrop-blur-sm rounded-full px-3 py-1 text-[11px] font-semibold flex items-center gap-1">
                    🎯 {stream}
                  </span>
                )}
                {level && (
                  <span className="bg-white/15 backdrop-blur-sm rounded-full px-3 py-1 text-[11px] font-semibold flex items-center gap-1">
                    🎓 {level}
                  </span>
                )}
                {course && (
                  <span className="bg-white/15 backdrop-blur-sm rounded-full px-3 py-1 text-[11px] font-semibold flex items-center gap-1">
                    📖 {course.length > 18 ? course.slice(0, 18) + '…' : course}
                  </span>
                )}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Circular Progress — Floating Card */}
        <motion.div
          variants={itemVariants}
          className="bg-card rounded-3xl p-6 card-shadow border border-border text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary opacity-60" />
          <CircularProgress
            percentage={percentage}
            colorClass={classification === 'Distinction' || classification === 'Outstanding' ? 'green' : classification === 'First Class' ? 'primary' : 'orange'}
            label="Overall Score"
            sublabel="Percentage"
          />
        </motion.div>

        {/* Subject-wise Breakdown */}
        <AnimatePresence>
          {subjects && subjects.length > 0 && (
            <motion.div
              variants={itemVariants}
              className="bg-card rounded-3xl p-5 card-shadow border border-border overflow-hidden"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                  <Star className="w-4 h-4 text-white" />
                </div>
                <h3 className="font-bold text-foreground text-sm">Subject-wise Marks</h3>
              </div>

              <GradeBarChart data={subjects.map(s => ({ subject: s.name, marks: s.marks, maxMarks: s.maxMarks }))} />

              <div className="mt-4 space-y-2.5">
                {subjects.map((s, i) => {
                  const pct = (s.marks / s.maxMarks) * 100;
                  return (
                    <motion.div
                      key={s.name}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.08 * i, type: 'spring', stiffness: 200 }}
                      className="group"
                    >
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-foreground font-medium truncate flex-1 mr-2">{s.name}</span>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${pct >= 75 ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : pct >= 50 ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                          {s.marks}/{s.maxMarks}
                        </span>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full ${pct >= 75 ? 'bg-gradient-to-r from-green-400 to-emerald-500' : pct >= 50 ? 'bg-gradient-to-r from-blue-400 to-indigo-500' : 'bg-gradient-to-r from-red-400 to-rose-500'}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 0.8, delay: 0.15 * i, ease: 'easeOut' }}
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats Grid — 3D Cards */}
        <motion.div variants={itemVariants} className="grid grid-cols-3 gap-3">
          {[
            { icon: TrendingUp, label: 'Score', value: `${percentage.toFixed(1)}%`, gradient: 'from-blue-500 to-cyan-400', bg: 'bg-blue-50 dark:bg-blue-950/30' },
            { icon: Award, label: 'Class', value: classification, gradient: 'from-green-500 to-emerald-400', bg: 'bg-green-50 dark:bg-green-950/30' },
            { icon: cgpa ? GraduationCap : BookOpen, label: cgpa ? 'CGPA' : 'Grade', value: cgpa ? cgpa.toFixed(2) : grade || '-', gradient: 'from-purple-500 to-violet-400', bg: 'bg-purple-50 dark:bg-purple-950/30' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              className={`${stat.bg} rounded-2xl p-3.5 text-center border border-border/50 relative overflow-hidden group cursor-default`}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1, type: 'spring', stiffness: 200 }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              <div className={`w-9 h-9 mx-auto mb-1.5 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center`}>
                <stat.icon className="w-4.5 h-4.5 text-white" />
              </div>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{stat.label}</p>
              <p className={`text-sm font-extrabold text-foreground mt-0.5 ${stat.label === 'Class' ? 'text-[11px] leading-tight' : ''}`}>
                {stat.value}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Action Buttons — Glossy */}
        <motion.div variants={itemVariants} className="grid grid-cols-3 gap-3">
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={handleDownloadPDF}
              className="w-full h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 border-0 flex flex-col gap-1 shadow-lg shadow-green-500/20"
            >
              <Download className="w-5 h-5" />
              <span className="text-[11px] font-bold">Download</span>
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => {
                const name = profile?.full_name || 'Student';
                const subjectLines = subjects?.map(s => `• ${s.name}: ${s.marks}/${s.maxMarks}`).join('\n') || '';
                const text = [
                  `📚 *EduNext Academic Report*`,
                  `━━━━━━━━━━━━━━━━━━`,
                  `👤 *${name}*`,
                  studentType === 'school' && cls ? `📖 Class: ${cls}` : '',
                  stream ? `🎯 Stream: ${stream}` : '',
                  level ? `🎓 Level: ${level}` : '',
                  course ? `📖 Dept: ${course}` : '',
                  ``,
                  `🏆 *Result: ${classification}*`,
                  `📊 Percentage: *${percentage.toFixed(1)}%*`,
                  cgpa ? `📈 CGPA: *${cgpa.toFixed(2)}*` : '',
                  grade && grade !== '-' ? `🎯 Grade: *${grade}*` : '',
                  ``,
                  subjectLines ? `📋 *Subject Marks:*\n${subjectLines}` : '',
                  ``,
                  `━━━━━━━━━━━━━━━━━━`,
                  `Calculated by *EduNext* 📚`,
                  `Know Your Marks · Choose Your Path · Build Your Future`,
                ].filter(Boolean).join('\n');
                window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
              }}
              className="w-full h-16 rounded-2xl bg-gradient-to-br from-[#25D366] to-[#128C7E] hover:from-[#1fba59] hover:to-[#0f7a6b] border-0 flex flex-col gap-1 text-white shadow-lg shadow-green-600/20"
            >
              <Share2 className="w-5 h-5" />
              <span className="text-[11px] font-bold">WhatsApp</span>
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => navigate('/recommendations', { state: { studentType, percentage, cgpa, stream, level, course, classification } })}
              className="w-full h-16 rounded-2xl bg-gradient-to-br from-primary to-accent hover:opacity-90 border-0 flex flex-col gap-1 shadow-lg shadow-primary/20"
            >
              <Sparkles className="w-5 h-5" />
              <span className="text-[11px] font-bold">Recommend</span>
            </Button>
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants} className="pb-4">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
            <Button
              variant="outline"
              onClick={() => navigate(studentType === 'school' ? '/school-marks' : '/college-marks')}
              className="w-full h-14 rounded-2xl flex items-center justify-center gap-2 border-2 border-dashed border-border hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
            >
              <span className="text-lg">✏️</span>
              <span className="text-xs font-bold text-muted-foreground">Edit Marks</span>
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
      <BottomNav />
    </PageWrapper>
  );
}

// Helper to build LocationState from saved marks data
function buildStateFromMarks(marks: { student_type?: string; class?: string; stream?: string; level?: string; course?: string; subjects?: unknown; percentage?: number; grade?: string; classification?: string; cgpa?: number; semester_data?: unknown }): LocationState {
  const subjects = marks.subjects
    ? (Array.isArray(marks.subjects)
        ? marks.subjects as SemSubject[]
        : Object.entries(marks.subjects as Record<string, number>).map(([name, m]) => ({
            name, marks: m as number, maxMarks: 100
          })))
    : undefined;

  const semesters = marks.semester_data
    ? (Array.isArray(marks.semester_data) ? marks.semester_data as SemesterData[] : undefined)
    : undefined;

  return {
    studentType: (marks.student_type as 'school' | 'college') || 'school',
    class: marks.class as string | undefined,
    stream: marks.stream as string | undefined,
    level: marks.level as string | undefined,
    course: marks.course as string | undefined,
    subjects,
    percentage: (marks.percentage as number) || 0,
    grade: marks.grade as string | undefined,
    classification: (marks.classification as string) || '-',
    cgpa: marks.cgpa as number | undefined,
    semesters,
  };
}
