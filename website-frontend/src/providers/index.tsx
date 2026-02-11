"use client";

import { ThemeProvider } from "next-themes";
import { QueryProvider } from "./query-provider";
import { Toaster } from "@/components/ui/sonner";
import { ToastProvider } from "@/components/ui/neo-toast";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { PromoBanner } from "@/components/promo-banner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <QueryProvider>
        <ToastProvider>
          <PromoBanner />
          {children}
          <Toaster />
          <ScrollToTop />
        </ToastProvider>
      </QueryProvider>
    </ThemeProvider>
  );
}
