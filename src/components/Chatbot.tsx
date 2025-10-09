
import React, { useState, useEffect, useRef } from 'react';
import { Bot, Send, Loader2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useToast } from "@/components/ui/use-toast";
const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

interface Message {
  role: 'user' | 'model';
  text: string;
}



const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ 
        role: 'model', 
        text: 'Hello! I\'m the ModuleTracker Assistant. I can help you with questions about the platform, its features, or just have a friendly chat. What would you like to know?' 
      }]);
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Helper to progressively update the assistant message
    let assistantSoFar = '';
    const upsertAssistant = (delta: string) => {
      assistantSoFar += delta;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === 'model') {
          return prev.map((m, i) => (i === prev.length - 1 ? { ...m, text: assistantSoFar } : m));
        }
        return [...prev, { role: 'model', text: assistantSoFar }];
      });
    };

    try {
      // Map local messages to backend format
      const history = [...messages, userMessage].map((m) => ({
        role: m.role === 'model' ? 'assistant' : 'user',
        content: m.text,
      }));

      const resp = await fetch(CHAT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: history }),
      });

      if (!resp.ok || !resp.body) {
        let description = 'Failed to start AI response.';
        try {
          const errJson = await resp.json();
          if (errJson?.error) description = errJson.error;
        } catch {}
        toast({
          title: 'Assistant unavailable',
          description,
          variant: 'destructive',
        });
        setIsLoading(false);
        return;
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = '';
      let streamDone = false;

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf('\n')) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith('\r')) line = line.slice(0, -1);
          if (line.startsWith(':') || line.trim() === '') continue;
          if (!line.startsWith('data: ')) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === '[DONE]') {
            streamDone = true;
            break;
          }

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) upsertAssistant(content);
          } catch {
            // Incomplete JSON split across chunks: put it back and wait for more data
            textBuffer = line + '\n' + textBuffer;
            break;
          }
        }
      }

      // Final flush
      if (textBuffer.trim()) {
        for (let raw of textBuffer.split('\n')) {
          if (!raw) continue;
          if (raw.endsWith('\r')) raw = raw.slice(0, -1);
          if (raw.startsWith(':') || raw.trim() === '') continue;
          if (!raw.startsWith('data: ')) continue;
          const jsonStr = raw.slice(6).trim();
          if (jsonStr === '[DONE]') continue;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) upsertAssistant(content);
          } catch {}
        }
      }
    } catch (error) {
      console.error('Chatbot stream error:', error);
      toast({
        title: 'Error',
        description: 'Failed to get a response. Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8 rounded-2xl w-16 h-16 md:w-18 md:h-18 shadow-2xl z-50 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 hover:from-blue-600 hover:via-blue-700 hover:to-indigo-700 border-0 hover:scale-105 transition-all duration-300" 
          title="Open ModuleTracker Assistant"
        >
          <div className="relative">
            <Bot className="w-7 h-7 md:w-8 md:h-8" />
            <Sparkles className="w-3 h-3 absolute -top-1 -right-1 animate-pulse" />
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[95vw] max-w-[425px] md:max-w-lg flex flex-col h-[85vh] md:h-[75vh] m-4 bg-white/95 backdrop-blur-lg border-0 shadow-2xl">
        <DialogHeader className="border-b border-slate-200/50 pb-4">
          <DialogTitle className="text-xl md:text-2xl flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            ModuleTracker Assistant
          </DialogTitle>
          <DialogDescription className="text-sm text-slate-600">
            Your AI assistant for platform features, rules, and general questions about ModuleTracker.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`rounded-2xl px-4 py-3 md:px-5 md:py-3 max-w-[85%] md:max-w-[80%] break-words text-sm md:text-base shadow-md ${
                msg.role === 'user' 
                  ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white' 
                  : 'bg-gradient-to-br from-slate-50 to-slate-100 text-slate-800 border border-slate-200/50'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="rounded-2xl px-4 py-3 md:px-5 md:py-3 bg-gradient-to-br from-slate-50 to-slate-100 text-slate-800 flex items-center text-sm md:text-base shadow-md border border-slate-200/50">
                <Loader2 className="mr-2 h-4 w-4 animate-spin text-blue-500" />
                Thinking...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        <DialogFooter className="border-t border-slate-200/50 pt-4">
          <form onSubmit={handleSendMessage} className="flex w-full items-center space-x-3">
            <Input
              placeholder="Ask me anything about ModuleTracker..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              className="text-sm md:text-base border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl bg-white/80"
            />
            <Button 
              type="submit" 
              disabled={isLoading || !input.trim()} 
              size="sm" 
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-xl shadow-md"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Chatbot;
