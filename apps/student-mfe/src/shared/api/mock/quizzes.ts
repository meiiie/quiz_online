// Mock data for quizzes
import type { Quiz } from '@/entities/quiz/model/types';

export const MOCK_QUIZZES: Quiz[] = [
  {
    id: '1',
    title: 'JavaScript Fundamentals',
    description: 'Test your knowledge of JavaScript basics including variables, functions, and objects.',
    questionCount: 20,
    duration: 30,
    createdAt: '2025-01-15',
    status: 'completed',
    score: 85,
    totalQuestions: 20,
    completedAt: '2025-01-15 14:30'
  },
  {
    id: '2',
    title: 'React Components',
    description: 'Quiz about React component lifecycle, hooks, and state management.',
    questionCount: 15,
    duration: 25,
    createdAt: '2025-01-18',
    status: 'completed',
    score: 92,
    totalQuestions: 15,
    completedAt: '2025-01-18 16:45'
  },
  {
    id: '3',
    title: 'TypeScript Advanced',
    description: 'Advanced TypeScript concepts including generics, decorators, and utility types.',
    questionCount: 25,
    duration: 40,
    createdAt: '2025-01-20',
    status: 'in-progress',
    totalQuestions: 25
  },
  {
    id: '4',
    title: 'Database Design',
    description: 'Database normalization, relationships, and SQL query optimization.',
    questionCount: 18,
    duration: 35,
    createdAt: '2025-01-22',
    status: 'pending',
    totalQuestions: 18
  }
];
