
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart2, ChartBarIcon, PieChart } from "lucide-react";

const Analytics = () => {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-silver bg-clip-text text-transparent">Analytics</h1>
          <p className="text-silver">Insights and analysis for your investments</p>
        </div>
        <div className="flex gap-2">
          <select className="bg-space-light border border-space-accent/30 rounded-md px-3 py-1.5 text-sm text-silver">
            <option value="1d">Last 24h</option>
            <option value="7d">Last 7 days</option>
            <option value="1m" selected>Last 30 days</option>
            <option value="3m">Last 3 months</option>
            <option value="1y">Last year</option>
            <option value="all">All time</option>
          </select>
        </div>
      </div>

      <div className="glass-card p-6 mb-6 border-cosmic/20 shadow-lg shadow-cosmic/5">
        <h2 className="text-xl font-medium mb-4 flex items-center gap-2">
          <span className="inline-block w-1.5 h-6 bg-cosmic rounded-full mr-2"></span>
          Market Performance Analysis
        </h2>
        <p className="text-silver mb-6">
          Visualize and analyze market trends, portfolio performance, and optimization opportunities
          with our advanced analytics tools.
        </p>

        <Tabs defaultValue="performance">
          <TabsList className="mb-4 bg-space p-1">
            <TabsTrigger value="performance" className="flex items-center gap-2 data-[state=active]:bg-space-accent/20 data-[state=active]:text-cosmic">
              <BarChart2 className="h-4 w-4" />
              Performance
            </TabsTrigger>
            <TabsTrigger value="sectors" className="flex items-center gap-2 data-[state=active]:bg-space-accent/20 data-[state=active]:text-cosmic">
              <PieChart className="h-4 w-4" />
              Sector Analysis
            </TabsTrigger>
            <TabsTrigger value="trends" className="flex items-center gap-2 data-[state=active]:bg-space-accent/20 data-[state=active]:text-cosmic">
              <ChartBarIcon className="h-4 w-4" />
              Market Trends
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="performance" className="space-y-4 animate-fade-in">
            <div className="bg-space p-4 rounded-lg border border-space-light shadow-inner">
              <h3 className="text-lg font-medium mb-2">Portfolio Performance</h3>
              <p className="text-silver mb-4">
                Track the historical performance of your portfolio compared to major indices.
              </p>
              <div className="h-72 border border-space-light/40 rounded-md flex items-center justify-center bg-space-dark/30 backdrop-blur-sm">
                <div className="text-center">
                  <div className="text-cosmic mb-2 text-lg">Performance Metrics</div>
                  <p className="text-silver text-sm mb-4">Interactive chart visualization coming soon</p>
                  <div className="flex justify-center gap-8 text-center">
                    <div className="px-4">
                      <div className="text-white text-2xl font-bold">+12.4%</div>
                      <div className="text-silver text-xs">YTD Growth</div>
                    </div>
                    <div className="px-4 border-l border-space-light">
                      <div className="text-white text-2xl font-bold">€24.8K</div>
                      <div className="text-silver text-xs">Total Value</div>
                    </div>
                    <div className="px-4 border-l border-space-light">
                      <div className="text-white text-2xl font-bold">6.7%</div>
                      <div className="text-silver text-xs">Avg. Return</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="sectors" className="space-y-4 animate-fade-in">
            <div className="bg-space p-4 rounded-lg border border-space-light shadow-inner">
              <h3 className="text-lg font-medium mb-2">Sector Breakdown</h3>
              <p className="text-silver mb-4">
                Analyze your exposure to different market sectors and identify diversification opportunities.
              </p>
              <div className="h-72 border border-space-light/40 rounded-md flex items-center justify-center bg-space-dark/30 backdrop-blur-sm">
                <div className="text-center">
                  <div className="text-cosmic mb-2 text-lg">Sector Analysis</div>
                  <p className="text-silver text-sm mb-4">Interactive sector breakdown coming soon</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto">
                    {['Technology', 'Finance', 'Healthcare', 'Energy'].map(sector => (
                      <div key={sector} className="bg-space-light/50 p-2 rounded-md">
                        <div className="text-white font-medium">{sector}</div>
                        <div className="text-cosmic">{Math.floor(Math.random() * 30 + 10)}%</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="trends" className="space-y-4 animate-fade-in">
            <div className="bg-space p-4 rounded-lg border border-space-light shadow-inner">
              <h3 className="text-lg font-medium mb-2">Market Trend Analysis</h3>
              <p className="text-silver mb-4">
                Identify emerging market trends and potential trading opportunities.
              </p>
              <div className="h-72 border border-space-light/40 rounded-md flex items-center justify-center bg-space-dark/30 backdrop-blur-sm">
                <div className="text-center">
                  <div className="text-cosmic mb-2 text-lg">Market Trends</div>
                  <p className="text-silver text-sm mb-4">Interactive trend analysis coming soon</p>
                  <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
                    {['DAX', 'MDAX', 'TecDAX', 'SDAX'].map(index => (
                      <div key={index} className="bg-space-light/50 p-3 rounded-md min-w-28">
                        <div className="text-white font-medium">{index}</div>
                        <div className={Math.random() > 0.5 ? "text-green-400" : "text-red-400"}>
                          {Math.random() > 0.5 ? "+" : "-"}{(Math.random() * 2).toFixed(2)}%
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-4 border-cosmic/10 shadow-lg shadow-cosmic/5 hover:shadow-cosmic/10 transition-shadow duration-300">
          <h3 className="text-lg font-medium mb-2 flex items-center">
            <span className="inline-block w-1 h-5 bg-cosmic rounded-full mr-2"></span>
            Risk Assessment
          </h3>
          <p className="text-silver mb-4">
            Evaluate the risk profile of your portfolio and individual assets.
          </p>
          <div className="h-48 border border-space-light/40 rounded-md flex items-center justify-center bg-space-dark/30 backdrop-blur-sm">
            <p className="text-silver text-sm">Risk metrics visualization will appear here</p>
          </div>
        </div>
        
        <div className="glass-card p-4 border-cosmic/10 shadow-lg shadow-cosmic/5 hover:shadow-cosmic/10 transition-shadow duration-300">
          <h3 className="text-lg font-medium mb-2 flex items-center">
            <span className="inline-block w-1 h-5 bg-cosmic rounded-full mr-2"></span>
            Performance Metrics
          </h3>
          <p className="text-silver mb-4">
            Monitor key performance indicators for your investment strategy.
          </p>
          <div className="h-48 border border-space-light/40 rounded-md flex items-center justify-center bg-space-dark/30 backdrop-blur-sm">
            <p className="text-silver text-sm">Performance metrics visualization will appear here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
