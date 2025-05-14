
import { BarChart2, Chart, Home, MessageSquare, PieChart, Settings, User } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Dashboard", icon: Home, path: "/" },
  { name: "Market", icon: BarChart2, path: "/market" },
  { name: "Analytics", icon: Chart, path: "/analytics" },
  { name: "Portfolio", icon: PieChart, path: "/portfolio" },
  { name: "Assistant", icon: MessageSquare, path: "/assistant" },
  { name: "Account", icon: User, path: "/account" },
];

const Navbar = () => {
  // Get current path to highlight active link
  const currentPath = window.location.pathname;

  return (
    <div className="bg-space-dark w-16 md:w-64 flex flex-col h-screen fixed left-0 z-10 border-r border-space-light">
      <div className="flex items-center gap-3 px-4 h-16 border-b border-space-light">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-cosmic">
          <span className="text-sm font-bold text-white">ΛI</span>
        </div>
        <h1 className="text-lg font-bold text-white hidden md:block">TradeSage</h1>
      </div>
      <nav className="flex-1 px-2 py-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                  currentPath === item.path
                    ? "bg-space-accent text-white"
                    : "hover:bg-space-light text-silver"
                )}
              >
                <item.icon size={20} />
                <span className="hidden md:block">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-space-light">
        <Link
          to="/settings"
          className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-space-light text-silver transition-colors"
        >
          <Settings size={20} />
          <span className="hidden md:block">Settings</span>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
