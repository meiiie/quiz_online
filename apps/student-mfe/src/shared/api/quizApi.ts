/**
 * Quiz API Service - Student MFE (Fallback Version)
 * 
 * Temporary fallback to direct mocks while debugging MSW
 * Will be removed once MSW is working properly
 */

import type { Quiz } from '../../entities/quiz/model/types';

// Temporary mock data
const FALLBACK_QUIZZES: Quiz[] = [
  {
    id: 'quiz_1',
    title: 'JavaScript Fundamentals',
    description: 'Test your knowledge of core JavaScript concepts including variables, functions, and scope.',
    duration: 30,
    totalQuestions: 15,
    difficulty: 'medium',
    category: 'Programming',
    isAvailable: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20')
  },
  {
    id: 'quiz_2', 
    title: 'React Hooks Deep Dive',
    description: 'Advanced React concepts focusing on useState, useEffect, and custom hooks.',
    duration: 45,
    totalQuestions: 20,
    difficulty: 'hard',
    category: 'Frontend',
    isAvailable: true,
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-05')
  },
  {
    id: 'quiz_3',
    title: 'CSS Grid & Flexbox',
    description: 'Master modern CSS layout techniques with practical examples.',
    duration: 25,
    totalQuestions: 12,
    difficulty: 'easy',
    category: 'CSS',
    isAvailable: true,
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-02-12')
  }
];

/**
 * Fetch all available quizzes
 * Try MSW first, fallback to direct mock if MSW fails
 */
export const fetchQuizzes = async (): Promise<Quiz[]> => {
  console.log('🔄 API: Fetching quizzes...');
  
  try {
    // Try MSW first
    const response = await fetch('/api/quizzes', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      const data = await response.json();
      console.log('✅ API: Fetched quizzes via MSW successfully', data.length, 'quizzes');
      return data;
    }
  } catch (error) {
    console.log('⚠️ API: MSW failed, using fallback mock data');
  }
  
  // Fallback to direct mock
  await new Promise(resolve => setTimeout(resolve, 800)); // Simulate delay
  console.log('✅ API: Fetched quizzes via fallback successfully', FALLBACK_QUIZZES.length, 'quizzes');
  return FALLBACK_QUIZZES;
};

/**
 * Fetch quiz by ID
 */
export const fetchQuizById = async (id: string): Promise<Quiz | null> => {
  console.log(`🔄 API: Fetching quiz with ID: ${id}`);
  
  try {
    // Try MSW first
    const response = await fetch(`/api/quizzes/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      const data = await response.json();
      console.log('✅ API: Fetched quiz via MSW successfully');
      return data;
    }
    
    if (response.status === 404) {
      console.log('❌ API: Quiz not found');
      return null;
    }
  } catch (error) {
    console.log('⚠️ API: MSW failed, using fallback mock data');
  }
  
  // Fallback to direct mock
  await new Promise(resolve => setTimeout(resolve, 500));
  const quiz = FALLBACK_QUIZZES.find(q => q.id === id);
  if (!quiz) {
    console.log('❌ API: Quiz not found in fallback data');
    return null;
  }
  
  console.log('✅ API: Fetched quiz via fallback successfully');
  return quiz;
};

/**
 * Filter quizzes by category
 */
export const fetchQuizzesByCategory = async (category: string): Promise<Quiz[]> => {
  console.log(`🔄 API: Fetching quizzes for category: ${category}`);
  
  try {
    // Try MSW first
    const response = await fetch(`/api/quizzes/category/${category}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      const data = await response.json();
      console.log('✅ API: Fetched filtered quizzes via MSW successfully', data.length, 'quizzes');
      return data;
    }
  } catch (error) {
    console.log('⚠️ API: MSW failed, using fallback mock data');
  }
  
  // Fallback to direct mock
  await new Promise(resolve => setTimeout(resolve, 600));
  const filteredQuizzes = FALLBACK_QUIZZES.filter(quiz => 
    quiz.isAvailable && 
    (category === 'all' || quiz.category.toLowerCase() === category.toLowerCase())
  );
  
  console.log('✅ API: Fetched filtered quizzes via fallback successfully', filteredQuizzes.length, 'quizzes');
  return filteredQuizzes;
};
