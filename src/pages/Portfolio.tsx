
import { PieChart, ResponsiveContainer, Pie, Cell, Tooltip as RechartsTooltip } from "recharts";
import PortfolioSummary from "@/components/PortfolioSummary";
import TopHoldings from "@/components/TopHoldings";
import { ArrowDown, ArrowUp, BarChart2, Calendar, Clock, Landmark, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface TradeHistory {
  id: number;
  type: "buy" | "sell";
  symbol: string;
  shares: number;
  price: number;
  total: number;
  date: string;
  time: string;
}

const Portfolio = () => {
  // Mock portfolio allocation data
  const allocation = [
    { name: "Technology", value: 42, color: "#4361ee" },
    { name: "Healthcare", value: 18, color: "#7209b7" },
    { name: "Consumer Goods", value: 15, color: "#3a86ff" },
    { name: "Financials", value: 12, color: "#f72585" },
    { name: "Energy", value: 8, color: "#38b000" },
    { name: "Other", value: 5, color: "#8b96cc" },
  ];
  
  // Mock trade history
  const tradeHistory: TradeHistory[] = [
    { id: 1, type: "buy", symbol: "AAPL", shares: 5, price: 182.63, total: 913.15, date: "2023-05-14", time: "10:32 AM" },
    { id: 2, type: "sell", symbol: "MSFT", shares: 2, price: 415.26, total: 830.52, date: "2023-05-13", time: "2:45 PM" },
    { id: 3, type: "buy", symbol: "NVDA", shares: 3, price: 860.12, total: 2580.36, date: "2023-05-12", time: "11:15 AM" },
    { id: 4, type: "buy", symbol: "GOOGL", shares: 4, price: 171.32, total: 685.28, date: "2023-05-10", time: "9:58 AM" },
    { id: 5, type: "sell", symbol: "AMZN", shares: 2, price: 185.73, total: 371.46, date: "2023-05-08", time: "3:27 PM" },
  ];
  
  // Custom tooltip for the pie chart
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="chart-tooltip">
          <p className="font-medium">{payload[0].name}</p>
          <p className="font-bold">{payload[0].value}%</p>
        </div>
      );
    }
    
    return null;
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Portfolio</h1>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-space-light px-3 py-1.5 rounded-md hover:bg-space-light/70 transition-colors">
            <Calendar size={16} />
            <span>History</span>
          </button>
          <button className="flex items-center gap-2 bg-space-accent px-3 py-1.5 rounded-md hover:bg-cosmic transition-colors text-white">
            <Plus size={16} />
            <span>New Trade</span>
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
        
        {/* Key Stats */}
        <div className="col-span-12 md:col-span-8">
          <div className="glass-card p-4">
            <h3 className="text-lg font-semibold mb-4">Portfolio Metrics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-space p-3 rounded-md">
                <div className="flex items-center gap-2 text-sm text-silver mb-1">
                  <BarChart2 size={14} />
                  <span>Beta</span>
                </div>
                <div className="text-xl font-bold">1.24</div>
              </div>
              <div className="bg-space p-3 rounded-md">
                <div className="flex items-center gap-2 text-sm text-silver mb-1">
                  <Landmark size={14} />
                  <span>Dividend Yield</span>
                </div>
                <div className="text-xl font-bold">2.1%</div>
              </div>
              <div className="bg-space p-3 rounded-md">
                <div className="flex items-center gap-2 text-sm text-silver mb-1">
                  <Clock size={14} />
                  <span>Avg. Holding</span>
                </div>
                <div className="text-xl font-bold">126 days</div>
              </div>
              <div className="bg-space p-3 rounded-md">
                <div className="flex items-center gap-2 text-sm text-silver mb-1">
                  <BarChart2 size={14} />
                  <span>Sharpe Ratio</span>
                </div>
                <div className="text-xl font-bold">1.86</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Holdings Table */}
        <div className="col-span-12 md:col-span-8">
          <TopHoldings />
        </div>
        
        {/* Asset Allocation */}
        <div className="col-span-12 md:col-span-4">
          <div className="glass-card p-4 h-full">
            <h3 className="text-lg font-semibold mb-4">Asset Allocation</h3>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={allocation}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {allocation.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {allocation.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div 
                    className="h-3 w-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm">{item.name}</span>
                  <span className="text-sm font-medium ml-auto">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Recent Trades */}
        <div className="col-span-12">
          <div className="glass-card p-4">
            <h3 className="text-lg font-semibold mb-4">Recent Trades</h3>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Symbol</th>
                  <th>Shares</th>
                  <th>Price</th>
                  <th>Total</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {tradeHistory.map((trade) => (
                  <tr key={trade.id} className="hover:bg-space/40">
                    <td>
                      <div 
                        className={cn(
                          "px-2 py-0.5 rounded-full text-xs w-fit",
                          trade.type === "buy" 
                            ? "bg-gain/20 text-gain border border-gain/20" 
                            : "bg-loss/20 text-loss border border-loss/20"
                        )}
                      >
                        {trade.type === "buy" ? "BUY" : "SELL"}
                      </div>
                    </td>
                    <td className="font-medium">{trade.symbol}</td>
                    <td>{trade.shares}</td>
                    <td>${trade.price.toFixed(2)}</td>
                    <td>${trade.total.toFixed(2)}</td>
                    <td>
                      <div className="text-sm">
                        <div>{trade.date}</div>
                        <div className="text-muted-foreground text-xs">{trade.time}</div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
