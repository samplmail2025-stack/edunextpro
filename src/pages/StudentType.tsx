import { useNavigate } from 'react-router-dom';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { BottomNav } from '@/components/layout/BottomNav';
import { School, GraduationCap, Sparkles } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export default function StudentType() {
  const navigate = useNavigate();
  const { profile } = useAuth();

  return (
    <PageWrapper>
      <div className="gradient-primary pt-12 pb-16 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-8 left-8 w-24 h-24 rounded-full bg-white" />
          <div className="absolute bottom-4 right-8 w-16 h-16 rounded-full bg-white" />
        </div>
        <div className="relative">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-yellow-300" />
            <span className="text-white/90 text-sm font-medium">Welcome back, {profile?.full_name?.split(' ')[0] || 'Student'}! 👋</span>
          </div>
          <h1 className="text-2xl font-bold text-white mt-2">Who are you?</h1>
          <p className="text-white/80 text-sm mt-1">Select your student category to get started</p>
        </div>
      </div>

      <div className="px-4 -mt-8 pb-8 space-y-4 max-w-lg mx-auto">
        {/* School Student Card */}
        <button
          onClick={() => navigate('/school-marks')}
          className="w-full bg-card rounded-3xl p-5 card-shadow border border-border text-left animate-slide-up hover:scale-[1.02] transition-transform active:scale-[0.98]"
          style={{ animationDelay: '0.1s' }}
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl gradient-orange flex items-center justify-center flex-shrink-0">
              <School className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">🏫 School Student</h2>
              <p className="text-muted-foreground text-sm">10th / 11th / 12th</p>
              <div className="flex gap-1 mt-2">
                {['Science', 'Commerce', 'Arts'].map((s) => (
                  <span key={s} className="text-xs bg-edu-orange-light text-edu-orange px-2 py-0.5 rounded-full">{s}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="text-xs text-muted-foreground">Calculate marks → Get career guidance</div>
            <div className="gradient-orange rounded-full px-3 py-1 text-white text-xs font-semibold">Start →</div>
          </div>
        </button>

        {/* College Student Card */}
        <button
          onClick={() => navigate('/college-marks')}
          className="w-full bg-card rounded-3xl p-5 card-shadow border border-border text-left animate-slide-up hover:scale-[1.02] transition-transform active:scale-[0.98]"
          style={{ animationDelay: '0.2s' }}
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl gradient-purple flex items-center justify-center flex-shrink-0">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">🎓 College Student</h2>
              <p className="text-muted-foreground text-sm">UG / PG / PhD</p>
              <div className="flex gap-1 mt-2">
                {['CGPA', 'Percentage', 'Semester'].map((s) => (
                  <span key={s} className="text-xs bg-edu-purple-light text-edu-purple px-2 py-0.5 rounded-full">{s}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="text-xs text-muted-foreground">Semester-wise CGPA → Smart recommendations</div>
            <div className="gradient-purple rounded-full px-3 py-1 text-white text-xs font-semibold">Start →</div>
          </div>
        </button>

        {/* Info Cards */}
        <div className="grid grid-cols-2 gap-3 mt-2">
          <div className="bg-edu-blue-light rounded-2xl p-3 text-center">
            <div className="text-2xl mb-1">📚</div>
            <p className="text-xs font-semibold text-edu-blue">50+ Courses</p>
          </div>
          <div className="bg-edu-green-light rounded-2xl p-3 text-center">
            <div className="text-2xl mb-1">🏛️</div>
            <p className="text-xs font-semibold text-edu-green">100+ Colleges</p>
          </div>
          <div className="bg-edu-orange-light rounded-2xl p-3 text-center">
            <div className="text-2xl mb-1">💼</div>
            <p className="text-xs font-semibold text-edu-orange">20+ Job Paths</p>
          </div>
          <div className="bg-edu-purple-light rounded-2xl p-3 text-center">
            <div className="text-2xl mb-1">🎯</div>
            <p className="text-xs font-semibold text-edu-purple">Smart AI Reco</p>
          </div>
        </div>
      </div>
      <BottomNav />
    </PageWrapper>
  );
}
