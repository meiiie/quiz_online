import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      {/* Main Content */}
      <main className="dashboard-main">
        {/* Stats Cards */}
        <section className="stats-section">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">📊</div>
              <div className="stat-content">
                <h3>Tổng số câu hỏi</h3>
                <p className="stat-number">1,250</p>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">👥</div>
              <div className="stat-content">
                <h3>Người dùng</h3>
                <p className="stat-number">847</p>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">📝</div>
              <div className="stat-content">
                <h3>Bài thi hôm nay</h3>
                <p className="stat-number">23</p>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">⭐</div>
              <div className="stat-content">
                <h3>Điểm trung bình</h3>
                <p className="stat-number">7.8</p>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="actions-section">
          <h2>Quản lý nhanh</h2>
          <div className="actions-grid">
            <button 
              className="action-btn primary"
              onClick={() => navigate('/quiz-management')}
            >
              <span className="action-icon">➕</span>
              <span>Thêm câu hỏi mới</span>
            </button>
            
            <button 
              className="action-btn secondary"
              onClick={() => navigate('/user-management')}
            >
              <span className="action-icon">👥</span>
              <span>Quản lý người dùng</span>
            </button>
            
            <button 
              className="action-btn tertiary"
              onClick={() => navigate('/system-reports')}
            >
              <span className="action-icon">📊</span>
              <span>Xem báo cáo</span>
            </button>
          </div>
        </section>

        {/* Recent Activity */}
        <section className="activity-section">
          <h2>Hoạt động gần đây</h2>
          <div className="activity-list">
            <div className="activity-item">
              <div className="activity-time">10:30</div>
              <div className="activity-content">
                <strong>Nguyễn Văn A</strong> đã hoàn thành bài thi Toán học
              </div>
            </div>
            
            <div className="activity-item">
              <div className="activity-time">09:15</div>
              <div className="activity-content">
                <strong>Trần Thị B</strong> đã thêm 5 câu hỏi mới
              </div>
            </div>
            
            <div className="activity-item">
              <div className="activity-time">08:45</div>
              <div className="activity-content">
                <strong>Lê Văn C</strong> đã đăng ký tài khoản mới
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
