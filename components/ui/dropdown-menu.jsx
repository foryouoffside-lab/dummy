'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export function DropdownMenu({ trigger, children, align = 'left' }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const alignClasses = {
    left: 'left-0',
    right: 'right-0',
    center: 'left-1/2 transform -translate-x-1/2'
  };
  
  return (
    <div className="relative" ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </div>
      {isOpen && (
        <div className={`absolute top-full mt-2 ${alignClasses[align]} min-w-[160px] bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50`}>
          {children}
        </div>
      )}
    </div>
  );
}

export function DropdownItem({ children, onClick, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition ${className}`}
    >
      {children}
    </button>
  );
}

export function DropdownSeparator() {
  return <div className="h-px bg-gray-100 my-1" />;
}

export function DropdownLabel({ children }) {
  return <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">{children}</div>;
}