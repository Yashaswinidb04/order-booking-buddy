
import { useRef, useEffect } from "react";
import { Send, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tooltip } from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import useChat from "@/hooks/useChat";
import { Mode } from "@/pages/Index";
import ResponseCard from "./ResponseCard";

interface ChatInterfaceProps {
  mode: Mode;
}

const ChatInterface = ({ mode }: ChatInterfaceProps) => {
  const { 
    messages, 
    isTyping, 
    inputValue, 
    setInputValue, 
    sendMessage, 
    clearChat 
  } = useChat(mode);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      sendMessage(inputValue);
    }
  };
  
  return (
    <Card className="flex flex-col h-[calc(100vh-10rem)] md:h-[calc(100vh-12rem)] overflow-hidden glass animate-slide-up">
      <div className="p-4 border-b flex items-center justify-between">
        <h3 className="font-medium">
          {mode === "restaurant" ? "Restaurant Assistant" : "Clinic Assistant"}
        </h3>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={clearChat}
          className="h-8 w-8 text-muted-foreground hover:text-foreground transition-colors"
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 animate-slide-up ${
                  message.isUser
                    ? "bg-primary text-primary-foreground"
                    : "bg-card shadow-sm border"
                }`}
              >
                <p className="text-sm">{message.text}</p>
                
                {/* Display structured data for AI responses */}
                {!message.isUser && message.data && (
                  <div className="mt-3 space-y-3">
                    {/* Restaurant-specific responses */}
                    {mode === "restaurant" && message.data.items && (
                      <div className="grid grid-cols-1 gap-2">
                        {message.data.items.map((item: any, index: number) => (
                          <div 
                            key={index} 
                            className="bg-muted/50 rounded-lg p-2 text-xs"
                          >
                            <div className="flex justify-between">
                              <span className="font-medium">{item.name}</span>
                              <span>{item.price}</span>
                            </div>
                            <p className="text-muted-foreground mt-1">{item.description}</p>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {mode === "restaurant" && message.data.currentWait && (
                      <div className="bg-muted/50 rounded-lg p-3 text-sm">
                        <span className="font-medium">Current wait time:</span>
                        <div className="mt-1">{message.data.currentWait}</div>
                      </div>
                    )}
                    
                    {/* Clinic-specific responses */}
                    {mode === "clinic" && message.data.availableDoctors && (
                      <div className="grid grid-cols-1 gap-2">
                        {message.data.availableDoctors.map((doctor: any, index: number) => (
                          <div 
                            key={index} 
                            className="bg-muted/50 rounded-lg p-2 text-xs"
                          >
                            <span className="font-medium">{doctor.name}</span>
                            <p className="text-muted-foreground mt-0.5">{doctor.specialty}</p>
                            <p className="mt-1">{doctor.availability}</p>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {mode === "clinic" && message.data.consultationFees && (
                      <div className="grid grid-cols-1 gap-2">
                        {message.data.consultationFees.map((fee: any, index: number) => (
                          <div 
                            key={index} 
                            className="bg-muted/50 rounded-lg p-2 text-xs flex justify-between"
                          >
                            <span>{fee.type}</span>
                            <span className="font-medium">{fee.fee}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {mode === "clinic" && message.data.nextSteps && (
                      <div className="bg-muted/50 rounded-lg p-3 text-xs">
                        <span className="font-medium">Next steps:</span>
                        <ol className="list-decimal pl-5 mt-1 space-y-1">
                          {message.data.nextSteps.map((step: string, index: number) => (
                            <li key={index}>{step}</li>
                          ))}
                        </ol>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="max-w-[85%] rounded-2xl px-4 py-2.5 bg-card shadow-sm border animate-pulse-slow">
                <div className="text-sm loading-dots">
                  Typing
                  <span>.</span>
                  <span>.</span>
                  <span>.</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      
      <div className="p-4 border-t">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <Input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={
              mode === "restaurant"
                ? "Ask about menu, specials, dietary options..."
                : "Ask about doctors, appointments, services..."
            }
            className="flex-1"
          />
          <Button 
            type="submit" 
            size="icon" 
            disabled={!inputValue.trim() || isTyping}
            className={`transition-all duration-300 ${
              !inputValue.trim() || isTyping
                ? "opacity-50"
                : "opacity-100"
            }`}
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </Card>
  );
};

export default ChatInterface;
