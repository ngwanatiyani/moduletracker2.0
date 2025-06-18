
import React, { useState, useEffect, useRef } from 'react';
import { Bot, Send, Loader2 } from 'lucide-react';
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

// Storing API keys client-side is not secure.
// For production apps, it's recommended to handle API keys on a backend server.
const API_KEY = 'AIzaSyC_f3s5j51VF4s_pfK_0ejhahOCRY1zg50';


const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ role: 'model', text: 'Hello! How can I help you with ModuleTracker today?' }]);
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
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      
      const prompt = `${systemPrompt}\n\nUser question: ${input}`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      setMessages(prev => [...prev, { role: 'model', text }]);
    } catch (error) {
      console.error('Chatbot error:', error);
      toast({
        title: 'Error',
        description: 'Failed to get a response. The API key might be invalid or expired.',
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
          className="fixed bottom-4 right-4 md:bottom-6 md:right-6 rounded-full w-14 h-14 md:w-16 md:h-16 shadow-lg z-50" 
          title="Open Chatbot"
        >
          <Bot className="w-6 h-6 md:w-8 md:h-8" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[95vw] max-w-[425px] md:max-w-lg flex flex-col h-[80vh] md:h-[70vh] m-4">
        <DialogHeader>
          <DialogTitle className="text-lg md:text-xl">ModuleTracker Assistant</DialogTitle>
          <DialogDescription className="text-sm">
            This chatbot can answer questions about the platform's features and rules.
          </DialogDescription>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto p-4 space-y-4 border-t border-b">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`rounded-lg px-3 py-2 md:px-4 md:py-2 max-w-[85%] md:max-w-[80%] break-words text-sm md:text-base ${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
                <div className="rounded-lg px-3 py-2 md:px-4 md:py-2 bg-gray-200 text-gray-800 flex items-center text-sm md:text-base">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Thinking...
                </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <DialogFooter>
          <form onSubmit={handleSendMessage} className="flex w-full items-center space-x-2">
            <Input
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              className="text-sm md:text-base"
            />
            <Button type="submit" disabled={isLoading || !input.trim()} size="sm" className="px-3 py-2">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Chatbot;
