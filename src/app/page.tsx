'use client';

import { useState, useRef, useEffect } from 'react';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Stadium OS Online. I am monitoring live feeds across all 3 venues. How can I assist with crowd dispersion today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const newMessages = [...messages, { role: 'user', content: input } as Message];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessages([...newMessages, { role: 'assistant', content: data.response }]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#131314] text-[#e5e2e3] select-none overflow-hidden min-h-screen font-sans">
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      
      {/* Top App Bar */}
      <header className="fixed top-0 w-full z-50 bg-[#131314]/80 backdrop-blur-xl border-b border-white/10 flex justify-between items-center px-6 py-4">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-[#adc6ff]" style={{ fontVariationSettings: "'FILL' 1" }}>stadium</span>
          <h1 className="text-xl font-bold tracking-tight text-[#adc6ff]">STADIUM OS</h1>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="h-screen pt-20 pb-24 overflow-y-auto no-scrollbar px-4 space-y-6 flex flex-col max-w-4xl mx-auto">
        
        {/* Bento Grid Widgets */}
        <section className="grid grid-cols-2 gap-4 flex-none">
          {/* Widget 1: Capacity */}
          <div className="col-span-2 glass-panel rounded-xl p-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-20">
              <span className="material-symbols-outlined text-[#4edea3] scale-150">groups</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs text-gray-400 uppercase tracking-widest mb-1 font-semibold">Live Capacity</h3>
                <p className="text-4xl font-bold text-white">84<span className="text-[#4edea3] text-lg">%</span></p>
                <p className="text-xs text-gray-400 mt-1 font-semibold">68,000 / 81,000 Fans</p>
              </div>
              <div className="relative w-20 h-20">
                <svg className="w-full h-full transform -rotate-90">
                  <circle className="text-white/5" cx="40" cy="40" fill="transparent" r="34" stroke="currentColor" strokeWidth="6"></circle>
                  <circle className="text-[#4edea3] drop-shadow-[0_0_8px_rgba(78,222,163,0.6)]" cx="40" cy="40" fill="transparent" r="34" stroke="currentColor" strokeDasharray="213.6" strokeDashoffset="34.2" strokeWidth="6"></circle>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#4edea3] text-[18px]">trending_up</span>
                </div>
              </div>
            </div>
          </div>

          {/* Widget 2: Gate Wait Times */}
          <div className="col-span-1 glass-panel rounded-xl p-5">
            <h3 className="text-xs text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2 font-semibold">
              <span className="material-symbols-outlined text-[16px]">door_front</span> Gates
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-white">Gate A</span>
                <span className="px-2 py-0.5 rounded-full bg-[#4edea3]/10 text-[#4edea3] text-[10px] font-bold">5m</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-white">Gate B</span>
                <span className="px-2 py-0.5 rounded-full bg-[#ffb95f]/10 text-[#ffb95f] text-[10px] font-bold">22m</span>
              </div>
            </div>
          </div>

          {/* Widget 3: Active Incidents */}
          <div className="col-span-1 glass-panel rounded-xl p-5 border-[#ffb4ab]/20 bg-[#ffb4ab]/5">
            <h3 className="text-xs text-[#ffb4ab] uppercase tracking-widest mb-4 flex items-center gap-2 font-semibold">
              <span className="material-symbols-outlined text-[16px]">warning</span> Alerts
            </h3>
            <div className="space-y-1">
              <p className="font-bold text-white text-sm">2 Minor Alerts</p>
              <p className="text-gray-400 text-[11px] leading-tight">North Stand Section 12-B: Restroom congestion.</p>
            </div>
            <div className="mt-3 h-1 w-full bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-[#ffb4ab] w-1/3 shadow-[0_0_10px_rgba(255,180,171,0.5)]"></div>
            </div>
          </div>
        </section>

        {/* GenAI Chat Interface */}
        <section className="flex-1 flex flex-col min-h-[500px] glass-panel rounded-3xl p-4 relative mb-24">
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#adc6ff]/20 flex items-center justify-center relative">
                <span className="material-symbols-outlined text-[#adc6ff]" style={{ fontVariationSettings: "'FILL' 1" }}>smart_toy</span>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#4edea3] rounded-full border-2 border-[#131314]"></div>
              </div>
              <div>
                <h4 className="text-md font-bold text-white">GenAI Strategist</h4>
                <p className="text-[10px] text-[#4edea3] flex items-center gap-1 uppercase font-bold tracking-tighter">
                  <span className="w-1.5 h-1.5 bg-[#4edea3] rounded-full animate-pulse"></span> Analyzing Live Stream
                </p>
              </div>
            </div>
          </div>

          {/* Chat History */}
          <div className="flex-1 space-y-4 overflow-y-auto no-scrollbar pb-16">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} message-slide-in`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm ${
                  msg.role === 'user' 
                    ? 'rounded-tr-none bg-[#adc6ff]/10 border border-[#adc6ff]/20 text-white' 
                    : 'rounded-tl-none bg-white/5 border border-white/10 text-gray-200 relative group'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start opacity-100 transition-opacity duration-300">
                <div className="bg-white/5 border border-white/10 px-4 py-3 rounded-2xl rounded-tl-none flex gap-1">
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <div className="absolute bottom-4 left-4 right-4">
            <form onSubmit={handleSubmit} className="relative flex items-center gap-2 glass-panel p-2 rounded-2xl border-white/20 focus-within:border-[#adc6ff]/50 focus-within:shadow-[0_0_20px_rgba(173,198,255,0.15)] transition-all">
              <button type="button" className="p-2 text-[#adc6ff]">
                <span className="material-symbols-outlined">auto_awesome</span>
              </button>
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="bg-transparent border-none focus:ring-0 text-white placeholder-gray-500 text-sm flex-1 outline-none" 
                placeholder="Ask AI to optimize gates..." 
              />
              <button 
                type="submit"
                disabled={isLoading || !input.trim()}
                className="w-10 h-10 rounded-xl bg-[#adc6ff] text-[#002e6a] flex items-center justify-center active:scale-90 transition-transform shadow-[0_4px_12px_rgba(173,198,255,0.3)] disabled:opacity-50"
              >
                <span className="material-symbols-outlined">send</span>
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
