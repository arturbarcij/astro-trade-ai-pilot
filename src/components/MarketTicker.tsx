
import { useEffect, useState } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { StockData } from "@/lib/marketDataUtils";
import { getAllStocks, startMarketSimulation, stopMarketSimulation } from "@/services/marketDataService";

const MarketTicker = () => {
  const [tickers, setTickers] = useState<StockData[]>([]);

  // Initialize ticker with our German market data
  useEffect(() => {
    // Get initial data
    setTickers(getAllStocks());
    
    // Set up interval to refresh ticker data
    const interval = setInterval(() => {
      setTickers(getAllStocks());
    }, 3000);
    
    // Clean up
    return () => {
      clearInterval(interval);
      stopMarketSimulation();
    };
  }, []);

  return (
    <div className="bg-space-dark h-10 overflow-hidden border-b border-space-light relative">
      <div className="absolute inset-0 flex items-center">
        <div className="flex gap-8 ticker">
          {tickers.map((ticker) => (
            <div key={ticker.symbol} className="flex items-center gap-2">
              <span className="font-medium">{ticker.symbol}</span>
              <span>${ticker.price.toLocaleString()}</span>
              <span 
                className={cn(
                  "flex items-center gap-0.5 text-xs",
                  ticker.change >= 0 ? "text-gain" : "text-loss"
                )}
              >
                {ticker.change >= 0 ? (
                  <ArrowUp size={12} />
                ) : (
                  <ArrowDown size={12} />
                )}
                {Math.abs(ticker.changePercent)}%
              </span>
            </div>
          ))}
          {/* Duplicate for seamless animation */}
          {tickers.map((ticker) => (
            <div key={`${ticker.symbol}-dup`} className="flex items-center gap-2">
              <span className="font-medium">{ticker.symbol}</span>
              <span>${ticker.price.toLocaleString()}</span>
              <span 
                className={cn(
                  "flex items-center gap-0.5 text-xs",
                  ticker.change >= 0 ? "text-gain" : "text-loss"
                )}
              >
                {ticker.change >= 0 ? (
                  <ArrowUp size={12} />
                ) : (
                  <ArrowDown size={12} />
                )}
                {Math.abs(ticker.changePercent)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketTicker;
