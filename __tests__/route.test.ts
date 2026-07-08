import { POST } from '@/app/api/chat/route';

// Mock the Next.js server runtime objects
jest.mock('next/server', () => {
  return {
    NextRequest: class MockNextRequest {
      url: string;
      init: any;
      constructor(url: string, init: any) {
        this.url = url;
        this.init = init;
      }
      async json() {
        return JSON.parse(this.init.body);
      }
    },
    NextResponse: {
      json: (body: any, init?: any) => ({
        status: init?.status || 200,
        json: async () => body,
      }),
    },
  };
});

jest.mock('@google/genai', () => ({
  GoogleGenAI: jest.fn().mockImplementation(() => ({
    chats: {
      create: jest.fn().mockReturnValue({
        sendMessage: jest.fn().mockResolvedValue({ text: 'Mocked AI Response' }),
      }),
    },
  })),
}));

// Import the mocked NextRequest for typing
import { NextRequest } from 'next/server';

describe('Chat API Route', () => {
  it('should return 400 for invalid payload (no messages array)', async () => {
    const req = new NextRequest('http://localhost:3000/api/chat', {
      method: 'POST',
      body: JSON.stringify({ invalid_data: 'here' }),
    });
    
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it('should return AI response for valid payload', async () => {
    const req = new NextRequest('http://localhost:3000/api/chat', {
      method: 'POST',
      body: JSON.stringify({
        messages: [{ role: 'user', content: 'Hello AI' }],
      }),
    });
    
    const res = await POST(req);
    const data = await res.json();
    expect(res.status).toBe(200);
    expect(data.response).toBe('Mocked AI Response');
  });
});
