import React from 'react';
import { Search, X, Download, Filter } from 'lucide-react';

export const ControlsView = ({
  searchTerm,
  onSearchChange,
  departmentFilter,
  onDepartmentFilterChange,
  statusFilter,
  onStatusFilterChange,
  departments,
  onExportCSV,
  onClearFilters
}) => {
  const hasActiveFilters = searchTerm || departmentFilter !== 'all' || statusFilter !== 'all';

  return (
    <div className="toolbar">
      {/* Search Input */}
      <div className="search-wrapper">
        <Search className="search-icon" size={18} />
        <input
          type="text"
          className="search-input"
          placeholder="Search by name, email, company or city..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {searchTerm && (
          <button 
            onClick={() => onSearchChange('')}
            style={{
              position: 'absolute',
              right: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              color: 'var(--text-muted)'
            }}
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Filter Controls */}
      <div className="filter-group">
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Filter size={15} style={{ color: 'var(--text-muted)' }} />
          {/* Department Filter */}
          <select 
            className="select-dropdown"
            value={departmentFilter}
            onChange={(e) => onDepartmentFilterChange(e.target.value)}
          >
            <option value="all">All Departments</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>

          {/* Status Filter */}
          <select 
            className="select-dropdown"
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        {/* Reset Filters */}
        {hasActiveFilters && (
          <button className="btn btn-secondary" onClick={onClearFilters} style={{ padding: '8px 12px' }}>
            <X size={14} />
            <span>Reset</span>
          </button>
        )}

        {/* Export CSV */}
        <button className="btn btn-secondary" onClick={onExportCSV} title="Export filtered users to CSV">
          <Download size={15} />
          <span>Export</span>
        </button>
      </div>
    </div>
  );
};

export default ControlsView;
