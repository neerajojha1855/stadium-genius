# 🏆 StadiumGenius: FIFA 2026 GenAI Smart Assistant

StadiumGenius is a Generative AI-enabled web application designed to enhance stadium operations and the overall tournament experience for fans during the FIFA World Cup 2026. 

By leveraging the Google Gemini API, this multilingual smart assistant helps users navigate massive crowds, find accessible routes, and check real-time wait times for gates, restrooms, and concessions across multiple host stadiums.

## ✨ Features
- **Multilingual Support**: Chat with the assistant in any language (English, Spanish, French, etc.) to get context-aware answers.
- **Operational Intelligence**: Integrates real-time mocked data for three major stadiums:
  - MetLife Stadium (New York/New Jersey)
  - Estadio Azteca (Mexico City)
  - AT&T Stadium (Dallas)
- **Crowd Management & Accessibility**: The AI intelligently routes fans away from congested areas and specifically highlights wheelchair-accessible routes and sensory rooms.
- **Premium UI**: Built with a sleek, glassmorphism-inspired dark mode interface that feels modern and responsive.

## 🛠️ Tech Stack
- **Frontend Framework**: [Next.js (App Router)](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **AI Integration**: [Google Gen AI SDK](https://www.npmjs.com/package/@google/genai) (`gemini-2.5-flash`)
- **Data Context**: JSON-based mock operational feed.

## 🚀 Getting Started

### 1. Configure Environment Variables
You must provide a valid Gemini API Key to run the assistant.
Create a `.env.local` file in the root directory (if it doesn't already exist) and add your key:
```env
GEMINI_API_KEY=your_actual_api_key_here
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. 

## 🧪 Example Questions to Ask
- *"I'm at MetLife, which gate is the fastest to enter?"*
- *"Where is the nearest wheelchair-accessible entrance at Estadio Azteca?"*
- *"I'm starving at AT&T Stadium, what food has the shortest line?"*
- *"¿Cuál es la puerta con menos gente?"* (Spanish)

## 🏆 Hackathon / Evaluation Alignment
- **Code Quality**: Modular architecture leveraging Next.js API routes to securely handle AI generation without exposing the API key to the client.
- **Accessibility**: High-contrast dark theme, semantic HTML, and accessibility-first navigation guidance.
- **Problem Statement**: Addresses the core challenge of improving navigation and crowd management for massive events via GenAI.
