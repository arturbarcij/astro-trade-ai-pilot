
import { useEffect, useState } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface TickerItem {
  symbol: string;
  price: number;
  change: number;
}

const MarketTicker = () => {
  // Mock data - would be replaced with real API data
  const [tickers, setTickers] = useState<TickerItem[]>([
    { symbol: "AAPL", price: 182.63, change: 1.25 },
    { symbol: "MSFT", price: 412.65, change: -2.31 },
    { symbol: "GOOGL", price: 172.48, change: 0.72 },
    { symbol: "AMZN", price: 184.29, change: -0.46 },
    { symbol: "TSLA", price: 173.80, change: 3.58 },
    { symbol: "NVDA", price: 867.32, change: 12.54 },
    { symbol: "META", price: 467.79, change: -1.03 },
    { symbol: "BTC", price: 58642.17, change: 523.45 },
    { symbol: "ETH", price: 3154.28, change: -53.22 },
  ]);

  // Simulate price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTickers((prevTickers) =>
        prevTickers.map((ticker) => {
          const changeDirection = Math.random() > 0.5 ? 1 : -1;
          const changeAmount = parseFloat((Math.random() * 0.5).toFixed(2));
          const newChange = parseFloat((ticker.change + changeDirection * changeAmount / 10).toFixed(2));
          const newPrice = parseFloat((ticker.price + changeDirection * changeAmount).toFixed(2));
          
          return {
            ...ticker,
            price: newPrice,
            change: newChange,
          };
        })
      );
    }, 3000);
    
    return () => clearInterval(interval);
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
                {Math.abs(ticker.change)}%
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
                {Math.abs(ticker.change)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketTicker;
