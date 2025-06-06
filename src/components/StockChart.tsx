
import { useEffect, useState } from "react";
import { 
  Area, 
  AreaChart, 
  CartesianGrid, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis 
} from "recharts";
import { Calendar, Clock, RefreshCw } from "lucide-react";
import { getStock, getStockChartData } from "@/services/marketDataService";
import { MarketDataPoint } from "@/lib/marketDataUtils";

interface StockChartProps {
  symbol: string;
  timeframe?: "1D" | "1W" | "1M" | "3M" | "1Y" | "ALL";
}

const StockChart = ({ symbol, timeframe = "1D" }: StockChartProps) => {
  const [data, setData] = useState<MarketDataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<"1D" | "1W" | "1M" | "3M" | "1Y" | "ALL">(timeframe);

  // Get chart data for the stock
  useEffect(() => {
    setLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      const chartData = getStockChartData(symbol, timeRange);
      setData(chartData);
      setLoading(false);
    }, 700);
  }, [timeRange, symbol]);
  
  // Get current stock information
  const stockInfo = getStock(symbol);
  
  // Calculate price change
  const priceChange = data.length > 1 
    ? data[data.length - 1].price - data[0].price 
    : 0;
  
  const priceChangePercent = data.length > 1 
    ? ((data[data.length - 1].price - data[0].price) / data[0].price) * 100 
    : 0;

  const isPriceUp = priceChange >= 0;
  const currentPrice = stockInfo?.price || 0;

  // Timeframe options
  const timeframes: ("1D" | "1W" | "1M" | "3M" | "1Y" | "ALL")[] = ["1D", "1W", "1M", "3M", "1Y", "ALL"];

  // Refresh chart data
  const handleRefresh = () => {
    setLoading(true);
    
    // Simulate API delay for refresh
    setTimeout(() => {
      const chartData = getStockChartData(symbol, timeRange);
      setData(chartData);
      setLoading(false);
    }, 700);
  };

  return (
    <div className="glass-card p-4 h-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold">{symbol}</h3>
            {loading ? (
              <div className="flex items-center">
                <span className="pulse-dot" />
                <span className="pulse-dot" />
                <span className="pulse-dot" />
              </div>
            ) : (
              <span className="text-silver text-sm">
                {stockInfo?.name || ""}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 text-lg">
            <span className="font-semibold">${currentPrice.toFixed(2)}</span>
            <span
              className={`text-sm flex items-center gap-1 ${
                isPriceUp ? "text-gain" : "text-loss"
              }`}
            >
              {isPriceUp ? "+" : ""}
              {priceChange.toFixed(2)} ({isPriceUp ? "+" : ""}
              {priceChangePercent.toFixed(2)}%)
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Clock size={14} className="text-muted-foreground" />
          <span className="text-muted-foreground text-sm">
            {new Date().toLocaleDateString()}
          </span>
          <button 
            className="ml-2 p-1 rounded-md hover:bg-space-light text-muted-foreground"
            onClick={handleRefresh}
          >
            <RefreshCw size={14} />
          </button>
        </div>
      </div>
      
      <div className="flex gap-2 mb-4">
        {timeframes.map((tf) => (
          <button
            key={tf}
            className={`px-3 py-1 text-xs rounded-md ${
              timeRange === tf
                ? "bg-space-accent text-white"
                : "bg-space-light text-silver hover:bg-space-light/70"
            }`}
            onClick={() => setTimeRange(tf)}
          >
            {tf}
          </button>
        ))}
      </div>
      
      <div className="h-[300px]">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="flex items-center gap-1">
              <span className="pulse-dot" />
              <span className="pulse-dot animation-delay-100" />
              <span className="pulse-dot animation-delay-200" />
            </div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 5,
                right: 10,
                left: 5,
                bottom: 5,
              }}
            >
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={isPriceUp ? "#22c55e" : "#ef4444"}
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor={isPriceUp ? "#22c55e" : "#ef4444"}
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="#2a3349" 
                vertical={false}
              />
              <XAxis 
                dataKey="time" 
                tick={{ fontSize: 10, fill: '#8b96cc' }} 
                axisLine={{ stroke: '#2a3349' }}
                tickLine={{ stroke: '#2a3349' }}
              />
              <YAxis 
                domain={['dataMin - 5', 'dataMax + 5']} 
                tick={{ fontSize: 10, fill: '#8b96cc' }} 
                axisLine={{ stroke: '#2a3349' }}
                tickLine={{ stroke: '#2a3349' }}
                width={40}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#10121e',
                  borderColor: '#2a3349',
                  borderRadius: '0.5rem',
                }}
                labelStyle={{ color: '#c1c8e4' }}
                itemStyle={{ color: isPriceUp ? '#22c55e' : '#ef4444' }}
                formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']}
                cursor={{ stroke: '#4361ee', strokeWidth: 1 }}
              />
              <Area
                type="monotone"
                dataKey="price"
                stroke={isPriceUp ? "#22c55e" : "#ef4444"}
                fillOpacity={1}
                fill="url(#colorPrice)"
                strokeWidth={2}
                activeDot={{ r: 6, stroke: isPriceUp ? "#22c55e" : "#ef4444", strokeWidth: 1, fill: '#1a1f35' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default StockChart;
