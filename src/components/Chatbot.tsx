
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
import { GoogleGenerativeAI } from '@google/generative-ai';
import { systemPrompt } from '@/lib/chatbot-prompt';

interface Message {
  role: 'user' | 'model';
  text: string;
}

const API_KEY = 'AIzaSyA1_Lp__OWcDHM72DcThodY8Ao_lw-SOas';

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
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ 
        model: 'gemini-1.5-pro',
        generationConfig: {
          temperature: 0.7,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
      });
      
      const chat = model.startChat({
        history: messages.slice(0, -1).map(msg => ({
          role: msg.role,
          parts: [{ text: msg.text }],
        })),
        generationConfig: {
          temperature: 0.7,
        },
      });

      const result = await chat.sendMessage([
        { text: `${systemPrompt}\n\nUser question: ${input}` }
      ]);
      const response = await result.response;
      const text = response.text();

      setMessages(prev => [...prev, { role: 'model', text }]);
    } catch (error) {
      console.error('Chatbot error:', error);
      toast({
        title: 'Error',
        description: 'Failed to get a response. Please try again.',
        variant: 'destructive'
      });
      setMessages(prev => prev.slice(0, prev.length - 1));
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
