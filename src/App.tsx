
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Market from "./pages/Market";
import Portfolio from "./pages/Portfolio";
import Assistant from "./pages/Assistant";
import Account from "./pages/Account";
import Analytics from "./pages/Analytics";
import NotFound from "./pages/NotFound";
import Notifications from "./components/Notifications";
import LearnPage from "./pages/Learn";
import CommunityPage from "./pages/Community";
import InsightsPage from "./pages/Insights";
import GlobalMarkets from "./pages/GlobalMarkets";
import SettingsPage from "./pages/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex min-h-screen">
          <Navbar />
          <div className="flex-1 pl-16 md:pl-64">
            <Notifications />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/market" element={<Market />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/assistant" element={<Assistant />} />
              <Route path="/account" element={<Account />} />
              <Route path="/learn" element={<LearnPage />} />
              <Route path="/community" element={<CommunityPage />} />
              <Route path="/insights" element={<InsightsPage />} />
              <Route path="/global" element={<GlobalMarkets />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
