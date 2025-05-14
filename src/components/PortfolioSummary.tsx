
import { ArrowDown, ArrowUp, DollarSign, Percent } from "lucide-react";
import { cn } from "@/lib/utils";

interface PortfolioSummaryProps {
  totalValue: number;
  dailyChange: number;
  totalProfit: number;
  profitPercent: number;
}

const PortfolioSummary = ({
  totalValue,
  dailyChange,
  totalProfit,
  profitPercent,
}: PortfolioSummaryProps) => {
  const isDailyPositive = dailyChange >= 0;
  const isTotalProfitPositive = totalProfit >= 0;

  return (
    <div className="glass-card p-4">
      <h3 className="text-lg font-semibold mb-4">Portfolio Summary</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="text-sm text-silver mb-1 flex items-center gap-1">
            <DollarSign size={14} />
            Total Value
          </div>
          <div className="text-2xl font-bold">${totalValue.toLocaleString()}</div>
          <div 
            className={cn(
              "text-sm flex items-center gap-0.5 mt-1",
              isDailyPositive ? "text-gain" : "text-loss"
            )}
          >
            {isDailyPositive ? (
              <ArrowUp size={14} />
            ) : (
              <ArrowDown size={14} />
            )}
            <span>
              {isDailyPositive ? "+" : ""}${Math.abs(dailyChange).toLocaleString()} today
            </span>
          </div>
        </div>
        <div>
          <div className="text-sm text-silver mb-1 flex items-center gap-1">
            <Percent size={14} />
            Total Return
          </div>
          <div 
            className={cn(
              "text-2xl font-bold",
              isTotalProfitPositive ? "text-gain" : "text-loss"
            )}
          >
            {isTotalProfitPositive ? "+" : "-"}${Math.abs(totalProfit).toLocaleString()}
          </div>
          <div 
            className={cn(
              "text-sm flex items-center gap-0.5 mt-1",
              isTotalProfitPositive ? "text-gain" : "text-loss"
            )}
          >
            {isTotalProfitPositive ? (
              <ArrowUp size={14} />
            ) : (
              <ArrowDown size={14} />
            )}
            <span>
              {isTotalProfitPositive ? "+" : ""}
              {profitPercent.toFixed(2)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioSummary;
