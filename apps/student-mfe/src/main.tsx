import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { quizAPI } from './shared/api'

/**
 * Initialize API system (MSW + REST fallback)
 * Uses the facade pattern for automatic environment detection
 */
async function initializeApp() {
  try {
    console.log('� Initializing Student MFE Application...');
    
    // Initialize the API facade which handles MSW automatically
    await quizAPI.initialize();
    
    console.log('✅ API: System initialized successfully');
    
    // Test API connectivity
    try {
      const testResult = await quizAPI.test();
      console.log('🎯 API Test:', testResult);
    } catch (error) {
      console.warn('⚠️ API Test failed, but system will continue:', error);
    }
    
  } catch (error) {
    console.error('❌ Failed to initialize API system:', error);
    console.log('📝 Application will continue with fallback behavior');
  }
}

// Initialize app with API system
initializeApp().then(() => {
  // Small delay to ensure API system is fully initialized
  setTimeout(() => {
    createRoot(document.getElementById('root')!).render(
      <StrictMode>
        <App />
      </StrictMode>,
    );
    console.log('🎉 Student MFE: Application rendered successfully');
  }, 100); // 100ms delay for API initialization
});
