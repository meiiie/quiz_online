import { Outlet, useNavigate, useLocation } from 'react-router-dom';

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/dashboard':
        return '🎯 Quiz Admin Dashboard';
      case '/user-management':
        return '👥 Quản lý người dùng';
      case '/quiz-management':
        return '📝 Quản lý câu hỏi';
      case '/system-reports':
        return '📊 Báo cáo hệ thống';
      default:
        return '🎯 Quiz Admin Dashboard';
    }
  };

  const showBackButton = location.pathname !== '/dashboard';

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <h1 className="header-title">{getPageTitle()}</h1>
          <div className="header-user">
            {showBackButton && (
              <button 
                className="back-btn"
                onClick={() => navigate('/dashboard')}
              >
                ← Về Dashboard
              </button>
            )}
            <span className="user-name">Admin User</span>
            <button className="logout-btn">Đăng xuất</button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <Outlet />
    </div>
  );
};

export default Layout;
