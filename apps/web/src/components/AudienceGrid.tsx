"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";

const AUDIENCES = [
  {
    title: "Founders",
    desc: "Scale your outbound without hiring a team.",
    image: "/audiences/founders.png"
  },
  {
    title: "Sales Teams",
    desc: "Generate hyper-personalized pitches instantly.",
    image: "/audiences/sales.png"
  },
  {
    title: "Agencies",
    desc: "Manage outreach for multiple clients seamlessly.",
    image: "/audiences/agencies.png"
  },
  {
    title: "Marketers",
    desc: "Co-write campaigns matching brand tone.",
    image: "/audiences/marketers.png"
  }
];

export default function AudienceGrid() {
  const reduce = useReducedMotion();

  return (
    <section className="px-6 py-24 bg-[var(--bg)]">
      <div className="max-w-6xl mx-auto text-center">
        
        <h2 className="text-3xl md:text-[40px] leading-tight font-bold tracking-tight text-[var(--text)] mb-16">
          Perfect for founders, <br/>
          sales teams, and agencies.
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {AUDIENCES.map((item, i) => (
            <motion.div
              key={item.title}
              className="flex flex-col items-center text-center"
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Real Image */}
              <div className="w-full aspect-square rounded-[2rem] bg-[var(--bg-elevated)] mb-6 overflow-hidden relative shadow-sm border border-[var(--border)]">
                <Image src={item.image} alt={item.title} fill className="object-cover transition-transform duration-700 hover:scale-105" />
              </div>
              
              <h3 className="text-sm font-bold text-[var(--text)] mb-2">{item.title}</h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed max-w-[200px]">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
