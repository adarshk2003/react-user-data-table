import React from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown, Eye, Edit2, Trash2, UserX } from 'lucide-react';
import SkeletonLoader from './SkeletonLoader';

export const UserTable = ({
  users = [],
  isLoading = false,
  sortConfig,
  onSort,
  onViewUser,
  onEditUser,
  onDeleteUser
}) => {
  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return <ArrowUpDown size={13} style={{ opacity: 0.4 }} />;
    return sortConfig.direction === 'asc' ? <ArrowUp size={13} /> : <ArrowDown size={13} />;
  };

  const getStatusBadge = (status) => {
    const s = (status || 'Active').toLowerCase();
    if (s === 'active') {
      return (
        <span className="badge badge-active">
          <span className="badge-dot"></span> Active
        </span>
      );
    } else if (s === 'pending') {
      return (
        <span className="badge badge-pending">
          <span className="badge-dot"></span> Pending
        </span>
      );
    }
    return (
      <span className="badge badge-inactive">
        <span className="badge-dot"></span> Inactive
      </span>
    );
  };

  return (
    <div className="table-card">
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th className="sortable" onClick={() => onSort('name')}>
                <div className="th-content">
                  <span>User Profile</span>
                  {getSortIcon('name')}
                </div>
              </th>
              <th className="sortable" onClick={() => onSort('email')}>
                <div className="th-content">
                  <span>Email Address</span>
                  {getSortIcon('email')}
                </div>
              </th>
              <th className="sortable" onClick={() => onSort('department')}>
                <div className="th-content">
                  <span>Department & Role</span>
                  {getSortIcon('department')}
                </div>
              </th>
              <th className="sortable" onClick={() => onSort('city')}>
                <div className="th-content">
                  <span>Location</span>
                  {getSortIcon('city')}
                </div>
              </th>
              <th className="sortable" onClick={() => onSort('status')}>
                <div className="th-content">
                  <span>Status</span>
                  {getSortIcon('status')}
                </div>
              </th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <SkeletonLoader rows={6} />
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={6}>
                  <div className="empty-state">
                    <div className="empty-icon">
                      <UserX size={28} />
                    </div>
                    <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>No users found</div>
                    <p style={{ fontSize: '0.85rem' }}>Try adjusting your search criteria or resetting filters.</p>
                  </div>
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id}>
                  {/* User Profile */}
                  <td>
                    <div className="user-cell">
                      <img 
                        src={user.avatar} 
                        alt={user.name} 
                        className="user-avatar"
                        onError={(e) => {
                          e.target.onerror = null; 
                          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=2563eb&color=fff`;
                        }}
                      />
                      <div className="user-details">
                        <div className="user-name">
                          {user.name}
                        </div>
                        <div className="user-username">@{user.username}</div>
                      </div>
                    </div>
                  </td>

                  {/* Email Address */}
                  <td>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}>
                      {user.email}
                    </span>
                  </td>

                  {/* Department & Role */}
                  <td>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{user.department}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{user.role}</div>
                    </div>
                  </td>

                  {/* City / Location */}
                  <td>
                    <span style={{ fontSize: '0.85rem' }}>{user.city}</span>
                  </td>

                  {/* Status Badge */}
                  <td>{getStatusBadge(user.status)}</td>

                  {/* Actions */}
                  <td>
                    <div className="action-group" style={{ justifyContent: 'flex-end' }}>
                      <button 
                        className="btn-action" 
                        onClick={() => onViewUser(user)}
                        title="View Detailed Profile"
                      >
                        <Eye size={16} />
                      </button>
                      <button 
                        className="btn-action" 
                        onClick={() => onEditUser(user)}
                        title="Edit User (Axios PUT)"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        className="btn-action delete" 
                        onClick={() => onDeleteUser(user.id)}
                        title="Delete User (Axios DELETE)"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
