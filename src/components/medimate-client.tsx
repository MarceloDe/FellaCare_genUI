"use client";

import { useState, useRef, useEffect, useTransition } from 'react';
import type { RenderDynamicUIOutput } from '@/ai/flows/render-dynamic-ui';
import { handleUserPrompt } from '@/app/actions';
import { Header } from '@/components/header';
import { ChatInput } from '@/components/chat-input';
import { SuggestedPrompts } from '@/components/suggested-prompts';
import { GenerativeUIRenderer } from '@/components/generative-ui-renderer';
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from 'lucide-react';

export function MediMateClient({ initialSuggestions }: { initialSuggestions: string[] }) {
  const [uiElements, setUiElements] = useState<RenderDynamicUIOutput['uiElements']>([]);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const bottomOfPanelRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (prompt: string) => {
    if(!prompt) return;
    startTransition(async () => {
      try {
        const result = await handleUserPrompt({ prompt });
        if (result.uiElements) {
          setUiElements(prev => [...prev, ...result.uiElements]);
        }
      } catch (error) {
        console.error("Error processing prompt:", error);
        toast({
          variant: "destructive",
          title: "An error occurred",
          description: "Failed to get a response from the AI. Please try again.",
        });
      }
    });
  };

  useEffect(() => {
    if (bottomOfPanelRef.current) {
      bottomOfPanelRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [uiElements]);

  return (
    <div className="flex flex-col h-screen bg-background">
      <Header />
      <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {uiElements.length === 0 && !isPending && (
            <div className="text-center py-16 animate-in fade-in-50">
              <h1 className="text-3xl font-bold text-foreground">Welcome to MediMate</h1>
              <p className="text-muted-foreground mt-2">How can I help you with your health insurance today?</p>
            </div>
          )}
          <GenerativeUIRenderer elements={uiElements} onElementClick={handleSubmit} />
          {isPending && (
             <div className="flex justify-center items-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
             </div>
          )}
          <div ref={bottomOfPanelRef} />
        </div>
      </main>
      <div className="sticky bottom-0 bg-background/80 backdrop-blur-sm border-t border-border">
          <div className="max-w-4xl mx-auto p-4">
              {uiElements.length === 0 && !isPending && (
                  <SuggestedPrompts
                      prompts={initialSuggestions}
                      onPromptClick={handleSubmit}
                  />
              )}
              <ChatInput onSubmit={handleSubmit} isPending={isPending} />
          </div>
      </div>
    </div>
  );
}
