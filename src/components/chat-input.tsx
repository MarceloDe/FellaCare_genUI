"use client";

import { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Image as ImageIcon, Mic, Send } from 'lucide-react';

interface ChatInputProps {
  onSubmit: (prompt: string) => void;
  isPending: boolean;
}

export function ChatInput({ onSubmit, isPending }: ChatInputProps) {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isPending) return;
    onSubmit(prompt);
    setPrompt('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <Button variant="ghost" size="icon" type="button" aria-label="Upload Image" className="flex-shrink-0 text-muted-foreground hover:text-primary">
        <ImageIcon className="h-5 w-5" />
      </Button>
      <div className="relative w-full">
        <Input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask FellaCare anything..."
          className="pr-24"
          disabled={isPending}
          autoFocus
        />
        <div className="absolute inset-y-0 right-0 flex items-center">
            <Button variant="ghost" size="icon" type="button" aria-label="Use microphone" className="h-full rounded-none text-muted-foreground hover:text-primary">
              <Mic className="h-5 w-5" />
            </Button>
            <Button type="submit" size="icon" aria-label="Send message" disabled={isPending || !prompt.trim()} className="h-full rounded-l-none">
                <Send className="h-5 w-5" />
            </Button>
        </div>
      </div>
    </form>
  );
}
