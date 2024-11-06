import { MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ScrollArea } from '../ui/scroll-area';

export function EchoAI() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <Card className="w-[400px] h-[600px] flex flex-col">
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Echo AI Assistant
              </CardTitle>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <span className="sr-only">Close</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </Button>
            </div>
          </CardHeader>
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              <div className="bg-muted rounded-lg p-3">
                <p className="text-sm">
                  Hello! I'm Echo, your AI assistant. I can help you analyze data, generate insights, and answer questions
                  about your application's performance. How can I assist you today?
                </p>
              </div>
            </div>
          </ScrollArea>
          <CardContent className="border-t p-4">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Ask Echo anything..."
                className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
              />
              <Button size="sm">Send</Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="rounded-full h-12 w-12 p-0"
        >
          <MessageCircle className="h-6 w-6" />
          <span className="sr-only">Open Echo AI Assistant</span>
        </Button>
      )}
    </div>
  );
}