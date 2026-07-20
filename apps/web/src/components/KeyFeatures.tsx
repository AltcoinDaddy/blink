"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { 
  Users, 
  Brain, 
  FileText, 
  ArrowsLeftRight 
} from "@phosphor-icons/react";

const FEATURES = [
  {
    icon: Users,
    title: "Multi-Agent Chat",
    desc: "Talk to Strategist, Designer, and Writer agents in one space.",
  },
  {
    icon: Brain,
    title: "Context Memory",
    desc: "Blink remembers project context and team dynamics.",
  },
  {
    icon: FileText,
    title: "Generate Drafts",
    desc: "One click to export your final pitch or follow-up email.",
  },
  {
    icon: ArrowsLeftRight,
    title: "Switch Expert Modes",
    desc: "Focus on strategy, tone, or roasting at any time.",
  }
];

export default function KeyFeatures() {
  const reduce = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="px-6 py-24 bg-[var(--bg)]">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
        
        {/* Left Col - Feature List */}
        <div className="w-full lg:w-1/2">
          <h2 className="text-2xl font-bold mb-8 text-[var(--text)]">Key Features</h2>
          
          <div className="space-y-4">
            {FEATURES.map((feature, i) => {
              const isActive = i === activeIndex;
              return (
                <div 
                  key={feature.title}
                  onClick={() => setActiveIndex(i)}
                  className={`p-5 rounded-2xl cursor-pointer transition-all duration-300 ${isActive ? 'bg-[var(--bg-elevated)] shadow-sm' : 'hover:bg-[var(--bg-elevated)]/50'}`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <feature.icon className={`w-5 h-5 ${isActive ? 'text-[var(--text)]' : 'text-[var(--text-secondary)]'}`} weight={isActive ? "bold" : "regular"} />
                    <h3 className={`font-semibold ${isActive ? 'text-[var(--text)]' : 'text-[var(--text-secondary)]'}`}>
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-sm text-[var(--text-muted)] pl-8">
                    {feature.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Col - Large Mockup */}
        <div className="w-full lg:w-1/2">
          <motion.div 
            className="w-full aspect-[4/5] md:aspect-square bg-[var(--accent)] rounded-[2rem] flex items-center justify-center p-8 overflow-hidden relative"
            initial={reduce ? false : { opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* The Phone / App Mockup */}
            <div className="w-full max-w-[320px] h-[600px] bg-[var(--bg-elevated)] rounded-[2.5rem] shadow-2xl border-[8px] border-zinc-900 relative overflow-hidden flex flex-col">
              {/* Dynamic Island fake */}
              <div className="absolute top-0 inset-x-0 h-7 flex justify-center z-20">
                <div className="w-24 h-5 bg-zinc-900 rounded-b-xl" />
              </div>

              {/* Chat Interface Mockup */}
              <div className="flex-1 p-4 pt-12 overflow-hidden flex flex-col gap-4">
                
                <div className="flex justify-end">
                  <div className="bg-[var(--text)] text-[var(--bg)] text-[11px] p-3 rounded-2xl rounded-tr-sm max-w-[80%]">
                    "Exactly. I want it to feel lightweight and smart, not corporate."
                  </div>
                </div>

                <div className="flex flex-col gap-1 items-start">
                  <div className="text-[9px] font-bold text-zinc-600 pl-1 flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                    CEO Roaster
                  </div>
                  <div className="bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] text-[11px] p-3 rounded-2xl rounded-tl-sm max-w-[90%] shadow-sm">
                    "This pitch is weak. Let me sketch a minimal header, soft gradient background, and one key value prop. Do you want bright or dark tones?"
                  </div>
                </div>

                <div className="flex flex-col gap-1 items-start mt-4">
                  <div className="text-[9px] font-bold text-[var(--accent)] pl-1 flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                    Writer
                  </div>
                  <div className="bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] text-[11px] p-3 rounded-2xl rounded-tl-sm max-w-[90%] shadow-sm">
                    "Work smarter, not harder — let AI take care of the rest."<br/><br/>
                    Would you like something punchier?
                  </div>
                </div>

              </div>

              {/* Input Area Fake */}
              <div className="p-4 bg-[var(--bg)] border-t border-[var(--border)] mt-auto">
                <div className="w-full bg-[var(--bg-elevated)] rounded-full h-10 px-4 flex items-center text-[10px] text-[var(--text-muted)] border border-[var(--border)]">
                  Nice. Let's finalize that...
                </div>
              </div>

            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
