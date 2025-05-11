import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'destructive' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  children: React.ReactNode;
  className?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'default', size = 'default', children, ...props }, ref) => {
    // Base styles
    let variantClasses = '';
    let sizeClasses = '';
    
    // Variant styles
    switch (variant) {
      case 'default':
        variantClasses = 'bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-600 dark:hover:bg-blue-700';
        break;
      case 'outline':
        variantClasses = 'border border-gray-300 dark:border-gray-600 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200';
        break;
      case 'destructive':
        variantClasses = 'bg-red-500 hover:bg-red-600 text-white dark:bg-red-600 dark:hover:bg-red-700';
        break;
      case 'link':
        variantClasses = 'bg-transparent hover:underline text-blue-600 dark:text-blue-400';
        break;
    }
    
    // Size styles
    switch (size) {
      case 'default':
        sizeClasses = 'h-10 px-4 py-2';
        break;
      case 'sm':
        sizeClasses = 'h-8 px-3 text-sm';
        break;
      case 'lg':
        sizeClasses = 'h-12 px-6';
        break;
      case 'icon':
        sizeClasses = 'h-10 w-10';
        break;
    }
    
    const allClasses = `inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 disabled:opacity-50 disabled:pointer-events-none ${sizeClasses} ${variantClasses} ${className}`;
    
    return (
      <button className={allClasses} ref={ref} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button'; 