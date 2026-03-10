import { Clock, IndianRupee, BookOpen, GraduationCap, Bookmark, ArrowRight, CheckCircle2, AlertCircle, TrendingUp } from 'lucide-react';
import { Course } from '@/data/courses';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

import scienceImg from '@/assets/course-science.jpg';
import engineeringImg from '@/assets/course-engineering.jpg';
import businessImg from '@/assets/course-business.jpg';
import medicalImg from '@/assets/course-medical.jpg';
import artsImg from '@/assets/course-arts.jpg';
import lawImg from '@/assets/course-law.jpg';
import educationImg from '@/assets/course-education.jpg';
import agricultureImg from '@/assets/course-agriculture.jpg';
import computerScienceImg from '@/assets/course-computer-science.jpg';
import nursingImg from '@/assets/course-nursing.jpg';
import pharmacyImg from '@/assets/course-pharmacy.jpg';
import designImg from '@/assets/course-design.jpg';
import managementImg from '@/assets/course-management.jpg';
import teachingImg from '@/assets/course-teaching.jpg';
import biotechImg from '@/assets/course-biotech.jpg';
import commerceImg from '@/assets/course-commerce.jpg';
import yogaImg from '@/assets/course-yoga.jpg';
import libraryImg from '@/assets/course-library.jpg';
import forensicImg from '@/assets/course-forensic.jpg';

interface CourseCardProps {
  course: Course;
  onSave?: () => void;
  isSaved?: boolean;
}

// Course-specific image mapping by course ID
const courseIdImages: Record<string, string> = {
  'bsc-agriculture': agricultureImg,
  'bsc-cs': computerScienceImg,
  'bsc-it': computerScienceImg,
  'bca': computerScienceImg,
  'msc-cs': computerScienceImg,
  'mca': computerScienceImg,
  'bsc-nursing': nursingImg,
  'msc-nursing': nursingImg,
  'bpharm': pharmacyImg,
  'mpharm': pharmacyImg,
  'bdes': designImg,
  'bsc-visual-comm': designImg,
  'mba': managementImg,
  'mba-hospital': managementImg,
  'mba-agri': agricultureImg,
  'pgdm': managementImg,
  'bed': teachingImg,
  'med': teachingImg,
  'bsc-biotech': biotechImg,
  'msc-biotech': biotechImg,
  'bsc-microbiology': biotechImg,
  'msc-microbio': biotechImg,
  'msc-biochem': biotechImg,
  'bcom': commerceImg,
  'bba': commerceImg,
  'bcom-ca': commerceImg,
  'bcom-finance': commerceImg,
  'bcom-banking': commerceImg,
  'mcom': commerceImg,
  'mcom-finance': commerceImg,
  'mcom-ca': commerceImg,
  'msc-yoga': yogaImg,
  'mlis': libraryImg,
  'msc-forensic': forensicImg,
  'bsc-nutrition': biotechImg,
  'msc-nutrition': biotechImg,
  'bpt': nursingImg,
  'mpt': nursingImg,
  'bams': medicalImg,
  'bsms': medicalImg,
  'bhms': medicalImg,
  'btech-cse': computerScienceImg,
  'btech-it': computerScienceImg,
  'btech-aiml': computerScienceImg,
  'btech-data-science': computerScienceImg,
  'btech-cyber': computerScienceImg,
  'btech-biomedical': biotechImg,
  'btech-food': agricultureImg,
  'btech-auto': engineeringImg,
  'btech-chemical': engineeringImg,
  'btech-marine': engineeringImg,
  'btech-textile': engineeringImg,
  'ba-english': libraryImg,
  'ma-english': libraryImg,
  'ba-history': libraryImg,
  'ma-history': libraryImg,
  'ba-tamil': libraryImg,
  'ma-tamil': libraryImg,
  'mphil-tamil': libraryImg,
  'msc-env-science': agricultureImg,
  'msc-zoology': biotechImg,
  'msc-botany': agricultureImg,
};

