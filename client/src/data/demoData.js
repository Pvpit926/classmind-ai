// ============================================================
// ClassMind AI — Demo Data
// Replace with Firebase/API data in Part 2 & 3
// ============================================================

export const DEMO_USERS = [
  { id: 'u1', name: 'Demo Student', email: 'student@demo.com', role: 'student' },
  { id: 'u2', name: 'Demo Teacher', email: 'teacher@demo.com', role: 'teacher' }
];

export const ASSESSMENT_CATEGORIES = [
  { id: 'curriculum', label: 'Curriculum Readiness', color: '#6366f1', icon: '📚', description: 'Understanding of engineering-level academic expectations.' },
  { id: 'academic', label: 'Academic Foundation', color: '#8b5cf6', icon: '🎓', description: 'Basic knowledge needed for engineering studies.' },
  { id: 'learning', label: 'Learning Habits', color: '#06b6d4', icon: '📖', description: 'Study, revision and assignment habits.' },
  { id: 'time', label: 'Time Management', color: '#f59e0b', icon: '⏰', description: 'Ability to manage college workload.' },
  { id: 'adaptation', label: 'College Adaptation', color: '#10b981', icon: '🏫', description: 'Adjustment to the engineering-college environment.' },
];

export const BRANCHES = [
  'Computer Engineering',
  'Information Technology',
  'AI & Data Science',
  'Electronics',
  'Mechanical',
  'Civil',
  'Other',
];

export const DEMO_STUDENT_RESULTS = {
  overall: 63,
  categories: {
    curriculum: 72,
    academic: 64,
    learning: 58,
    time: 47,
    adaptation: 76,
  },
  strengths: [
    'Strong curriculum awareness',
    'Good college adaptation',
    'Positive attitude toward engineering',
  ],
  focusAreas: [
    'Time management needs improvement',
    'Learning consistency could be stronger',
    'Study schedule planning',
  ],
  date: '2026-09-25',
};

export const DEMO_PROGRESS = [
  { assessment: 'Assessment 1', date: '2026-08-10', score: 52 },
  { assessment: 'Assessment 2', date: '2026-09-01', score: 63 },
  { assessment: 'Assessment 3', date: '2026-09-20', score: 71 },
];

export const DEMO_RECOMMENDATIONS = [
  {
    id: 'rec-1',
    title: 'Improve Time Management',
    description: 'Build a consistent weekly study schedule. Start by allocating specific time blocks for each subject and stick to it for at least two weeks.',
    category: 'time',
    priority: 'high',
    icon: '⏰',
  },
  {
    id: 'rec-2',
    title: 'Strengthen Academic Foundation',
    description: 'Review key concepts from 12th standard mathematics and physics before starting advanced engineering topics.',
    category: 'academic',
    priority: 'medium',
    icon: '🎓',
  },
  {
    id: 'rec-3',
    title: 'Develop Active Learning Habits',
    description: 'Practice active recall and spaced repetition techniques. Make summary notes after each lecture.',
    category: 'learning',
    priority: 'medium',
    icon: '📖',
  },
  {
    id: 'rec-4',
    title: 'Explore Engineering Curriculum',
    description: 'Familiarize yourself with the complete semester syllabus. Understanding what lies ahead helps build confidence.',
    category: 'curriculum',
    priority: 'low',
    icon: '📚',
  },
];

export const DEMO_ASSESSMENTS = [
  {
    id: 'assess-001',
    title: 'Engineering Readiness Assessment',
    description: 'A comprehensive assessment to evaluate your readiness for the engineering curriculum.',
    questions: 15,
    duration: '20 min',
    dueDate: '2026-10-05',
    status: 'not_started',
    category: 'Overall',
    createdBy: 'Dr. Priya Mehta',
  },
  {
    id: 'assess-002',
    title: 'Time Management & Study Skills',
    description: 'Evaluate your time management abilities and study habits for engineering college.',
    questions: 10,
    duration: '15 min',
    dueDate: '2026-10-12',
    status: 'not_started',
    category: 'Time Management',
    createdBy: 'Dr. Priya Mehta',
  },
  {
    id: 'assess-003',
    title: 'Academic Foundation Check',
    description: 'A quick check on your foundational academic knowledge for engineering.',
    questions: 12,
    duration: '18 min',
    dueDate: '2026-09-20',
    status: 'completed',
    category: 'Academic Foundation',
    createdBy: 'Dr. Priya Mehta',
    score: 63,
  },
];

