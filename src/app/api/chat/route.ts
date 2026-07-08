import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { z } from 'zod';
import stadiumData from '@/data/stadium_data.json';

// Security: Validate incoming payload
const MessageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string().min(1).max(1000), // Prevent massive payload injections
});
const PayloadSchema = z.object({
  messages: z.array(MessageSchema).min(1),
});

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Validate request against Zod schema
    const result = PayloadSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: 'Invalid input format' }, { status: 400 });
    }
    
    const { messages } = result.data;

    const systemInstruction = `
You are Stadium OS, a high-level operational GenAI system for the FIFA World Cup 2026.
Your goal is to optimize stadium operations, enhance fan experience, manage crowds, coordinate volunteers, and monitor sustainability metrics.

REAL-TIME OPERATIONAL DATA:
${JSON.stringify(stadiumData, null, 2)}

DIRECTIVES:
1. Provide actionable intelligence to the stadium operators based on the data.
2. If wait times exceed 15 minutes, explicitly recommend redirecting fans and deploying volunteers.
3. Keep responses concise, authoritative, and structured like a mission control read-out.
`;

    const history = messages.slice(0, -1).map((msg) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    }));
    
    const lastUserMessage = messages[messages.length - 1].content;

    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: { systemInstruction, temperature: 0.5 },
      history,
    });

    const response = await chat.sendMessage({ message: lastUserMessage });
    return NextResponse.json({ response: response.text });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
