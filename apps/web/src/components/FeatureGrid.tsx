"use client";

import { motion, useReducedMotion } from "motion/react";
import { ChatCircleText, UsersThree, CheckCircle } from "@phosphor-icons/react";

const CARDS = [
  {
    icon: ChatCircleText,
    title: "Start a chat",
    desc: "Tell your AI copilot who you're emailing. No setup, no prompts — just paste a LinkedIn URL and watch your agent draft the perfect intro.",
    img: "bg-[var(--bg-elevated)]"
  },
  {
    icon: UsersThree,
    title: "Collaborate",
    desc: "Strategist, Designer, and Writer discuss and refine your pitch.",
    img: "bg-white"
  },
  {
    icon: CheckCircle,
    title: "Get results",
    desc: "Instantly generate a highly personalized, ready-to-send draft.",
    img: "bg-[var(--bg-elevated)]"
  }
];

export default function FeatureGrid() {
  const reduce = useReducedMotion();

  return (
    <section className="px-6 py-24 bg-[var(--bg)]">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 max-w-xl">
          <h2 className="text-3xl md:text-[40px] leading-tight font-semibold tracking-tight text-[var(--text)]">
            Automate your outreach <br/>
            <span className="text-[var(--text-muted)]">— like a real SDR.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CARDS.map((card, i) => (
            <motion.div
              key={card.title}
              className={`rounded-[2rem] border border-[var(--border)] p-8 ${i === 0 ? 'bg-[var(--bg-elevated)]' : 'bg-[var(--bg)]'} shadow-sm flex flex-col`}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-2 mb-4 text-[var(--text-secondary)]">
                <card.icon className="w-5 h-5" />
                <h3 className="text-sm font-bold text-[var(--text)]">{card.title}</h3>
              </div>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-12">
                {card.desc}
              </p>
              
              {/* Abstract Visual Placeholder */}
              <div className="mt-auto relative w-full aspect-[4/3] rounded-xl bg-gradient-to-br from-[var(--bg-elevated)] to-[var(--bg)] border border-[var(--border)] overflow-hidden">
                {i === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center p-6">
                    <div className="w-full bg-[var(--bg)] rounded-lg shadow-sm border border-[var(--border)] p-4">
                      <div className="font-semibold text-[13px] mb-2">Hey, how can I help you?</div>
                      <div className="w-3/4 h-2 bg-[var(--bg-elevated)] rounded-full mb-1" />
                      <div className="w-1/2 h-2 bg-[var(--bg-elevated)] rounded-full" />
                    </div>
                  </div>
                )}
                {i === 1 && (
                  <div className="absolute inset-0 flex items-end justify-center p-6">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full border-2 border-[var(--bg)] bg-purple-300" />
                      <div className="w-8 h-8 rounded-full border-2 border-[var(--bg)] bg-blue-300" />
                      <div className="w-8 h-8 rounded-full border-2 border-[var(--bg)] bg-emerald-300" />
                      <div className="w-8 h-8 rounded-full border-2 border-[var(--bg)] bg-orange-300" />
                    </div>
                  </div>
                )}
                {i === 2 && (
                  <div className="absolute inset-0 flex items-end justify-end p-6">
                    <div className="px-3 py-1.5 rounded-full bg-[var(--bg)] border border-[var(--border)] text-[10px] font-medium shadow-sm flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" /> Generate final draft
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
