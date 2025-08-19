// Student Dashboard - Main page component
import { useEffect, useState } from 'react';
import { useStudentStore } from '@/store/studentStore';
import { studentApiService } from '@/shared/api/studentApi';
import { DashboardHeader } from '@/shared/ui/DashboardHeader';
import { QuizStats } from '@/shared/ui/QuizStats';
import { QuizCard } from '@/entities/quiz/ui/QuizCard';
import type { Quiz } from '@/store/studentStore';

export const StudentDashboard = () => {
  const {
    profile,
    availableQuizzes,
    completedQuizzes,
    isLoading,
    setProfile,
    setAvailableQuizzes,
    setCompletedQuizzes,
    setLoading,
    startQuiz
  } = useStudentStore();

  const [activeTab, setActiveTab] = useState<'available' | 'completed'>('available');

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [profileData, allQuizzes] = await Promise.all([
          studentApiService.getProfile(),
          studentApiService.getAllQuizzes()
        ]);

        setProfile(profileData);
        setAvailableQuizzes(allQuizzes.filter(quiz => !quiz.isCompleted));
        setCompletedQuizzes(allQuizzes.filter(quiz => quiz.isCompleted));
      } catch (error) {
        console.error('Failed to load student data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [setProfile, setAvailableQuizzes, setCompletedQuizzes, setLoading]);

  const handleStartQuiz = (quiz: Quiz) => {
    startQuiz(quiz);
    console.log('Starting quiz:', quiz.title);
    // Ở đây sẽ navigate đến quiz page
  };

  const handleViewDetails = (quiz: Quiz) => {
    console.log('Viewing quiz details:', quiz.title);
    // Ở đây sẽ navigate đến quiz details page
  };

  const allQuizzes = [...availableQuizzes, ...completedQuizzes];

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader profile={profile} isLoading={isLoading} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics */}
        <QuizStats allQuizzes={allQuizzes} isLoading={isLoading} />

        {/* Quiz Tabs */}
        <div className="bg-white rounded-lg shadow-sm">
          {/* Tab Headers */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('available')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'available'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Bài quiz khả dụng ({availableQuizzes.length})
              </button>
              <button
                onClick={() => setActiveTab('completed')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'completed'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Đã hoàn thành ({completedQuizzes.length})
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-white rounded-lg shadow p-6 animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3 mb-4"></div>
                    <div className="h-8 bg-gray-200 rounded"></div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                {activeTab === 'available' && (
                  <div>
                    {availableQuizzes.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {availableQuizzes.map((quiz) => (
                          <QuizCard
                            key={quiz.id}
                            quiz={quiz}
                            variant="available"
                            onStartQuiz={handleStartQuiz}
                            onViewDetails={handleViewDetails}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <div className="text-6xl mb-4">📚</div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          Không có bài quiz nào
                        </h3>
                        <p className="text-gray-500">
                          Hiện tại không có bài quiz nào khả dụng. Hãy quay lại sau nhé!
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'completed' && (
                  <div>
                    {completedQuizzes.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {completedQuizzes.map((quiz) => (
                          <QuizCard
                            key={quiz.id}
                            quiz={quiz}
                            variant="completed"
                            onStartQuiz={handleStartQuiz}
                            onViewDetails={handleViewDetails}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <div className="text-6xl mb-4">🎯</div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          Chưa hoàn thành bài quiz nào
                        </h3>
                        <p className="text-gray-500">
                          Bạn chưa hoàn thành bài quiz nào. Hãy thử làm một số bài quiz khả dụng!
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
