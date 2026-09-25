import React from 'react';
import { CheckCircle2, AlertCircle, Info, XCircle } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'info' | 'success' | 'warning' | 'danger';
}

export const Toast: React.FC<ToastProps> = ({ message, type = 'info' }) => {
  const getColors = () => {
    switch (type) {
      case 'success':
        return 'bg-emerald-950/90 border-emerald-500 text-emerald-100';
      case 'warning':
        return 'bg-amber-950/90 border-amber-500 text-amber-100';
      case 'danger':
        return 'bg-red-950/90 border-red-500 text-red-100';
      default:
        return 'bg-blue-950/90 border-blue-500 text-blue-100';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />;
      case 'danger':
        return <XCircle className="w-5 h-5 text-red-400 shrink-0" />;
      default:
        return <Info className="w-5 h-5 text-blue-400 shrink-0" />;
    }
  };

  return (
    <div className="fixed top-5 right-5 z-50 animate-bounce-short max-w-sm w-full px-4">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-md shadow-2xl ${getColors()}`}>
        {getIcon()}
        <span className="font-semibold text-sm tracking-wide">{message}</span>
      </div>
    </div>
  );
};
