"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "@phosphor-icons/react";

export default function BottomCTALavender() {
  const reduce = useReducedMotion();

  return (
    <section className="px-6 py-32 bg-[var(--bg)] relative overflow-hidden">
      {/* Background Soft Purple Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[var(--accent-subtle)] rounded-[100%] blur-[80px] pointer-events-none" />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <motion.h2 
          className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-tight text-[var(--text)] mb-10"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          Start your first project <br/>
          with Blink today.
        </motion.h2>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <a
            href="/dashboard"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent-subtle)] text-[var(--accent-hover)] rounded-full font-bold hover:bg-[var(--accent)] hover:text-white transition-all active:scale-[0.98] shadow-sm hover:shadow-md"
          >
            Try now
            <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center text-[var(--accent)]">
              <ArrowRight weight="bold" className="w-3 h-3" />
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
