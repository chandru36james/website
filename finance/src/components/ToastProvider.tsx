import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle, AlertCircle, Info, XCircle, X } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
}

interface ToastContextType {
  toast: {
    success: (title: string, message?: string) => void;
    error: (title: string, message?: string) => void;
    info: (title: string, message?: string) => void;
    warning: (title: string, message?: string) => void;
  };
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used inside ToastProvider');
  return ctx;
};

const ICONS = {
  success: CheckCircle,
  error: XCircle,
  info: Info,
  warning: AlertCircle,
};

const STYLES = {
  success: 'bg-white border-l-4 border-l-emerald-500 shadow-lg',
  error:   'bg-white border-l-4 border-l-red-500 shadow-lg',
  info:    'bg-white border-l-4 border-l-blue-500 shadow-lg',
  warning: 'bg-white border-l-4 border-l-amber-500 shadow-lg',
};

const ICON_STYLES = {
  success: 'text-emerald-500',
  error:   'text-red-500',
  info:    'text-blue-500',
  warning: 'text-amber-500',
};

function ToastItem({ toast, onRemove }: { toast: Toast; onRemove: (id: string) => void }) {
  const Icon = ICONS[toast.type];
  return (
    <div
      className={`flex items-start gap-3 p-4 rounded-xl border border-slate-200/80 min-w-[280px] max-w-sm ${STYLES[toast.type]} animate-in slide-in-from-right-5 duration-300`}
    >
      <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${ICON_STYLES[toast.type]}`} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-slate-800">{toast.title}</p>
        {toast.message && (
          <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{toast.message}</p>
        )}
      </div>
      <button
        onClick={() => onRemove(toast.id)}
        className="shrink-0 text-slate-400 hover:text-slate-600 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((type: ToastType, title: string, message?: string) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts(prev => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const toast = {
    success: (title: string, msg?: string) => addToast('success', title, msg),
    error:   (title: string, msg?: string) => addToast('error', title, msg),
    info:    (title: string, msg?: string) => addToast('info', title, msg),
    warning: (title: string, msg?: string) => addToast('warning', title, msg),
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {/* Toast Stack */}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-2.5 pointer-events-none">
        {toasts.map(t => (
          <div key={t.id} className="pointer-events-auto">
            <ToastItem toast={t} onRemove={removeToast} />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
