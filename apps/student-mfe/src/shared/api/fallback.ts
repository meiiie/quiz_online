/**
 * Fallback Mock API - Student MFE
 * 
 * When MSW fails and no real backend is available,
 * this provides direct mock data to keep the application functional
 */

// Simple mock data for fallback
const FALLBACK_QUIZZES = [
  {
    id: 'quiz_1',
    title: 'JavaScript Fundamentals',
    description: 'Test your knowledge of core JavaScript concepts.',
    duration: 30,
    totalQuestions: 10,
    difficulty: 'medium' as const,
    category: 'Programming',
    isAvailable: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20')
  },
  {
    id: 'quiz_2', 
    title: 'React Hooks Deep Dive',
    description: 'Advanced React concepts and hooks.',
    duration: 45,
    totalQuestions: 15,
    difficulty: 'hard' as const,
    category: 'Frontend',
    isAvailable: true,
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-05')
  },
  {
    id: 'quiz_3',
    title: 'CSS Grid & Flexbox',
    description: 'Master modern CSS layout techniques.',
    duration: 25,
    totalQuestions: 8,
    difficulty: 'easy' as const,
    category: 'CSS',
    isAvailable: true,
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-02-12')
  }
];

const FALLBACK_QUESTIONS: Record<string, any[]> = {
  quiz_1: [
    {
      id: 'q1_1',
      quizId: 'quiz_1',
      type: 'multiple-choice',
      question: 'What is the correct way to declare a variable in JavaScript?',
      options: ['var myVar = 5', 'let myVar = 5', 'const myVar = 5', 'All of the above'],
      correctAnswer: 'All of the above',
      points: 2
    },
    {
      id: 'q1_2',
      quizId: 'quiz_1',
      type: 'true-false',
      question: 'JavaScript is a statically typed language.',
      correctAnswer: 'false',
      points: 1
    }
  ],
  quiz_2: [
    {
      id: 'q2_1',
      quizId: 'quiz_2',
      type: 'multiple-choice',
      question: 'Which hook is used for side effects in React?',
      options: ['useState', 'useEffect', 'useContext', 'useReducer'],
      correctAnswer: 'useEffect',
      points: 2
    }
  ],
  quiz_3: [
    {
      id: 'q3_1',
      quizId: 'quiz_3',
      type: 'multiple-choice',
      question: 'Which CSS property is used for flexbox?',
      options: ['display: block', 'display: flex', 'display: grid', 'display: table'],
      correctAnswer: 'display: flex',
      points: 2
    }
  ]
};

/**
 * Fallback API implementation
 */
export class FallbackAPI {
  private attempts: any[] = [];
  private attemptIdCounter = 1;

  /**
   * Test connection
   */
  async test() {
    await this.delay(200);
    return { 
      message: 'Fallback API is working!', 
      timestamp: new Date().toISOString(),
      service: 'Fallback Mock API'
    };
  }

  /**
   * Get all quizzes
   */
  async getQuizzes() {
    await this.delay(500);
    console.log('📦 Fallback API: Returning', FALLBACK_QUIZZES.length, 'quizzes');
    return [...FALLBACK_QUIZZES]; // Return copy
  }

  /**
   * Get quiz by ID
   */
  async getQuiz(id: string) {
    await this.delay(300);
    const quiz = FALLBACK_QUIZZES.find(q => q.id === id);
    if (!quiz) {
      throw new Error(`Quiz with ID "${id}" not found`);
    }
    console.log('📦 Fallback API: Returning quiz:', quiz.title);
    return { ...quiz }; // Return copy
  }

  /**
   * Get quizzes by category
   */
  async getQuizzesByCategory(category: string) {
    await this.delay(400);
    const filtered = FALLBACK_QUIZZES.filter(quiz => 
      category === 'all' || 
      quiz.category.toLowerCase() === category.toLowerCase()
    );
    console.log('📦 Fallback API: Returning', filtered.length, 'quizzes for category:', category);
    return [...filtered]; // Return copy
  }

  /**
   * Get quiz questions
   */
  async getQuizQuestions(quizId: string) {
    await this.delay(600);
    const questions = FALLBACK_QUESTIONS[quizId] || [];
    if (questions.length === 0) {
      throw new Error(`No questions found for quiz "${quizId}"`);
    }
    console.log('📦 Fallback API: Returning', questions.length, 'questions for quiz:', quizId);
    return [...questions]; // Return copy
  }

  /**
   * Start quiz attempt
   */
  async startQuizAttempt(quizId: string, userId = 'student_1') {
    await this.delay(200);
    
    const quiz = FALLBACK_QUIZZES.find(q => q.id === quizId);
    if (!quiz) {
      throw new Error(`Quiz with ID "${quizId}" not found`);
    }

    const attempt = {
      id: `attempt_${this.attemptIdCounter++}`,
      quizId,
      userId,
      startedAt: new Date(),
      answers: [],
      status: 'in-progress' as const
    };

    this.attempts.push(attempt);
    console.log('📦 Fallback API: Started quiz attempt:', attempt.id);
    return { ...attempt };
  }

  /**
   * Submit quiz attempt
   */
  async submitQuizAttempt(attemptId: string, answers: any[]) {
    await this.delay(800);
    
    const attemptIndex = this.attempts.findIndex(a => a.id === attemptId);
    if (attemptIndex === -1) {
      throw new Error(`Quiz attempt with ID "${attemptId}" not found`);
    }

    const attempt = this.attempts[attemptIndex];
    const questions = FALLBACK_QUESTIONS[attempt.quizId] || [];
    
    // Simple scoring
    let totalScore = 0;
    let totalPoints = 0;
    
    const processedAnswers = answers.map(answer => {
      const question = questions.find(q => q.id === answer.questionId);
      if (!question) return answer;
      
      totalPoints += question.points;
      const isCorrect = String(answer.userAnswer).toLowerCase() === String(question.correctAnswer).toLowerCase();
      const pointsEarned = isCorrect ? question.points : 0;
      totalScore += pointsEarned;
      
      return {
        ...answer,
        isCorrect,
        pointsEarned
      };
    });

    const completedAttempt = {
      ...attempt,
      completedAt: new Date(),
      score: totalScore,
      totalPoints,
      answers: processedAnswers,
      status: 'completed' as const
    };

    this.attempts[attemptIndex] = completedAttempt;
    console.log('📦 Fallback API: Completed quiz attempt:', attemptId, 'Score:', totalScore, '/', totalPoints);
    return { ...completedAttempt };
  }

  /**
   * Simulate network delay
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

/**
 * Default fallback API instance
 */
export const fallbackAPI = new FallbackAPI();
