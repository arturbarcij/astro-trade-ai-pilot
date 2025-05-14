
import { format } from 'date-fns';

// Types for market data
export interface MarketDataPoint {
  time: string;
  price: number;
  volume?: number;
}

export interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: string;
  volatility?: number;  // Volatility factor (0-1)
  sector?: string;
  historical?: MarketDataPoint[];
}

export interface MarketIndex {
  name: string;
  value: number;
  change: number;
  changePercent: number;
  volatility?: number;  // Volatility factor (0-1)
}

// Constants for German market simulation
export const germanMarketHours = {
  open: 9, // 9 AM
  close: 17.5, // 5:30 PM
};

export const germanSectors = [
  "Technology",
  "Automotive",
  "Financial Services",
  "Healthcare",
  "Industrial", 
  "Consumer Goods",
  "Energy",
  "Utilities",
  "Telecommunications",
  "Materials"
];

// DAX 40 companies (simplified)
export const germanStocks: StockData[] = [
  { symbol: "ADS.DE", name: "Adidas AG", price: 213.45, change: 3.25, changePercent: 1.54, volume: "1.2M", volatility: 0.8, sector: "Consumer Goods" },
  { symbol: "ALV.DE", name: "Allianz SE", price: 248.63, change: -1.25, changePercent: -0.50, volume: "985K", volatility: 0.6, sector: "Financial Services" },
  { symbol: "BAS.DE", name: "BASF SE", price: 45.72, change: 0.42, changePercent: 0.92, volume: "2.3M", volatility: 0.7, sector: "Materials" },
  { symbol: "BAYN.DE", name: "Bayer AG", price: 28.51, change: -0.86, changePercent: -2.93, volume: "4.1M", volatility: 0.9, sector: "Healthcare" },
  { symbol: "BMW.DE", name: "Bayerische Motoren Werke AG", price: 95.32, change: 1.45, changePercent: 1.54, volume: "1.5M", volatility: 0.75, sector: "Automotive" },
  { symbol: "CON.DE", name: "Continental AG", price: 62.48, change: -1.24, changePercent: -1.95, volume: "873K", volatility: 0.85, sector: "Automotive" },
  { symbol: "DAI.DE", name: "Mercedes-Benz Group AG", price: 64.21, change: 0.87, changePercent: 1.37, volume: "1.8M", volatility: 0.8, sector: "Automotive" },
  { symbol: "DB1.DE", name: "Deutsche Börse AG", price: 188.54, change: 2.36, changePercent: 1.27, volume: "542K", volatility: 0.5, sector: "Financial Services" },
  { symbol: "DBK.DE", name: "Deutsche Bank AG", price: 14.79, change: 0.26, changePercent: 1.79, volume: "6.2M", volatility: 0.9, sector: "Financial Services" },
  { symbol: "DTE.DE", name: "Deutsche Telekom AG", price: 22.56, change: -0.14, changePercent: -0.62, volume: "3.4M", volatility: 0.4, sector: "Telecommunications" },
  { symbol: "EOAN.DE", name: "E.ON SE", price: 12.42, change: 0.06, changePercent: 0.49, volume: "2.8M", volatility: 0.5, sector: "Utilities" },
  { symbol: "HEI.DE", name: "HeidelbergCement AG", price: 84.36, change: 1.12, changePercent: 1.34, volume: "695K", volatility: 0.65, sector: "Materials" },
  { symbol: "HEN3.DE", name: "Henkel AG & Co KGaA", price: 79.88, change: -0.32, changePercent: -0.40, volume: "532K", volatility: 0.55, sector: "Consumer Goods" },
  { symbol: "IFX.DE", name: "Infineon Technologies AG", price: 32.41, change: 0.94, changePercent: 2.99, volume: "3.1M", volatility: 0.95, sector: "Technology" },
  { symbol: "MRK.DE", name: "Merck KGaA", price: 164.75, change: 2.85, changePercent: 1.76, volume: "423K", volatility: 0.7, sector: "Healthcare" },
  { symbol: "SAP.DE", name: "SAP SE", price: 176.45, change: 3.26, changePercent: 1.88, volume: "1.9M", volatility: 0.65, sector: "Technology" },
  { symbol: "SIE.DE", name: "Siemens AG", price: 167.32, change: -1.54, changePercent: -0.91, volume: "1.3M", volatility: 0.75, sector: "Industrial" },
  { symbol: "VOW3.DE", name: "Volkswagen AG", price: 108.74, change: 1.28, changePercent: 1.19, volume: "1.6M", volatility: 0.85, sector: "Automotive" },
];

// German market indices
export const germanIndices: MarketIndex[] = [
  { name: "DAX", value: 18765.25, change: 124.36, changePercent: 0.67, volatility: 0.7 },
  { name: "MDAX", value: 26548.42, change: -86.54, changePercent: -0.32, volatility: 0.75 },
  { name: "TecDAX", value: 3387.65, change: 42.21, changePercent: 1.26, volatility: 0.85 },
  { name: "SDAX", value: 14236.78, change: -24.56, changePercent: -0.17, volatility: 0.8 },
];

// Generate realistic price movements based on volatility
export function generatePriceChange(currentPrice: number, volatility: number = 0.7, trend: number = 0): number {
  // Base volatility - higher number means more movement
  const baseVolatility = 0.01;
  
  // Calculate the maximum percentage change based on volatility
  const maxChange = currentPrice * baseVolatility * volatility;
  
  // Generate a random change within the volatility range
  // trend parameter allows for biasing the movement up or down (-1 to 1)
  const randomFactor = (Math.random() * 2 - 1) + (trend * 0.5); // Between -1 and 1, shifted by trend
  
  // Calculate the actual change
  const change = maxChange * randomFactor;
  
  // Return price change with more precision for smaller price values
  return parseFloat(change.toFixed(currentPrice < 10 ? 3 : 2));
}

