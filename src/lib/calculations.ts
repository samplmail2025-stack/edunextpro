export interface Subject {
  name: string;
  marks: number;
  maxMarks: number;
  credits?: number;
}

export interface SemesterData {
  semester: number;
  subjects: Subject[];
  sgpa?: number;
}

export function calculatePercentage(subjects: Subject[]): number {
  const total = subjects.reduce((sum, s) => sum + s.marks, 0);
  const maxTotal = subjects.reduce((sum, s) => sum + s.maxMarks, 0);
  return maxTotal > 0 ? parseFloat(((total / maxTotal) * 100).toFixed(2)) : 0;
}

export function calculateGrade(percentage: number): string {
  if (percentage >= 90) return 'O';
  if (percentage >= 80) return 'A+';
  if (percentage >= 70) return 'A';
  if (percentage >= 60) return 'B+';
  if (percentage >= 50) return 'B';
  if (percentage >= 40) return 'C';
  return 'F';
}

export function calculateClassification(percentage: number): string {
  if (percentage >= 75) return 'Distinction';
  if (percentage >= 60) return 'First Class';
  if (percentage >= 50) return 'Second Class';
  if (percentage >= 40) return 'Third Class';
  return 'Fail';
}

export function calculateSGPA(subjects: Subject[]): number {
  const totalCredits = subjects.reduce((sum, s) => sum + (s.credits || 0), 0);
  if (totalCredits === 0) return 0;
  const gradePoints = subjects.reduce((sum, s) => {
    const pct = (s.marks / s.maxMarks) * 100;
    const gp = getGradePoint(pct);
    return sum + gp * (s.credits || 0);
  }, 0);
  return parseFloat((gradePoints / totalCredits).toFixed(2));
}

export function calculateCGPA(semesters: SemesterData[]): number {
  const sgpas = semesters.map((sem) => calculateSGPA(sem.subjects));
  const valid = sgpas.filter((s) => s > 0);
  if (valid.length === 0) return 0;
  return parseFloat((valid.reduce((a, b) => a + b, 0) / valid.length).toFixed(2));
}

export function cgpaToPercentage(cgpa: number): number {
  return parseFloat((cgpa * 9.5).toFixed(2));
}

function getGradePoint(percentage: number): number {
  if (percentage >= 90) return 10;
  if (percentage >= 80) return 9;
  if (percentage >= 70) return 8;
  if (percentage >= 60) return 7;
  if (percentage >= 50) return 6;
  if (percentage >= 40) return 5;
  return 0;
}

export function getClassificationFromCGPA(cgpa: number): string {
  if (cgpa >= 9.0) return 'Outstanding';
  if (cgpa >= 8.0) return 'Distinction';
  if (cgpa >= 7.0) return 'First Class';
  if (cgpa >= 6.0) return 'Second Class';
  if (cgpa >= 5.0) return 'Pass Class';
  return 'Fail';
}

export function getSchoolSubjects(stream: string, cls: string): string[] {
  const common = ['Tamil / Language', 'English'];
  if (cls === '10th') {
    return [...common, 'Mathematics', 'Science', 'Social Science'];
  }
  if (stream === 'Science (Maths)') {
    return [...common, 'Mathematics', 'Physics', 'Chemistry'];
  }
  if (stream === 'Science (Biology)') {
    return [...common, 'Biology', 'Physics', 'Chemistry'];
  }
  if (stream === 'Science (Computer Science)') {
    return [...common, 'Computer Science', 'Physics', 'Chemistry'];
  }
  if (stream === 'Commerce') {
    return [...common, 'Accountancy', 'Commerce', 'Economics'];
  }
  if (stream === 'Commerce (Computer Applications)') {
    return [...common, 'Accountancy', 'Commerce', 'Computer Applications'];
  }
  if (stream === 'Arts (History)') {
    return [...common, 'History', 'Economics', 'Political Science'];
  }
  if (stream === 'Arts (Political Science)') {
    return [...common, 'Political Science', 'Economics', 'History'];
  }
  if (stream === 'Arts (Economics)') {
    return [...common, 'Economics', 'Commerce', 'Political Science'];
  }
  if (stream === 'Vocational') {
    return [...common, 'Vocational Theory', 'Vocational Practical', 'Allied Subject'];
  }
  return [...common, 'History', 'Geography', 'Political Science'];
}
