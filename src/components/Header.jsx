import React from 'react';
import { Users, RefreshCw, Sun, Moon, Database, Plus } from 'lucide-react';

export const Header = ({ 
  totalCount, 
  onRefresh, 
  isLoading, 
  theme, 
  toggleTheme, 
  apiSource, 
  setApiSource,
  onOpenCreateModal 
}) => {
  return (
    <header className="header">
      <div className="header-brand">
        <div className="header-icon">
          <Users size={22} />
        </div>
        <div>
          <h1 className="header-title">User Directory</h1>
          <p className="header-subtitle">Minimalist User Management & Axios API Integration</p>
        </div>
      </div>

      <div className="header-actions">
        {/* API Source Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Database size={15} style={{ color: 'var(--text-muted)' }} />
          <select 
            className="select-dropdown"
            value={apiSource}
            onChange={(e) => setApiSource(e.target.value)}
            title="Switch API Source"
          >
            <option value="jsonplaceholder">API: JSONPlaceholder</option>
            <option value="dummyjson">API: DummyJSON</option>
          </select>
        </div>

        {/* Refresh Button */}
        <button 
          className="btn btn-secondary" 
          onClick={onRefresh} 
          disabled={isLoading}
          title="Fetch fresh data via Axios GET"
        >
          <RefreshCw size={15} className={isLoading ? 'spin-anim' : ''} />
          <span>Refresh</span>
        </button>

        {/* Theme Toggle Button */}
        <button 
          className="btn btn-icon-only" 
          onClick={toggleTheme} 
          title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
        >
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </button>

        {/* Add User Primary Action */}
        <button className="btn btn-primary" onClick={onOpenCreateModal}>
          <Plus size={16} />
          <span>Add User</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
