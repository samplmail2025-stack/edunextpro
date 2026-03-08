import { useLocation, useNavigate } from 'react-router-dom';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { BottomNav } from '@/components/layout/BottomNav';
import { AppHeader } from '@/components/layout/AppHeader';
import { Button } from '@/components/ui/button';
import { Trophy, Star, TrendingUp, BookOpen, Loader2, Download, Share2, Zap, ChevronRight, Flame } from 'lucide-react';
import { useMarks } from '@/hooks/useMarks';
import { useAuth } from '@/hooks/useAuth';
import { generateResultsPDF } from '@/lib/generateResultsPDF';
import { motion } from 'framer-motion';

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

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } }
};

const rise = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', damping: 20, stiffness: 200 } }
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
        <AppHeader title="Results" subtitle="Academic Performance" showBack gradient />
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
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

  const topSubject = subjects && subjects.length > 0
    ? subjects.reduce((a, b) => (b.marks / b.maxMarks) > (a.marks / a.maxMarks) ? b : a)
    : null;

  const tags = [cls, stream, level, course].filter(Boolean);

  return (
    <PageWrapper>
      <motion.div
        className="min-h-screen pb-24"
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        {/* Immersive Hero */}
        <motion.div
          variants={rise}
          className="relative overflow-hidden"
          style={{ background: 'linear-gradient(145deg, hsl(var(--primary)), hsl(var(--accent)), hsl(var(--primary)))' }}
        >
          {/* Animated circles */}
          <motion.div
            className="absolute -top-20 -right-20 w-56 h-56 rounded-full"
            style={{ background: 'rgba(255,255,255,0.07)' }}
            animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-0 -left-16 w-40 h-40 rounded-full"
            style={{ background: 'rgba(255,255,255,0.05)' }}
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute top-12 left-8 w-3 h-3 rounded-full bg-white/20"
            animate={{ y: [0, -15, 0], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.div
            className="absolute top-20 right-16 w-2 h-2 rounded-full bg-white/30"
            animate={{ y: [0, -10, 0], opacity: [0.2, 0.7, 0.2] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
          />

          <div className="relative z-10 pt-12 pb-8 px-6 text-center text-white">
            {/* Back button */}
            <motion.button
              onClick={() => navigate(-1)}
              className="absolute top-4 left-4 w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center"
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="w-4 h-4 text-white rotate-180" />
            </motion.button>

            <motion.div
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-md mb-4 border border-white/20"
            >
              <Trophy className="w-8 h-8 text-white drop-shadow-lg" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 150, delay: 0.35 }}
            >
              <span className="text-7xl font-black tracking-tighter leading-none drop-shadow-lg">
                {percentage.toFixed(1)}
              </span>
              <span className="text-3xl font-bold ml-1 opacity-80">%</span>
            </motion.div>

            {cgpa && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-2 inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-1.5 border border-white/15"
              >
                <Zap className="w-3.5 h-3.5" />
                <span className="text-sm font-bold">CGPA {cgpa.toFixed(2)}</span>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-3"
            >
              <span className="bg-white text-primary font-extrabold text-sm px-5 py-1.5 rounded-full shadow-lg">
                {classification}
              </span>
            </motion.div>

            {tags.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.75 }}
                className="flex justify-center gap-2 mt-4 flex-wrap"
              >
                {tags.map((t, i) => (
                  <span key={i} className="text-[10px] font-semibold bg-white/10 rounded-full px-3 py-1 backdrop-blur-sm border border-white/10">
                    {t}
                  </span>
                ))}
              </motion.div>
            )}
          </div>

          {/* Curved bottom edge */}
          <svg viewBox="0 0 400 30" className="w-full block -mb-px" preserveAspectRatio="none">
            <path d="M0,30 Q200,-10 400,30 L400,30 L0,30 Z" fill="hsl(var(--background))" />
          </svg>
        </motion.div>

        <div className="px-4 space-y-4 max-w-lg mx-auto -mt-1">
          {/* Quick Stats Row */}
          <motion.div variants={rise} className="grid grid-cols-3 gap-2.5">
            {[
              { icon: TrendingUp, label: 'Score', value: `${percentage.toFixed(1)}%`, color: 'text-blue-500', bg: 'bg-blue-500/10' },
              { icon: Flame, label: 'Result', value: classification.length > 10 ? classification.slice(0, 9) + '…' : classification, color: 'text-orange-500', bg: 'bg-orange-500/10' },
              { icon: BookOpen, label: cgpa ? 'CGPA' : 'Grade', value: cgpa ? cgpa.toFixed(2) : grade || '-', color: 'text-violet-500', bg: 'bg-violet-500/10' },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                className="bg-card rounded-2xl p-3 border border-border text-center relative overflow-hidden group"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.08 }}
              >
                <div className={`w-8 h-8 ${s.bg} rounded-xl mx-auto mb-1.5 flex items-center justify-center`}>
                  <s.icon className={`w-4 h-4 ${s.color}`} />
                </div>
                <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">{s.label}</p>
                <p className={`text-sm font-extrabold text-foreground mt-0.5 ${s.label === 'Result' ? 'text-[11px]' : ''}`}>{s.value}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Top Subject Highlight */}
          {topSubject && (
            <motion.div
              variants={rise}
              className="relative bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20 border border-amber-200/50 dark:border-amber-800/30 rounded-2xl p-4 flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center flex-shrink-0 shadow-md">
                <Star className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">Best Subject</p>
                <p className="text-sm font-extrabold text-foreground truncate">{topSubject.name}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-lg font-black text-amber-600 dark:text-amber-400">{topSubject.marks}/{topSubject.maxMarks}</p>
                <p className="text-[10px] font-bold text-muted-foreground">{((topSubject.marks / topSubject.maxMarks) * 100).toFixed(0)}%</p>
              </div>
            </motion.div>
          )}

          {/* Subject Cards */}
          {subjects && subjects.length > 0 && (
            <motion.div variants={rise}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-5 rounded-full bg-primary" />
                <h3 className="font-extrabold text-foreground text-sm tracking-tight">Subject Breakdown</h3>
                <span className="ml-auto text-[10px] font-bold text-muted-foreground bg-muted rounded-full px-2.5 py-0.5">{subjects.length} subjects</span>
              </div>
              <div className="space-y-2">
                {subjects.map((s, i) => {
                  const pct = (s.marks / s.maxMarks) * 100;
                  const isTop = topSubject && s.name === topSubject.name;
                  return (
                    <motion.div
                      key={s.name}
                      className={`bg-card rounded-2xl p-3.5 border ${isTop ? 'border-amber-300 dark:border-amber-700' : 'border-border'} relative overflow-hidden`}
                      initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.9 + i * 0.06, type: 'spring', stiffness: 200 }}
                    >
                      {isTop && (
                        <div className="absolute top-0 right-0">
                          <div className="bg-amber-400 text-[8px] font-bold text-amber-900 px-2 py-0.5 rounded-bl-lg">⭐ TOP</div>
                        </div>
                      )}
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2.5 min-w-0 flex-1">
                          <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black text-white flex-shrink-0 ${pct >= 75 ? 'bg-gradient-to-br from-green-400 to-emerald-500' : pct >= 50 ? 'bg-gradient-to-br from-blue-400 to-indigo-500' : 'bg-gradient-to-br from-red-400 to-rose-500'}`}>
                            {i + 1}
                          </div>
                          <span className="font-bold text-foreground text-[13px] truncate">{s.name}</span>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="text-xs font-extrabold text-foreground">{s.marks}<span className="text-muted-foreground font-medium">/{s.maxMarks}</span></span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full rounded-full ${pct >= 75 ? 'bg-gradient-to-r from-green-400 to-emerald-500' : pct >= 50 ? 'bg-gradient-to-r from-blue-400 to-indigo-500' : 'bg-gradient-to-r from-red-400 to-rose-500'}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${pct}%` }}
                            transition={{ duration: 0.7, delay: 1 + i * 0.08, ease: [0.25, 0.8, 0.25, 1] }}
                          />
                        </div>
                        <span className={`text-[11px] font-extrabold min-w-[36px] text-right ${pct >= 75 ? 'text-green-600 dark:text-green-400' : pct >= 50 ? 'text-blue-600 dark:text-blue-400' : 'text-red-600 dark:text-red-400'}`}>
                          {pct.toFixed(0)}%
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Actions */}
          <motion.div variants={rise} className="space-y-2.5 pt-2">
            <div className="grid grid-cols-2 gap-2.5">
              <motion.div whileTap={{ scale: 0.96 }}>
                <Button
                  onClick={handleDownloadPDF}
                  className="w-full h-14 rounded-2xl bg-foreground text-background hover:bg-foreground/90 border-0 flex items-center justify-center gap-2 font-bold text-xs"
                >
                  <Download className="w-4 h-4" />
                  Download PDF
                </Button>
              </motion.div>
              <motion.div whileTap={{ scale: 0.96 }}>
                <Button
                  onClick={() => {
                    const name = profile?.full_name || 'Student';
                    const subjectLines = subjects?.map(s => `• ${s.name}: ${s.marks}/${s.maxMarks}`).join('\n') || '';
                    const text = [
                      `📚 *EduNext Academic Report*`, `━━━━━━━━━━━━━━━━━━`,
                      `👤 *${name}*`,
                      studentType === 'school' && cls ? `📖 Class: ${cls}` : '',
                      stream ? `🎯 Stream: ${stream}` : '', level ? `🎓 Level: ${level}` : '',
                      course ? `📖 Dept: ${course}` : '', ``,
                      `🏆 *Result: ${classification}*`, `📊 Percentage: *${percentage.toFixed(1)}%*`,
                      cgpa ? `📈 CGPA: *${cgpa.toFixed(2)}*` : '',
                      grade && grade !== '-' ? `🎯 Grade: *${grade}*` : '', ``,
                      subjectLines ? `📋 *Subject Marks:*\n${subjectLines}` : '', ``,
                      `━━━━━━━━━━━━━━━━━━`, `Calculated by *EduNext* 📚`,
                    ].filter(Boolean).join('\n');
                    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
                  }}
                  className="w-full h-14 rounded-2xl bg-[#25D366] hover:bg-[#1ead58] border-0 flex items-center justify-center gap-2 text-white font-bold text-xs"
                >
                  <Share2 className="w-4 h-4" />
                  WhatsApp
                </Button>
              </motion.div>
            </div>
            <motion.div whileTap={{ scale: 0.97 }}>
              <Button
                onClick={() => navigate('/recommendations', { state: { studentType, percentage, cgpa, stream, level, course, classification } })}
                className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 border-0 flex items-center justify-center gap-2 font-bold text-xs"
              >
                <Zap className="w-4 h-4" />
                Get Recommendations
                <ChevronRight className="w-4 h-4" />
              </Button>
            </motion.div>
            <motion.div whileTap={{ scale: 0.97 }}>
              <Button
                variant="ghost"
                onClick={() => navigate(studentType === 'school' ? '/school-marks' : '/college-marks')}
                className="w-full h-12 rounded-2xl text-muted-foreground hover:text-foreground text-xs font-bold"
              >
                ✏️ Edit Marks
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
      <BottomNav />
    </PageWrapper>
  );
}

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
