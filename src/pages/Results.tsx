import { useLocation, useNavigate } from 'react-router-dom';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { BottomNav } from '@/components/layout/BottomNav';
import { AppHeader } from '@/components/layout/AppHeader';
import { CircularProgress } from '@/components/charts/CircularProgress';
import { GradeBarChart } from '@/components/charts/GradeBarChart';
import { Button } from '@/components/ui/button';
import { Trophy, Star, TrendingUp, BookOpen } from 'lucide-react';
import resultsHeroImg from '@/assets/results-celebration.jpg';

interface LocationState {
  studentType: 'school' | 'college';
  class?: string;
  stream?: string;
  level?: string;
  course?: string;
  subjects?: { name: string; marks: number; maxMarks: number }[];
  percentage: number;
  grade?: string;
  classification: string;
  cgpa?: number;
  semesters?: unknown[];
}

const classificationColor: Record<string, string> = {
  Distinction: 'gradient-green',
  'First Class': 'gradient-blue',
  'Second Class': 'gradient-yellow',
  'Third Class': 'gradient-orange',
  Outstanding: 'gradient-purple',
  Fail: 'bg-destructive',
};

export default function Results() {
  const navigate = useNavigate();
  const { state } = useLocation() as { state: LocationState };

  if (!state) {
    navigate('/student-type');
    return null;
  }

  const { studentType, class: cls, stream, level, course, subjects, percentage, grade, classification, cgpa } = state;
  const gradientClass = classificationColor[classification] || 'gradient-primary';

  return (
    <PageWrapper>
      <AppHeader title="Your Results" subtitle="Academic Performance" showBack gradient />
      <div className="p-4 space-y-4 max-w-lg mx-auto">
        {/* Hero image banner */}
        <div className="relative rounded-2xl overflow-hidden h-36 card-shadow">
          <img src={resultsHeroImg} alt="Students celebrating results" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-3 left-4 right-4">
            <h2 className="text-white font-bold text-lg leading-tight">Your Academic Journey</h2>
            <p className="text-white/80 text-xs mt-0.5">Detailed performance analysis & insights</p>
          </div>
        </div>

        {/* Main result card */}
        <div className={`${gradientClass} rounded-3xl p-6 text-white text-center animate-bounce-in card-shadow`}>
          <Trophy className="w-10 h-10 mx-auto mb-2 text-white/90" />
          <h2 className="text-4xl font-bold">{percentage.toFixed(1)}%</h2>
          {cgpa && <p className="text-white/90 text-lg font-semibold mt-1">CGPA: {cgpa.toFixed(2)}</p>}
          {grade && <p className="text-white/80 text-sm mt-1">Grade: {grade}</p>}
          <div className="mt-3 inline-block bg-white/20 rounded-full px-4 py-1">
            <span className="font-bold text-base">{classification}</span>
          </div>
          <div className="flex justify-center gap-4 mt-4 text-white/80 text-xs">
            {cls && <span>📚 {cls}</span>}
            {stream && <span>🎯 {stream}</span>}
            {level && <span>🎓 {level}</span>}
            {course && <span>📖 {course.slice(0, 20)}</span>}
          </div>
        </div>

        {/* Circular progress */}
        <div className="bg-card rounded-2xl p-6 card-shadow border border-border text-center">
          <CircularProgress
            percentage={percentage}
            colorClass={classification === 'Distinction' || classification === 'Outstanding' ? 'green' : classification === 'First Class' ? 'primary' : 'orange'}
            label="Overall Score"
            sublabel="Percentage"
          />
        </div>

        {/* Subject-wise breakdown */}
        {subjects && subjects.length > 0 && (
          <div className="bg-card rounded-2xl p-4 card-shadow border border-border">
            <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <Star className="w-4 h-4 text-edu-yellow" /> Subject-wise Marks
            </h3>
            <GradeBarChart data={subjects.map(s => ({ subject: s.name, marks: s.marks, maxMarks: s.maxMarks }))} />
            <div className="mt-3 space-y-2">
              {subjects.map((s) => {
                const pct = ((s.marks / s.maxMarks) * 100).toFixed(0);
                return (
                  <div key={s.name} className="flex items-center justify-between text-sm">
                    <span className="text-foreground truncate flex-1 mr-2">{s.name}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${Number(pct) >= 75 ? 'bg-edu-green' : Number(pct) >= 50 ? 'gradient-primary' : 'bg-destructive'}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="text-xs font-semibold text-muted-foreground w-12 text-right">{s.marks}/{s.maxMarks}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Stats grid */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-edu-blue-light rounded-2xl p-3 text-center">
            <TrendingUp className="w-5 h-5 text-edu-blue mx-auto mb-1" />
            <p className="text-xs font-medium text-edu-blue">Score</p>
            <p className="text-sm font-bold text-foreground">{percentage.toFixed(1)}%</p>
          </div>
          <div className="bg-edu-green-light rounded-2xl p-3 text-center">
            <Trophy className="w-5 h-5 text-edu-green mx-auto mb-1" />
            <p className="text-xs font-medium text-edu-green">Class</p>
            <p className="text-xs font-bold text-foreground leading-tight">{classification}</p>
          </div>
          <div className="bg-edu-purple-light rounded-2xl p-3 text-center">
            <BookOpen className="w-5 h-5 text-edu-purple mx-auto mb-1" />
            <p className="text-xs font-medium text-edu-purple">{cgpa ? 'CGPA' : 'Grade'}</p>
            <p className="text-sm font-bold text-foreground">{cgpa ? cgpa.toFixed(2) : grade || '-'}</p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="grid grid-cols-2 gap-3 pb-4">
          <Button
            onClick={() => navigate('/recommendations', { state: { studentType, percentage, cgpa, stream, level, course, classification } })}
            className="h-14 rounded-2xl gradient-primary border-0 flex flex-col gap-0.5"
          >
            <span className="text-lg">🎯</span>
            <span className="text-xs font-semibold">Get Recommendations</span>
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate(studentType === 'school' ? '/school-marks' : '/college-marks')}
            className="h-14 rounded-2xl flex flex-col gap-0.5"
          >
            <span className="text-lg">✏️</span>
            <span className="text-xs font-semibold">Edit Marks</span>
          </Button>
        </div>
      </div>
      <BottomNav />
    </PageWrapper>
  );
}
