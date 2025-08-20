import { type FC } from 'react';
import { Card } from '../shared/ui';

export const StudentDashboardPage: FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">📊 Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome to your student dashboard!</p>
      </div>

      {/* Quick Stats */}
      <Card title="Quick Stats" variant="elevated">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">12</div>
            <div className="text-sm text-blue-700">Total Quizzes Available</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">8</div>
            <div className="text-sm text-green-700">Completed Quizzes</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">85%</div>
            <div className="text-sm text-purple-700">Average Score</div>
          </div>
        </div>
      </Card>

      {/* Recent Activity */}
      <Card title="Recent Activity">
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <span className="text-lg">📝</span>
              <div>
                <div className="font-medium">JavaScript Fundamentals</div>
                <div className="text-sm text-gray-500">Completed 2 hours ago</div>
              </div>
            </div>
            <span className="text-green-600 font-medium">90%</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <span className="text-lg">📝</span>
              <div>
                <div className="font-medium">React Concepts</div>
                <div className="text-sm text-gray-500">Started 1 day ago</div>
              </div>
            </div>
            <span className="text-blue-600 font-medium">In Progress</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default StudentDashboardPage;
