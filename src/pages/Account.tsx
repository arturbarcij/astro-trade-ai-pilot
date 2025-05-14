
import { Bell, CreditCard, Edit, Key, Lock, Smartphone, User } from "lucide-react";
import { cn } from "@/lib/utils";

const Account = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Account</h1>
      
      <div className="grid grid-cols-12 gap-6">
        {/* Profile Section */}
        <div className="col-span-12 md:col-span-8">
          <div className="glass-card p-6">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-space-light flex items-center justify-center">
                  <User size={32} className="text-silver-light" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">John Trader</h2>
                  <p className="text-muted-foreground">Joined May 2023</p>
                </div>
              </div>
              <button className="flex items-center gap-1 text-sm bg-space-light px-3 py-1.5 rounded-md hover:bg-space-light/70 transition-colors">
                <Edit size={14} />
                <span>Edit</span>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-4">Personal Information</h3>
                <div className="space-y-3">
                  <div>
                    <div className="text-xs text-muted-foreground">Email</div>
                    <div>john.trader@example.com</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Phone</div>
                    <div>+1 (555) 123-4567</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Location</div>
                    <div>San Francisco, CA</div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4">Account Settings</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Lock size={16} className="text-muted-foreground" />
                      <span>Two-Factor Authentication</span>
                    </div>
                    <div className="w-10 h-5 bg-space-light rounded-full relative cursor-pointer">
                      <div className="absolute h-4 w-4 bg-cosmic rounded-full top-0.5 right-0.5"></div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Bell size={16} className="text-muted-foreground" />
                      <span>Notifications</span>
                    </div>
                    <div className="w-10 h-5 bg-space-light rounded-full relative cursor-pointer">
                      <div className="absolute h-4 w-4 bg-cosmic rounded-full top-0.5 right-0.5"></div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Smartphone size={16} className="text-muted-foreground" />
                      <span>Mobile Alerts</span>
                    </div>
                    <div className="w-10 h-5 bg-space-light rounded-full relative cursor-pointer">
                      <div className="absolute h-4 w-4 bg-silver rounded-full top-0.5 left-0.5"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Plan & Security Section */}
        <div className="col-span-12 md:col-span-4">
          <div className="glass-card p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Your Plan</h3>
              <span className="bg-cosmic/20 text-cosmic px-2 py-0.5 rounded-full text-xs">Premium</span>
            </div>
            <div className="text-xl font-bold mb-2">$19.99/month</div>
            <ul className="space-y-2 mb-4">
              <li className="text-sm flex items-center gap-2">
                <div className="h-4 w-4 rounded-full bg-cosmic/20 text-cosmic flex items-center justify-center text-xs">✓</div>
                <span>Real-time market data</span>
              </li>
              <li className="text-sm flex items-center gap-2">
                <div className="h-4 w-4 rounded-full bg-cosmic/20 text-cosmic flex items-center justify-center text-xs">✓</div>
                <span>Advanced AI insights</span>
              </li>
              <li className="text-sm flex items-center gap-2">
                <div className="h-4 w-4 rounded-full bg-cosmic/20 text-cosmic flex items-center justify-center text-xs">✓</div>
                <span>Paper trading simulator</span>
              </li>
              <li className="text-sm flex items-center gap-2">
                <div className="h-4 w-4 rounded-full bg-cosmic/20 text-cosmic flex items-center justify-center text-xs">✓</div>
                <span>Custom alerts</span>
              </li>
            </ul>
            <button className="bg-space w-full py-2 rounded-md hover:bg-space-light transition-colors">
              Manage Subscription
            </button>
          </div>
          
          <div className="glass-card p-6">
            <h3 className="font-semibold mb-4">Security</h3>
            <div className="space-y-4">
              <button className="flex items-center justify-between w-full bg-space p-3 rounded-md hover:bg-space-light transition-colors text-left">
                <div className="flex items-center gap-2">
                  <Key size={16} className="text-muted-foreground" />
                  <span>Change Password</span>
                </div>
                <span>→</span>
              </button>
              
              <button className="flex items-center justify-between w-full bg-space p-3 rounded-md hover:bg-space-light transition-colors text-left">
                <div className="flex items-center gap-2">
                  <CreditCard size={16} className="text-muted-foreground" />
                  <span>Manage Payment Methods</span>
                </div>
                <span>→</span>
              </button>
              
              <button className="flex items-center justify-between w-full bg-space p-3 rounded-md hover:bg-space-light transition-colors text-left">
                <div className="flex items-center gap-2">
                  <Lock size={16} className="text-muted-foreground" />
                  <span>Security Settings</span>
                </div>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
