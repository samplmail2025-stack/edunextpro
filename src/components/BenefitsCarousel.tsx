import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft, ChevronRight, BookOpen, Compass, Award,
  TrendingUp, Building2, FileUser, FileText,
} from 'lucide-react';

import benefitSmartLearning from '@/assets/benefit-smart-learning.jpg';
import benefitCareerGuidance from '@/assets/benefit-career-guidance.jpg';
import benefitExamResults from '@/assets/benefit-exam-results.jpg';
import benefitScholarships from '@/assets/benefit-scholarships.jpg';
import benefitCollegeFinder from '@/assets/benefit-college-finder.jpg';
import benefitResume from '@/assets/benefit-resume.jpg';
import benefitEntranceExam from '@/assets/benefit-entrance-exam.jpg';

const benefits = [
  {
    image: benefitSmartLearning,
    icon: BookOpen,
    title: 'Smart Learning Path',
    description: 'AI-powered course recommendations based on your marks, stream, and interests.',
  },
  {
    image: benefitCollegeFinder,
    icon: Building2,
    title: 'College Finder',
    description: 'Explore 170+ colleges across Tamil Nadu with filters, maps & comparisons.',
  },
  {
    image: benefitCareerGuidance,
    icon: Compass,
    title: 'Career Guidance',
    description: 'Get personalized career advice with 75+ job paths and interview preparation.',
  },
  {
    image: benefitEntranceExam,
    icon: FileText,
    title: 'Entrance Exam Guide',
    description: 'Complete guides for TNEA, NEET, JEE, TNPSC & other competitive exams.',
  },
  {
    image: benefitExamResults,
    icon: TrendingUp,
    title: 'Track Your Progress',
    description: 'Analyze your academic performance with detailed charts and grade insights.',
  },
  {
    image: benefitResume,
    icon: FileUser,
    title: 'Resume Builder',
    description: 'Create a professional CV instantly — stand out to employers & colleges.',
  },
  {
    image: benefitScholarships,
    icon: Award,
    title: 'Scholarship Finder',
    description: 'Discover 40+ scholarships for Tamil Nadu students — never miss an opportunity.',
  },
];

// Preload all images immediately
benefits.forEach((b) => {
  const img = new Image();
  img.src = b.image;
});

export function BenefitsCarousel() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const goNext = useCallback(() => {
    setDirection(1);
    setIndex((p) => (p + 1) % benefits.length);
  }, []);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setIndex((p) => (p - 1 + benefits.length) % benefits.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(goNext, 4000);
    return () => clearInterval(timer);
  }, [goNext]);

  const current = benefits[index];
  const Icon = current.icon;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-1 h-4 rounded-full bg-primary" />
          <p className="text-xs font-bold text-foreground uppercase tracking-wider">
            Why EduNext?
          </p>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={goPrev}
            className="w-7 h-7 rounded-full bg-muted flex items-center justify-center hover:bg-muted-foreground/20 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 text-muted-foreground" />
          </button>
          <button
            onClick={goNext}
            className="w-7 h-7 rounded-full bg-muted flex items-center justify-center hover:bg-muted-foreground/20 transition-colors"
          >
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-border shadow-lg h-48">
        {/* Background: all images stacked, only active one visible */}
        {benefits.map((b, i) => (
          <img
            key={i}
            src={b.image}
            alt={b.title}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
              i === index ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />

        {/* Content with slide animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="absolute bottom-0 left-0 right-0 p-4"
          >
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-8 h-8 rounded-lg bg-primary/90 flex items-center justify-center">
                <Icon className="w-4 h-4 text-primary-foreground" />
              </div>
              <h3 className="text-white font-bold text-base">{current.title}</h3>
            </div>
            <p className="text-white/80 text-xs leading-relaxed">
              {current.description}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Dots */}
        <div className="absolute top-3 right-3 flex gap-1">
          {benefits.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > index ? 1 : -1);
                setIndex(i);
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? 'w-5 bg-white' : 'w-1.5 bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