export const DEMO_ASSESSMENT_QUESTIONS = [
  {
    id: 'q1',
    text: 'How confident are you in understanding the engineering curriculum structure for your branch?',
    category: 'curriculum',
    options: [
      { id: 'a', text: 'Very confident — I have thoroughly reviewed the syllabus' },
      { id: 'b', text: 'Somewhat confident — I have a general idea' },
      { id: 'c', text: 'Not very confident — I have only seen the subject names' },
      { id: 'd', text: 'Not at all — I haven\'t looked at the curriculum yet' },
    ],
    correctAnswer: 'a',
    difficulty: 'basic',
  },
  {
    id: 'q2',
    text: 'How many hours per day do you plan to dedicate to self-study outside of lectures?',
    category: 'time',
    options: [
      { id: 'a', text: 'More than 4 hours' },
      { id: 'b', text: '2–4 hours' },
      { id: 'c', text: '1–2 hours' },
      { id: 'd', text: 'Less than 1 hour' },
    ],
    correctAnswer: 'b',
    difficulty: 'basic',
  },
  {
    id: 'q3',
    text: 'When you encounter a difficult topic, what is your first approach?',
    category: 'learning',
    options: [
      { id: 'a', text: 'Search online resources and try to understand independently' },
      { id: 'b', text: 'Ask a classmate or study group' },
      { id: 'c', text: 'Wait for the teacher to explain again' },
      { id: 'd', text: 'Skip it and move to the next topic' },
    ],
    correctAnswer: 'a',
    difficulty: 'intermediate',
  },
  {
    id: 'q4',
    text: 'How do you typically prepare for exams?',
    category: 'learning',
    options: [
      { id: 'a', text: 'Consistent revision throughout the semester' },
      { id: 'b', text: 'Start preparing 2 weeks before exams' },
      { id: 'c', text: 'Start preparing 2–3 days before exams' },
      { id: 'd', text: 'Study the night before the exam' },
    ],
    correctAnswer: 'a',
    difficulty: 'basic',
  },
  {
    id: 'q5',
    text: 'How comfortable are you with working on group projects with new classmates?',
    category: 'adaptation',
    options: [
      { id: 'a', text: 'Very comfortable — I enjoy collaboration' },
      { id: 'b', text: 'Comfortable — I can work with anyone' },
      { id: 'c', text: 'Somewhat uncomfortable — I prefer working alone' },
      { id: 'd', text: 'Very uncomfortable — I find it difficult' },
    ],
    correctAnswer: 'a',
    difficulty: 'basic',
  },
  {
    id: 'q6',
    text: 'Which mathematical concept do you feel most confident about?',
    category: 'academic',
    options: [
      { id: 'a', text: 'Calculus and differential equations' },
      { id: 'b', text: 'Linear algebra and matrices' },
      { id: 'c', text: 'Basic algebra and trigonometry' },
      { id: 'd', text: 'I am not confident in mathematics' },
    ],
    correctAnswer: 'a',
    difficulty: 'intermediate',
  },
  {
    id: 'q7',
    text: 'How do you handle assignment deadlines?',
    category: 'time',
    options: [
      { id: 'a', text: 'Complete well before the deadline' },
      { id: 'b', text: 'Complete on time with some planning' },
      { id: 'c', text: 'Often complete just at the deadline' },
      { id: 'd', text: 'Frequently miss deadlines' },
    ],
    correctAnswer: 'a',
    difficulty: 'basic',
  },
  {
    id: 'q8',
    text: 'Have you explored any engineering-related tools or software before starting college?',
    category: 'curriculum',
    options: [
      { id: 'a', text: 'Yes, I have experience with programming, CAD, or similar tools' },
      { id: 'b', text: 'I have tried one or two tools briefly' },
      { id: 'c', text: 'I have heard of them but never used them' },
      { id: 'd', text: 'No, I have not explored any tools' },
    ],
    correctAnswer: 'a',
    difficulty: 'intermediate',
  },
  {
    id: 'q9',
    text: 'How would you rate your note-taking skills?',
    category: 'learning',
    options: [
      { id: 'a', text: 'Excellent — I use structured methods like Cornell notes' },
      { id: 'b', text: 'Good — I take organized notes during lectures' },
      { id: 'c', text: 'Average — I write down some key points' },
      { id: 'd', text: 'Poor — I rarely take notes' },
    ],
    correctAnswer: 'a',
    difficulty: 'basic',
  },
  {
    id: 'q10',
    text: 'How well do you manage stress related to academics?',
    category: 'adaptation',
    options: [
      { id: 'a', text: 'Very well — I have healthy coping strategies' },
      { id: 'b', text: 'Moderately — I manage but sometimes feel overwhelmed' },
      { id: 'c', text: 'Not well — I struggle with academic pressure' },
      { id: 'd', text: 'Poorly — Academic stress significantly affects me' },
    ],
    correctAnswer: 'a',
    difficulty: 'intermediate',
  },
  {
    id: 'q11',
    text: 'Do you have a fixed daily routine for your college days?',
    category: 'time',
    options: [
      { id: 'a', text: 'Yes, a well-planned routine I follow consistently' },
      { id: 'b', text: 'Mostly, with some flexibility' },
      { id: 'c', text: 'I try but often deviate from it' },
      { id: 'd', text: 'No, I don\'t have a routine' },
    ],
    correctAnswer: 'a',
    difficulty: 'basic',
  },
  {
    id: 'q12',
    text: 'How familiar are you with the practical/laboratory components of your engineering branch?',
    category: 'curriculum',
    options: [
      { id: 'a', text: 'Very familiar — I know what labs are required' },
      { id: 'b', text: 'Somewhat familiar — I have a general idea' },
      { id: 'c', text: 'Slightly familiar — I have heard about labs' },
      { id: 'd', text: 'Not at all familiar' },
    ],
    correctAnswer: 'a',
    difficulty: 'basic',
  },
  {
    id: 'q13',
    text: 'What is your approach to learning something completely new?',
    category: 'academic',
    options: [
      { id: 'a', text: 'Break it down into small parts and learn step by step' },
      { id: 'b', text: 'Read about it thoroughly first, then practice' },
      { id: 'c', text: 'Try to learn everything at once' },
      { id: 'd', text: 'Wait for someone to teach me' },
    ],
    correctAnswer: 'a',
    difficulty: 'intermediate',
  },
  {
    id: 'q14',
    text: 'How quickly have you adapted to the college environment?',
    category: 'adaptation',
    options: [
      { id: 'a', text: 'Very quickly — I feel at home already' },
      { id: 'b', text: 'Fairly well — adjusting gradually' },
      { id: 'c', text: 'Slowly — still finding it challenging' },
      { id: 'd', text: 'Not at all — I find it very difficult' },
    ],
    correctAnswer: 'a',
    difficulty: 'basic',
  },
  {
    id: 'q15',
    text: 'Do you use any digital tools or apps to organize your academic work?',
    category: 'learning',
    options: [
      { id: 'a', text: 'Yes, multiple tools like calendars, note apps, and task managers' },
      { id: 'b', text: 'One or two tools occasionally' },
      { id: 'c', text: 'Rarely — I prefer paper-based methods' },
      { id: 'd', text: 'No, I don\'t use any organizational tools' },
    ],
    correctAnswer: 'a',
    difficulty: 'basic',
  },
];

