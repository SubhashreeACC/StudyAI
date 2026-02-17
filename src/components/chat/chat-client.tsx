'use client';

import { useState, useRef, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Loader2, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ChatMessage } from '@/lib/definitions';
import { chatWithStudyAssistant } from '@/ai/flows/chat-with-study-assistant';

export default function ChatClient() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      parts: [{ text: "Hello! I'm your AI Study Assistant. How can I help you learn today?" }],
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
        if(viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  }, [messages]);

  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', parts: [{ text: input }] };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
        const chatHistory = messages.map(msg => ({
            role: msg.role,
            parts: msg.parts,
        }));

      const result = await chatWithStudyAssistant({
        userId: 'demo-user',
        message: input,
        history: chatHistory,
      });

      const modelMessage: ChatMessage = { role: 'model', parts: [{ text: result.response }] };
      setMessages(prev => [...prev, modelMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: ChatMessage = {
        role: 'model',
        parts: [{ text: 'Sorry, I encountered an error. Please try again.' }],
      };
      setMessages(prev => [...prev, errorMessage]);
    }

    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-6">
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn('flex items-start gap-3', message.role === 'user' ? 'justify-end' : '')}
            >
              {message.role === 'model' && (
                <Avatar className="w-8 h-8">
                    <div className="w-full h-full flex items-center justify-center bg-primary rounded-full text-primary-foreground">
                        <Sparkles className="w-5 h-5" />
                    </div>
                </Avatar>
              )}
              <div
                className={cn(
                  'max-w-[75%] rounded-lg px-4 py-2',
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                )}
              >
                <p className="text-sm whitespace-pre-wrap">{message.parts[0].text}</p>
              </div>
              {message.role === 'user' && (
                 <Avatar className="w-8 h-8">
                    <AvatarImage src="https://picsum.photos/seed/user-avatar/32/32" />
                    <AvatarFallback>U</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          {isLoading && (
             <div className="flex items-start gap-3">
                <Avatar className="w-8 h-8">
                     <div className="w-full h-full flex items-center justify-center bg-primary rounded-full text-primary-foreground">
                        <Sparkles className="w-5 h-5" />
                    </div>
                </Avatar>
                <div className="bg-muted px-4 py-3 rounded-lg flex items-center">
                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                </div>
             </div>
          )}
        </div>
      </ScrollArea>
      <div className="border-t p-4">
        <div className="relative">
          <Input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="pr-12"
            disabled={isLoading}
          />
          <Button
            type="submit"
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
            onClick={handleSend}
            disabled={isLoading}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
