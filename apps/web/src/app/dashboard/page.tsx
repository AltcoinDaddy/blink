"use client";
import Image from "next/image";

import { useState, useRef, useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  Microphone,
  CurrencyDollar,
  Fire,
  Lightning,
  User,
  PaperPlaneTilt,
  EnvelopeSimple,
  Plus,
  Gear,
  SignOut,
  List
} from "@phosphor-icons/react";

type Mode = "podcast" | "vc" | "roast";

interface Message {
  role: "bot" | "user";
  content: string;
  actionUrl?: string | null;
}

const MODES: {
  id: Mode;
  icon: typeof Microphone;
  name: string;
  desc: string;
  placeholder: string;
}[] = [
  {
    id: "podcast",
    icon: Microphone,
    name: "Podcast Insight",
    desc: "Paste a podcast URL or transcript. Blink writes a cold email referencing a specific insight.",
    placeholder: "Paste a podcast URL or transcript excerpt here...",
  },
  {
    id: "vc",
    icon: CurrencyDollar,
    name: "VC Pitch",
    desc: "Describe your startup and a target VC. Blink crafts a pitch email aligned with their thesis.",
    placeholder:
      "Describe your startup and the VC you want to pitch (paste their website URL)...",
  },
  {
    id: "roast",
    icon: Fire,
    name: "CEO Roast",
    desc: "Paste your draft email. A ruthless Fortune 500 CEO roasts it, then rewrites it to perfection.",
    placeholder: "Paste your cold email draft here to get roasted...",
  },
];

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4005";

