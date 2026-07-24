/**
 * CONTROLLER LAYER: useUserController
 * Handles application state, invokes REST API services, processes domain models, and exposes action handlers for Views.
 */
import { useState, useEffect, useMemo, useCallback } from 'react';
import userRestService from '../services/userRestService';
import UserModel from '../models/UserModel';

export function useUserController() {
  // Theme state
  const [theme, setTheme] = useState('light');

  // Model & Async state
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState(null);

  // Filters, Search & Sorting state
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // View Modals state
  const [selectedUserForView, setSelectedUserForView] = useState(null);
  const [selectedUserForEdit, setSelectedUserForEdit] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Toast Helper
  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  }, []);

  // Controller Action: Toggle Theme
  const toggleTheme = useCallback(() => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  }, [theme]);

  // Controller Action: Load Users via REST GET /api/users
  const loadUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const userModels = await userRestService.getAllUsers();
      setUsers(userModels);
      showToast(`Loaded ${userModels.length} user resources via REST GET /api/users`);
    } catch (err) {
      showToast(err.message || 'Failed to fetch users from REST API', 'error');
    } finally {
      setIsLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  // Controller Derived Data: Unique Departments
  const departments = useMemo(() => {
    const set = new Set(users.map(u => u.department).filter(Boolean));
    return Array.from(set);
  }, [users]);

  // Controller Business Logic: Filtering Users
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

  // Controller Business Logic: Sorting Users
  const sortedUsers = useMemo(() => {
    return [...filteredUsers].sort((a, b) => {
      const aVal = a[sortConfig.key] || '';
      const bVal = b[sortConfig.key] || '';

      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredUsers, sortConfig]);

  // Controller Business Logic: Paginated Slice
  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedUsers.slice(start, start + pageSize);
  }, [sortedUsers, currentPage, pageSize]);

  // Reset to Page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, departmentFilter, statusFilter, pageSize]);

  // Controller Action: Sort Header Handler
  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  // Controller Action: Reset Filters
  const handleClearFilters = () => {
    setSearchTerm('');
    setDepartmentFilter('all');
    setStatusFilter('all');
  };

  // Controller Action: Export CSV
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
    a.download = `users-export-${Date.now()}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    showToast('Exported users to CSV file');
  };

  // Controller Action: Create User via REST POST /api/users
  const handleCreateUser = async (formData) => {
    const { isValid, errors } = UserModel.validate(formData);
    if (!isValid) {
      const firstErr = Object.values(errors)[0];
      showToast(firstErr, 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      const newModel = new UserModel(formData);
      const createdUser = await userRestService.createUser(newModel);
      setUsers(prev => [createdUser, ...prev]);
      setIsCreateModalOpen(false);
      showToast(`Created user "${createdUser.name}" via REST POST /api/users (HTTP 201 Created)`);
    } catch (err) {
      showToast(err.message || 'REST API Error: Failed to create user', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Controller Action: Update User via REST PUT /api/users/:id
  const handleUpdateUser = async (formData) => {
    if (!selectedUserForEdit) return;

    const { isValid, errors } = UserModel.validate(formData);
    if (!isValid) {
      const firstErr = Object.values(errors)[0];
      showToast(firstErr, 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      const updatedModel = await userRestService.updateUser(selectedUserForEdit.id, formData);
      setUsers(prev => prev.map(u => u.id === updatedModel.id ? updatedModel : u));
      setSelectedUserForEdit(null);
      showToast(`Updated user "${updatedModel.name}" via REST PUT /api/users/${updatedModel.id} (HTTP 200 OK)`);
    } catch (err) {
      showToast(err.message || 'REST API Error: Failed to update user', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Controller Action: Delete User via REST DELETE /api/users/:id
  const handleDeleteUser = async (id) => {
    if (!window.confirm(`Are you sure you want to delete user ID ${id}?`)) return;
    try {
      await userRestService.deleteUser(id);
      setUsers(prev => prev.filter(u => u.id !== id));
      showToast(`Deleted user ID ${id} via REST DELETE /api/users/${id}`);
    } catch (err) {
      showToast(err.message || 'REST API Error: Failed to delete user', 'error');
    }
  };

  // Controller Action: Copy Email Helper
  const handleCopyEmail = (email) => {
    navigator.clipboard.writeText(email);
    showToast(`Copied ${email} to clipboard`);
  };

  return {
    // Controller State
    theme,
    users,
    paginatedUsers,
    totalCount: sortedUsers.length,
    rawCount: users.length,
    isLoading,
    toast,
    searchTerm,
    departmentFilter,
    statusFilter,
    departments,
    sortConfig,
    currentPage,
    pageSize,
    selectedUserForView,
    selectedUserForEdit,
    isCreateModalOpen,
    isSubmitting,

    // Controller Handlers
    toggleTheme,
    loadUsers,
    setSearchTerm,
    setDepartmentFilter,
    setStatusFilter,
    setCurrentPage,
    setPageSize,
    setSelectedUserForView,
    setSelectedUserForEdit,
    setIsCreateModalOpen,
    handleSort,
    handleClearFilters,
    handleExportCSV,
    handleCreateUser,
    handleUpdateUser,
    handleDeleteUser,
    handleCopyEmail,
    setToast
  };
}

export default useUserController;
