export interface InterviewQuestion {
  id: string;
  question: string;
  answer: string;
  tips: string;
  category: 'HR' | 'Technical' | 'Group Discussion' | 'Government Exam';
  jobType: ('Government' | 'Private' | 'Internship' | 'Skill-based')[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export const INTERVIEW_QUESTIONS: InterviewQuestion[] = [
  // HR Questions
  {
    id: 'hr-1',
    question: 'Tell me about yourself.',
    answer: 'Start with your education, mention key skills relevant to the role, briefly touch on any projects or internships, and end with what motivates you. Keep it under 2 minutes.',
    tips: 'Practice a structured response: Present → Past → Future. Avoid personal life details unless relevant.',
    category: 'HR',
    jobType: ['Government', 'Private', 'Internship'],
    difficulty: 'Easy'
  },
  {
    id: 'hr-2',
    question: 'Why should we hire you?',
    answer: 'Highlight 2-3 specific skills or experiences that match the job requirements. Show enthusiasm and mention how you can add value to the team.',
    tips: 'Research the company beforehand. Connect your strengths directly to their needs.',
    category: 'HR',
    jobType: ['Private', 'Internship'],
    difficulty: 'Medium'
  },
  {
    id: 'hr-3',
    question: 'What are your strengths and weaknesses?',
    answer: 'Pick strengths relevant to the role (problem-solving, teamwork, quick learner). For weaknesses, choose something genuine but show how you\'re improving.',
    tips: 'Never say "I have no weaknesses." Be honest but strategic — pick a weakness that isn\'t critical for the role.',
    category: 'HR',
    jobType: ['Government', 'Private', 'Internship'],
    difficulty: 'Easy'
  },
  {
    id: 'hr-4',
    question: 'Where do you see yourself in 5 years?',
    answer: 'Show growth ambition aligned with the company. For freshers: "I want to become an expert in [field] and take on leadership responsibilities."',
    tips: 'Avoid saying you want to start your own business or switch careers. Show commitment.',
    category: 'HR',
    jobType: ['Private', 'Government'],
    difficulty: 'Easy'
  },
  {
    id: 'hr-5',
    question: 'Why do you want to work here?',
    answer: 'Research the company culture, recent projects, and values. Connect them to your career goals and interests.',
    tips: 'Mention specific things about the company — don\'t give generic answers that could apply anywhere.',
    category: 'HR',
    jobType: ['Private', 'Internship'],
    difficulty: 'Easy'
  },
  {
    id: 'hr-6',
    question: 'How do you handle pressure and stress?',
    answer: 'Give a specific example from college/projects. Explain your approach: prioritize tasks, break problems down, stay calm, ask for help when needed.',
    tips: 'Use the STAR method (Situation, Task, Action, Result) to structure your answer.',
    category: 'HR',
    jobType: ['Government', 'Private', 'Internship'],
    difficulty: 'Medium'
  },
  {
    id: 'hr-7',
    question: 'What is your expected salary?',
    answer: 'For freshers: "I\'m flexible and willing to accept the industry standard. My priority is learning and growth." Or research and give a range.',
    tips: 'Research salary ranges on Glassdoor/AmbitionBox before the interview. Never undersell yourself.',
    category: 'HR',
    jobType: ['Private', 'Internship'],
    difficulty: 'Medium'
  },
  {
    id: 'hr-8',
    question: 'Describe a time you worked in a team.',
    answer: 'Share a college project or event experience. Highlight your role, how you collaborated, handled conflicts, and the outcome.',
    tips: 'Focus on what YOU contributed, not just what the team did. Show leadership and cooperation.',
    category: 'HR',
    jobType: ['Private', 'Internship', 'Government'],
    difficulty: 'Medium'
  },

  // Technical Questions
  {
    id: 'tech-1',
    question: 'Explain any project you have worked on.',
    answer: 'Structure: Problem Statement → Technologies Used → Your Role → Challenges Faced → Results/Impact. Keep technical depth appropriate for the audience.',
    tips: 'Know your project inside out. Be ready for follow-up questions on design decisions.',
    category: 'Technical',
    jobType: ['Private', 'Internship'],
    difficulty: 'Medium'
  },
  {
    id: 'tech-2',
    question: 'What programming languages do you know?',
    answer: 'List languages you\'re comfortable with, starting with the strongest. Mention specific projects or use cases for each.',
    tips: 'Be honest — only mention languages you can code in if asked. Quality over quantity.',
    category: 'Technical',
    jobType: ['Private', 'Internship'],
    difficulty: 'Easy'
  },
  {
    id: 'tech-3',
    question: 'What is the difference between SQL and NoSQL databases?',
    answer: 'SQL: structured, relational, ACID compliant (MySQL, PostgreSQL). NoSQL: flexible schema, horizontal scaling (MongoDB, Redis). Choose based on data structure and scale needs.',
    tips: 'Give real-world examples of when you\'d use each. Mention trade-offs.',
    category: 'Technical',
    jobType: ['Private', 'Internship'],
    difficulty: 'Medium'
  },
  {
    id: 'tech-4',
    question: 'Explain Object-Oriented Programming concepts.',
    answer: 'Four pillars: Encapsulation (data hiding), Inheritance (code reuse), Polymorphism (many forms), Abstraction (hiding complexity). Give examples for each.',
    tips: 'Use simple real-world analogies. Be ready to write code examples.',
    category: 'Technical',
    jobType: ['Private', 'Internship'],
    difficulty: 'Medium'
  },
  {
    id: 'tech-5',
    question: 'How would you optimize a slow application?',
    answer: 'Steps: Profile to find bottlenecks → Optimize database queries (indexing) → Caching → Code optimization → CDN for static assets → Load balancing.',
    tips: 'Show systematic thinking. Don\'t jump to solutions without diagnosing first.',
    category: 'Technical',
    jobType: ['Private'],
    difficulty: 'Hard'
  },
  {
    id: 'tech-6',
    question: 'What is an API and how does it work?',
    answer: 'API (Application Programming Interface) allows two systems to communicate. REST APIs use HTTP methods (GET, POST, PUT, DELETE) to perform CRUD operations. Data is usually exchanged in JSON format.',
    tips: 'Mention any APIs you\'ve used in projects. Understanding REST vs GraphQL is a plus.',
    category: 'Technical',
    jobType: ['Private', 'Internship'],
    difficulty: 'Easy'
  },

  // Group Discussion
  {
    id: 'gd-1',
    question: 'How to start a Group Discussion effectively?',
    answer: 'Start with a fact/statistic, a relevant quote, or a brief definition. Take a clear stance and outline 2-3 points you\'ll cover.',
    tips: 'Starting a GD gives you an advantage but only if done well. Don\'t start if you\'re unsure about the topic.',
    category: 'Group Discussion',
    jobType: ['Government', 'Private'],
    difficulty: 'Medium'
  },
  {
    id: 'gd-2',
    question: 'How to handle disagreements in a GD?',
    answer: 'Say "I respectfully disagree because..." followed by facts. Never get personal. Acknowledge the other person\'s point before presenting yours.',
    tips: 'Stay calm and composed. Evaluators watch for emotional intelligence, not just knowledge.',
    category: 'Group Discussion',
    jobType: ['Government', 'Private'],
    difficulty: 'Medium'
  },
  {
    id: 'gd-3',
    question: 'What are common GD topics for freshers?',
    answer: 'Current affairs (Digital India, NEP 2020), Technology (AI impact on jobs), Social issues (Education system reform), Abstract topics (Blue vs Red).',
    tips: 'Read newspapers daily. Have 3-4 points ready on trending topics. Practice speaking for 1-2 minutes on any topic.',
    category: 'Group Discussion',
    jobType: ['Government', 'Private', 'Internship'],
    difficulty: 'Easy'
  },
  {
    id: 'gd-4',
    question: 'How to summarize a Group Discussion?',
    answer: 'Cover all major points discussed (for and against), mention unique insights shared, and give a balanced conclusion. Keep it under 1 minute.',
    tips: 'Summarizing is a golden opportunity. Take notes during the GD to capture all points.',
    category: 'Group Discussion',
    jobType: ['Government', 'Private'],
    difficulty: 'Medium'
  },

  // Government Exam Tips
  {
    id: 'gov-1',
    question: 'How to prepare for TNPSC Group exams?',
    answer: 'Focus on: Tamil Nadu History & Culture, Indian Polity, Geography, Current Affairs, Aptitude. Use TNPSC previous year papers. Study 6th-12th TN textbooks.',
    tips: 'Start with Samacheer Kalvi textbooks. Join a test series. Cover current affairs from The Hindu/Dinamani daily.',
    category: 'Government Exam',
    jobType: ['Government'],
    difficulty: 'Medium'
  },
  {
    id: 'gov-2',
    question: 'What is the UPSC preparation strategy for beginners?',
    answer: 'Start with NCERTs (6th-12th). Cover: History, Geography, Polity, Economy, Science, Ethics. Read The Hindu daily. Practice answer writing from Day 1.',
    tips: 'Don\'t join coaching immediately. Self-study for 3-6 months first. Focus on understanding concepts, not rote learning.',
    category: 'Government Exam',
    jobType: ['Government'],
    difficulty: 'Hard'
  },
  {
    id: 'gov-3',
    question: 'How to crack SSC CGL exam?',
    answer: 'Four tiers: Tier 1 (Reasoning, GK, Quant, English), Tier 2 (Advanced Quant, English, Statistics), Tier 3 (Descriptive), Tier 4 (Skill test). Practice 50+ mock tests.',
    tips: 'Speed and accuracy matter most. Practice with timer. Focus on Quant and Reasoning — they have highest weightage.',
    category: 'Government Exam',
    jobType: ['Government'],
    difficulty: 'Medium'
  },
  {
    id: 'gov-4',
    question: 'What are important topics for Bank PO exams?',
    answer: 'Key areas: Reasoning Ability, Quantitative Aptitude, English Language, General/Banking Awareness, Computer Knowledge. Practice DI and puzzles daily.',
    tips: 'Banking awareness is often neglected but easy to score. Read RBI circulars and banking news weekly.',
    category: 'Government Exam',
    jobType: ['Government'],
    difficulty: 'Medium'
  },
  {
    id: 'gov-5',
    question: 'How to prepare for TRB (Teachers Recruitment Board)?',
    answer: 'Focus on: Subject expertise (70% weightage), Educational Psychology, Teaching Methodology, Tamil Nadu educational policies. Study B.Ed syllabus thoroughly.',
    tips: 'Previous year papers are gold. The pattern repeats. Join study groups for peer discussion.',
    category: 'Government Exam',
    jobType: ['Government'],
    difficulty: 'Medium'
  },
  {
    id: 'gov-6',
    question: 'Tips for TNPSC Interview / Personality Test?',
    answer: 'Be confident, dress formally, know your DAF (Detailed Application Form) well. Common questions: About your district, why government service, current affairs in TN.',
    tips: 'Practice mock interviews. Know everything on your biodata — they will ask about hobbies, hometown, educational background.',
    category: 'Government Exam',
    jobType: ['Government'],
    difficulty: 'Hard'
  },
];
