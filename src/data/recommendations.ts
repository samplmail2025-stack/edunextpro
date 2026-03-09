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
  const cls = ctx.class;
  const skills: string[] = [];

  if (percentage < 60) {
    skills.push('Focus on core subject understanding with NCERT / Textbooks');
    skills.push('Practice previous year question papers daily');
  }

  // 10th class students: general guidance
  if (cls === '10th') {
    skills.push('Explore different 11th/12th streams to find your interest');
    skills.push('Develop strong fundamentals in Maths, Science & English');
    skills.push('Take aptitude tests to discover your strengths');
    skills.push('Build good study habits and time management skills');
  }

  // Stream-specific skills for 11th/12th school students
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
  } else if (stream === 'Diploma') {
    skills.push('Get hands-on industry training and apprenticeships');
    skills.push('Explore ITI / Polytechnic diploma options');
    skills.push('Build practical skills portfolio for job placements');
  }

  // Course-specific skills for college students
  if (course) {
    const cl = course.toLowerCase();
    if (cl.includes('computer') || cl.includes('bca') || cl.includes('btech') || cl.includes('it') || cl.includes('bsc cs')) {
      skills.push('Master Data Structures & Algorithms');
      skills.push('Build full-stack projects on GitHub');
      skills.push('Learn cloud computing (AWS/Azure) basics');
    } else if (cl.includes('commerce') || cl.includes('bcom') || cl.includes('bba') || cl.includes('mba')) {
      skills.push('Learn Tally ERP / Microsoft Excel');
      skills.push('Study for CA Foundation or CMA');
      skills.push('Develop financial analysis skills');
    } else if (cl.includes('arts') || cl.includes('history') || cl.includes('english') || cl.includes('political')) {
      skills.push('Prepare for UPSC / TNPSC civil services');
      skills.push('Develop essay writing and analytical thinking');
      skills.push('Read newspapers daily for current affairs');
    } else if (cl.includes('medical') || cl.includes('mbbs') || cl.includes('nursing') || cl.includes('pharmacy') || cl.includes('bio')) {
      skills.push('Prepare for NEET-PG / relevant PG entrance exams');
      skills.push('Get clinical exposure through internships');
    } else if (cl.includes('engineering') || cl.includes('be ') || cl.includes('b.e')) {
      skills.push('Prepare for GATE exam for higher studies');
      skills.push('Build industry projects and get internships');
    } else if (cl.includes('law') || cl.includes('llb')) {
      skills.push('Practice moot court and legal drafting');
      skills.push('Prepare for CLAT / Judiciary exams');
    } else if (cl.includes('education') || cl.includes('b.ed') || cl.includes('bed')) {
      skills.push('Prepare for TET / CTET teaching exams');
      skills.push('Develop classroom management skills');
    }
  }

  skills.push('Build a strong LinkedIn profile and portfolio');
  skills.push('Get internship experience in your domain');
  skills.push('Develop English communication and soft skills');

  return [...new Set(skills)].slice(0, 6);
}
