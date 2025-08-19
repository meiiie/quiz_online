// Quiz Statistics Component
import type { Quiz } from '@/store/studentStore';

interface QuizStatsProps {
  allQuizzes: Quiz[];
  isLoading?: boolean;
}

export const QuizStats = ({ allQuizzes, isLoading }: QuizStatsProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-lg shadow p-6 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  const totalQuizzes = allQuizzes.length;
  const completedQuizzes = allQuizzes.filter(quiz => quiz.isCompleted).length;
  const averageScore = allQuizzes
    .filter(quiz => quiz.isCompleted && quiz.score)
    .reduce((acc, quiz) => acc + (quiz.score || 0), 0) / 
    (allQuizzes.filter(quiz => quiz.isCompleted && quiz.score).length || 1);

  const stats = [
    {
      label: 'Tổng số bài quiz',
      value: totalQuizzes,
      color: 'bg-blue-500',
      icon: '📚'
    },
    {
      label: 'Đã hoàn thành',
      value: completedQuizzes,
      color: 'bg-green-500',
      icon: '✅'
    },
    {
      label: 'Điểm trung bình',
      value: `${Math.round(averageScore)}%`,
      color: 'bg-purple-500',
      icon: '🎯'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </div>
            <div className="text-3xl">{stat.icon}</div>
          </div>
          <div className={`mt-4 h-2 rounded-full ${stat.color} opacity-20`}></div>
        </div>
      ))}
    </div>
  );
};
