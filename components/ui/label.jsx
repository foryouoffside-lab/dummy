'use client';

import { forwardRef } from 'react';

const Label = forwardRef(({ children, required, className = '', ...props }, ref) => {
  return (
    <label
      ref={ref}
      className={`block text-sm font-medium text-gray-700 mb-1 ${className}`}
      {...props}
    >
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
});

Label.displayName = 'Label';

export default Label;