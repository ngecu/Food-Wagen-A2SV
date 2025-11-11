// components/ui/Modal.tsx
'use client';

import { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  closeOnOverlayClick?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  closeOnOverlayClick = true
}) => {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl'
  };

  return (
    <div 
      className="food-modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={closeOnOverlayClick ? onClose : undefined}
      data-test-id="food-modal-overlay"
    >
      <div 
        className={`food-modal-content bg-white rounded-lg w-full ${sizeClasses[size]} max-h-[90vh] overflow-y-auto animate-slide-up`}
        onClick={(e) => e.stopPropagation()}
        data-test-id="food-modal-content"
      >
        {/* Header */}
        {title && (
          <div className="food-modal-header border-b border-gray-200 px-6 py-4">
            <h3 
              className="food-modal-title text-lg font-semibold text-gray-900"
              data-test-id="food-modal-title"
            >
              {title}
            </h3>
          </div>
        )}
        
        {/* Body */}
        <div className="food-modal-body p-6">
          {children}
        </div>
      </div>
    </div>
  );
};