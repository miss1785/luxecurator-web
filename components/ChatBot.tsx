"use client";

import { useState, useRef, useEffect } from 'react';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Xin chào! Mình là Luxe Curator. Hôm nay bạn đang tìm kiếm món đồ gì thế, từ những món đồ bình dân đến cao cấp mình đều sẵn sàng hỗ trợ bạn nha!' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMsg] })
      });

      const data = await res.json();
      
      if (res.ok && data.content) {
        let replyText = data.content;
        
        // KIỂM TRA BẮT SÓNG LEAD_DATA
        const leadRegex = /\|\|LEAD_DATA:\s*(\{.*?\})\s*\|\|/;
        const match = replyText.match(leadRegex);
        
        if (match) {
          try {
            const leadData = JSON.parse(match[1]);
            replyText = replyText.replace(leadRegex, '').trim();
            
            fetch('https://script.google.com/macros/s/AKfycbz54nf21E3iVve_scPmzeO328Z1dASNQ0R2_-bMHZu-sZER_y9obO-E_g2NIlg32HDd/exec', {
              method: 'POST',
              mode: 'no-cors',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                name: leadData.name,
                phone: leadData.phone,
                email: leadData.email,
                interest: leadData.interest,
                intent_level: leadData.intent_level,
                sessionId: "ID_KH_123",
                history: [...messages, userMsg].map(m => m.role + ": " + m.content).join('\n')
              })
            });
          } catch(e) {
            console.error("Lỗi móc dữ liệu AI: ", e);
          }
        }
        
        setMessages(prev => [...prev, { role: 'assistant', content: replyText }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: data.error || 'Xin lỗi, kết nối đang bị lỗi.' }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Không thể kết nối đến máy chủ. Vui lòng thử lại.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-sans">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-yellow-600 text-zinc-950 rounded-full shadow-[0_0_15px_rgba(202,138,4,0.4)] flex items-center justify-center hover:scale-110 transition-transform duration-300"
          aria-label="Mở Trợ lý ảo"
        >
          {/* Chat Icon */}
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
      )}

      {isOpen && (
        <div className="w-[340px] sm:w-[380px] bg-zinc-950/95 backdrop-blur-xl border border-yellow-600/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[520px] animate-in fade-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="px-4 py-3 bg-zinc-900 border-b border-zinc-800 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-8 h-8 bg-yellow-600/20 rounded-full flex items-center justify-center border border-yellow-600/50">
                  <span className="text-yellow-600 font-playfair font-bold text-sm">LC</span>
                </div>
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-zinc-900"></div>
              </div>
              <div>
                <h3 className="font-playfair font-semibold text-zinc-100 text-sm">Luxe Assistant</h3>
                <p className="text-xs text-yellow-600/80">Online</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-2 text-zinc-400 hover:text-white rounded-full hover:bg-zinc-800 transition-colors"
            >
              {/* Close Icon */}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4 scrollbar-thin scrollbar-thumb-zinc-800">
            {messages.map((msg, idx) => (
              <div key={idx} className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm whitespace-pre-wrap ${
                msg.role === 'user' 
                  ? 'bg-yellow-600 text-zinc-950 rounded-br-sm self-end font-medium' 
                  : 'bg-zinc-800/80 text-zinc-200 rounded-bl-sm self-start leading-relaxed shadow-sm border border-zinc-700/50'
              }`}>
                {msg.content}
              </div>
            ))}
            {isTyping && (
              <div className="max-w-[85%] bg-zinc-800/80 text-zinc-400 rounded-2xl rounded-bl-sm self-start px-4 py-3 text-sm flex gap-1.5 items-center border border-zinc-700/50">
                <span className="w-1.5 h-1.5 bg-yellow-600/60 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-yellow-600/60 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></span>
                <span className="w-1.5 h-1.5 bg-yellow-600/60 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-zinc-900 border-t border-zinc-800">
            <div className="flex gap-2 items-center bg-zinc-950 rounded-full p-1 pl-4 border border-zinc-800 focus-within:border-yellow-600/50 transition-colors">
              <input
                type="text"
                className="flex-1 bg-transparent text-zinc-200 text-sm focus:outline-none placeholder-zinc-500 py-2"
                placeholder="Nhập yêu cầu tư vấn..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <button 
                onClick={handleSend}
                disabled={isTyping || !input.trim()}
                className="w-8 h-8 rounded-full flex items-center justify-center bg-yellow-600 hover:bg-yellow-500 text-zinc-950 disabled:opacity-50 disabled:bg-zinc-800 disabled:text-zinc-600 transition-all shrink-0 mr-1"
              >
                {/* Send Icon */}
                <svg className="w-4 h-4 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
