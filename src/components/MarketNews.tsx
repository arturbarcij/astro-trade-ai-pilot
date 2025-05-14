
import { useState } from "react";
import { MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface NewsItem {
  id: number;
  title: string;
  source: string;
  time: string;
  sentiment: "positive" | "negative" | "neutral";
  summary?: string;
}

const MarketNews = () => {
  const [expandedNews, setExpandedNews] = useState<number | null>(null);

  // Mock news data - would be replaced with real news API data
  const news: NewsItem[] = [
    {
      id: 1,
      title: "Federal Reserve Signals Potential Rate Cut",
      source: "Financial Times",
      time: "2 hours ago",
      sentiment: "positive",
      summary: "The Federal Reserve has signaled it may begin cutting interest rates soon, citing improving inflation data and concerns about maintaining a strong labor market. Markets responded positively, with the S&P 500 closing up 1.2%.",
    },
    {
      id: 2,
      title: "Tech Giant Reports Disappointing Earnings",
      source: "Wall Street Journal",
      time: "5 hours ago",
      sentiment: "negative",
      summary: "A major technology company reported quarterly earnings below analyst expectations, citing supply chain constraints and weakening consumer demand. The company's shares fell 8% in after-hours trading.",
    },
    {
      id: 3,
      title: "Oil Prices Stabilize After Recent Volatility",
      source: "Bloomberg",
      time: "8 hours ago",
      sentiment: "neutral",
      summary: "Global oil prices have stabilized following a period of volatility, as concerns about Middle East supply disruptions were offset by reports of increasing U.S. production. Analysts expect prices to remain range-bound in the near term.",
    },
    {
      id: 4,
      title: "Renewable Energy Sector Sees Record Investment",
      source: "Reuters",
      time: "12 hours ago",
      sentiment: "positive",
      summary: "The renewable energy sector has attracted record levels of investment in the first quarter, with solar and wind projects leading the way. Several countries have announced ambitious new clean energy targets, boosting investor confidence in the sector.",
    },
    {
      id: 5,
      title: "Retail Sales Data Shows Unexpected Decline",
      source: "CNBC",
      time: "1 day ago",
      sentiment: "negative",
      summary: "Monthly retail sales figures came in below expectations, showing a 0.3% decline compared to the previous month. Economists point to rising inflation and interest rates as factors constraining consumer spending.",
    },
  ];

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
      <h3 className="text-lg font-semibold mb-4">Market News & Analysis</h3>
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
