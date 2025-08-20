// src/pages/UserManagementPage.tsx

import { useState, useEffect, useCallback } from 'react';
import UserManagement, { type User } from '../features/user-management/UserManagement';
import { useAuth } from '../hooks/useAuth';

const UserManagementPage = () => {
  const { currentUser, isLoading: authLoading } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Hàm fetch danh sách người dùng từ API
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/users');
      if (!response.ok) {
        throw new Error('Không thể tải danh sách người dùng');
      }
      const data = await response.json();
      setUsers(data);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Gọi API khi component được mount
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Thêm người dùng mới
  const addUser = async (userData: Omit<User, 'id' | 'createdAt' | 'lastLogin'>) => {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Thêm người dùng thất bại');
      }
      
      // Tải lại danh sách sau khi thêm thành công
      await fetchUsers();
    } catch (error: any) {
      throw new Error(`Thêm người dùng thất bại: ${error.message}`);
    }
  };

  // Cập nhật thông tin người dùng
  const updateUser = async (userId: number, userData: Partial<User>) => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Cập nhật người dùng thất bại');
      }
      
      // Tải lại danh sách sau khi cập nhật thành công
      await fetchUsers();
    } catch (error: any) {
      throw new Error(`Cập nhật người dùng thất bại: ${error.message}`);
    }
  };

  // Xóa người dùng bằng cách gọi API
  const deleteUser = async (userId: number) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
      try {
        const response = await fetch(`/api/users/${userId}`, { method: 'DELETE' });
        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.message || 'Xóa người dùng thất bại');
        }
        // Tải lại danh sách người dùng sau khi xóa thành công
        await fetchUsers();
      } catch (error: any) {
        alert(`Lỗi: ${error.message}`);
      }
    }
  };

  // Thay đổi trạng thái người dùng bằng cách gọi API
  const toggleUserStatus = async (userId: number) => {
    try {
      const response = await fetch(`/api/users/${userId}/toggle-status`, { method: 'PATCH' });
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Cập nhật trạng thái thất bại');
      }
      // Tải lại danh sách người dùng sau khi cập nhật thành công
      await fetchUsers();
    } catch (error: any) {
      alert(`Lỗi: ${error.message}`);
    }
  };

  // Kiểm tra quyền truy cập - chỉ admin mới được phép
  if (!authLoading && (!currentUser || currentUser.role !== 'admin')) {
    return (
      <div className="unauthorized">
        <h2>Không có quyền truy cập</h2>
        <p>Chỉ có admin mới có thể truy cập trang này.</p>
      </div>
    );
  }

  if (authLoading) {
    return <div className="loading">Đang xác thực...</div>;
  }

  if (loading) {
    return <div>Đang tải dữ liệu...</div>;
  }

  if (error) {
    return <div>Lỗi: {error}</div>;
  }

  return (
    <UserManagement 
      users={users}
      onAddUser={addUser}
      onUpdateUser={updateUser}
      onDeleteUser={deleteUser}
      onToggleUserStatus={toggleUserStatus}
    />
  );
};

export default UserManagementPage;