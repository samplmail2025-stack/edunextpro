import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { BottomNav } from '@/components/layout/BottomNav';
import { Card3D } from '@/components/layout/Card3D';
import { School, GraduationCap, Sparkles, BookOpen, Building2, Briefcase, Target, Lightbulb, PenTool } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export default function StudentType() {
  const navigate = useNavigate();
  const { profile } = useAuth();

  return (
    <PageWrapper>
      <div className="gradient-primary pt-12 pb-16 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07]">
          <div className="absolute top-8 left-8 w-24 h-24 rounded-full bg-white" />
          <div className="absolute bottom-4 right-8 w-16 h-16 rounded-full bg-white" />
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
            <span className="text-white/90 text-sm font-medium">Welcome back, {profile?.full_name?.split(' ')[0] || 'Student'}! 👋</span>
          </div>
          <h1 className="text-2xl font-bold text-white mt-2">Who are you?</h1>
          <p className="text-white/80 text-sm mt-1">Select your student category to get started</p>
        </motion.div>
      </div>

      <div className="px-4 -mt-8 pb-8 space-y-4 max-w-lg mx-auto">
        {/* School Student Card - 3D */}
        <Card3D
          onClick={() => navigate('/school-marks')}
          className="w-full bg-card rounded-3xl p-5 border border-border text-left cursor-pointer"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl gradient-orange flex items-center justify-center flex-shrink-0"
              style={{ boxShadow: '0 8px 20px -4px rgba(249,115,22,0.4)' }}>
              <School className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">🏫 School Student</h2>
              <p className="text-muted-foreground text-sm">10th / 11th / 12th</p>
              <div className="flex gap-1 mt-2">
                {['Science', 'Commerce', 'Arts'].map((s) => (
                  <span key={s} className="text-xs bg-edu-orange-light text-edu-orange px-2 py-0.5 rounded-full font-medium">{s}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="text-xs text-muted-foreground">Calculate marks → Get career guidance</div>
            <div className="gradient-orange rounded-full px-3 py-1 text-white text-xs font-semibold"
              style={{ boxShadow: '0 4px 12px rgba(249,115,22,0.3)' }}>Start →</div>
          </div>
        </Card3D>

        {/* College Student Card - 3D */}
        <Card3D
          onClick={() => navigate('/college-marks')}
          className="w-full bg-card rounded-3xl p-5 border border-border text-left cursor-pointer"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl gradient-purple flex items-center justify-center flex-shrink-0"
              style={{ boxShadow: '0 8px 20px -4px rgba(139,92,246,0.4)' }}>
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">🎓 College Student</h2>
              <p className="text-muted-foreground text-sm">UG / PG / PhD</p>
              <div className="flex gap-1 mt-2">
                {['CGPA', 'Percentage', 'Semester'].map((s) => (
                  <span key={s} className="text-xs bg-edu-purple-light text-edu-purple px-2 py-0.5 rounded-full font-medium">{s}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="text-xs text-muted-foreground">Semester-wise CGPA → Smart recommendations</div>
            <div className="gradient-purple rounded-full px-3 py-1 text-white text-xs font-semibold"
              style={{ boxShadow: '0 4px 12px rgba(139,92,246,0.3)' }}>Start →</div>
          </div>
        </Card3D>

        {/* Info Cards */}
        <div className="grid grid-cols-2 gap-3 mt-2">
          {[
            { icon: BookOpen, label: '50+ Courses', bg: 'bg-edu-blue-light', color: 'text-edu-blue' },
            { icon: Building2, label: '100+ Colleges', bg: 'bg-edu-green-light', color: 'text-edu-green' },
            { icon: Briefcase, label: '20+ Job Paths', bg: 'bg-edu-orange-light', color: 'text-edu-orange' },
            { icon: Target, label: 'Smart AI Reco', bg: 'bg-edu-purple-light', color: 'text-edu-purple' },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className={`${item.bg} rounded-2xl p-3 text-center`}
              >
                <Icon className={`w-6 h-6 mx-auto mb-1 ${item.color}`} />
                <p className={`text-xs font-semibold ${item.color}`}>{item.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
      <BottomNav />
    </PageWrapper>
  );
}
