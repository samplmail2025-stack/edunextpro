import { useNavigate } from 'react-router-dom';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { BottomNav } from '@/components/layout/BottomNav';
import { School, GraduationCap, Sparkles, BookOpen, Building2, Briefcase, Target } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export default function StudentType() {
  const navigate = useNavigate();
  const { profile } = useAuth();

  return (
    <PageWrapper>
      {/* Colorful gradient header */}
      <div className="pt-12 pb-20 px-6 text-center relative overflow-hidden" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 60%, #f093fb 100%)'}}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-8 -left-8 w-40 h-40 rounded-full opacity-20" style={{background: 'radial-gradient(circle, #fff, transparent)'}} />
          <div className="absolute top-4 right-4 w-28 h-28 rounded-full opacity-15" style={{background: 'radial-gradient(circle, #fecfef, transparent)'}} />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-24 rounded-full opacity-20" style={{background: 'radial-gradient(circle, #fff, transparent)'}} />
        </div>
        <div className="relative">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-yellow-300" fill="currentColor" />
            <span className="text-white/90 text-sm font-semibold">Welcome back, {profile?.full_name?.split(' ')[0] || 'Student'}! 👋</span>
          </div>
          <h1 className="text-3xl font-black text-white mt-2 drop-shadow-lg">Who are you?</h1>
          <p className="text-white/80 text-sm mt-2 font-medium">Select your student category to get started</p>
        </div>
      </div>

      <div className="px-4 -mt-12 pb-8 space-y-4 max-w-lg mx-auto">
        {/* School Student Card - 3D Style */}
        <button
          onClick={() => navigate('/school-marks')}
          className="w-full text-left transition-all duration-200 active:scale-[0.97] hover:scale-[1.01]"
          style={{ animationDelay: '0.1s' }}
        >
          <div
            className="rounded-3xl p-5"
            style={{
              background: 'white',
              boxShadow: '0 10px 0 #d97706, 0 12px 30px rgba(217,119,6,0.3), 0 4px 20px rgba(0,0,0,0.1)',
              border: '2px solid rgba(251,191,36,0.3)',
            }}
          >
            <div className="flex items-center gap-4">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: 'linear-gradient(135deg, #f97316, #f59e0b)',
                  boxShadow: '0 6px 0 #c2410c, 0 8px 20px rgba(249,115,22,0.4)',
                }}
              >
                <School className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-black text-gray-800">🏫 School Student</h2>
                <p className="text-gray-500 text-sm font-medium">10th / 11th / 12th</p>
                <div className="flex gap-1.5 mt-2">
                  {['Science', 'Commerce', 'Arts'].map((s) => (
                    <span key={s} className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{background: 'linear-gradient(135deg, #fef3c7, #fde68a)', color: '#92400e'}}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="text-xs text-gray-400 font-medium">Calculate marks → Get career guidance</div>
              <div
                className="rounded-full px-4 py-1.5 text-white text-xs font-black"
                style={{
                  background: 'linear-gradient(135deg, #f97316, #f59e0b)',
                  boxShadow: '0 4px 0 #c2410c, 0 6px 15px rgba(249,115,22,0.4)',
                }}
              >
                Start →
              </div>
            </div>
          </div>
        </button>

        {/* College Student Card - 3D Style */}
        <button
          onClick={() => navigate('/college-marks')}
          className="w-full text-left transition-all duration-200 active:scale-[0.97] hover:scale-[1.01]"
          style={{ animationDelay: '0.2s' }}
        >
          <div
            className="rounded-3xl p-5"
            style={{
              background: 'white',
              boxShadow: '0 10px 0 #6d28d9, 0 12px 30px rgba(109,40,217,0.3), 0 4px 20px rgba(0,0,0,0.1)',
              border: '2px solid rgba(167,139,250,0.3)',
            }}
          >
            <div className="flex items-center gap-4">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                  boxShadow: '0 6px 0 #5b21b6, 0 8px 20px rgba(139,92,246,0.4)',
                }}
              >
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-black text-gray-800">🎓 College Student</h2>
                <p className="text-gray-500 text-sm font-medium">UG / PG / PhD</p>
                <div className="flex gap-1.5 mt-2">
                  {['CGPA', 'Percentage', 'Semester'].map((s) => (
                    <span key={s} className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{background: 'linear-gradient(135deg, #ede9fe, #ddd6fe)', color: '#5b21b6'}}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="text-xs text-gray-400 font-medium">Semester-wise CGPA → Smart recommendations</div>
              <div
                className="rounded-full px-4 py-1.5 text-white text-xs font-black"
                style={{
                  background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                  boxShadow: '0 4px 0 #5b21b6, 0 6px 15px rgba(139,92,246,0.4)',
                }}
              >
                Start →
              </div>
            </div>
          </div>
        </button>

        {/* Info Cards - 3D Style */}
        <div className="grid grid-cols-2 gap-3 mt-2">
          {[
            { icon: BookOpen, label: '50+ Courses', emoji: '📚', from: '#60a5fa', to: '#3b82f6', shadow: '#1d4ed8', light: '#eff6ff', textColor: '#1d4ed8' },
            { icon: Building2, label: '100+ Colleges', emoji: '🏛️', from: '#34d399', to: '#10b981', shadow: '#047857', light: '#ecfdf5', textColor: '#047857' },
            { icon: Briefcase, label: '20+ Job Paths', emoji: '💼', from: '#fb923c', to: '#f97316', shadow: '#c2410c', light: '#fff7ed', textColor: '#c2410c' },
            { icon: Target, label: 'Smart AI Reco', emoji: '🎯', from: '#a78bfa', to: '#8b5cf6', shadow: '#5b21b6', light: '#f5f3ff', textColor: '#5b21b6' },
          ].map(({ label, emoji, from, to, shadow, light, textColor }) => (
            <div
              key={label}
              className="rounded-2xl p-4 text-center transition-transform hover:scale-[1.02]"
              style={{
                background: light,
                boxShadow: `0 6px 0 ${shadow}33, 0 8px 20px ${from}33`,
                border: `2px solid ${from}33`,
              }}
            >
              <div className="text-3xl mb-2">{emoji}</div>
              <p
                className="text-xs font-black"
                style={{ color: textColor }}
              >
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
      <BottomNav />
    </PageWrapper>
  );
}
