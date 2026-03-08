import { useNavigate } from 'react-router-dom';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { BottomNav } from '@/components/layout/BottomNav';
import { AppHeader } from '@/components/layout/AppHeader';
import { useCompare } from '@/contexts/CompareContext';
import { Button } from '@/components/ui/button';
import {
  MapPin, Phone, Globe, GraduationCap, Calendar, Star,
  ArrowLeft, ExternalLink, CheckCircle2, XCircle, Award
} from 'lucide-react';

const naacGradients: Record<string, string> = {
  'A++': 'from-emerald-500 to-teal-500',
  'A+': 'from-blue-500 to-cyan-500',
  'A': 'from-sky-500 to-blue-400',
  'B+': 'from-amber-500 to-yellow-400',
  'B': 'from-orange-500 to-amber-400',
};

export default function CompareColleges() {
  const navigate = useNavigate();
  const { selected, clearAll } = useCompare();

  if (selected.length < 2) {
    return (
      <PageWrapper>
        <AppHeader title="Compare Colleges" showBack backPath="/college-finder" gradient />
        <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
          <GraduationCap className="w-16 h-16 text-muted-foreground/30 mb-4" />
          <h2 className="font-bold text-foreground text-lg">Select at least 2 colleges</h2>
          <p className="text-sm text-muted-foreground mt-1">Go to College Finder and tap the compare button on colleges you want to compare.</p>
          <Button onClick={() => navigate('/college-finder')} className="mt-4 rounded-xl gradient-primary border-0">
            <ArrowLeft className="w-4 h-4 mr-1.5" /> Go to College Finder
          </Button>
        </div>
        <BottomNav />
      </PageWrapper>
    );
  }

  // Find all unique courses across selected colleges
  const allCourses = [...new Set(selected.flatMap(c => c.courses))].sort();

  const rows: { label: string; icon: React.ReactNode; values: (string | React.ReactNode)[] }[] = [
    {
      label: 'NAAC Grade',
      icon: <Star className="w-3.5 h-3.5" />,
      values: selected.map(c => (
        <span key={c.id} className={`text-xs font-bold px-2.5 py-1 rounded-full text-white bg-gradient-to-r ${naacGradients[c.naacGrade] || 'from-gray-400 to-gray-500'}`}>
          {c.naacGrade}
        </span>
      )),
    },
    {
      label: 'Type',
      icon: <Award className="w-3.5 h-3.5" />,
      values: selected.map(c => c.type),
    },
    {
      label: 'District',
      icon: <MapPin className="w-3.5 h-3.5" />,
      values: selected.map(c => c.district),
    },
    {
      label: 'Established',
      icon: <Calendar className="w-3.5 h-3.5" />,
      values: selected.map(c => String(c.established)),
    },
    {
      label: 'Phone',
      icon: <Phone className="w-3.5 h-3.5" />,
      values: selected.map(c => c.phone),
    },
  ];

  return (
    <PageWrapper>
      <AppHeader title="Compare Colleges" showBack backPath="/college-finder" gradient />
      <div className="p-4 max-w-2xl mx-auto space-y-4">

        {/* College Headers - sticky */}
        <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${selected.length}, 1fr)` }}>
          {selected.map((college) => (
            <div key={college.id} className={`rounded-2xl p-3 text-center bg-gradient-to-br ${naacGradients[college.naacGrade] || 'from-gray-400 to-gray-500'} relative overflow-hidden`}>
              <GraduationCap className="absolute right-1 top-1 w-10 h-10 text-white/[0.08]" />
              <div className="relative z-10">
                <h3 className="font-bold text-white text-xs leading-tight">{college.name}</h3>
                <p className="text-white/70 text-[10px] mt-0.5">{college.district}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="bg-card rounded-2xl border border-border card-shadow overflow-hidden">
          {rows.map((row, i) => (
            <div key={row.label} className={`grid items-center ${i % 2 === 0 ? 'bg-muted/30' : ''}`}
              style={{ gridTemplateColumns: `120px repeat(${selected.length}, 1fr)` }}>
              <div className="p-3 flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                {row.icon} {row.label}
              </div>
              {row.values.map((val, j) => (
                <div key={j} className="p-3 text-xs font-medium text-foreground text-center">
                  {val}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Course Comparison */}
        <div className="bg-card rounded-2xl border border-border card-shadow overflow-hidden">
          <div className="p-3 border-b border-border bg-muted/30">
            <h3 className="font-semibold text-foreground text-sm flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-primary" /> Department Comparison
            </h3>
          </div>
          <div className="divide-y divide-border/50">
            {allCourses.map((course, i) => (
              <div key={course} className={`grid items-center ${i % 2 === 0 ? '' : 'bg-muted/20'}`}
                style={{ gridTemplateColumns: `120px repeat(${selected.length}, 1fr)` }}>
                <div className="p-2.5 text-xs font-medium text-foreground truncate pl-3">
                  {course}
                </div>
                {selected.map((college) => {
                  const has = college.courses.some(c => c.toLowerCase() === course.toLowerCase());
                  return (
                    <div key={college.id} className="p-2.5 flex justify-center">
                      {has ? (
                        <CheckCircle2 className="w-5 h-5 text-edu-green" />
                      ) : (
                        <XCircle className="w-5 h-5 text-muted-foreground/30" />
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Website Links */}
        <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${selected.length}, 1fr)` }}>
          {selected.map((college) => (
            <a key={college.id} href={college.website} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm" className="w-full rounded-xl text-xs gap-1 h-9">
                <Globe className="w-3.5 h-3.5" /> Website
              </Button>
            </a>
          ))}
        </div>

        {/* Map Links */}
        <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${selected.length}, 1fr)` }}>
          {selected.map((college) => (
            <a key={college.id} href={college.mapLink} target="_blank" rel="noopener noreferrer">
              <Button size="sm" className="w-full rounded-xl text-xs gradient-primary border-0 gap-1 h-9">
                <MapPin className="w-3.5 h-3.5" /> Directions
              </Button>
            </a>
          ))}
        </div>

        {/* Clear */}
        <Button
          variant="outline"
          onClick={() => { clearAll(); navigate('/college-finder'); }}
          className="w-full rounded-xl text-xs h-10"
        >
          Clear Comparison & Go Back
        </Button>
      </div>
      <BottomNav />
    </PageWrapper>
  );
}
