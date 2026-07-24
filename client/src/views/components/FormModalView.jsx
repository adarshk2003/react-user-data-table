import React, { useState, useEffect } from 'react';
import { X, Save, RefreshCw } from 'lucide-react';

export const FormModalView = ({ user, onClose, onSave, isSubmitting }) => {
  const isEditing = Boolean(user && user.id);

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    company: '',
    department: 'Engineering',
    role: 'Frontend Lead',
    city: 'San Francisco',
    status: 'Active',
    website: 'example.com'
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        username: user.username || '',
        email: user.email || '',
        phone: user.phone || '',
        company: user.company || '',
        department: user.department || 'Engineering',
        role: user.role || 'Software Engineer',
        city: user.city || '',
        status: user.status || 'Active',
        website: user.website || 'example.com'
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">
            {isEditing ? `Edit User (${user.name})` : 'Create New User Resource'}
          </div>
          <button className="btn-icon-only" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input 
                  type="text" 
                  name="name"
                  required
                  className="form-input" 
                  placeholder="e.g. Sarah Jenkins"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Username</label>
                <input 
                  type="text" 
                  name="username"
                  className="form-input" 
                  placeholder="e.g. sjenkins"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input 
                  type="email" 
                  name="email"
                  required
                  className="form-input" 
                  placeholder="s.jenkins@company.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input 
                  type="text" 
                  name="phone"
                  className="form-input" 
                  placeholder="+1 (555) 019-2834"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Company</label>
                <input 
                  type="text" 
                  name="company"
                  className="form-input" 
                  placeholder="Acme Corp"
                  value={formData.company}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Location / City</label>
                <input 
                  type="text" 
                  name="city"
                  className="form-input" 
                  placeholder="New York"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Department</label>
                <select 
                  name="department"
                  className="select-dropdown"
                  value={formData.department}
                  onChange={handleChange}
                >
                  <option value="Engineering">Engineering</option>
                  <option value="Design">Design</option>
                  <option value="Product">Product</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Sales">Sales</option>
                  <option value="Finance">Finance</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Status</label>
                <select 
                  name="status"
                  className="select-dropdown"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <RefreshCw size={15} className="spin-anim" />
                  <span>Submitting REST API...</span>
                </>
              ) : (
                <>
                  <Save size={15} />
                  <span>{isEditing ? 'Update User (PUT)' : 'Create User (POST)'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormModalView;
