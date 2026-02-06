"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, AlertCircle, Zap, Info } from "lucide-react";

type ToastType = "success" | "error" | "xp" | "info";

interface Toast {
  id: string;
  type: ToastType;
  message: string;
}

interface ToastContextType {
  toast: (type: ToastType, message: string) => void;
}

const ToastContext = createContext<ToastContextType>({ toast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

const icons: Record<ToastType, React.ReactNode> = {
  success: <CheckCircle size={18} className="text-emerald-500" />,
  error: <AlertCircle size={18} className="text-destructive" />,
  xp: <Zap size={18} className="text-primary" />,
  info: <Info size={18} className="text-secondary" />,
};

const styles: Record<ToastType, string> = {
  success: "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30",
  error: "border-destructive bg-destructive/10",
  xp: "border-primary bg-primary/10",
  info: "border-secondary bg-secondary/10",
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((type: ToastType, message: string) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast: addToast }}>
      {children}
      <div className="fixed top-4 right-4 z-[200] space-y-2 w-80">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, x: 80, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 80, scale: 0.95 }}
              className={`flex items-center gap-3 p-4 rounded-xl neo-brutal-border border-2 ${styles[t.type]} shadow-lg`}
            >
              {icons[t.type]}
              <span className="flex-1 text-sm font-bold">{t.message}</span>
              <button onClick={() => removeToast(t.id)} className="p-1 hover:bg-black/5 rounded-lg transition-colors" aria-label="Dismiss">
                <X size={14} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
