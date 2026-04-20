'use client';

import { forwardRef } from 'react';

const Card = forwardRef(({ children, className = '', variant = 'default', ...props }, ref) => {
  const variants = {
    default: 'bg-white border border-gray-200',
    elevated: 'bg-white shadow-lg',
    bordered: 'bg-transparent border-2 border-gray-200',
    ghost: 'bg-transparent'
  };
  
  return (
    <div
      ref={ref}
      className={`rounded-xl overflow-hidden ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = 'Card';

const CardHeader = forwardRef(({ children, className = '', ...props }, ref) => (
  <div ref={ref} className={`p-6 pb-0 ${className}`} {...props}>
    {children}
  </div>
));
CardHeader.displayName = 'CardHeader';

const CardTitle = forwardRef(({ children, className = '', ...props }, ref) => (
  <h3 ref={ref} className={`text-xl font-semibold text-gray-900 ${className}`} {...props}>
    {children}
  </h3>
));
CardTitle.displayName = 'CardTitle';

const CardDescription = forwardRef(({ children, className = '', ...props }, ref) => (
  <p ref={ref} className={`text-sm text-gray-500 mt-1 ${className}`} {...props}>
    {children}
  </p>
));
CardDescription.displayName = 'CardDescription';

const CardContent = forwardRef(({ children, className = '', ...props }, ref) => (
  <div ref={ref} className={`p-6 ${className}`} {...props}>
    {children}
  </div>
));
CardContent.displayName = 'CardContent';

const CardFooter = forwardRef(({ children, className = '', ...props }, ref) => (
  <div ref={ref} className={`p-6 pt-0 ${className}`} {...props}>
    {children}
  </div>
));
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };