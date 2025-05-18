
import { useState } from "react";
import { Bell, Check, ChevronsUpDown, Globe, Moon, Palette, Save, Sun, User } from "lucide-react";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";

const SettingsPage = () => {
  const [colorScheme, setColorScheme] = useState("dark");
  const [fontSize, setFontSize] = useState("medium");
  const [highContrast, setHighContrast] = useState(false);
  const [animationReduced, setAnimationReduced] = useState(false);
  const [language, setLanguage] = useState("english");
  const [timezone, setTimezone] = useState("Europe/Berlin");
  
  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    priceAlerts: true,
    marketNews: true,
    portfolioUpdates: true,
    tradingSignals: false,
    economicEvents: true
  });
  
  const handleNotificationToggle = (key: keyof typeof notificationSettings) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-silver bg-clip-text text-transparent">Settings</h1>
          <p className="text-silver">Configure your trading platform preferences</p>
        </div>
        <Button className="gap-2">
          <Save size={16} />
          Save Changes
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs defaultValue="appearance" className="glass-card">
            <TabsList className="bg-space p-1 m-4">
              <TabsTrigger value="appearance" className="data-[state=active]:bg-space-accent/20 data-[state=active]:text-cosmic">
                Appearance
              </TabsTrigger>
              <TabsTrigger value="accessibility" className="data-[state=active]:bg-space-accent/20 data-[state=active]:text-cosmic">
                Accessibility
              </TabsTrigger>
              <TabsTrigger value="notifications" className="data-[state=active]:bg-space-accent/20 data-[state=active]:text-cosmic">
                Notifications
              </TabsTrigger>
              <TabsTrigger value="localization" className="data-[state=active]:bg-space-accent/20 data-[state=active]:text-cosmic">
                Localization
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="appearance" className="p-4 pt-0 animate-fade-in">
              <h3 className="text-lg font-medium mb-4">Appearance Settings</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-2">Color Scheme</h4>
                  <div className="flex gap-2">
                    <Button
                      variant={colorScheme === "dark" ? "default" : "outline"}
                      className="flex items-center gap-2 flex-1"
                      onClick={() => setColorScheme("dark")}
                    >
                      <Moon size={16} />
                      Dark
                      {colorScheme === "dark" && <Check size={14} className="ml-auto" />}
                    </Button>
                    
                    <Button
                      variant={colorScheme === "light" ? "default" : "outline"}
                      className="flex items-center gap-2 flex-1"
                      onClick={() => setColorScheme("light")}
                    >
                      <Sun size={16} />
                      Light
                      {colorScheme === "light" && <Check size={14} className="ml-auto" />}
                    </Button>
                    
                    <Button
                      variant={colorScheme === "system" ? "default" : "outline"}
                      className="flex items-center gap-2 flex-1"
                      onClick={() => setColorScheme("system")}
                    >
                      <Palette size={16} />
                      System
                      {colorScheme === "system" && <Check size={14} className="ml-auto" />}
                    </Button>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Theme Accent Color</h4>
                  <div className="grid grid-cols-6 gap-2">
                    {["#4361ee", "#7209B7", "#3DA5D9", "#FCA311", "#F72585", "#7BCC2A"].map((color) => (
                      <button
                        key={color}
                        className="h-10 rounded-md transition-transform hover:scale-105"
                        style={{ backgroundColor: color }}
                        aria-label={`Select ${color} as accent color`}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="bg-space-light/40 p-4 rounded-md">
                  <h4 className="font-medium mb-2">Chart Settings</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-sm">Default Chart Type</label>
                      <div className="flex items-center gap-2 bg-space rounded-md px-3 py-1.5">
                        <span className="text-sm">Candlestick</span>
                        <ChevronsUpDown size={14} />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm">Show Volume</label>
                      <Switch checked={true} />
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm">Show Extended Hours</label>
                      <Switch checked={false} />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="accessibility" className="p-4 pt-0 animate-fade-in">
              <h3 className="text-lg font-medium mb-4">Accessibility Settings</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-2">Text Size</h4>
                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      variant={fontSize === "small" ? "default" : "outline"}
                      className="flex items-center justify-center"
                      onClick={() => setFontSize("small")}
                    >
                      Small
                    </Button>
                    <Button
                      variant={fontSize === "medium" ? "default" : "outline"}
                      className="flex items-center justify-center"
                      onClick={() => setFontSize("medium")}
                    >
                      Medium
                    </Button>
                    <Button
                      variant={fontSize === "large" ? "default" : "outline"}
                      className="flex items-center justify-center"
                      onClick={() => setFontSize("large")}
                    >
                      Large
                    </Button>
                  </div>
                </div>
                
                <div className="bg-space-light/40 p-4 rounded-md">
                  <h4 className="font-medium mb-4">Display Options</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="font-medium text-sm">High Contrast Mode</label>
                        <p className="text-xs text-muted-foreground">Increase contrast for better visibility</p>
                      </div>
                      <Switch 
                        checked={highContrast} 
                        onCheckedChange={setHighContrast} 
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="font-medium text-sm">Reduced Motion</label>
                        <p className="text-xs text-muted-foreground">Minimize animations and transitions</p>
                      </div>
                      <Switch 
                        checked={animationReduced} 
                        onCheckedChange={setAnimationReduced} 
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="font-medium text-sm">Focus Indicators</label>
                        <p className="text-xs text-muted-foreground">Enhanced visual focus indicators</p>
                      </div>
                      <Switch checked={true} />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="font-medium text-sm">Screen Reader Support</label>
                        <p className="text-xs text-muted-foreground">Optimized for screen readers</p>
                      </div>
                      <Switch checked={true} />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="notifications" className="p-4 pt-0 animate-fade-in">
              <h3 className="text-lg font-medium mb-4">Notification Preferences</h3>
              
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium">Price Alerts</label>
                    <p className="text-xs text-muted-foreground">Get notified when your price alerts are triggered</p>
                  </div>
                  <Switch 
                    checked={notificationSettings.priceAlerts} 
                    onCheckedChange={() => handleNotificationToggle('priceAlerts')} 
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium">Market News</label>
                    <p className="text-xs text-muted-foreground">Important news that may affect your watchlist</p>
                  </div>
                  <Switch 
                    checked={notificationSettings.marketNews} 
                    onCheckedChange={() => handleNotificationToggle('marketNews')} 
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium">Portfolio Updates</label>
                    <p className="text-xs text-muted-foreground">Daily summaries and significant changes</p>
                  </div>
                  <Switch 
                    checked={notificationSettings.portfolioUpdates} 
                    onCheckedChange={() => handleNotificationToggle('portfolioUpdates')} 
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium">Trading Signals</label>
                    <p className="text-xs text-muted-foreground">AI-generated trading opportunities</p>
                  </div>
                  <Switch 
                    checked={notificationSettings.tradingSignals} 
                    onCheckedChange={() => handleNotificationToggle('tradingSignals')} 
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium">Economic Events</label>
                    <p className="text-xs text-muted-foreground">Reminders for important economic announcements</p>
                  </div>
                  <Switch 
                    checked={notificationSettings.economicEvents} 
                    onCheckedChange={() => handleNotificationToggle('economicEvents')} 
                  />
                </div>
                
                <div className="pt-2">
                  <h4 className="font-medium mb-2">Delivery Methods</h4>
                  <div className="grid grid-cols-3 gap-2">
                    <Button variant="default" className="text-sm">
                      In-App
                    </Button>
                    <Button variant="outline" className="text-sm">
                      Email
                    </Button>
                    <Button variant="outline" className="text-sm">
                      Mobile
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="localization" className="p-4 pt-0 animate-fade-in">
              <h3 className="text-lg font-medium mb-4">Language & Region</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-2">Language</h4>
                  <div className="flex gap-2">
                    <Button
                      variant={language === "english" ? "default" : "outline"}
                      className="flex items-center gap-2"
                      onClick={() => setLanguage("english")}
                    >
                      <Globe size={16} />
                      English
                      {language === "english" && <Check size={14} className="ml-auto" />}
                    </Button>
                    
                    <Button
                      variant={language === "german" ? "default" : "outline"}
                      className="flex items-center gap-2"
                      onClick={() => setLanguage("german")}
                    >
                      <Globe size={16} />
                      Deutsch
                      {language === "german" && <Check size={14} className="ml-auto" />}
                    </Button>
                    
                    <Button
                      variant={language === "spanish" ? "default" : "outline"}
                      className="flex items-center gap-2"
                      onClick={() => setLanguage("spanish")}
                    >
                      <Globe size={16} />
                      Español
                      {language === "spanish" && <Check size={14} className="ml-auto" />}
                    </Button>
                  </div>
                  <div className="flex justify-end mt-2">
                    <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
                      More Languages
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="font-medium block mb-2">Time Zone</label>
                    <div className="relative">
                      <select 
                        className="w-full bg-space border border-space-light rounded-md px-3 py-2 appearance-none focus:ring-2 focus:ring-cosmic outline-none"
                        value={timezone}
                        onChange={(e) => setTimezone(e.target.value)}
                      >
                        <option value="Europe/Berlin">Europe/Berlin (GMT+1)</option>
                        <option value="America/New_York">America/New_York (GMT-5)</option>
                        <option value="Asia/Tokyo">Asia/Tokyo (GMT+9)</option>
                        <option value="UTC">UTC (GMT+0)</option>
                      </select>
                      <ChevronsUpDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="font-medium block mb-2">Currency Display</label>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="default" size="sm">
                        Local Currency (€)
                      </Button>
                      <Button variant="outline" size="sm">
                        USD ($)
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="font-medium block mb-2">Date Format</label>
                    <div className="grid grid-cols-3 gap-2">
                      <Button variant="outline" size="sm">
                        DD/MM/YYYY
                      </Button>
                      <Button variant="default" size="sm">
                        MM/DD/YYYY
                      </Button>
                      <Button variant="outline" size="sm">
                        YYYY-MM-DD
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6">
          <div className="glass-card p-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 rounded-full bg-space-accent/20 flex items-center justify-center">
                <User size={24} className="text-space-accent" />
              </div>
              <div>
                <h3 className="font-medium">Your Account</h3>
                <p className="text-xs text-muted-foreground">Premium Plan</p>
              </div>
            </div>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start gap-2">
                <User size={16} />
                Profile Settings
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <Bell size={16} />
                Notification Preferences
              </Button>
              <Button variant="default" className="w-full">
                Manage Subscription
              </Button>
            </div>
          </div>
          
          <div className="bg-space-light/40 p-4 rounded-md">
            <h4 className="font-medium mb-3">Need Help?</h4>
            <p className="text-sm text-silver mb-3">
              Have questions about settings or need assistance with your account?
            </p>
            <Button variant="outline" className="w-full">Contact Support</Button>
          </div>
          
          <div className="bg-space-light/20 p-4 rounded-md">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium">Data & Privacy</h4>
              <Button variant="ghost" size="sm" className="h-7 px-2">Manage</Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Control what data is collected and how it's used to personalize your experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
