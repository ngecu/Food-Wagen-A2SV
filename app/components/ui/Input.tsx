// src/components/ui/Input.tsx
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  onIconClick?: () => void;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  icon,
  iconPosition = 'left',
  onIconClick,
  className = '',
  id,
  disabled,
  ...props
}) => {
  const inputId = id || props.name;
  const errorId = `${inputId}-error`;
  
  const hasIcon = !!icon;
  const iconPaddingClass = hasIcon ? 
    (iconPosition === 'left' ? 'pl-10 pr-4' : 'pr-10 pl-4') : 
    'px-4';

  return (
    <div className="food-input-group mb-4">
      {label && (
        <label 
          htmlFor={inputId} 
          className="food-label block text-sm font-medium text-gray-700 mb-2"
        >
          {label}
        </label>
      )}
      
      <div className="relative">
        {hasIcon && iconPosition === 'left' && (
          <div 
            className={`food-input-icon-left absolute inset-y-0 left-0 flex items-center pl-3 ${
              onIconClick ? 'cursor-pointer' : 'pointer-events-none'
            } ${disabled ? 'opacity-50' : ''}`}
            onClick={onIconClick}
            data-test-id={`${inputId}-icon-left`}
          >
            <span className={`text-gray-400 ${onIconClick ? 'hover:text-gray-600 transition-colors' : ''}`}>
              {icon}
            </span>
          </div>
        )}
        
        <input
          id={inputId}
          className={`food-input w-full py-3 border rounded-xl  transition-colors duration-200 ${
            error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-orange-500'
          } ${disabled ? 'bg-gray-100 cursor-not-allowed opacity-70' : 'bg-white'} ${
            iconPaddingClass
          } ${className}`}
          aria-describedby={error ? errorId : undefined}
          disabled={disabled}
          data-test-id={inputId}
          {...props}
        />
        
        {hasIcon && iconPosition === 'right' && (
          <div 
            className={`food-input-icon-right absolute inset-y-0 right-0 flex items-center pr-3 ${
              onIconClick ? 'cursor-pointer' : 'pointer-events-none'
            } ${disabled ? 'opacity-50' : ''}`}
            onClick={onIconClick}
            data-test-id={`${inputId}-icon-right`}
          >
            <span className={`text-gray-400 ${onIconClick ? 'hover:text-gray-600 transition-colors' : ''}`}>
              {icon}
            </span>
          </div>
        )}
      </div>
      
      {error && (
        <div 
          id={errorId} 
          className="food-error text-red-500 text-sm mt-2 flex items-center gap-1"
          data-test-id={errorId}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          {error}
        </div>
      )}
    </div>
  );
};