import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppHeader } from '@/components/layout/AppHeader';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { BottomNav } from '@/components/layout/BottomNav';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { calculatePercentage, calculateGrade, calculateClassification, getSchoolSubjects } from '@/lib/calculations';
import { useMarks } from '@/hooks/useMarks';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const CLASSES = ['10th', '11th', '12th'];
const STREAMS = ['Science', 'Commerce', 'Arts'];

export default function SchoolMarks() {
  const navigate = useNavigate();
  const { saveMarks } = useMarks();
  const { toast } = useToast();
  const [cls, setCls] = useState('12th');
  const [stream, setStream] = useState('Science');
  const [marks, setMarks] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const subjects = getSchoolSubjects(stream, cls);

  const handleCalculate = async () => {
    const subjectData = subjects.map((s) => ({
      name: s,
      marks: Number(marks[s] || 0),
      maxMarks: 100,
    }));
    const incomplete = subjectData.some((s) => !marks[s.name]);
    if (incomplete) {
      toast({ title: 'Incomplete', description: 'Please enter marks for all subjects.', variant: 'destructive' });
      return;
    }
    const percentage = calculatePercentage(subjectData);
    const grade = calculateGrade(percentage);
    const classification = calculateClassification(percentage);
    const subjectsObj: Record<string, number> = {};
    subjectData.forEach((s) => { subjectsObj[s.name] = s.marks; });

    setLoading(true);
    await saveMarks({
      student_type: 'school',
      class: cls,
      stream: cls !== '10th' ? stream : undefined,
      subjects: subjectsObj,
      percentage,
      grade,
      classification,
    });
    setLoading(false);

    navigate('/results', {
      state: {
        studentType: 'school',
        class: cls,
        stream,
        subjects: subjectData,
        percentage,
        grade,
        classification,
      },
    });
  };

  return (
    <PageWrapper>
      <AppHeader title="School Marks" subtitle="Enter your subject marks" showBack backPath="/student-type" gradient />
      <div className="p-4 space-y-4 max-w-lg mx-auto">
        {/* Class & Stream Selection */}
        <div className="bg-card rounded-2xl p-4 card-shadow border border-border">
          <h3 className="font-semibold text-foreground mb-3">Select Class & Stream</h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-sm">Class</Label>
              <Select value={cls} onValueChange={setCls}>
                <SelectTrigger className="mt-1.5 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CLASSES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            {cls !== '10th' && (
              <div>
                <Label className="text-sm">Stream</Label>
                <Select value={stream} onValueChange={setStream}>
                  <SelectTrigger className="mt-1.5 rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {STREAMS.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </div>

        {/* Subject Marks */}
        <div className="bg-card rounded-2xl p-4 card-shadow border border-border">
          <h3 className="font-semibold text-foreground mb-3">Enter Marks <span className="text-xs text-muted-foreground">(out of 100)</span></h3>
          <div className="space-y-3">
            {subjects.map((subject, i) => (
              <div key={subject} className="animate-fade-in" style={{ animationDelay: `${i * 0.05}s` }}>
                <Label className="text-sm font-medium">{subject}</Label>
                <div className="flex items-center gap-2 mt-1.5">
                  <Input
                    type="number"
                    min={0}
                    max={100}
                    placeholder="0 – 100"
                    value={marks[subject] || ''}
                    onChange={(e) => setMarks((prev) => ({ ...prev, [subject]: e.target.value }))}
                    className="rounded-xl flex-1"
                  />
                  <span className="text-sm text-muted-foreground w-10 text-right">/ 100</span>
                </div>
                {marks[subject] && (
                  <div className="mt-1">
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${Number(marks[subject]) >= 75 ? 'bg-edu-green' : Number(marks[subject]) >= 50 ? 'bg-edu-yellow' : 'bg-destructive'}`}
                        style={{ width: `${Math.min(100, Number(marks[subject]))}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <Button
          onClick={handleCalculate}
          disabled={loading}
          className="w-full h-12 rounded-xl gradient-primary border-0 text-base font-semibold"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : '📊 Calculate & View Results'}
        </Button>
      </div>
      <BottomNav />
    </PageWrapper>
  );
}
