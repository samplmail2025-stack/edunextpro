import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { BottomNav } from '@/components/layout/BottomNav';
import { AppHeader } from '@/components/layout/AppHeader';
import { Card3D } from '@/components/layout/Card3D';
import { School, GraduationCap, ChevronRight, Calculator, TrendingUp, Award, Sparkles } from 'lucide-react';
import { useMarks } from '@/hooks/useMarks';
import { CircularProgress } from '@/components/charts/CircularProgress';

export default function MarksSelector() {
  const navigate = useNavigate();
  const { latestMarks } = useMarks();

  const hasMarks = !!latestMarks;
  const percentage = latestMarks?.percentage ?? 0;
  const classification = latestMarks?.classification ?? '-';

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <PageWrapper>
      {/* Compact Hero */}
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(145deg, hsl(var(--primary)), hsl(var(--accent)), hsl(var(--primary) / 0.9))',
          }}
        />
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute -top-12 -right-12 w-40 h-40 rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, hsl(var(--primary-foreground)), transparent 70%)' }}
          />
          <div
            className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, hsl(var(--accent-foreground)), transparent 70%)' }}
          />
          <div className="absolute top-6 right-8 opacity-[0.06]">
            <Calculator className="w-16 h-16 text-primary-foreground" />
          </div>
          <div className="absolute bottom-4 left-10 opacity-[0.06]">
            <Award className="w-12 h-12 text-primary-foreground" />
          </div>
        </div>

        <div className="relative pt-12 pb-14 px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-1.5 bg-primary-foreground/10 backdrop-blur-sm rounded-full px-3.5 py-1.5 mb-3 border border-primary-foreground/10">
              <Sparkles className="w-3.5 h-3.5 text-primary-foreground/80" />
              <span className="text-primary-foreground/80 text-xs font-medium tracking-wide">Smart Calculator</span>
            </div>
            <h1 className="text-[1.65rem] font-bold text-primary-foreground tracking-tight leading-tight">
              Calculate Your Marks
            </h1>
            <p className="text-primary-foreground/60 text-sm mt-1.5 max-w-[260px] mx-auto">
              Choose your student category to get started
            </p>
          </motion.div>
        </div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="px-4 -mt-8 pb-28 space-y-3.5 max-w-lg mx-auto relative z-10"
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
          <Card3D
            onClick={() => navigate('/school-marks')}
            className="w-full rounded-[1.25rem] overflow-hidden text-left cursor-pointer"
          >
            <div
              className="relative border border-border/50"
              style={{
                background: 'linear-gradient(145deg, hsl(var(--card)), hsl(var(--card)))',
                borderRadius: '1.25rem',
                boxShadow: '0 4px 24px -6px hsl(var(--orange) / 0.15), 0 1px 3px hsl(var(--foreground) / 0.04)',
              }}
            >
              {/* Accent strip */}
              <div
                className="h-1.5 rounded-t-[1.25rem] relative overflow-hidden"
                style={{ background: 'linear-gradient(90deg, hsl(var(--orange)), hsl(var(--yellow)))' }}
              >
                <div className="absolute inset-0 animate-[shimmer_2.5s_ease-in-out_infinite]" style={{ background: 'linear-gradient(90deg, transparent 0%, hsla(0,0%,100%,0.35) 50%, transparent 100%)', backgroundSize: '200% 100%' }} />
              </div>

              <div className="p-5">
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: 'linear-gradient(135deg, hsl(var(--orange) / 0.12), hsl(var(--yellow) / 0.08))',
                      border: '1px solid hsl(var(--orange) / 0.15)',
                    }}
                  >
                    <School className="w-7 h-7" style={{ color: 'hsl(var(--orange))' }} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h2 className="text-[1.05rem] font-bold text-foreground tracking-tight">School Student</h2>
                    <p className="text-sm text-muted-foreground mt-0.5">10th, 11th & 12th Class</p>

                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {['Science', 'Commerce', 'Arts'].map((s) => (
                        <span
                          key={s}
                          className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full"
                          style={{
                            background: 'hsl(var(--orange) / 0.08)',
                            color: 'hsl(var(--orange))',
                            border: '1px solid hsl(var(--orange) / 0.12)',
                          }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Arrow */}
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-1"
                    style={{
                      background: 'linear-gradient(135deg, hsl(var(--orange)), hsl(var(--yellow)))',
                      boxShadow: '0 4px 12px hsl(var(--orange) / 0.3)',
                    }}
                  >
                    <ChevronRight className="w-4.5 h-4.5 text-primary-foreground" />
                  </div>
                </div>

                <div
                  className="mt-4 pt-3 flex items-center gap-2 text-xs text-muted-foreground"
                  style={{ borderTop: '1px solid hsl(var(--border) / 0.6)' }}
                >
                  <Calculator className="w-3.5 h-3.5" style={{ color: 'hsl(var(--orange) / 0.7)' }} />
                  <span>Calculate marks & get career guidance</span>
                </div>
              </div>
            </div>
          </Card3D>
        </motion.div>

        {/* College Student Card */}
        <motion.div variants={itemVariants}>
          <Card3D
            onClick={() => navigate('/college-marks')}
            className="w-full rounded-[1.25rem] overflow-hidden text-left cursor-pointer"
          >
            <div
              className="relative border border-border/50"
              style={{
                background: 'linear-gradient(145deg, hsl(var(--card)), hsl(var(--card)))',
                borderRadius: '1.25rem',
                boxShadow: '0 4px 24px -6px hsl(var(--purple) / 0.15), 0 1px 3px hsl(var(--foreground) / 0.04)',
              }}
            >
              {/* Accent strip */}
              <div
                className="h-1.5 rounded-t-[1.25rem]"
                style={{ background: 'linear-gradient(90deg, hsl(var(--purple)), hsl(var(--accent)))' }}
              />

              <div className="p-5">
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: 'linear-gradient(135deg, hsl(var(--purple) / 0.12), hsl(var(--accent) / 0.08))',
                      border: '1px solid hsl(var(--purple) / 0.15)',
                    }}
                  >
                    <GraduationCap className="w-7 h-7" style={{ color: 'hsl(var(--purple))' }} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h2 className="text-[1.05rem] font-bold text-foreground tracking-tight">College Student</h2>
                    <p className="text-sm text-muted-foreground mt-0.5">UG, PG & PhD Level</p>

                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {['CGPA', 'Percentage', 'Semester'].map((s) => (
                        <span
                          key={s}
                          className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full"
                          style={{
                            background: 'hsl(var(--purple) / 0.08)',
                            color: 'hsl(var(--purple))',
                            border: '1px solid hsl(var(--purple) / 0.12)',
                          }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Arrow */}
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-1"
                    style={{
                      background: 'linear-gradient(135deg, hsl(var(--purple)), hsl(var(--accent)))',
                      boxShadow: '0 4px 12px hsl(var(--purple) / 0.3)',
                    }}
                  >
                    <ChevronRight className="w-4.5 h-4.5 text-primary-foreground" />
                  </div>
                </div>

                <div
                  className="mt-4 pt-3 flex items-center gap-2 text-xs text-muted-foreground"
                  style={{ borderTop: '1px solid hsl(var(--border) / 0.6)' }}
                >
                  <Award className="w-3.5 h-3.5" style={{ color: 'hsl(var(--purple) / 0.7)' }} />
                  <span>Semester-wise CGPA & smart recommendations</span>
                </div>
              </div>
            </div>
          </Card3D>
        </motion.div>
      </motion.div>

      <BottomNav />
    </PageWrapper>
  );
}
