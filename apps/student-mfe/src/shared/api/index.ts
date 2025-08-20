/**
 * API Facade - Student MFE
 * 
 * Single entry point for all API operations following facade pattern
 * Provides unified interface and environment-aware API selection
 */

import type { QuizAnswer } from '../../entities/quiz/model/types';

// Development environment check
const isDevelopment = typeof window !== 'undefined' && window.location.hostname === 'localhost';

/**
 * Environment Configuration
 */
export const API_CONFIG = {
  isDevelopment,
  useMSW: isDevelopment, // Use MSW in development
  apiUrl: isDevelopment ? '/api' : '/api' // Could be extended for production API URL
} as const;

/**
 * Import API implementations
 */
// REST API (production & fallback)
import { quizApi as restQuizApi } from './rest/quiz';
import { api as restApi } from './rest/base';

/**
 * Dynamically import MSW only in development
 */
const initializeMSW = async () => {
  if (!API_CONFIG.useMSW) {
    console.log('🔧 API: Production mode - using REST API');
    return false;
  }

  try {
    // Dynamic import to avoid bundling MSW in production
    const { worker } = await import('./msw/browser');
    
    // Start MSW with more permissive settings
    await worker.start({
      onUnhandledRequest: 'warn',
      quiet: false, // Show detailed logs
      waitUntilReady: true, // Wait for full initialization
      serviceWorker: {
        url: '/mockServiceWorker.js',
        options: {
          scope: '/'
        }
      }
    });

    console.log('🎭 API: MSW enabled for development');
    return true;
  } catch (error) {
    console.warn('⚠️ API: MSW initialization failed, falling back to REST API', error);
    return false;
  }
};

/**
 * API Selection Strategy
 * Automatically chooses between MSW (development) and REST (production)
 */
class ApiManager {
  private mswInitialized = false;
  private initPromise: Promise<boolean> | null = null;

  /**
   * Initialize API based on environment
   */
  async initialize(): Promise<boolean> {
    if (this.initPromise) {
      return this.initPromise;
    }

    this.initPromise = this.performInitialization();
    return this.initPromise;
  }

  private async performInitialization(): Promise<boolean> {
    if (API_CONFIG.useMSW && !this.mswInitialized) {
      const success = await initializeMSW();
      this.mswInitialized = success;
      return success;
    }
    return false;
  }

  /**
   * Check if MSW is available and working
   */
  async isMSWWorking(): Promise<boolean> {
    if (!this.mswInitialized) {
      return false;
    }

    try {
      // Test MSW with a simple request
      const response = await fetch('/api/test');
      const data = await response.json();
      return data?.message?.includes('MSW') || false;
    } catch {
      return false;
    }
  }

  /**
   * Get the appropriate API implementation
   */
  async getApiImplementation() {
    await this.initialize();
    
    const mswWorking = await this.isMSWWorking();
    
    if (mswWorking) {
      console.log('🎭 API: Using MSW (Mock Service Worker)');
      return {
        type: 'msw' as const,
        api: restApi, // MSW intercepts fetch calls, so we use the same REST client
        quiz: restQuizApi
      };
    } else {
      console.log('🌐 API: Using REST API');
      return {
        type: 'rest' as const,
        api: restApi,
        quiz: restQuizApi
      };
    }
  }
}

/**
 * Global API manager instance
 */
const apiManager = new ApiManager();

/**
 * Unified Quiz API Interface
 * Provides consistent interface regardless of underlying implementation
 */
export const quizAPI = {
  /**
   * Initialize the API system
   */
  async initialize() {
    return apiManager.initialize();
  },

  /**
   * Test API connectivity
   */
  async test() {
    const implementation = await apiManager.getApiImplementation();
    return implementation.quiz.test();
  },

  /**
   * Get all available quizzes
   */
  async getQuizzes() {
    const implementation = await apiManager.getApiImplementation();
    return implementation.quiz.getAllQuizzes();
  },

  /**
   * Get quiz by ID
   */
  async getQuiz(id: string) {
    const implementation = await apiManager.getApiImplementation();
    return implementation.quiz.getQuiz(id);
  },

  /**
   * Get quizzes by category
   */
  async getQuizzesByCategory(category: string) {
    const implementation = await apiManager.getApiImplementation();
    return implementation.quiz.getByCategory(category);
  },

  /**
   * Get questions for a quiz
   */
  async getQuizQuestions(quizId: string) {
    const implementation = await apiManager.getApiImplementation();
    return implementation.quiz.getQuestions(quizId);
  },

  /**
   * Start a new quiz attempt
   */
  async startQuizAttempt(quizId: string, userId?: string) {
    const implementation = await apiManager.getApiImplementation();
    return implementation.quiz.startAttempt(quizId, userId);
  },

  /**
   * Submit quiz attempt
   */
  async submitQuizAttempt(attemptId: string, answers: QuizAnswer[]) {
    const implementation = await apiManager.getApiImplementation();
    return implementation.quiz.submitAttempt(attemptId, answers);
  }
};

/**
 * Generic HTTP client facade
 */
export const httpAPI = {
  /**
   * Initialize the API system
   */
  async initialize() {
    return apiManager.initialize();
  },

  /**
   * GET request
   */
  async get<T = unknown>(endpoint: string, config?: Record<string, unknown>) {
    const implementation = await apiManager.getApiImplementation();
    return implementation.api.get<T>(endpoint, config);
  },

  /**
   * POST request
   */
  async post<T = unknown>(endpoint: string, body?: unknown, config?: Record<string, unknown>) {
    const implementation = await apiManager.getApiImplementation();
    return implementation.api.post<T>(endpoint, body, config);
  },

  /**
   * PUT request
   */
  async put<T = unknown>(endpoint: string, body?: unknown, config?: Record<string, unknown>) {
    const implementation = await apiManager.getApiImplementation();
    return implementation.api.put<T>(endpoint, body, config);
  },

  /**
   * DELETE request
   */
  async delete<T = unknown>(endpoint: string, config?: Record<string, unknown>) {
    const implementation = await apiManager.getApiImplementation();
    return implementation.api.delete<T>(endpoint, config);
  },

  /**
   * PATCH request
   */
  async patch<T = unknown>(endpoint: string, body?: unknown, config?: Record<string, unknown>) {
    const implementation = await apiManager.getApiImplementation();
    return implementation.api.patch<T>(endpoint, body, config);
  }
};

/**
 * API Status and Debug Information
 */
export const apiStatus = {
  /**
   * Get current API configuration
   */
  getConfig() {
    return API_CONFIG;
  },

  /**
   * Get API implementation details
   */
  async getImplementation() {
    const implementation = await apiManager.getApiImplementation();
    return {
      type: implementation.type,
      mswInitialized: apiManager['mswInitialized'],
      environment: API_CONFIG
    };
  },

  /**
   * Force reinitialization of API
   */
  async reinitialize() {
    apiManager['initPromise'] = null;
    apiManager['mswInitialized'] = false;
    return apiManager.initialize();
  }
};

/**
 * Default exports for backward compatibility
 */
export default quizAPI;

/**
 * Re-export commonly used types and utilities
 */
export type { QuizAnswer, QuizAttempt } from './rest/quiz';
