"use client";

import ChatInterface from "@/components/ChatInterface";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl bg-[var(--bg)]/75 border-b border-[var(--border)]">
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5">
            <span className="text-xl drop-shadow-[0_0_8px_var(--accent-glow)]">⚡</span>
            <span className="text-lg font-extrabold tracking-tight">Blink</span>
          </a>
          <span className="text-[10px] font-semibold px-3 py-1 rounded-full bg-[var(--accent)]/10 text-[var(--accent-light)] border border-[var(--accent)]/25 tracking-wider">
            OKX.AI AGENT
          </span>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-40 pb-20 px-6 text-center overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[var(--accent-glow)] rounded-full blur-[120px] opacity-40 pointer-events-none" />

        <div className="relative max-w-2xl mx-auto">
          <p className="text-xs font-semibold text-[var(--accent-light)] tracking-[2px] uppercase mb-5">
            AI-Powered Outreach
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] mb-6">
            Write emails that{" "}
            <span className="bg-gradient-to-r from-[var(--accent-light)] to-[var(--green)] bg-clip-text text-transparent">
              actually get replies.
            </span>
          </h1>
          <p className="text-base sm:text-lg text-[var(--text-muted)] max-w-lg mx-auto mb-10 leading-relaxed">
            Paste a URL, a bad draft, or a VC name — Blink scrapes the web, reads context, and writes a hyper-personalized email in seconds.
          </p>
          <button
            onClick={() => document.getElementById("chat")?.scrollIntoView({ behavior: "smooth" })}
            className="inline-flex items-center gap-2 px-8 py-4 text-base font-bold text-white bg-gradient-to-r from-[var(--accent)] to-[#7c6cf0] rounded-full cursor-pointer transition-all hover:-translate-y-0.5 shadow-[0_4px_24px_var(--accent-glow),0_1px_3px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_40px_var(--accent-glow)]"
          >
            Try Blink Now
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </button>
        </div>
      </section>

      {/* Chat Section */}
      <section id="chat" className="px-6 pb-20">
        <ChatInterface />
      </section>

      {/* Features */}
      <section className="px-6 py-20">
        <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              icon: "🌐",
              title: "Live Web Scraping",
              desc: "Paste any URL. Blink reads the page in real-time and extracts context to personalize your email.",
            },
            {
              icon: "📧",
              title: "1-Click Send",
              desc: "Every response includes a pre-filled mailto link. Click once and your email client opens, ready to send.",
            },
            {
              icon: "🤖",
              title: "3 Expert Modes",
              desc: "From podcast networking to VC pitches to brutally honest email roasts — pick the mode that fits.",
            },
          ].map((f, i) => (
            <div
              key={i}
              className="p-7 rounded-2xl bg-[var(--bg-card)] border border-[var(--border)] text-center hover:border-[var(--border-hover)] hover:-translate-y-0.5 transition-all"
            >
              <span className="text-2xl block mb-3">{f.icon}</span>
              <h3 className="text-sm font-bold mb-1.5">{f.title}</h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] py-8 text-center mt-auto">
        <p className="text-xs text-[var(--text-muted)]">
          Built with ⚡ for the <strong>OKX.AI Genesis Hackathon</strong>
        </p>
        <p className="text-[10px] text-[var(--text-dim)] mt-1">Powered by OpenAI GPT-4o</p>
      </footer>
    </div>
  );
}
