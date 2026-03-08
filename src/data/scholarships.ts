export interface Scholarship {
  id: string;
  name: string;
  provider: string;
  category: 'Merit' | 'Income' | 'Community' | 'Sports' | 'Disability';
  type: 'Government of TN' | 'Central Government' | 'Private';
  eligibility: string;
  amount: string;
  deadline: string;
  applyLink: string;
  studentType: ('School' | 'UG' | 'PG' | 'PhD')[];
  description: string;
}

export const SCHOLARSHIPS: Scholarship[] = [
  {
    id: 'tn-bc-mbc',
    name: 'BC/MBC Scholarship',
    provider: 'Govt of Tamil Nadu',
    category: 'Community',
    type: 'Government of TN',
    eligibility: 'BC/MBC students with family income below ₹2 lakh',
    amount: '₹1,000 - ₹3,000 per year',
    deadline: 'October 2026',
    applyLink: 'https://www.scholarships.gov.in/',
    studentType: ['School', 'UG'],
    description: 'Financial assistance for Backward Class and Most Backward Class students studying in Tamil Nadu.'
  },
  {
    id: 'tn-sc-st',
    name: 'SC/ST Post-Matric Scholarship',
    provider: 'Govt of Tamil Nadu',
    category: 'Community',
    type: 'Government of TN',
    eligibility: 'SC/ST students with income below ₹2.5 lakh',
    amount: '₹5,000 - ₹12,000 per year',
    deadline: 'November 2026',
    applyLink: 'https://www.scholarships.gov.in/',
    studentType: ['UG', 'PG'],
    description: 'Post-matric scholarship for SC/ST students pursuing higher education in recognized institutions.'
  },
  {
    id: 'tn-first-graduate',
    name: 'First Graduate Scholarship',
    provider: 'Govt of Tamil Nadu',
    category: 'Merit',
    type: 'Government of TN',
    eligibility: 'First graduate in family, 60%+ in qualifying exam',
    amount: '₹5,000 per year',
    deadline: 'September 2026',
    applyLink: 'https://www.scholarships.gov.in/',
    studentType: ['UG'],
    description: 'Encourages first-generation learners to pursue undergraduate education.'
  },
  {
    id: 'tn-moovalur',
    name: 'Moovalur Ramamirtham Ammaiyar Scheme',
    provider: 'Govt of Tamil Nadu',
    category: 'Income',
    type: 'Government of TN',
    eligibility: 'Girl students from economically weaker sections',
    amount: '₹1,000 per month',
    deadline: 'December 2026',
    applyLink: 'https://www.scholarships.gov.in/',
    studentType: ['School', 'UG'],
    description: 'Financial support for girl students to prevent dropout and encourage higher education.'
  },
  {
    id: 'central-nsp-merit',
    name: 'National Scholarship Portal - Merit',
    provider: 'Ministry of Education',
    category: 'Merit',
    type: 'Central Government',
    eligibility: '80%+ marks in previous exam, income below ₹6 lakh',
    amount: '₹10,000 - ₹20,000 per year',
    deadline: 'January 2027',
    applyLink: 'https://scholarships.gov.in/',
    studentType: ['UG', 'PG'],
    description: 'Central government merit-cum-means scholarship for outstanding students across India.'
  },
  {
    id: 'central-inspire',
    name: 'INSPIRE Scholarship (DST)',
    provider: 'Dept of Science & Technology',
    category: 'Merit',
    type: 'Central Government',
    eligibility: 'Top 1% in Class 12 boards, pursuing BSc/Int. MSc',
    amount: '₹80,000 per year',
    deadline: 'October 2026',
    applyLink: 'https://online-inspire.gov.in/',
    studentType: ['UG'],
    description: 'Scholarship for high-achieving science students to pursue careers in research.'
  },
  {
    id: 'central-pmms',
    name: 'PM Merit Scholarship (PMMS)',
    provider: 'Ministry of Defence',
    category: 'Merit',
    type: 'Central Government',
    eligibility: 'Wards of ex-servicemen/defence personnel, 60%+ marks',
    amount: '₹2,500/month (boys), ₹3,000/month (girls)',
    deadline: 'October 2026',
    applyLink: 'https://scholarships.gov.in/',
    studentType: ['UG', 'PG'],
    description: 'Scholarship for children of ex-servicemen and defence personnel pursuing professional courses.'
  },
  {
    id: 'central-minority',
    name: 'Minority Community Scholarship',
    provider: 'Ministry of Minority Affairs',
    category: 'Community',
    type: 'Central Government',
    eligibility: 'Minority community students, income below ₹2 lakh',
    amount: '₹5,000 - ₹10,000 per year',
    deadline: 'November 2026',
    applyLink: 'https://scholarships.gov.in/',
    studentType: ['School', 'UG', 'PG'],
    description: 'Financial assistance for students belonging to minority communities.'
  },
  {
    id: 'private-tata-trust',
    name: 'Tata Trusts Scholarship',
    provider: 'Tata Trusts',
    category: 'Merit',
    type: 'Private',
    eligibility: 'Merit-based, family income below ₹4 lakh',
    amount: 'Up to ₹50,000 per year',
    deadline: 'March 2027',
    applyLink: 'https://www.tatatrusts.org/',
    studentType: ['UG', 'PG'],
    description: 'Comprehensive scholarship covering tuition and living expenses for meritorious students.'
  },
  {
    id: 'private-reliance',
    name: 'Reliance Foundation Scholarship',
    provider: 'Reliance Foundation',
    category: 'Merit',
    type: 'Private',
    eligibility: 'UG students in STEM, 60%+ marks',
    amount: 'Up to ₹2,00,000 per year',
    deadline: 'February 2027',
    applyLink: 'https://www.reliancefoundation.org/',
    studentType: ['UG'],
    description: 'Supports students pursuing undergraduate degrees in STEM fields.'
  },
  {
    id: 'private-hdfc',
    name: 'HDFC Parivartan Scholarship',
    provider: 'HDFC Bank',
    category: 'Income',
    type: 'Private',
    eligibility: 'Annual family income below ₹2.5 lakh, 55%+ marks',
    amount: 'Up to ₹75,000 per year',
    deadline: 'August 2026',
    applyLink: 'https://www.hdfcbank.com/personal/social-responsibility/',
    studentType: ['School', 'UG', 'PG'],
    description: 'Need-based scholarship for students from economically disadvantaged backgrounds.'
  },
  {
    id: 'tn-sports',
    name: 'TN Sports Scholarship',
    provider: 'Govt of Tamil Nadu',
    category: 'Sports',
    type: 'Government of TN',
    eligibility: 'State/National level sportspersons',
    amount: '₹10,000 - ₹25,000 per year',
    deadline: 'December 2026',
    applyLink: 'https://www.sdat.tn.gov.in/',
    studentType: ['School', 'UG'],
    description: 'Encourages talented sportspersons by providing financial support for education.'
  },
  {
    id: 'central-disability',
    name: 'Scholarship for Persons with Disabilities',
    provider: 'Ministry of Social Justice',
    category: 'Disability',
    type: 'Central Government',
    eligibility: 'Students with 40%+ disability, income below ₹2.5 lakh',
    amount: '₹7,000 - ₹15,000 per year',
    deadline: 'November 2026',
    applyLink: 'https://scholarships.gov.in/',
    studentType: ['School', 'UG', 'PG', 'PhD'],
    description: 'Financial assistance for differently-abled students pursuing education at any level.'
  },
  {
    id: 'private-sitaram',
    name: 'Sitaram Jindal Foundation Scholarship',
    provider: 'Sitaram Jindal Foundation',
    category: 'Income',
    type: 'Private',
    eligibility: 'Economically weaker, pursuing ITI/Diploma/Degree',
    amount: '₹600 - ₹2,400 per month',
    deadline: 'September 2026',
    applyLink: 'https://www.sitaramjindalfoundation.org/',
    studentType: ['UG', 'PG'],
    description: 'Monthly stipend for students from financially challenged backgrounds.'
  },
  {
    id: 'tn-free-education',
    name: 'TN Free Education for Government School Students',
    provider: 'Govt of Tamil Nadu',
    category: 'Income',
    type: 'Government of TN',
    eligibility: 'Government school students pursuing higher education',
    amount: 'Full tuition fee waiver',
    deadline: 'Rolling',
    applyLink: 'https://www.tn.gov.in/',
    studentType: ['UG'],
    description: 'Complete tuition fee waiver for government school students in TN government colleges.'
  },
  {
    id: 'central-ugc-net',
    name: 'UGC NET JRF Fellowship',
    provider: 'University Grants Commission',
    category: 'Merit',
    type: 'Central Government',
    eligibility: 'Cleared UGC NET with JRF',
    amount: '₹31,000/month + HRA',
    deadline: 'Based on NET exam cycle',
    applyLink: 'https://ugcnet.nta.nic.in/',
    studentType: ['PhD'],
    description: 'Junior Research Fellowship for PhD scholars who cleared UGC NET.'
  },
  {
    id: 'private-kotak',
    name: 'Kotak Kanya Scholarship',
    provider: 'Kotak Education Foundation',
    category: 'Merit',
    type: 'Private',
    eligibility: 'Girl students, 85%+ in Class 12, income below ₹3.2 lakh',
    amount: '₹1,50,000 per year',
    deadline: 'December 2026',
    applyLink: 'https://www.kotakeducation.org/',
    studentType: ['UG'],
    description: 'Empowering meritorious girl students to pursue professional education.'
  },
  {
    id: 'tn-adi-dravidar',
    name: 'Adi Dravidar Welfare Scholarship',
    provider: 'Govt of Tamil Nadu',
    category: 'Community',
    type: 'Government of TN',
    eligibility: 'Adi Dravidar community, pursuing professional courses',
    amount: '₹3,000 - ₹10,000 per year',
    deadline: 'October 2026',
    applyLink: 'https://www.scholarships.gov.in/',
    studentType: ['UG', 'PG'],
    description: 'Welfare scholarship for Adi Dravidar community students in professional courses.'
  },
  {
    id: 'central-ishan-uday',
    name: 'Ishan Uday Scholarship (NER)',
    provider: 'University Grants Commission',
    category: 'Merit',
    type: 'Central Government',
    eligibility: 'Students from North Eastern Region, family income below ₹4.5 lakh',
    amount: '₹5,400/month (general), ₹7,800/month (professional)',
    deadline: 'October 2026',
    applyLink: 'https://scholarships.gov.in/',
    studentType: ['UG'],
    description: 'Special scholarship for students from the North Eastern Region of India.'
  },
  {
    id: 'private-fair-lovely',
    name: 'ABCD Scholarship (Fair & Lovely)',
    provider: 'Hindustan Unilever',
    category: 'Income',
    type: 'Private',
    eligibility: 'Women students, family income below ₹6 lakh, pursuing graduation',
    amount: 'Up to ₹50,000',
    deadline: 'March 2027',
    applyLink: 'https://www.hul.co.in/',
    studentType: ['UG', 'PG'],
    description: 'Empowers women through financial support for education and skill development.'
  },
];