export default function Dashboard() {
  const [mode, setMode] = useState<Mode>("podcast");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      content:
        "Hey! I'm **Blink** - your outreach copilot. Pick a mode from the sidebar, then paste a URL, describe your startup, or drop a bad email draft. I'll do the rest.",
    },
  ]);
  const [input, setInput] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const messagesEnd = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const activeMode = MODES.find((m) => m.id === mode)!;

  function handleNewChat() {
    setMessages([
      {
        role: "bot",
        content: `Started a new **${activeMode.name}** session. What do you need?`,
      },
    ]);
    setInput("");
    setEmail("");
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  }

  async function handleSend() {
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg,
          mode,
          targetEmail: email || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setMessages((prev) => [
        ...prev,
        { role: "bot", content: data.reply, actionUrl: data.actionUrl },
      ]);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Network error";
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content: `Error: ${errorMessage}. Make sure the backend is running.`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function renderMarkdown(text: string) {
    return text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\n/g, "<br />");
  }

  return (
    <div className="flex h-screen bg-[var(--bg)] overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed md:static inset-y-0 left-0 z-50 w-72 bg-[var(--bg-card)] border-r border-[var(--border)] flex flex-col transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="p-5 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="Blink Logo" width={32} height={32} className="rounded-lg object-contain shadow-[0_0_15px_var(--accent-glow)]" />
            <span className="text-lg font-bold tracking-tight">Blink</span>
          </a>
          <button 
            className="md:hidden p-2 text-[var(--text-secondary)] hover:text-[var(--text)]"
            onClick={() => setSidebarOpen(false)}
          >
            &times;
          </button>
        </div>

        <div className="px-4 pb-4">
          <button 
            onClick={handleNewChat}
            className="w-full flex items-center gap-2 px-4 py-3 bg-[var(--bg-input)] border border-[var(--border)] hover:border-[var(--accent)] text-sm font-medium rounded-xl transition-colors active:scale-[0.98]"
          >
            <Plus weight="bold" className="w-4 h-4" />
            New Chat
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-2 flex flex-col gap-6">
          <div>
            <h3 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-widest mb-3 px-2">
              Expert Modes
            </h3>
            <div className="flex flex-col gap-1">
              {MODES.map((m) => {
                const isActive = mode === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => {
                      setMode(m.id);
                      if (window.innerWidth < 768) setSidebarOpen(false);
                    }}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left ${
                      isActive
                        ? "bg-[var(--accent-subtle)] text-[var(--accent)]"
                        : "text-[var(--text-secondary)] hover:bg-[var(--bg-input)] hover:text-[var(--text)]"
                    }`}
                  >
                    <m.icon weight={isActive ? "fill" : "regular"} className="w-5 h-5" />
                    {m.name}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-widest mb-3 px-2">
              Recent Chats
            </h3>
            <div className="flex flex-col gap-1 px-2">
              <p className="text-xs text-[var(--text-muted)] italic">No recent chats yet.</p>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-[var(--border)] flex flex-col gap-1">
          <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-input)] hover:text-[var(--text)] transition-colors text-left">
            <Gear className="w-5 h-5" />
            Settings
          </button>
          <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-input)] hover:text-[var(--text)] transition-colors text-left">
            <SignOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full relative min-w-0">
        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between p-4 border-b border-[var(--border)] bg-[var(--bg)]/80 backdrop-blur-md z-30">
          <button 
            onClick={() => setSidebarOpen(true)}
            className="p-2 -ml-2 text-[var(--text-secondary)] hover:text-[var(--text)]"
          >
            <List weight="bold" className="w-6 h-6" />
          </button>
          <span className="text-sm font-semibold">{activeMode.name}</span>
          <div className="w-6" /> {/* Spacer */}
        </header>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-3xl mx-auto flex flex-col gap-6 pb-4">
            {/* Top Description */}
            <div className="flex items-center gap-4 pb-6 border-b border-[var(--border)]">
              <div className="w-12 h-12 rounded-xl bg-[var(--accent-subtle)] flex items-center justify-center shrink-0">
                <activeMode.icon weight="duotone" className="w-6 h-6 text-[var(--accent)]" />
              </div>
              <div>
                <h2 className="text-lg font-bold">{activeMode.name}</h2>
                <p className="text-sm text-[var(--text-secondary)] max-w-[55ch]">
                  {activeMode.desc}
                </p>
              </div>
            </div>

            {/* Messages */}
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                className="flex gap-4"
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center shrink-0 mt-0.5 overflow-hidden ${
                    msg.role === "bot"
                      ? "shadow-[0_0_15px_var(--accent-glow)]"
                      : "bg-[var(--bg-input)] border border-[var(--border)]"
                  }`}
                >
                  {msg.role === "bot" ? (
                    <Image
                      src="/logo.png"
                      alt="Blink"
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User
                      weight="bold"
                      className="w-4 h-4 md:w-5 md:h-5 text-[var(--text-muted)]"
                    />
                  )}
                </div>
                {/* Body */}
                <div className="flex-1 min-w-0">
                  <div
                    className={`text-sm md:text-base leading-relaxed whitespace-pre-wrap ${
                      msg.role === "user" ? "text-[var(--text-secondary)]" : ""
                    }`}
                    dangerouslySetInnerHTML={{
                      __html: renderMarkdown(msg.content),
                    }}
                  />
                  {msg.actionUrl && (
                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      <a
                        href={msg.actionUrl}
                        className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-[var(--bg)] bg-[var(--accent)] hover:bg-[var(--accent-hover)] rounded-full transition-all active:scale-[0.98] shadow-[0_2px_12px_var(--accent-glow)]"
                      >
                        <EnvelopeSimple weight="bold" className="w-4 h-4" />
                        Send This Email
                      </a>
                      <span className="text-xs font-medium text-[var(--text-dim)] bg-[var(--bg-input)] px-3 py-1.5 rounded-full border border-[var(--border)] font-[family-name:var(--font-geist-mono)]">
                        {
                          msg.content
                            .split(/\s+/)
                            .filter((w) => w.length > 0).length
                        }{" "}
                        words
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Skeletal loader */}
            {loading && (
              <div className="flex gap-4">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg shadow-[0_0_15px_var(--accent-glow)] flex items-center justify-center shrink-0 mt-0.5 overflow-hidden">
                  <Image
                    src="/logo.png"
                    alt="Blink"
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 space-y-3 pt-2 max-w-xl">
                  <div className="h-3 w-3/4 rounded-full animate-shimmer" />
                  <div className="h-3 w-1/2 rounded-full animate-shimmer" />
                  <div className="h-3 w-2/3 rounded-full animate-shimmer" />
                </div>
              </div>
            )}

            <div ref={messagesEnd} className="h-4" />
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 md:p-6 bg-[var(--bg)]/90 backdrop-blur-lg border-t border-[var(--border)] shrink-0">
          <div className="max-w-3xl mx-auto flex flex-col gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Recipient email (optional - enables 1-click send)"
              className="w-full px-4 py-2.5 text-sm bg-[var(--bg-input)] border border-[var(--border)] rounded-xl text-[var(--text)] placeholder:text-[var(--text-dim)] outline-none focus:border-[var(--accent)] transition-colors"
            />
            <div className="flex gap-3">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder={activeMode.placeholder}
                rows={3}
                className="flex-1 px-4 py-3 text-sm md:text-base bg-[var(--bg-input)] border border-[var(--border)] rounded-xl text-[var(--text)] placeholder:text-[var(--text-dim)] outline-none focus:border-[var(--accent)] transition-colors resize-none leading-relaxed shadow-inner"
              />
              <button
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="self-end w-12 h-12 rounded-xl bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--bg)] flex items-center justify-center shrink-0 transition-all active:scale-[0.98] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer shadow-[0_2px_8px_var(--accent-glow)]"
              >
                <PaperPlaneTilt weight="fill" className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
