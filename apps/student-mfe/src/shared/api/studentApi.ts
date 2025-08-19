// Mock Data Service - Giả lập API calls
import type { Quiz, StudentProfile } from '@/store/studentStore';

// Mock student profile data
export const mockStudentProfile: StudentProfile = {
  id: 'student-001',
  name: 'Nguyễn Văn A',
  email: 'student@test.com',
  studentId: 'SV2024001',
  class: 'CNTT-K19',
  avatar: 'https://ui-avatars.com/api/?name=Nguyen+Van+A&background=0ea5e9&color=fff'
};

// Mock quiz data
export const mockQuizzes: Quiz[] = [
  {
    id: 'quiz-001',
    title: 'JavaScript Cơ Bản',
    description: 'Kiểm tra kiến thức cơ bản về JavaScript, bao gồm biến, hàm, và đối tượng.',
    questionCount: 15,
    duration: 30,
    totalQuestions: 15,
    difficulty: 'easy',
    subject: 'Lập trình Web',
    isCompleted: false,
    status: 'pending',
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 'quiz-002',
    title: 'React Hooks & State Management',
    description: 'Đánh giá hiểu biết về React Hooks, useState, useEffect và quản lý state.',
    questionCount: 20,
    duration: 45,
    totalQuestions: 20,
    difficulty: 'medium',
    subject: 'React Framework',
    isCompleted: true,
    status: 'completed',
    score: 85,
    completedAt: '2024-01-10T14:30:00Z',
    createdAt: '2024-01-08T09:00:00Z'
  },
  {
    id: 'quiz-003',
    title: 'TypeScript Advanced',
    description: 'Kiểm tra kiến thức nâng cao về TypeScript: Generics, Utility Types, Module.',
    questionCount: 25,
    duration: 60,
    totalQuestions: 25,
    difficulty: 'hard',
    subject: 'TypeScript',
    isCompleted: false,
    status: 'pending',
    createdAt: '2024-01-12T11:00:00Z'
  },
  {
    id: 'quiz-004',
    title: 'Database Design & SQL',
    description: 'Thiết kế cơ sở dữ liệu và các câu truy vấn SQL cơ bản đến nâng cao.',
    questionCount: 18,
    duration: 40,
    totalQuestions: 18,
    difficulty: 'medium',
    subject: 'Cơ sở dữ liệu',
    isCompleted: true,
    status: 'completed',
    score: 92,
    completedAt: '2024-01-05T16:45:00Z',
    createdAt: '2024-01-03T08:30:00Z'
  },
  {
    id: 'quiz-005',
    title: 'HTML & CSS Responsive',
    description: 'Kiểm tra kỹ năng tạo layout responsive và semantic HTML.',
    questionCount: 12,
    duration: 25,
    totalQuestions: 12,
    difficulty: 'easy',
    subject: 'Front-end',
    isCompleted: false,
    status: 'pending',
    createdAt: '2024-01-18T13:00:00Z'
  }
];

// Mock API service
export const studentApiService = {
  // Lấy thông tin profile
  async getProfile(): Promise<StudentProfile> {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
    return mockStudentProfile;
  },

  // Lấy danh sách quiz available
  async getAvailableQuizzes(): Promise<Quiz[]> {
    await new Promise(resolve => setTimeout(resolve, 800));
    return mockQuizzes.filter(quiz => !quiz.isCompleted);
  },

  // Lấy lịch sử quiz đã hoàn thành
  async getCompletedQuizzes(): Promise<Quiz[]> {
    await new Promise(resolve => setTimeout(resolve, 600));
    return mockQuizzes.filter(quiz => quiz.isCompleted);
  },

  // Lấy tất cả quiz
  async getAllQuizzes(): Promise<Quiz[]> {
    await new Promise(resolve => setTimeout(resolve, 700));
    return mockQuizzes;
  },

  // Submit quiz results
  async submitQuizResult(quizId: string, score: number): Promise<{ success: boolean; message: string }> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(`Submitting quiz ${quizId} with score ${score}`);
    return {
      success: true,
      message: `Quiz ${quizId} submitted successfully with score: ${score}`
    };
  }
};
