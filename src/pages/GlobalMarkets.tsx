
import { useState } from "react";
import { ArrowDown, ArrowUp, Globe, Info, Map, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

// Mock global market data
const markets = [
  { 
    id: "us", 
    name: "United States", 
    indices: [
      { symbol: "SPX", name: "S&P 500", value: 5211.44, change: 0.28, volume: "4.2B" },
      { symbol: "IXIC", name: "NASDAQ", value: 16371.85, change: 0.43, volume: "5.1B" },
      { symbol: "DJI", name: "Dow Jones", value: 38996.35, change: -0.15, volume: "3.8B" }
    ] 
  },
  { 
    id: "eu", 
    name: "Europe", 
    indices: [
      { symbol: "DAX", name: "DAX 40", value: 18384.35, change: 0.61, volume: "2.3B" },
      { symbol: "CAC", name: "CAC 40", value: 8156.44, change: 0.32, volume: "1.8B" },
      { symbol: "UKX", name: "FTSE 100", value: 8241.38, change: -0.18, volume: "2.1B" }
    ] 
  },
  { 
    id: "asia", 
    name: "Asia", 
    indices: [
      { symbol: "N225", name: "Nikkei 225", value: 38854.07, change: 1.84, volume: "3.2B" },
      { symbol: "HSI", name: "Hang Seng", value: 17344.45, change: -0.72, volume: "2.7B" },
      { symbol: "SSEC", name: "Shanghai", value: 3044.18, change: 0.52, volume: "4.5B" }
    ] 
  }
];

// Currency data (major pairs)
const currencies = [
  { pair: "EUR/USD", value: 1.0846, change: -0.12 },
  { pair: "USD/JPY", value: 153.82, change: 0.28 },
  { pair: "GBP/USD", value: 1.2769, change: 0.05 },
  { pair: "USD/CHF", value: 0.8942, change: -0.21 },
  { pair: "USD/CAD", value: 1.3561, change: 0.14 },
  { pair: "AUD/USD", value: 0.6624, change: -0.08 }
];

// Economic calendar events
const economicEvents = [
  { 
    time: "08:30", 
    country: "US", 
    event: "Non-Farm Payrolls", 
    importance: "high",
    forecast: "+175K",
    previous: "+142K"
  },
  { 
    time: "10:00", 
    country: "EU", 
    event: "ECB Interest Rate Decision", 
    importance: "high",
    forecast: "4.25%",
    previous: "4.25%"
  },
  { 
    time: "12:30", 
    country: "UK", 
    event: "GDP (QoQ)", 
    importance: "medium",
    forecast: "0.2%",
    previous: "0.1%"
  },
  { 
    time: "14:30", 
    country: "US", 
    event: "Crude Oil Inventories", 
    importance: "medium",
    forecast: "-2.3M",
    previous: "+1.8M"
  }
];

const GlobalMarkets = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("markets");
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-silver bg-clip-text text-transparent">Global Markets</h1>
          <p className="text-silver">Track markets and economic data worldwide</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">Local Time: {new Date().toLocaleTimeString()}</span>
          <Button variant="outline" className="gap-2">
            <Globe size={16} />
            Change Region
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="markets" value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="bg-space p-1">
          <TabsTrigger value="markets" className="data-[state=active]:bg-space-accent/20 data-[state=active]:text-cosmic">
            Global Indices
          </TabsTrigger>
          <TabsTrigger value="forex" className="data-[state=active]:bg-space-accent/20 data-[state=active]:text-cosmic">
            Forex
          </TabsTrigger>
          <TabsTrigger value="calendar" className="data-[state=active]:bg-space-accent/20 data-[state=active]:text-cosmic">
            Economic Calendar
          </TabsTrigger>
          <TabsTrigger value="map" className="data-[state=active]:bg-space-accent/20 data-[state=active]:text-cosmic">
            Market Map
          </TabsTrigger>
        </TabsList>
        
        <div className="my-4 flex gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder={`Search ${activeTab === 'markets' ? 'indices' : activeTab === 'forex' ? 'currency pairs' : 'economic events'}...`} 
              className="pl-9 bg-space focus-visible:ring-cosmic"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <Button variant="outline">
            Filter
          </Button>
        </div>
        
        {/* Global Indices Tab */}
        <TabsContent value="markets" className="animate-fade-in">
          <div className="space-y-6">
            {markets.map((market) => (
              <div key={market.id} className="glass-card p-4">
                <h3 className="font-semibold mb-4">{market.name} Markets</h3>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[600px]">
                    <thead>
                      <tr className="border-b border-space-light">
                        <th className="text-left py-2 px-3 text-sm font-medium">Index</th>
                        <th className="text-right py-2 px-3 text-sm font-medium">Last</th>
                        <th className="text-right py-2 px-3 text-sm font-medium">Change</th>
                        <th className="text-right py-2 px-3 text-sm font-medium">Volume</th>
                      </tr>
                    </thead>
                    <tbody>
                      {market.indices.map((index) => (
                        <tr key={index.symbol} className="hover:bg-space/40">
                          <td className="py-3 px-3">
                            <div className="font-medium">{index.symbol}</div>
                            <div className="text-xs text-muted-foreground">{index.name}</div>
                          </td>
                          <td className="text-right py-3 px-3">{index.value.toLocaleString()}</td>
                          <td className={cn(
                            "text-right py-3 px-3 flex items-center justify-end gap-1",
                            index.change >= 0 ? "text-gain" : "text-loss"
                          )}>
                            {index.change >= 0 ? (
                              <ArrowUp size={14} />
                            ) : (
                              <ArrowDown size={14} />
                            )}
                            {Math.abs(index.change)}%
                          </td>
                          <td className="text-right py-3 px-3 text-muted-foreground">{index.volume}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
        
        {/* Forex Tab */}
        <TabsContent value="forex" className="animate-fade-in">
          <div className="glass-card p-4">
            <h3 className="font-semibold mb-4">Major Currency Pairs</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currencies.map((currency) => (
                <div 
                  key={currency.pair} 
                  className="bg-space p-4 rounded-lg border border-space-light hover:border-cosmic/30 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{currency.pair}</span>
                    <span className={cn(
                      "flex items-center gap-1 text-sm",
                      currency.change >= 0 ? "text-gain" : "text-loss"
                    )}>
                      {currency.change >= 0 ? (
                        <ArrowUp size={14} />
                      ) : (
                        <ArrowDown size={14} />
                      )}
                      {Math.abs(currency.change)}%
                    </span>
                  </div>
                  <div className="text-2xl font-semibold">{currency.value.toFixed(4)}</div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
        
        {/* Economic Calendar Tab */}
        <TabsContent value="calendar" className="animate-fade-in">
          <div className="glass-card p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Today's Economic Events</h3>
              <Button variant="outline" size="sm">
                Next 7 Days
              </Button>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-space-light">
                  <th className="text-left py-2 px-3 text-sm font-medium">Time</th>
                  <th className="text-left py-2 px-3 text-sm font-medium">Country</th>
                  <th className="text-left py-2 px-3 text-sm font-medium">Event</th>
                  <th className="text-center py-2 px-3 text-sm font-medium">Importance</th>
                  <th className="text-right py-2 px-3 text-sm font-medium">Forecast</th>
                  <th className="text-right py-2 px-3 text-sm font-medium">Previous</th>
                </tr>
              </thead>
              <tbody>
                {economicEvents.map((event, idx) => (
                  <tr key={idx} className="hover:bg-space/40">
                    <td className="py-3 px-3">{event.time}</td>
                    <td className="py-3 px-3">{event.country}</td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1">
                        {event.event}
                        <Info size={14} className="text-muted-foreground cursor-help" />
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex justify-center">
                        <span className={cn(
                          "inline-block h-2 w-2 rounded-full",
                          event.importance === "high" ? "bg-red-500" : 
                          event.importance === "medium" ? "bg-amber-500" : "bg-blue-500"
                        )}></span>
                      </div>
                    </td>
                    <td className="text-right py-3 px-3">{event.forecast}</td>
                    <td className="text-right py-3 px-3">{event.previous}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
        
        {/* Market Map Tab */}
        <TabsContent value="map" className="animate-fade-in">
          <div className="glass-card p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Map size={20} className="text-cosmic" />
              <h3 className="font-semibold">Global Market Heat Map</h3>
            </div>
            <div className="h-[400px] flex items-center justify-center bg-space-dark/30 rounded-md border border-dashed border-space-light">
              <div className="text-center">
                <p className="text-muted-foreground mb-2">Interactive global market heat map coming soon</p>
                <p className="text-xs text-muted-foreground">Visualize market performance across regions</p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GlobalMarkets;
