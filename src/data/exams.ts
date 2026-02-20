export interface Exam {
  id: string;
  name: string;
  fullName: string;
  level: 'National' | 'State' | 'University';
  category: string;
  eligibility: string;
  frequency: string;
  website: string;
  description: string;
  importantDates: string;
}

export const ENTRANCE_EXAMS: Exam[] = [
  { id: 'neet', name: 'NEET-UG', fullName: 'National Eligibility cum Entrance Test (UG)', level: 'National', category: 'Medical', eligibility: '10+2 with Physics, Chemistry, Biology (min 50%)', frequency: 'Once a year', website: 'https://neet.nta.nic.in', description: 'Mandatory entrance test for MBBS, BDS, BAMS, BSMS, and other medical courses in India.', importantDates: 'Application: Dec-Jan | Exam: May | Results: June' },
  { id: 'jee-main', name: 'JEE Main', fullName: 'Joint Entrance Examination Main', level: 'National', category: 'Engineering', eligibility: '10+2 with PCM (min 75% or top 20 percentile)', frequency: 'Twice a year (Jan & April)', website: 'https://jeemain.nta.nic.in', description: 'Entrance test for NITs, IIITs, CFTIs, and qualifying for JEE Advanced (IITs).', importantDates: 'Session 1: Nov-Dec registration, Jan exam | Session 2: Feb-Mar registration, April exam' },
  { id: 'jee-advanced', name: 'JEE Advanced', fullName: 'Joint Entrance Examination Advanced', level: 'National', category: 'Engineering', eligibility: 'Top 2.5 Lakh JEE Main qualifiers, 12th PCM min 75%', frequency: 'Once a year', website: 'https://jeeadv.ac.in', description: 'Entrance test exclusively for IIT admissions across India.', importantDates: 'May-June registration | June exam' },
  { id: 'tnea', name: 'TNEA', fullName: 'Tamil Nadu Engineering Admissions', level: 'State', category: 'Engineering', eligibility: '10+2 with PCM/PCB in Tamil Nadu', frequency: 'Once a year', website: 'https://www.tneaonline.org', description: 'Engineering admissions in Tamil Nadu through merit basis (no entrance test).', importantDates: 'Application: May | Counselling: June-July' },
  { id: 'cat', name: 'CAT', fullName: 'Common Admission Test', level: 'National', category: 'MBA', eligibility: 'Any Degree (min 50%) – Graduates/Final Year', frequency: 'Once a year (November)', website: 'https://iimcat.ac.in', description: 'Entrance test for MBA admissions at IIMs and top B-Schools in India.', importantDates: 'Registration: July-Sept | Exam: November | Results: January' },
  { id: 'gate', name: 'GATE', fullName: 'Graduate Aptitude Test in Engineering', level: 'National', category: 'M.Tech / PSU Jobs', eligibility: 'B.Tech / B.Sc in relevant field', frequency: 'Once a year (February)', website: 'https://gate.iisc.ac.in', description: 'Entrance for M.Tech admissions and PSU recruitment (ONGC, BHEL, IOCL, etc.).', importantDates: 'Registration: Aug-Oct | Exam: Feb | Results: March' },
  { id: 'ugc-net', name: 'UGC NET', fullName: 'University Grants Commission NET', level: 'National', category: 'Lecturership / Ph.D', eligibility: 'PG degree with min 55%', frequency: 'Twice a year (June & December)', website: 'https://ugcnet.nta.nic.in', description: 'Qualifying test for Assistant Professor and Junior Research Fellowship (JRF) eligibility.', importantDates: 'Registration: March & August | Results: 3 months after exam' },
  { id: 'clat', name: 'CLAT', fullName: 'Common Law Admission Test', level: 'National', category: 'Law', eligibility: '10+2 for 5-year LLB, Graduation for LLM', frequency: 'Once a year (December)', website: 'https://consortiumofnlus.ac.in', description: 'Entrance for National Law Universities (NLUs) for LLB and LLM programs.', importantDates: 'Registration: June-Oct | Exam: December | Results: December' },
  { id: 'mat', name: 'MAT', fullName: 'Management Aptitude Test', level: 'National', category: 'MBA', eligibility: 'Any Degree (min 50%)', frequency: 'Multiple times a year', website: 'https://mat.aima.in', description: 'MBA entrance test accepted by 600+ B-schools across India.', importantDates: 'Multiple sessions: Feb, May, Sept, Dec' },
];
