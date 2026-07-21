"use client";

import Image from "next/image";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Navigation() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-[var(--border)] bg-[var(--bg)]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        
        {/* Logo */}
        <a href="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
          <Image src="/logo.png" alt="Blink Logo" width={32} height={32} className="rounded-lg object-contain shadow-[0_0_15px_var(--accent-glow)]" />
          <span className="font-bold tracking-tight text-[var(--text)]">Blink</span>
        </a>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[var(--text-secondary)]">
          <a href="/features" className="hover:text-[var(--text)] transition-colors">Features</a>
          <a href="/how-it-works" className="hover:text-[var(--text)] transition-colors">How it works</a>
        </nav>

        {/* CTA & Theme Toggle */}
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <a 
            href="/dashboard"
            className="hidden md:inline-flex h-9 items-center justify-center rounded-full bg-[var(--text)] px-4 text-sm font-medium text-[var(--bg)] shadow transition-colors hover:bg-[var(--text-secondary)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]"
          >
            Try Now
          </a>
        </div>
        
      </div>
    </header>
  );
}
