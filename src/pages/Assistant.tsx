
import { useState, useRef, useEffect } from "react";
import ChatInput from "@/components/ChatInput";
import UserMessage from "@/components/UserMessage";
import AssistantMessage from "@/components/AssistantMessage";
import { Bot, Mic, Settings } from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "assistant";
  timestamp: Date;
  hasAudio?: boolean;
}

const Assistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hello! I'm your macroeconomic insights assistant. I provide **clear, concise, and educational summaries** of macroeconomic data and trends using information from sources like the ECB, IMF, OECD, and FRED.\n\nI can help you understand:\n• Inflation dynamics and monetary policy\n• Employment cycles and labor market trends\n• GDP components and economic growth patterns\n• Central bank policy decisions and their implications\n• Supply-demand imbalances and their economic effects\n\nWhat macroeconomic topic would you like to explore?\n\n*This output is for informational and educational purposes only. It does not constitute financial or investment advice.*",
      sender: "assistant",
      timestamp: new Date(),
      hasAudio: true,
    },
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateEconomicResponse = (userInput: string): string => {
    const input = userInput.toLowerCase().trim();
    
    // Handle short/ambiguous inputs by inferring economic context
    if (input.length < 10) {
      if (input.includes('fed') || input.includes('rates')) {
        return generateFedResponse();
      } else if (input.includes('inflation') || input.includes('prices')) {
        return generateInflationResponse();
      } else if (input.includes('job') || input.includes('employment')) {
        return generateEmploymentResponse();
      } else if (input.includes('gdp') || input.includes('growth')) {
        return generateGDPResponse();
      } else if (input.includes('ecb') || input.includes('europe')) {
        return generateECBResponse();
      }
    }

    // Detailed topic analysis
    if (input.includes('inflation') || input.includes('price') || input.includes('cpi') || input.includes('pce')) {
      return generateInflationResponse();
    }
    
    if (input.includes('fed') || input.includes('federal reserve') || input.includes('fomc') || input.includes('monetary policy')) {
      return generateFedResponse();
    }
    
    if (input.includes('ecb') || input.includes('european central bank') || input.includes('eurozone')) {
      return generateECBResponse();
    }
    
    if (input.includes('employment') || input.includes('unemployment') || input.includes('jobs') || input.includes('labor')) {
      return generateEmploymentResponse();
    }
    
    if (input.includes('gdp') || input.includes('growth') || input.includes('recession') || input.includes('expansion')) {
      return generateGDPResponse();
    }

    if (input.includes('supply') || input.includes('demand') || input.includes('chain') || input.includes('shortage')) {
      return generateSupplyDemandResponse();
    }

    if (input.includes('taylor') || input.includes('phillips') || input.includes('theory')) {
      return generateEconomicTheoryResponse();
    }

    // Default educational response for unclear inputs
    return "I can provide educational insights on various macroeconomic topics. Try asking about:\n\n• **Monetary Policy**: Fed or ECB decisions and their economic implications\n• **Inflation Dynamics**: Core vs. headline inflation trends and causes\n• **Labor Markets**: Employment data and wage growth patterns\n• **Economic Growth**: GDP components and business cycle analysis\n• **Supply-Demand**: Market imbalances and their economic effects\n\nPlease specify which topic interests you for a more detailed explanation.\n\n*This output is for informational and educational purposes only. It does not constitute financial or investment advice.*";
  };

  const generateInflationResponse = (): string => {
    return "**Current Inflation Dynamics:**\n\nInflation trends are driven by several key macroeconomic factors:\n\n• **Supply-Side Pressures**: Global supply chain disruptions continue affecting goods prices, particularly in manufacturing and transportation sectors\n• **Energy Components**: Energy price volatility influences both headline and core inflation through production and transportation costs\n• **Labor Market Effects**: Tight labor markets create wage pressures, though the *Phillips Curve* relationship shows varying strength across regions\n• **Monetary Transmission**: Central bank policy rates affect inflation through credit costs, asset valuations, and currency effects\n\n**Key Measures:**\n- **Core PCE/HICP**: Excludes volatile food and energy, showing underlying price trends\n- **Services Inflation**: Often more persistent due to wage components\n- **Goods Inflation**: More sensitive to supply chain and commodity price changes\n\nCentral banks target *symmetric 2% inflation* over the medium term, using these indicators to guide policy decisions.\n\n*This output is for informational and educational purposes only. It does not constitute financial or investment advice.*";
  };

  const generateFedResponse = (): string => {
    return "**Federal Reserve Monetary Policy Framework:**\n\nThe Fed operates under a **dual mandate** of price stability and maximum employment, using several transmission mechanisms:\n\n**Primary Policy Tools:**\n• **Federal Funds Rate**: Influences short-term borrowing costs across the economy\n• **Quantitative Operations**: Large-scale asset purchases affecting long-term yields\n• **Forward Guidance**: Communication strategy shaping market expectations\n\n**Economic Transmission Channels:**\n1. **Credit Channel**: Rate changes affect lending standards and credit availability\n2. **Wealth Effects**: Asset price movements influence consumer spending patterns\n3. **Exchange Rate**: Dollar strength affects trade balances and import price inflation\n\n**Key Economic Indicators Monitored:**\n- Core PCE inflation (2% target)\n- Unemployment rate and labor force participation\n- Average hourly earnings growth\n- Financial stability metrics\n\nFOMC decisions are *data-dependent*, adjusting policy based on evolving economic conditions rather than predetermined paths.\n\n*This output is for informational and educational purposes only. It does not constitute financial or investment advice.*";
  };

  const generateECBResponse = (): string => {
    return "**European Central Bank Policy Framework:**\n\nThe ECB's monetary policy operates within the Eurozone's unique institutional structure:\n\n**Key Policy Instruments:**\n• **Main Refinancing Operations (MRO)**: Primary liquidity provision mechanism\n• **Asset Purchase Programs**: Government and corporate bond purchases\n• **Targeted LTROs**: Support bank lending to the real economy\n\n**Unique Challenges:**\n- **Heterogeneous Economies**: Different inflation and growth dynamics across 20 member states\n- **Banking Union**: Varying credit conditions between core and periphery countries\n- **Fiscal Coordination**: Limited federal fiscal capacity affects policy effectiveness\n\n**Current Policy Focus:**\n- Symmetric **2% inflation target** over medium term\n- HICP as primary inflation measure\n- Data-dependent normalization process\n- Close monitoring of services inflation and wage settlements\n\nGeopolitical developments and energy security significantly influence ECB policy considerations, particularly regarding supply-side inflation pressures.\n\n*This output is for informational and educational purposes only. It does not constitute financial or investment advice.*";
  };

  const generateEmploymentResponse = (): string => {
    return "**Labor Market Analysis:**\n\nEmployment data provides crucial insights into economic cycles and policy effectiveness:\n\n**Key US Indicators (Bureau of Labor Statistics):**\n• **Unemployment Rate**: Currently reflecting labor market conditions\n• **Labor Force Participation**: Shows structural employment trends and demographic shifts\n• **JOLTS Survey**: Measures job openings and labor turnover, indicating demand-supply imbalances\n• **Average Hourly Earnings**: Tracks wage inflation pressures\n\n**Eurozone Metrics (Eurostat):**\n• Harmonized unemployment rates vary significantly between member states\n• Youth unemployment remains elevated in some southern European economies\n• Labor mobility constraints affect economic adjustment mechanisms\n\n**Economic Theory Applications:**\n- **Phillips Curve**: Relationship between unemployment and inflation, though strength varies over time\n- **NAIRU (Natural Rate)**: Estimates guide central bank policy on sustainable employment levels\n- **Okun's Law**: Links output gaps to employment changes\n\nStructural factors like automation, demographic changes, and skills mismatches influence long-term employment trends beyond cyclical variations.\n\n*This output is for informational and educational purposes only. It does not constitute financial or investment advice.*";
  };

  const generateGDPResponse = (): string => {
    return "**GDP Growth Analysis:**\n\nGross Domestic Product reveals underlying economic activity and business cycle dynamics:\n\n**Expenditure Components:**\n• **Consumption (C)**: Largest component, driven by income, wealth effects, and consumer confidence\n• **Investment (I)**: Business capital formation and residential construction, sensitive to interest rates\n• **Government Spending (G)**: Fiscal policy impact on aggregate demand\n• **Net Exports (NX)**: Trade balance effects, influenced by exchange rates and global demand\n\n**Key Analytical Concepts:**\n- **Real vs. Nominal GDP**: Real GDP adjusts for inflation, showing actual economic activity\n- **GDP Deflator**: Broad price measure across all economic sectors\n- **Potential GDP**: Maximum sustainable output, guides output gap calculations\n\n**Business Cycle Indicators:**\n- Technical recession: Two consecutive quarters of negative growth\n- NBER methodology: Uses broader criteria including employment, income, and industrial production\n- Productivity growth drives long-term living standard improvements\n\nQuarterly GDP revisions can significantly alter economic narratives, emphasizing data uncertainty in real-time analysis.\n\n*This output is for informational and educational purposes only. It does not constitute financial or investment advice.*";
  };

  const generateSupplyDemandResponse = (): string => {
    return "**Supply-Demand Economic Analysis:**\n\nMarket imbalances create significant macroeconomic effects through various channels:\n\n**Supply-Side Factors:**\n• **Global Supply Chains**: Disruptions affect production costs and delivery timelines\n• **Labor Supply**: Demographics, immigration, and participation rates influence wage dynamics\n• **Commodity Availability**: Energy and raw material constraints affect production capacity\n• **Technological Progress**: Productivity improvements can offset supply constraints\n\n**Demand-Side Dynamics:**\n• **Consumer Demand**: Driven by income, wealth effects, and confidence levels\n• **Business Investment**: Interest rates and profit expectations influence capital expenditure\n• **Government Spending**: Fiscal policy directly affects aggregate demand\n• **External Demand**: Export markets and global economic conditions\n\n**Economic Implications:**\n- Supply shortages typically create *cost-push inflation*\n- Excess demand leads to *demand-pull inflation*\n- Supply chain resilience affects economic stability\n- Structural changes may require policy adjustment\n\nCentral banks monitor these imbalances to distinguish between temporary and persistent economic pressures.\n\n*This output is for informational and educational purposes only. It does not constitute financial or investment advice.*";
  };

  const generateEconomicTheoryResponse = (): string => {
    return "**Key Economic Theory Applications:**\n\nMacroeconomic analysis relies on established theoretical frameworks:\n\n**Taylor Rule:**\n• Guides central bank interest rate decisions\n• Considers inflation gaps and output gaps\n• Provides benchmark for policy normalization\n• Accounts for neutral real interest rate estimates\n\n**Phillips Curve:**\n• Describes unemployment-inflation relationship\n• Short-run trade-offs vs. long-run neutrality\n• Expectations-augmented versions incorporate inflation expectations\n• Structural breaks during different economic periods\n\n**Okun's Law:**\n• Links output gaps to unemployment changes\n• Typically 2-3% GDP growth needed to reduce unemployment\n• Varies across countries and time periods\n• Useful for policy impact assessment\n\n**IS-LM Framework:**\n• Investment-Savings and Liquidity-Money equilibrium\n• Shows monetary and fiscal policy interactions\n• Explains transmission mechanisms\n• Foundation for modern DSGE models\n\nThese frameworks help interpret economic data and guide policy decisions, though real-world relationships often show structural changes requiring careful analysis.\n\n*This output is for informational and educational purposes only. It does not constitute financial or investment advice.*";
  };

  const handleSendMessage = (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    // Generate AI response based on new guidelines
    setTimeout(() => {
      const responseContent = generateEconomicResponse(content);
      
      const aiMessage: Message = {
        id: `assistant-${Date.now()}`,
        content: responseContent,
        sender: "assistant",
        timestamp: new Date(),
        hasAudio: Math.random() > 0.2, // Enable audio for most educational responses
      };
      
      setMessages((prev) => [...prev, aiMessage]);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-space-light bg-space-dark">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-cosmic flex items-center justify-center">
            <Bot size={18} className="text-white" />
          </div>
          <div>
            <h1 className="font-bold">Macroeconomic Insights Assistant</h1>
            <div className="flex items-center">
              <span className="h-1.5 w-1.5 rounded-full bg-gain mr-1.5"></span>
              <span className="text-xs text-silver">Educational Mode • ECB, IMF, OECD, FRED Data</span>
            </div>
          </div>
        </div>
        <button className="p-2 rounded-md hover:bg-space-light text-silver">
          <Settings size={18} />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          message.sender === "user" ? (
            <UserMessage 
              key={message.id} 
              content={message.content} 
              timestamp={message.timestamp} 
            />
          ) : (
            <AssistantMessage 
              key={message.id}
              content={message.content} 
              timestamp={message.timestamp}
              hasAudio={message.hasAudio}
            />
          )
        ))}
        
        {loading && (
          <div className="flex items-start gap-3 py-2">
            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-cosmic flex items-center justify-center text-white font-bold text-sm">
              AI
            </div>
            <div className="flex-1">
              <div className="bg-space-light text-silver p-4 rounded-lg rounded-tl-none w-fit">
                <div className="flex items-center gap-1">
                  <span className="pulse-dot"></span>
                  <span className="pulse-dot" style={{ animationDelay: "0.2s" }}></span>
                  <span className="pulse-dot" style={{ animationDelay: "0.4s" }}></span>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 border-t border-space-light bg-space/50 backdrop-blur-sm">
        <ChatInput onSendMessage={handleSendMessage} />
        <div className="flex justify-between items-center mt-2 px-2">
          <div className="text-xs text-muted-foreground">
            Educational macroeconomic analysis • Clear, concise insights • No investment advice
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Mic size={14} />
            <span>Voice enabled</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assistant;
