
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

const Chatbot: React.FC = () => {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [tempApiKey, setTempApiKey] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const savedApiKey = localStorage.getItem('gemini_api_key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);
  
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ role: 'model', text: 'Hello! How can I help you with ModuleTracker today?' }]);
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSaveApiKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempApiKey) {
      localStorage.setItem('gemini_api_key', tempApiKey);
      setApiKey(tempApiKey);
      setTempApiKey('');
      toast({ title: 'API Key Saved', description: 'You can now start chatting.' });
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || !apiKey) return;

    const userMessage: Message = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
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
        description: 'Failed to get a response. Please check your API key and try again.',
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
        <Button className="fixed bottom-6 right-6 rounded-full w-16 h-16 shadow-lg z-50" title="Open Chatbot">
          <Bot className="w-8 h-8" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-lg flex flex-col h-[70vh]">
        <DialogHeader>
          <DialogTitle>ModuleTracker Assistant</DialogTitle>
          <DialogDescription>
            This chatbot can answer questions about the platform's features and rules.
          </DialogDescription>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto p-4 space-y-4 border-t border-b">
          {apiKey ? (
            messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`rounded-lg px-4 py-2 max-w-[80%] break-words ${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}>
                  {msg.text}
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 rounded-lg bg-gray-50 border">
                <h4 className="font-semibold mb-2">Enter API Key</h4>
                <p className="text-sm text-muted-foreground mb-4">
                    To use the chatbot, please provide your Google Gemini API key. Storing API keys in the browser is not secure. For production apps, it's best to handle API keys on a backend server.
                </p>
                <form onSubmit={handleSaveApiKey} className="flex gap-2">
                    <Input
                        type="password"
                        placeholder="Your Gemini API Key"
                        value={tempApiKey}
                        onChange={(e) => setTempApiKey(e.target.value)}
                    />
                    <Button type="submit">Save</Button>
                </form>
            </div>
          )}
          {isLoading && (
            <div className="flex justify-start">
                <div className="rounded-lg px-4 py-2 bg-gray-200 text-gray-800 flex items-center">
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
              disabled={!apiKey || isLoading}
            />
            <Button type="submit" disabled={!apiKey || isLoading || !input.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Chatbot;
