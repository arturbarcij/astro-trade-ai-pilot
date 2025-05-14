
import { useState } from "react";
import { MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { generateMarketNews, NewsItem } from "@/lib/marketDataUtils";

const MarketNews = () => {
  const [expandedNews, setExpandedNews] = useState<number | null>(null);

  // Get our simulated German market news
  const news: NewsItem[] = generateMarketNews();

  const toggleExpand = (id: number) => {
    setExpandedNews(expandedNews === id ? null : id);
  };

  const getSentimentColor = (sentiment: "positive" | "negative" | "neutral") => {
    switch (sentiment) {
      case "positive":
        return "bg-gain/20 text-gain border-gain/20";
      case "negative":
        return "bg-loss/20 text-loss border-loss/20";
      case "neutral":
      default:
        return "bg-silver/10 text-silver border-silver/20";
    }
  };

  return (
    <div className="glass-card p-4">
      <h3 className="text-lg font-semibold mb-4">German Market News</h3>
      <div className="space-y-3">
        {news.map((item) => (
          <div 
            key={item.id} 
            className="border border-space-light rounded-lg overflow-hidden hover:bg-space/40 transition-colors cursor-pointer"
            onClick={() => toggleExpand(item.id)}
          >
            <div className="p-3">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium">{item.title}</h4>
                <span 
                  className={cn(
                    "text-xs px-2 py-0.5 rounded-full border",
                    getSentimentColor(item.sentiment)
                  )}
                >
                  {item.sentiment.charAt(0).toUpperCase() + item.sentiment.slice(1)}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{item.source}</span>
                <span>{item.time}</span>
              </div>
              
              {expandedNews === item.id && item.summary && (
                <div className="mt-3 text-silver border-t border-space-light pt-3 text-sm">
                  {item.summary}
                  
                  {/* Show related symbols if available */}
                  {item.relatedSymbols && item.relatedSymbols.length > 0 && (
                    <div className="mt-2">
                      <span className="text-xs text-muted-foreground">Related: </span>
                      {item.relatedSymbols.map((symbol, index) => (
                        <span key={symbol} className="text-xs bg-space-light rounded-md px-1.5 py-0.5 ml-1">
                          {symbol}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
            <div 
              className={cn(
                "flex items-center gap-1 text-xs px-3 py-1.5 bg-space border-t border-space-light text-muted-foreground",
                expandedNews === item.id ? "bg-space-light" : ""
              )}
            >
              <MessageSquare size={12} />
              <span>{expandedNews === item.id ? "Hide summary" : "View summary"}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketNews;
