import React from 'react';
import { Users, CheckCircle2, Building2, MapPin } from 'lucide-react';

export const UserStats = ({ users = [] }) => {
  const total = users.length;
  const active = users.filter(u => u.status === 'Active').length;
  const departments = new Set(users.map(u => u.department)).size;
  const cities = new Set(users.map(u => u.city)).size;

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-info">
          <div className="stat-label">Total Users</div>
          <div className="stat-value">{total}</div>
        </div>
        <div className="stat-icon-wrapper">
          <Users size={22} />
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-info">
          <div className="stat-label">Active Users</div>
          <div className="stat-value">{active}</div>
        </div>
        <div className="stat-icon-wrapper" style={{ color: '#10b981' }}>
          <CheckCircle2 size={22} />
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-info">
          <div className="stat-label">Departments</div>
          <div className="stat-value">{departments}</div>
        </div>
        <div className="stat-icon-wrapper" style={{ color: '#8b5cf6' }}>
          <Building2 size={22} />
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-info">
          <div className="stat-label">Cities Represented</div>
          <div className="stat-value">{cities}</div>
        </div>
        <div className="stat-icon-wrapper" style={{ color: '#f59e0b' }}>
          <MapPin size={22} />
        </div>
      </div>
    </div>
  );
};

export default UserStats;