// Generate a historical dataset for a stock
export function generateHistoricalData(
  basePrice: number,
  days: number,
  volatility: number,
  timeframe: "1D" | "1W" | "1M" | "3M" | "1Y" | "ALL" = "1M"
): MarketDataPoint[] {
  const result: MarketDataPoint[] = [];
  const now = new Date();
  let currentPrice = basePrice;
  
  // Determine trend with some randomness but more likely to be consistent
  const overallTrend = (Math.random() * 2 - 1) * 0.4; // Between -0.4 and 0.4
  
  // Determine number of points and date increment based on timeframe
  let points = 0;
  let dateIncrement = 0;
  let timeFormat: (date: Date) => string;
  
  switch (timeframe) {
    case "1D":
      points = 24;
      dateIncrement = 1/24; // hourly for a day
      timeFormat = (date) => format(date, 'HH:mm');
      break;
    case "1W":
      points = 7;
      dateIncrement = 1; // daily for a week
      timeFormat = (date) => format(date, 'EEE');
      break;
    case "1M":
      points = 30;
      dateIncrement = 1; // daily for a month
      timeFormat = (date) => format(date, 'dd/MM');
      break;
    case "3M":
      points = 12;
      dateIncrement = 7; // weekly for 3 months
      timeFormat = (date) => format(date, 'dd/MM');
      break;
    case "1Y":
      points = 12;
      dateIncrement = 30; // monthly for a year
      timeFormat = (date) => format(date, 'MMM');
      break;
    case "ALL":
      points = 10;
      dateIncrement = 365; // yearly
      timeFormat = (date) => format(date, 'yyyy');
      break;
  }
  
  // Generate data points
  for (let i = points; i >= 0; i--) {
    // Calculate date for this point
    const date = new Date();
    
    if (timeframe === "1D") {
      date.setHours(date.getHours() - i);
    } else {
      date.setDate(date.getDate() - (i * dateIncrement));
    }
    
    // Add some randomness to the trend based on how far we are in the dataset
    const pointTrend = overallTrend + ((Math.random() * 0.4) - 0.2);
    
    // Generate price change with trend influence
    const change = generatePriceChange(currentPrice, volatility, pointTrend);
    currentPrice = Math.max(0.1, currentPrice + change);
    
    // Add point to result
    result.push({
      time: timeFormat(date),
      price: parseFloat(currentPrice.toFixed(2)),
      volume: Math.floor(Math.random() * 1000000) + 100000,
    });
  }
  
  return result;
}

// Generate a market news item
export interface NewsItem {
  id: number;
  title: string;
  source: string;
  time: string;
  sentiment: "positive" | "negative" | "neutral";
  summary?: string;
  relatedSymbols?: string[];
}

export function generateMarketNews(): NewsItem[] {
  const news: NewsItem[] = [
    {
      id: 1,
      title: "ECB Signals Potential Further Rate Cuts",
      source: "Financial Times",
      time: "2 hours ago",
      sentiment: "positive",
      summary: "The European Central Bank has indicated it may continue its rate-cutting cycle in the coming months as inflation pressures ease across the eurozone. Markets responded positively, with German bonds rallying.",
      relatedSymbols: ["DBK.DE", "ALV.DE"]
    },
    {
      id: 2,
      title: "Volkswagen Announces Restructuring Plan",
      source: "Handelsblatt",
      time: "5 hours ago",
      sentiment: "negative",
      summary: "Volkswagen has announced a major restructuring plan that could affect up to 15,000 jobs worldwide. The company cited increased competition and the transition to electric vehicles as key drivers behind the decision.",
      relatedSymbols: ["VOW3.DE"]
    },
    {
      id: 3,
      title: "German Manufacturing PMI Stabilizes",
      source: "Bloomberg",
      time: "8 hours ago",
      sentiment: "neutral",
      summary: "The latest German Manufacturing PMI data shows stabilization after months of contraction. While still below the 50-point expansion threshold, analysts see this as a potential sign of bottoming out in the industrial sector.",
      relatedSymbols: ["SIE.DE", "BAS.DE"]
    },
    {
      id: 4,
      title: "SAP Reports Strong Cloud Revenue Growth",
      source: "Reuters",
      time: "12 hours ago",
      sentiment: "positive",
      summary: "SAP has reported better-than-expected quarterly results, driven by accelerating cloud revenue growth. The company has raised its full-year outlook, citing strong enterprise demand for digital transformation solutions.",
      relatedSymbols: ["SAP.DE"]
    },
    {
      id: 5,
      title: "German Consumer Confidence Index Declines",
      source: "CNBC",
      time: "1 day ago",
      sentiment: "negative",
      summary: "The GfK Consumer Confidence Index has fallen for the second consecutive month, reflecting growing concerns about economic conditions and household finances among German consumers.",
      relatedSymbols: ["ADS.DE", "HEN3.DE"]
    },
    {
      id: 6,
      title: "Siemens Energy Secures Major Wind Turbine Contract",
      source: "Die Welt",
      time: "1 day ago",
      sentiment: "positive",
      summary: "Siemens Energy has announced a significant offshore wind turbine contract worth over €2 billion. The deal represents one of the largest orders in the company's history.",
      relatedSymbols: ["SIE.DE"]
    },
    {
      id: 7,
      title: "Deutsche Bank Faces Regulatory Investigation",
      source: "Der Spiegel",
      time: "2 days ago",
      sentiment: "negative",
      summary: "Germany's financial regulator BaFin has launched an investigation into Deutsche Bank's risk management practices following a series of compliance concerns raised by whistleblowers.",
      relatedSymbols: ["DBK.DE"]
    },
  ];
  
  return news;
}
