import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { BottomNav } from '@/components/layout/BottomNav';
import { School, GraduationCap, ChevronRight, TrendingUp, Sparkles } from 'lucide-react';
import { useMarks } from '@/hooks/useMarks';
import { useAuth } from '@/hooks/useAuth';
import { CircularProgress } from '@/components/charts/CircularProgress';
import schoolStudentImg from '@/assets/school-student.jpg';
import collegeGraduateImg from '@/assets/college-graduate.jpg';
import studentsStudyingImg from '@/assets/students-studying.jpg';

export default function MarksSelector() {
  const navigate = useNavigate();
  const { latestMarks } = useMarks();
  const { profile } = useAuth();

  const hasMarks = !!latestMarks;
  const percentage = latestMarks?.percentage ?? 0;
  const classification = latestMarks?.classification ?? '-';
  const firstName = profile?.full_name?.split(' ')[0] || 'Student';

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <PageWrapper>
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <img
          src={studentsStudyingImg}
          alt="Students studying"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(145deg, hsl(var(--primary) / 0.88), hsl(var(--accent) / 0.82), hsl(var(--primary) / 0.9))',
          }}
        />

        <div className="relative pt-14 pb-16 px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-1.5 bg-primary-foreground/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-3 border border-primary-foreground/10">
              <Sparkles className="w-4 h-4 text-primary-foreground/80" />
              <span className="text-primary-foreground/90 text-sm font-medium">
                Welcome back, {firstName}! 👋
              </span>
            </div>
            <h1 className="text-3xl font-extrabold text-primary-foreground tracking-tight leading-tight">
              Who are you?
            </h1>
            <p className="text-primary-foreground/60 text-sm mt-2 max-w-[280px] mx-auto">
              Select your student category to get started
            </p>
          </motion.div>
        </div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="px-4 -mt-8 pb-28 space-y-4 max-w-lg mx-auto relative z-10"
      >
        {/* Previous Score Card */}
        {hasMarks && (
          <motion.div variants={itemVariants}>
            <div
              className="rounded-2xl p-4 border border-border/60 flex items-center gap-4 cursor-pointer active:scale-[0.98] transition-transform"
              style={{
                background: 'linear-gradient(135deg, hsl(var(--card)), hsl(var(--secondary) / 0.5))',
                boxShadow: '0 2px 16px -4px hsl(var(--primary) / 0.08)',
              }}
              onClick={() => navigate('/results')}
            >
              <div className="relative">
                <CircularProgress
                  percentage={percentage}
                  size={56}
                  strokeWidth={5}
                  colorClass={percentage >= 75 ? 'green' : percentage >= 50 ? 'orange' : 'primary'}
                />
                <div
                  className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))' }}
                >
                  <TrendingUp className="w-3 h-3 text-primary-foreground" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Last Score</p>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-bold text-foreground">{percentage}</span>
                  <span className="text-sm font-medium text-muted-foreground">%</span>
                </div>
                <p className="text-xs text-muted-foreground">{classification}</p>
              </div>
              <div className="flex items-center gap-1 text-xs font-semibold text-primary">
                Details
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </motion.div>
        )}

        {/* School Student Card */}
        <motion.div variants={itemVariants}>
          <div
            className="rounded-2xl overflow-hidden cursor-pointer active:scale-[0.98] transition-transform"
            style={{ boxShadow: '0 8px 32px -8px hsl(var(--orange) / 0.3)' }}
            onClick={() => navigate('/school-marks')}
          >
            {/* Image Banner */}
            <div className="relative h-28 overflow-hidden">
              <img
                src={schoolStudentImg}
                alt="School students"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(135deg, hsl(var(--orange) / 0.85), hsl(var(--yellow) / 0.7))' }}
              />
              <div className="absolute inset-0 flex items-center px-5 gap-4">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 backdrop-blur-sm"
                  style={{ background: 'hsla(0,0%,100%,0.2)', border: '1px solid hsla(0,0%,100%,0.25)' }}
                >
                  <School className="w-7 h-7 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-primary-foreground flex items-center gap-2">
                    <span>🏫</span> School Student
                  </h2>
                  <p className="text-primary-foreground/80 text-sm mt-0.5">10th / 11th / 12th</p>
                </div>
              </div>
            </div>

            {/* Bottom info */}
            <div className="bg-card p-4 border border-t-0 border-border/40 rounded-b-2xl">
              <div className="flex flex-wrap gap-1.5 mb-3">
                {['Science', 'Commerce', 'Arts'].map((s) => (
                  <span
                    key={s}
                    className="text-[11px] font-semibold px-3 py-1 rounded-full"
                    style={{
                      background: 'hsl(var(--orange) / 0.08)',
                      color: 'hsl(var(--orange))',
                      border: '1px solid hsl(var(--orange) / 0.15)',
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Calculate marks → Get career guidance</p>
                <div
                  className="px-4 py-2 rounded-full text-sm font-bold text-primary-foreground flex items-center gap-1"
                  style={{ background: 'linear-gradient(135deg, hsl(var(--orange)), hsl(var(--yellow)))' }}
                >
                  Start <span>→</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* College Student Card */}
        <motion.div variants={itemVariants}>
          <div
            className="rounded-2xl overflow-hidden cursor-pointer active:scale-[0.98] transition-transform"
            style={{ boxShadow: '0 8px 32px -8px hsl(var(--purple) / 0.3)' }}
            onClick={() => navigate('/college-marks')}
          >
            {/* Image Banner */}
            <div className="relative h-28 overflow-hidden">
              <img
                src={collegeGraduateImg}
                alt="College graduate"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(135deg, hsl(var(--purple) / 0.85), hsl(var(--accent) / 0.7))' }}
              />
              <div className="absolute inset-0 flex items-center px-5 gap-4">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 backdrop-blur-sm"
                  style={{ background: 'hsla(0,0%,100%,0.2)', border: '1px solid hsla(0,0%,100%,0.25)' }}
                >
                  <GraduationCap className="w-7 h-7 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-primary-foreground flex items-center gap-2">
                    <span>🎓</span> College Student
                  </h2>
                  <p className="text-primary-foreground/80 text-sm mt-0.5">UG / PG / PhD</p>
                </div>
              </div>
            </div>

            {/* Bottom info */}
            <div className="bg-card p-4 border border-t-0 border-border/40 rounded-b-2xl">
              <div className="flex flex-wrap gap-1.5 mb-3">
                {['CGPA', 'Percentage', 'Semester'].map((s) => (
                  <span
                    key={s}
                    className="text-[11px] font-semibold px-3 py-1 rounded-full"
                    style={{
                      background: 'hsl(var(--purple) / 0.08)',
                      color: 'hsl(var(--purple))',
                      border: '1px solid hsl(var(--purple) / 0.15)',
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Semester-wise CGPA → Smart recommendations</p>
                <div
                  className="px-4 py-2 rounded-full text-sm font-bold text-primary-foreground flex items-center gap-1"
                  style={{ background: 'linear-gradient(135deg, hsl(var(--purple)), hsl(var(--accent)))' }}
                >
                  Start <span>→</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <BottomNav />
    </PageWrapper>
  );
}
