import type { Quiz } from '@/store/studentStore';

interface QuizCardProps {
  quiz: Quiz;
  onStartQuiz?: (quiz: Quiz) => void;
  onViewDetails?: (quiz: Quiz) => void;
  variant?: 'available' | 'completed';
}

export const QuizCard = ({ 
  quiz, 
  onStartQuiz, 
  onViewDetails, 
  variant = 'available' 
}: QuizCardProps) => {
  const difficultyColors = {
    easy: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    hard: 'bg-red-100 text-red-800'
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
      {/* Header */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-semibold text-gray-900 line-clamp-2">
            {quiz.title}
          </h3>
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${difficultyColors[quiz.difficulty]}`}>
            {quiz.difficulty === 'easy' ? 'Dễ' : 
             quiz.difficulty === 'medium' ? 'Trung bình' : 'Khó'}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {quiz.description}
        </p>

        {/* Quiz Info */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-sm">
            <span className="text-gray-500">Môn học:</span>
            <p className="font-medium text-gray-900">{quiz.subject}</p>
          </div>
          <div className="text-sm">
            <span className="text-gray-500">Thời gian:</span>
            <p className="font-medium text-gray-900">{quiz.duration} phút</p>
          </div>
          <div className="text-sm">
            <span className="text-gray-500">Số câu hỏi:</span>
            <p className="font-medium text-gray-900">{quiz.totalQuestions} câu</p>
          </div>
          <div className="text-sm">
            <span className="text-gray-500">Ngày tạo:</span>
            <p className="font-medium text-gray-900">{formatDate(quiz.createdAt)}</p>
          </div>
        </div>

        {/* Completed Quiz Info */}
        {variant === 'completed' && quiz.isCompleted && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-800">
                  Điểm số: {quiz.score}/{quiz.totalQuestions * 10} ({Math.round((quiz.score || 0) / quiz.totalQuestions)}%)
                </p>
                {quiz.completedAt && (
                  <p className="text-xs text-green-600">
                    Hoàn thành: {formatDate(quiz.completedAt)}
                  </p>
                )}
              </div>
              <div className="text-2xl">
                {(quiz.score || 0) >= quiz.totalQuestions * 7 ? '🏆' : 
                 (quiz.score || 0) >= quiz.totalQuestions * 5 ? '⭐' : '📖'}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="px-6 pb-6">
        {variant === 'available' && !quiz.isCompleted ? (
          <button
            onClick={() => onStartQuiz?.(quiz)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
          >
            Bắt đầu làm bài
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={() => onViewDetails?.(quiz)}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Xem chi tiết
            </button>
            {quiz.isCompleted && (
              <button
                onClick={() => onStartQuiz?.(quiz)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
              >
                Làm lại
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};