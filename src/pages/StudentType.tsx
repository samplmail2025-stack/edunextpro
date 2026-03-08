import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { BottomNav } from '@/components/layout/BottomNav';
import {
  School, GraduationCap, Sparkles, BookOpen, Building2, Briefcase,
  Target, Lightbulb, PenTool, FileText, Award, MessageSquare, FileUser,
  TrendingUp, BarChart3, RefreshCw, Loader2, ChevronRight,
  Trophy, Star, Zap
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useMarks } from '@/hooks/useMarks';
import { CircularProgress } from '@/components/charts/CircularProgress';
import { GradeBarChart } from '@/components/charts/GradeBarChart';
import { Button } from '@/components/ui/button';
import studentsStudyingImg from '@/assets/students-studying.jpg';
import resultsImg from '@/assets/results-celebration.jpg';

export default function StudentType() {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const { latestMarks, loading } = useMarks();

  const hasMarks = !!latestMarks;
  const firstName = profile?.full_name?.split(' ')[0] || 'Student';

  const subjects = latestMarks?.subjects
    ? (Array.isArray(latestMarks.subjects)
        ? latestMarks.subjects as { name: string; marks: number; maxMarks: number }[]
        : Object.entries(latestMarks.subjects as Record<string, number>).map(([name, marks]) => ({
            name, marks: marks as number, maxMarks: 100
          })))
    : [];

  const percentage = latestMarks?.percentage ?? 0;
  const cgpa = latestMarks?.cgpa;
  const grade = latestMarks?.grade ?? '-';
  const classification = latestMarks?.classification ?? '-';
  const isSchool = latestMarks?.student_type === 'school';

  const handleRecommendations = () => {
    navigate('/recommendations', {
      state: {
        studentType: latestMarks?.student_type,
        percentage,
        cgpa,
        stream: latestMarks?.stream,
        level: latestMarks?.level,
        course: latestMarks?.course,
        classification,
      }
    });
  };

  const handleEditMarks = () => {
    navigate(isSchool ? '/school-marks' : '/college-marks');
  };

  const handleViewResults = () => {
    navigate('/results', {
      state: {
        studentType: latestMarks?.student_type,
        class: latestMarks?.class,
        stream: latestMarks?.stream,
        level: latestMarks?.level,
        course: latestMarks?.course,
        subjects,
        percentage,
        grade,
        classification,
        cgpa,
      }
    });
  };

  const getPerformanceEmoji = () => {
    if (percentage >= 90) return '🏆';
    if (percentage >= 75) return '🌟';
    if (percentage >= 60) return '💪';
    if (percentage >= 50) return '📈';
    return '🎯';
  };

  const getPerformanceLabel = () => {
    if (percentage >= 90) return 'Outstanding Performance';
    if (percentage >= 75) return 'Excellent Performance';
    if (percentage >= 60) return 'Good Performance';
    if (percentage >= 50) return 'Average Performance';
    return 'Keep Working Hard';
  };

  return (
    <PageWrapper>
      {/* Hero Banner */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={hasMarks ? resultsImg : studentsStudyingImg}
            alt="Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/80 to-background" />
        </div>
        <div className="relative pt-10 pb-16 px-6 text-center">
          <div className="absolute inset-0 opacity-[0.05]">
            <BookOpen className="absolute top-6 right-12 w-10 h-10 text-white" />
            <GraduationCap className="absolute bottom-8 left-12 w-12 h-12 text-white" />
            <Lightbulb className="absolute top-16 left-1/2 w-8 h-8 text-white" />
            <PenTool className="absolute bottom-12 right-1/3 w-7 h-7 text-white" />
          </div>
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="flex items-center justify-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span className="text-white/90 text-xs font-medium tracking-wide uppercase">Welcome back, {firstName}! 👋</span>
            </div>
            <h1 className="text-2xl font-bold text-white mt-1 tracking-tight">
              {hasMarks ? 'Academic Dashboard' : 'Get Started'}
            </h1>
            <p className="text-white/70 text-sm mt-1.5 max-w-xs mx-auto">
              {hasMarks
                ? 'Track performance & discover opportunities'
                : 'Select your student category to begin'}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="px-4 -mt-10 pb-8 space-y-5 max-w-lg mx-auto relative z-10">
        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Loading your data...</p>
          </div>
        )}

        {/* ========== DASHBOARD: When marks exist ========== */}
        {!loading && hasMarks && (
          <>
            {/* Main Performance Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="bg-card rounded-[1.25rem] overflow-hidden border border-border shadow-xl shadow-primary/5"
            >
              {/* Score Header */}
              <div className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/80 p-4 sm:p-6 pb-5">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent_60%)]" />
                <div className="relative">
                  {/* Type Badge */}
                  <div className="flex items-center justify-between gap-2 mb-4 flex-wrap">
                    <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm rounded-full px-2.5 py-1.5 min-w-0">
                      {isSchool
                        ? <School className="w-3.5 h-3.5 text-white/90 flex-shrink-0" />
                        : <GraduationCap className="w-3.5 h-3.5 text-white/90 flex-shrink-0" />
                      }
                      <span className="text-[11px] sm:text-xs font-medium text-white/90 truncate">
                        {isSchool
                          ? `${latestMarks?.class || ''}${latestMarks?.stream ? ` · ${latestMarks.stream}` : ''}`
                          : `${latestMarks?.level || ''}${latestMarks?.course ? ` · ${latestMarks.course}` : ''}`
                        }
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm rounded-full px-2.5 py-1.5 flex-shrink-0">
                      <Trophy className="w-3.5 h-3.5 text-yellow-300" />
                      <span className="text-[11px] sm:text-xs font-semibold text-white">{classification}</span>
                    </div>
                  </div>

                  {/* Score Display */}
                  <div className="flex items-end justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">{percentage}%</p>
                      <p className="text-xs sm:text-sm text-white/60 mt-0.5 font-medium">Overall Percentage</p>
                    </div>
                    {cgpa != null && (
                      <div className="text-right flex-shrink-0">
                        <p className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">{cgpa}</p>
                        <p className="text-xs sm:text-sm text-white/60 mt-0.5 font-medium">CGPA</p>
                      </div>
                    )}
                  </div>

                  {/* Performance indicator bar */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs text-white/60">{getPerformanceEmoji()} {getPerformanceLabel()}</span>
                      <span className="text-xs font-medium text-white/80">{percentage}%</span>
                    </div>
                    <div className="h-1.5 bg-white/15 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(percentage, 100)}%` }}
                        transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
                        className="h-full bg-gradient-to-r from-yellow-300 to-emerald-300 rounded-full"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Analytics Body */}
              <div className="p-4 sm:p-5 space-y-5">
                {/* Stats + Chart Row */}
                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5">
                  <div className="flex-shrink-0">
                    <CircularProgress
                      percentage={percentage}
                      size={95}
                      sublabel="Score"
                      colorClass={percentage >= 75 ? 'green' : percentage >= 50 ? 'orange' : 'primary'}
                    />
                  </div>
                  <div className="w-full flex-1 space-y-2">
                    {[
                      { label: 'Grade', value: grade, icon: Star, color: 'text-yellow-500' },
                      { label: 'Classification', value: classification, icon: TrendingUp, color: 'text-emerald-500' },
                      ...(cgpa != null ? [{ label: 'CGPA', value: String(cgpa), icon: Target, color: 'text-primary' }] : []),
                    ].map((stat) => (
                      <div key={stat.label} className="flex items-center gap-2 bg-muted/40 rounded-xl px-3 py-2.5 border border-border/50">
                        <div className="w-7 h-7 rounded-lg bg-background flex items-center justify-center flex-shrink-0 shadow-sm">
                          <stat.icon className={`w-3.5 h-3.5 ${stat.color}`} />
                        </div>
                        <span className="text-xs text-muted-foreground flex-1 truncate">{stat.label}</span>
                        <span className="text-sm font-bold text-foreground flex-shrink-0">{stat.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Subject Bar Chart */}
                {subjects.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center">
                          <BarChart3 className="w-3.5 h-3.5 text-primary" />
                        </div>
                        <p className="text-sm font-semibold text-foreground">Subject Performance</p>
                      </div>
                      <span className="text-xs text-muted-foreground">{subjects.length} subjects</span>
                    </div>
                    <div className="bg-muted/20 rounded-xl p-3 border border-border/40">
                      <GradeBarChart data={subjects.map(s => ({ subject: s.name, marks: s.marks, maxMarks: s.maxMarks }))} />
                    </div>
                  </motion.div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2.5 pt-1">
                  <Button
                    onClick={handleRecommendations}
                    className="flex-1 rounded-xl h-11 bg-gradient-to-r from-primary to-primary/85 text-primary-foreground shadow-lg shadow-primary/20 font-semibold text-sm"
                  >
                    <Target className="w-4 h-4 mr-1.5" />
                    Recommendations
                  </Button>
                  <Button
                    onClick={handleViewResults}
                    variant="outline"
                    className="flex-1 rounded-xl h-11 font-semibold text-sm border-border/80"
                  >
                    <BarChart3 className="w-4 h-4 mr-1.5" />
                    Full Results
                  </Button>
                </div>
              </div>
            </motion.div>

          </>
        )}


        {/* Career Tools */}
        {!loading && (
          <>
            <div className="space-y-3 pt-1">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-primary" />
                <p className="text-xs font-bold text-foreground uppercase tracking-wider">Career Tools</p>
              </div>
              {[
                { path: '/scholarships', icon: Award, label: 'Scholarship Finder', desc: '40+ scholarships for TN students', gradient: 'from-emerald-500 to-teal-600', bg: 'bg-emerald-50/80 dark:bg-emerald-950/20' },
                { path: '/interview-prep', icon: MessageSquare, label: 'Interview Prep', desc: 'HR, Technical & GD questions', gradient: 'from-violet-500 to-purple-600', bg: 'bg-violet-50/80 dark:bg-violet-950/20' },
                { path: '/resume-builder', icon: FileUser, label: 'Resume Builder', desc: 'Create professional CV instantly', gradient: 'from-blue-500 to-indigo-600', bg: 'bg-blue-50/80 dark:bg-blue-950/20' },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 + i * 0.08 }}
                    onClick={() => navigate(item.path)}
                    className={`w-full ${item.bg} rounded-2xl p-4 flex items-center gap-3.5 cursor-pointer hover:shadow-md transition-all border border-border/40 group`}
                  >
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center flex-shrink-0 shadow-sm`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground text-sm">{item.label}</h3>
                      <p className="text-xs text-muted-foreground truncate">{item.desc}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                  </motion.div>
                );
              })}
            </div>

            {/* Entrance Exams */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              onClick={() => navigate('/entrance-exams')}
              className="w-full bg-edu-yellow-light/80 rounded-2xl p-4 flex items-center gap-3.5 cursor-pointer hover:shadow-md transition-all border border-edu-yellow/15 group"
            >
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
                { icon: Target, label: 'Smart AI', bg: 'bg-edu-purple-light', color: 'text-edu-purple', desc: 'Recommendations' },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.45 + i * 0.08 }}
                    className={`${item.bg} rounded-2xl p-4 text-center border border-border/30`}
                  >
                    <Icon className={`w-6 h-6 mx-auto mb-1.5 ${item.color}`} />
                    <p className={`text-sm font-bold ${item.color}`}>{item.label}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{item.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </>
        )}
      </div>
      <BottomNav />
    </PageWrapper>
  );
}
