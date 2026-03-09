import { useParams, useNavigate } from 'react-router-dom';
import { COURSES } from '@/data/courses';
import { TN_COLLEGES } from '@/data/colleges';
import { getCourseDescription, getCourseSyllabus } from '@/data/courseDescriptions';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { AppHeader } from '@/components/layout/AppHeader';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import {
  Clock, IndianRupee, GraduationCap, BookOpen, AlertCircle, CheckCircle2,
  TrendingUp, Building2, ArrowRight, MapPin, Briefcase, Award, ChevronRight,
  FileText, ListChecks, Share2
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

import scienceImg from '@/assets/course-science.jpg';
import engineeringImg from '@/assets/course-engineering.jpg';
import businessImg from '@/assets/course-business.jpg';
import medicalImg from '@/assets/course-medical.jpg';
import artsImg from '@/assets/course-arts.jpg';
import lawImg from '@/assets/course-law.jpg';
import educationImg from '@/assets/course-education.jpg';

const categoryImages: Record<string, string> = {
  Science: scienceImg,
  'Science & Technology': engineeringImg,
  Engineering: engineeringImg,
  Management: businessImg,
  Commerce: businessImg,
  Medical: medicalImg,
  Arts: artsImg,
  Law: lawImg,
  Education: educationImg,
};

const levelColors: Record<string, string> = {
  UG: 'from-blue-500 to-indigo-600',
  PG: 'from-violet-500 to-purple-600',
  PhD: 'from-teal-500 to-cyan-600',
};

export default function CourseDetail() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const course = COURSES.find(c => c.id === courseId);

  if (!course) {
    return (
      <PageWrapper>
        <AppHeader title="Course Not Found" />
        <div className="flex flex-col items-center justify-center min-h-[60vh] p-6 text-center">
          <GraduationCap className="w-16 h-16 text-muted-foreground/30 mb-4" />
          <h2 className="text-lg font-bold text-foreground mb-2">Course not found</h2>
          <p className="text-sm text-muted-foreground mb-6">The course you're looking for doesn't exist.</p>
          <Button onClick={() => navigate(-1)} variant="outline">Go Back</Button>
        </div>
      </PageWrapper>
    );
  }

  const heroImg = categoryImages[course.category] || scienceImg;
  const badgeGradient = levelColors[course.level] || levelColors.UG;
  const description = getCourseDescription(course);
  const syllabus = getCourseSyllabus(course);

  // Find colleges offering this course
  const matchingColleges = TN_COLLEGES.filter(college =>
    college.courses.some(c =>
      c.toLowerCase().includes(course.name.toLowerCase().replace(/^(b\.sc|b\.com|b\.a|m\.sc|m\.a|m\.com|b\.e|b\.tech|m\.e|m\.tech|m\.b\.a|b\.b\.a|ll\.b|b\.ed|ph\.d)\s*/i, '').trim().toLowerCase()) ||
      course.name.toLowerCase().includes(c.toLowerCase())
    )
  ).slice(0, 10);

  const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
  const item = { hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] } } };

  return (
    <PageWrapper>
      <AppHeader title={course.name} />

      {/* Share FAB */}
      <button
        onClick={async () => {
          const url = `${window.location.origin}/share/course/${course.id}`;
          if (navigator.share) {
            await navigator.share({ title: course.name, text: `Check out ${course.name} on EduNext!`, url });
          } else {
            await navigator.clipboard.writeText(url);
            toast({ title: 'Link copied!', description: 'Share this link with your friends.' });
          }
        }}
        className="fixed bottom-24 right-4 z-50 w-12 h-12 rounded-full gradient-primary text-white shadow-lg flex items-center justify-center active:scale-95 transition-transform"
      >
        <Share2 className="w-5 h-5" />
      </button>

      {/* Hero */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative h-48 overflow-hidden">
        <img src={heroImg} alt={course.category} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/20" />
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-[11px] font-bold px-3 py-1.5 rounded-xl bg-gradient-to-r ${badgeGradient} text-white shadow-lg`}>
              {course.level}
            </span>
            <span className="text-[11px] font-medium px-3 py-1.5 rounded-xl bg-white/15 text-white/90 backdrop-blur-sm">
              {course.category}
            </span>
          </div>
          <h1 className="text-xl font-bold text-white leading-tight">{course.name}</h1>
        </div>
      </motion.div>

      <motion.div variants={container} initial="hidden" animate="show" className="p-4 pb-28 space-y-4">
        {/* Quick Stats */}
        <motion.div variants={item} className="grid grid-cols-2 gap-3">
          <div className="bg-card rounded-2xl border border-border p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">Duration</p>
              <p className="text-sm font-bold text-foreground">{course.duration}</p>
            </div>
          </div>
          <div className="bg-card rounded-2xl border border-border p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
              <IndianRupee className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">Approx. Fees</p>
              <p className="text-sm font-bold text-foreground">{course.approxFees}</p>
            </div>
          </div>
        </motion.div>

        {/* About This Course */}
        <motion.div variants={item} className="bg-card rounded-2xl border border-border p-5 space-y-3">
          <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
            <FileText className="w-4 h-4 text-primary" /> About This Course
          </h2>
          <p className="text-[13px] leading-relaxed text-muted-foreground">{description}</p>
        </motion.div>

        {/* Syllabus Highlights */}
        <motion.div variants={item} className="bg-card rounded-2xl border border-border p-5 space-y-3">
          <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
            <ListChecks className="w-4 h-4 text-primary" /> Syllabus Highlights
          </h2>
          <div className="grid grid-cols-1 gap-2">
            {syllabus.map((topic, i) => (
              <div key={topic} className="flex items-center gap-3 p-2.5 bg-muted/40 rounded-xl border border-border/50">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center text-[10px] font-bold text-primary flex-shrink-0">
                  {i + 1}
                </div>
                <span className="text-[13px] font-medium text-foreground">{topic}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Requirements */}
        <motion.div variants={item} className="bg-card rounded-2xl border border-border p-5 space-y-4">
          <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
            <Award className="w-4 h-4 text-primary" /> Eligibility & Requirements
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">Minimum Score</p>
              <p className="text-lg font-bold text-foreground mt-1">{course.minPercentage}%</p>
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">Entrance Exam</p>
              {course.entranceExam ? (
                <div className="flex items-center gap-1.5 mt-1">
                  <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  <p className="text-sm font-bold text-amber-600 dark:text-amber-400">{course.entranceExam}</p>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 mt-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">Not Required</p>
                </div>
              )}
            </div>
          </div>
          {course.stream && course.stream.length > 0 && (
            <div>
              <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider mb-2">Eligible Streams</p>
              <div className="flex flex-wrap gap-2">
                {course.stream.map(s => (
                  <span key={s} className="text-xs font-medium bg-primary/8 text-primary px-3 py-1.5 rounded-lg border border-primary/10">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Career Scope */}
        <motion.div variants={item} className="bg-card rounded-2xl border border-border p-5 space-y-3">
          <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" /> Career Paths
          </h2>
          <div className="grid grid-cols-1 gap-2">
            {course.careerScope.map((career, i) => (
              <div key={career} className="flex items-center gap-3 p-3 bg-muted/40 rounded-xl border border-border/50">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center text-xs font-bold text-primary">
                  {i + 1}
                </div>
                <span className="text-sm font-medium text-foreground">{career}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Colleges offering this course */}
        <motion.div variants={item} className="bg-card rounded-2xl border border-border p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
              <Building2 className="w-4 h-4 text-primary" /> Colleges Offering This Course
            </h2>
            <span className="text-[11px] font-semibold text-muted-foreground bg-muted px-2.5 py-1 rounded-lg">
              {matchingColleges.length} found
            </span>
          </div>

          {matchingColleges.length > 0 ? (
            <div className="space-y-2">
              {matchingColleges.map(college => (
                <button
                  key={college.id}
                  onClick={() => navigate(`/college/${college.id}`)}
                  className="w-full flex items-center gap-3 p-3 bg-muted/40 rounded-xl border border-border/50 hover:bg-muted/70 hover:border-primary/20 transition-all text-left active:scale-[0.98]"
                >
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-foreground truncate">{college.name}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                      <p className="text-[11px] text-muted-foreground">{college.district}</p>
                      <span className="text-[10px] text-muted-foreground mx-1">•</span>
                      <p className="text-[11px] text-muted-foreground">{college.naacGrade}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground/50 flex-shrink-0" />
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-6">
              <Building2 className="w-10 h-10 text-muted-foreground/20 mx-auto mb-2" />
              <p className="text-xs text-muted-foreground">No colleges found for this course yet.</p>
            </div>
          )}

          <Button
            className="w-full rounded-xl text-xs font-semibold h-10 gradient-primary border-0 text-white shadow-md"
            onClick={() => navigate(`/college-finder?course=${encodeURIComponent(course.name)}`)}
          >
            <Briefcase className="w-3.5 h-3.5 mr-1.5" />
            View All Colleges
            <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
          </Button>
        </motion.div>
      </motion.div>
    </PageWrapper>
  );
}
