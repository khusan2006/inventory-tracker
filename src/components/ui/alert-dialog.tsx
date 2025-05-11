import React, { createContext, useContext, useState } from 'react';

// Context for alert dialog
type AlertDialogContextType = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const AlertDialogContext = createContext<AlertDialogContextType | undefined>(undefined);

function useAlertDialog() {
  const context = useContext(AlertDialogContext);
  if (!context) {
    throw new Error('AlertDialog components must be used within an AlertDialogProvider');
  }
  return context;
}

// AlertDialog root
interface AlertDialogProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function AlertDialog({ children, open = false, onOpenChange }: AlertDialogProps) {
  const [isOpen, setIsOpen] = useState(open);
  
  const handleOpenChange = (newOpen: boolean) => {
    setIsOpen(newOpen);
    onOpenChange?.(newOpen);
  };
  
  return (
    <AlertDialogContext.Provider value={{ open: onOpenChange ? open : isOpen, onOpenChange: handleOpenChange }}>
      {children}
    </AlertDialogContext.Provider>
  );
}

// AlertDialog content
interface AlertDialogContentProps {
  children: React.ReactNode;
  className?: string;
}

export function AlertDialogContent({ children, className = '' }: AlertDialogContentProps) {
  const { open } = useAlertDialog();
  
  if (!open) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 transition-opacity" />
      
      {/* Dialog panel */}
      <div className={`z-50 bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full mx-auto p-6 animate-in fade-in ${className}`}>
        {children}
      </div>
    </div>
  );
}

// AlertDialog header
interface AlertDialogHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function AlertDialogHeader({ children, className = '' }: AlertDialogHeaderProps) {
  return (
    <div className={`mb-4 text-center ${className}`}>
      {children}
    </div>
  );
}

// AlertDialog title
interface AlertDialogTitleProps {
  children: React.ReactNode;
  className?: string;
}

export function AlertDialogTitle({ children, className = '' }: AlertDialogTitleProps) {
  return (
    <h2 className={`text-lg font-semibold text-gray-900 dark:text-gray-100 ${className}`}>
      {children}
    </h2>
  );
}

// AlertDialog description
interface AlertDialogDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export function AlertDialogDescription({ children, className = '' }: AlertDialogDescriptionProps) {
  return (
    <p className={`mt-2 text-sm text-gray-500 dark:text-gray-400 ${className}`}>
      {children}
    </p>
  );
}

// AlertDialog footer
interface AlertDialogFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function AlertDialogFooter({ children, className = '' }: AlertDialogFooterProps) {
  return (
    <div className={`mt-6 flex justify-end space-x-2 ${className}`}>
      {children}
    </div>
  );
}

// AlertDialog cancel
interface AlertDialogCancelProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function AlertDialogCancel({ children, className = '', onClick }: AlertDialogCancelProps) {
  const { onOpenChange } = useAlertDialog();
  
  const handleClick = () => {
    onOpenChange(false);
    onClick?.();
  };
  
  return (
    <button
      className={`px-4 py-2 text-sm font-medium rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${className}`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}

// AlertDialog action
interface AlertDialogActionProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function AlertDialogAction({ children, className = '', onClick }: AlertDialogActionProps) {
  const { onOpenChange } = useAlertDialog();
  
  const handleClick = () => {
    onOpenChange(false);
    onClick?.();
  };
  
  return (
    <button
      className={`px-4 py-2 text-sm font-medium rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${className}`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
} 