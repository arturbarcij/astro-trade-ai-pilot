
import { BarChart2, Bell, Book, Brain, ChartBarIcon, Globe, Home, MessageSquare, PieChart, Settings, User, Users } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "./ui/button";

const navItems = [
  { name: "Dashboard", icon: Home, path: "/" },
  { name: "Market", icon: BarChart2, path: "/market" },
  { name: "Analytics", icon: ChartBarIcon, path: "/analytics" },
  { name: "Portfolio", icon: PieChart, path: "/portfolio" },
  { name: "Assistant", icon: MessageSquare, path: "/assistant" },
  { name: "Learn", icon: Book, path: "/learn" },
  { name: "Community", icon: Users, path: "/community" },
  { name: "Account", icon: User, path: "/account" },
];

// Secondary menu items displayed at the bottom of the navbar
const secondaryItems = [
  { name: "Settings", icon: Settings, path: "/settings" },
  { name: "Global Markets", icon: Globe, path: "/global" },
];

const Navbar = () => {
  // Use location for active link highlighting
  const location = useLocation();
  const currentPath = location.pathname;
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div 
      className={cn(
        "bg-space-dark flex flex-col h-screen fixed left-0 z-10 border-r border-space-light transition-all duration-300",
        collapsed ? "w-16" : "w-16 md:w-64"
      )}
    >
      <div className="flex items-center gap-3 px-4 h-16 border-b border-space-light">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-cosmic to-purple-500">
          <span className="text-sm font-bold text-white">ΛI</span>
        </div>
        {!collapsed && (
          <h1 className="text-lg font-bold bg-gradient-to-r from-white to-silver bg-clip-text text-transparent hidden md:block">TradeSage</h1>
        )}
        <Button 
          variant="ghost" 
          className="ml-auto hidden md:flex h-8 w-8 p-0" 
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? ">" : "<"}
        </Button>
      </div>
      
      <nav className="flex-1 px-2 py-4 overflow-y-auto scrollbar-thin">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = currentPath === item.path;
            return (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200",
                    isActive
                      ? "bg-space-accent text-white shadow-lg shadow-space-accent/20"
                      : "hover:bg-space-light text-silver"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  <item.icon size={20} className={cn(isActive ? "text-white" : "text-silver")} />
                  {!collapsed && <span className="hidden md:block font-medium">{item.name}</span>}
                  {isActive && <span className="absolute left-0 w-1 h-6 bg-cosmic rounded-r-full" />}
                </Link>
              </li>
            );
          })}
        </ul>
        
        {/* Insights section */}
        <div className="mt-6 mb-4">
          <div className="flex items-center px-3 mb-2">
            <span className={cn("text-xs font-semibold uppercase text-muted-foreground", collapsed && "hidden")}>AI Insights</span>
          </div>
          <Link
            to="/insights"
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md hover:bg-space-light text-silver transition-colors",
              currentPath === "/insights" && "bg-space-light/50"
            )}
          >
            <Brain size={20} className="text-cosmic" />
            {!collapsed && <span className="hidden md:block">Predictions</span>}
          </Link>
        </div>
      </nav>
      
      <div className="p-2 border-t border-space-light">
        {secondaryItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-space-light text-silver transition-colors"
          >
            <item.icon size={20} />
            {!collapsed && <span className="hidden md:block">{item.name}</span>}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
