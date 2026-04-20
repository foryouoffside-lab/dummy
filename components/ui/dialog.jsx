'use client';

import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

export function Dialog({ isOpen, onClose, children, size = 'md' }) {
  const dialogRef = useRef(null);
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);
  
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);
  
  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-[90vw]'
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      <div 
        ref={dialogRef}
        className={`relative bg-white rounded-xl shadow-xl w-full ${sizes[size]} max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-200`}
      >
        {children}
      </div>
    </div>
  );
}

export function DialogContent({ children, className = '' }) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}

export function DialogHeader({ children, className = '' }) {
  return <div className={`border-b border-gray-100 px-6 py-4 ${className}`}>{children}</div>;
}

export function DialogFooter({ children, className = '' }) {
  return <div className={`border-t border-gray-100 px-6 py-4 flex justify-end gap-3 ${className}`}>{children}</div>;
}

export function DialogTitle({ children, className = '' }) {
  return <h2 className={`text-xl font-semibold text-gray-900 ${className}`}>{children}</h2>;
}

export function DialogClose({ onClose }) {
  return (
    <button
      onClick={onClose}
      className="absolute top-4 right-4 p-1 rounded-lg hover:bg-gray-100 transition"
    >
      <X className="w-5 h-5 text-gray-400" />
    </button>
  );
}