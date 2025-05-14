
import { useEffect, useState } from "react";
import StockChart from "@/components/StockChart";
import MarketTicker from "@/components/MarketTicker";
import MarketNews from "@/components/MarketNews";
import { ArrowDown, ArrowUp, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  getAllStocks, 
  getMarketIndices, 
  setSelectedStock,
  getSelectedStock
} from "@/services/marketDataService";
import { StockData, MarketIndex } from "@/lib/marketDataUtils";

const Market = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStock, setSelectedStockState] = useState(getSelectedStock());
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [indices, setIndices] = useState<MarketIndex[]>([]);

  // Initialize with our German market data and set up update interval
  useEffect(() => {
    // Get initial data
    updateMarketData();
    
    // Set up interval to refresh market data
    const interval = setInterval(() => {
      updateMarketData();
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Update all market data from our service
  const updateMarketData = () => {
    setStocks(getAllStocks());
    setIndices(getMarketIndices());
  };

  // Handle stock selection
  const handleSelectStock = (symbol: string) => {
    setSelectedStockState(symbol);
    setSelectedStock(symbol);
  };

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
        <h1 className="text-2xl font-bold mb-6">German Market Overview</h1>
        
        <div className="grid grid-cols-12 gap-6">
          {/* Market Indices */}
          <div className="col-span-12">
            <div className="glass-card p-4">
              <h3 className="text-lg font-semibold mb-4">German Market Indices</h3>
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
                    placeholder="Search German stocks..."
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
                        onClick={() => handleSelectStock(stock.symbol)}
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
