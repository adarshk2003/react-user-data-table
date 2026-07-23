import React from 'react';
import { X, Mail, Phone, Globe, Building, MapPin, Briefcase, ExternalLink, Copy } from 'lucide-react';

export const UserDetailModal = ({ user, onClose, onCopyEmail }) => {
  if (!user) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-title">User Profile Details</div>
          <button className="btn-icon-only" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          {/* Profile Overview Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', paddingBottom: '16px', borderBottom: '1px solid var(--border-color)' }}>
            <img 
              src={user.avatar} 
              alt={user.name} 
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                border: '3px solid var(--border-color)'
              }}
            />
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)' }}>{user.name}</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>@{user.username}</p>
              <div style={{ marginTop: '6px' }}>
                <span className={`badge badge-${(user.status || 'Active').toLowerCase()}`}>
                  {user.status || 'Active'}
                </span>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
            <div className="form-group">
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Mail size={14} /> Email
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-main)', wordBreak: 'break-all' }}>{user.email}</span>
                <button 
                  onClick={() => onCopyEmail(user.email)} 
                  style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
                  title="Copy email to clipboard"
                >
                  <Copy size={14} />
                </button>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Phone size={14} /> Phone
              </label>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>{user.phone}</span>
            </div>

            <div className="form-group">
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Building size={14} /> Company
              </label>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: 500 }}>{user.company}</span>
            </div>

            <div className="form-group">
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Briefcase size={14} /> Department / Role
              </label>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>{user.department} — {user.role}</span>
            </div>

            <div className="form-group">
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MapPin size={14} /> Location
              </label>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>{user.city}</span>
            </div>

            <div className="form-group">
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Globe size={14} /> Website
              </label>
              <a 
                href={user.website.startsWith('http') ? user.website : `https://${user.website}`} 
                target="_blank" 
                rel="noreferrer"
                style={{ color: 'var(--accent-primary)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.9rem' }}
              >
                {user.website} <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default UserDetailModal;
