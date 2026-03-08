import { useLocation, useNavigate } from 'react-router-dom';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { BottomNav } from '@/components/layout/BottomNav';
import { AppHeader } from '@/components/layout/AppHeader';
import { CircularProgress } from '@/components/charts/CircularProgress';
import { GradeBarChart } from '@/components/charts/GradeBarChart';
import { Button } from '@/components/ui/button';
import { Trophy, Star, TrendingUp, BookOpen, Loader2, Download } from 'lucide-react';
import { useMarks } from '@/hooks/useMarks';
import { useAuth } from '@/hooks/useAuth';
import resultsHeroImg from '@/assets/results-celebration.jpg';

interface SemSubject { name: string; marks: number; maxMarks: number; credits?: number }
interface SemesterData { semester: number; subjects: SemSubject[] }

interface LocationState {
  studentType: 'school' | 'college';
  class?: string;
  stream?: string;
  level?: string;
  course?: string;
  subjects?: SemSubject[];
  percentage: number;
  grade?: string;
  classification: string;
  cgpa?: number;
  semesters?: SemesterData[];
}

function flattenSemesters(semesters?: SemesterData[]): SemSubject[] {
  if (!semesters) return [];
  return semesters.flatMap(sem => sem.subjects.filter(s => s.name));
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
  const { state } = useLocation() as { state: LocationState | null };
  const { latestMarks, loading } = useMarks();
  const { profile } = useAuth();

  // Build data from navigation state OR from saved marks
  const source = state || (latestMarks ? buildStateFromMarks(latestMarks) : null);

  const handleDownloadPDF = () => {
    if (!source) return;
    const { studentType, class: cls, stream, level, course, subjects: rawSubjects, percentage, grade, classification, cgpa, semesters } = source;
    const subjects = rawSubjects && rawSubjects.length > 0 ? rawSubjects : flattenSemesters(semesters);
    const studentName = profile?.full_name || 'Student';
    const district = profile?.district || '';
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });

    const subjectRows = subjects?.map((s, i) => `
      <tr>
        <td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;color:#374151;font-size:13px;">${i + 1}</td>
        <td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;color:#1f2937;font-weight:500;font-size:13px;">${s.name}</td>
        <td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;text-align:center;color:#374151;font-size:13px;">${s.maxMarks}</td>
        <td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;text-align:center;font-weight:600;color:#1f2937;font-size:13px;">${s.marks}</td>
        <td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;text-align:center;font-size:13px;color:${(s.marks / s.maxMarks) * 100 >= 75 ? '#16a34a' : (s.marks / s.maxMarks) * 100 >= 50 ? '#2563eb' : '#dc2626'};font-weight:600;">${((s.marks / s.maxMarks) * 100).toFixed(1)}%</td>
      </tr>
    `).join('') || '';

    const totalMarks = subjects?.reduce((a, s) => a + s.marks, 0) || 0;
    const totalMax = subjects?.reduce((a, s) => a + s.maxMarks, 0) || 0;

    const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>EduNext - Academic Report</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
  * { margin:0; padding:0; box-sizing:border-box; }
  body { font-family:'Inter',system-ui,sans-serif; background:#f8fafc; color:#1f2937; }
  .page { max-width:680px; margin:20px auto; background:#fff; border-radius:16px; overflow:hidden; box-shadow:0 4px 24px rgba(0,0,0,0.08); }
  .header { background:linear-gradient(135deg,#4f46e5,#7c3aed,#6366f1); padding:32px 36px; color:#fff; position:relative; overflow:hidden; }
  .header::after { content:''; position:absolute; top:-40px; right:-40px; width:160px; height:160px; background:rgba(255,255,255,0.08); border-radius:50%; }
  .header::before { content:''; position:absolute; bottom:-30px; left:-20px; width:120px; height:120px; background:rgba(255,255,255,0.05); border-radius:50%; }
  .logo-row { display:flex; align-items:center; gap:12px; margin-bottom:20px; position:relative; z-index:1; }
  .logo-text { font-size:22px; font-weight:800; letter-spacing:-0.5px; }
  .logo-sub { font-size:11px; opacity:0.85; letter-spacing:1px; text-transform:uppercase; margin-top:2px; }
  .title-section { position:relative; z-index:1; }
  .title-section h1 { font-size:20px; font-weight:700; margin-bottom:4px; }
  .title-section p { font-size:12px; opacity:0.85; }
  .info-bar { display:flex; gap:16px; flex-wrap:wrap; padding:20px 36px; background:#f1f5f9; border-bottom:1px solid #e2e8f0; }
  .info-item { display:flex; flex-direction:column; gap:2px; }
  .info-label { font-size:10px; text-transform:uppercase; letter-spacing:0.8px; color:#64748b; font-weight:600; }
  .info-value { font-size:13px; font-weight:600; color:#1e293b; }
  .score-section { display:flex; align-items:center; justify-content:center; gap:32px; padding:28px 36px; border-bottom:1px solid #e2e8f0; }
  .score-circle { width:110px; height:110px; border-radius:50%; background:conic-gradient(#4f46e5 ${percentage * 3.6}deg, #e2e8f0 0deg); display:flex; align-items:center; justify-content:center; position:relative; }
  .score-inner { width:88px; height:88px; border-radius:50%; background:#fff; display:flex; flex-direction:column; align-items:center; justify-content:center; box-shadow:inset 0 2px 8px rgba(0,0,0,0.06); }
  .score-pct { font-size:24px; font-weight:800; color:#4f46e5; line-height:1; }
  .score-lbl { font-size:9px; color:#64748b; text-transform:uppercase; letter-spacing:1px; margin-top:3px; }
  .score-stats { display:flex; flex-direction:column; gap:12px; }
  .stat-row { display:flex; align-items:center; gap:10px; }
  .stat-badge { padding:6px 16px; border-radius:20px; font-size:12px; font-weight:600; }
  .badge-green { background:#f0fdf4; color:#16a34a; border:1px solid #bbf7d0; }
  .badge-blue { background:#eff6ff; color:#2563eb; border:1px solid #bfdbfe; }
  .badge-purple { background:#faf5ff; color:#7c3aed; border:1px solid #e9d5ff; }
  .table-section { padding:24px 36px 32px; }
  .table-section h3 { font-size:15px; font-weight:700; margin-bottom:16px; color:#1e293b; display:flex; align-items:center; gap:8px; }
  table { width:100%; border-collapse:collapse; border-radius:12px; overflow:hidden; border:1px solid #e5e7eb; }
  thead { background:#f8fafc; }
  th { padding:12px 14px; text-align:left; font-size:11px; text-transform:uppercase; letter-spacing:0.6px; color:#64748b; font-weight:600; border-bottom:2px solid #e5e7eb; }
  th:nth-child(3),th:nth-child(4),th:nth-child(5) { text-align:center; }
  .total-row td { background:#f1f5f9; font-weight:700; color:#1e293b; border-top:2px solid #e5e7eb; }
  .footer { padding:20px 36px; background:#f8fafc; border-top:1px solid #e2e8f0; display:flex; justify-content:space-between; align-items:center; }
  .footer-left { font-size:10px; color:#94a3b8; }
  .footer-right { font-size:10px; color:#94a3b8; font-weight:500; }
  .watermark { text-align:center; padding:8px; font-size:9px; color:#cbd5e1; letter-spacing:2px; text-transform:uppercase; }
  @media print { body { background:#fff; } .page { box-shadow:none; margin:0; border-radius:0; } }
</style></head><body>
<div class="page">
  <div class="header">
    <div class="logo-row">
      <div>
        <div class="logo-text">📚 EduNext</div>
        <div class="logo-sub">Know Your Marks · Choose Your Path · Build Your Future</div>
      </div>
    </div>
    <div class="title-section">
      <h1>Academic Performance Report</h1>
      <p>Generated on ${dateStr}</p>
    </div>
  </div>
  <div class="info-bar">
    <div class="info-item"><span class="info-label">Student Name</span><span class="info-value">${studentName}</span></div>
    ${district ? `<div class="info-item"><span class="info-label">District</span><span class="info-value">${district}</span></div>` : ''}
    <div class="info-item"><span class="info-label">Category</span><span class="info-value">${studentType === 'school' ? 'School' : 'College'}</span></div>
    ${cls ? `<div class="info-item"><span class="info-label">Class</span><span class="info-value">${cls}</span></div>` : ''}
    ${stream ? `<div class="info-item"><span class="info-label">Stream</span><span class="info-value">${stream}</span></div>` : ''}
    ${level ? `<div class="info-item"><span class="info-label">Level</span><span class="info-value">${level}</span></div>` : ''}
    ${course ? `<div class="info-item"><span class="info-label">Department / Course</span><span class="info-value">${course}</span></div>` : ''}
  </div>
  <div class="score-section">
    <div class="score-circle"><div class="score-inner"><span class="score-pct">${percentage.toFixed(1)}%</span><span class="score-lbl">Overall</span></div></div>
    <div class="score-stats">
      <div class="stat-row"><span class="stat-badge badge-green">🏆 ${classification}</span></div>
      ${cgpa ? `<div class="stat-row"><span class="stat-badge badge-blue">📊 CGPA: ${cgpa.toFixed(2)}</span></div>` : ''}
      ${grade && grade !== '-' ? `<div class="stat-row"><span class="stat-badge badge-purple">🎯 Grade: ${grade}</span></div>` : ''}
    </div>
  </div>
   ${semesters && semesters.length > 0 ? semesters.map((sem, si) => {
     const semSubRows = sem.subjects.filter(s => s.name).map((s, i) => `
       <tr>
         <td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;color:#374151;font-size:13px;">${i + 1}</td>
         <td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;color:#1f2937;font-weight:500;font-size:13px;">${s.name}</td>
         <td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;text-align:center;color:#374151;font-size:13px;">${s.maxMarks}</td>
         <td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;text-align:center;font-weight:600;color:#1f2937;font-size:13px;">${s.marks}</td>
         <td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;text-align:center;font-size:13px;color:${(s.marks / s.maxMarks) * 100 >= 75 ? '#16a34a' : (s.marks / s.maxMarks) * 100 >= 50 ? '#2563eb' : '#dc2626'};font-weight:600;">${((s.marks / s.maxMarks) * 100).toFixed(1)}%</td>
       </tr>
     `).join('');
     const semTotal = sem.subjects.filter(s => s.name).reduce((a, s) => a + s.marks, 0);
     const semMax = sem.subjects.filter(s => s.name).reduce((a, s) => a + s.maxMarks, 0);
     return `
     <div class="table-section" style="padding-top:${si > 0 ? '8px' : '24px'};">
       <h3>📋 Semester ${sem.semester} — Subject-wise Marks</h3>
       <table>
         <thead><tr><th>#</th><th>Subject</th><th>Max</th><th>Obtained</th><th>%</th></tr></thead>
         <tbody>
           ${semSubRows}
           <tr class="total-row">
             <td style="padding:12px 14px;"></td>
             <td style="padding:12px 14px;font-size:13px;">Semester Total</td>
             <td style="padding:12px 14px;text-align:center;font-size:13px;">${semMax}</td>
             <td style="padding:12px 14px;text-align:center;font-size:13px;">${semTotal}</td>
             <td style="padding:12px 14px;text-align:center;font-size:13px;color:#4f46e5;">${semMax > 0 ? ((semTotal / semMax) * 100).toFixed(1) : 0}%</td>
           </tr>
         </tbody>
       </table>
     </div>`;
   }).join('') : subjects && subjects.length > 0 ? `
   <div class="table-section">
     <h3>📋 Subject-wise Marks Breakdown</h3>
     <table>
       <thead><tr><th>#</th><th>Subject</th><th>Max</th><th>Obtained</th><th>%</th></tr></thead>
       <tbody>
         ${subjectRows}
         <tr class="total-row">
           <td style="padding:12px 14px;"></td>
           <td style="padding:12px 14px;font-size:13px;">Total</td>
           <td style="padding:12px 14px;text-align:center;font-size:13px;">${totalMax}</td>
           <td style="padding:12px 14px;text-align:center;font-size:13px;">${totalMarks}</td>
           <td style="padding:12px 14px;text-align:center;font-size:13px;color:#4f46e5;">${percentage.toFixed(1)}%</td>
         </tr>
       </tbody>
     </table>
   </div>` : ''}
  <div class="footer">
    <div class="footer-left">This report is auto-generated by EduNext. For academic reference only.</div>
    <div class="footer-right">© ${now.getFullYear()} EduNext</div>
  </div>
  <div class="watermark">Calculated & Processed by EduNext</div>
</div>
</body></html>`;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(html);
      printWindow.document.close();
      setTimeout(() => printWindow.print(), 600);
    }
  };

  if (loading && !source) {
    return (
      <PageWrapper>
        <AppHeader title="Your Results" subtitle="Academic Performance" showBack gradient />
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
        <BottomNav />
      </PageWrapper>
    );
  }

  if (!source) {
    navigate('/student-type');
    return null;
  }

  const { studentType, class: cls, stream, level, course, subjects: rawSubjects, percentage, grade, classification, cgpa, semesters } = source;
  const subjects = rawSubjects && rawSubjects.length > 0 ? rawSubjects : flattenSemesters(semesters);
  const gradientClass = classificationColor[classification] || 'gradient-primary';

  return (
    <PageWrapper>
      <AppHeader title="Your Results" subtitle="Academic Performance" showBack gradient />
      <div className="p-4 space-y-4 max-w-lg mx-auto">
        {/* Hero image banner */}
        <div className="relative rounded-2xl overflow-hidden h-36 card-shadow">
          <img src={resultsHeroImg} alt="Students celebrating results" loading="lazy" className="w-full h-full object-cover" />
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
          {grade && grade !== '-' && <p className="text-white/80 text-sm mt-1">Grade: {grade}</p>}
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
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={handleDownloadPDF}
            className="h-14 rounded-2xl bg-edu-green hover:bg-edu-green/90 border-0 flex flex-col gap-0.5"
          >
            <Download className="w-5 h-5" />
            <span className="text-xs font-semibold">Download PDF</span>
          </Button>
          <Button
            onClick={() => navigate('/recommendations', { state: { studentType, percentage, cgpa, stream, level, course, classification } })}
            className="h-14 rounded-2xl gradient-primary border-0 flex flex-col gap-0.5"
          >
            <span className="text-lg">🎯</span>
            <span className="text-xs font-semibold">Get Recommendations</span>
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-3 pb-4">
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

// Helper to build LocationState from saved marks data
function buildStateFromMarks(marks: { student_type?: string; class?: string; stream?: string; level?: string; course?: string; subjects?: unknown; percentage?: number; grade?: string; classification?: string; cgpa?: number; semester_data?: unknown }): LocationState {
  const subjects = marks.subjects
    ? (Array.isArray(marks.subjects)
        ? marks.subjects as SemSubject[]
        : Object.entries(marks.subjects as Record<string, number>).map(([name, m]) => ({
            name, marks: m as number, maxMarks: 100
          })))
    : undefined;

  const semesters = marks.semester_data
    ? (Array.isArray(marks.semester_data) ? marks.semester_data as SemesterData[] : undefined)
    : undefined;

  return {
    studentType: (marks.student_type as 'school' | 'college') || 'school',
    class: marks.class as string | undefined,
    stream: marks.stream as string | undefined,
    level: marks.level as string | undefined,
    course: marks.course as string | undefined,
    subjects,
    percentage: (marks.percentage as number) || 0,
    grade: marks.grade as string | undefined,
    classification: (marks.classification as string) || '-',
    cgpa: marks.cgpa as number | undefined,
    semesters,
  };
}