const categoryImages: Record<string, string> = {
  Science: scienceImg,
  'Science & Technology': computerScienceImg,
  Engineering: engineeringImg,
  Management: managementImg,
  Commerce: commerceImg,
  Medical: medicalImg,
  Arts: artsImg,
  Law: lawImg,
  Education: teachingImg,
};

const levelBadge: Record<string, string> = {
  UG: 'from-blue-500 to-indigo-600',
  PG: 'from-violet-500 to-purple-600',
  PhD: 'from-teal-500 to-cyan-600',
};

export function CourseCard({ course, onSave, isSaved }: CourseCardProps) {
  const navigate = useNavigate();
  const heroImg = courseIdImages[course.id] || categoryImages[course.category] || scienceImg;

  return (
    <div className="group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 border border-border bg-card">
      {/* Image Header */}
      <div className="relative h-36 overflow-hidden">
        <img
          src={heroImg}
          alt={course.category}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />

        {/* Level badge + bookmark */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5">
          <span className={`text-[11px] font-bold px-3 py-1.5 rounded-xl bg-gradient-to-r ${badgeGradient} text-white shadow-lg`}>
            {course.level}
          </span>
          {onSave && (
            <button
              onClick={(e) => { e.stopPropagation(); onSave(); }}
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all backdrop-blur-md border border-white/15 ${
                isSaved
                  ? 'bg-white/30 text-white'
                  : 'bg-black/20 text-white/70 hover:bg-white/20 hover:text-white'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            </button>
          )}
        </div>

        {/* Title overlay on image */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="font-bold text-white text-[15px] leading-snug tracking-tight drop-shadow-md">
            {course.name}
          </h3>
          <p className="text-white/70 text-xs mt-0.5 font-medium">{course.category}</p>
        </div>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-2 divide-x divide-border border-b border-border">
        <div className="flex items-center justify-center gap-2 py-3">
          <Clock className="w-4 h-4 text-primary/60" />
          <span className="text-xs font-bold text-foreground">{course.duration}</span>
        </div>
        <div className="flex items-center justify-center gap-2 py-3">
          <IndianRupee className="w-4 h-4 text-primary/60" />
          <span className="text-xs font-bold text-foreground">{course.approxFees}</span>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 space-y-3">
        {/* Requirements row */}
        <div className="flex items-center gap-3 p-3 bg-muted/40 rounded-xl border border-border/50">
          <div className="flex-1">
            <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">Min. Score</p>
            <p className="text-sm font-bold text-foreground mt-0.5">{course.minPercentage}%</p>
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="flex-1">
            <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">Entrance</p>
            {course.entranceExam ? (
              <div className="flex items-center gap-1 mt-0.5">
                <AlertCircle className="w-3 h-3 text-amber-500 flex-shrink-0" />
                <p className="text-xs font-semibold text-amber-600 dark:text-amber-400">{course.entranceExam}</p>
              </div>
            ) : (
              <div className="flex items-center gap-1 mt-0.5">
                <CheckCircle2 className="w-3 h-3 text-emerald-500 flex-shrink-0" />
                <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">Not Required</p>
              </div>
            )}
          </div>
        </div>

        {/* Career scope */}
        <div>
          <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <TrendingUp className="w-3 h-3" /> Career Paths
          </p>
          <div className="flex flex-wrap gap-1.5">
            {course.careerScope.slice(0, 3).map((c) => (
              <span
                key={c}
                className="text-[11px] font-medium bg-primary/8 text-primary px-2.5 py-1 rounded-lg border border-primary/10"
              >
                {c}
              </span>
            ))}
            {course.careerScope.length > 3 && (
              <span className="text-[11px] text-muted-foreground px-2 py-1">
                +{course.careerScope.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* CTA */}
        <Button
          size="sm"
          className="w-full rounded-xl text-xs font-semibold h-10 gradient-primary border-0 text-white shadow-md group/btn hover:shadow-lg transition-all"
          onClick={() => navigate(`/course/${course.id}`)}
        >
          View Details
          <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover/btn:translate-x-0.5" />
        </Button>
      </div>
    </div>
  );
}
