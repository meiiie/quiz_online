import { QuizCard } from '@/entities/quiz/ui/QuizCard';
import { MOCK_QUIZZES } from '@/shared/api/mock/quizzes';

export const QuizList = () => {
  const quizzes = MOCK_QUIZZES;

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-700">Lịch sử làm bài</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes.map((quiz) => (
          <QuizCard key={quiz.id} quiz={quiz} />
        ))}
      </div>
    </div>
  );
};