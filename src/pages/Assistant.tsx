
import { useState, useRef, useEffect } from "react";
import ChatInput from "@/components/ChatInput";
import UserMessage from "@/components/UserMessage";
import AssistantMessage from "@/components/AssistantMessage";
import { Bot, Mic, Settings } from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "assistant";
  timestamp: Date;
  hasAudio?: boolean;
}

const Assistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hello! I'm your AI trading assistant. I can help you analyze markets, manage your portfolio, explain financial concepts, and provide insights. How can I assist you today?",
      sender: "assistant",
      timestamp: new Date(),
      hasAudio: true,
    },
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    // Simulate AI response after delay
    setTimeout(() => {
      const responses: Record<string, string> = {
        "hello": "Hello! How can I help with your trading or investment questions today?",
        "hi": "Hi there! What would you like to know about your portfolio or the markets?",
        "how are the markets": "Currently, the markets are showing mixed signals. The S&P 500 is up 0.4%, while the Nasdaq is down 0.2%. Tech stocks are facing some pressure due to recent interest rate concerns.",
        "what's my portfolio": "Your portfolio is currently valued at $8,976.09, up 1.4% today. Your biggest position is NVIDIA (NVDA) at 29% of your portfolio, followed by Apple (AAPL) at 20%.",
        "what should i buy": "Based on your risk profile and current market conditions, you might consider diversifying into some defensive sectors. Consumer staples like PG or utilities like NEE could balance your tech-heavy portfolio. Would you like a deeper analysis?",
        "what's a good investment": "That depends on your investment goals, time horizon, and risk tolerance. Currently, I'm seeing opportunities in renewable energy, semiconductor stocks with AI exposure, and some value in healthcare. Would you like me to analyze a specific sector?",
        "explain options trading": "Options trading involves contracts that give you the right (but not obligation) to buy or sell an asset at a predetermined price before a specific date. Call options bet on prices rising, while put options bet on prices falling. Options can be used for speculation, hedging, or generating income. Would you like me to explain specific options strategies?",
      };

      // Generate AI response based on user input or default to a generic response
      let responseContent = "I understand you're asking about market information. Could you clarify what specific aspect you're interested in? I can help with portfolio analysis, market trends, specific stocks, or investment strategies.";
      
      // Check if user message includes any keywords we have responses for
      for (const [keyword, response] of Object.entries(responses)) {
        if (content.toLowerCase().includes(keyword)) {
          responseContent = response;
          break;
        }
      }

      const aiMessage: Message = {
        id: `assistant-${Date.now()}`,
        content: responseContent,
        sender: "assistant",
        timestamp: new Date(),
        hasAudio: Math.random() > 0.5, // Randomly enable audio for demo purposes
      };
      
      setMessages((prev) => [...prev, aiMessage]);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-space-light bg-space-dark">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-cosmic flex items-center justify-center">
            <Bot size={18} className="text-white" />
          </div>
          <div>
            <h1 className="font-bold">TradeSage Assistant</h1>
            <div className="flex items-center">
              <span className="h-1.5 w-1.5 rounded-full bg-gain mr-1.5"></span>
              <span className="text-xs text-silver">Online</span>
            </div>
          </div>
        </div>
        <button className="p-2 rounded-md hover:bg-space-light text-silver">
          <Settings size={18} />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          message.sender === "user" ? (
            <UserMessage 
              key={message.id} 
              content={message.content} 
              timestamp={message.timestamp} 
            />
          ) : (
            <AssistantMessage 
              key={message.id}
              content={message.content} 
              timestamp={message.timestamp}
              hasAudio={message.hasAudio}
            />
          )
        ))}
        
        {loading && (
          <div className="flex items-start gap-3 py-2">
            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-cosmic flex items-center justify-center text-white font-bold text-sm">
              AI
            </div>
            <div className="flex-1">
              <div className="bg-space-light text-silver p-4 rounded-lg rounded-tl-none w-fit">
                <div className="flex items-center gap-1">
                  <span className="pulse-dot"></span>
                  <span className="pulse-dot" style={{ animationDelay: "0.2s" }}></span>
                  <span className="pulse-dot" style={{ animationDelay: "0.4s" }}></span>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 border-t border-space-light bg-space/50 backdrop-blur-sm">
        <ChatInput onSendMessage={handleSendMessage} />
        <div className="flex justify-between items-center mt-2 px-2">
          <div className="text-xs text-muted-foreground">
            Powered by advanced market analytics
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Mic size={14} />
            <span>Voice enabled</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assistant;
