"use client";

import { motion, useReducedMotion } from "motion/react";
import { Microphone, Plus } from "@phosphor-icons/react";

export default function HeroLavender() {
  const reduce = useReducedMotion();

  return (
    <section className="relative pt-32 pb-24 px-6 overflow-hidden bg-[var(--bg)]">
      {/* Soft Top Gradient */}
      <div className="absolute top-0 left-0 right-0 h-[600px] bg-gradient-to-b from-[var(--accent-subtle)] via-[var(--accent-subtle)]/50 to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center">
        <motion.h1
          className="text-5xl md:text-6xl lg:text-[72px] font-semibold tracking-tight leading-[1.05] text-[var(--text)] mb-16 max-w-3xl"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          Research, draft, roast, <br className="hidden md:block"/>
          and send — <span className="text-[var(--text-muted)]">all in one <br/> intelligent copilot.</span>
        </motion.h1>

        {/* Floating Input Mockup */}
        <motion.div
          className="w-full max-w-2xl bg-[var(--bg)]/60 backdrop-blur-xl border border-[var(--border)] shadow-[0_20px_80px_-20px_rgba(168,138,255,0.3)] rounded-2xl p-6 md:p-8 text-left relative"
          initial={reduce ? false : { opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="text-[var(--text)] text-lg md:text-xl font-medium mb-12">
            Write a follow-up email to the CEO of Vercel...
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[var(--bg)] rounded-full border border-[var(--border)] text-xs font-semibold shadow-sm">
              <div className="flex -space-x-1">
                <div className="w-4 h-4 rounded-full bg-blue-400" />
                <div className="w-4 h-4 rounded-full bg-emerald-400" />
                <div className="w-4 h-4 rounded-full bg-orange-400" />
              </div>
              <span>Active all agents</span>
            </div>

            <div className="flex items-center gap-2">
              <button className="w-8 h-8 rounded-full bg-[var(--accent)] flex items-center justify-center text-white shadow-md hover:scale-105 transition-transform">
                <Microphone weight="fill" className="w-4 h-4" />
              </button>
              <button className="w-8 h-8 rounded-full bg-[var(--bg)] border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text)] transition-colors shadow-sm">
                <Plus weight="bold" className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Mouse Cursor Mockup */}
          <motion.div 
            className="absolute -bottom-6 -right-2 z-50 pointer-events-none"
            animate={{ x: [-20, 0, -20], y: [20, 0, 20] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.5 3.21V20.8C5.5 21.43 6.2 21.8 6.72 21.45L11.44 18.23L15.31 22.84L17.24 21.23L13.37 16.62H18.78C19.4 16.62 19.8 15.93 19.47 15.42L5.5 3.21Z" fill="black"/>
              <path d="M6.5 4.96L17.26 15.12H13.12L17.58 20.44L16.29 21.52L11.83 16.2L7.69 19V4.96Z" fill="white"/>
            </svg>
          </motion.div>
        </motion.div>

        {/* Try Now CTA */}
        <motion.div
          className="mt-12"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <a
            href="/dashboard"
            className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-[var(--text)] text-[var(--bg)] font-semibold text-base hover:bg-[var(--text-secondary)] transition-all shadow-lg hover:shadow-xl active:scale-[0.98]"
          >
            Try Now
          </a>
        </motion.div>
      </div>
    </section>
  );
}
