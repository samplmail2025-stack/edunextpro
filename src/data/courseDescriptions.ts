import { Course } from '@/data/courses';

const categoryDescriptions: Record<string, string> = {
  Science: 'This program provides a strong foundation in scientific principles, laboratory techniques, and analytical thinking. Students develop critical research skills and gain hands-on experience through practical sessions and project work.',
  'Science & Technology': 'This technology-focused program combines theoretical computer science fundamentals with practical software development skills. Students learn programming, database management, networking, and emerging technologies.',
  Engineering: 'This engineering program emphasizes design, analysis, and problem-solving through a rigorous curriculum combining mathematics, physics, and domain-specific technical knowledge with hands-on lab work and industry projects.',
  Management: 'This management program develops future business leaders through case studies, industry internships, and a comprehensive curriculum covering finance, marketing, operations, and strategic management.',
  Commerce: 'This commerce program builds expertise in accounting, finance, taxation, and business law. Students develop analytical and numerical skills essential for careers in banking, auditing, and financial management.',
  Medical: 'This healthcare program trains future medical professionals through extensive clinical rotations, laboratory work, and patient-care experience, following a rigorous curriculum aligned with national medical standards.',
  Arts: 'This program develops critical thinking, communication, and analytical skills through in-depth study of humanities and social sciences. Students explore diverse perspectives and build strong research capabilities.',
  Law: 'This legal studies program provides comprehensive training in constitutional law, criminal law, civil procedures, and legal research. Students develop advocacy skills through moot courts and legal aid clinics.',
  Education: 'This education program prepares future teachers with pedagogical knowledge, classroom management skills, and modern teaching methodologies including technology-integrated learning approaches.',
  Research: 'This doctoral program focuses on advanced research methodology, original contribution to knowledge, and scholarly publication. Students work closely with expert supervisors on cutting-edge research topics.',
};

const categorySyllabus: Record<string, string[]> = {
  Science: ['Core Theory & Fundamentals', 'Laboratory Practicals', 'Research Methodology', 'Elective Specializations', 'Project Work / Dissertation', 'Seminar & Viva Voce'],
  'Science & Technology': ['Programming Languages (C, Java, Python)', 'Data Structures & Algorithms', 'Database Management Systems', 'Computer Networks', 'Software Engineering', 'Web Technologies', 'Operating Systems', 'Project Work'],
  Engineering: ['Engineering Mathematics', 'Core Technical Subjects', 'Design & Analysis', 'Laboratory Sessions', 'Industry Internship', 'Mini & Major Projects', 'Technical Seminars', 'Professional Ethics'],
  Management: ['Organizational Behavior', 'Financial Management', 'Marketing Management', 'Human Resource Management', 'Operations & Supply Chain', 'Business Analytics', 'Strategic Management', 'Industry Internship'],
  Commerce: ['Financial Accounting', 'Cost & Management Accounting', 'Business Law', 'Taxation (Direct & Indirect)', 'Auditing', 'Banking & Insurance', 'Business Statistics', 'Computer Applications'],
  Medical: ['Anatomy & Physiology', 'Biochemistry', 'Pathology & Microbiology', 'Pharmacology', 'Clinical Rotations', 'Community Medicine', 'Forensic Medicine', 'Internship Training'],
  Arts: ['Core Subject Papers', 'Complementary Subjects', 'Language Papers (Tamil/English)', 'Research Methodology', 'Field Work / Internship', 'Elective Papers', 'Project / Dissertation'],
  Law: ['Constitutional Law', 'Criminal Law & CrPC', 'Civil Procedure Code', 'Contract Law', 'Property Law', 'Legal Research & Writing', 'Moot Court Practice', 'Internship with Advocates/Courts'],
  Education: ['Educational Psychology', 'Pedagogy & Teaching Methods', 'Curriculum Development', 'Educational Technology', 'School Management', 'Micro-Teaching Sessions', 'Practice Teaching (Internship)', 'Assessment & Evaluation'],
  Research: ['Advanced Research Methodology', 'Literature Review & Survey', 'Core Specialization Courses', 'Coursework & Comprehensive Exam', 'Research Publication', 'Thesis / Dissertation', 'Defense & Viva Voce'],
};

export function getCourseDescription(course: Course): string {
  return categoryDescriptions[course.category] || categoryDescriptions.Science;
}

export function getCourseSyllabus(course: Course): string[] {
  return categorySyllabus[course.category] || categorySyllabus.Science;
}
