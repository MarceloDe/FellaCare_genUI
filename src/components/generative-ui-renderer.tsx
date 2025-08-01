import type { RenderDynamicUIOutput } from '@/ai/flows/render-dynamic-ui';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Card, CardContent } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface GenerativeUIRendererProps {
  elements: RenderDynamicUIOutput['uiElements'];
  onElementClick: (prompt: string) => void;
}

export function GenerativeUIRenderer({ elements, onElementClick }: GenerativeUIRendererProps) {
  if (!elements || elements.length === 0) {
    return null;
  }

  // To display the latest messages on top, we'll render a reversed version of the array.
  const reversedElements = [...elements].reverse();

  return (
    <div className="space-y-4">
      {reversedElements.map((element, index) => {
        const style = element.color ? { color: element.color } : {};

        switch (element.type) {
          case 'button':
            return (
              <Button
                key={index}
                onClick={() => element.clickable && onElementClick(element.content)}
                disabled={!element.clickable}
                style={element.color ? { backgroundColor: element.color, color: '#ffffff', borderColor: element.color } : {}}
                className="transition-transform transform hover:scale-105 shadow-md animate-in fade-in-50"
              >
                {element.content}
              </Button>
            );
          case 'textarea':
            return (
              <Textarea
                key={index}
                placeholder={element.content}
                style={element.color ? { borderColor: element.color, '--ring-color': element.color } as React.CSSProperties : {}}
                className="focus-visible:ring-2 focus-visible:ring-[var(--ring-color)] animate-in fade-in-50"
              />
            );
          case 'text':
             return (
                <Card key={index} className="overflow-hidden animate-in fade-in-50" style={element.color ? { borderColor: element.color } : {}}>
                    <CardContent className="p-4">
                        <p style={style} className="text-base">{element.content}</p>
                    </CardContent>
                </Card>
            );
          case 'select':
            return (
              <div key={index} className="animate-in fade-in-50">
                <Select onValueChange={(value) => onElementClick(value)}>
                  <SelectTrigger className="w-full" style={element.color ? { borderColor: element.color } : {}}>
                    <SelectValue placeholder={element.content} />
                  </SelectTrigger>
                  <SelectContent>
                    {element.options?.map((option, optionIndex) => (
                      <SelectItem key={optionIndex} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            );
          default:
            return (
                <Card key={index} className="overflow-hidden animate-in fade-in-50" style={element.color ? { borderColor: element.color } : {}}>
                    <CardContent className="p-4">
                        <p style={style} className="text-base">{element.content}</p>
                    </CardContent>
                </Card>
            )
        }
      })}
    </div>
  );
}