export const DEMO_STUDENT_ACTIVITIES = [
  { id: 'act-1', text: 'Profile created', time: '2 days ago', type: 'info', icon: '👤' },
  { id: 'act-2', text: 'Engineering Readiness Assessment assigned', time: '1 day ago', type: 'assessment', icon: '📋' },
  { id: 'act-3', text: 'Academic Foundation Check completed', time: '5 hours ago', type: 'success', icon: '✅' },
  { id: 'act-4', text: 'Results generated — 63% readiness', time: '5 hours ago', type: 'result', icon: '📊' },
];

export const DEMO_TEACHER_STUDENTS = [
  { id: 's1', name: 'Arjun Sharma', branch: 'Computer Engineering', status: 'Completed', readiness: 63, lastAssessment: '2026-09-25' },
  { id: 's2', name: 'Sneha Patil', branch: 'Information Technology', status: 'Completed', readiness: 78, lastAssessment: '2026-09-24' },
  { id: 's3', name: 'Rahul Verma', branch: 'AI & Data Science', status: 'In Progress', readiness: null, lastAssessment: '—' },
  { id: 's4', name: 'Meera Joshi', branch: 'Electronics', status: 'Not Started', readiness: null, lastAssessment: '—' },
  { id: 's5', name: 'Amit Kumar', branch: 'Computer Engineering', status: 'Completed', readiness: 55, lastAssessment: '2026-09-23' },
  { id: 's6', name: 'Pooja Deshmukh', branch: 'Mechanical', status: 'Completed', readiness: 82, lastAssessment: '2026-09-22' },
  { id: 's7', name: 'Rohan Singh', branch: 'Civil', status: 'Completed', readiness: 44, lastAssessment: '2026-09-21' },
];

export const DEMO_TEACHER_ASSESSMENTS = [
  { id: 'ta-1', title: 'Engineering Readiness Assessment', students: 45, completed: 32, avgScore: 64, status: 'Active', date: '2026-09-15' },
  { id: 'ta-2', title: 'Time Management & Study Skills', students: 45, completed: 0, avgScore: null, status: 'Published', date: '2026-09-28' },
  { id: 'ta-3', title: 'Academic Foundation Check', students: 38, completed: 38, avgScore: 71, status: 'Completed', date: '2026-08-20' },
];

export const DEMO_TEACHER_ANALYTICS = {
  totalStudents: 45,
  assessed: 38,
  completionRate: 84,
  averageReadiness: 64,
  categoryAverages: {
    curriculum: 68,
    academic: 62,
    learning: 59,
    time: 51,
    adaptation: 72,
  },
};
