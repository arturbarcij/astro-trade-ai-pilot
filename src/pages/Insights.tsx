
import { useState } from "react";
import { ArrowUpRight, Brain, Calendar, Download, Filter, Layers, Search, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Mock AI insights data
const aiInsights = [
  {
    id: 1,
    type: "price-prediction",
    title: "AAPL Likely to Test Resistance",
    description: "Based on technical patterns and volume analysis, AAPL is showing signs of testing its major resistance level at $192.50 in the next 3-5 trading days.",
    confidence: 78,
    date: "Today",
    symbol: "AAPL",
    category: "Technical"
  },
  {
    id: 2,
    type: "market-trend",
    title: "DAX Recovery Expected",
    description: "Macroeconomic indicators and sentiment analysis suggest the DAX will likely recover from recent losses and test 18,200 level by end of month.",
    confidence: 82,
    date: "Yesterday",
    symbol: "DAX",
    category: "Macro"
  },
  {
    id: 3,
    type: "correlation",
    title: "MSFT & GOOGL High Correlation",
    description: "AI detects unusually high correlation between MSFT and GOOGL price movements in the last 14 trading sessions, suggesting sector-wide trends.",
    confidence: 91,
    date: "2 days ago",
    symbol: "MSFT, GOOGL",
    category: "Correlation"
  },
  {
    id: 4,
    type: "sentiment",
    title: "TSLA Sentiment Improving",
    description: "Social media sentiment analysis shows gradually improving investor attitude toward TSLA, reversing the negative trend from last month.",
    confidence: 73,
    date: "3 days ago",
    symbol: "TSLA", 
    category: "Sentiment"
  },
  {
    id: 5,
    type: "volatility",
    title: "Increased EUR/USD Volatility",
    description: "Multiple factors indicate increased EUR/USD volatility expected ahead of upcoming ECB announcement on Thursday.",
    confidence: 85,
    date: "3 days ago",
    symbol: "EUR/USD",
    category: "Forex"
  }
];

// Personalized trading recommendations
const recommendations = [
  { 
    title: "Consider taking profit on NVDA", 
    reason: "Position is up 32% and approaching technical resistance",
    action: "Review" 
  },
  { 
    title: "Add to your GOOGL position", 
    reason: "Price has pulled back to support level with positive momentum",
    action: "View Analysis" 
  },
  { 
    title: "Set stop loss on EUR/USD", 
    reason: "Volatility expected to increase with upcoming economic data",
    action: "Set Now" 
  },
];

const InsightsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredInsights = searchTerm 
    ? aiInsights.filter(insight => 
        insight.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        insight.symbol.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : aiInsights;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-silver bg-clip-text text-transparent">AI Insights</h1>
          <p className="text-silver">AI-powered market analysis and predictions</p>
        </div>
        <Button className="gap-2">
          <Download size={16} />
          Export Report
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content area */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex flex-col sm:flex-row items-stretch gap-3">
            <div className="flex-1 relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder="Search by symbol or keywords..." 
                className="pl-9 bg-space focus-visible:ring-cosmic"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter size={16} />
              Filters
            </Button>
            <Button variant="outline" className="gap-2">
              <Calendar size={16} />
              Last 7 days
            </Button>
          </div>
          
          <div className="glass-card p-4 mb-6 border-cosmic/20 shadow-lg shadow-cosmic/5">
            <h2 className="text-xl font-medium mb-4 flex items-center gap-2">
              <span className="inline-block w-1.5 h-6 bg-cosmic rounded-full mr-2"></span>
              Market Intelligence
            </h2>
            <p className="text-silver mb-6">
              Advanced AI models analyze patterns across technical indicators, news sentiment, and market data to generate actionable insights.
            </p>
            
            <div className="space-y-4">
              {filteredInsights.map((insight) => (
                <div key={insight.id} className="bg-space p-4 rounded-lg border border-space-light hover:border-cosmic/30 transition-colors cursor-pointer">
                  <div className="flex items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-0.5 text-xs rounded-full bg-space-light">{insight.symbol}</span>
                        <span className="px-2 py-0.5 text-xs rounded-full bg-space-accent/20 text-space-accent">{insight.category}</span>
                        <span className="text-xs text-muted-foreground ml-auto">{insight.date}</span>
                      </div>
                      <h3 className="font-medium mb-1">{insight.title}</h3>
                      <p className="text-sm text-muted-foreground">{insight.description}</p>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Brain size={14} className="text-cosmic" />
                          <span className="text-xs">AI Confidence: {insight.confidence}%</span>
                        </div>
                        <Button variant="ghost" size="sm" className="text-xs px-2 h-7 hover:text-cosmic hover:bg-space-light gap-1">
                          View Analysis
                          <ArrowUpRight size={12} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6">
          <div className="glass-card p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">Personalized Recommendations</h3>
              <Button variant="ghost" size="sm" className="text-xs h-7 p-0">Refresh</Button>
            </div>
            
            <div className="space-y-3">
              {recommendations.map((rec, idx) => (
                <div key={idx} className="bg-space-light/40 p-3 rounded-md">
                  <h4 className="font-medium text-sm mb-1 flex items-center gap-2">
                    <TrendingUp size={14} className="text-cosmic" />
                    {rec.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mb-2">{rec.reason}</p>
                  <Button size="sm" variant="outline" className="w-full text-xs">
                    {rec.action}
                  </Button>
                </div>
              ))}
            </div>
          </div>
          
          <div className="glass-card p-4">
            <h3 className="font-medium mb-4">AI Model Metrics</h3>
            <div className="space-y-3">
              <div className="bg-space-light/40 p-3 rounded-md">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm">Technical Predictions</span>
                  <span className="text-sm font-medium">78%</span>
                </div>
                <div className="w-full bg-space-dark h-1.5 rounded-full overflow-hidden">
                  <div className="bg-cosmic h-full rounded-full" style={{ width: "78%" }}></div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Accuracy in last 30 days</p>
              </div>
              
              <div className="bg-space-light/40 p-3 rounded-md">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm">Sentiment Analysis</span>
                  <span className="text-sm font-medium">91%</span>
                </div>
                <div className="w-full bg-space-dark h-1.5 rounded-full overflow-hidden">
                  <div className="bg-cosmic h-full rounded-full" style={{ width: "91%" }}></div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Correlation to price movement</p>
              </div>
              
              <div className="bg-space-light/40 p-3 rounded-md">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm">Pattern Recognition</span>
                  <span className="text-sm font-medium">83%</span>
                </div>
                <div className="w-full bg-space-dark h-1.5 rounded-full overflow-hidden">
                  <div className="bg-cosmic h-full rounded-full" style={{ width: "83%" }}></div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Pattern completion accuracy</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-cosmic/30 to-purple-500/30 p-6 rounded-lg border border-cosmic/20">
            <div className="flex items-center gap-2 mb-3">
              <Layers className="text-cosmic" size={20} />
              <h3 className="font-semibold">Upgrade to Pro</h3>
            </div>
            <p className="text-sm text-silver mb-4">Get access to advanced AI insights, real-time alerts, and personalized trading recommendations.</p>
            <Button className="w-full">Upgrade Now</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsightsPage;
