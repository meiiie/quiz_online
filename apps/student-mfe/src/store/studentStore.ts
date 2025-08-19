// Student Store - Quản lý state cho student MFE
import { create } from 'zustand';
import type { Quiz } from '@/entities/quiz/model/types';

// Re-export Quiz type for convenience
export type { Quiz } from '@/entities/quiz/model/types';

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  studentId: string;
  class: string;
  avatar?: string;
}

interface StudentState {
  // Student profile
  profile: StudentProfile | null;
  setProfile: (profile: StudentProfile) => void;
  
  // Available quizzes
  availableQuizzes: Quiz[];
  setAvailableQuizzes: (quizzes: Quiz[]) => void;
  
  // Completed quizzes
  completedQuizzes: Quiz[];
  setCompletedQuizzes: (quizzes: Quiz[]) => void;
  
  // Current quiz
  currentQuiz: Quiz | null;
  setCurrentQuiz: (quiz: Quiz | null) => void;
  
  // Loading states
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  
  // Actions
  completeQuiz: (quizId: string, score: number) => void;
  startQuiz: (quiz: Quiz) => void;
}

export const useStudentStore = create<StudentState>((set, get) => ({
  // Initial state
  profile: null,
  availableQuizzes: [],
  completedQuizzes: [],
  currentQuiz: null,
  isLoading: false,
  
  // Setters
  setProfile: (profile) => set({ profile }),
  setAvailableQuizzes: (quizzes) => set({ availableQuizzes: quizzes }),
  setCompletedQuizzes: (quizzes) => set({ completedQuizzes: quizzes }),
  setCurrentQuiz: (quiz) => set({ currentQuiz: quiz }),
  setLoading: (loading) => set({ isLoading: loading }),
  
  // Actions
  completeQuiz: (quizId, score) => {
    const state = get();
    const quiz = state.availableQuizzes.find(q => q.id === quizId);
    if (quiz) {
      const completedQuiz: Quiz = {
        ...quiz,
        isCompleted: true,
        score,
        completedAt: new Date().toISOString()
      };
      
      set({
        completedQuizzes: [...state.completedQuizzes, completedQuiz],
        availableQuizzes: state.availableQuizzes.map(q => 
          q.id === quizId ? completedQuiz : q
        ),
        currentQuiz: null
      });
    }
  },
  
  startQuiz: (quiz) => {
    set({ currentQuiz: quiz });
  }
}));
