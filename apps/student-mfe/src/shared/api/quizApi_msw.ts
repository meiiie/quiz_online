/**
 * Quiz API Service - Student MFE
 * 
 * Professional API layer using real HTTP calls
 * MSW will intercept these calls in development
 * Ready for production backend integration
 */

import type { Quiz } from '../../entities/quiz/model/types';

/**
 * Base API configuration
 */
const API_BASE = '/api';
const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
};

/**
 * Fetch all available quizzes
 * MSW intercepts: GET /api/quizzes
 */
export const fetchQuizzes = async (): Promise<Quiz[]> => {
  console.log('🔄 API: Fetching quizzes...');
  
  const response = await fetch(`${API_BASE}/quizzes`, {
    method: 'GET',
    headers: DEFAULT_HEADERS,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
  }

  const data = await response.json();
  console.log('✅ API: Fetched quizzes successfully', data.length, 'quizzes');
  return data;
};

/**
 * Fetch quiz by ID
 * MSW intercepts: GET /api/quizzes/:id
 */
export const fetchQuizById = async (id: string): Promise<Quiz | null> => {
  console.log(`🔄 API: Fetching quiz with ID: ${id}`);
  
  const response = await fetch(`${API_BASE}/quizzes/${id}`, {
    method: 'GET',
    headers: DEFAULT_HEADERS,
  });

  if (response.status === 404) {
    console.log('❌ API: Quiz not found');
    return null;
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
  }

  const data = await response.json();
  console.log('✅ API: Fetched quiz successfully');
  return data;
};

/**
 * Filter quizzes by category
 * MSW intercepts: GET /api/quizzes/category/:category
 */
export const fetchQuizzesByCategory = async (category: string): Promise<Quiz[]> => {
  console.log(`🔄 API: Fetching quizzes for category: ${category}`);
  
  const response = await fetch(`${API_BASE}/quizzes/category/${category}`, {
    method: 'GET',
    headers: DEFAULT_HEADERS,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
  }

  const data = await response.json();
  console.log('✅ API: Fetched filtered quizzes successfully', data.length, 'quizzes');
  return data;
};
