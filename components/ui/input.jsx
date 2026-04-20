'use client';

import { forwardRef } from 'react';

const Input = forwardRef(({ 
  type = 'text', 
  label, 
  error, 
  icon: Icon,
  className = '',
  ...props 
}, ref) => {
  
  const baseStyles = 'w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:bg-gray-100 disabled:cursor-not-allowed';
  
  const errorStyles = error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300';
  
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <Icon className="w-5 h-5" />
          </div>
        )}
        <input
          ref={ref}
          type={type}
          className={`${baseStyles} ${errorStyles} ${Icon ? 'pl-10' : ''} ${className}`}
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;