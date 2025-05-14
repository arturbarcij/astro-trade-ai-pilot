
import React, { useState } from "react";
import { Play, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

interface AssistantMessageProps {
  content: string;
  timestamp: Date;
  hasAudio?: boolean;
  className?: string;
}

const AssistantMessage: React.FC<AssistantMessageProps> = ({ 
  content, 
  timestamp, 
  hasAudio = false,
  className 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleAudio = () => {
    setIsPlaying(!isPlaying);
    // Here would be audio playback functionality with Text-to-Speech
    // This is just a UI demonstration
    setTimeout(() => {
      setIsPlaying(false);
    }, 5000);
  };

  return (
    <div className={cn("flex items-start gap-3 py-2", className)}>
      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-cosmic flex items-center justify-center text-white font-bold text-sm">
        AI
      </div>
      <div className="flex-1">
        <div className="bg-space-light text-silver p-3 rounded-lg rounded-tl-none glass-card">
          <p className="whitespace-pre-line">{content}</p>
          
          {hasAudio && (
            <div className="mt-3 flex items-center gap-2">
              <button 
                onClick={toggleAudio} 
                className="flex items-center gap-1.5 py-1 px-2 rounded bg-space/60 hover:bg-space transition-colors text-xs text-silver-light"
              >
                {isPlaying ? (
                  <>
                    <VolumeX size={14} />
                    Stop Audio
                  </>
                ) : (
                  <>
                    <Volume2 size={14} />
                    Play Audio
                  </>
                )}
              </button>
              {isPlaying && (
                <div className="flex items-center gap-0.5">
                  <div className="h-1 w-1 bg-cosmic rounded-full animate-pulse"></div>
                  <div className="h-2 w-1 bg-cosmic rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="h-3 w-1 bg-cosmic rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  <div className="h-2 w-1 bg-cosmic rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
                  <div className="h-1 w-1 bg-cosmic rounded-full animate-pulse" style={{ animationDelay: '0.8s' }}></div>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="text-xs text-muted-foreground mt-1 flex items-center gap-2">
          <span>{timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          <span>Trading Assistant</span>
        </div>
      </div>
    </div>
  );
};

export default AssistantMessage;
