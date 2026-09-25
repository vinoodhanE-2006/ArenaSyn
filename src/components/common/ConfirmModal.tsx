import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDanger?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  isDanger = true,
  onConfirm,
  onCancel
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5">
        <div className="flex items-center gap-3 text-amber-400">
          <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/20">
            <AlertTriangle className="w-7 h-7 text-amber-400" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-100">{title}</h3>
            <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold mt-0.5">Referee Safety Check</p>
          </div>
        </div>

        <p className="text-slate-300 text-sm leading-relaxed">{message}</p>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={onCancel}
            className="w-full py-3.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 font-semibold text-sm transition-colors border border-slate-700 active:scale-95"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm transition-all active:scale-95 shadow-lg ${
              isDanger
                ? 'bg-red-600 hover:bg-red-500 text-white shadow-red-950/50'
                : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-950/50'
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};
