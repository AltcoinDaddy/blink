"use client";

import { useState, useRef, useEffect } from "react";

type Mode = "podcast" | "vc" | "roast";

interface Message {
  role: "bot" | "user";
  content: string;
  actionUrl?: string | null;
}

const MODES: { id: Mode; icon: string; name: string; desc: string; placeholder: string }[] = [
  {
    id: "podcast",
    icon: "🎙️",
    name: "Podcast Insight",
    desc: "Paste a podcast URL or transcript. Blink writes a cold email referencing a specific insight they shared.",
    placeholder: "Paste a podcast URL or transcript excerpt here...",
  },
  {
    id: "vc",
    icon: "💰",
    name: "VC Pitch",
    desc: "Describe your startup and a target VC. Blink crafts a pitch email aligned with their investment thesis.",
    placeholder: "Describe your startup and the VC you want to pitch (paste their website URL)...",
  },
  {
    id: "roast",
    icon: "🔥",
    name: "CEO Roast",
    desc: "Paste your draft email. A ruthless Fortune 500 CEO persona roasts it, then rewrites it to perfection.",
    placeholder: "Paste your cold email draft here to get roasted...",
  },
];

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export default function ChatInterface() {
  const [mode, setMode] = useState<Mode>("podcast");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      content:
        "Hey! I'm **Blink** ⚡ — your outreach copilot. Pick a mode above, then paste a URL, describe your startup, or drop a bad email draft. I'll do the rest.",
    },
  ]);
  const [input, setInput] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEnd = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const activeMode = MODES.find((m) => m.id === mode)!;

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
      const errorMessage = err instanceof Error ? err.message : "Network error";
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: `⚠️ Error: ${errorMessage}. Make sure the backend is running.` },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function renderMarkdown(text: string) {
    // Very simple markdown: bold, line breaks
    return text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\n/g, "<br />");
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Mode Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
        {MODES.map((m) => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            className={`group relative p-5 rounded-2xl border text-left transition-all duration-300 cursor-pointer ${
              mode === m.id
                ? "border-[var(--accent)] bg-[var(--accent)]/8 shadow-[0_0_0_1px_var(--accent),0_4px_24px_var(--accent-glow)]"
                : "border-[var(--border)] bg-[var(--bg-card)] hover:border-[var(--border-hover)] hover:-translate-y-0.5"
            }`}
          >
            <span className="text-2xl block mb-2">{m.icon}</span>
            <h3 className="text-sm font-bold mb-1">{m.name}</h3>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">{m.desc}</p>
          </button>
        ))}
      </div>

      {/* Chat Container */}
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] overflow-hidden">
        {/* Chat Header */}
        <div className="px-5 py-3.5 border-b border-[var(--border)] flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-[var(--green)] animate-pulse-dot" />
          <span className="text-xs font-semibold text-[var(--text-muted)] tracking-wide">
            {activeMode.name} Mode
          </span>
        </div>

        {/* Messages */}
        <div className="p-5 min-h-[280px] max-h-[480px] overflow-y-auto flex flex-col gap-5">
          {messages.map((msg, i) => (
            <div
              key={i}
              className="flex gap-3 animate-fade-in-up"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm shrink-0 ${
                  msg.role === "bot"
                    ? "bg-gradient-to-br from-[var(--accent)] to-[#7c6cf0]"
                    : "bg-[var(--bg-input)] border border-[var(--border)]"
                }`}
              >
                {msg.role === "bot" ? "⚡" : "👤"}
              </div>
              {/* Body */}
              <div className="flex-1 min-w-0">
                <div
                  className={`text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === "user" ? "text-[var(--text-muted)]" : ""
                  }`}
                  dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.content) }}
                />
                {msg.actionUrl && (
                  <a
                    href={msg.actionUrl}
                    className="inline-flex items-center gap-1.5 mt-3 px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-[var(--green)] to-[#00b894] rounded-full hover:-translate-y-0.5 transition-all shadow-[0_2px_12px_rgba(0,210,160,0.25)] hover:shadow-[0_4px_20px_rgba(0,210,160,0.35)]"
                  >
                    📧 Send This Email
                  </a>
                )}
              </div>
            </div>
          ))}

          {/* Loading indicator */}
          {loading && (
            <div className="flex gap-3 animate-fade-in-up">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm bg-gradient-to-br from-[var(--accent)] to-[#7c6cf0]">
                ⚡
              </div>
              <div className="flex gap-1.5 items-center pt-2">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="w-2 h-2 rounded-full bg-[var(--accent-light)]"
                    style={{
                      animation: `bounce-dot 1.4s infinite ease-in-out`,
                      animationDelay: `${i * 0.16}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          <div ref={messagesEnd} />
        </div>

        {/* Input Area */}
        <div className="px-5 pb-5 pt-3 border-t border-[var(--border)] flex flex-col gap-2.5">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Recipient email (optional — enables 1-click send)"
            className="w-full px-4 py-2.5 text-xs bg-[var(--bg-input)] border border-[var(--border)] rounded-xl text-[var(--text)] placeholder:text-[var(--text-dim)] outline-none focus:border-[var(--accent)] transition-colors"
          />
          <div className="flex gap-2.5">
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
              className="flex-1 px-4 py-3 text-sm bg-[var(--bg-input)] border border-[var(--border)] rounded-xl text-[var(--text)] placeholder:text-[var(--text-dim)] outline-none focus:border-[var(--accent)] transition-colors resize-none leading-relaxed"
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="self-end w-11 h-11 rounded-xl bg-gradient-to-br from-[var(--accent)] to-[#7c6cf0] text-white flex items-center justify-center text-lg shrink-0 hover:scale-105 hover:shadow-[0_4px_20px_var(--accent-glow)] transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:scale-100 cursor-pointer"
            >
              ↑
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
