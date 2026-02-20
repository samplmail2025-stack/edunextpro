export interface Job {
  id: string;
  title: string;
  category: 'Government' | 'Private' | 'Internship' | 'Skill-based';
  organization: string;
  qualification: string[];
  skills: string[];
  salaryRange: string;
  applyLink: string;
  prepResources: string[];
  deadline?: string;
  location: string;
  minCGPA?: number;
  minPercentage?: number;
}

export const JOBS: Job[] = [
  // Government
  { id: 'tnpsc-group2', title: 'TNPSC Group II', category: 'Government', organization: 'Tamil Nadu Public Service Commission', qualification: ['Any Degree'], skills: ['General Knowledge', 'Tamil', 'Aptitude', 'Reasoning'], salaryRange: '₹35,900 – ₹1,13,200/month', applyLink: 'https://www.tnpsc.gov.in', prepResources: ['TNPSC Official Books', 'Samacheer Books', 'Online Mock Tests'], location: 'Tamil Nadu', minPercentage: 50 },
  { id: 'tnpsc-group4', title: 'TNPSC Group IV', category: 'Government', organization: 'Tamil Nadu Public Service Commission', qualification: ['10th Pass', 'Any Degree'], skills: ['General Knowledge', 'Tamil', 'Aptitude'], salaryRange: '₹15,700 – ₹50,000/month', applyLink: 'https://www.tnpsc.gov.in', prepResources: ['TNPSC Study Materials', 'Samacheer Books', 'GK Books'], location: 'Tamil Nadu' },
  { id: 'ssc-cgl', title: 'SSC CGL', category: 'Government', organization: 'Staff Selection Commission', qualification: ['Any Degree'], skills: ['Quantitative Aptitude', 'English', 'GK', 'Reasoning'], salaryRange: '₹25,500 – ₹1,51,100/month', applyLink: 'https://ssc.nic.in', prepResources: ['SSC CGL Books', 'RS Aggarwal', 'Mock Tests'], location: 'Pan India', minPercentage: 50 },
  { id: 'bank-po', title: 'Bank PO (IBPS)', category: 'Government', organization: 'IBPS – Indian Banks', qualification: ['Any Degree'], skills: ['Quantitative Aptitude', 'English', 'Reasoning', 'Banking Awareness'], salaryRange: '₹36,000 – ₹63,840/month', applyLink: 'https://www.ibps.in', prepResources: ['IBPS PO Books', 'Mrunal.org', 'Bankersadda'], location: 'Pan India', minPercentage: 55 },
  { id: 'upsc-ias', title: 'UPSC Civil Services (IAS/IPS/IFS)', category: 'Government', organization: 'Union Public Service Commission', qualification: ['Any Degree'], skills: ['Essay Writing', 'Current Affairs', 'Optional Subject', 'Interview'], salaryRange: '₹56,100 – ₹2,50,000/month', applyLink: 'https://upsc.gov.in', prepResources: ['NCERT Books', 'The Hindu Newspaper', 'Insights IAS', 'Mrunal'], location: 'Pan India', minPercentage: 45 },
  { id: 'tneb-ae', title: 'TNEB Assistant Engineer', category: 'Government', organization: 'Tamil Nadu Electricity Board', qualification: ['B.Tech EEE/ECE/Mech'], skills: ['Electrical Engineering', 'Circuit Analysis', 'Power Systems'], salaryRange: '₹50,000 – ₹1,20,000/month', applyLink: 'https://www.tangedco.gov.in', prepResources: ['TNEB AE Books', 'Previous Papers', 'GATE Materials'], location: 'Tamil Nadu', minPercentage: 60 },
  { id: 'railways-rrb', title: 'RRB JE / Group D', category: 'Government', organization: 'Indian Railways', qualification: ['Diploma', 'B.Tech', 'Any Degree'], skills: ['Technical Knowledge', 'Aptitude', 'GK'], salaryRange: '₹19,900 – ₹63,200/month', applyLink: 'https://indianrailways.gov.in', prepResources: ['RRB Books', 'Previous Papers', 'Mock Tests'], location: 'Pan India' },
  { id: 'tnspc-teacher', title: 'TN Teacher Recruitment (TRB)', category: 'Government', organization: 'Tamil Nadu Teachers Recruitment Board', qualification: ['B.Ed', 'Any Degree with B.Ed'], skills: ['Subject Knowledge', 'Teaching Methods', 'Tamil/English'], salaryRange: '₹20,600 – ₹75,000/month', applyLink: 'https://trb.tn.nic.in', prepResources: ['TRB Study Materials', 'Samacheer Books', 'Mock Tests'], location: 'Tamil Nadu' },

  // Private
  { id: 'tcs-ninja', title: 'TCS Ninja (Software Engineer)', category: 'Private', organization: 'Tata Consultancy Services', qualification: ['B.Tech', 'B.Sc CS/IT', 'BCA', 'MCA'], skills: ['C/C++', 'Java', 'Python', 'Data Structures', 'SQL'], salaryRange: '₹3.36 – ₹7 LPA', applyLink: 'https://www.tcs.com/careers', prepResources: ['TCS NQT Practice', 'HackerRank', 'GeeksForGeeks'], location: 'Pan India', minCGPA: 6.0 },
  { id: 'infosys-systems', title: 'Systems Engineer – Infosys', category: 'Private', organization: 'Infosys', qualification: ['B.Tech', 'B.Sc', 'BCA', 'MCA'], skills: ['Java', 'Python', 'SQL', 'Problem Solving'], salaryRange: '₹3.6 – ₹8 LPA', applyLink: 'https://www.infosys.com/careers', prepResources: ['InfyTQ Platform', 'LeetCode', 'HackerRank'], location: 'Pan India', minCGPA: 6.5 },
  { id: 'wipro-elite', title: 'Wipro ELITE (Software Engineer)', category: 'Private', organization: 'Wipro', qualification: ['B.Tech', 'B.Sc CS/IT', 'BCA'], skills: ['C/Java/Python', 'Aptitude', 'Communication'], salaryRange: '₹3.5 – ₹6.5 LPA', applyLink: 'https://careers.wipro.com', prepResources: ['Wipro NLTH Practice', 'HackerEarth', 'GeeksForGeeks'], location: 'Pan India', minCGPA: 6.0 },
  { id: 'accenture', title: 'Associate Software Engineer – Accenture', category: 'Private', organization: 'Accenture', qualification: ['Any Degree'], skills: ['Communication', 'Aptitude', 'Basic Programming'], salaryRange: '₹4.5 – ₹7 LPA', applyLink: 'https://www.accenture.com/in-en/careers', prepResources: ['Accenture Practice', 'InterviewBit', 'Mock Tests'], location: 'Pan India', minCGPA: 5.5 },
  { id: 'hcl-tech', title: 'Software Engineer – HCL Technologies', category: 'Private', organization: 'HCL Technologies', qualification: ['B.Tech', 'B.Sc', 'MCA'], skills: ['Java/Python', 'Web Development', 'SQL'], salaryRange: '₹3.5 – ₹6 LPA', applyLink: 'https://www.hcltech.com/careers', prepResources: ['HCL Recruitment Guides', 'Previous Papers', 'GeeksForGeeks'], location: 'Pan India', minCGPA: 6.0 },
  { id: 'deloitte', title: 'Analyst – Deloitte', category: 'Private', organization: 'Deloitte', qualification: ['B.Com', 'BBA', 'B.Tech', 'MBA'], skills: ['Finance', 'Consulting', 'Excel', 'Communication'], salaryRange: '₹6 – ₹12 LPA', applyLink: 'https://www2.deloitte.com/in/en/careers.html', prepResources: ['Case Study Prep', 'HR Interview Guides', 'Finance Books'], location: 'Pan India', minCGPA: 7.0 },

  // Internships
  { id: 'google-intern', title: 'Software Engineering Intern – Google', category: 'Internship', organization: 'Google India', qualification: ['B.Tech 2nd/3rd Year', 'M.Tech'], skills: ['Algorithms', 'Data Structures', 'C++/Java/Python', 'Problem Solving'], salaryRange: '₹80,000 – ₹1,50,000/month', applyLink: 'https://careers.google.com/students', prepResources: ['LeetCode', 'Codeforces', 'Google STEP'], location: 'Hyderabad / Bangalore', minCGPA: 7.5 },
  { id: 'amazon-intern', title: 'SDE Intern – Amazon', category: 'Internship', organization: 'Amazon', qualification: ['B.Tech 2nd/3rd Year'], skills: ['DSA', 'System Design Basics', 'OOP', 'Problem Solving'], salaryRange: '₹60,000 – ₹1,20,000/month', applyLink: 'https://amazon.jobs/en/teams/internships-for-students', prepResources: ['LeetCode', 'GeeksForGeeks', 'Amazon Leadership Principles'], location: 'Bangalore / Hyderabad', minCGPA: 7.0 },
  { id: 'microsoft-intern', title: 'SWE Intern – Microsoft', category: 'Internship', organization: 'Microsoft India', qualification: ['B.Tech 2nd/3rd Year', 'M.Tech'], skills: ['Coding', 'Algorithms', 'Azure Basics'], salaryRange: '₹70,000 – ₹1,40,000/month', applyLink: 'https://careers.microsoft.com/students/us/en/india', prepResources: ['LeetCode', 'GitHub Projects', 'Azure Learn'], location: 'Hyderabad', minCGPA: 7.0 },
  { id: 'internshala', title: 'Various Internships – Internshala', category: 'Internship', organization: 'Multiple Companies', qualification: ['Any Student'], skills: ['Domain-specific', 'Communication', 'Basic Tools'], salaryRange: '₹5,000 – ₹30,000/month', applyLink: 'https://internshala.com', prepResources: ['Internshala Training', 'Online Courses'], location: 'Remote / Pan India' },

  // Skill-based
  { id: 'freelance-dev', title: 'Freelance Web Developer', category: 'Skill-based', organization: 'Freelance / Upwork / Fiverr', qualification: ['Any Background'], skills: ['React', 'Node.js', 'HTML/CSS', 'JavaScript', 'Portfolio'], salaryRange: '₹20,000 – ₹2,00,000/month', applyLink: 'https://www.upwork.com', prepResources: ['freeCodeCamp', 'The Odin Project', 'YouTube Tutorials'], location: 'Remote' },
  { id: 'content-creator', title: 'Content Creator / YouTuber', category: 'Skill-based', organization: 'Self Employed', qualification: ['Any Background'], skills: ['Video Editing', 'SEO', 'Social Media', 'Speaking'], salaryRange: '₹10,000 – ₹5,00,000/month', applyLink: 'https://www.youtube.com/creators', prepResources: ['YouTube Creator Academy', 'VidIQ', 'Canva'], location: 'Remote' },
];

export function getJobsByCategory(category: string): Job[] {
  return JOBS.filter((j) => j.category === category);
}

export function getJobsByQualification(percentage: number, cgpa?: number): Job[] {
  return JOBS.filter((j) => {
    const meetsPercentage = !j.minPercentage || percentage >= j.minPercentage;
    const meetsCGPA = !j.minCGPA || !cgpa || cgpa >= j.minCGPA;
    return meetsPercentage && meetsCGPA;
  });
}
