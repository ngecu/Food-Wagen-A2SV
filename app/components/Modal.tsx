// src/components/Modal.tsx
'use client';

import { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md'
}) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-opacity-50 backdrop-blur-sm">
      <div 
        className={`
          w-full ${sizeClasses[size]} 
          bg-white rounded-2xl shadow-2xl 
          overflow-visible
          animate-in fade-in-90 zoom-in-90 duration-200
        `}
      >
        <div className="p-4">
          <div className="flex-1 text-center">
            <h6 className="text-xl font-semibold text-[#FF9A0E] inline-block">{title}</h6>
          </div>
        </div>

        {/* Modal Content - No scrollbar, content can overflow */}
        <div className="p-6 overflow-visible">
          {children}
        </div>
      </div>
    </div>
  );
};