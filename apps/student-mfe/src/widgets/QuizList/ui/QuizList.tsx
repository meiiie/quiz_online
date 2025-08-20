/**
 * QuizList Widget - Student MFE
 * 
 * Widget hiển thị danh sách quiz với loading, error handling và filtering
 * Theo FSD: Widgets kết hợp features và entities để tạo UI blocks lớn
 */

import { type FC, useState } from 'react';
import { useQuizList } from '../../../features/quiz-list/model/useQuizList';
import QuizCard from '../../../entities/quiz/ui/QuizCard';
import { Card, Button } from '../../../shared/ui';

interface QuizListProps {
  /** Callback khi user click vào một quiz */
  onQuizSelect?: (quizId: string) => void;
  /** Hiển thị filter controls */
  showFilters?: boolean;
}

export const QuizList: FC<QuizListProps> = ({ 
  onQuizSelect,
  showFilters = true 
}) => {
  const { quizzes, isLoading, error, refetch, filterByCategory, clearFilter } = useQuizList();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Lấy danh sách categories duy nhất
  const categories = ['all', ...Array.from(new Set(quizzes.map(quiz => quiz.category)))];

  const handleCategoryChange = async (category: string) => {
    setSelectedCategory(category);
    if (category === 'all') {
      await clearFilter();
    } else {
      await filterByCategory(category);
    }
  };

  const handleQuizClick = (quizId: string) => {
    console.log('Quiz selected:', quizId);
    onQuizSelect?.(quizId);
  };

  const handleRetry = () => {
    refetch();
  };

  // Loading state
  if (isLoading) {
    return (
      <Card className="text-center py-8">
        <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-gray-600">Loading quizzes...</p>
      </Card>
    );
  }

  // Error state
  if (error) {
    return (
      <Card className="text-center py-8 border-red-200 bg-red-50">
        <div className="text-red-500 text-4xl mb-4">❌</div>
        <h3 className="text-lg font-semibold text-red-800 mb-2">Oops! Something went wrong</h3>
        <p className="text-red-600 mb-4">{error}</p>
        <Button 
          onClick={handleRetry}
          variant="primary"
          size="sm"
        >
          Try Again
        </Button>
      </Card>
    );
  }

  // Empty state
  if (quizzes.length === 0) {
    return (
      <Card className="text-center py-8">
        <div className="text-gray-400 text-4xl mb-4">📝</div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">No quizzes found</h3>
        <p className="text-gray-600 mb-4">
          {selectedCategory === 'all' 
            ? 'There are no quizzes available at the moment.' 
            : `No quizzes found in "${selectedCategory}" category.`
          }
        </p>
        {selectedCategory !== 'all' && (
          <Button 
            onClick={() => handleCategoryChange('all')}
            variant="secondary"
            size="sm"
          >
            Show All Quizzes
          </Button>
        )}
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filter Controls */}
      {showFilters && (
        <Card>
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-sm font-medium text-gray-700">Filter by category:</span>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`
                    px-3 py-1 rounded-full text-sm font-medium transition-colors
                    ${selectedCategory === category
                      ? 'bg-blue-100 text-blue-700 border border-blue-300'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }
                  `}
                >
                  {category === 'all' ? 'All Categories' : category}
                </button>
              ))}
            </div>
            <div className="text-sm text-gray-500">
              {quizzes.length} quiz{quizzes.length !== 1 ? 'es' : ''} found
            </div>
          </div>
        </Card>
      )}

      {/* Quiz Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes.map((quiz) => (
          <QuizCard
            key={quiz.id}
            quiz={quiz}
            onStartQuiz={() => handleQuizClick(quiz.id)}
            onViewDetails={() => handleQuizClick(quiz.id)}
          />
        ))}
      </div>
    </div>
  );
};
