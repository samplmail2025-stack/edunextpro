import { useParams } from 'react-router-dom';
import { TN_COLLEGES } from '@/data/colleges';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import {
  Building2, MapPin, Phone, Globe, Calendar, Award, BookOpen,
  ExternalLink, Navigation, Download
} from 'lucide-react';
import edunextLogo from '@/assets/edunext-logo.png';

export default function ShareCollegeDetail() {
  const { collegeId } = useParams<{ collegeId: string }>();
  const college = TN_COLLEGES.find(c => c.id === collegeId);

  if (!college) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
        <Building2 className="w-16 h-16 text-muted-foreground/30 mb-4" />
        <h2 className="text-lg font-bold text-foreground mb-2">College not found</h2>
        <p className="text-sm text-muted-foreground">The college you're looking for doesn't exist.</p>
      </div>
    );
  }

  const typeColors: Record<string, string> = {
    Government: 'from-emerald-500 to-teal-600',
    Aided: 'from-blue-500 to-indigo-600',
    Private: 'from-violet-500 to-purple-600',
    Deemed: 'from-amber-500 to-orange-600',
    Central: 'from-rose-500 to-red-600',
  };
  const badgeGradient = typeColors[college.type] || typeColors.Government;

  const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
  const item = { hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] } } };

  return (
    <div className="min-h-screen bg-background max-w-lg mx-auto">
      {/* Header bar */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border px-4 py-3 flex items-center gap-3">
        <img src={edunextLogo} alt="EduNext" className="w-8 h-8 rounded-lg" />
        <span className="text-sm font-bold text-foreground">EduNext</span>
      </div>

      {/* Hero header */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-background p-5 pb-6 border-b border-border">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center flex-shrink-0 border border-primary/10">
            <Building2 className="w-8 h-8 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-bold text-foreground leading-tight">{college.name}</h1>
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <span className={`text-[11px] font-bold px-3 py-1.5 rounded-xl bg-gradient-to-r ${badgeGradient} text-white shadow-lg`}>
                {college.type}
              </span>
              <span className="text-[11px] font-medium px-3 py-1.5 rounded-xl bg-muted text-muted-foreground border border-border">
                NAAC {college.naacGrade}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div variants={container} initial="hidden" animate="show" className="p-4 pb-8 space-y-4">
        {/* Quick Info */}
        <motion.div variants={item} className="grid grid-cols-2 gap-3">
          <div className="bg-card rounded-2xl border border-border p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">Established</p>
              <p className="text-sm font-bold text-foreground">{college.established}</p>
            </div>
          </div>
          <div className="bg-card rounded-2xl border border-border p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
              <Award className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">NAAC Grade</p>
              <p className="text-sm font-bold text-foreground">{college.naacGrade}</p>
            </div>
          </div>
        </motion.div>

        {/* Location & Contact */}
        <motion.div variants={item} className="bg-card rounded-2xl border border-border p-5 space-y-4">
          <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" /> Location & Contact
          </h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-muted/40 rounded-xl border border-border/50">
              <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">Address</p>
                <p className="text-sm text-foreground mt-0.5">{college.address}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{college.district}, {college.state}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-muted/40 rounded-xl border border-border/50">
              <Phone className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <div>
                <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">Phone</p>
                <a href={`tel:${college.phone}`} className="text-sm font-medium text-primary mt-0.5 block">{college.phone}</a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Courses Offered */}
        <motion.div variants={item} className="bg-card rounded-2xl border border-border p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-primary" /> Courses Offered
            </h2>
            <span className="text-[11px] font-semibold text-muted-foreground bg-muted px-2.5 py-1 rounded-lg">
              {college.courses.length} courses
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {college.courses.map(course => (
              <span key={course} className="text-xs font-medium bg-primary/8 text-primary px-3 py-1.5 rounded-lg border border-primary/10">
                {course}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div variants={item} className="space-y-2.5">
          {college.website && (
            <a href={college.website} target="_blank" rel="noopener noreferrer" className="block">
              <Button className="w-full rounded-xl text-xs font-semibold h-11 gradient-primary border-0 text-white shadow-md">
                <Globe className="w-4 h-4 mr-2" />
                Visit Official Website
                <ExternalLink className="w-3.5 h-3.5 ml-auto" />
              </Button>
            </a>
          )}
          {college.mapLink && (
            <a href={college.mapLink} target="_blank" rel="noopener noreferrer" className="block">
              <Button variant="outline" className="w-full rounded-xl text-xs font-semibold h-11">
                <Navigation className="w-4 h-4 mr-2" />
                Open in Google Maps
                <ExternalLink className="w-3.5 h-3.5 ml-auto text-muted-foreground" />
              </Button>
            </a>
          )}
        </motion.div>
      </motion.div>

      {/* Download EduNext Promo */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="sticky bottom-0 bg-card/95 backdrop-blur-xl border-t border-border p-4"
      >
        <div className="flex items-center gap-3">
          <img src={edunextLogo} alt="EduNext" className="w-12 h-12 rounded-2xl shadow-md" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-foreground">EduNext - Career Guide</p>
            <p className="text-[11px] text-muted-foreground">Explore courses, colleges & career paths</p>
          </div>
          <a href={window.location.origin} className="flex-shrink-0">
            <Button size="sm" className="rounded-xl gradient-primary text-white border-0 font-bold text-xs h-10 px-4 gap-1.5">
              <Download className="w-3.5 h-3.5" />
              Get App
            </Button>
          </a>
        </div>
      </motion.div>
    </div>
  );
}