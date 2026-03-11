import React from "react";
import {
  Bell,
  Home,
  Users,
  FileText,
  Settings,
  LogOut,
  User,
  Menu,
  X,
  MessageSquare,
  ShieldCheck,
  Briefcase,
  GraduationCap,
  Plus,
  CreditCard
} from "lucide-react";
import { Link, NavLink, useNavigate, Outlet, useLocation } from "react-router-dom";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import NotificationBell from "./NotificationBell";

const Sidebar = ({
  isSidebarOpen,
  setSidebarOpen,
}: {
  isSidebarOpen: boolean;
  setSidebarOpen: (isOpen: boolean) => void;
}) => {
  const { profile, signOut, userRole } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut();
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      navigate("/login");
    }
  };

  const isHousehold = userRole === "employer";

  const employerLinks = [
    { to: "/platform", icon: Home, label: "Dashboard" },
    { to: "/platform/messages", icon: MessageSquare, label: "Messages" },
    { to: "/platform/transactions", icon: CreditCard, label: "Transactions" },
    { to: "/platform/profile", icon: User, label: "My Profile" },
    { to: "/platform/jobs/new", icon: Plus, label: "Post Job" },
    { to: "/platform/workers", icon: Users, label: "My Workers" },
    { to: "/platform/all-workers", icon: Briefcase, label: "Browse Workers" },
    { to: "/platform/contracts", icon: FileText, label: "Contracts" },
  ];

  const workerLinks = [
    { to: "/platform", icon: Home, label: "Dashboard" },
    { to: "/platform/messages", icon: MessageSquare, label: "Messages" },
    { to: "/platform/transactions", icon: CreditCard, label: "Transactions" },
    { to: "/platform/profile", icon: User, label: "My Profile" },
    { to: "/platform/jobs", icon: Briefcase, label: "Available Jobs" },
    { to: "/platform/my-contracts", icon: FileText, label: "My Contracts" },
    { to: "/platform/academy", icon: GraduationCap, label: "Skills Academy" },
  ];

  const adminLinks = [
    { to: "/platform", icon: Home, label: "Admin Panel" },
    { to: "/platform/messages", icon: MessageSquare, label: "System Messages" },
    { to: "/platform/all-workers", icon: ShieldCheck, label: "Verify Workers" },
    { to: "/platform/contracts", icon: FileText, label: "All Contracts" },
    { to: "/platform/profile", icon: Settings, label: "Settings" },
  ];

  const links = userRole === "admin" ? adminLinks : (isHousehold ? employerLinks : workerLinks);

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-100 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto h-[100dvh]",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="h-20 flex items-center px-8 border-b border-gray-50 flex-shrink-0">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="p-1.5 bg-primary/10 rounded-xl group-hover:scale-110 transition-transform">
              <Logo />
            </div>
            <span className="font-black text-2xl tracking-tight text-gray-900">HouseAid</span>
          </Link>
        </div>

        <nav className="flex-grow py-8 px-4 space-y-1 overflow-y-auto">
          {links.map((link, idx) => (
            <NavLink
              key={`${link.to}-${link.label}-${idx}`}
              to={link.to}
              end={link.to === "/platform"}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                cn(
                  "flex items-center px-4 py-3.5 rounded-2xl font-bold transition-all duration-200 group",
                  isActive
                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                )
              }
            >
              <link.icon className={cn("w-5 h-5 mr-3 transition-transform group-hover:scale-110")} />
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-6 border-t border-gray-50 flex-shrink-0">
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-500 font-bold rounded-2xl hover:bg-red-50 hover:text-red-600 transition-colors"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5 mr-3" />
            Sign Out
          </Button>
        </div>
      </aside>
    </>
  );
};

const DashboardHeader = ({ 
  setSidebarOpen, 
  pageTitle 
}: { 
  setSidebarOpen: (isOpen: boolean) => void;
  pageTitle: string;
}) => {
  const { profile } = useAuth();

  return (
    <header className="h-20 bg-white/80 backdrop-blur-md sticky top-0 z-30 px-4 md:px-8 flex items-center justify-between border-b border-gray-100 flex-shrink-0">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden rounded-xl hover:bg-gray-100"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="w-6 h-6 text-gray-600" />
        </Button>
        <h1 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight line-clamp-1">{pageTitle}</h1>
      </div>

      <div className="flex items-center gap-3 md:gap-6">
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 text-green-600">
           <ShieldCheck className="w-4 h-4" />
           <span className="text-[10px] font-bold uppercase tracking-wider">Secure</span>
        </div>
        
        <NotificationBell />

        <div className="h-8 w-px bg-gray-100 mx-1 md:mx-2" />

        <div className="flex items-center gap-3 pl-2">
          <div className="hidden md:block text-right">
            <div className="text-sm font-bold text-gray-900 leading-none mb-1">{profile?.full_name}</div>
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">
              {profile?.role || 'User'}
            </div>
          </div>
          <div className="h-10 w-10 relative">
             {profile?.avatar_url ? (
               <img src={profile.avatar_url} alt={profile.full_name || ""} className="h-10 w-10 rounded-full object-cover border-2 border-primary/10" />
             ) : (
               <div className="h-10 w-10 rounded-full bg-primary/5 text-primary font-bold flex items-center justify-center border-2 border-primary/10">
                 {profile?.full_name?.charAt(0)}
               </div>
             )}
          </div>
        </div>
      </div>
    </header>
  );
};

const DashboardLayout = ({ pageTitle = "Dashboard" }: { pageTitle?: string }) => {
  const [isSidebarOpen, setSidebarOpen] = React.useState(false);
  const { pathname } = useLocation();
  const { user, signOut } = useAuth();

  // Background session check
  React.useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session && user) {
        // Local state thinks we are logged in, but Supabase says no
        console.warn("Session lost, signing out...");
        await signOut();
        navigate("/login");
      }
    };

    // Check once on mount and then every minute
    checkSession();
    const interval = setInterval(checkSession, 1000 * 60);
    return () => clearInterval(interval);
  }, [user, signOut]);

  // Dynamically determine page title if not provided
  const getPageTitle = () => {
    if (pageTitle !== "Dashboard") return pageTitle;
    
    if (pathname.includes("profile")) return "Account Settings";
    if (pathname.includes("messages")) return "Messages";
    if (pathname.includes("all-workers")) return "Browse Workers";
    if (pathname.includes("workers")) return "My Team";
    if (pathname.includes("contracts")) return "Contracts";
    if (pathname.includes("jobs")) return "Job Opportunities";
    if (pathname.includes("academy")) return "Skills Academy";
    
    return "Dashboard";
  };

  return (
    <div className="flex h-[100dvh] bg-gray-50/50 font-sans overflow-hidden">
      <Sidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <DashboardHeader setSidebarOpen={setSidebarOpen} pageTitle={getPageTitle()} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 scrollbar-hide">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-7xl mx-auto pb-10"
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
