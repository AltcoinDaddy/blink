# Blink  — Autonomous Outreach Agent

> An AI-powered Agentic Service Provider (ASP) that autonomously deep-scrapes target websites, writes hyper-personalized cold emails, and integrates directly into the OKX AI Agent Economy.

---

##  What is Blink?

Blink turns cold outreach from a painful, time-consuming chore into a 10-second workflow. It combines **agentic deep web scraping**, **GPT-4o reasoning**, and **1-click email execution** into a single API endpoint.

Built specifically for the **OKX AI Genesis Hackathon**, Blink is designed to be listed on the OKX Agent Marketplace as an autonomous service provider.

### 3 Expert Modes

| Mode | What It Does |
|------|-------------|
| **Podcast Insight** | Feed it a podcast URL. Blink extracts a specific insight and drafts a cold email referencing it. |
| **VC Pitch** | Describe your startup + target VC. Blink analyzes their investment thesis and writes a tailored pitch email. |
| **CEO Roast** | Paste your draft email. A ruthless Fortune 500 CEO persona roasts it, then rewrites it to perfection. |

### Key Features

- **Agentic Deep Scraping** — Paste a single URL. Blink's backend autonomously fetches the homepage, parses the HTML, and strategically navigates to "About Us" or "Team" pages to build a massive context profile.
- **OKX AI Marketplace Ready** — The API exposes structured Swagger Open-API docs and marketplace metadata (capabilities, pricing).
- **1-Click Send** — Every response includes a pre-filled `mailto:` link. Click once and your email client opens, ready to send securely.

---

##  Architecture

```text
┌─────────────────┐     ┌─────────────────────┐
│   Next.js UI    │────▶│   Express Backend    │
│  (Port 3000)    │     │    (Port 4005)       │
└─────────────────┘     └──────┬──────────────┘
                               │
       ┌───────────────────────┼──────────────────────┐
       ▼                       ▼                      ▼
Agentic Scraper             OpenAI               Swagger Docs
(Cheerio Crawler)          (GPT-4o)          (OKX AI Integration)
```

**Tech Stack:**
- **Frontend:** Next.js 16 + TypeScript + Tailwind CSS
- **Backend:** Express.js + TypeScript + Swagger UI
- **AI Engine:** OpenAI GPT-4o
- **Deployment:** Vercel (Monorepo architecture with custom Dockerfile)

---

##  API Documentation (Swagger)

To support integration with the **OKX AI Agent Economy**, Blink includes a fully documented OpenAPI schema.

When the backend is running, visit:
 `http://localhost:4005/docs`

This interactive Swagger UI allows other agents and networks to understand how to format the JSON payload for the `POST /chat` endpoint to hire Blink.

---

##  Getting Started

### Prerequisites
- Node.js 18+
- [pnpm](https://pnpm.io/installation) package manager
- An [OpenAI API key](https://platform.openai.com/api-keys)

### 1. Clone the repo
```bash
git clone https://github.com/YOUR_USERNAME/blink.git
cd blink
```

### 2. Start the Backend API
```bash
cd apps/api
pnpm install
cp .env.example .env
# Add your OPENAI_API_KEY and PORT=4005 to .env
npm run dev
```
*API runs at `http://localhost:4005` (Docs at `/docs`)*

### 3. Start the Frontend Dashboard
Open a new terminal window:
```bash
cd apps/web
pnpm install
npm run dev
```
*Frontend runs at `http://localhost:3000`*
