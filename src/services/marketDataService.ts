import { 
  germanStocks, 
  germanIndices, 
  generatePriceChange, 
  generateHistoricalData,
  StockData,
  MarketIndex,
  MarketDataPoint
} from "@/lib/marketDataUtils";

// In-memory store for simulated market data
let stocksData: StockData[] = [...germanStocks];
let indicesData: MarketIndex[] = [...germanIndices];
let selectedStock: string = "SAP.DE"; // Default selected stock

// Volatility factors
// Higher numbers = more volatile price movements
const NORMAL_VOLATILITY = 1.0;
const HIGH_VOLATILITY = 1.5;
const MARKET_SHOCK = 3.0;
let currentVolatility = NORMAL_VOLATILITY;

// Market trend bias (-1 to 1, where 1 is strongly bullish, -1 is strongly bearish)
let marketTrend = 0.1; // Slightly bullish by default

// Interval IDs for simulation
let tickerUpdateInterval: number | null = null;
let volatilityUpdateInterval: number | null = null;

/**
 * Start the market data simulation
 */
export function startMarketSimulation() {
  if (tickerUpdateInterval) {
    clearInterval(tickerUpdateInterval);
  }
  
  // Update stock prices every 3 seconds
  tickerUpdateInterval = setInterval(() => {
    updateMarketData();
  }, 3000) as unknown as number;
  
  // Update market conditions periodically (volatility, trends)
  volatilityUpdateInterval = setInterval(() => {
    updateMarketConditions();
  }, 60000) as unknown as number;
}

/**
 * Stop the market data simulation
 */
export function stopMarketSimulation() {
  if (tickerUpdateInterval) {
    clearInterval(tickerUpdateInterval);
    tickerUpdateInterval = null;
  }
  
  if (volatilityUpdateInterval) {
    clearInterval(volatilityUpdateInterval);
    volatilityUpdateInterval = null;
  }
}

/**
 * Update market volatility and trends
 */
function updateMarketConditions() {
  // 5% chance of a volatility spike (market shock)
  const shockEvent = Math.random() < 0.05;
  
  if (shockEvent) {
    console.log("Market shock event triggered");
    currentVolatility = MARKET_SHOCK;
    
    // Determine if shock is positive or negative
    marketTrend = Math.random() < 0.5 ? -0.7 : 0.7;
    
    // Reset after 2-5 updates
    setTimeout(() => {
      currentVolatility = HIGH_VOLATILITY;
      marketTrend = marketTrend / 2;
      
      // Then gradually return to normal
      setTimeout(() => {
        currentVolatility = NORMAL_VOLATILITY;
        marketTrend = marketTrend / 2;
      }, 60000 * (Math.floor(Math.random() * 3) + 2));
      
    }, 60000 * (Math.floor(Math.random() * 3) + 2));
  } else {
    // Randomly adjust market trend
    marketTrend = Math.max(-0.5, Math.min(0.5, marketTrend + (Math.random() * 0.2 - 0.1)));
    
    // 20% chance to shift volatility
    if (Math.random() < 0.2) {
      currentVolatility = Math.random() < 0.7 ? NORMAL_VOLATILITY : HIGH_VOLATILITY;
    }
  }
  
  console.log(`Market conditions updated: Volatility=${currentVolatility.toFixed(2)}, Trend=${marketTrend.toFixed(2)}`);
}

/**
 * Update all market data based on current conditions
 */
function updateMarketData() {
  // Update indices first
  indicesData = indicesData.map(index => {
    // Apply both index-specific volatility and current market conditions
    const volatilityFactor = (index.volatility || 1) * currentVolatility;
    const change = generatePriceChange(index.value, volatilityFactor, marketTrend);
    const newValue = parseFloat((index.value + change).toFixed(2));
    
    const newChange = parseFloat((index.change + change).toFixed(2));
    const newChangePercent = parseFloat(((newChange / (newValue - newChange)) * 100).toFixed(2));
    
    return {
      ...index,
      value: newValue,
      change: newChange,
      changePercent: newChangePercent
    };
  });
  
  // Then update individual stocks
  stocksData = stocksData.map(stock => {
    // Combine stock-specific volatility, sector influences, and market trends
    const volatilityFactor = (stock.volatility || 1) * currentVolatility;
    
    // Add sector bias (some sectors might move together)
    let stockTrend = marketTrend;
    
    // Technology stocks might be more volatile
    if (stock.sector === "Technology" || stock.sector === "Automotive") {
      stockTrend = stockTrend * 1.2;
    }
    
    // Generate price change
    const change = generatePriceChange(stock.price, volatilityFactor, stockTrend);
    const newPrice = parseFloat((stock.price + change).toFixed(2));
    
    // Calculate new changes
    const newChange = parseFloat((stock.change + change).toFixed(2));
    const newChangePercent = parseFloat(((newChange / (newPrice - newChange)) * 100).toFixed(2));
    
    // Calculate new volume
    const volumeBase = parseInt(stock.volume.replace(/[KM]/g, ''));
    const volumeMultiplier = stock.volume.includes('M') ? 1000000 : 1000;
    const baseVolume = volumeBase * volumeMultiplier;
    
    // Volume increases with volatility and price changes
    const volumeChange = baseVolume * (Math.abs(change) / stock.price) * Math.random();
    const newVolume = Math.round(baseVolume + volumeChange);
    
    // Format the volume
    let formattedVolume = '';
    if (newVolume >= 1000000) {
      formattedVolume = (newVolume / 1000000).toFixed(1) + 'M';
    } else {
      formattedVolume = (newVolume / 1000).toFixed(1) + 'K';
    }
    
    return {
      ...stock,
      price: newPrice,
      change: newChange,
      changePercent: newChangePercent,
      volume: formattedVolume
    };
  });
}

/**
 * Get current market indices
 */
export function getMarketIndices(): MarketIndex[] {
  return indicesData;
}

/**
 * Get all stocks data
 */
export function getAllStocks(): StockData[] {
  return stocksData;
}

/**
 * Get a specific stock by symbol
 */
export function getStock(symbol: string): StockData | undefined {
  return stocksData.find(stock => stock.symbol === symbol);
}

/**
 * Set the selected stock symbol
 */
export function setSelectedStock(symbol: string) {
  selectedStock = symbol;
}

/**
 * Get the currently selected stock symbol
 */
export function getSelectedStock(): string {
  return selectedStock;
}

/**
 * Get historical chart data for a specific stock and timeframe
 */
export function getStockChartData(
  symbol: string, 
  timeframe: "1D" | "1W" | "1M" | "3M" | "1Y" | "ALL" = "1D"
): MarketDataPoint[] {
  const stock = getStock(symbol);
  
  if (!stock) {
    return [];
  }
  
  // If we already have historical data cached, return it
  if (stock.historical) {
    return stock.historical;
  }
  
  // Otherwise generate new historical data
  let days = 30; // default
  switch (timeframe) {
    case "1D": days = 1; break;
    case "1W": days = 7; break;
    case "1M": days = 30; break;
    case "3M": days = 90; break;
    case "1Y": days = 365; break;
    case "ALL": days = 1825; break; // 5 years
  }
  
  // Generate and cache the data
  const data = generateHistoricalData(stock.price, days, stock.volatility || 0.7, timeframe);
  stock.historical = data;
  
  return data;
}

// Initialize the simulation
startMarketSimulation();
