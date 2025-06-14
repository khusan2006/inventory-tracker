import React, { useState } from 'react';
import { MinusCircle, PlusCircle, Loader2 } from 'lucide-react';

interface QuantityControlProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  disabled?: boolean;
  className?: string;
}

export const QuantityControl = React.forwardRef<HTMLDivElement, QuantityControlProps>(
  ({ value, onChange, min = 1, max, disabled = false, className = '' }, ref) => {
    const [isDecreasing, setIsDecreasing] = useState(false);
    const [isIncreasing, setIsIncreasing] = useState(false);

    const handleDecrease = async () => {
      if (value <= min || disabled) return;
      setIsDecreasing(true);
      try {
        onChange(value - 1);
      } finally {
        // Add a small delay to show the loading state
        setTimeout(() => setIsDecreasing(false), 300);
      }
    };

    const handleIncrease = async () => {
      if (max !== undefined && value >= max || disabled) return;
      setIsIncreasing(true);
      try {
        onChange(value + 1);
      } finally {
        // Add a small delay to show the loading state
        setTimeout(() => setIsIncreasing(false), 300);
      }
    };

    return (
      <div 
        ref={ref}
        className={`flex items-center ${className}`}
      >
        <button 
          onClick={handleDecrease}
          disabled={value <= min || disabled || isDecreasing}
          className="p-2 rounded-l-md bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors relative"
        >
          {isDecreasing ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <MinusCircle size={16} />
          )}
        </button>
        <input 
          type="number" 
          min={min}
          max={max}
          value={value}
          onChange={(e) => {
            const val = parseInt(e.target.value);
            if (!isNaN(val) && val >= min && (max === undefined || val <= max)) {
              onChange(val);
            }
          }}
          className="w-16 text-center py-2 border-y border-gray-300 dark:border-slate-600 dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          disabled={disabled}
        />
        <button 
          onClick={handleIncrease}
          disabled={(max !== undefined && value >= max) || disabled || isIncreasing}
          className="p-2 rounded-r-md bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors relative"
        >
          {isIncreasing ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <PlusCircle size={16} />
          )}
        </button>
      </div>
    );
  }
);

QuantityControl.displayName = 'QuantityControl'; 