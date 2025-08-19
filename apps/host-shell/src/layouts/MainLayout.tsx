// ========================================================================
// FILE: src/layouts/MainLayout.tsx
// PURPOSE: Main layout with mobile-optimized spacing
// DESIGN: Professional layout with responsive design using mobile hook
// ========================================================================
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollToTopButton from '../components/ScrollToTopButton';
import { Toaster } from '../components/ui/toaster';
import { useIsMobile } from '../hooks/use-mobile';

export default function MainLayout() {
  const location = useLocation();
  const isMobile = useIsMobile();
  
  // Homepage doesn't need top padding because it has full-height hero section
  const isHomePage = location.pathname === '/';
  
  // Mobile-optimized padding
  const topPadding = !isHomePage ? (isMobile ? 'pt-16' : 'pt-24') : '';
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      {/* Main content with mobile-optimized padding */}
      <main className={`flex-grow ${topPadding}`}>
        <Outlet /> 
      </main>

      <Footer />
      
      {/* Mobile-optimized scroll to top button */}
      <ScrollToTopButton showAfter={isMobile ? 200 : 300} />
      
      {/* Toast notifications */}
      <Toaster />
    </div>
  );
}