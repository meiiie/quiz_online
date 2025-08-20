/**
 * Quiz Taking API Service - Student MFE
 * 
 * Professional API layer with MSW + Fallback support
 * Production-ready architecture
 */

import type { Question, QuizAttempt, QuizAnswer } from '../../entities/quiz/model/types';

/**
 * Base API configuration
 */
const API_BASE = '/api';
const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
};

// Fallback mock data for quiz taking
const FALLBACK_QUESTIONS: Record<string, Question[]> = {
  quiz_1: [
    {
      id: 'q1_1',
      quizId: 'quiz_1',
      type: 'multiple-choice',
      question: 'What is the correct way to declare a variable in JavaScript?',
      options: ['var myVar = 5', 'let myVar = 5', 'const myVar = 5', 'All of the above'],
      correctAnswer: 'All of the above',
      points: 2,
      explanation: 'All three keywords (var, let, const) can be used to declare variables, each with different scoping rules.'
    },
    {
      id: 'q1_2',
      quizId: 'quiz_1',
      type: 'true-false',
      question: 'JavaScript is a statically typed language.',
      correctAnswer: 'false',
      points: 1,
      explanation: 'JavaScript is dynamically typed, meaning variable types are determined at runtime.'
    },
    {
      id: 'q1_3',
      quizId: 'quiz_1',
      type: 'short-answer',
      question: 'Explain what hoisting means in JavaScript.',
      correctAnswer: 'Variable and function declarations are moved to the top of their scope',
      points: 3,
      explanation: 'Hoisting is a JavaScript mechanism where variables and function declarations are moved to the top of their containing scope during compilation.'
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
      points: 2,
      explanation: 'useEffect is specifically designed for handling side effects like API calls, subscriptions, and DOM manipulation.'
    },
    {
      id: 'q2_2',
      quizId: 'quiz_2',
      type: 'true-false',
      question: 'useEffect runs after every render by default.',
      correctAnswer: 'true',
      points: 1,
      explanation: 'Without a dependency array, useEffect runs after every render (both mount and update).'
    }
  ],
  quiz_3: [
    {
      id: 'q3_1',
      quizId: 'quiz_3',
      type: 'multiple-choice',
      question: 'Which CSS property is used to create a grid container?',
      options: ['display: grid', 'grid-template', 'grid-area', 'grid-column'],
      correctAnswer: 'display: grid',
      points: 2,
      explanation: 'The display: grid property creates a grid container and enables CSS Grid layout.'
    }
  ]
};

// In-memory storage for fallback attempts
let fallbackAttempts: QuizAttempt[] = [];
let attemptIdCounter = 1;

/**
 * Fetch questions for a specific quiz
 * Try MSW first, fallback to direct mock if MSW fails
 */
export const fetchQuizQuestions = async (quizId: string): Promise<Question[]> => {
  console.log(`🔄 API: Fetching questions for quiz ${quizId}`);
  
  try {
    // Try MSW first
    const response = await fetch(`${API_BASE}/quizzes/${quizId}/questions`, {
      method: 'GET',
      headers: DEFAULT_HEADERS,
    });

    if (response.ok) {
      const data = await response.json();
      console.log('✅ API: Fetched questions via MSW successfully', data.length, 'questions');
      return data;
    }
  } catch (error) {
    console.log('⚠️ API: MSW failed for questions, using fallback mock data');
  }

  // Fallback to direct mock
  await new Promise(resolve => setTimeout(resolve, 1000));
  const questions = FALLBACK_QUESTIONS[quizId];
  if (!questions) {
    throw new Error(`No questions found for quiz: ${quizId}`);
  }
  
  // Shuffle questions for randomization
  const shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
  console.log('✅ API: Fetched questions via fallback successfully', shuffledQuestions.length, 'questions');
  return shuffledQuestions;
};

/**
 * Start a new quiz attempt
 * Try MSW first, fallback to direct mock if MSW fails
 */
export const startQuizAttempt = async (quizId: string, userId?: string): Promise<QuizAttempt> => {
  console.log(`🔄 API: Starting quiz attempt for quiz ${quizId}`);
  
  try {
    // Try MSW first
    const response = await fetch(`${API_BASE}/quiz-attempts`, {
      method: 'POST',
      headers: DEFAULT_HEADERS,
      body: JSON.stringify({ 
        quizId, 
        userId: userId || 'student_1'
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('✅ API: Started quiz attempt via MSW successfully', data.id);
      return data;
    }
  } catch (error) {
    console.log('⚠️ API: MSW failed for quiz attempt, using fallback mock data');
  }

  // Fallback to direct mock
  await new Promise(resolve => setTimeout(resolve, 300));
  const attempt: QuizAttempt = {
    id: `attempt_${attemptIdCounter++}`,
    quizId,
    userId: userId || 'student_1',
    startedAt: new Date(),
    answers: [],
    status: 'in-progress'
  };
  
  fallbackAttempts.push(attempt);
  console.log('✅ API: Started quiz attempt via fallback successfully', attempt.id);
  return attempt;
};

/**
 * Submit quiz attempt with answers
 * Try MSW first, fallback to direct mock if MSW fails
 */
export const submitQuizAttempt = async (
  attemptId: string, 
  answers: QuizAnswer[]
): Promise<QuizAttempt> => {
  console.log(`🔄 API: Submitting quiz attempt ${attemptId}`, answers.length, 'answers');
  
  try {
    // Try MSW first
    const response = await fetch(`${API_BASE}/quiz-attempts/${attemptId}/submit`, {
      method: 'PUT',
      headers: DEFAULT_HEADERS,
      body: JSON.stringify({ answers }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('✅ API: Submitted quiz attempt via MSW successfully', {
        score: data.score,
        totalPoints: data.totalPoints,
        percentage: Math.round((data.score / data.totalPoints) * 100)
      });
      return data;
    }
  } catch (error) {
    console.log('⚠️ API: MSW failed for quiz submission, using fallback mock data');
  }

  // Fallback to direct mock
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const attemptIndex = fallbackAttempts.findIndex(a => a.id === attemptId);
  if (attemptIndex === -1) {
    throw new Error(`Quiz attempt not found: ${attemptId}`);
  }
  
  const attempt = fallbackAttempts[attemptIndex];
  const questions = FALLBACK_QUESTIONS[attempt.quizId] || [];
  
  // Calculate score
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
  
  // Update attempt
  const completedAttempt: QuizAttempt = {
    ...attempt,
    completedAt: new Date(),
    score: totalScore,
    totalPoints,
    answers: processedAnswers,
    status: 'completed'
  };
  
  fallbackAttempts[attemptIndex] = completedAttempt;
  
  console.log('✅ API: Submitted quiz attempt via fallback successfully', {
    score: totalScore,
    totalPoints,
    percentage: Math.round((totalScore / totalPoints) * 100)
  });
  return completedAttempt;
};
