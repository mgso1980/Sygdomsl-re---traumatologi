import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, Bot, User, Loader2, WifiOff } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

const SmartTutor: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hej! Jeg er din TraumaTutor (Offline Mode). Du kan stille mig spørgsmål om Martins case eller begreber som pneumothorax, koma og rhabdomyolyse, så svarer jeg ud fra pensum uden at bruge internettet.' }
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

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // Filter out error messages from history before sending
      const historyForApi = messages.filter(m => !m.isError);
      const responseText = await sendMessageToGemini(input, historyForApi);
      
      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: 'Der opstod en fejl i systemet.',
        isError: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
      <div className="bg-slate-800 p-4 flex items-center gap-3 shadow-md z-10">
        <div className="bg-slate-600 p-2 rounded-full relative">
            <Bot className="w-6 h-6 text-white" />
            <div className="absolute -bottom-1 -right-1 bg-amber-500 rounded-full p-0.5 border-2 border-slate-800">
                <WifiOff className="w-3 h-3 text-white" />
            </div>
        </div>
        <div>
            <h3 className="text-white font-bold">AI Tutor</h3>
            <p className="text-slate-300 text-xs">Offline Demo Mode (Ingen API)</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 bg-slate-50 space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
              msg.role === 'user' 
                ? 'bg-primary text-white rounded-br-none' 
                : msg.isError 
                    ? 'bg-red-100 text-red-800 border border-red-200 rounded-bl-none'
                    : 'bg-white text-slate-700 shadow-sm border border-slate-200 rounded-bl-none'
            }`}>
              <div className="flex items-start gap-2">
                 {msg.role === 'model' && !msg.isError && <Bot className="w-4 h-4 mt-1 text-slate-400" />}
                 <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
             <div className="bg-white rounded-2xl rounded-bl-none px-4 py-3 shadow-sm border border-slate-200 flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-primary" />
                <span className="text-xs text-slate-500">Søger i lokal database...</span>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSend} className="p-4 bg-white border-t border-slate-200 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Stil et spørgsmål om casen (f.eks. 'Hvad er rhabdomyolyse?')"
          className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
        />
        <button 
          type="submit" 
          disabled={!input.trim() || isLoading}
          className="bg-primary hover:bg-primary/90 disabled:opacity-50 text-white p-2 rounded-lg transition-colors"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

export default SmartTutor;