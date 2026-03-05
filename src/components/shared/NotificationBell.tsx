import React, { useState } from "react";
import { Bell, CheckCircle2, MessageSquare, Briefcase, Star, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const NotificationBell = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "message",
      title: "New Message",
      description: "Mary Njeri sent you a message.",
      time: "2m ago",
      isRead: false,
      icon: MessageSquare,
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    {
      id: 2,
      type: "verification",
      title: "Account Verified",
      description: "Your professional profile is now verified.",
      time: "1h ago",
      isRead: false,
      icon: CheckCircle2,
      color: "text-green-600",
      bg: "bg-green-50"
    },
    {
      id: 3,
      type: "job",
      title: "New Job Match",
      description: "A new position in Kilimani matches your skills.",
      time: "3h ago",
      isRead: true,
      icon: Briefcase,
      color: "text-purple-600",
      bg: "bg-purple-50"
    }
  ]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-xl hover:bg-gray-100 relative">
          <Bell className="w-5 h-5 text-gray-500" />
          {unreadCount > 0 && (
            <span className="absolute top-2 right-2 w-4 h-4 bg-primary text-[10px] font-black text-white flex items-center justify-center rounded-full border-2 border-white shadow-sm">
              {unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 md:w-96 rounded-[2rem] p-0 shadow-2xl border-gray-100 overflow-hidden" align="end">
        <div className="p-6 bg-gray-50/50 border-b border-gray-100 flex items-center justify-between">
           <div>
             <h4 className="font-black text-gray-900 leading-none">Notifications</h4>
             <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1.5">Your Activity Feed</p>
           </div>
           {unreadCount > 0 && (
             <Button variant="ghost" size="sm" onClick={markAllAsRead} className="text-primary font-black text-xs hover:bg-primary/5">
               Mark all as read
             </Button>
           )}
        </div>
        
        <ScrollArea className="h-[400px]">
          <div className="p-2">
            {notifications.length === 0 ? (
              <div className="py-12 text-center">
                 <Bell className="w-10 h-10 text-gray-200 mx-auto mb-3" />
                 <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">No notifications</p>
              </div>
            ) : (
              notifications.map((n) => (
                <DropdownMenuItem key={n.id} className={cn(
                  "p-4 rounded-2xl mb-1 cursor-pointer transition-all flex items-start gap-4 focus:bg-gray-50",
                  !n.isRead ? "bg-white" : "opacity-60"
                )}>
                  <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0", n.bg, n.color)}>
                    <n.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between items-start">
                      <span className="font-bold text-gray-900 text-sm leading-none">{n.title}</span>
                      <span className="text-[10px] font-bold text-gray-400 uppercase">{n.time}</span>
                    </div>
                    <p className="text-xs text-gray-500 font-medium leading-relaxed">{n.description}</p>
                  </div>
                  {!n.isRead && (
                    <div className="w-2 h-2 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                  )}
                </DropdownMenuItem>
              ))
            )}
          </div>
        </ScrollArea>
        
        <div className="p-4 border-t border-gray-50 bg-white">
           <Button variant="ghost" className="w-full font-black text-gray-400 text-xs uppercase tracking-widest hover:text-primary">
             View All Activity
           </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationBell;
