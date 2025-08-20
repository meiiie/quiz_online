/**
 * Sidebar Model - Student MFE
 * 
 * Triết lý: Hook đơn giản quản lý navigation items
 * Không có logic phức tạp, chỉ cung cấp data và basic functions
 */

import { useMemo } from 'react';
import { type StudentView } from '../../../shared/lib/viewManager';

export interface NavItem {
  id: StudentView;
  label: string;
  icon: string;
}

export const useSidebar = () => {
  const navItems: NavItem[] = useMemo(() => [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: '📊'
    },
    {
      id: 'quizzes',
      label: 'Quizzes',
      icon: '📝'
    },
    {
      id: 'history',
      label: 'History',
      icon: '📚'
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: '👤'
    }
  ], []);

  return {
    navItems
  };
};
