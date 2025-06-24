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

// Volatility factors - MORE VOLATILE SETTINGS FOR CURRENT MARKET
// Higher numbers = more volatile price movements
const NORMAL_VOLATILITY = 1.5; // Increased from 1.0
const HIGH_VOLATILITY = 2.0;   // Increased from 1.5
const MARKET_SHOCK = 4.0;      // Increased from 3.0
let currentVolatility = HIGH_VOLATILITY; // Start with high volatility

// Market trend bias (-1 to 1, where 1 is strongly bullish, -1 is strongly bearish)
let marketTrend = -0.2; // Slightly bearish market to start

// Interval IDs for simulation
let tickerUpdateInterval: number | null = null;
let volatilityUpdateInterval: number | null = null;

// Market events tracker
const MARKET_EVENTS = {
  VOLATILITY_SPIKE: "VOLATILITY_SPIKE",
  TREND_REVERSAL: "TREND_REVERSAL",
  SECTOR_ROTATION: "SECTOR_ROTATION",
  FLASH_CRASH: "FLASH_CRASH"
};

// History of market events
const marketEventHistory: Array<{type: string, timestamp: Date, description: string}> = [];

/**
 * Start the market data simulation
 */
export function startMarketSimulation() {
  if (tickerUpdateInterval) {
    clearInterval(tickerUpdateInterval);
  }
  
  // Update stock prices more frequently
  tickerUpdateInterval = setInterval(() => {
    updateMarketData();
  }, 2000) as unknown as number;
  
  // Update market conditions periodically (volatility, trends)
  volatilityUpdateInterval = setInterval(() => {
    updateMarketConditions();
  }, 30000) as unknown as number; // More frequent market condition changes
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
 * Update market volatility and trends with more extreme changes
 */
function updateMarketConditions() {
  // 10% chance of a volatility spike (market shock) - increased from 5%
  const shockEvent = Math.random() < 0.10;
  
  if (shockEvent) {
    console.log("Market shock event triggered");
    currentVolatility = MARKET_SHOCK;
    
    // Determine if shock is positive or negative
    const isPositive = Math.random() < 0.4; // More likely to be negative in volatile markets
    marketTrend = isPositive ? 0.8 : -0.8;
    
    // Add to event history
    marketEventHistory.push({
      type: MARKET_EVENTS.VOLATILITY_SPIKE,
      timestamp: new Date(),
      description: `Market volatility spiked${isPositive ? ' positively' : ' negatively'} with trend shift to ${marketTrend.toFixed(2)}`
    });
    
    // Reset after 2-5 updates
    setTimeout(() => {
      currentVolatility = HIGH_VOLATILITY;
      marketTrend = marketTrend / 1.5;
      
      // Then gradually return to normal
      setTimeout(() => {
        currentVolatility = NORMAL_VOLATILITY;
        marketTrend = marketTrend / 1.5;
      }, 20000 * (Math.floor(Math.random() * 3) + 2));
      
    }, 20000 * (Math.floor(Math.random() * 3) + 2));
  } else {
    // 15% chance of trend reversal - new feature
    if (Math.random() < 0.15) {
      marketTrend = -marketTrend * (0.5 + Math.random() * 0.5);
      
      marketEventHistory.push({
        type: MARKET_EVENTS.TREND_REVERSAL,
        timestamp: new Date(),
        description: `Market trend reversed to ${marketTrend > 0 ? 'bullish' : 'bearish'} (${marketTrend.toFixed(2)})`
      });
    } else {
      // Randomly adjust market trend - more variation
      marketTrend = Math.max(-0.8, Math.min(0.8, marketTrend + (Math.random() * 0.3 - 0.15)));
    }
    
    // 25% chance to shift volatility
    if (Math.random() < 0.25) {
      currentVolatility = Math.random() < 0.6 ? NORMAL_VOLATILITY : HIGH_VOLATILITY;
    }
  }
  
  // 8% chance of sector rotation event
  if (Math.random() < 0.08) {
    console.log("Sector rotation event triggered");
    
    // Identify which sectors will outperform and underperform
    const sectors = [...new Set(stocksData.map(stock => stock.sector))].filter(Boolean) as string[];
    const outperformingSectors = sectors
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.floor(sectors.length / 3));
      
    const underperformingSectors = sectors
      .filter(sector => !outperformingSectors.includes(sector))
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.floor(sectors.length / 3));
    
    marketEventHistory.push({
      type: MARKET_EVENTS.SECTOR_ROTATION,
      timestamp: new Date(),
      description: `Sector rotation: ${outperformingSectors.join(', ')} outperforming; ${underperformingSectors.join(', ')} underperforming`
    });
    
    // Update stocks in these sectors on next data update
    stocksData = stocksData.map(stock => {
      if (stock.sector && outperformingSectors.includes(stock.sector)) {
        return {
          ...stock,
          sectorBias: 0.3 // Positive bias for outperforming sectors
        };
      } else if (stock.sector && underperformingSectors.includes(stock.sector)) {
        return {
          ...stock,
          sectorBias: -0.3 // Negative bias for underperforming sectors
        };
      }
      return {
        ...stock,
        sectorBias: 0 // Neutral for other sectors
      };
    });
  }
  
  // 2% chance of flash crash - new feature
  if (Math.random() < 0.02) {
    console.log("Flash crash event triggered");
    
    // Temporary extreme negative trend
    const oldTrend = marketTrend;
    marketTrend = -0.95;
    
    marketEventHistory.push({
      type: MARKET_EVENTS.FLASH_CRASH,
      timestamp: new Date(),
      description: `Flash crash triggered with extreme negative trend (${marketTrend})`
    });
    
    // Update all stocks immediately with sharp drop
    updateMarketData();
    
    // Recover partially after a short time
    setTimeout(() => {
      marketTrend = oldTrend * 0.6;
      updateMarketData();
      
      // Return to previous trend after recovery
      setTimeout(() => {
        marketTrend = oldTrend;
      }, 10000);
    }, 5000);
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
  
  // Then update individual stocks with more volatile movements
  stocksData = stocksData.map(stock => {
    // Combine stock-specific volatility, sector influences, and market trends
    const volatilityFactor = (stock.volatility || 1) * currentVolatility;
    
    // Add sector bias and stock-specific factors
    let stockTrend = marketTrend;
    
    // Apply sector bias if exists
    if ((stock as any).sectorBias !== undefined) {
      stockTrend += (stock as any).sectorBias;
    }
    
    // Technology and Automotive sectors more volatile in current market
    if (stock.sector === "Technology" || stock.sector === "Automotive") {
      stockTrend = stockTrend * 1.5;
    }
    
    // Financial stocks affected differently in volatile markets
    if (stock.sector === "Financial Services") {
      stockTrend = stockTrend * 0.8;
    }
    
    // Generate more realistic price change
    const change = generatePriceChange(stock.price, volatilityFactor, stockTrend);
    const newPrice = parseFloat((stock.price + change).toFixed(2));
    
    // Calculate new changes with higher precision for larger movements
    const newChange = parseFloat((stock.change + change).toFixed(2));
    const newChangePercent = parseFloat(((newChange / (newPrice - newChange)) * 100).toFixed(2));
    
    // Calculate new volume - higher volatility means higher volume
    const volumeBase = parseInt(stock.volume.replace(/[KM]/g, ''));
    const volumeMultiplier = stock.volume.includes('M') ? 1000000 : 1000;
    const baseVolume = volumeBase * volumeMultiplier;
    
    // Volume increases with volatility and price changes
    const volumeChange = baseVolume * (Math.abs(change) / stock.price) * Math.random() * currentVolatility;
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
      volume: formattedVolume,
      sectorBias: (stock as any).sectorBias // Preserve sector bias if it exists
    };
  });
}

