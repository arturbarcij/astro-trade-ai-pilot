
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
      content: "Hello! I'm your AI macroeconomic insights assistant. I provide educational analysis on economic data, central bank policies, inflation trends, employment statistics, and geopolitical developments. I focus on explaining economic phenomena and their underlying causes using credible sources like ECB, IMF, OECD, and FRED data.\n\nHow can I help you understand macroeconomic conditions today?\n\n*This output is for informational and educational purposes only. It does not constitute financial or investment advice.*",
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

    // Simulate AI response after delay
    setTimeout(() => {
      const responses: Record<string, string> = {
        "inflation": "Current inflationary pressures are primarily driven by several macroeconomic factors:\n\n1. **Supply Chain Disruptions**: Global supply chain bottlenecks continue to create cost-push inflation, particularly in manufacturing sectors.\n\n2. **Energy Costs**: Geopolitical tensions affect energy markets, influencing core inflation through transportation and production costs.\n\n3. **Labor Market Dynamics**: Tight labor markets in developed economies are creating wage pressures, though the Phillips Curve relationship shows varying strength across regions.\n\n4. **Monetary Policy Transmission**: Central bank policy rates affect inflation through multiple channels - credit costs, asset prices, and currency valuations.\n\nThe ECB and Fed closely monitor core PCE and HICP metrics to assess underlying price pressures beyond volatile food and energy components.\n\n*This output is for informational and educational purposes only. It does not constitute financial or investment advice.*",
        
        "fed": "The Federal Reserve's monetary policy operates through several key transmission mechanisms:\n\n**Primary Tools:**\n- Federal Funds Rate: Currently influences short-term borrowing costs across the economy\n- Quantitative Easing/Tightening: Affects long-term yields and credit conditions\n- Forward Guidance: Shapes market expectations about future policy paths\n\n**Economic Impact Channels:**\n1. **Credit Channel**: Rate changes affect lending standards and credit availability\n2. **Wealth Effects**: Asset price movements influence consumer spending patterns\n3. **Exchange Rate**: Dollar strength affects trade balances and import prices\n\nThe Fed's dual mandate focuses on price stability (2% inflation target) and maximum employment. Recent FOMC minutes suggest data-dependent policy adjustments based on labor market conditions and inflation persistence.\n\nKey indicators monitored include core PCE, unemployment rate, wage growth, and financial stability metrics.\n\n*This output is for informational and educational purposes only. It does not constitute financial or investment advice.*",
        
        "ecb": "The European Central Bank's monetary policy framework operates within the Eurozone's unique institutional structure:\n\n**Key Policy Tools:**\n- Main Refinancing Operations (MRO): Primary liquidity provision mechanism\n- Asset Purchase Programs: Government and corporate bond purchases\n- Targeted Longer-Term Refinancing Operations (TLTROs): Support bank lending\n\n**Transmission Mechanism Challenges:**\n1. **Heterogeneous Economies**: Different inflation dynamics across member states\n2. **Banking Union Progress**: Varying credit conditions between core and periphery\n3. **Fiscal Policy Coordination**: Limited federal fiscal capacity affects policy effectiveness\n\nRecent ECB communications emphasize data-dependent policy normalization, monitoring services inflation and wage settlements. The bank targets symmetric 2% inflation over the medium term, using HICP as the primary measure.\n\nGeopolitical developments and energy security concerns significantly influence ECB policy considerations.\n\n*This output is for informational and educational purposes only. It does not constitute financial or investment advice.*",
        
        "employment": "Employment data provides crucial insights into economic cycles and monetary policy effectiveness:\n\n**Key Metrics Analysis:**\n\n**United States (Bureau of Labor Statistics):**\n- Unemployment Rate: Currently reflects labor market tightness\n- Labor Force Participation: Shows structural employment trends\n- Job Openings and Labor Turnover Survey (JOLTS): Indicates demand-supply imbalances\n- Average Hourly Earnings: Measures wage inflation pressures\n\n**Eurozone (Eurostat):**\n- Harmonized unemployment rates vary significantly between member states\n- Youth unemployment remains elevated in southern European economies\n- Labor mobility constraints affect adjustment mechanisms\n\n**Economic Theory Applications:**\n- Phillips Curve relationship between unemployment and inflation shows varying strength\n- Natural rate of unemployment (NAIRU) estimates guide central bank policy\n- Okun's Law connects output gaps to employment changes\n\nStructural factors like automation, demographic changes, and skills mismatches influence long-term employment trends beyond cyclical variations.\n\n*This output is for informational and educational purposes only. It does not constitute financial or investment advice.*",
        
        "gdp": "Gross Domestic Product analysis reveals underlying economic growth dynamics:\n\n**GDP Components (Expenditure Approach):**\n1. **Consumption (C)**: Largest component, influenced by income, wealth, and confidence\n2. **Investment (I)**: Business capital formation and residential construction\n3. **Government Spending (G)**: Fiscal policy impact on aggregate demand\n4. **Net Exports (NX)**: Trade balance effects on growth\n\n**Real vs. Nominal GDP:**\n- Real GDP adjusts for price changes, showing actual economic activity\n- GDP deflator measures broad price changes across the economy\n- Potential GDP estimates guide output gap calculations\n\n**International Comparisons:**\n- OECD data shows varying growth patterns across developed economies\n- Purchasing Power Parity (PPP) adjustments enable cross-country analysis\n- Productivity growth drives long-term living standard improvements\n\n**Recession Indicators:**\n- Two consecutive quarters of negative growth (technical definition)\n- NBER uses broader criteria including employment, income, and industrial production\n\nQuarterly GDP revisions can significantly alter economic narratives, emphasizing data uncertainty in real-time analysis.\n\n*This output is for informational and educational purposes only. It does not constitute financial or investment advice.*"
      };

      // Generate AI response based on user input
      let responseContent = "I can provide educational insights on macroeconomic topics including:\n\n• **Central Bank Policies**: Fed, ECB, Bank of Japan monetary policy analysis\n• **Inflation Dynamics**: Core vs. headline inflation, wage-price spirals\n• **Employment Data**: Labor market indicators and unemployment trends\n• **GDP Analysis**: Growth components and business cycle indicators\n• **Geopolitical Economics**: How global events affect economic conditions\n\nCould you specify which macroeconomic topic you'd like me to explain? I focus on educational analysis using data from credible sources like FRED, IMF, OECD, and central bank research.\n\n*This output is for informational and educational purposes only. It does not constitute financial or investment advice.*";
      
      // Check if user message includes any keywords we have responses for
      const userLower = content.toLowerCase();
      for (const [keyword, response] of Object.entries(responses)) {
        if (userLower.includes(keyword) || userLower.includes(keyword.replace(/[^a-z]/g, ''))) {
          responseContent = response;
          break;
        }
      }

      const aiMessage: Message = {
        id: `assistant-${Date.now()}`,
        content: responseContent,
        sender: "assistant",
        timestamp: new Date(),
        hasAudio: Math.random() > 0.3, // More frequently enable audio for educational content
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
              <span className="text-xs text-silver">Educational Mode</span>
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
            Educational macroeconomic analysis • No investment advice
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
