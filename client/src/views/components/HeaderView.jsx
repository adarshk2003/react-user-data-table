import React from 'react';
import { Users, RefreshCw, Sun, Moon, Plus } from 'lucide-react';

export const HeaderView = ({
  rawCount,
  onRefresh,
  isLoading,
  theme,
  onToggleTheme,
  onOpenCreateModal
}) => {
  return (
    <header className="header">
      <div className="header-brand">
        <div className="header-icon">
          <Users size={22} />
        </div>
        <div>
          <h1 className="header-title">MVC User Directory</h1>
          <p className="header-subtitle">React Model-View-Controller & Express REST API</p>
        </div>
      </div>

      <div className="header-actions">
        {/* Refresh REST GET Button */}
        <button 
          className="btn btn-secondary" 
          onClick={onRefresh} 
          disabled={isLoading}
          title="Refresh resource list via REST GET /api/users"
        >
          <RefreshCw size={15} className={isLoading ? 'spin-anim' : ''} />
          <span>Refresh</span>
        </button>

        {/* Theme Toggle Button */}
        <button 
          className="btn btn-icon-only" 
          onClick={onToggleTheme} 
          title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
        >
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </button>

        {/* Add User REST POST Button */}
        <button className="btn btn-primary" onClick={onOpenCreateModal}>
          <Plus size={16} />
          <span>Add User</span>
        </button>
      </div>
    </header>
  );
};

export default HeaderView;
