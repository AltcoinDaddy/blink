"use client";

import { motion } from "motion/react";

export default function FooterBold() {
  return (
    <footer className="bg-[var(--accent)] pt-24 pb-12 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col justify-between h-full min-h-[300px]">
        
        {/* Top Links Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24 text-[var(--bg-elevated)]/90 text-xs font-semibold">
          <div className="flex flex-col gap-3">
            <a href="#" className="hover:text-white transition-colors">Start a chat</a>
            <a href="#" className="hover:text-white transition-colors">AI Agents</a>
            <a href="#" className="hover:text-white transition-colors">Group Collaboration</a>
            <a href="#" className="hover:text-white transition-colors">Generate Final Plan</a>
            <a href="#" className="hover:text-white transition-colors">FAQ</a>
          </div>
          <div className="hidden md:block" />
          <div className="hidden md:block" />
          <div className="flex flex-col gap-3 items-start md:items-end">
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">Twitter/X</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-white transition-colors">Dribbble</a>
          </div>
        </div>

        {/* Bottom Massive Text */}
        <div className="mt-auto">
          <h2 className="text-[12vw] md:text-[140px] font-black leading-none tracking-tighter text-white flex items-end">
            Blink <span className="w-[12vw] h-[2vw] md:w-32 md:h-6 bg-white ml-4 md:ml-6 mb-2 md:mb-6 animate-pulse" />
          </h2>
        </div>
      </div>
    </footer>
  );
}
