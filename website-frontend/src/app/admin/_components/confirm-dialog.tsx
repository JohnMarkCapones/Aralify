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
      <DialogContent className="rounded-xl border border-border/50 shadow-lg sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">{title}</DialogTitle>
          <DialogDescription className="text-sm">{description}</DialogDescription>
        </DialogHeader>

        {children}

        {requireConfirmation && (
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Type <span className="font-semibold text-foreground">{requireConfirmation}</span> to confirm:
            </p>
            <input
              value={confirmInput}
              onChange={(e) => setConfirmInput(e.target.value)}
              placeholder={requireConfirmation}
              className="w-full h-9 px-3 rounded-lg border border-border/50 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
            />
          </div>
        )}

        <DialogFooter className="gap-2 sm:gap-2">
          <button
            onClick={() => { onOpenChange(false); setConfirmInput(""); }}
            className="h-9 px-4 rounded-lg border border-border/50 text-sm font-medium hover:bg-muted transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={handleConfirm}
            disabled={!canConfirm}
            className={cn(
              "h-9 px-4 rounded-lg text-sm font-medium text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed",
              destructive
                ? "bg-red-600 hover:bg-red-700"
                : "bg-primary hover:bg-primary/90"
            )}
          >
            {confirmText}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
