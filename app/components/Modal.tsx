'use client';

import { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  [key: string]: any;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  ...props
}) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4  bg-opacity-50 backdrop-blur-sm overflow-y-auto"
      onClick={onClose} // Close when clicking backdrop
    >
      <div 
        className={`
          p-4
          w-full ${sizeClasses[size]} 
          bg-white rounded-2xl shadow-2xl 
          max-h-[90vh] overflow-hidden
          animate-in fade-in-90 zoom-in-90 duration-200
        `}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
        {...props}
      >
        {/* Modal Header - Fixed */}
        <div className="flex-1 text-center pb-4">
          <h6 className="text-xl font-semibold text-[#FF9A0E] inline-block" data-test-id="food-modal-title">
            {title}
          </h6>
        </div>

        {/* Modal Content - Scrollable */}
        <div className="overflow-y-auto max-h-[calc(90vh-120px)]"> {/* Adjust height based on header/footer */}
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};