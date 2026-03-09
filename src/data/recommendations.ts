import { COURSES, Course } from './courses';
import { JOBS, Job } from './jobs';

export interface RecommendationContext {
  studentType: 'school' | 'college';
  percentage: number;
  cgpa?: number;
  stream?: string;
  level?: string;
  course?: string;
  classification?: string;
  class?: string;
}

// Map specific school HSC groups to course stream tags
function getStreamTags(stream?: string): string[] {
  if (!stream) return [];
  if (stream.startsWith('Science (Maths)')) return ['Science', 'Engineering'];
  if (stream.startsWith('Science (Biology)')) return ['Science', 'Medical'];
  if (stream.startsWith('Science (Computer Science)')) return ['Science', 'Engineering', 'Technology'];
  if (stream.startsWith('Commerce')) return ['Commerce'];
  if (stream.startsWith('Arts')) return ['Arts'];
  if (stream === 'Vocational') return ['Vocational', 'Arts', 'Commerce'];
  return [];
}

export function getHigherStudiesRecommendations(ctx: RecommendationContext): Course[] {
  const { percentage, stream, level, studentType, course } = ctx;
  const cls = ctx.class;

  return COURSES.filter((c) => {
    if (percentage < c.minPercentage) return false;

    // School student
    if (studentType === 'school') {
      if (c.level !== 'UG') return false;

      // 10th student: show general courses across all streams (no stream filter)
      if (cls === '10th') return true;

      // 11th/12th: filter by stream tags
      if (stream && c.stream && c.stream.length > 0) {
        const tags = getStreamTags(stream);
        if (tags.length > 0) {
          const matches = c.stream.some(s => tags.includes(s));
          if (!matches) return false;
        }
      }
      return true;
    }

    // College student: recommend next level based on current level
    if (studentType === 'college') {
      if (level === 'UG') {
        if (c.level !== 'PG') return false;
      } else if (level === 'PG') {
        if (c.level !== 'PhD') return false;
      } else {
        return false;
      }

      // Filter by related course/stream if available
      if (course) {
        const courseLower = course.toLowerCase();
        const courseTerms = getCollegeCourseTerms(courseLower);
        if (courseTerms.length > 0 && c.stream && c.stream.length > 0) {
          const matches = c.stream.some(s => courseTerms.includes(s.toLowerCase()));
          if (!matches) {
            // Also check if course name contains related keywords
            const nameMatch = courseTerms.some(t => c.name.toLowerCase().includes(t));
            if (!nameMatch) return false;
          }
        }
      }
      return true;
    }

    return false;
  }).slice(0, 15);
}

// Map college course names to relevant stream/category terms
function getCollegeCourseTerms(course: string): string[] {
  if (course.includes('computer') || course.includes('bca') || course.includes('bsc cs') || course.includes('bsc it') || course.includes('information technology')) {
    return ['science', 'engineering', 'technology'];
  }
  if (course.includes('engineering') || course.includes('btech') || course.includes('b.e') || course.includes('be ')) {
    return ['engineering', 'technology', 'science'];
  }
  if (course.includes('commerce') || course.includes('bcom') || course.includes('b.com') || course.includes('bba') || course.includes('mba')) {
    return ['commerce'];
  }
  if (course.includes('arts') || course.includes('ba ') || course.includes('b.a') || course.includes('history') || course.includes('english') || course.includes('political')) {
    return ['arts'];
  }
  if (course.includes('medical') || course.includes('mbbs') || course.includes('nursing') || course.includes('pharmacy') || course.includes('bsc bio')) {
    return ['medical', 'science'];
  }
  if (course.includes('law') || course.includes('llb') || course.includes('l.l.b')) {
    return ['law'];
  }
  if (course.includes('education') || course.includes('b.ed') || course.includes('bed')) {
    return ['education'];
  }
  return [];
}

export function getJobRecommendations(ctx: RecommendationContext): Job[] {
  const { percentage, cgpa } = ctx;
  return JOBS.filter((job) => {
    const meetsPercentage = !job.minPercentage || percentage >= job.minPercentage;
    const meetsCGPA = !job.minCGPA || !cgpa || cgpa >= job.minCGPA;
    return meetsPercentage && meetsCGPA;
  });
}

export function getSkillRecommendations(ctx: RecommendationContext): string[] {
  const { course, stream, percentage } = ctx;
  const skills: string[] = [];

  if (percentage < 60) {
    skills.push('Focus on core subject understanding with NCERT / Textbooks');
    skills.push('Practice previous year question papers daily');
  }

  // Stream-specific skills for school students
  if (stream?.startsWith('Science (Maths)')) {
    skills.push('Prepare for JEE / TNEA entrance exams for Engineering');
    skills.push('Learn Python / MATLAB for competitive edge');
    skills.push('Practice Quantitative Aptitude for placement exams');
  } else if (stream?.startsWith('Science (Biology)')) {
    skills.push('Prepare for NEET-UG for Medical / Dental courses');
    skills.push('Study Biology diagrams and lab techniques');
    skills.push('Explore paramedical career options (Nursing, Physio, Pharmacy)');
  } else if (stream?.startsWith('Science (Computer Science)')) {
    skills.push('Learn Python / JavaScript programming fundamentals');
    skills.push('Build projects on GitHub to showcase skills');
    skills.push('Practice DSA problems on LeetCode / HackerRank');
  } else if (stream?.startsWith('Commerce')) {
    skills.push('Learn Tally ERP / Microsoft Excel for accounting');
    skills.push('Study for CA Foundation / CMA Foundation exams');
    skills.push('Develop financial literacy and business communication');
  } else if (stream?.startsWith('Arts')) {
    skills.push('Prepare for UPSC / TNPSC civil services exams');
    skills.push('Develop essay writing and analytical thinking skills');
    skills.push('Read newspapers daily for current affairs');
  } else if (stream === 'Vocational') {
    skills.push('Get hands-on industry training and apprenticeships');
    skills.push('Explore ITI / Polytechnic diploma options');
    skills.push('Build practical skills portfolio for job placements');
  }

  // Course-specific skills for college students
  if (course?.toLowerCase().includes('computer') || course?.toLowerCase().includes('bca') || course?.toLowerCase().includes('btech')) {
    skills.push('Learn Python / JavaScript programming');
    skills.push('Build projects on GitHub to showcase skills');
  }
  if (course?.toLowerCase().includes('commerce') || course?.toLowerCase().includes('bcom') || course?.toLowerCase().includes('bba')) {
    skills.push('Learn Tally ERP / Microsoft Excel');
    skills.push('Study for CA Foundation or CMA');
  }

  skills.push('Build a strong LinkedIn profile and portfolio');
  skills.push('Get internship experience in your domain');
  skills.push('Develop English communication and soft skills');

  // Deduplicate and limit
  return [...new Set(skills)].slice(0, 6);
}
