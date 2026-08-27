import React, { useState, useEffect, useCallback, createContext, useContext } from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Info,
  X,
  ShieldCheck,
  ShieldAlert,
  Zap,
} from 'lucide-react';

/* ────────────────────────────────────────────────────────────
   Toast Notification System — Production-grade overlay toasts
   ──────────────────────────────────────────────────────────── */

type ToastType = 'success' | 'error' | 'warning' | 'info' | 'threat' | 'shield';

interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  durationMs: number;
  createdAt: number;
}

interface ToastContextValue {
  addToast: (type: ToastType, title: string, message?: string, durationMs?: number) => void;
}

const ToastContext = createContext<ToastContextValue>({
  addToast: () => {},
});

export const useToast = () => useContext(ToastContext);

const ICON_MAP: Record<ToastType, React.ReactNode> = {
  success: <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />,
  error: <XCircle className="h-5 w-5 text-red-400 shrink-0" />,
  warning: <AlertTriangle className="h-5 w-5 text-amber-400 shrink-0" />,
  info: <Info className="h-5 w-5 text-cyan-400 shrink-0" />,
  threat: <ShieldAlert className="h-5 w-5 text-red-400 shrink-0 animate-pulse" />,
  shield: <ShieldCheck className="h-5 w-5 text-emerald-400 shrink-0" />,
};

const BORDER_MAP: Record<ToastType, string> = {
  success: 'border-emerald-500/30',
  error: 'border-red-500/30',
  warning: 'border-amber-500/30',
  info: 'border-cyan-500/30',
  threat: 'border-red-500/40',
  shield: 'border-emerald-500/30',
};

const BAR_MAP: Record<ToastType, string> = {
  success: 'bg-emerald-400',
  error: 'bg-red-400',
  warning: 'bg-amber-400',
  info: 'bg-cyan-400',
  threat: 'bg-red-500',
  shield: 'bg-emerald-400',
};

let toastCounter = 0;

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback(
    (type: ToastType, title: string, message?: string, durationMs = 4000) => {
      const id = `toast-${++toastCounter}-${Date.now()}`;
      setToasts((prev) => [...prev, { id, type, title, message, durationMs, createdAt: Date.now() }]);
    },
    []
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      {/* Toast Container */}
      <div className="fixed top-20 right-4 z-[9998] flex flex-col gap-2.5 pointer-events-none max-w-sm w-full">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onDismiss={removeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

const ToastItem: React.FC<{ toast: Toast; onDismiss: (id: string) => void }> = ({
  toast,
  onDismiss,
}) => {
  const [exiting, setExiting] = useState(false);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const startTime = Date.now();
    const raf = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 100 - (elapsed / toast.durationMs) * 100);
      setProgress(remaining);
      if (remaining <= 0) {
        clearInterval(raf);
        setExiting(true);
        setTimeout(() => onDismiss(toast.id), 300);
      }
    }, 30);
    return () => clearInterval(raf);
  }, [toast, onDismiss]);

  return (
    <div
      className={`pointer-events-auto relative overflow-hidden rounded-xl border ${BORDER_MAP[toast.type]} bg-slate-950/95 backdrop-blur-xl shadow-2xl shadow-black/40 transition-all duration-300 ${
        exiting ? 'opacity-0 translate-x-8 scale-95' : 'opacity-100 translate-x-0 scale-100 animate-slide-in-right'
      }`}
    >
      <div className="flex items-start gap-3 p-3.5">
        {ICON_MAP[toast.type]}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            {toast.type === 'threat' && (
              <Zap className="h-3 w-3 text-red-400" />
            )}
            <p className="text-sm font-semibold text-slate-100 truncate">{toast.title}</p>
          </div>
          {toast.message && (
            <p className="mt-0.5 text-xs text-slate-400 line-clamp-2">{toast.message}</p>
          )}
        </div>
        <button
          type="button"
          onClick={() => { setExiting(true); setTimeout(() => onDismiss(toast.id), 300); }}
          className="shrink-0 rounded-md p-0.5 text-slate-500 hover:text-slate-300 transition-colors"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-800">
        <div
          className={`h-full ${BAR_MAP[toast.type]} transition-none`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
