
import React from "react";
import { cn } from "@/lib/utils";

interface UserMessageProps {
  content: string;
  timestamp: Date;
  className?: string;
}

const UserMessage: React.FC<UserMessageProps> = ({ 
  content, 
  timestamp,
  className 
}) => {
  return (
    <div className={cn("flex items-start gap-3 py-2 justify-end", className)}>
      <div className="flex-1 flex flex-col items-end">
        <div className="bg-space-accent text-white p-3 rounded-lg rounded-tr-none">
          <p className="whitespace-pre-line">{content}</p>
        </div>
        <div className="text-xs text-muted-foreground mt-1">
          {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-space-light border border-space-accent flex items-center justify-center text-white font-bold text-sm">
        You
      </div>
    </div>
  );
};

export default UserMessage;
