"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export function HeroLottieBackground() {
  return (
    <div className="absolute inset-0 z-0 hidden lg:block pointer-events-none">
      {/* Neo-brutal decorative frame */}
      <div className="absolute -top-4 -right-4 w-full h-full neo-brutal-border rounded-3xl rotate-3 bg-primary/5" />
      <div className="absolute -bottom-3 -left-3 w-24 h-24 neo-brutal-border rounded-2xl bg-accent/20 rotate-6" />

      {/* Lottie animation */}
      <div className="absolute inset-0 opacity-60">
        <DotLottieReact
          src="https://assets-v2.lottiefiles.com/a/3f9cf38a-116d-11ee-b74f-03d8ed1ed29e/HDkJN3Ci5S.lottie"
          loop
          autoplay
          className="w-full h-full"
        />
      </div>

      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-primary/10 rounded-full blur-3xl" />
    </div>
  );
}
