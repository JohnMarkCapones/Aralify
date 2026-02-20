"use client";

import { useState, useEffect, useCallback } from "react";
import { Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export function NavSearchTrigger() {
  const [open, setOpen] = useState(false);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "k") {
      e.preventDefault();
      setOpen(true);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 neo-brutal-border neo-brutal-shadow-sm bg-card hover:bg-primary/10 transition-colors rounded-xl text-sm font-bold text-muted-foreground cursor-pointer"
      >
        <Search size={14} />
        <span className="hidden xl:inline">Search...</span>
        <kbd className="hidden xl:inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-muted rounded text-[10px] font-mono font-bold neo-brutal-border">
          Ctrl K
        </kbd>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="neo-brutal-border neo-brutal-shadow-lg sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display font-black text-lg">
              Search Aralify
            </DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Search courses, lessons, topics..."
            className="neo-brutal-border h-12 text-base font-medium"
            autoFocus
          />
          <div className="text-center py-8 text-muted-foreground font-medium text-sm">
            Start typing to search across courses and lessons
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
