// Student Dashboard Header Component
import { StudentProfile } from '@/store/studentStore';

interface DashboardHeaderProps {
  profile: StudentProfile | null;
  isLoading?: boolean;
}

export const DashboardHeader = ({ profile, isLoading }: DashboardHeaderProps) => {
  if (isLoading) {
    return (
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-48"></div>
            </div>
            <div className="animate-pulse flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
              <div className="h-6 bg-gray-200 rounded w-24"></div>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Quiz Dashboard
            </h1>
            <p className="text-sm text-gray-600">
              Chào mừng bạn trở lại! Hãy tiếp tục học tập nhé.
            </p>
          </div>
          
          {profile && (
            <div className="flex items-center space-x-3">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{profile.name}</p>
                <p className="text-xs text-gray-500">{profile.studentId} - {profile.class}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
