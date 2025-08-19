// ========================================================================
// FILE: src/routes/AppRoutes.tsx
// PURPOSE: Main routing configuration for MFE architecture
// ARCHITECTURE: Simple routing with protected routes for MFE integration
// ========================================================================

import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoutes';
import MainLayout from '../layouts/MainLayout';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import NotFoundPage from '../pages/NotFoundPage';
import HelpPage from '../pages/HelpPage';

// Lazy load Student MFE (thật sự từ remote)
const StudentApp = lazy(async () => {
  try {
    const module = await import('student_mfe/StudentApp');
    return module;
  } catch (error) {
    console.error('Failed to load Student MFE:', error);
    return { 
      default: () => (
        <div className="p-4 text-center">
          <h2 className="text-xl font-bold text-red-600">Student MFE Loading Error</h2>
          <p className="text-gray-600">Could not load the student application.</p>
          <p className="text-sm text-gray-500 mt-2">Please ensure student-mfe is running on port 5001</p>
        </div>
      ) 
    };
  }
});

export default function AppRoutes() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* Protected Routes for Student MFE */}
        <Route element={<ProtectedRoute allowedRoles={['student']} />}>
          <Route path="/student/*" element={<StudentApp />} />
        </Route>
        
        {/* Public routes with MainLayout */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="help" element={<HelpPage />} />
          {/* 404 - Must be last */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}