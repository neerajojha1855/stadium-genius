import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import stadiumData from '@/data/stadium_data.json';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages } = body;

    if (!messages || messages.length === 0) {
      return NextResponse.json({ error: 'Messages are required' }, { status: 400 });
    }

    const systemInstruction = `
You are StadiumGenius, the official GenAI Smart Assistant for the FIFA 2026 World Cup. 
Your goal is to assist fans with navigation, accessibility, crowd management, and general inquiries.
Always be polite, concise, and helpful. You are multilingual; if a user speaks to you in a language, reply in that language.

Here is the REAL-TIME operational data for the stadium right now:
${JSON.stringify(stadiumData, null, 2)}

Use this data to give accurate answers. If someone asks for the fastest way in, suggest the gate with the lowest wait time. 
If someone asks about accessibility, use the accessibility data.
`;

    // The chat history format for Gemini API
    const history = messages.slice(0, -1).map((msg: any) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    }));
    
    const lastUserMessage = messages[messages.length - 1].content;

    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction,
        temperature: 0.7,
      },
      history,
    });

    const response = await chat.sendMessage({ message: lastUserMessage });

    return NextResponse.json({ response: response.text });
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    return NextResponse.json({ error: 'Failed to generate response' }, { status: 500 });
  }
}
