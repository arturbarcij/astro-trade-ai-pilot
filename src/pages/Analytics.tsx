
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Chart, ChartBar, ChartPie } from "lucide-react";

const Analytics = () => {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Analytics</h1>
      </div>

      <div className="glass-card p-6 mb-6">
        <h2 className="text-xl font-medium mb-4">Market Performance Analysis</h2>
        <p className="text-silver mb-6">
          Visualize and analyze market trends, portfolio performance, and optimization opportunities
          with our advanced analytics tools.
        </p>

        <Tabs defaultValue="performance">
          <TabsList className="mb-4">
            <TabsTrigger value="performance" className="flex items-center gap-2">
              <Chart className="h-4 w-4" />
              Performance
            </TabsTrigger>
            <TabsTrigger value="sectors" className="flex items-center gap-2">
              <ChartPie className="h-4 w-4" />
              Sector Analysis
            </TabsTrigger>
            <TabsTrigger value="trends" className="flex items-center gap-2">
              <ChartBar className="h-4 w-4" />
              Market Trends
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="performance" className="space-y-4">
            <div className="bg-space p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Portfolio Performance</h3>
              <p className="text-silver mb-4">
                Track the historical performance of your portfolio compared to major indices.
              </p>
              <div className="h-64 border border-space-light rounded-md flex items-center justify-center">
                <p className="text-silver text-sm">Performance analysis visualization will appear here</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="sectors" className="space-y-4">
            <div className="bg-space p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Sector Breakdown</h3>
              <p className="text-silver mb-4">
                Analyze your exposure to different market sectors and identify diversification opportunities.
              </p>
              <div className="h-64 border border-space-light rounded-md flex items-center justify-center">
                <p className="text-silver text-sm">Sector breakdown visualization will appear here</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="trends" className="space-y-4">
            <div className="bg-space p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Market Trend Analysis</h3>
              <p className="text-silver mb-4">
                Identify emerging market trends and potential trading opportunities.
              </p>
              <div className="h-64 border border-space-light rounded-md flex items-center justify-center">
                <p className="text-silver text-sm">Market trends visualization will appear here</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-4">
          <h3 className="text-lg font-medium mb-2">Risk Assessment</h3>
          <p className="text-silver mb-4">
            Evaluate the risk profile of your portfolio and individual assets.
          </p>
          <div className="h-48 border border-space-light rounded-md flex items-center justify-center">
            <p className="text-silver text-sm">Risk metrics will appear here</p>
          </div>
        </div>
        
        <div className="glass-card p-4">
          <h3 className="text-lg font-medium mb-2">Performance Metrics</h3>
          <p className="text-silver mb-4">
            Monitor key performance indicators for your investment strategy.
          </p>
          <div className="h-48 border border-space-light rounded-md flex items-center justify-center">
            <p className="text-silver text-sm">Performance metrics will appear here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
