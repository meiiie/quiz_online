import { type FC } from 'react';
import { Card } from '../../../shared/ui';
import type { Quiz } from '../model/types';

export interface QuizCardProps {
  quiz: Quiz;
  onStartQuiz?: (quizId: string) => void;
  onViewDetails?: (quizId: string) => void;
  showActions?: boolean;
}

const QuizCard: FC<QuizCardProps> = ({
  quiz,
  onStartQuiz,
  onViewDetails,
  showActions = true
}) => {
  const getDifficultyColor = (difficulty: Quiz['difficulty']) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
          {quiz.title}
        </h3>
        <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getDifficultyColor(quiz.difficulty)}`}>
          {quiz.difficulty}
        </span>
      </div>
      
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {quiz.description}
      </p>
      
      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
        <span>📝 {quiz.totalQuestions} questions</span>
        <span>⏱️ {formatDuration(quiz.duration)}</span>
        <span>📂 {quiz.category}</span>
      </div>
      
      {!quiz.isAvailable && (
        <div className="text-orange-600 text-sm mb-3 flex items-center">
          🔒 Not available yet
        </div>
      )}
      
      {showActions && quiz.isAvailable && (
        <div className="flex gap-2">
          <button
            onClick={() => onStartQuiz?.(quiz.id)}
            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Start Quiz
          </button>
          <button
            onClick={() => onViewDetails?.(quiz.id)}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            Details
          </button>
        </div>
      )}
    </Card>
  );
};

export default QuizCard;
