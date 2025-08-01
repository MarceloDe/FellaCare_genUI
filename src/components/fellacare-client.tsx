
"use client";

import { useState, useRef, useEffect, useTransition } from 'react';
import type { RenderDynamicUIOutput } from '@/ai/flows/render-dynamic-ui';
import { handleUserPrompt, fetchSuggestedActions } from '@/app/actions';
import { Header } from '@/components/header';
import { ChatInput } from '@/components/chat-input';
import { SuggestedPrompts } from '@/components/suggested-prompts';
import { GenerativeUIRenderer } from '@/components/generative-ui-renderer';
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from 'lucide-react';
import { BottomNavigator } from './bottom-navigator';
import { SocialFeed } from './social-feed';

export function FellaCareClient() {
  const [uiElements, setUiElements] = useState<RenderDynamicUIOutput['uiElements']>([]);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const [initialSuggestions, setInitialSuggestions] = useState<string[]>([]);
  
  const [activeTab, setActiveTab] = useState('Home');
  const mainContentRef = useRef<HTMLElement>(null);
  const bottomOfChatRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    async function getSuggestions() {
      if (initialSuggestions.length === 0) {
        try {
          const { actions } = await fetchSuggestedActions({ previousInteractions: [] });
          setInitialSuggestions(actions);
        } catch (error) {
          console.error("Failed to fetch initial suggestions", error);
        }
      }
    }
    getSuggestions();
  }, [initialSuggestions]);
  
  useEffect(() => {
    if (bottomOfChatRef.current) {
        bottomOfChatRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [uiElements]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

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

  const renderContent = () => {
    switch (activeTab) {
      case 'Home':
        return (
          <div className="max-w-4xl mx-auto space-y-8 px-4 md:px-6 lg:px-8 pt-8 pb-32">
              {isPending && uiElements.length === 0 && (
                 <div className="flex justify-center items-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                 </div>
              )}
              <GenerativeUIRenderer elements={uiElements} onElementClick={handleSubmit} />
              {uiElements.length === 0 && !isPending && (
                <div className="text-center py-16 animate-in fade-in-50 h-[calc(100vh-350px)] flex flex-col justify-center items-center">
                  <h1 className="text-3xl font-bold text-foreground">Welcome to MediMate</h1>
                  <p className="text-muted-foreground mt-2">How can I help you with your health insurance today?</p>
                </div>
              )}
              <div ref={bottomOfChatRef} />
          </div>
        );
      case 'Social':
        return <div className="p-4 md:p-6 lg:p-8"><SocialFeed /></div>;
      case 'Dashboard':
        return <div className="text-center py-16"><h2 className="text-2xl font-bold">Dashboard</h2><p className="text-muted-foreground">Coming soon!</p></div>;
      case 'Profile':
        return <div className="text-center py-16"><h2 className="text-2xl font-bold">Profile</h2><p className="text-muted-foreground">Coming soon!</p></div>;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <Header />
      <main ref={mainContentRef} className="flex-1 overflow-y-auto">
        {renderContent()}
      </main>
      
      {activeTab === 'Home' && (
        <div className="sticky bottom-[68px] bg-background/80 backdrop-blur-sm border-t border-border">
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
      )}

      <BottomNavigator activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
}
