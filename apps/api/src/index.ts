import express, { type Request, type Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import axios from 'axios';
import * as cheerio from 'cheerio';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';

dotenv.config();

const app = express();
const port = process.env.PORT || 4005;

app.use(cors());
app.use(express.json());

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Blink Outreach Copilot API',
      version: '1.0.0',
      description: 'API for generating highly targeted, personalized outreach emails using AI agents.',
    },
    servers: [
      {
        url: `http://localhost:${port}`,
        description: 'Development server'
      }
    ]
  },
  apis: ['./src/index.ts'], // or whatever path to your routes
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * @swagger
 * /:
 *   get:
 *     summary: Returns basic API information
 *     description: Root endpoint that returns the name, version, and endpoints of the API.
 *     responses:
 *       200:
 *         description: A JSON object containing basic API info
 */
app.get('/', (req: Request, res: Response) => {
  res.json({
    name: 'Blink Outreach Copilot',
    version: '1.0.0',
    description: 'Autonomous AI Agent that deep-scrapes target websites to generate highly personalized outreach emails and VC pitches.',
    pricing: {
      currency: 'USDT',
      amount: 0.25,
      type: 'per_task'
    },
    capabilities: [
      'deep_web_scraping',
      'personalized_email_drafting',
      'persona_switching'
    ],
    endpoints: {
      health: '/health',
      chat: 'POST /chat',
      docs: '/docs'
    }
  });
});

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check endpoint
 *     description: Returns the health status of the API.
 *     responses:
 *       200:
 *         description: A JSON object indicating the API is healthy
 */
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', agent: 'Blink Outreach Copilot' });
});

/**
 * @swagger
 * /chat:
 *   post:
 *     summary: Generate a cold outreach email
 *     description: Uses an AI agent (Strategist, Designer, Writer, or Roaster) to generate a personalized outreach email based on a message and URL.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - message
 *             properties:
 *               message:
 *                 type: string
 *                 description: The context for the outreach (can include a target URL).
 *               mode:
 *                 type: string
 *                 enum: [default, podcast, vc, roast]
 *                 description: The specific persona/mode to use for generation.
 *               targetEmail:
 *                 type: string
 *                 description: The recipient email to pre-fill in the 1-click actionUrl.
 *     responses:
 *       200:
 *         description: A JSON object containing the generated reply and the mailto actionUrl
 *       400:
 *         description: Bad request if the message is missing
 *       500:
 *         description: Internal server error
 */
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
        
        let contextText = `--- EXTRACTED CONTEXT FROM MAIN URL (${urls[0]}) ---\n${pageText}\n`;
        
        // Agentic Deep Scraping: Find about/team links to follow
        const aboutLinks: string[] = [];
        $('a').each((i, el) => {
          const href = $(el).attr('href');
          const text = $(el).text().toLowerCase();
          if (href && (text.includes('about') || text.includes('team') || href.includes('/about') || href.includes('/team'))) {
            if (href.startsWith('http')) {
              aboutLinks.push(href);
            } else if (href.startsWith('/')) {
              try {
                const urlObj = new URL(urls[0]);
                aboutLinks.push(`${urlObj.origin}${href}`);
              } catch (e) {}
            }
          }
        });

        // Deduplicate and limit to 2 pages max
        const uniqueLinks = [...new Set(aboutLinks)].slice(0, 2);
        
        for (const link of uniqueLinks) {
          try {
            console.log(`Agentic Deep Scraping: Following link to ${link}`);
            const subRes = await axios.get(link, {
              headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'Accept': 'text/html'
              }
            });
            const sub$ = cheerio.load(subRes.data);
            sub$('script, style').remove();
            const subText = sub$('body').text().replace(/\s+/g, ' ').trim().substring(0, 3000);
            contextText += `\n--- EXTRACTED CONTEXT FROM SUB-PAGE (${link}) ---\n${subText}\n`;
          } catch (e) {
            console.log(`Skipping sub-page ${link}: failed to load`);
          }
        }
        
        finalMessage += `\n\n${contextText}\n-------------------\n\n`;
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
    
    const plainBody = reply.replace(/^Subject:.*?\n\n?/i, '').trim();

    // Generate the "1-Click Send" mailto link
    const encodedSubject = encodeURIComponent(extractedSubject);
    const encodedBody = encodeURIComponent(plainBody);
    const actionUrl = targetEmail ? `mailto:${targetEmail}?subject=${encodedSubject}&body=${encodedBody}` : null;

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

app.listen(port as number, '0.0.0.0', () => {
  console.log(`Blink agent is running on port ${port} (0.0.0.0)`);
});
