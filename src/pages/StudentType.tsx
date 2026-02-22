import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { BottomNav } from '@/components/layout/BottomNav';
import { Card3D } from '@/components/layout/Card3D';
import { useAuth } from '@/hooks/useAuth';
import { useMarks } from '@/hooks/useMarks';
import {
  School, GraduationCap, Sparkles, TrendingUp, BookOpen,
  Building2, Briefcase, ChevronRight, BarChart3, Award
} from 'lucide-react';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function StudentType() {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const { latestMarks, marks } = useMarks();

  const isSchool = profile?.education_type === 'School Student';
  const isCollege = profile?.education_type === 'College Student';
  const marksPath = isSchool ? '/school-marks' : '/college-marks';
  const firstName = profile?.full_name?.split(' ')[0] || 'Student';

  const hasMarks = !!latestMarks;
  const percentage = latestMarks?.percentage;
  const cgpa = latestMarks?.cgpa;
  const grade = latestMarks?.grade;
  const classification = latestMarks?.classification;

  return (
    <PageWrapper>
      {/* Header */}
      <div className="gradient-primary pt-10 pb-14 px-5 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-6 right-6 w-32 h-32 rounded-full bg-white/30" />
          <div className="absolute bottom-2 left-10 w-20 h-20 rounded-full bg-white/20" />
        </div>
        <motion.div {...fadeUp()} className="relative">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span className="text-white/80 text-xs font-medium">Welcome back!</span>
          </div>
          <h1 className="text-2xl font-bold text-white">{firstName} 👋</h1>
          <span className="inline-block mt-2 text-xs font-semibold text-white/90 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
            {isSchool ? '🏫 School Student' : isCollege ? '🎓 College Student' : profile?.education_type}
          </span>
        </motion.div>
      </div>

      <div className="px-4 -mt-8 pb-24 space-y-4 max-w-lg mx-auto">
        {/* Marks Summary Card */}
        <motion.div {...fadeUp(0.1)}>
          <Card3D
            onClick={() => hasMarks ? navigate('/results') : navigate(marksPath)}
            className="w-full bg-card rounded-3xl p-5 border border-border text-left cursor-pointer"
          >
            {hasMarks ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                      <BarChart3 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Latest Result</p>
                      <p className="font-bold text-foreground">{classification || grade || 'View Results'}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {percentage != null && (
                    <div className="bg-edu-blue-light rounded-xl p-2.5 text-center">
                      <p className="text-lg font-bold text-edu-blue">{percentage.toFixed(1)}%</p>
                      <p className="text-[10px] text-muted-foreground">Percentage</p>
                    </div>
                  )}
                  {cgpa != null && (
                    <div className="bg-edu-purple-light rounded-xl p-2.5 text-center">
                      <p className="text-lg font-bold text-edu-purple">{cgpa.toFixed(2)}</p>
                      <p className="text-[10px] text-muted-foreground">CGPA</p>
                    </div>
                  )}
                  {grade && (
                    <div className="bg-edu-green-light rounded-xl p-2.5 text-center">
                      <p className="text-lg font-bold text-edu-green">{grade}</p>
                      <p className="text-[10px] text-muted-foreground">Grade</p>
                    </div>
                  )}
                </div>
                <p className="text-[10px] text-muted-foreground">
                  {marks.length} record{marks.length !== 1 ? 's' : ''} saved • Tap to view details
                </p>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${isSchool ? 'gradient-orange' : 'gradient-purple'}`}
                  style={{ boxShadow: isSchool ? '0 8px 20px -4px rgba(249,115,22,0.4)' : '0 8px 20px -4px rgba(139,92,246,0.4)' }}>
                  {isSchool ? <School className="w-7 h-7 text-white" /> : <GraduationCap className="w-7 h-7 text-white" />}
                </div>
                <div className="flex-1">
                  <h2 className="text-base font-bold text-foreground">Enter Your Marks</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {isSchool ? 'Add your 10th/11th/12th marks' : 'Add your semester CGPA/percentage'}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            )}
          </Card3D>
        </motion.div>

        {/* Quick Stats */}
        {hasMarks && (
          <motion.div {...fadeUp(0.15)} className="grid grid-cols-3 gap-2">
            <div className="bg-card border border-border rounded-2xl p-3 text-center">
              <Award className="w-5 h-5 mx-auto text-edu-orange mb-1" />
              <p className="text-sm font-bold text-foreground">{marks.length}</p>
              <p className="text-[10px] text-muted-foreground">Tests</p>
            </div>
            <div className="bg-card border border-border rounded-2xl p-3 text-center">
              <TrendingUp className="w-5 h-5 mx-auto text-edu-green mb-1" />
              <p className="text-sm font-bold text-foreground">
                {Math.max(...marks.map(m => m.percentage || 0)).toFixed(0)}%
              </p>
              <p className="text-[10px] text-muted-foreground">Best</p>
            </div>
            <div className="bg-card border border-border rounded-2xl p-3 text-center">
              <BarChart3 className="w-5 h-5 mx-auto text-edu-purple mb-1" />
              <p className="text-sm font-bold text-foreground">{latestMarks?.grade || '—'}</p>
              <p className="text-[10px] text-muted-foreground">Grade</p>
            </div>
          </motion.div>
        )}

        {/* Feature Action Cards */}
        <motion.div {...fadeUp(0.2)} className="space-y-3">
          <h3 className="text-sm font-semibold text-muted-foreground px-1">Explore</h3>

          <Card3D
            onClick={() => navigate(marksPath)}
            className="w-full bg-card rounded-2xl p-4 border border-border text-left cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl gradient-orange flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm text-foreground">{hasMarks ? 'Add More Marks' : 'Enter Marks'}</p>
                <p className="text-xs text-muted-foreground">{isSchool ? 'School marks calculator' : 'Semester CGPA calculator'}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </div>
          </Card3D>

          <Card3D
            onClick={() => navigate('/recommendations')}
            className="w-full bg-card rounded-2xl p-4 border border-border text-left cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm text-foreground">Get Recommendations</p>
                <p className="text-xs text-muted-foreground">Courses & careers based on your marks</p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </div>
          </Card3D>

          <Card3D
            onClick={() => navigate('/college-finder')}
            className="w-full bg-card rounded-2xl p-4 border border-border text-left cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl gradient-green flex items-center justify-center flex-shrink-0">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm text-foreground">Find Colleges</p>
                <p className="text-xs text-muted-foreground">Near {profile?.district || 'your district'}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </div>
          </Card3D>

          <Card3D
            onClick={() => navigate('/jobs')}
            className="w-full bg-card rounded-2xl p-4 border border-border text-left cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl gradient-purple flex items-center justify-center flex-shrink-0">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm text-foreground">View Jobs</p>
                <p className="text-xs text-muted-foreground">Career paths & opportunities</p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </div>
          </Card3D>
        </motion.div>

        {/* Info Grid */}
        <motion.div {...fadeUp(0.3)} className="grid grid-cols-2 gap-3">
          {[
            { emoji: '📚', label: '50+ Courses', bg: 'bg-edu-blue-light', color: 'text-edu-blue' },
            { emoji: '🏛️', label: '100+ Colleges', bg: 'bg-edu-green-light', color: 'text-edu-green' },
            { emoji: '💼', label: '20+ Job Paths', bg: 'bg-edu-orange-light', color: 'text-edu-orange' },
            { emoji: '🎯', label: 'Smart AI Reco', bg: 'bg-edu-purple-light', color: 'text-edu-purple' },
          ].map((item) => (
            <div key={item.label} className={`${item.bg} rounded-2xl p-3 text-center`}>
              <div className="text-2xl mb-1">{item.emoji}</div>
              <p className={`text-xs font-semibold ${item.color}`}>{item.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
      <BottomNav />
    </PageWrapper>
  );
}
