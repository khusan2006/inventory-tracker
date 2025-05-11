import React, { createContext, useContext, useState } from 'react';
import { X } from 'lucide-react';

// Context for dialog state
type DialogContextType = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const DialogContext = createContext<DialogContextType | undefined>(undefined);

function useDialog() {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('Dialog components must be used within a DialogProvider');
  }
  return context;
}

// Dialog root
interface DialogProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function Dialog({ children, open = false, onOpenChange }: DialogProps) {
  const [isOpen, setIsOpen] = useState(open);
  
  const handleOpenChange = (newOpen: boolean) => {
    setIsOpen(newOpen);
    onOpenChange?.(newOpen);
  };
  
  return (
    <DialogContext.Provider value={{ open: onOpenChange ? open : isOpen, onOpenChange: handleOpenChange }}>
      {children}
    </DialogContext.Provider>
  );
}

// Dialog trigger
interface DialogTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
}

export function DialogTrigger({ children, asChild = false }: DialogTriggerProps) {
  const { onOpenChange } = useDialog();
  
  // If the children is a React element, add the onClick handler
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      onClick: (e: React.MouseEvent) => {
        // Call the original onClick if it exists
        if (children.props.onClick) {
          children.props.onClick(e);
        }
        onOpenChange(true);
      }
    });
  }
  
  return (
    <button 
      type="button"
      onClick={() => onOpenChange(true)}
    >
      {children}
    </button>
  );
}

// Dialog portal/overlay/content
interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export function DialogContent({ children, className = '', ...props }: DialogContentProps) {
  const { open, onOpenChange } = useDialog();
  
  if (!open) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 transition-opacity" 
        onClick={() => onOpenChange(false)}
      />
      
      {/* Dialog panel */}
      <div 
        className={`z-50 bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-lg w-full mx-auto p-6 animate-in fade-in max-h-[calc(100vh-2rem)] overflow-y-auto ${className}`}
        {...props}
      >
        <button 
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          onClick={() => onOpenChange(false)}
        >
          <X size={18} />
          <span className="sr-only">Close</span>
        </button>
        
        {children}
      </div>
    </div>
  );
}

// Dialog header
interface DialogHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function DialogHeader({ children, className = '' }: DialogHeaderProps) {
  return (
    <div className={`mb-4 ${className}`}>
      {children}
    </div>
  );
}

// Dialog title
interface DialogTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

export function DialogTitle({ children, className = '', ...props }: DialogTitleProps) {
  return (
    <h2 
      className={`text-lg font-semibold text-gray-900 dark:text-gray-100 ${className}`}
      {...props}
    >
      {children}
    </h2>
  );
}

// Dialog description
interface DialogDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

export function DialogDescription({ children, className = '', ...props }: DialogDescriptionProps) {
  return (
    <p 
      className={`text-sm text-gray-500 dark:text-gray-400 mt-1 ${className}`}
      {...props}
    >
      {children}
    </p>
  );
}

// Dialog footer
interface DialogFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function DialogFooter({ children, className = '' }: DialogFooterProps) {
  return (
    <div className={`mt-6 flex justify-end space-x-2 ${className}`}>
      {children}
    </div>
  );
} 