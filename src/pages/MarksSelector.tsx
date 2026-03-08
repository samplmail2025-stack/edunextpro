import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { BottomNav } from '@/components/layout/BottomNav';
import { AppHeader } from '@/components/layout/AppHeader';
import { Card3D } from '@/components/layout/Card3D';
import { School, GraduationCap, ChevronRight, Calculator, BookOpen, Lightbulb } from 'lucide-react';
import { useMarks } from '@/hooks/useMarks';
import { CircularProgress } from '@/components/charts/CircularProgress';
import schoolStudentImg from '@/assets/school-student.jpg';
import collegeGraduateImg from '@/assets/college-graduate.jpg';
import studentsStudyingImg from '@/assets/students-studying.jpg';

export default function MarksSelector() {
  const navigate = useNavigate();
  const { latestMarks } = useMarks();

  const hasMarks = !!latestMarks;
  const percentage = latestMarks?.percentage ?? 0;
  const classification = latestMarks?.classification ?? '-';

  return (
    <PageWrapper>
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={studentsStudyingImg} alt="Banner" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/80 to-background" />
        </div>
        <div className="relative pt-10 pb-16 px-6 text-center">
          <div className="absolute inset-0 opacity-[0.05]">
            <Calculator className="absolute top-8 right-14 w-10 h-10 text-white" />
            <BookOpen className="absolute bottom-10 left-14 w-10 h-10 text-white" />
            <Lightbulb className="absolute top-14 left-1/3 w-8 h-8 text-white" />
          </div>
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 mb-3">
              <Calculator className="w-3.5 h-3.5 text-white/80" />
              <span className="text-white/80 text-xs font-medium">Marks Calculator</span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Enter Your Marks</h1>
            <p className="text-white/70 text-sm mt-1.5">Select your student category to calculate</p>
          </motion.div>
        </div>
      </div>

      <div className="px-4 -mt-10 pb-8 space-y-4 max-w-lg mx-auto relative z-10">
        {/* Previous Score Mini Card */}
        {hasMarks && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-2xl p-4 border border-border shadow-sm flex items-center gap-4"
          >
            <CircularProgress
              percentage={percentage}
              size={60}
              strokeWidth={6}
              colorClass={percentage >= 75 ? 'green' : percentage >= 50 ? 'orange' : 'primary'}
            />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground">Last Calculated</p>
              <p className="text-lg font-bold text-foreground">{percentage}%</p>
              <p className="text-xs text-muted-foreground">{classification}</p>
            </div>
            <div
              onClick={() => navigate('/results')}
              className="text-xs font-semibold text-primary cursor-pointer hover:underline flex items-center gap-0.5"
            >
              View <ChevronRight className="w-3 h-3" />
            </div>
          </motion.div>
        )}

        {/* School Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card3D
            onClick={() => navigate('/school-marks')}
            className="w-full bg-card rounded-[1.25rem] overflow-hidden border border-border text-left cursor-pointer shadow-lg shadow-black/5"
          >
            <div className="relative h-32 overflow-hidden">
              <img src={schoolStudentImg} alt="School student" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600/85 to-orange-500/60" />
              <div className="absolute inset-0 flex items-center p-5">
                <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center flex-shrink-0 mr-4 border border-white/20">
                  <School className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <School className="w-4 h-4" /> School Student
                  </h2>
                  <p className="text-white/80 text-sm mt-0.5">10th / 11th / 12th Class</p>
                </div>
              </div>
            </div>
            <div className="p-4">
              <div className="flex gap-1.5 mb-3">
                {['Science', 'Commerce', 'Arts'].map((s) => (
                  <span key={s} className="text-xs bg-edu-orange-light text-edu-orange px-2.5 py-1 rounded-full font-medium">{s}</span>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <div className="text-xs text-muted-foreground">Calculate marks & get career guidance</div>
                <div className="gradient-orange rounded-full px-3.5 py-1.5 text-white text-xs font-semibold flex items-center gap-1"
                  style={{ boxShadow: '0 4px 14px rgba(249,115,22,0.25)' }}>
                  Start <ChevronRight className="w-3 h-3" />
                </div>
              </div>
            </div>
          </Card3D>
        </motion.div>

        {/* College Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card3D
            onClick={() => navigate('/college-marks')}
            className="w-full bg-card rounded-[1.25rem] overflow-hidden border border-border text-left cursor-pointer shadow-lg shadow-black/5"
          >
            <div className="relative h-32 overflow-hidden">
              <img src={collegeGraduateImg} alt="College graduate" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600/85 to-purple-500/60" />
              <div className="absolute inset-0 flex items-center p-5">
                <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center flex-shrink-0 mr-4 border border-white/20">
                  <GraduationCap className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <GraduationCap className="w-4 h-4" /> College Student
                  </h2>
                  <p className="text-white/80 text-sm mt-0.5">UG / PG / PhD Level</p>
                </div>
              </div>
            </div>
            <div className="p-4">
              <div className="flex gap-1.5 mb-3">
                {['CGPA', 'Percentage', 'Semester'].map((s) => (
                  <span key={s} className="text-xs bg-edu-purple-light text-edu-purple px-2.5 py-1 rounded-full font-medium">{s}</span>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <div className="text-xs text-muted-foreground">Semester-wise CGPA & smart recommendations</div>
                <div className="gradient-purple rounded-full px-3.5 py-1.5 text-white text-xs font-semibold flex items-center gap-1"
                  style={{ boxShadow: '0 4px 14px rgba(139,92,246,0.25)' }}>
                  Start <ChevronRight className="w-3 h-3" />
                </div>
              </div>
            </div>
          </Card3D>
        </motion.div>
      </div>
      <BottomNav />
    </PageWrapper>
  );
}
