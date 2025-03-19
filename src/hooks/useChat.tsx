
import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { Mode } from "@/pages/Index";
import { generateResponse } from "@/lib/ai-responses";

export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  data?: any;
}

const useChat = (mode: Mode) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");
  
  // Initialize with welcome message
  useEffect(() => {
    const initialMessage = mode === "restaurant"
      ? "Welcome to our restaurant! How can I help you today? You can ask about our menu, dietary options, or place an order."
      : "Welcome to our clinic! How can I assist you today? You can inquire about doctor availability, book appointments, or ask about our services.";
      
    setMessages([{
      id: "welcome",
      text: initialMessage,
      isUser: false,
      timestamp: new Date(),
    }]);
  }, [mode]);
  
  // Generate ID for messages
  const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  };
  
  // Send message function
  const sendMessage = useCallback((text: string) => {
    if (!text.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: generateId(),
      text,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);
    
    // Simulate typing delay for natural feel
    setTimeout(() => {
      try {
        const response = generateResponse(text, mode);
        
        const aiMessage: Message = {
          id: generateId(),
          text: response.text,
          isUser: false,
          timestamp: new Date(),
          data: response
        };
        
        setMessages(prev => [...prev, aiMessage]);
        setIsTyping(false);
      } catch (error) {
        console.error("Error generating response:", error);
        toast.error("Sorry, I couldn't process your request");
        setIsTyping(false);
      }
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  }, [mode]);
  
  // Clear chat
  const clearChat = useCallback(() => {
    const initialMessage = mode === "restaurant"
      ? "Chat cleared. How can I help you with your restaurant order today?"
      : "Chat cleared. How can I help you with your clinic appointment today?";
      
    setMessages([{
      id: "welcome",
      text: initialMessage,
      isUser: false,
      timestamp: new Date(),
    }]);
    
    toast.success("Chat history cleared");
  }, [mode]);
  
  return {
    messages,
    isTyping,
    inputValue,
    setInputValue,
    sendMessage,
    clearChat
  };
};

export default useChat;
