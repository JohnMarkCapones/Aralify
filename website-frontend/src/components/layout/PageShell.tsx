"use client";

import { useState } from "react";
import { Navbar, Footer } from "@/components/landing";
import { MobileBottomNav } from "@/components/navigation";

export function PageShell({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background font-body text-foreground selection:bg-primary selection:text-white">
      <Navbar
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      <main className="pt-20 pb-20 lg:pb-0">
        {children}
      </main>
      <Footer />
      <MobileBottomNav onMorePress={() => setMobileMenuOpen(true)} />
    </div>
  );
}
