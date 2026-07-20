# Blink ⚡ — Outreach Copilot

> AI-powered outreach agent that writes hyper-personalized cold emails, roasts bad pitches, and helps you land meetings.

---

## What is Blink?

Blink is an **Agentic Service Provider (ASP)** that turns cold outreach from a painful, time-consuming chore into a 10-second workflow. It combines **live web scraping**, **GPT-4o reasoning**, and **1-click email sending** into a single conversational agent.

### 3 Expert Modes

| Mode | What It Does |
|------|-------------|
| **Podcast Insight** | Paste a podcast URL or transcript. Blink extracts a specific insight and drafts a cold email referencing it. |
| **VC Pitch** | Describe your startup + target VC. Blink analyzes their investment thesis and writes a tailored pitch email. |
| **CEO Roast** | Paste your draft email. A ruthless Fortune 500 CEO persona roasts it, then rewrites it to perfection. |

### Key Features

- **Live Web Scraping** — Paste any URL. Blink reads the page in real-time and uses the content for personalization.
- **📧 1-Click Send** — Every response includes a pre-filled `mailto:` link. Click once and your email client opens, ready to send.
- **⚡ Instant Results** — Powered by GPT-4o for fast, high-quality email generation.

---

## Architecture

```
┌─────────────────┐     ┌─────────────────────┐
│   Next.js UI    │────▶│   Express Backend    │
│  (Port 3000)    │     │    (Port 4000)       │
└─────────────────┘     └──────┬──────────────┘
                               │
                    ┌──────────┼──────────┐
                    ▼          ▼          ▼
              Web Scraper   OpenAI    mailto:
              (cheerio)    (GPT-4o)   Generator
```

**Tech Stack:**
- **Frontend:** Next.js 16 + TypeScript + Tailwind CSS
- **Backend:** Express.js + TypeScript
- **AI Engine:** OpenAI GPT-4o
- **Web Scraping:** Axios + Cheerio
- **Deployment:** Dokploy (Docker)

---

## Getting Started

### Prerequisites
- Node.js 18+
- An [OpenAI API key](https://platform.openai.com/api-keys)

### 1. Clone the repo
```bash
git clone https://github.com/YOUR_USERNAME/blink.git
cd blink
```

### 2. Start the backend
```bash
npm install
cp .env.example .env
# Add your OPENAI_API_KEY to .env
npx tsx src/index.ts
```
Backend runs at `http://localhost:4000`

### 3. Start the frontend
```bash
cd web
npm install
npm run dev
```
Frontend runs at `http://localhost:3000`
