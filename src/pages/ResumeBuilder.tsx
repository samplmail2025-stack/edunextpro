import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { AppHeader } from '@/components/layout/AppHeader';
import { BottomNav } from '@/components/layout/BottomNav';
import { useAuth } from '@/hooks/useAuth';
import { useMarks } from '@/hooks/useMarks';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { FileText, Download, User, GraduationCap, Briefcase, Star, ChevronRight, ChevronLeft, Eye, Palette } from 'lucide-react';

type Template = 'professional' | 'modern' | 'minimal';

const STEPS = ['Personal Info', 'Education', 'Skills & Objective', 'Preview'];

const templateStyles: Record<Template, { name: string; accent: string; description: string }> = {
  professional: { name: 'Professional', accent: 'from-blue-600 to-indigo-700', description: 'Classic and formal' },
  modern: { name: 'Modern', accent: 'from-violet-500 to-purple-600', description: 'Bold and creative' },
  minimal: { name: 'Minimal', accent: 'from-gray-600 to-gray-800', description: 'Clean and simple' },
};

export default function ResumeBuilder() {
  const { profile } = useAuth();
  const { marks } = useMarks();
  const resumeRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const [template, setTemplate] = useState<Template>('professional');

  const [form, setForm] = useState({
    fullName: profile?.full_name || '',
    email: '',
    phone: profile?.phone || '',
    district: profile?.district || '',
    state: profile?.state || 'Tamil Nadu',
    objective: '',
    education: marks?.[0] ? `${marks[0].student_type === 'school' ? `Class ${marks[0].class}` : marks[0].course || 'Degree'} - ${marks[0].percentage ? marks[0].percentage + '%' : marks[0].cgpa ? 'CGPA ' + marks[0].cgpa : ''}` : '',
    institution: '',
    skills: '',
    languages: 'Tamil, English',
    experience: '',
    achievements: '',
  });

  const update = (key: string, value: string) => setForm((p) => ({ ...p, [key]: value }));

  const handlePrint = () => {
    const content = resumeRef.current;
    if (!content) return;
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(`
      <html><head><title>${form.fullName} - Resume</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Segoe UI', system-ui, sans-serif; }
        body { padding: 24px; color: #1a1a2e; }
        .resume-header { padding: 24px; margin: -24px -24px 24px; color: white; background: ${template === 'professional' ? 'linear-gradient(135deg, #2563eb, #4338ca)' : template === 'modern' ? 'linear-gradient(135deg, #8b5cf6, #7c3aed)' : '#374151'}; }
        .resume-header h1 { font-size: 28px; font-weight: 700; }
        .resume-header p { font-size: 13px; opacity: 0.9; margin-top: 4px; }
        .section { margin-bottom: 20px; }
        .section h2 { font-size: 15px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: ${template === 'professional' ? '#2563eb' : template === 'modern' ? '#7c3aed' : '#374151'}; border-bottom: 2px solid; padding-bottom: 4px; margin-bottom: 8px; }
        .section p, .section li { font-size: 13px; line-height: 1.6; }
        ul { padding-left: 20px; }
        .info-row { display: flex; gap: 16px; flex-wrap: wrap; margin-top: 4px; }
        .info-row span { font-size: 12px; }
        @media print { body { padding: 0; } }
      </style></head><body>
      <div class="resume-header">
        <h1>${form.fullName || 'Your Name'}</h1>
        <div class="info-row">
          ${form.email ? `<span>📧 ${form.email}</span>` : ''}
          ${form.phone ? `<span>📱 ${form.phone}</span>` : ''}
          ${form.district ? `<span>📍 ${form.district}, ${form.state}</span>` : ''}
        </div>
      </div>
      ${form.objective ? `<div class="section"><h2>Career Objective</h2><p>${form.objective}</p></div>` : ''}
      ${form.education ? `<div class="section"><h2>Education</h2><p>${form.education}</p>${form.institution ? `<p style="color:#666">${form.institution}</p>` : ''}</div>` : ''}
      ${form.skills ? `<div class="section"><h2>Skills</h2><ul>${form.skills.split(',').map(s => `<li>${s.trim()}</li>`).join('')}</ul></div>` : ''}
      ${form.experience ? `<div class="section"><h2>Experience / Projects</h2><p>${form.experience}</p></div>` : ''}
      ${form.achievements ? `<div class="section"><h2>Achievements</h2><p>${form.achievements}</p></div>` : ''}
      ${form.languages ? `<div class="section"><h2>Languages</h2><p>${form.languages}</p></div>` : ''}
      </body></html>
    `);
    printWindow.document.close();
    setTimeout(() => printWindow.print(), 300);
  };

  return (
    <PageWrapper>
      <AppHeader title="Resume Builder" subtitle="Create your professional CV" showBack />

      <div className="px-4 py-4 space-y-4 pb-24">
        {/* Steps indicator */}
        <div className="flex items-center gap-1">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-1 flex-1">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                i <= step ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'
              }`}>
                {i + 1}
              </div>
              {i < STEPS.length - 1 && <div className={`flex-1 h-0.5 ${i < step ? 'bg-primary' : 'bg-secondary'}`} />}
            </div>
          ))}
        </div>
        <p className="text-sm font-semibold text-foreground">{STEPS[step]}</p>

        {/* Step content */}
        <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-3">
          {step === 0 && (
            <>
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">Full Name</label>
                <Input value={form.fullName} onChange={(e) => update('fullName', e.target.value)} placeholder="Your full name" className="rounded-xl" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">Email</label>
                <Input value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="your@email.com" type="email" className="rounded-xl" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">Phone</label>
                <Input value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="+91 xxxxx xxxxx" className="rounded-xl" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-muted-foreground">District</label>
                  <Input value={form.district} onChange={(e) => update('district', e.target.value)} placeholder="District" className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-muted-foreground">State</label>
                  <Input value={form.state} onChange={(e) => update('state', e.target.value)} placeholder="State" className="rounded-xl" />
                </div>
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">Education Details</label>
                <Textarea value={form.education} onChange={(e) => update('education', e.target.value)} placeholder="e.g., B.Tech CSE - 8.5 CGPA" className="rounded-xl min-h-[80px]" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">Institution Name</label>
                <Input value={form.institution} onChange={(e) => update('institution', e.target.value)} placeholder="College/School name" className="rounded-xl" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">Experience / Projects</label>
                <Textarea value={form.experience} onChange={(e) => update('experience', e.target.value)} placeholder="Describe any internships, projects, or work experience..." className="rounded-xl min-h-[80px]" />
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">Skills (comma-separated)</label>
                <Textarea value={form.skills} onChange={(e) => update('skills', e.target.value)} placeholder="Python, React, Data Analysis, Communication..." className="rounded-xl min-h-[80px]" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">Career Objective</label>
                <Textarea value={form.objective} onChange={(e) => update('objective', e.target.value)} placeholder="A motivated engineering graduate seeking..." className="rounded-xl min-h-[80px]" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">Achievements</label>
                <Textarea value={form.achievements} onChange={(e) => update('achievements', e.target.value)} placeholder="Awards, certifications, competitions..." className="rounded-xl min-h-[60px]" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">Languages</label>
                <Input value={form.languages} onChange={(e) => update('languages', e.target.value)} placeholder="Tamil, English, Hindi" className="rounded-xl" />
              </div>
            </>
          )}

          {step === 3 && (
            <>
              {/* Template selector */}
              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground flex items-center gap-1"><Palette className="w-3 h-3" /> Choose Template</p>
                <div className="grid grid-cols-3 gap-2">
                  {(Object.keys(templateStyles) as Template[]).map((t) => (
                    <button
                      key={t}
                      onClick={() => setTemplate(t)}
                      className={`rounded-xl p-2.5 text-center border-2 transition-all ${
                        template === t ? 'border-primary bg-primary/5' : 'border-border bg-card'
                      }`}
                    >
                      <div className={`w-full h-3 rounded-full bg-gradient-to-r ${templateStyles[t].accent} mb-1.5`} />
                      <p className="text-xs font-semibold text-foreground">{templateStyles[t].name}</p>
                      <p className="text-[10px] text-muted-foreground">{templateStyles[t].description}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Preview */}
              <div ref={resumeRef} className="bg-white rounded-2xl border border-border overflow-hidden shadow-lg">
                <div className={`bg-gradient-to-r ${templateStyles[template].accent} p-5`}>
                  <h2 className="text-xl font-bold text-white">{form.fullName || 'Your Name'}</h2>
                  <div className="flex flex-wrap gap-3 mt-1.5 text-white/80 text-xs">
                    {form.email && <span>📧 {form.email}</span>}
                    {form.phone && <span>📱 {form.phone}</span>}
                    {form.district && <span>📍 {form.district}, {form.state}</span>}
                  </div>
                </div>
                <div className="p-4 space-y-3 text-foreground">
                  {form.objective && (
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-primary mb-1">Career Objective</h3>
                      <p className="text-xs leading-relaxed">{form.objective}</p>
                    </div>
                  )}
                  {form.education && (
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-primary mb-1">Education</h3>
                      <p className="text-xs">{form.education}</p>
                      {form.institution && <p className="text-xs text-muted-foreground">{form.institution}</p>}
                    </div>
                  )}
                  {form.skills && (
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-primary mb-1">Skills</h3>
                      <div className="flex flex-wrap gap-1">
                        {form.skills.split(',').map((s, i) => (
                          <span key={i} className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full">{s.trim()}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  {form.experience && (
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-primary mb-1">Experience / Projects</h3>
                      <p className="text-xs leading-relaxed">{form.experience}</p>
                    </div>
                  )}
                  {form.achievements && (
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-primary mb-1">Achievements</h3>
                      <p className="text-xs leading-relaxed">{form.achievements}</p>
                    </div>
                  )}
                </div>
              </div>

              <Button onClick={handlePrint} className="w-full rounded-xl gap-2">
                <Download className="w-4 h-4" /> Download / Print Resume
              </Button>
            </>
          )}
        </motion.div>

        {/* Navigation */}
        <div className="flex gap-3 pt-2">
          {step > 0 && (
            <Button variant="outline" onClick={() => setStep(step - 1)} className="flex-1 rounded-xl gap-1">
              <ChevronLeft className="w-4 h-4" /> Back
            </Button>
          )}
          {step < STEPS.length - 1 && (
            <Button onClick={() => setStep(step + 1)} className="flex-1 rounded-xl gap-1">
              Next <ChevronRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      <BottomNav />
    </PageWrapper>
  );
}
