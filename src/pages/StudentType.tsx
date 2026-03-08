import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { BottomNav } from '@/components/layout/BottomNav';
import { Card3D } from '@/components/layout/Card3D';
import {
  School, GraduationCap, Sparkles, BookOpen, Building2, Briefcase,
  Target, Lightbulb, PenTool, FileText, Award, MessageSquare, FileUser,
  TrendingUp, BarChart3, ArrowRight, RefreshCw, Loader2
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useMarks } from '@/hooks/useMarks';
import { CircularProgress } from '@/components/charts/CircularProgress';
import { GradeBarChart } from '@/components/charts/GradeBarChart';
import { Button } from '@/components/ui/button';
import schoolStudentImg from '@/assets/school-student.jpg';
import collegeGraduateImg from '@/assets/college-graduate.jpg';
import studentsStudyingImg from '@/assets/students-studying.jpg';
import resultsImg from '@/assets/results-celebration.jpg';

export default function StudentType() {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const { latestMarks, loading } = useMarks();

  const hasMarks = !!latestMarks;
  const firstName = profile?.full_name?.split(' ')[0] || 'Student';

  // Parse subjects from marks data
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

  const classificationGradient: Record<string, string> = {
    'Outstanding': 'from-yellow-500 to-amber-600',
    'Distinction': 'from-emerald-500 to-teal-600',
    'First Class': 'from-blue-500 to-indigo-600',
    'Second Class': 'from-orange-500 to-amber-600',
    'Third Class': 'from-rose-500 to-pink-600',
    'Pass Class': 'from-orange-500 to-amber-600',
    'Fail': 'from-red-600 to-rose-700',
  };

  const gradientClass = classificationGradient[classification] || 'from-primary to-primary/80';

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
          <div className="absolute inset-0 bg-gradient-to-b from-primary/85 via-primary/75 to-primary/90" />
        </div>
        <div className="relative pt-10 pb-14 px-6 text-center">
          <div className="absolute inset-0 opacity-[0.07]">
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
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-yellow-300" />
              <span className="text-white/90 text-sm font-medium">Welcome back, {firstName}! 👋</span>
            </div>
            <h1 className="text-2xl font-bold text-white mt-2">
              {hasMarks ? 'Your Dashboard' : 'Who are you?'}
            </h1>
            <p className="text-white/80 text-sm mt-1">
              {hasMarks
                ? 'Your academic performance at a glance'
                : 'Select your student category to get started'}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="px-4 -mt-8 pb-8 space-y-4 max-w-lg mx-auto">
        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}

        {/* ========== DASHBOARD: When marks exist ========== */}
        {!loading && hasMarks && (
          <>
            {/* Performance Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-card rounded-3xl overflow-hidden border border-border shadow-lg"
            >
              {/* Gradient Header */}
              <div className={`bg-gradient-to-r ${gradientClass} p-5 text-white`}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    {isSchool
                      ? <School className="w-5 h-5" />
                      : <GraduationCap className="w-5 h-5" />
                    }
                    <span className="text-sm font-medium opacity-90">
                      {isSchool
                        ? `${latestMarks?.class || ''} ${latestMarks?.stream ? `• ${latestMarks.stream}` : ''}`
                        : `${latestMarks?.level || ''} ${latestMarks?.course ? `• ${latestMarks.course}` : ''}`
                      }
                    </span>
                  </div>
                  <span className="text-xs bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-full font-medium">
                    {classification}
                  </span>
                </div>
                <div className="flex items-end gap-4 mt-3">
                  <div>
                    <p className="text-3xl font-bold">{percentage}%</p>
                    <p className="text-sm opacity-80">Overall Score</p>
                  </div>
                  {cgpa && (
                    <div className="ml-auto text-right">
                      <p className="text-2xl font-bold">{cgpa}</p>
                      <p className="text-sm opacity-80">CGPA</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Charts Section */}
              <div className="p-5 space-y-5">
                {/* Circular + Stats */}
                <div className="flex items-center gap-4">
                  <CircularProgress
                    percentage={percentage}
                    size={110}
                    sublabel="Score"
                    colorClass={percentage >= 75 ? 'green' : percentage >= 50 ? 'orange' : 'primary'}
                  />
                  <div className="flex-1 space-y-2.5">
                    {[
                      { label: 'Grade', value: grade, icon: TrendingUp },
                      { label: 'Classification', value: classification, icon: BarChart3 },
                      ...(cgpa ? [{ label: 'CGPA', value: String(cgpa), icon: Target }] : []),
                    ].map((stat) => (
                      <div key={stat.label} className="flex items-center gap-2 bg-muted/50 rounded-xl px-3 py-2">
                        <stat.icon className="w-4 h-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{stat.label}</span>
                        <span className="ml-auto text-sm font-semibold text-foreground">{stat.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Subject Bar Chart */}
                {subjects.length > 0 && (
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-2">📊 Subject Performance</p>
                    <GradeBarChart data={subjects} />
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button
                    onClick={handleRecommendations}
                    className="flex-1 rounded-xl bg-gradient-to-r from-primary to-primary/80 text-primary-foreground"
                  >
                    <Target className="w-4 h-4 mr-1" />
                    Recommendations
                  </Button>
                  <Button
                    onClick={handleViewResults}
                    variant="outline"
                    className="flex-1 rounded-xl"
                  >
                    <BarChart3 className="w-4 h-4 mr-1" />
                    Full Results
                  </Button>
                </div>
                <Button
                  onClick={handleEditMarks}
                  variant="ghost"
                  className="w-full text-muted-foreground text-xs"
                >
                  <RefreshCw className="w-3 h-3 mr-1" />
                  Re-enter Marks
                </Button>
              </div>
            </motion.div>

            {/* New Entry Card */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="bg-muted/40 rounded-2xl p-4 flex items-center gap-3 cursor-pointer hover:bg-muted/60 transition-colors border border-border/50"
              onClick={() => navigate(isSchool ? '/college-marks' : '/school-marks')}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-primary/20 to-primary/10 flex items-center justify-center">
                {isSchool
                  ? <GraduationCap className="w-5 h-5 text-primary" />
                  : <School className="w-5 h-5 text-primary" />
                }
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">
                  {isSchool ? 'Add College Marks' : 'Add School Marks'}
                </p>
                <p className="text-xs text-muted-foreground">Enter marks for another category</p>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
            </motion.div>
          </>
        )}

        {/* ========== STUDENT TYPE SELECTOR: No marks ========== */}
        {!loading && !hasMarks && (
          <>
            <Card3D
              onClick={() => navigate('/school-marks')}
              className="w-full bg-card rounded-3xl overflow-hidden border border-border text-left cursor-pointer"
            >
              <div className="relative h-28 overflow-hidden">
                <img src={schoolStudentImg} alt="School student" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600/80 to-orange-500/60" />
                <div className="absolute inset-0 flex items-center p-5">
                  <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0 mr-4">
                    <School className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white">🏫 School Student</h2>
                    <p className="text-white/80 text-sm">10th / 11th / 12th</p>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="flex gap-1 mb-3">
                  {['Science', 'Commerce', 'Arts'].map((s) => (
                    <span key={s} className="text-xs bg-edu-orange-light text-edu-orange px-2 py-0.5 rounded-full font-medium">{s}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-muted-foreground">Calculate marks → Get career guidance</div>
                  <div className="gradient-orange rounded-full px-3 py-1 text-white text-xs font-semibold"
                    style={{ boxShadow: '0 4px 12px rgba(249,115,22,0.3)' }}>Start →</div>
                </div>
              </div>
            </Card3D>

            <Card3D
              onClick={() => navigate('/college-marks')}
              className="w-full bg-card rounded-3xl overflow-hidden border border-border text-left cursor-pointer"
            >
              <div className="relative h-28 overflow-hidden">
                <img src={collegeGraduateImg} alt="College graduate" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600/80 to-purple-500/60" />
                <div className="absolute inset-0 flex items-center p-5">
                  <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0 mr-4">
                    <GraduationCap className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white">🎓 College Student</h2>
                    <p className="text-white/80 text-sm">UG / PG / PhD</p>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="flex gap-1 mb-3">
                  {['CGPA', 'Percentage', 'Semester'].map((s) => (
                    <span key={s} className="text-xs bg-edu-purple-light text-edu-purple px-2 py-0.5 rounded-full font-medium">{s}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-muted-foreground">Semester-wise CGPA → Smart recommendations</div>
                  <div className="gradient-purple rounded-full px-3 py-1 text-white text-xs font-semibold"
                    style={{ boxShadow: '0 4px 12px rgba(139,92,246,0.3)' }}>Start →</div>
                </div>
              </div>
            </Card3D>
          </>
        )}

        {/* Career Tools */}
        {!loading && (
          <>
            <div className="space-y-3">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">🚀 Career Tools</p>
              {[
                { path: '/scholarships', icon: Award, label: 'Scholarship Finder', desc: '40+ scholarships for TN students', gradient: 'from-emerald-500 to-teal-600', bg: 'bg-emerald-50 dark:bg-emerald-950/30' },
                { path: '/interview-prep', icon: MessageSquare, label: 'Interview Prep', desc: 'HR, Technical & GD questions', gradient: 'from-violet-500 to-purple-600', bg: 'bg-violet-50 dark:bg-violet-950/30' },
                { path: '/resume-builder', icon: FileUser, label: 'Resume Builder', desc: 'Create professional CV instantly', gradient: 'from-blue-500 to-indigo-600', bg: 'bg-blue-50 dark:bg-blue-950/30' },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.08 }}
                    onClick={() => navigate(item.path)}
                    className={`w-full ${item.bg} rounded-2xl p-4 flex items-center gap-3 cursor-pointer hover:shadow-md transition-all border border-border/50`}
                  >
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${item.gradient} flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground text-sm">{item.label}</h3>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                    <span className="text-xs font-semibold text-primary">View →</span>
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
              className="w-full bg-edu-yellow-light rounded-2xl p-4 flex items-center gap-3 cursor-pointer hover:shadow-md transition-all border border-edu-yellow/20"
            >
              <div className="w-10 h-10 rounded-xl gradient-yellow flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground text-sm">Entrance Exams Guide</h3>
                <p className="text-xs text-muted-foreground">TNEA, NEET, JEE, TNPSC & more</p>
              </div>
              <span className="text-xs font-semibold text-edu-yellow">View →</span>
            </motion.div>

            {/* Info Cards */}
            <div className="grid grid-cols-2 gap-3 mt-2">
              {[
                { icon: BookOpen, label: '110+ Courses', bg: 'bg-edu-blue-light', color: 'text-edu-blue' },
                { icon: Building2, label: '170+ Colleges', bg: 'bg-edu-green-light', color: 'text-edu-green' },
                { icon: Briefcase, label: '75+ Job Paths', bg: 'bg-edu-orange-light', color: 'text-edu-orange' },
                { icon: Target, label: 'Smart AI Reco', bg: 'bg-edu-purple-light', color: 'text-edu-purple' },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className={`${item.bg} rounded-2xl p-3 text-center`}
                  >
                    <Icon className={`w-6 h-6 mx-auto mb-1 ${item.color}`} />
                    <p className={`text-xs font-semibold ${item.color}`}>{item.label}</p>
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
