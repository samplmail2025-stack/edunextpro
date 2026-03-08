interface Subject { name: string; marks: number; maxMarks: number; credits?: number }
interface SemesterData { semester: number; subjects: Subject[] }

interface PDFData {
  studentName: string;
  district: string;
  studentType: 'school' | 'college';
  class?: string;
  stream?: string;
  level?: string;
  course?: string;
  subjects?: Subject[];
  semesters?: SemesterData[];
  percentage: number;
  grade?: string;
  classification: string;
  cgpa?: number;
}

function subjectRow(i: number, s: Subject) {
  const pct = s.maxMarks > 0 ? (s.marks / s.maxMarks) * 100 : 0;
  const color = pct >= 75 ? '#16a34a' : pct >= 50 ? '#2563eb' : '#dc2626';
  return `<tr>
    <td style="padding:10px 16px;border-bottom:1px solid #e5e7eb;color:#64748b;font-size:12px;text-align:center;">${i + 1}</td>
    <td style="padding:10px 16px;border-bottom:1px solid #e5e7eb;color:#1e293b;font-weight:500;font-size:13px;">${s.name}</td>
    <td style="padding:10px 16px;border-bottom:1px solid #e5e7eb;text-align:center;color:#64748b;font-size:13px;">${s.maxMarks}</td>
    <td style="padding:10px 16px;border-bottom:1px solid #e5e7eb;text-align:center;font-weight:700;color:#1e293b;font-size:13px;">${s.marks}</td>
    <td style="padding:10px 16px;border-bottom:1px solid #e5e7eb;text-align:center;">
      <span style="background:${pct >= 75 ? '#f0fdf4' : pct >= 50 ? '#eff6ff' : '#fef2f2'};color:${color};padding:3px 10px;border-radius:12px;font-size:11px;font-weight:700;">${pct.toFixed(1)}%</span>
    </td>
  </tr>`;
}

function totalRow(label: string, totalMarks: number, totalMax: number, pct: number) {
  return `<tr style="background:#f1f5f9;">
    <td style="padding:12px 16px;border-top:2px solid #e2e8f0;"></td>
    <td style="padding:12px 16px;border-top:2px solid #e2e8f0;font-weight:800;color:#1e293b;font-size:13px;">${label}</td>
    <td style="padding:12px 16px;border-top:2px solid #e2e8f0;text-align:center;font-weight:700;color:#64748b;font-size:13px;">${totalMax}</td>
    <td style="padding:12px 16px;border-top:2px solid #e2e8f0;text-align:center;font-weight:800;color:#1e293b;font-size:13px;">${totalMarks}</td>
    <td style="padding:12px 16px;border-top:2px solid #e2e8f0;text-align:center;">
      <span style="background:#4f46e5;color:#fff;padding:3px 12px;border-radius:12px;font-size:11px;font-weight:700;">${pct.toFixed(1)}%</span>
    </td>
  </tr>`;
}

function makeTable(heading: string, subjects: Subject[]) {
  const filtered = subjects.filter(s => s.name);
  if (filtered.length === 0) return '';
  const rows = filtered.map((s, i) => subjectRow(i, s)).join('');
  const tm = filtered.reduce((a, s) => a + s.marks, 0);
  const tx = filtered.reduce((a, s) => a + s.maxMarks, 0);
  return `
  <div style="padding:20px 36px 8px;">
    <h3 style="font-size:14px;font-weight:700;color:#1e293b;margin-bottom:12px;display:flex;align-items:center;gap:8px;">
      <span style="background:#eff6ff;width:28px;height:28px;border-radius:8px;display:inline-flex;align-items:center;justify-content:center;font-size:14px;">📋</span>
      ${heading}
    </h3>
    <table style="width:100%;border-collapse:collapse;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">
      <thead style="background:linear-gradient(135deg,#f8fafc,#f1f5f9);">
        <tr>
          <th style="padding:12px 16px;text-align:center;font-size:10px;text-transform:uppercase;letter-spacing:0.8px;color:#64748b;font-weight:700;border-bottom:2px solid #e5e7eb;width:40px;">#</th>
          <th style="padding:12px 16px;text-align:left;font-size:10px;text-transform:uppercase;letter-spacing:0.8px;color:#64748b;font-weight:700;border-bottom:2px solid #e5e7eb;">Subject</th>
          <th style="padding:12px 16px;text-align:center;font-size:10px;text-transform:uppercase;letter-spacing:0.8px;color:#64748b;font-weight:700;border-bottom:2px solid #e5e7eb;">Max</th>
          <th style="padding:12px 16px;text-align:center;font-size:10px;text-transform:uppercase;letter-spacing:0.8px;color:#64748b;font-weight:700;border-bottom:2px solid #e5e7eb;">Scored</th>
          <th style="padding:12px 16px;text-align:center;font-size:10px;text-transform:uppercase;letter-spacing:0.8px;color:#64748b;font-weight:700;border-bottom:2px solid #e5e7eb;">%</th>
        </tr>
      </thead>
      <tbody>${rows}${totalRow('Total', tm, tx, tx > 0 ? (tm / tx) * 100 : 0)}</tbody>
    </table>
  </div>`;
}

