"use client";

import Link from "next/link";
import { NeoButton } from "@/components/ui/neo-button";
import { ArrowLeft, Code2, Terminal } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background font-body text-foreground flex items-center justify-center px-4">
      <div className="text-center space-y-8 max-w-lg">
        {/* 404 visual */}
        <div className="relative inline-block">
          <div className="text-[12rem] font-black leading-none tracking-tighter text-primary/10">404</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-card neo-brutal-border neo-brutal-shadow-lg p-6 rounded-2xl">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 rounded-full bg-destructive" />
                <div className="w-3 h-3 rounded-full bg-accent" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-2 text-xs font-mono text-muted-foreground flex items-center gap-1">
                  <Terminal size={12} /> error.log
                </span>
              </div>
              <div className="font-mono text-sm text-left space-y-1">
                <div className="text-destructive font-bold">Error: PAGE_NOT_FOUND</div>
                <div className="text-muted-foreground">at Router.resolve()</div>
                <div className="text-muted-foreground">at navigate(&quot;/???&quot;)</div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-4xl font-black uppercase tracking-tighter">PAGE NOT FOUND</h1>
          <p className="text-lg font-medium text-muted-foreground">
            This page doesn&apos;t exist. Maybe it was moved, or maybe it was never here.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/">
            <NeoButton size="lg" variant="primary" className="text-lg h-14 px-8 group">
              <ArrowLeft size={18} className="mr-2" /> BACK TO HOME
            </NeoButton>
          </Link>
          <Link href="/courses">
            <NeoButton size="lg" variant="outline" className="text-lg h-14 px-8">
              <Code2 size={18} className="mr-2" /> BROWSE COURSES
            </NeoButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
