// Quiz entity types
export interface Quiz {
  id: string;
  title: string;
  description: string;
  questionCount: number;
  duration: number; // in minutes
  createdAt: string;
  status: 'pending' | 'completed' | 'in-progress';
  score?: number;
  totalQuestions: number; // Make this required to match studentStore
  completedAt?: string;
  // Additional properties for QuizCard compatibility
  difficulty: 'easy' | 'medium' | 'hard'; // Make this required
  subject: string; // Make this required
  isCompleted: boolean; // Make this required
}
