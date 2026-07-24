import React from 'react';
import HeaderView from './components/HeaderView';
import StatsView from './components/StatsView';
import ControlsView from './components/ControlsView';
import TableView from './components/TableView';
import PaginationView from './components/PaginationView';
import DetailModalView from './components/DetailModalView';
import FormModalView from './components/FormModalView';
import ToastView from './components/ToastView';
import useUserController from '../controllers/useUserController';

export function UserDirectoryView() {
  // Obtain all Controller State & Action Handlers from useUserController
  const {
    theme,
    users,
    paginatedUsers,
    totalCount,
    rawCount,
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
  } = useUserController();

  return (
    <div className="app-container">
      {/* View Component: Header */}
      <HeaderView 
        rawCount={rawCount}
        onRefresh={loadUsers}
        isLoading={isLoading}
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenCreateModal={() => setIsCreateModalOpen(true)}
      />

      {/* View Component: KPI Statistics */}
      <StatsView users={users} />

      {/* View Component: Toolbar Controls */}
      <ControlsView 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        departmentFilter={departmentFilter}
        onDepartmentFilterChange={setDepartmentFilter}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        departments={departments}
        onExportCSV={handleExportCSV}
        onClearFilters={handleClearFilters}
      />

      {/* View Component: Main Data Table */}
      <TableView 
        users={paginatedUsers}
        isLoading={isLoading}
        sortConfig={sortConfig}
        onSort={handleSort}
        onViewUser={(user) => setSelectedUserForView(user)}
        onEditUser={(user) => setSelectedUserForEdit(user)}
        onDeleteUser={handleDeleteUser}
      />

      {/* View Component: Pagination Controls */}
      {!isLoading && (
        <PaginationView 
          totalItems={totalCount}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
        />
      )}

      {/* View Component: User Detail Slide-over Modal */}
      {selectedUserForView && (
        <DetailModalView 
          user={selectedUserForView}
          onClose={() => setSelectedUserForView(null)}
          onCopyEmail={handleCopyEmail}
        />
      )}

      {/* View Component: Form Modal for REST POST / PUT */}
      {(isCreateModalOpen || selectedUserForEdit) && (
        <FormModalView 
          user={selectedUserForEdit}
          onClose={() => {
            setIsCreateModalOpen(false);
            setSelectedUserForEdit(null);
          }}
          onSave={selectedUserForEdit ? handleUpdateUser : handleCreateUser}
          isSubmitting={isSubmitting}
        />
      )}

      {/* View Component: Notification Toast */}
      <ToastView toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}

export default UserDirectoryView;
