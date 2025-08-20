/**
 * App Providers - Student MFE
 * 
 * Triết lý: Quản lý các Provider cần thiết cho MFE
 * Không có Router vì Host-Shell sẽ lo routing
 */

import { type FC, type ReactNode } from 'react';

interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders: FC<AppProvidersProps> = ({ children }) => {
  return (
    <>
      {/* Có thể thêm ThemeProvider, ErrorBoundary, etc. */}
      {children}
    </>
  );
};

export default AppProviders;
