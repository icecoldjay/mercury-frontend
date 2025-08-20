import React, { useEffect, useState } from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

const Toast: React.FC<ToastProps> = ({
  message,
  type,
  isVisible,
  onClose,
  duration = 4000,
}) => {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    if (isVisible && duration > 0) {
      const startTime = Date.now();
      const endTime = startTime + duration;

      const updateOpacity = () => {
        const now = Date.now();
        const remaining = endTime - now;
        
        if (remaining <= 0) {
          onClose();
          return;
        }

        // Calculate opacity based on remaining time
        const opacityValue = Math.max(0.3, remaining / duration);
        setOpacity(opacityValue);

        requestAnimationFrame(updateOpacity);
      };

      const timer = requestAnimationFrame(updateOpacity);

      return () => {
        cancelAnimationFrame(timer);
      };
    }
  }, [isVisible, duration, onClose]);

  useEffect(() => {
    if (isVisible) {
      setOpacity(1);
    }
  }, [isVisible, duration]);

  if (!isVisible) return null;

  const bgColor = {
    success: 'bg-green-600',
    error: 'bg-red-600',
    info: 'bg-blue-600',
  }[type];

  const icon = {
    success: '✓',
    error: '✕',
    info: 'ℹ',
  }[type];

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div 
        className={`${bgColor} text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3 min-w-80 transition-opacity duration-300`}
        style={{ opacity }}
      >
        <span className="text-lg">{icon}</span>
        <span className="flex-1">{message}</span>
        <button
          onClick={onClose}
          className="text-white hover:text-gray-200 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Toast;
