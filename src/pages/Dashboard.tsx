
import StockChart from "@/components/StockChart";
import MarketTicker from "@/components/MarketTicker";
import PortfolioSummary from "@/components/PortfolioSummary";
import TopHoldings from "@/components/TopHoldings";
import MarketNews from "@/components/MarketNews";
import AssistantMessage from "@/components/AssistantMessage";
import { BarChart2, Bell, MessageSquare, PieChart, Plus } from "lucide-react";

const Dashboard = () => {
  return (
    <div>
      <MarketTicker />
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex items-center gap-3">
            <button className="bg-space-light p-2 rounded-md hover:bg-space-accent/30 transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 h-2 w-2 bg-cosmic rounded-full"></span>
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-12 gap-6">
          {/* Portfolio Summary */}
          <div className="col-span-12 md:col-span-4">
            <PortfolioSummary 
              totalValue={8976.09} 
              dailyChange={126.43} 
              totalProfit={1252.36}
              profitPercent={16.21}
            />
          </div>
          
          {/* Quick Actions */}
          <div className="col-span-12 md:col-span-8">
            <div className="glass-card p-4">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <button className="bg-space p-3 rounded-lg hover:bg-space-light/70 transition-colors flex flex-col items-center gap-2">
                  <div className="h-10 w-10 rounded-full bg-space-accent/20 flex items-center justify-center">
                    <Plus size={20} className="text-space-accent" />
                  </div>
                  <span className="text-sm">Buy Stock</span>
                </button>
                <button className="bg-space p-3 rounded-lg hover:bg-space-light/70 transition-colors flex flex-col items-center gap-2">
                  <div className="h-10 w-10 rounded-full bg-cosmic/20 flex items-center justify-center">
                    <BarChart2 size={20} className="text-cosmic" />
                  </div>
                  <span className="text-sm">Market Analysis</span>
                </button>
                <button className="bg-space p-3 rounded-lg hover:bg-space-light/70 transition-colors flex flex-col items-center gap-2">
                  <div className="h-10 w-10 rounded-full bg-silver/20 flex items-center justify-center">
                    <PieChart size={20} className="text-silver" />
                  </div>
                  <span className="text-sm">Portfolio</span>
                </button>
                <button className="bg-space p-3 rounded-lg hover:bg-space-light/70 transition-colors flex flex-col items-center gap-2">
                  <div className="h-10 w-10 rounded-full bg-space-accent/20 flex items-center justify-center">
                    <MessageSquare size={20} className="text-space-accent" />
                  </div>
                  <span className="text-sm">Ask AI</span>
                </button>
              </div>
            </div>
          </div>
          
          {/* Chart */}
          <div className="col-span-12 lg:col-span-8">
            <StockChart symbol="TSLA" />
          </div>
          
          {/* AI Insights */}
          <div className="col-span-12 lg:col-span-4">
            <div className="glass-card p-4 h-full flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">AI Insights</h3>
                <button className="text-xs text-space-accent hover:text-cosmic transition-colors">
                  View all
                </button>
              </div>
              <div className="flex-1 overflow-y-auto space-y-4">
                <AssistantMessage 
                  content="Based on your portfolio, I've detected increased volatility in the tech sector. Consider diversifying with some consumer staples or utilities if you want to reduce risk."
                  timestamp={new Date(Date.now() - 1000 * 60 * 30)}
                />
                <AssistantMessage 
                  content="Your TSLA position has grown to over 15% of your portfolio. This exceeds your diversification target of 10% per position."
                  timestamp={new Date(Date.now() - 1000 * 60 * 60 * 2)}
                />
                <AssistantMessage 
                  content="Today's market is showing bullish patterns across most sectors, with particularly strong performance in semiconductors and AI-related stocks."
                  timestamp={new Date(Date.now() - 1000 * 60 * 60 * 5)}
                />
              </div>
            </div>
          </div>
          
          {/* Holdings */}
          <div className="col-span-12 md:col-span-6">
            <TopHoldings />
          </div>
          
          {/* News */}
          <div className="col-span-12 md:col-span-6">
            <MarketNews />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
