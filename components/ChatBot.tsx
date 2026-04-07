"use client";

import { useState, useRef, useEffect } from 'react';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Xin chào! Mình là Luxe Curator. Hôm nay bạn đang tìm kiếm món đồ gì thế?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const [debugStatus, setDebugStatus] = useState<string>(''); // Dòng trạng thái gỡ lỗi
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSessionId('LC-' + Math.random().toString(36).substr(2, 6).toUpperCase());
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    setDebugStatus('Đang gửi tin nhắn...');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMsg] })
      });

      const data = await res.json();
      
      if (res.ok && data.content) {
        let replyText = data.content;
        const leadRegex = /\|\|LEAD_DATA:\s*(\{[\s\S]*?\})\s*\|\|/;
        const match = replyText.match(leadRegex);
        
        if (match) {
          try {
            const leadData = JSON.parse(match[1]);
            replyText = replyText.replace(leadRegex, '').trim();
            setDebugStatus('Đã bắt được thông tin! Đang lưu về Sheet...');
            
            const params = new URLSearchParams();
            params.append('name', leadData.name || '');
            params.append('phone', leadData.phone || '');
            params.append('email', leadData.email || '');
            params.append('summary', leadData.summary || '');
            params.append('product_examples', leadData.product_examples || '');
            params.append('intent_level', leadData.intent_level || '');
            params.append('sessionId', sessionId);
            params.append('history', [...messages, userMsg, { role: 'assistant', content: replyText }].map(m => m.role + ": " + m.content).join('\n'));

            fetch('https://script.google.com/macros/s/AKfycbWT48SYhMyV0wQEWD8Zoia9tGj_-uPi5CXmYiBOEDBk3GEV7vUFP9ZHOFCA5Hz_aWd/exec', {
              method: 'POST',
              mode: 'no-cors',
              body: params
            }).then(() => {
              setDebugStatus('Đã gửi về Sheet (vui lòng kiểm tra Sheet)');
            }).catch(e => {
              setDebugStatus('Lỗi gửi Sheet! Kiểm tra mạng.');
              console.error(e);
            });

          } catch(e) { 
            setDebugStatus('Lỗi phân tích dữ liệu AI!');
            console.error(e); 
          }
        } else {
          setDebugStatus('AI chưa xuất mã Lead (chưa đủ thông tin)');
        }
        
        setMessages(prev => [...prev, { role: 'assistant', content: replyText }]);
      }
    } catch (error) {
      setDebugStatus('Lỗi kết nối AI!');
      console.error(error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-sans">
      {!isOpen ? (
        <button onClick={() => setIsOpen(true)} className="w-14 h-14 bg-yellow-600 text-zinc-950 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-all animate-bounce">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
        </button>
      ) : (
        <div className="w-[340px] sm:w-[380px] bg-zinc-950 border border-yellow-600/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[520px]">
          <div className="px-4 py-3 bg-zinc-900 border-b border-zinc-800 flex justify-between items-center text-zinc-100">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-yellow-600/20 rounded-full flex items-center justify-center border border-yellow-600/50">
                <span className="text-yellow-600 font-bold text-sm">LC</span>
              </div>
              <div>
                <h3 className="font-semibold text-xs sm:text-sm">Luxe Assistant</h3>
                <p className="text-[10px] text-yellow-600/70">{debugStatus || 'Sẵn sàng'}</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)}><svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4 bg-zinc-950">
            {messages.map((msg, idx) => (
              <div key={idx} className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${msg.role === 'user' ? 'bg-yellow-600 text-zinc-950 self-end font-medium' : 'bg-zinc-800 text-zinc-200 self-start'}`}>
                {msg.content}
              </div>
            ))}
            {isTyping && <div className="text-zinc-500 text-xs italic px-2">Đang trả lời...</div>}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-3 bg-zinc-900 border-t border-zinc-800">
            <div className="flex gap-2 bg-zinc-950 rounded-full p-1 pl-4 border border-zinc-800 focus-within:border-yellow-600/50 transition-all">
              <input type="text" className="flex-1 bg-transparent text-zinc-200 text-sm outline-none py-2" placeholder="Nhập tin nhắn..." value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} />
              <button onClick={handleSend} className="w-8 h-8 rounded-full bg-yellow-600 text-zinc-950 hover:bg-yellow-500 transition-colors flex items-center justify-center">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
