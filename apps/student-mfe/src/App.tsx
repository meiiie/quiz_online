/**
 * Student MFimport { AppProviders } from './app/providers/AppProviders';
import { ViewProvider, useView } from './shared/lib/viewManager';
import { Sidebar } from './widgets/Sidebar';
import StudentDashboardPage from './pages/StudentDashboardPage';
import QuizListPage from './pages/QuizListPage';lication - Feature-Sliced Design + MFE Best Practices
 * 
 * Triết lý MFE:
 * - Không có routing phức tạp (Host-Shell lo việc đó)
 * - Chỉ quản lý view state nội bộ đơn giản
 * - Giao tiếp với Host-Shell qua PostMessage
 * - Layout-agnostic: Host-Shell lo layout tổng thể
 * 
 * FSD Architecture:
 * - app: Khởi tạo và providers
 * - pages: Các trang/view hoàn chỉnh
 * - widgets: Các khối UI lớn (Sidebar, Header...)
 * - features: Các tính năng cụ thể
 * - entities: Business entities
 * - shared: Code tái sử dụng
 */

import AppProviders from './app/providers/AppProviders';
import { ViewProvider, useView } from './shared/lib/viewManager';
import { Sidebar } from './widgets/Sidebar';
import StudentDashboardPage from './pages/StudentDashboardPage';
import QuizListPage from './pages/QuizListPage';
import TakeQuizPage from './pages/TakeQuizPage';
import { QuizHistoryPage } from './pages/QuizHistoryPage';

// Main content renderer
const AppContent = () => {
  const { currentView, viewParams } = useView();

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <StudentDashboardPage />;
      case 'quizzes':
        return <QuizListPage />;
      case 'take-quiz':
        return <TakeQuizPage quizId={viewParams.quizId} />;
      case 'history':
        return <QuizHistoryPage />;
      case 'profile':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">👤 Profile</h1>
            <p>Manage your student profile and settings.</p>
          </div>
        );
      default:
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">View not found</h1>
            <p>The requested view "{currentView}" does not exist.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - Navigation Widget - Fixed Container */}
      <div className="flex-shrink-0">
        <Sidebar />
      </div>
      
      {/* Main Content - Pages */}
      <main className="flex-1 overflow-auto bg-white">
        <div className="h-full">
          {renderView()}
        </div>
      </main>
    </div>
  );
};

// Root App Component
function App() {
  return (
    <AppProviders>
      <ViewProvider initialView="dashboard">
        <AppContent />
      </ViewProvider>
    </AppProviders>
  );
}

export default App;
