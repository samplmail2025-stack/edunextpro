import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppHeader } from '@/components/layout/AppHeader';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { BottomNav } from '@/components/layout/BottomNav';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { COURSES } from '@/data/courses';
import { calculateCGPA, calculateClassification, cgpaToPercentage } from '@/lib/calculations';
import { useMarks } from '@/hooks/useMarks';
import { useToast } from '@/hooks/use-toast';
import { Plus, Trash2, Loader2 } from 'lucide-react';

const LEVELS = ['UG', 'PG', 'PhD'];

interface SemSubject {
  name: string;
  marks: number;
  maxMarks: number;
  credits: number;
}

interface Semester {
  semester: number;
  subjects: SemSubject[];
}

export default function CollegeMarks() {
  const navigate = useNavigate();
  const { saveMarks } = useMarks();
  const { toast } = useToast();

  const [level, setLevel] = useState('UG');
  const [course, setCourse] = useState('');
  const [semesters, setSemesters] = useState<Semester[]>([
  { semester: 1, subjects: [{ name: '', marks: 0, maxMarks: 100, credits: 3 }] }]
  );
  const [loading, setLoading] = useState(false);

  const courses = COURSES.filter((c) => c.level === level);

  const addSemester = () => {
    setSemesters((prev) => [
    ...prev,
    { semester: prev.length + 1, subjects: [{ name: '', marks: 0, maxMarks: 100, credits: 3 }] }]
    );
  };

  const addSubject = (semIdx: number) => {
    setSemesters((prev) => {
      const updated = [...prev];
      updated[semIdx].subjects.push({ name: '', marks: 0, maxMarks: 100, credits: 3 });
      return updated;
    });
  };

  const updateSubject = (semIdx: number, subIdx: number, field: keyof SemSubject, value: string | number) => {
    setSemesters((prev) => {
      const updated = JSON.parse(JSON.stringify(prev)) as Semester[];
      (updated[semIdx].subjects[subIdx] as unknown as Record<string, unknown>)[field] = value;
      return updated;
    });
  };

  const removeSubject = (semIdx: number, subIdx: number) => {
    setSemesters((prev) => {
      const updated = JSON.parse(JSON.stringify(prev)) as Semester[];
      updated[semIdx].subjects.splice(subIdx, 1);
      return updated;
    });
  };

  const handleCalculate = async () => {
    if (!course) {
      toast({ title: 'Select Course', description: 'Please select your course.', variant: 'destructive' });
      return;
    }
    const semData = semesters.map((sem) => ({
      semester: sem.semester,
      subjects: sem.subjects.filter((s) => s.name)
    }));
    const cgpa = calculateCGPA(semData);
    const percentage = cgpaToPercentage(cgpa);
    const classification = calculateClassification(percentage);

    setLoading(true);
    await saveMarks({
      student_type: 'college',
      level,
      course,
      cgpa,
      percentage,
      classification,
      semester_data: semData
    });
    setLoading(false);

    navigate('/results', { state: { studentType: 'college', level, course, cgpa, percentage, classification, semesters: semData } });
  };

  return (
    <PageWrapper>
      <AppHeader title="College Marks" subtitle="CGPA Calculator" showBack backPath="/student-type" gradient />
      <div className="p-4 space-y-4 max-w-lg mx-auto">
        {/* Level & Course */}
        <div className="bg-card rounded-2xl p-4 card-shadow border border-border">
          <h3 className="font-semibold text-foreground mb-3">Select Level & Course</h3>
          <div className="space-y-3">
            <div>
              <Label className="text-sm">Level</Label>
              <div className="flex gap-2 mt-1.5">
                {LEVELS.map((l) =>
                <button
                  key={l}
                  onClick={() => {setLevel(l);setCourse('');}}
                  className={`flex-1 py-2 rounded-xl text-sm font-semibold border transition-all ${level === l ? 'gradient-purple text-white border-transparent' : 'border-border text-foreground'}`}>

                    {l}
                  </button>
                )}
              </div>
            </div>
            <div>
              <Label className="text-sm">Course</Label>
              <Select value={course} onValueChange={setCourse}>
                <SelectTrigger className="mt-1.5 rounded-xl">
                  <SelectValue placeholder="Select your course" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map((c) => <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Semesters */}
        {semesters.map((sem, semIdx) =>
        <div key={sem.semester} className="bg-card rounded-2xl p-4 card-shadow border border-border animate-fade-in">
            <h3 className="font-semibold text-foreground mb-3 flex items-center justify-between">
              <span>Semester {sem.semester}</span>
              <span className="text-xs bg-edu-purple-light text-edu-purple px-2 py-0.5 rounded-full">{sem.subjects.length} Subjects</span>
            </h3>
            <div className="space-y-3">
              {sem.subjects.map((sub, subIdx) =>
            <div key={subIdx} className="bg-muted/50 rounded-xl p-3">
                  <div className="grid grid-cols-3 gap-2 mb-2">
                    <div className="col-span-3">
                      <Input
                    placeholder="Subject name"
                    value={sub.name}
                    onChange={(e) => updateSubject(semIdx, subIdx, 'name', e.target.value)}
                    className="rounded-lg text-sm" />

                    </div>
                    <div>
                      <Input
                    type="number"
                    placeholder="Marks"
                    min={0}
                    max={100}
                    value={sub.marks || ''}
                    onChange={(e) => updateSubject(semIdx, subIdx, 'marks', Number(e.target.value))}
                    className="rounded-lg text-sm" />

                      <p className="text-xs text-muted-foreground mt-0.5 text-center">Marks</p>
                    </div>
                    <div>
                      <Input
                    type="number"
                    placeholder="Max"
                    min={1}
                    value={sub.maxMarks}
                    onChange={(e) => updateSubject(semIdx, subIdx, 'maxMarks', Number(e.target.value))}
                    className="rounded-lg text-sm" />

                      <p className="text-xs text-muted-foreground mt-0.5 text-center">Max</p>
                    </div>
                    











                  </div>
                  {sem.subjects.length > 1 &&
              <button onClick={() => removeSubject(semIdx, subIdx)} className="text-destructive text-xs flex items-center gap-1 mt-1">
                      <Trash2 className="w-3 h-3" /> Remove
                    </button>
              }
                </div>
            )}
              <Button variant="outline" size="sm" onClick={() => addSubject(semIdx)} className="w-full rounded-xl text-xs gap-1">
                <Plus className="w-3 h-3" /> Add Subject
              </Button>
            </div>
          </div>
        )}

        <Button variant="outline" onClick={addSemester} className="w-full rounded-xl gap-2 border-dashed">
          <Plus className="w-4 h-4" /> Add Semester {semesters.length + 1}
        </Button>

        <Button
          onClick={handleCalculate}
          disabled={loading}
          className="w-full h-12 rounded-xl gradient-primary border-0 text-base font-semibold">

          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : '📊 Calculate CGPA & View Results'}
        </Button>
      </div>
      <BottomNav />
    </PageWrapper>);

}