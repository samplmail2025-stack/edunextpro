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

  // Additional HR Questions
  {
    id: 'hr-9',
    question: 'What motivates you?',
    answer: 'Mention intrinsic motivators: learning new things, solving challenging problems, making an impact, personal growth. Connect it to the role you\'re applying for.',
    tips: 'Avoid saying "money" or "salary" as primary motivation. Show passion for the field.',
    category: 'HR',
    jobType: ['Private', 'Internship', 'Government'],
    difficulty: 'Easy'
  },
  {
    id: 'hr-10',
    question: 'Tell me about a failure and what you learned.',
    answer: 'Choose a genuine but not catastrophic failure. Use STAR method: explain the situation, what went wrong, what you learned, and how you applied that lesson since.',
    tips: 'Show growth mindset. The lesson learned is more important than the failure itself.',
    category: 'HR',
    jobType: ['Private', 'Government'],
    difficulty: 'Medium'
  },
  {
    id: 'hr-11',
    question: 'How do you handle constructive criticism?',
    answer: 'Say you welcome feedback as a growth opportunity. Give an example where feedback helped you improve. Show maturity and willingness to learn.',
    tips: 'Never say you get defensive. Show emotional intelligence and professionalism.',
    category: 'HR',
    jobType: ['Private', 'Internship', 'Government'],
    difficulty: 'Easy'
  },
  {
    id: 'hr-12',
    question: 'Why are you leaving your current job / Why did you choose this field?',
    answer: 'For freshers: Explain your passion for the field with specific examples. For experienced: Focus on growth opportunities, not complaints about previous employers.',
    tips: 'Never badmouth previous employers or teachers. Stay positive and forward-looking.',
    category: 'HR',
    jobType: ['Private', 'Government'],
    difficulty: 'Medium'
  },
  {
    id: 'hr-13',
    question: 'Do you prefer working alone or in a team?',
    answer: 'Best answer: "I\'m comfortable with both. I enjoy collaborating on complex problems but can also work independently when focused work is needed." Give examples of each.',
    tips: 'Show flexibility. Most roles require both — demonstrate versatility.',
    category: 'HR',
    jobType: ['Private', 'Internship'],
    difficulty: 'Easy'
  },
  {
    id: 'hr-14',
    question: 'What do you know about our company?',
    answer: 'Research: founding year, products/services, recent news, company culture, mission statement, key competitors, and any recent achievements or expansions.',
    tips: 'Check the company website, LinkedIn page, and recent news articles. Mention something specific that impressed you.',
    category: 'HR',
    jobType: ['Private', 'Internship'],
    difficulty: 'Easy'
  },
  {
    id: 'hr-15',
    question: 'How do you prioritize your work?',
    answer: 'Explain your system: use Eisenhower Matrix (urgent vs important), to-do lists, or time-blocking. Give a real example of managing multiple deadlines.',
    tips: 'Mention specific tools you use (calendar, task apps). Show you\'re organized and proactive.',
    category: 'HR',
    jobType: ['Private', 'Government', 'Internship'],
    difficulty: 'Medium'
  },

  // Additional Technical Questions
  {
    id: 'tech-7',
    question: 'What is the difference between a stack and a queue?',
    answer: 'Stack: LIFO (Last In First Out) — push/pop from top. Queue: FIFO (First In First Out) — enqueue at rear, dequeue from front. Stack example: browser back button. Queue example: printer queue.',
    tips: 'Draw diagrams if on whiteboard. Know real-world applications of each.',
    category: 'Technical',
    jobType: ['Private', 'Internship'],
    difficulty: 'Easy'
  },
  {
    id: 'tech-8',
    question: 'Explain the concept of version control (Git).',
    answer: 'Git tracks file changes, enables collaboration, and maintains history. Key concepts: repository, commit, branch, merge, pull request. GitHub/GitLab host remote repos.',
    tips: 'Know basic commands: git init, add, commit, push, pull, branch, merge. Mention any projects where you used Git.',
    category: 'Technical',
    jobType: ['Private', 'Internship'],
    difficulty: 'Easy'
  },
  {
    id: 'tech-9',
    question: 'What is the difference between HTTP and HTTPS?',
    answer: 'HTTP transfers data in plain text. HTTPS adds SSL/TLS encryption for security. HTTPS uses port 443 vs HTTP\'s port 80. HTTPS is essential for login pages, payments, and any sensitive data.',
    tips: 'Understand SSL certificates and how encryption works at a high level.',
    category: 'Technical',
    jobType: ['Private', 'Internship'],
    difficulty: 'Easy'
  },
  {
    id: 'tech-10',
    question: 'What is normalization in databases?',
    answer: 'Process of organizing data to reduce redundancy. Normal forms: 1NF (atomic values), 2NF (no partial dependencies), 3NF (no transitive dependencies). Balances data integrity with query performance.',
    tips: 'Know when to denormalize for performance. Real-world systems often use 3NF with strategic denormalization.',
    category: 'Technical',
    jobType: ['Private', 'Internship'],
    difficulty: 'Medium'
  },
  {
    id: 'tech-11',
    question: 'Explain cloud computing and its types.',
    answer: 'Cloud delivers computing resources over the internet. Types: IaaS (AWS EC2 — infrastructure), PaaS (Heroku — platform), SaaS (Gmail — software). Deployment: Public, Private, Hybrid cloud.',
    tips: 'Mention AWS, Azure, or GCP if you have experience. Know the shared responsibility model.',
    category: 'Technical',
    jobType: ['Private'],
    difficulty: 'Medium'
  },
  {
    id: 'tech-12',
    question: 'What is the difference between compiled and interpreted languages?',
    answer: 'Compiled (C, Java): entire code converted to machine code before execution — faster runtime. Interpreted (Python, JS): executed line by line — more flexible, slower. Java uses both (compiled to bytecode, then interpreted by JVM).',
    tips: 'Know which languages you use are compiled vs interpreted. Understand trade-offs.',
    category: 'Technical',
    jobType: ['Private', 'Internship'],
    difficulty: 'Easy'
  },
  {
    id: 'tech-13',
    question: 'How does the internet work?',
    answer: 'Client sends HTTP request → DNS resolves domain to IP → request reaches server via TCP/IP → server processes and sends response → browser renders HTML/CSS/JS. Key protocols: HTTP, TCP/IP, DNS, SSL/TLS.',
    tips: 'Understand the OSI model layers at a basic level. Know what happens when you type a URL.',
    category: 'Technical',
    jobType: ['Private', 'Internship'],
    difficulty: 'Medium'
  },
  {
    id: 'tech-14',
    question: 'What is agile methodology?',
    answer: 'Iterative development approach with sprints (2-4 weeks). Key practices: daily standups, sprint planning, retrospectives. Frameworks: Scrum, Kanban. Values: individuals over processes, working software over documentation.',
    tips: 'Even as a fresher, you can relate agile to college projects — iterative improvements, team collaboration.',
    category: 'Technical',
    jobType: ['Private', 'Internship'],
    difficulty: 'Easy'
  },

  // Additional Group Discussion
  {
    id: 'gd-5',
    question: 'How to improve body language during a GD?',
    answer: 'Maintain eye contact with all participants, sit upright, use measured hand gestures, nod when others speak, avoid crossing arms. Smile naturally and lean slightly forward to show engagement.',
    tips: 'Practice in front of a mirror. Record yourself in mock GDs. Your body language speaks louder than words.',
    category: 'Group Discussion',
    jobType: ['Government', 'Private'],
    difficulty: 'Easy'
  },
  {
    id: 'gd-6',
    question: 'What to do when you don\'t know the GD topic?',
    answer: 'Listen to others first, pick up key points, then add value by connecting ideas or providing a unique angle. Use general frameworks: pros/cons, stakeholder analysis, or compare with similar situations.',
    tips: 'It\'s okay to not start. A well-timed quality contribution matters more than speaking first with nothing to say.',
    category: 'Group Discussion',
    jobType: ['Government', 'Private', 'Internship'],
    difficulty: 'Medium'
  },
  {
    id: 'gd-7',
    question: 'Common mistakes to avoid in Group Discussions?',
    answer: 'Don\'t interrupt aggressively, don\'t speak just to fill time, avoid going off-topic, don\'t get personal, don\'t dominate the conversation. Quality > quantity. Listen as much as you speak.',
    tips: 'Aim for 3-4 meaningful contributions. One strong point is better than five weak ones.',
    category: 'Group Discussion',
    jobType: ['Government', 'Private'],
    difficulty: 'Easy'
  },
  {
    id: 'gd-8',
    question: 'How to build on others\' points in a GD?',
    answer: 'Say "Building on what [name] said..." or "To add to that point...". Extend their argument with data or examples. This shows you\'re listening and collaborative.',
    tips: 'Evaluators love candidates who create a structured discussion rather than a chaotic debate.',
    category: 'Group Discussion',
    jobType: ['Government', 'Private', 'Internship'],
    difficulty: 'Medium'
  },

  // Additional Government Exam
  {
    id: 'gov-7',
    question: 'How to prepare for TNPSC Group 1 Preliminary?',
    answer: 'Syllabus: GS (History, Geography, Polity, Economy, Science), Aptitude & Mental Ability, Tamil. Study 6th-12th Samacheer books, previous 10 years papers. Focus on Tamil Nadu-specific content.',
    tips: 'Group 1 Prelims is objective — focus on elimination technique. Read Tamil Nadu GK separately.',
    category: 'Government Exam',
    jobType: ['Government'],
    difficulty: 'Hard'
  },
  {
    id: 'gov-8',
    question: 'Important current affairs sources for government exams?',
    answer: 'Daily: The Hindu, Dinamani. Monthly: Pratiyogita Darpan, Competition Success Review. Apps: GKToday, Adda247. For TN: TN government press releases, TN Budget highlights.',
    tips: 'Maintain a current affairs notebook. Note dates, names, and schemes. Revise monthly compilations.',
    category: 'Government Exam',
    jobType: ['Government'],
    difficulty: 'Easy'
  },
  {
    id: 'gov-9',
    question: 'How to write TNPSC Mains answers effectively?',
    answer: 'Structure: Introduction (1-2 lines) → Body (points with examples) → Conclusion. Use diagrams, flowcharts where possible. Write legibly with headings and subheadings. Time management is crucial.',
    tips: 'Practice answer writing daily. Write at least 2 answers per day. Get them reviewed by peers or mentors.',
    category: 'Government Exam',
    jobType: ['Government'],
    difficulty: 'Hard'
  },
  {
    id: 'gov-10',
    question: 'What is the TNPSC Group 2/2A exam pattern?',
    answer: 'Group 2: Prelims (objective) + Mains (descriptive). Group 2A: Only objective exam. Subjects: GS, Tamil, Aptitude. Group 2 posts: Deputy Collector, DSP, etc. Group 2A: Junior Assistants, Bill Collectors.',
    tips: 'Group 2A is easier to crack — good starting point. Many students clear 2A first, then attempt Group 2/1.',
    category: 'Government Exam',
    jobType: ['Government'],
    difficulty: 'Medium'
  },
  {
    id: 'gov-11',
    question: 'How to prepare for Tamil paper in TNPSC?',
    answer: 'Read Tamil literature (Thirukkural, Sangam literature basics). Study Tamil grammar (Ezhuthu, Sol, Porul). Practice reading Tamil passages and answering comprehension. Study TN Samacheer Tamil textbooks.',
    tips: 'Tamil paper can be a scoring section if prepared well. Don\'t neglect it even if you\'re strong in English.',
    category: 'Government Exam',
    jobType: ['Government'],
    difficulty: 'Medium'
  },
  {
    id: 'gov-12',
    question: 'Tips for Railway RRB NTPC exam preparation?',
    answer: 'CBT 1: GK/GA, Mathematics, General Intelligence & Reasoning. CBT 2: Same with higher difficulty. Key: Speed in math, reasoning shortcuts, daily current affairs for 6 months.',
    tips: 'RRB exams have a large candidate pool — even 1 extra mark matters. Focus on accuracy over speed initially.',
    category: 'Government Exam',
    jobType: ['Government'],
    difficulty: 'Medium'
  },
];
