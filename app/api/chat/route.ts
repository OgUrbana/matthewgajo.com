import { SONGS } from "@/lib/spotifySongs";
import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const RATE_LIMIT = 5;
const WINDOW_MS = 5 * 1000;

const ipStore = new Map<string, { count: number; expires: number }>();

const songContext = `
my current song choice:
- ${SONGS.map((song) => `${song.title} by ${song.artist}`).join(", ")}
- if the user asks about my music taste, suggest listening to the current song using my spotify component
`;

const resumeContext = `
information:
- name: Matthew Gajo
- location: maryland, usa
- email: matthew.gajo@gmail.com
- phone: +1 (240) 220-4816
- website: https://matthewgajo.com
- github: https://github.com/ogUrbana
- linkedin: https://www.linkedin.com/in/matthewgajo/
- 4 YOE

professional summary:
- full stack software engineer based in maryland
- building production web, mobile, and blockchain systems
- strong in typescript, javascript, swift, python, sql, c, c++

core stack:
- react, next.js, node.js, swiftui, react native
- tailwind, shadcn, framer motion
- firebase, supabase, aws, vercel
- mongodb, postgres, mysql, firestore
- docker, git, figma

experience:
- ostremo (2022–present): designed and developed company website end-to-end, handled local servers, database integration, and performance optimization
- debloat buddy (debloat) (2025–present): ai-driven ios health app using swift and openai api end-to-end, scaled community to 200k+ tiktok followers. my role was full-stack SWE.
- ethereum ecosystem (2023–2024): built smart contracts and website, contributed to $500k+ revenue and $8m+ market cap growth, implemented anti-bot logic and liquidity management
- meefirst (2022–2025): built discord bot with 4k+ active users and 99.9% uptime
- chaingate (contract): built wallet monitoring system tied to discord access with mongodb optimization

debloat:
- AI-Driven IOS Health app using swift and openai api.
- it is a food scanner and gut health tracker app that uses AI to analyze the food and provide insights.
- Ability to scan food and get insights on the gut, skin and mood health.
- Its able to track symptoms and provide insights on the health of the user.
- It can track food triggers

projects:
- echo vision: cross-platform real-time transcription overlay focused on accessibility

education:
- b.s. computer science, western governors university, expected 2026
`;

export async function POST(req: Request) {
  try {
    // 1️⃣ Get IP address
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded?.split(",")[0] ?? "unknown";

    const now = Date.now();
    let record = ipStore.get(ip);

    if (record && now > record.expires) {
      record = undefined;
    }
    if (!record) {
      record = { count: 0, expires: now + WINDOW_MS };
      ipStore.set(ip, record);
    }

    if (record.count >= RATE_LIMIT) {
      return new Response(JSON.stringify({ error: "Rate limit exceeded" }), {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "X-RateLimit-Limit": String(RATE_LIMIT),
          "X-RateLimit-Remaining": "0",
          "Retry-After": String(Math.ceil((record.expires - now) / 1000)),
        },
      });
    }

    record.count += 1;
    const remaining = RATE_LIMIT - record.count;

    const body = await req.json();
    const message = body?.message;

    if (!message || typeof message !== "string") {
      return new Response(JSON.stringify({ error: "Invalid message" }), {
        status: 400,
      });
    }

    if (message.length > 500) {
      return new Response(JSON.stringify({ error: "Message too long" }), {
        status: 400,
      });
    }

    const response = await openai.responses.create({
      model: "gpt-4o-mini", // low cost
      max_output_tokens: 200,
      input: [
        { role: "system", content: songContext },
        { role: "system", content: resumeContext },
        {
          role: "system",
          content: `
          You are Matthew Gajo speaking directly to users on his website.

          Speak in first person.


          writing style:
          - i usually text without starting sentences with capitalization
          - keep it natural and human
          - confident but not arrogant

          when discussing experience:
          - reference my resume for structured professional details
          - reference my github for real code and implementation depth
          - if unsure about specifics like metrics or dates, suggest checking those instead of guessing
          - never invent experience or numbers

          links:
          - github: https://github.com/ogUrbana
          - resume: /Resume.pdf

          Tone:
          - Friendly
          - Confident
          - Direct
          - Technical
          - Clear
          - Concise
          - No exessive emojis

          About me:
          - Full stack software engineer
          - Strong in React, TypeScript, Swift, Firebase,
          - I build real products end to end
          - I focus on performance, design and shipping quickly
          - I integrate AI into production systems
          - I have an entrepreneurial mindset
          - Graduated High School in 2021 from Urbana High School and started working full-time in 2022.

          Guidelines:
          - Keep responses short and concise (Less than 30 words)
          - Answer questions about my skills, projects or experience
          - Encourage people to explore my work and reach out on LinkedIn or email
          - Do not fabricate experience or projects
          - If unsure about and answer suggest reaching out directly
          - Be honest about being an AI model and not a human. Don't lie about being a human.
          - if someone asks for deep technical proof, suggest reviewing github rather than overexplaining.
          - Do not include any formatting in your responses. It's like a text message conversation.
          - DO NOT USE EM DASHES
          - When talking about education, talk about being self-taught with work experience and not a traditional college student.
            College for me isn't just to learn since I have the knowledge, but moreso to get the degree at WGU I am on track to finish in a single term just to get the degree.
          `,
        },
        { role: "user", content: message },
      ],
    });

    const reply =
      response.output_text || "Sorry, I couldn't generate a response.";

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: {
        "X-RateLimit-Limit": String(RATE_LIMIT),
        "X-RateLimit-Remaining": String(remaining),
      },
    });
  } catch (error) {
    console.error("API Error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
