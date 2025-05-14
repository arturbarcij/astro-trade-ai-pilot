
import { useState } from "react";
import StockChart from "@/components/StockChart";
import MarketTicker from "@/components/MarketTicker";
import MarketNews from "@/components/MarketNews";
import { ArrowDown, ArrowUp, Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface MarketIndex {
  name: string;
  value: number;
  change: number;
  changePercent: number;
}

interface MarketStock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: string;
}

const Market = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStock, setSelectedStock] = useState("AAPL");

  // Mock market indexes data
  const indices: MarketIndex[] = [
    { name: "S&P 500", value: 5234.21, change: 23.45, changePercent: 0.45 },
    { name: "NASDAQ", value: 16542.76, change: 124.32, changePercent: 0.76 },
    { name: "Dow Jones", value: 39875.43, change: -56.78, changePercent: -0.14 },
    { name: "Russell 2000", value: 2034.65, change: -12.32, changePercent: -0.60 },
  ];

  // Mock stocks data
  const stocks: MarketStock[] = [
    { symbol: "AAPL", name: "Apple Inc.", price: 182.63, change: 1.25, changePercent: 0.69, volume: "52.3M" },
    { symbol: "MSFT", name: "Microsoft Corp.", price: 412.65, change: -2.31, changePercent: -0.56, volume: "23.1M" },
    { symbol: "GOOGL", name: "Alphabet Inc.", price: 172.48, change: 0.72, changePercent: 0.42, volume: "18.7M" },
    { symbol: "AMZN", name: "Amazon.com Inc.", price: 184.29, change: -0.46, changePercent: -0.25, volume: "31.5M" },
    { symbol: "TSLA", name: "Tesla Inc.", price: 173.80, change: 3.58, changePercent: 2.10, volume: "105.2M" },
    { symbol: "NVDA", name: "NVIDIA Corp.", price: 867.32, change: 12.54, changePercent: 1.47, volume: "42.8M" },
    { symbol: "META", name: "Meta Platforms Inc.", price: 467.79, change: -1.03, changePercent: -0.22, volume: "15.3M" },
    { symbol: "NFLX", name: "Netflix Inc.", price: 605.78, change: 10.32, changePercent: 1.73, volume: "8.2M" },
    { symbol: "JPM", name: "JPMorgan Chase & Co.", price: 198.23, change: -0.83, changePercent: -0.42, volume: "9.1M" },
    { symbol: "V", name: "Visa Inc.", price: 276.54, change: 1.35, changePercent: 0.49, volume: "6.7M" },
  ];

  // Filter stocks based on search query
  const filteredStocks = searchQuery
    ? stocks.filter(
        (stock) =>
          stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
          stock.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : stocks;

  return (
    <div>
      <MarketTicker />
      
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Market Overview</h1>
        
        <div className="grid grid-cols-12 gap-6">
          {/* Market Indices */}
          <div className="col-span-12">
            <div className="glass-card p-4">
              <h3 className="text-lg font-semibold mb-4">Major Indices</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {indices.map((index) => (
                  <div key={index.name} className="bg-space p-4 rounded-lg">
                    <h4 className="text-silver mb-1">{index.name}</h4>
                    <div className="text-xl font-bold">{index.value.toLocaleString()}</div>
                    <div 
                      className={cn(
                        "text-sm flex items-center gap-0.5 mt-1",
                        index.change >= 0 ? "text-gain" : "text-loss"
                      )}
                    >
                      {index.change >= 0 ? (
                        <ArrowUp size={14} />
                      ) : (
                        <ArrowDown size={14} />
                      )}
                      <span>
                        {index.change >= 0 ? "+" : ""}
                        {index.change.toFixed(2)} ({index.change >= 0 ? "+" : ""}
                        {index.changePercent.toFixed(2)}%)
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Stock Search */}
          <div className="col-span-12 md:col-span-4">
            <div className="glass-card p-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="relative flex-1">
                  <input
                    type="text"
                    className="w-full bg-space p-2 pl-8 rounded-md text-silver focus:outline-none focus:ring-1 focus:ring-space-accent"
                    placeholder="Search stocks..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Search size={16} className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
                </div>
              </div>
              <div className="overflow-y-auto max-h-[500px]">
                <table className="data-table">
                  <thead className="sticky top-0 bg-space-dark">
                    <tr>
                      <th>Symbol</th>
                      <th>Price</th>
                      <th>Change</th>
                      <th>Volume</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStocks.map((stock) => (
                      <tr 
                        key={stock.symbol} 
                        className={cn(
                          "hover:bg-space/40 cursor-pointer",
                          selectedStock === stock.symbol ? "bg-space/40" : ""
                        )}
                        onClick={() => setSelectedStock(stock.symbol)}
                      >
                        <td>
                          <div>
                            <div className="font-medium">{stock.symbol}</div>
                            <div className="text-xs text-muted-foreground">{stock.name}</div>
                          </div>
                        </td>
                        <td>${stock.price.toFixed(2)}</td>
                        <td
                          className={cn(
                            "flex items-center gap-0.5",
                            stock.change >= 0 ? "text-gain" : "text-loss"
                          )}
                        >
                          {stock.change >= 0 ? (
                            <ArrowUp size={14} />
                          ) : (
                            <ArrowDown size={14} />
                          )}
                          <span>
                            {stock.changePercent.toFixed(2)}%
                          </span>
                        </td>
                        <td>{stock.volume}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
          {/* Stock Chart */}
          <div className="col-span-12 md:col-span-8">
            <StockChart symbol={selectedStock} />
          </div>
          
          {/* Market News */}
          <div className="col-span-12">
            <MarketNews />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Market;
