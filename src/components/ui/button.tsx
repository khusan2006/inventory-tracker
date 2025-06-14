import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'destructive' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  children: React.ReactNode;
  className?: string;
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'default', size = 'default', children, isLoading = false, ...props }, ref) => {
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
    
    const allClasses = `
      inline-flex items-center justify-center rounded-md font-medium 
      transition-all duration-200 ease-in-out
      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
      dark:focus:ring-offset-gray-900 
      disabled:opacity-50 disabled:pointer-events-none
      mobile-touch-target
      ${sizeClasses} 
      ${variantClasses} 
      ${className}
      ${isLoading ? 'relative cursor-wait' : ''}
    `;
    
    return (
      <button 
        className={allClasses} 
        ref={ref} 
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <>
            <span className="opacity-0">{children}</span>
            <span className="absolute inset-0 flex items-center justify-center">
              <svg 
                className="animate-spin h-5 w-5 text-current" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24"
              >
                <circle 
                  className="opacity-25" 
                  cx="12" 
                  cy="12" 
                  r="10" 
                  stroke="currentColor" 
                  strokeWidth="4"
                />
                <path 
                  className="opacity-75" 
                  fill="currentColor" 
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            </span>
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button'; 