/**
 * Get market event history
 */
export function getMarketEventHistory() {
  return marketEventHistory;
}

/**
 * Get current volatility level as descriptive string
 */
export function getCurrentVolatilityDescription(): string {
  if (currentVolatility >= MARKET_SHOCK) {
    return "Extreme";
  } else if (currentVolatility >= HIGH_VOLATILITY) {
    return "High";
  } else {
    return "Normal";
  }
}

/**
 * Get current market trend as descriptive string
 */
export function getCurrentMarketTrend(): string {
  if (marketTrend > 0.5) {
    return "Strongly Bullish";
  } else if (marketTrend > 0.2) {
    return "Bullish";
  } else if (marketTrend > -0.2) {
    return "Neutral";
  } else if (marketTrend > -0.5) {
    return "Bearish";
  } else {
    return "Strongly Bearish";
  }
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
  
  // Initialize cache object if needed
  if (!stock.historical) {
    stock.historical = {};
  }

  // If data for this timeframe is cached, return it
  if (stock.historical[timeframe]) {
    return stock.historical[timeframe];
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
  
  // Generate and cache the data for this timeframe
  const data = generateHistoricalData(stock.price, days, stock.volatility || 0.7, timeframe);
  stock.historical[timeframe] = data;
  
  return data;
}

// Initialize the simulation
startMarketSimulation();
