
import { Bell } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

type NotificationType = "alert" | "update" | "success" | "warning";

interface Notification {
  id: number;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const Notifications = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: "alert",
      title: "Price Alert",
      message: "AAPL has increased by 5% in the last hour",
      time: "10 minutes ago",
      read: false,
    },
    {
      id: 2,
      type: "update",
      title: "Market Update",
      message: "DAX has opened 1.2% higher today",
      time: "30 minutes ago",
      read: false,
    },
    {
      id: 3,
      type: "success",
      title: "Order Filled",
      message: "Your buy order for 5 shares of MSFT has been executed",
      time: "1 hour ago",
      read: true,
    },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const toggleNotifications = () => {
    setIsOpen(!isOpen);
  };

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const getNotificationColor = (type: NotificationType) => {
    switch (type) {
      case "alert": return "bg-amber-500";
      case "update": return "bg-blue-500";
      case "success": return "bg-green-500";
      case "warning": return "bg-red-500";
      default: return "bg-silver";
    }
  };

  return (
    <div className="fixed top-4 right-4 z-20">
      <button 
        onClick={toggleNotifications}
        className="relative p-2 rounded-full bg-space-light hover:bg-space-accent/30 transition-colors"
        aria-label="Open notifications"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute top-0.5 right-0.5 w-2.5 h-2.5 bg-cosmic rounded-full flex items-center justify-center text-[10px] text-white">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-12 w-80 bg-space border border-space-light rounded-md shadow-lg shadow-cosmic/5 z-20">
            <div className="flex items-center justify-between p-4 border-b border-space-light">
              <h3 className="font-medium">Notifications</h3>
              {unreadCount > 0 && (
                <button 
                  className="text-xs text-space-accent hover:text-cosmic transition-colors"
                  onClick={markAllAsRead}
                >
                  Mark all as read
                </button>
              )}
            </div>
            
            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-silver">
                  No notifications
                </div>
              ) : (
                notifications.map((notif) => (
                  <div 
                    key={notif.id}
                    className={cn(
                      "p-3 border-b border-space-light last:border-b-0 cursor-pointer hover:bg-space/40 transition-colors",
                      !notif.read && "bg-space-light/30"
                    )}
                    onClick={() => markAsRead(notif.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div className={cn("w-2 h-2 mt-1.5 rounded-full", getNotificationColor(notif.type))} />
                      <div className="flex-1">
                        <div className="flex justify-between mb-0.5">
                          <h4 className="text-sm font-medium">{notif.title}</h4>
                          <span className="text-xs text-silver">{notif.time}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{notif.message}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Notifications;