function infoChip(label: string, value: string) {
  return `<div style="display:flex;flex-direction:column;gap:3px;min-width:80px;">
    <span style="font-size:9px;text-transform:uppercase;letter-spacing:1px;color:#94a3b8;font-weight:700;">${label}</span>
    <span style="font-size:13px;font-weight:700;color:#1e293b;">${value}</span>
  </div>`;
}

export function generateResultsPDF(data: PDFData) {
  const { studentName, district, studentType, class: cls, stream, level, course, subjects, semesters, percentage, grade, classification, cgpa } = data;
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });
  const timeStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

  // Build info chips
  const chips = [
    infoChip('Student Name', studentName),
    district ? infoChip('District', district) : '',
    infoChip('Category', studentType === 'school' ? 'School Student' : 'College Student'),
    cls ? infoChip('Class', cls) : '',
    stream ? infoChip('Stream', stream) : '',
    level ? infoChip('Level', level) : '',
    course ? infoChip('Department', course) : '',
  ].filter(Boolean).join('');

  // Build semester tables or flat subject table
  let marksSection = '';
  if (semesters && semesters.length > 0) {
    // Semester-wise tables
    marksSection = semesters.map(sem =>
      makeTable(`Semester ${sem.semester} — Subject-wise Marks`, sem.subjects)
    ).join('');

    // Grand total across all semesters
    const allSubjects = semesters.flatMap(s => s.subjects.filter(sub => sub.name));
    if (allSubjects.length > 0) {
      const grandMarks = allSubjects.reduce((a, s) => a + s.marks, 0);
      const grandMax = allSubjects.reduce((a, s) => a + s.maxMarks, 0);
      marksSection += `
      <div style="padding:8px 36px 20px;">
        <div style="background:linear-gradient(135deg,#f0f9ff,#eff6ff);border:1px solid #bfdbfe;border-radius:12px;padding:16px 20px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;">
          <div>
            <span style="font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:0.5px;font-weight:600;">Grand Total</span>
            <div style="font-size:18px;font-weight:800;color:#1e293b;margin-top:2px;">${grandMarks} / ${grandMax}</div>
          </div>
          <div style="text-align:right;">
            <span style="font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:0.5px;font-weight:600;">Overall Percentage</span>
            <div style="font-size:18px;font-weight:800;color:#4f46e5;margin-top:2px;">${grandMax > 0 ? ((grandMarks / grandMax) * 100).toFixed(1) : '0.0'}%</div>
          </div>
        </div>
      </div>`;
    }
  } else if (subjects && subjects.length > 0) {
    marksSection = makeTable('Subject-wise Marks Breakdown', subjects);
    marksSection += '<div style="height:16px;"></div>';
  }

  // Score badges
  const badges = [
    `<span style="background:#f0fdf4;color:#16a34a;border:1.5px solid #bbf7d0;padding:8px 20px;border-radius:24px;font-size:13px;font-weight:700;display:inline-flex;align-items:center;gap:6px;">🏆 ${classification}</span>`,
    cgpa ? `<span style="background:#eff6ff;color:#2563eb;border:1.5px solid #bfdbfe;padding:8px 20px;border-radius:24px;font-size:13px;font-weight:700;display:inline-flex;align-items:center;gap:6px;">📊 CGPA: ${cgpa.toFixed(2)}</span>` : '',
    grade && grade !== '-' ? `<span style="background:#faf5ff;color:#7c3aed;border:1.5px solid #e9d5ff;padding:8px 20px;border-radius:24px;font-size:13px;font-weight:700;display:inline-flex;align-items:center;gap:6px;">🎯 Grade: ${grade}</span>` : '',
    semesters && semesters.length > 0 ? `<span style="background:#fefce8;color:#ca8a04;border:1.5px solid #fde68a;padding:8px 20px;border-radius:24px;font-size:13px;font-weight:700;display:inline-flex;align-items:center;gap:6px;">📚 ${semesters.length} Semester${semesters.length > 1 ? 's' : ''}</span>` : '',
  ].filter(Boolean).join(' ');

  const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>EduNext - Academic Report</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
  * { margin:0; padding:0; box-sizing:border-box; }
  body { font-family:'Inter',system-ui,-apple-system,sans-serif; background:#f1f5f9; color:#1f2937; -webkit-print-color-adjust:exact; print-color-adjust:exact; }
  .page { max-width:720px; margin:20px auto; background:#fff; border-radius:20px; overflow:hidden; box-shadow:0 8px 40px rgba(0,0,0,0.1); }
  @media print { body { background:#fff; } .page { box-shadow:none; margin:0; border-radius:0; } }
</style></head><body>
<div class="page">
  <!-- Header -->
  <div style="background:linear-gradient(135deg,#4338ca,#6366f1,#818cf8);padding:36px 40px 32px;color:#fff;position:relative;overflow:hidden;">
    <div style="position:absolute;top:-60px;right:-40px;width:200px;height:200px;background:rgba(255,255,255,0.06);border-radius:50%;"></div>
    <div style="position:absolute;bottom:-50px;left:-30px;width:160px;height:160px;background:rgba(255,255,255,0.04);border-radius:50%;"></div>
    <div style="position:absolute;top:20px;right:40px;width:80px;height:80px;background:rgba(255,255,255,0.05);border-radius:16px;transform:rotate(15deg);"></div>
    <div style="position:relative;z-index:1;">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:18px;">
        <div style="width:40px;height:40px;background:rgba(255,255,255,0.15);border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:20px;">📚</div>
        <div>
          <div style="font-size:24px;font-weight:900;letter-spacing:-0.5px;">EduNext</div>
          <div style="font-size:10px;opacity:0.8;letter-spacing:1.5px;text-transform:uppercase;margin-top:1px;">Know Your Marks · Choose Your Path · Build Your Future</div>
        </div>
      </div>
      <div style="border-top:1px solid rgba(255,255,255,0.15);padding-top:14px;">
        <h1 style="font-size:22px;font-weight:800;letter-spacing:-0.3px;">Academic Performance Report</h1>
        <p style="font-size:12px;opacity:0.75;margin-top:4px;">Generated on ${dateStr} at ${timeStr}</p>
      </div>
    </div>
  </div>

  <!-- Student Info -->
  <div style="display:flex;gap:20px;flex-wrap:wrap;padding:22px 40px;background:linear-gradient(135deg,#f8fafc,#f1f5f9);border-bottom:1px solid #e2e8f0;">
    ${chips}
  </div>

  <!-- Score Section -->
  <div style="display:flex;align-items:center;justify-content:center;gap:36px;padding:32px 40px;border-bottom:1px solid #e2e8f0;">
    <div style="width:130px;height:130px;border-radius:50%;background:conic-gradient(#4f46e5 ${percentage * 3.6}deg, #e2e8f0 0deg);display:flex;align-items:center;justify-content:center;box-shadow:0 4px 20px rgba(79,70,229,0.15);">
      <div style="width:105px;height:105px;border-radius:50%;background:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;box-shadow:inset 0 2px 8px rgba(0,0,0,0.04);">
        <span style="font-size:28px;font-weight:900;color:#4f46e5;line-height:1;">${percentage.toFixed(1)}%</span>
        <span style="font-size:9px;color:#94a3b8;text-transform:uppercase;letter-spacing:1.5px;margin-top:4px;font-weight:600;">Overall</span>
      </div>
    </div>
    <div style="display:flex;flex-direction:column;gap:10px;flex-wrap:wrap;">
      ${badges}
    </div>
  </div>

  <!-- Marks Tables -->
  ${marksSection}

  <!-- Footer -->
  <div style="padding:20px 40px;background:#f8fafc;border-top:1px solid #e2e8f0;display:flex;justify-content:space-between;align-items:center;">
    <div style="font-size:10px;color:#94a3b8;line-height:1.5;">This report is auto-generated by EduNext.<br>For academic reference only.</div>
    <div style="font-size:10px;color:#94a3b8;font-weight:600;">© ${now.getFullYear()} EduNext</div>
  </div>
  <div style="text-align:center;padding:10px;font-size:8px;color:#cbd5e1;letter-spacing:2.5px;text-transform:uppercase;font-weight:600;background:#f1f5f9;">
    Calculated & Processed by EduNext
  </div>
</div>
</body></html>`;

  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(html);
    printWindow.document.close();
    setTimeout(() => printWindow.print(), 600);
  }
}
