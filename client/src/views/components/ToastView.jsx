import React from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

export const ToastView = ({ toast, onClose }) => {
  if (!toast) return null;

  const isSuccess = toast.type === 'success';

  return (
    <div className="toast-container">
      <div className={`toast ${isSuccess ? 'toast-success' : 'toast-error'}`}>
        {isSuccess ? (
          <CheckCircle2 size={18} style={{ color: '#10b981' }} />
        ) : (
          <AlertCircle size={18} style={{ color: '#ef4444' }} />
        )}
        <span>{toast.message}</span>
        <button 
          onClick={onClose} 
          style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--text-muted)', marginLeft: '6px' }}
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
};

export default ToastView;
