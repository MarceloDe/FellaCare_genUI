import { Button } from './ui/button';

interface SuggestedPromptsProps {
  prompts: string[];
  onPromptClick: (prompt: string) => void;
}

export function SuggestedPrompts({ prompts, onPromptClick }: SuggestedPromptsProps) {
  if (!prompts || prompts.length === 0) return null;

  return (
    <div className="mb-4 animate-in fade-in-50">
      <p className="text-sm text-muted-foreground mb-2">Let's start with:</p>
      <div className="flex flex-wrap gap-2">
        {prompts.map((prompt, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            onClick={() => onPromptClick(prompt)}
            className="bg-background/50 hover:bg-accent hover:text-accent-foreground transition-all"
          >
            {prompt}
          </Button>
        ))}
      </div>
    </div>
  );
}
