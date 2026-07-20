import express, { type Request, type Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import axios from 'axios';
import * as cheerio from 'cheerio';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Root route
app.get('/', (req: Request, res: Response) => {
  res.json({
    name: 'Blink Outreach Copilot',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      chat: 'POST /chat',
    },
    frontend: 'http://localhost:3000',
  });
});

// Basic health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', agent: 'Blink Outreach Copilot' });
});

// The OKX.AI compatible chat endpoint
app.post('/chat', async (req: Request, res: Response): Promise<void> => {
  try {
    const { message, mode, targetEmail } = req.body;

    if (!message) {
      res.status(400).json({ error: 'Message is required' });
      return;
    }

    let systemPrompt = "You are Blink, the ultimate Outreach Copilot. ALWAYS begin your response with `Subject: [Your generated subject line here]` on the very first line.";
    
    // Switch between the 3 core modes
    switch(mode) {
      case "podcast":
        systemPrompt = "You are Blink, a networking expert. The user will provide a podcast transcript excerpt or a link/topic. Your job is to draft a short, highly personalized cold email (under 100 words) referencing a specific insight from that podcast to secure a meeting. Keep it extremely natural, not salesy. ALWAYS begin your response with `Subject: [Your generated subject line here]` on the very first line.";
        break;
      case "vc":
        systemPrompt = "You are Blink, a VC fundraising copilot. The user will provide a startup description and a target VC. Draft an introductory email to the VC that highlights why the startup fits their investment thesis. Keep it punchy, metric-driven, and under 150 words. ALWAYS begin your response with `Subject: [Your generated subject line here]` on the very first line.";
        break;
      case "roast":
        systemPrompt = "You are Blink, acting as a ruthless, time-starved Fortune 500 CEO. The user will paste a draft of a cold email. First, brutally (but humorously) 'roast' the draft for why it would get deleted immediately. Then, provide a hyper-optimized, 3-sentence rewrite that would actually get a reply. Format the roast section clearly so it can be shared on social media. ALWAYS include `Subject: [Your generated subject line here]` above the rewrite.";
        break;
      default:
        systemPrompt = "You are Blink, the ultimate Outreach Copilot. Write a highly converting cold email based on the user's prompt. ALWAYS begin your response with `Subject: [Your generated subject line here]` on the very first line.";
    }

    let finalMessage = message;
    
    // Extract URL if present
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const urls = message.match(urlRegex);
    
    if (urls && urls.length > 0) {
      try {
        console.log(`Scraping URL: ${urls[0]}`);
        const response = await axios.get(urls[0], {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'Upgrade-Insecure-Requests': '1',
            'Sec-Fetch-Dest': 'document',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-Site': 'none',
            'Sec-Fetch-User': '?1'
          }
        });
        const $ = cheerio.load(response.data);
        // Remove scripts and styles
        $('script, style').remove();
        const pageText = $('body').text().replace(/\s+/g, ' ').trim().substring(0, 5000); // Take first 5000 chars to avoid token limits
        finalMessage += `\n\n--- EXTRACTED CONTEXT FROM URL (${urls[0]}) ---\n${pageText}\n-------------------\n\n`;
      } catch (e: any) {
        console.error(`Failed to scrape URL: ${urls[0]}`, e.message);
        finalMessage += `\n\n[SYSTEM NOTE: The backend scraper was blocked by the website ${urls[0]} (Error: ${e.message}). Politely inform the user that the website is blocking automated access, and ask them to copy and paste the relevant text directly.]\n\n`;
      }
    }

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: finalMessage }
      ],
      temperature: 0.7,
    });

    let reply = completion.choices[0]?.message?.content || "";
    let extractedSubject = "Following up";

    // Attempt to extract the Subject: line
    const subjectMatch = reply.match(/Subject:\s*(.*)/i);
    if (subjectMatch && subjectMatch[1]) {
      extractedSubject = subjectMatch[1].replace(/[`*]/g, '').trim(); // Remove asterisks or backticks if generated
    }

    // Generate the "1-Click Send" mailto link
    const encodedSubject = encodeURIComponent(extractedSubject);
    const body = encodeURIComponent(reply);
    const actionUrl = targetEmail ? `mailto:${targetEmail}?subject=${encodedSubject}&body=${body}` : null;

    res.json({
      reply,
      actionUrl,
      mode: mode || 'default'
    });
  } catch (error: any) {
    console.error('Error handling chat request:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

app.listen(port, () => {
  console.log(`Blink agent is running on http://localhost:${port}`);
});
