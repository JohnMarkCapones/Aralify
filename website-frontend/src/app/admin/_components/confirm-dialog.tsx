"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  onConfirm: () => void;
  destructive?: boolean;
  confirmText?: string;
  cancelText?: string;
  requireConfirmation?: string;
  children?: React.ReactNode;
}

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  onConfirm,
  destructive = false,
  confirmText = "Confirm",
  cancelText = "Cancel",
  requireConfirmation,
  children,
}: ConfirmDialogProps) {
  const [confirmInput, setConfirmInput] = useState("");

  const canConfirm = requireConfirmation ? confirmInput === requireConfirmation : true;

  const handleConfirm = () => {
    if (!canConfirm) return;
    onConfirm();
    onOpenChange(false);
    setConfirmInput("");
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { onOpenChange(v); setConfirmInput(""); }}>
      <DialogContent className="rounded-xl border border-[#1e293b] bg-[#111827] shadow-2xl shadow-black/40 sm:max-w-md text-slate-200">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-white">{title}</DialogTitle>
          <DialogDescription className="text-sm text-slate-400">{description}</DialogDescription>
        </DialogHeader>

        {children}

        {requireConfirmation && (
          <div className="space-y-2">
            <p className="text-sm text-slate-400">
              Type <span className="font-semibold text-white">{requireConfirmation}</span> to confirm:
            </p>
            <input
              value={confirmInput}
              onChange={(e) => setConfirmInput(e.target.value)}
              placeholder={requireConfirmation}
              className="w-full h-9 px-3 rounded-lg border border-white/[0.06] bg-white/[0.03] text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/30 transition-all"
            />
          </div>
        )}

        <DialogFooter className="gap-2 sm:gap-2">
          <button
            onClick={() => { onOpenChange(false); setConfirmInput(""); }}
            className="h-9 px-4 rounded-lg border border-white/[0.08] text-sm font-medium text-slate-300 hover:bg-white/[0.06] transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={handleConfirm}
            disabled={!canConfirm}
            className={cn(
              "h-9 px-4 rounded-lg text-sm font-medium text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed",
              destructive
                ? "bg-red-600 hover:bg-red-700 shadow-[0_0_12px_rgba(239,68,68,0.2)]"
                : "bg-blue-600 hover:bg-blue-700 shadow-[0_0_12px_rgba(59,130,246,0.2)]"
            )}
          >
            {confirmText}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
