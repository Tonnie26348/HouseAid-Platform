import {
  Bell,
  Home,
  Users,
  FileText,
  Settings,
  LogOut,
  User,
  Menu, // Added Menu icon
} from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { Logo } from "./Logo";

const Sidebar = ({
  isSidebarOpen,
  setSidebarOpen,
}: {
  isSidebarOpen: boolean;
  setSidebarOpen: (isOpen: boolean) => void;
}) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const employerLinks = [
    { to: "/platform", icon: Home, label: "Dashboard" },
    { to: "/platform/workers", icon: Users, label: "My Workers" },
    { to: "/platform/all-workers", icon: Users, label: "Browse Workers" },
    { to: "/platform/contracts", icon: FileText, label: "Contracts" },
  ];

  const workerLinks = [
    { to: "/platform/profile", icon: User, label: "My Profile" },
    { to: "/platform/jobs", icon: FileText, label: "Jobs" },
    { to: "/platform/my-contracts", icon: FileText, label: "My Contracts" },
  ];

  const links = user?.user_metadata.role === "employer" ? employerLinks : workerLinks;

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 w-64 flex-shrink-0 bg-gray-800 text-white flex flex-col transform transition-transform ease-in-out duration-300 ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } md:relative md:translate-x-0 md:flex`}
    >
      <div className="h-20 flex items-center px-6">
        <Link to="/" className="flex items-center space-x-2">
          <Logo />
          <span className="font-bold text-xl">HouseAid</span>
        </Link>
      </div>
      <nav className="flex-grow px-4">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end
            onClick={() => setSidebarOpen(false)} // Close sidebar on navigation
            className={({ isActive }) =>
              `flex items-center px-4 py-3 rounded-md transition-colors ${
                isActive
                  ? "bg-gray-700 text-white"
                  : "text-gray-400 hover:bg-gray-700 hover:text-white"
              }`
            }
          >
            <link.icon className="w-5 h-5 mr-3" />
            {link.label}
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-700">
        <Button
          variant="ghost"
          className="w-full justify-start text-left"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5 mr-3" />
          Logout
        </Button>
      </div>
    </aside>
  );
};

const DashboardHeader = ({ setSidebarOpen }: { setSidebarOpen: (isOpen: boolean) => void }) => {
  const { user } = useAuth();
  const [profile, setProfile] = React.useState<any>(null);

  React.useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        const { data, error } = await supabase
          .from("profiles")
          .select("avatar_url, full_name, role")
          .eq("id", user.id)
          .single();

        if (error) {
          console.error("Error fetching profile for header:", error);
        } else if (data) {
          setProfile(data);
        }
      }
    };

    fetchProfile();
  }, [user]);

  return (
    <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden" // Hide on medium and larger screens
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="w-6 h-6 text-gray-600" />
        </Button>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon">
          <Bell className="w-6 h-6 text-gray-600" />
        </Button>
        <div className="flex items-center space-x-2">
          <img src={profile?.avatar_url || 'https://via.placeholder.com/150'} alt="Avatar" className="w-10 h-10 rounded-full" />
          <div>
            <div className="font-semibold">{profile?.full_name}</div>
            <div className="text-sm text-gray-500 capitalize">{profile?.role}</div>
          </div>
        </div>
      </div>
    </header>
  );
};

const DashboardLayout = ({ children, pageTitle = "Dashboard" }: { children: React.ReactNode, pageTitle?: string }) => {
  const [isSidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Backdrop for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      <Sidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader setSidebarOpen={setSidebarOpen} pageTitle={pageTitle} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
