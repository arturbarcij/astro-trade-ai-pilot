
import { useState } from "react";
import { Mic, Send } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  className?: string;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, className }) => {
  const [message, setMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Here would be voice recording functionality
    // This is just a UI demonstration
    if (!isRecording) {
      setTimeout(() => {
        setIsRecording(false);
        onSendMessage("Can you explain current inflation trends and their underlying causes?");
      }, 3000);
    }
  };

  return (
    <div className={cn("flex items-end gap-2 bg-space-light/50 p-2 rounded-lg backdrop-blur-sm", className)}>
      <button
        onClick={toggleRecording}
        className={cn(
          "p-2 rounded-full transition-colors",
          isRecording 
            ? "bg-cosmic text-white animate-pulse" 
            : "bg-space text-silver hover:bg-space-light"
        )}
      >
        <Mic size={20} />
      </button>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 bg-space p-2 rounded-md text-silver resize-none min-h-[40px] max-h-[120px] focus:outline-none focus:ring-1 focus:ring-space-accent"
        placeholder="Ask about macroeconomic insights, central bank policies, inflation, GDP trends..."
        rows={1}
      />
      <button
        onClick={handleSendMessage}
        disabled={!message.trim()}
        className={cn(
          "p-2 rounded-full transition-colors",
          message.trim()
            ? "bg-space-accent text-white hover:bg-cosmic"
            : "bg-space text-silver cursor-not-allowed"
        )}
      >
        <Send size={20} />
      </button>
    </div>
  );
};

export default ChatInput;
