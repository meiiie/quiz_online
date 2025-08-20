/**
 * Sidebar Widget - Student MFE
 * 
 * Triết lý: Widget đơn giản cho navigation
 * Không có logic phức tạp, chỉ hiển thị menu và handle click
 */

import { type FC } from 'react';
import { useView } from '../../../shared/lib/viewManager';
import { useSidebar } from '../model/useSidebar';

export interface SidebarProps {
  className?: string;
}

export const Sidebar: FC<SidebarProps> = ({ className = '' }) => {
  const { currentView, setView } = useView();
  const { navItems } = useSidebar();

  return (
    <div className={`w-64 h-full bg-white border-r border-gray-200 p-4 ${className}`}>
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900">Student Portal</h2>
        <p className="text-sm text-gray-500">Navigate your learning</p>
      </div>

      {/* Navigation Items */}
      <nav>
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setView(item.id)}
                className={`
                  w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors
                  ${currentView === item.id 
                    ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                    : 'text-gray-700 hover:bg-gray-50'
                  }
                `.trim()}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="mt-8 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-400">Student MFE v1.0</p>
      </div>
    </div>
  );
};

export default Sidebar;
