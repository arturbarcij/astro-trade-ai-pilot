
import { ArrowDown, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface Holding {
  symbol: string;
  name: string;
  shares: number;
  price: number;
  change: number;
  value: number;
}

const TopHoldings = () => {
  // Mock data - would be replaced with real portfolio data
  const holdings: Holding[] = [
    {
      symbol: "AAPL",
      name: "Apple Inc.",
      shares: 10,
      price: 182.63,
      change: 1.25,
      value: 1826.30,
    },
    {
      symbol: "MSFT",
      name: "Microsoft Corp.",
      shares: 5,
      price: 412.65,
      change: -2.31,
      value: 2063.25,
    },
    {
      symbol: "GOOGL",
      name: "Alphabet Inc.",
      shares: 8,
      price: 172.48,
      change: 0.72,
      value: 1379.84,
    },
    {
      symbol: "AMZN",
      name: "Amazon.com Inc.",
      shares: 6,
      price: 184.29,
      change: -0.46,
      value: 1105.74,
    },
    {
      symbol: "NVDA",
      name: "NVIDIA Corp.",
      shares: 3,
      price: 867.32,
      change: 12.54,
      value: 2601.96,
    },
  ];

  return (
    <div className="glass-card p-4">
      <h3 className="text-lg font-semibold mb-4">Top Holdings</h3>
      <table className="data-table">
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Shares</th>
            <th>Price</th>
            <th>Change</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {holdings.map((holding) => (
            <tr key={holding.symbol} className="hover:bg-space/40">
              <td>
                <div>
                  <div className="font-medium">{holding.symbol}</div>
                  <div className="text-xs text-muted-foreground">{holding.name}</div>
                </div>
              </td>
              <td>{holding.shares}</td>
              <td>${holding.price.toFixed(2)}</td>
              <td
                className={cn(
                  holding.change >= 0 ? "text-gain" : "text-loss",
                  "flex items-center gap-0.5"
                )}
              >
                {holding.change >= 0 ? (
                  <ArrowUp size={14} />
                ) : (
                  <ArrowDown size={14} />
                )}
                {Math.abs(holding.change)}%
              </td>
              <td>${holding.value.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopHoldings;
