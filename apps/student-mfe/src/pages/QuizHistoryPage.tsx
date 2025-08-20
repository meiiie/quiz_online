/**
 * Quiz History Page
 * 
 * Complete page for viewing quiz completion history and statistics
 * Following FSD page layer principles
 */

import { QuizHistoryList } from '../widgets/QuizHistoryList';

export const QuizHistoryPage = () => {
  const handleViewDetails = (attemptId: string) => {
    // TODO: Navigate to attempt details page or show modal
    console.log('View attempt details:', attemptId);
    // Could implement routing to /student/history/:attemptId
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  📚 Lịch sử làm bài
                </h1>
                <p className="mt-2 text-gray-600">
                  Xem lại các bài kiểm tra đã hoàn thành và theo dõi tiến độ học tập
                </p>
              </div>
              
              {/* Quick Actions */}
              <div className="flex space-x-3">
                <button
                  onClick={() => window.location.href = '/student/dashboard'}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  🏠 Dashboard
                </button>
                <button
                  onClick={() => window.location.href = '/student/quizzes'}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  🎯 Làm bài mới
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <QuizHistoryList 
          onViewDetails={handleViewDetails}
          showStats={true}
        />
      </div>

      {/* Footer */}
      <div className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-gray-500">
            💡 <strong>Mẹo:</strong> Thường xuyên ôn tập các bài đã làm để củng cố kiến thức
          </div>
        </div>
      </div>
    </div>
  );
};
