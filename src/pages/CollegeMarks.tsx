import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
import { Plus, Trash2, Loader2, GraduationCap, BookOpen, Sparkles, Calculator, ChevronRight } from 'lucide-react';

const LEVELS = ['UG', 'PG', 'PhD'];

const LEVEL_ICONS: Record<string, string> = { UG: '🎓', PG: '📚', PhD: '🔬' };
const LEVEL_DESCRIPTIONS: Record<string, string> = {
  UG: 'Undergraduate',
  PG: 'Postgraduate',
  PhD: 'Doctorate',
};

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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } },
};

export default function CollegeMarks() {
  const navigate = useNavigate();
  const { saveMarks } = useMarks();
  const { toast } = useToast();

  const [level, setLevel] = useState('UG');
  const [course, setCourse] = useState('');
  const [semesters, setSemesters] = useState<Semester[]>([
    { semester: 1, subjects: [{ name: '', marks: 0, maxMarks: 100, credits: 3 }] },
  ]);
  const [loading, setLoading] = useState(false);

  const courses = COURSES.filter((c) => c.level === level);

  const totalSubjects = semesters.reduce((acc, s) => acc + s.subjects.length, 0);

  const addSemester = () => {
    setSemesters((prev) => [
      ...prev,
      { semester: prev.length + 1, subjects: [{ name: '', marks: 0, maxMarks: 100, credits: 3 }] },
    ]);
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
      subjects: sem.subjects.filter((s) => s.name),
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
      semester_data: semData,
    });
    setLoading(false);

    navigate('/results', { state: { studentType: 'college', level, course, cgpa, percentage, classification, semesters: semData } });
  };

  return (
    <PageWrapper>
      <AppHeader title="College Marks" subtitle="CGPA Calculator" showBack backPath="/student-type" gradient />

      <motion.div
        className="p-4 space-y-5 max-w-lg mx-auto pb-28"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Stats Bar */}
        <motion.div variants={itemVariants} className="flex gap-3">
          <div className="flex-1 bg-card rounded-2xl p-3 card-shadow border border-border flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-purple flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Semesters</p>
              <p className="text-lg font-bold text-foreground">{semesters.length}</p>
            </div>
          </div>
          <div className="flex-1 bg-card rounded-2xl p-3 card-shadow border border-border flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-blue flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Subjects</p>
              <p className="text-lg font-bold text-foreground">{totalSubjects}</p>
            </div>
          </div>
        </motion.div>

        {/* Level & Course Card */}
        <motion.div variants={itemVariants} className="bg-card rounded-2xl overflow-hidden card-shadow border border-border">
          {/* Card Header */}
          <div className="gradient-primary p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Select Level & Course</h3>
              <p className="text-white/70 text-xs">Choose your academic program</p>
            </div>
          </div>

          <div className="p-4 space-y-4">
            {/* Level Selection */}
            <div>
              <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Level</Label>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {LEVELS.map((l) => (
                  <motion.button
                    key={l}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => { setLevel(l); setCourse(''); }}
                    className={`relative py-3 rounded-xl text-sm font-bold border-2 transition-all duration-300 overflow-hidden ${
                      level === l
                        ? 'gradient-purple text-white border-transparent shadow-lg'
                        : 'border-border text-foreground hover:border-primary/30 hover:bg-primary/5'
                    }`}
                  >
                    <span className="text-lg block">{LEVEL_ICONS[l]}</span>
                    <span className="block mt-0.5">{l}</span>
                    <span className="block text-[10px] opacity-70 font-medium">{LEVEL_DESCRIPTIONS[l]}</span>
                    {level === l && (
                      <motion.div
                        layoutId="levelIndicator"
                        className="absolute inset-0 rounded-xl border-2 border-white/30"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Course Dropdown */}
            <div>
              <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Course</Label>
              <Select value={course} onValueChange={setCourse}>
                <SelectTrigger className="mt-2 rounded-xl h-12 border-2 border-border hover:border-primary/40 transition-colors">
                  <SelectValue placeholder="Select your course" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map((c) => (
                    <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </motion.div>

        {/* Semester Cards */}
        <AnimatePresence mode="popLayout">
          {semesters.map((sem, semIdx) => (
            <motion.div
              key={sem.semester}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              layout
              className="bg-card rounded-2xl overflow-hidden card-shadow border border-border"
            >
              {/* Semester Header */}
              <div className="px-4 py-3 bg-gradient-to-r from-primary/10 via-accent/10 to-transparent border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg gradient-blue flex items-center justify-center text-white text-sm font-bold">
                    {sem.semester}
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-sm">Semester {sem.semester}</h3>
                    <p className="text-[10px] text-muted-foreground">Enter subject details</p>
                  </div>
                </div>
                <motion.span
                  key={sem.subjects.length}
                  initial={{ scale: 1.3 }}
                  animate={{ scale: 1 }}
                  className="text-xs font-bold bg-primary/10 text-primary px-3 py-1 rounded-full"
                >
                  {sem.subjects.length} {sem.subjects.length === 1 ? 'Subject' : 'Subjects'}
                </motion.span>
              </div>

              <div className="p-4 space-y-3">
                <AnimatePresence mode="popLayout">
                  {sem.subjects.map((sub, subIdx) => (
                    <motion.div
                      key={subIdx}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      layout
                      className="bg-muted/30 rounded-2xl p-4 border border-border/40 hover:border-primary/20 transition-all"
                    >
                      {/* Row 1: Badge + Subject Name + Delete */}
                      <div className="flex items-center gap-3 mb-3">
                        <span className="w-7 h-7 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0 border border-primary/20">
                          {subIdx + 1}
                        </span>
                        <div className="flex-1">
                          <Input
                            placeholder="Subject name"
                            value={sub.name}
                            onChange={(e) => updateSubject(semIdx, subIdx, 'name', e.target.value)}
                            className="rounded-full text-sm h-10 bg-background border border-border/60 px-4 font-medium text-foreground placeholder:text-muted-foreground/50 focus:border-primary/40"
                          />
                        </div>
                        {sem.subjects.length > 1 && (
                          <motion.button
                            whileTap={{ scale: 0.85 }}
                            onClick={() => removeSubject(semIdx, subIdx)}
                            className="w-7 h-7 rounded-full bg-destructive/10 text-destructive flex items-center justify-center hover:bg-destructive/20 transition-colors shrink-0"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </motion.button>
                        )}
                      </div>

                      {/* Row 2: Marks & Max — evenly aligned */}
                      <div className="grid grid-cols-2 gap-3 ml-10">
                        <div className="relative">
                          <Input
                            type="number"
                            placeholder="0"
                            min={0}
                            max={sub.maxMarks}
                            value={sub.marks || ''}
                            onChange={(e) => updateSubject(semIdx, subIdx, 'marks', Number(e.target.value))}
                            className="rounded-full text-sm h-10 pl-4 pr-16 bg-background border border-border/60 focus:border-primary/40 font-medium"
                          />
                          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-muted-foreground pointer-events-none">
                            Marks
                          </span>
                        </div>
                        <div className="relative">
                          <Input
                            type="number"
                            placeholder="100"
                            min={1}
                            value={sub.maxMarks}
                            onChange={(e) => updateSubject(semIdx, subIdx, 'maxMarks', Number(e.target.value))}
                            className="rounded-full text-sm h-10 pl-4 pr-12 bg-background border border-border/60 focus:border-primary/40 font-medium"
                          />
                          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-muted-foreground pointer-events-none">
                            Max
                          </span>
                        </div>
                      </div>

                      {/* Mini Progress */}
                      {sub.marks > 0 && sub.maxMarks > 0 && (
                        <div className="ml-10 mt-2.5">
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="h-1.5 rounded-full bg-border/60 overflow-hidden"
                          >
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${Math.min(100, (sub.marks / sub.maxMarks) * 100)}%` }}
                              transition={{ duration: 0.5, ease: 'easeOut' }}
                              className={`h-full rounded-full ${
                                (sub.marks / sub.maxMarks) >= 0.75
                                  ? 'gradient-green'
                                  : (sub.marks / sub.maxMarks) >= 0.5
                                  ? 'gradient-yellow'
                                  : 'gradient-orange'
                              }`}

                <motion.div whileTap={{ scale: 0.97 }}>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addSubject(semIdx)}
                    className="w-full rounded-xl text-xs gap-1.5 h-10 border-dashed border-2 border-primary/20 text-primary hover:bg-primary/5 hover:border-primary/40 transition-all"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Subject
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Add Semester Button */}
        <motion.div variants={itemVariants} whileTap={{ scale: 0.97 }}>
          <Button
            variant="outline"
            onClick={addSemester}
            className="w-full h-12 rounded-2xl gap-2.5 border-dashed border-2 border-accent/30 text-accent hover:bg-accent/5 hover:border-accent/50 transition-all font-semibold"
          >
            <div className="w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center">
              <Plus className="w-4 h-4" />
            </div>
            Add Semester {semesters.length + 1}
          </Button>
        </motion.div>

        {/* Calculate Button */}
        <motion.div variants={itemVariants}>
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleCalculate}
            disabled={loading}
            className="relative w-full h-14 rounded-2xl overflow-hidden text-white font-bold text-base disabled:opacity-60 group"
          >
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] animate-[shimmer_3s_ease-in-out_infinite] group-hover:bg-[length:300%_100%]" />
            {/* Glow effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-white/10 to-transparent" />
            <div className="relative flex items-center justify-center gap-2.5">
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Calculator className="w-5 h-5" />
                  <span>Calculate CGPA & View Results</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </div>
          </motion.button>
        </motion.div>
      </motion.div>
      <BottomNav />
    </PageWrapper>
  );
}
