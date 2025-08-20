// ========================================================================
// FILE: src/layouts/StudentLayout.tsx
// PURPOSE: Layout dành riêng cho Student MFE - không có Header/Footer
// DESIGN: Full-screen layout for dashboard experience
// ========================================================================

import { type ReactNode } from 'react';

interface StudentLayoutProps {
  children: ReactNode;
}

export default function StudentLayout({ children }: StudentLayoutProps) {
  return (
    <div className="w-full h-full bg-gray-50">
      {/* No Header, No Footer - Full canvas for Student MFE */}
      <main className="w-full h-full">
        {children}
      </main>
    </div>
  );
}
