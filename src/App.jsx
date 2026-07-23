import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import UserStats from './components/UserStats';
import TableControls from './components/TableControls';
import UserTable from './components/UserTable';
import Pagination from './components/Pagination';
import UserDetailModal from './components/UserDetailModal';
import UserFormModal from './components/UserFormModal';
import ToastNotification from './components/ToastNotification';
import { userService } from './services/api';

export function App() {
  // Theme State
  const [theme, setTheme] = useState('light');

  // Data & API State
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [apiSource, setApiSource] = useState('jsonplaceholder');
  const [toast, setToast] = useState(null);

  // Filters & Sorting State
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Modal States
  const [selectedUserForView, setSelectedUserForView] = useState(null);
  const [selectedUserForEdit, setSelectedUserForEdit] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Toggle Dark/Light Theme
  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  // Toast Trigger Helper
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Fetch Users via Axios API
  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const data = await userService.getUsers(apiSource);
      setUsers(data);
      showToast(`Successfully fetched ${data.length} users via Axios from ${apiSource.toUpperCase()}`);
    } catch (err) {
      showToast(err.message || 'Failed to fetch users', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [apiSource]);

  // Extract unique departments for filter dropdown
  const departments = useMemo(() => {
    const set = new Set(users.map(u => u.department).filter(Boolean));
    return Array.from(set);
  }, [users]);

  // Filter & Search Logic
  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesSearch = 
        !searchTerm ||
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.city.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesDept = departmentFilter === 'all' || user.department === departmentFilter;
      const matchesStatus = statusFilter === 'all' || user.status === statusFilter;

      return matchesSearch && matchesDept && matchesStatus;
    });
  }, [users, searchTerm, departmentFilter, statusFilter]);

  // Sorting Logic
  const sortedUsers = useMemo(() => {
    return [...filteredUsers].sort((a, b) => {
      const aVal = a[sortConfig.key] || '';
      const bVal = b[sortConfig.key] || '';

      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredUsers, sortConfig]);

  // Paginated Subset
  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedUsers.slice(start, start + pageSize);
  }, [sortedUsers, currentPage, pageSize]);

  // Reset pagination on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, departmentFilter, statusFilter, pageSize]);

  // Handlers
  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setDepartmentFilter('all');
    setStatusFilter('all');
  };

  // Export Filtered Users to CSV
  const handleExportCSV = () => {
    if (filteredUsers.length === 0) return;
    
    const headers = ['ID', 'Name', 'Username', 'Email', 'Phone', 'Company', 'Department', 'Role', 'City', 'Status'];
    const csvRows = [
      headers.join(','),
      ...filteredUsers.map(u => [
        u.id,
        `"${u.name}"`,
        `"${u.username}"`,
        `"${u.email}"`,
        `"${u.phone}"`,
        `"${u.company}"`,
        `"${u.department}"`,
        `"${u.role}"`,
        `"${u.city}"`,
        `"${u.status}"`
      ].join(','))
    ];

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `user-directory-${Date.now()}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    showToast('Exported filtered data to CSV file');
  };

  // Axios Create User (POST)
  const handleCreateUser = async (formData) => {
    setIsSubmitting(true);
    try {
      const newUser = await userService.createUser(formData);
      setUsers(prev => [newUser, ...prev]);
      setIsCreateModalOpen(false);
      showToast(`Created user "${newUser.name}" via Axios POST request!`);
    } catch (err) {
      showToast(err.message || 'Failed to create user', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Axios Update User (PUT)
  const handleUpdateUser = async (formData) => {
    if (!selectedUserForEdit) return;
    setIsSubmitting(true);
    try {
      const updatedUser = await userService.updateUser(selectedUserForEdit.id, formData);
      setUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
      setSelectedUserForEdit(null);
      showToast(`Updated user "${updatedUser.name}" via Axios PUT request!`);
    } catch (err) {
      showToast(err.message || 'Failed to update user', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Axios Delete User (DELETE)
  const handleDeleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await userService.deleteUser(id);
      setUsers(prev => prev.filter(u => u.id !== id));
      showToast(`Deleted user ID ${id} via Axios DELETE request`);
    } catch (err) {
      showToast(err.message || 'Failed to delete user', 'error');
    }
  };

  const handleCopyEmail = (email) => {
    navigator.clipboard.writeText(email);
    showToast(`Copied ${email} to clipboard`);
  };

  return (
    <div className="app-container">
      {/* Header */}
      <Header 
        totalCount={users.length}
        onRefresh={fetchUsers}
        isLoading={isLoading}
        theme={theme}
        toggleTheme={toggleTheme}
        apiSource={apiSource}
        setApiSource={setApiSource}
        onOpenCreateModal={() => setIsCreateModalOpen(true)}
      />

      {/* KPI Stats Overview */}
      <UserStats users={users} />

      {/* Toolbar Filters */}
      <TableControls 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        departmentFilter={departmentFilter}
        setDepartmentFilter={setDepartmentFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        departments={departments}
        onExportCSV={handleExportCSV}
        onClearFilters={handleClearFilters}
      />

      {/* Main User Data Table */}
      <UserTable 
        users={paginatedUsers}
        isLoading={isLoading}
        sortConfig={sortConfig}
        onSort={handleSort}
        onViewUser={(user) => setSelectedUserForView(user)}
        onEditUser={(user) => setSelectedUserForEdit(user)}
        onDeleteUser={handleDeleteUser}
      />

      {/* Pagination Footer */}
      {!isLoading && (
        <Pagination 
          totalItems={sortedUsers.length}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
        />
      )}

      {/* User Details Drawer Modal */}
      {selectedUserForView && (
        <UserDetailModal 
          user={selectedUserForView}
          onClose={() => setSelectedUserForView(null)}
          onCopyEmail={handleCopyEmail}
        />
      )}

      {/* User Form Modal (Create or Edit) */}
      {(isCreateModalOpen || selectedUserForEdit) && (
        <UserFormModal 
          user={selectedUserForEdit}
          onClose={() => {
            setIsCreateModalOpen(false);
            setSelectedUserForEdit(null);
          }}
          onSave={selectedUserForEdit ? handleUpdateUser : handleCreateUser}
          isSubmitting={isSubmitting}
        />
      )}

      {/* Notification Toast */}
      <ToastNotification toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}

export default App;
