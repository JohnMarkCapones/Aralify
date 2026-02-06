"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

interface NeoButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "accent" | "muted" | "outline";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

const NeoButton = React.forwardRef<HTMLButtonElement, NeoButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const variants = {
      primary: "bg-primary text-primary-foreground hover:bg-primary/90",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
      accent: "bg-accent text-accent-foreground hover:bg-accent/90",
      muted: "bg-muted text-muted-foreground hover:bg-muted/90",
      outline: "bg-transparent text-foreground hover:bg-secondary",
    };

    const sizes = {
      sm: "h-10 px-4 text-sm",
      md: "h-12 px-6 text-base",
      lg: "h-16 px-8 text-xl",
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02, x: -2, y: -2, boxShadow: "7px 7px 0px 0px rgba(0,0,0,1)" }}
        whileTap={{ scale: 0.98, x: 0, y: 0, boxShadow: "2px 2px 0px 0px rgba(0,0,0,1)" }}
        className={cn(
          "relative inline-flex items-center justify-center font-display font-bold uppercase tracking-wider transition-colors neo-brutal-border neo-brutal-shadow rounded-full",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);
NeoButton.displayName = "NeoButton";

export { NeoButton };
