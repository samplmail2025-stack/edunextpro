export interface Course {
  id: string;
  name: string;
  level: 'UG' | 'PG' | 'PhD';
  category: string;
  duration: string;
  minPercentage: number;
  entranceExam: string | null;
  approxFees: string;
  careerScope: string[];
  stream?: string[];
}

export const COURSES: Course[] = [
  // UG Science
  { id: 'bsc-physics', name: 'B.Sc Physics', level: 'UG', category: 'Science', duration: '3 Years', minPercentage: 55, entranceExam: null, approxFees: '₹15,000 – ₹50,000/yr', careerScope: ['Research Scientist', 'Physics Teacher', 'Data Analyst', 'ISRO/DRDO'], stream: ['Science'] },
  { id: 'bsc-chemistry', name: 'B.Sc Chemistry', level: 'UG', category: 'Science', duration: '3 Years', minPercentage: 55, entranceExam: null, approxFees: '₹15,000 – ₹50,000/yr', careerScope: ['Chemist', 'Lab Analyst', 'Pharmacist', 'Quality Control'], stream: ['Science'] },
  { id: 'bsc-maths', name: 'B.Sc Mathematics', level: 'UG', category: 'Science', duration: '3 Years', minPercentage: 60, entranceExam: null, approxFees: '₹15,000 – ₹50,000/yr', careerScope: ['Actuary', 'Data Scientist', 'Bank PO', 'Teaching'], stream: ['Science'] },
  { id: 'bsc-cs', name: 'B.Sc Computer Science', level: 'UG', category: 'Science & Technology', duration: '3 Years', minPercentage: 55, entranceExam: null, approxFees: '₹20,000 – ₹80,000/yr', careerScope: ['Software Developer', 'Web Developer', 'Data Analyst', 'IT Support'], stream: ['Science'] },
  { id: 'bsc-bio', name: 'B.Sc Biology / Botany / Zoology', level: 'UG', category: 'Science', duration: '3 Years', minPercentage: 55, entranceExam: null, approxFees: '₹15,000 – ₹50,000/yr', careerScope: ['Biologist', 'Lab Technician', 'NEET PG prep', 'Teaching'], stream: ['Science'] },
  { id: 'bsc-it', name: 'B.Sc Information Technology', level: 'UG', category: 'Science & Technology', duration: '3 Years', minPercentage: 50, entranceExam: null, approxFees: '₹20,000 – ₹80,000/yr', careerScope: ['IT Support', 'Network Engineer', 'Developer', 'Database Admin'], stream: ['Science'] },
  { id: 'bsc-electronics', name: 'B.Sc Electronics', level: 'UG', category: 'Science', duration: '3 Years', minPercentage: 55, entranceExam: null, approxFees: '₹15,000 – ₹60,000/yr', careerScope: ['Electronics Technician', 'Embedded Systems', 'VLSI', 'IoT Developer'], stream: ['Science'] },
  { id: 'bsc-statistics', name: 'B.Sc Statistics', level: 'UG', category: 'Science', duration: '3 Years', minPercentage: 55, entranceExam: null, approxFees: '₹15,000 – ₹50,000/yr', careerScope: ['Statistician', 'Data Analyst', 'Actuary', 'Research Analyst'], stream: ['Science'] },
  { id: 'bsc-microbiology', name: 'B.Sc Microbiology', level: 'UG', category: 'Science', duration: '3 Years', minPercentage: 55, entranceExam: null, approxFees: '₹20,000 – ₹60,000/yr', careerScope: ['Microbiologist', 'Lab Technician', 'Food Industry', 'Research'], stream: ['Science'] },
  { id: 'bsc-biotech', name: 'B.Sc Biotechnology', level: 'UG', category: 'Science', duration: '3 Years', minPercentage: 55, entranceExam: null, approxFees: '₹25,000 – ₹80,000/yr', careerScope: ['Biotechnologist', 'Research Scientist', 'Pharma Industry', 'Agriculture Biotech'], stream: ['Science'] },
  { id: 'bsc-nutrition', name: 'B.Sc Nutrition & Dietetics', level: 'UG', category: 'Science', duration: '3 Years', minPercentage: 50, entranceExam: null, approxFees: '₹20,000 – ₹60,000/yr', careerScope: ['Nutritionist', 'Dietician', 'Hospital', 'Sports Nutrition'], stream: ['Science'] },
  { id: 'bsc-nursing', name: 'B.Sc Nursing', level: 'UG', category: 'Medical', duration: '4 Years', minPercentage: 55, entranceExam: 'State CET / NEET', approxFees: '₹30,000 – ₹2,00,000/yr', careerScope: ['Staff Nurse', 'Hospital Management', 'Community Health', 'Abroad Nursing'], stream: ['Science'] },
  { id: 'bsc-agriculture', name: 'B.Sc Agriculture', level: 'UG', category: 'Science', duration: '4 Years', minPercentage: 50, entranceExam: 'State CET', approxFees: '₹15,000 – ₹80,000/yr', careerScope: ['Agriculture Officer', 'Farm Manager', 'Agri Business', 'Research'], stream: ['Science'] },
  { id: 'bsc-visual-comm', name: 'B.Sc Visual Communication', level: 'UG', category: 'Arts', duration: '3 Years', minPercentage: 50, entranceExam: null, approxFees: '₹20,000 – ₹1,00,000/yr', careerScope: ['Journalist', 'Film Making', 'Advertising', 'PR'], stream: ['Arts', 'Science'] },

  // Engineering
  { id: 'btech-cse', name: 'B.Tech Computer Science', level: 'UG', category: 'Engineering', duration: '4 Years', minPercentage: 70, entranceExam: 'JEE / TNEA', approxFees: '₹50,000 – ₹2,00,000/yr', careerScope: ['Software Engineer', 'Data Scientist', 'AI Engineer', 'Product Manager'], stream: ['Science'] },
  { id: 'btech-ece', name: 'B.Tech Electronics & Communication', level: 'UG', category: 'Engineering', duration: '4 Years', minPercentage: 65, entranceExam: 'JEE / TNEA', approxFees: '₹50,000 – ₹2,00,000/yr', careerScope: ['Electronics Engineer', 'VLSI Design', 'Telecom', 'ISRO/DRDO'], stream: ['Science'] },
  { id: 'btech-mech', name: 'B.Tech Mechanical Engineering', level: 'UG', category: 'Engineering', duration: '4 Years', minPercentage: 65, entranceExam: 'JEE / TNEA', approxFees: '₹50,000 – ₹2,00,000/yr', careerScope: ['Mechanical Engineer', 'Automobile', 'Manufacturing', 'Design Engineer'], stream: ['Science'] },
  { id: 'btech-civil', name: 'B.Tech Civil Engineering', level: 'UG', category: 'Engineering', duration: '4 Years', minPercentage: 60, entranceExam: 'JEE / TNEA', approxFees: '₹40,000 – ₹1,50,000/yr', careerScope: ['Civil Engineer', 'Structural Engineer', 'Government Jobs', 'Urban Planning'], stream: ['Science'] },
  { id: 'btech-eee', name: 'B.Tech Electrical Engineering', level: 'UG', category: 'Engineering', duration: '4 Years', minPercentage: 65, entranceExam: 'JEE / TNEA', approxFees: '₹50,000 – ₹2,00,000/yr', careerScope: ['Electrical Engineer', 'Power Sector', 'TNEB/BESCOM', 'Railways'], stream: ['Science'] },
  { id: 'btech-it', name: 'B.Tech Information Technology', level: 'UG', category: 'Engineering', duration: '4 Years', minPercentage: 65, entranceExam: 'JEE / TNEA', approxFees: '₹50,000 – ₹2,00,000/yr', careerScope: ['IT Engineer', 'Full Stack Developer', 'DevOps', 'Cloud Engineer'], stream: ['Science'] },
  { id: 'btech-aiml', name: 'B.Tech AI & Machine Learning', level: 'UG', category: 'Engineering', duration: '4 Years', minPercentage: 70, entranceExam: 'JEE / TNEA', approxFees: '₹60,000 – ₹2,50,000/yr', careerScope: ['AI Engineer', 'ML Engineer', 'Data Scientist', 'Research Scientist'], stream: ['Science'] },
  { id: 'btech-biomedical', name: 'B.Tech Biomedical Engineering', level: 'UG', category: 'Engineering', duration: '4 Years', minPercentage: 60, entranceExam: 'JEE / TNEA', approxFees: '₹50,000 – ₹2,00,000/yr', careerScope: ['Biomedical Engineer', 'Medical Devices', 'Hospital Engineering', 'Research'], stream: ['Science'] },

  // Medical
  { id: 'mbbs', name: 'MBBS', level: 'UG', category: 'Medical', duration: '5.5 Years', minPercentage: 85, entranceExam: 'NEET-UG', approxFees: '₹10,000 – ₹20,00,000/yr', careerScope: ['Doctor', 'Surgeon', 'Medical Officer', 'Specialist'], stream: ['Science'] },
  { id: 'bds', name: 'BDS (Dental)', level: 'UG', category: 'Medical', duration: '5 Years', minPercentage: 75, entranceExam: 'NEET-UG', approxFees: '₹1,00,000 – ₹10,00,000/yr', careerScope: ['Dentist', 'Orthodontist', 'Oral Surgeon'], stream: ['Science'] },
  { id: 'bpharm', name: 'B.Pharm', level: 'UG', category: 'Medical', duration: '4 Years', minPercentage: 55, entranceExam: 'KEAM / State CET', approxFees: '₹30,000 – ₹1,50,000/yr', careerScope: ['Pharmacist', 'Drug Inspector', 'Clinical Research', 'Hospital Pharmacy'], stream: ['Science'] },
  { id: 'bams', name: 'BAMS (Ayurveda)', level: 'UG', category: 'Medical', duration: '5.5 Years', minPercentage: 60, entranceExam: 'NEET-UG', approxFees: '₹30,000 – ₹5,00,000/yr', careerScope: ['Ayurveda Doctor', 'Panchakarma Specialist', 'Wellness Consultant'], stream: ['Science'] },
  { id: 'bsms', name: 'BSMS (Siddha Medicine)', level: 'UG', category: 'Medical', duration: '5.5 Years', minPercentage: 60, entranceExam: 'NEET-UG', approxFees: '₹20,000 – ₹3,00,000/yr', careerScope: ['Siddha Doctor', 'Medical Officer', 'Research'], stream: ['Science'] },
  { id: 'bhms', name: 'BHMS (Homeopathy)', level: 'UG', category: 'Medical', duration: '5.5 Years', minPercentage: 60, entranceExam: 'NEET-UG', approxFees: '₹30,000 – ₹5,00,000/yr', careerScope: ['Homeopathy Doctor', 'Clinic Practice', 'Research'], stream: ['Science'] },
  { id: 'bpt', name: 'BPT (Physiotherapy)', level: 'UG', category: 'Medical', duration: '4.5 Years', minPercentage: 55, entranceExam: 'State CET', approxFees: '₹30,000 – ₹2,00,000/yr', careerScope: ['Physiotherapist', 'Sports Physio', 'Rehab Specialist', 'Hospital'], stream: ['Science'] },

  // Technology
  { id: 'bca', name: 'BCA', level: 'UG', category: 'Science & Technology', duration: '3 Years', minPercentage: 45, entranceExam: null, approxFees: '₹20,000 – ₹1,00,000/yr', careerScope: ['Software Developer', 'Web Designer', 'Database Admin', 'IT Support'], stream: ['Science', 'Commerce'] },

  // Commerce
  { id: 'bcom', name: 'B.Com', level: 'UG', category: 'Commerce', duration: '3 Years', minPercentage: 45, entranceExam: null, approxFees: '₹10,000 – ₹50,000/yr', careerScope: ['Accountant', 'CA Aspirant', 'Bank PO', 'Tax Consultant'], stream: ['Commerce', 'Arts'] },
  { id: 'bba', name: 'BBA', level: 'UG', category: 'Commerce', duration: '3 Years', minPercentage: 50, entranceExam: null, approxFees: '₹20,000 – ₹1,00,000/yr', careerScope: ['Business Manager', 'Marketing', 'HR Manager', 'Entrepreneur'], stream: ['Commerce', 'Arts'] },
  { id: 'bcom-ca', name: 'B.Com (CA)', level: 'UG', category: 'Commerce', duration: '3 Years', minPercentage: 50, entranceExam: null, approxFees: '₹15,000 – ₹60,000/yr', careerScope: ['Chartered Accountant', 'Tax Consultant', 'Auditor', 'Finance Manager'], stream: ['Commerce'] },
  { id: 'bcom-finance', name: 'B.Com Finance & Accounting', level: 'UG', category: 'Commerce', duration: '3 Years', minPercentage: 50, entranceExam: null, approxFees: '₹15,000 – ₹70,000/yr', careerScope: ['Financial Analyst', 'Investment Banker', 'CA', 'Auditor'], stream: ['Commerce'] },
  { id: 'bcom-banking', name: 'B.Com Banking & Insurance', level: 'UG', category: 'Commerce', duration: '3 Years', minPercentage: 50, entranceExam: null, approxFees: '₹15,000 – ₹60,000/yr', careerScope: ['Bank Officer', 'Insurance Advisor', 'Loan Officer', 'Financial Planner'], stream: ['Commerce'] },

  // Arts
  { id: 'ba-english', name: 'BA English', level: 'UG', category: 'Arts', duration: '3 Years', minPercentage: 45, entranceExam: null, approxFees: '₹10,000 – ₹40,000/yr', careerScope: ['Content Writer', 'Editor', 'Teacher', 'Media'], stream: ['Arts', 'Commerce'] },
  { id: 'ba-history', name: 'BA History', level: 'UG', category: 'Arts', duration: '3 Years', minPercentage: 40, entranceExam: null, approxFees: '₹10,000 – ₹40,000/yr', careerScope: ['Teacher', 'Civil Services', 'Museum Curator', 'Researcher'], stream: ['Arts'] },
  { id: 'ba-economics', name: 'BA Economics', level: 'UG', category: 'Arts', duration: '3 Years', minPercentage: 50, entranceExam: null, approxFees: '₹10,000 – ₹40,000/yr', careerScope: ['Economist', 'Bank Officer', 'Civil Services', 'Financial Analyst'], stream: ['Arts', 'Commerce'] },
  { id: 'ba-tamil', name: 'BA Tamil', level: 'UG', category: 'Arts', duration: '3 Years', minPercentage: 40, entranceExam: null, approxFees: '₹8,000 – ₹30,000/yr', careerScope: ['Tamil Teacher', 'Translator', 'Journalist', 'Content Creator'], stream: ['Arts'] },
  { id: 'ba-political-science', name: 'BA Political Science', level: 'UG', category: 'Arts', duration: '3 Years', minPercentage: 45, entranceExam: null, approxFees: '₹10,000 – ₹40,000/yr', careerScope: ['Civil Services', 'Political Analyst', 'Journalist', 'Lawyer'], stream: ['Arts'] },
  { id: 'ba-sociology', name: 'BA Sociology', level: 'UG', category: 'Arts', duration: '3 Years', minPercentage: 45, entranceExam: null, approxFees: '₹10,000 – ₹40,000/yr', careerScope: ['Social Worker', 'HR', 'Civil Services', 'NGO'], stream: ['Arts'] },
  { id: 'ba-social-work', name: 'BSW (Social Work)', level: 'UG', category: 'Arts', duration: '3 Years', minPercentage: 45, entranceExam: null, approxFees: '₹10,000 – ₹40,000/yr', careerScope: ['Social Worker', 'NGO Manager', 'Community Development', 'HR'], stream: ['Arts'] },
  { id: 'bdes', name: 'B.Des (Design)', level: 'UG', category: 'Arts', duration: '4 Years', minPercentage: 50, entranceExam: 'UCEED / NID DAT', approxFees: '₹50,000 – ₹3,00,000/yr', careerScope: ['UI/UX Designer', 'Product Designer', 'Fashion Designer', 'Graphic Designer'], stream: ['Arts', 'Science'] },

  // Law
  { id: 'llb', name: 'LLB (Law)', level: 'UG', category: 'Law', duration: '3 Years', minPercentage: 45, entranceExam: 'CLAT', approxFees: '₹20,000 – ₹1,00,000/yr', careerScope: ['Lawyer', 'Judge', 'Legal Advisor', 'Civil Services'], stream: ['Arts', 'Commerce', 'Science'] },
  { id: 'ballb', name: 'BA LLB (Integrated)', level: 'UG', category: 'Law', duration: '5 Years', minPercentage: 50, entranceExam: 'CLAT', approxFees: '₹30,000 – ₹2,00,000/yr', careerScope: ['Lawyer', 'Corporate Counsel', 'Judge', 'Civil Services'], stream: ['Arts', 'Commerce', 'Science'] },

  // Education
  { id: 'bed', name: 'B.Ed (Education)', level: 'UG', category: 'Education', duration: '2 Years', minPercentage: 50, entranceExam: 'State CET', approxFees: '₹15,000 – ₹80,000/yr', careerScope: ['School Teacher', 'TRB/TET', 'Education Counselor', 'Tutor'], stream: ['Arts', 'Science', 'Commerce'] },

  // PG Courses
  { id: 'msc-cs', name: 'M.Sc Computer Science', level: 'PG', category: 'Science & Technology', duration: '2 Years', minPercentage: 55, entranceExam: null, approxFees: '₹20,000 – ₹1,00,000/yr', careerScope: ['Software Engineer', 'Lecturer', 'Data Scientist', 'Research'] },
  { id: 'mba', name: 'MBA', level: 'PG', category: 'Management', duration: '2 Years', minPercentage: 50, entranceExam: 'CAT / MAT / XAT / TANCET', approxFees: '₹1,00,000 – ₹20,00,000/yr', careerScope: ['Business Manager', 'Marketing Head', 'Finance Manager', 'Consultant'] },
  { id: 'mca', name: 'MCA', level: 'PG', category: 'Science & Technology', duration: '2 Years', minPercentage: 55, entranceExam: null, approxFees: '₹30,000 – ₹1,50,000/yr', careerScope: ['Software Developer', 'System Analyst', 'Project Manager'] },
  { id: 'mtech', name: 'M.Tech', level: 'PG', category: 'Engineering', duration: '2 Years', minPercentage: 60, entranceExam: 'GATE', approxFees: '₹30,000 – ₹2,00,000/yr', careerScope: ['Senior Engineer', 'Research Scientist', 'Professor', 'ISRO/DRDO'] },
  { id: 'med', name: 'M.Ed', level: 'PG', category: 'Education', duration: '2 Years', minPercentage: 50, entranceExam: null, approxFees: '₹20,000 – ₹80,000/yr', careerScope: ['School Principal', 'Education Officer', 'University Lecturer', 'Curriculum Designer'] },
  { id: 'mcom', name: 'M.Com', level: 'PG', category: 'Commerce', duration: '2 Years', minPercentage: 50, entranceExam: null, approxFees: '₹15,000 – ₹60,000/yr', careerScope: ['Accountant', 'Finance Manager', 'Bank Officer', 'CA/CS'] },
  { id: 'ma-english', name: 'MA English', level: 'PG', category: 'Arts', duration: '2 Years', minPercentage: 50, entranceExam: null, approxFees: '₹10,000 – ₹50,000/yr', careerScope: ['Lecturer', 'Translator', 'Content Head', 'UGC NET'] },
  { id: 'msc-physics', name: 'M.Sc Physics', level: 'PG', category: 'Science', duration: '2 Years', minPercentage: 55, entranceExam: null, approxFees: '₹15,000 – ₹80,000/yr', careerScope: ['Physicist', 'Researcher', 'Lecturer', 'ISRO/DRDO'] },
  { id: 'msc-chemistry', name: 'M.Sc Chemistry', level: 'PG', category: 'Science', duration: '2 Years', minPercentage: 55, entranceExam: null, approxFees: '₹15,000 – ₹80,000/yr', careerScope: ['Chemist', 'Researcher', 'Pharma Industry', 'Lecturer'] },
  { id: 'msc-maths', name: 'M.Sc Mathematics', level: 'PG', category: 'Science', duration: '2 Years', minPercentage: 55, entranceExam: null, approxFees: '₹15,000 – ₹60,000/yr', careerScope: ['Mathematician', 'Actuary', 'Data Scientist', 'Lecturer'] },
  { id: 'msc-biotech', name: 'M.Sc Biotechnology', level: 'PG', category: 'Science', duration: '2 Years', minPercentage: 55, entranceExam: null, approxFees: '₹20,000 – ₹1,00,000/yr', careerScope: ['Biotechnologist', 'Research Scientist', 'Pharma R&D', 'Quality Analyst'] },
  { id: 'msw', name: 'MSW (Master of Social Work)', level: 'PG', category: 'Arts', duration: '2 Years', minPercentage: 50, entranceExam: null, approxFees: '₹15,000 – ₹60,000/yr', careerScope: ['Social Worker', 'HR Manager', 'NGO Director', 'Community Leader'] },
  { id: 'llm', name: 'LLM (Master of Law)', level: 'PG', category: 'Law', duration: '2 Years', minPercentage: 50, entranceExam: 'CLAT PG', approxFees: '₹20,000 – ₹2,00,000/yr', careerScope: ['Senior Advocate', 'Judge', 'Legal Researcher', 'Corporate Lawyer'] },

  // PhD
  { id: 'phd-cs', name: 'Ph.D Computer Science', level: 'PhD', category: 'Research', duration: '3–5 Years', minPercentage: 55, entranceExam: 'UGC-NET / CSIR', approxFees: '₹20,000 – ₹1,00,000/yr', careerScope: ['Professor', 'Research Scientist', 'AI Researcher', 'Tech Consultant'] },
  { id: 'phd-science', name: 'Ph.D Science', level: 'PhD', category: 'Research', duration: '3–5 Years', minPercentage: 55, entranceExam: 'UGC-NET / CSIR', approxFees: '₹20,000 – ₹1,00,000/yr', careerScope: ['Research Scientist', 'Professor', 'Government Researcher', 'ISRO/DRDO'] },
  { id: 'phd-management', name: 'Ph.D Management', level: 'PhD', category: 'Research', duration: '3–5 Years', minPercentage: 55, entranceExam: 'UGC-NET', approxFees: '₹30,000 – ₹2,00,000/yr', careerScope: ['Professor', 'Management Consultant', 'Research Director', 'Dean'] },
  { id: 'phd-arts', name: 'Ph.D Arts / Humanities', level: 'PhD', category: 'Research', duration: '3–5 Years', minPercentage: 55, entranceExam: 'UGC-NET', approxFees: '₹15,000 – ₹80,000/yr', careerScope: ['Professor', 'Researcher', 'Cultural Consultant', 'Author'] },
];

export function getCoursesByLevel(level: string) {
  return COURSES.filter((c) => c.level === level);
}

export function getCoursesByStream(stream: string) {
  return COURSES.filter((c) => !c.stream || c.stream.includes(stream));
}
