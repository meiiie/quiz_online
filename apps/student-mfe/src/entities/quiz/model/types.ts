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
  totalQuestions?: number;
  completedAt?: string;
}
