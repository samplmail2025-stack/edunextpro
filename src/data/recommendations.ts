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
  const { percentage, stream, level, studentType } = ctx;

  return COURSES.filter((course) => {
    if (percentage < course.minPercentage) return false;

    // School student → UG courses with stream-specific matching
    if (studentType === 'school') {
      if (course.level !== 'UG') return false;
      if (stream && course.stream && course.stream.length > 0) {
        const tags = getStreamTags(stream);
        // Course must match at least one of the student's stream tags
        const matches = tags.length === 0 || course.stream.some(s => tags.includes(s));
        if (!matches) return false;
      }
      return true;
    }

    if (level === 'UG') return course.level === 'PG';
    if (level === 'PG') return course.level === 'PhD';
    return false;
  }).slice(0, 15);
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
