
import { useEffect, useState } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { StockData } from "@/lib/marketDataUtils";
import { getAllStocks, startMarketSimulation, stopMarketSimulation } from "@/services/marketDataService";

const MarketTicker = () => {
  const [tickers, setTickers] = useState<StockData[]>([]);
  const [isAnimating, setIsAnimating] = useState<boolean>(true);

  // Initialize ticker with our German market data
  useEffect(() => {
    // Get initial data
    setTickers(getAllStocks());
    
    // Start market simulation if not already running
    startMarketSimulation();
    
    // Set up interval to refresh ticker data
    const interval = setInterval(() => {
      setTickers(getAllStocks());
    }, 2000); // Update more frequently for smoother experience
    
    // Clean up
    return () => {
      clearInterval(interval);
      // We don't stop the market simulation here, as it's needed by other components
      // It will be stopped in main.tsx when the app unmounts
    };
  }, []);

  // Toggle ticker animation
  const toggleAnimation = () => {
    setIsAnimating(!isAnimating);
  };

  return (
    <div className="bg-space-dark h-12 overflow-hidden border-b border-space-light relative flex items-center">
      <div className="flex-shrink-0 bg-space-dark/90 pl-2 pr-4 py-1 border-r border-space-light z-10 flex items-center">
        <span className="text-space-accent font-semibold mr-2">LIVE</span>
        <div className="w-2 h-2 rounded-full bg-gain animate-pulse" />
      </div>
      
      <div className="absolute inset-0 flex items-center">
        <div 
          className={cn(
            "flex gap-8 ticker-wrap",
            isAnimating ? "ticker-animation" : ""
          )}
          style={{
            animationDuration: "120s", 
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
            animationDirection: "normal"
          }}
        >
          {tickers.map((ticker) => (
            <div key={ticker.symbol} className="flex items-center gap-2 ticker-item">
              <span className="font-medium text-silver">{ticker.symbol}</span>
              <span className="text-white">${ticker.price.toLocaleString()}</span>
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
                {Math.abs(ticker.changePercent).toFixed(2)}%
              </span>
            </div>
          ))}
          {/* Duplicate for seamless animation */}
          {tickers.map((ticker) => (
            <div key={`${ticker.symbol}-dup`} className="flex items-center gap-2 ticker-item">
              <span className="font-medium text-silver">{ticker.symbol}</span>
              <span className="text-white">${ticker.price.toLocaleString()}</span>
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
                {Math.abs(ticker.changePercent).toFixed(2)}%
              </span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="absolute right-0 top-0 bottom-0 flex items-center">
        <button 
          className="bg-space-dark/90 h-full px-3 border-l border-space-light text-space-accent hover:bg-space/60 transition-colors"
          onClick={toggleAnimation}
        >
          {isAnimating ? "❚❚" : "▶"}
        </button>
      </div>
      
      <style>{`
        @keyframes ticker {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .ticker-animation {
          animation-name: ticker;
        }
        
        .ticker-wrap {
          white-space: nowrap;
        }
        
        .ticker-item {
          display: inline-flex;
        }
      `}</style>
    </div>
  );
};

export default MarketTicker;
