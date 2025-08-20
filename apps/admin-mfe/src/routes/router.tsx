import { createBrowserRouter, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Layout from '../layouts/Layout';

// Lazy load components để tránh circular imports
const Dashboard = lazy(() => import('../pages/Dashboard'));
const UserManagementPage = lazy(() => import('../pages/UserManagementPage'));
const QuizManagementPage = lazy(() => import('../pages/QuizManagementPage'));
const SystemReportsPage = lazy(() => import('../pages/SystemReportsPage'));

// Loading component
const LoadingFallback = () => <div>Đang tải...</div>;

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />
      },
      {
        path: 'dashboard',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Dashboard />
          </Suspense>
        )
      },
      {
        path: 'user-management',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <UserManagementPage />
          </Suspense>
        )
      },
      {
        path: 'quiz-management',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <QuizManagementPage />
          </Suspense>
        )
      },
      {
        path: 'system-reports',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <SystemReportsPage />
          </Suspense>
        )
      }
    ]
  }
]);

export default router;
