import { useAuth } from "@/hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "sonner";
import { useEffect } from "react";

const HouseholdProtectedRoute = () => {
  const { userRole, loading } = useAuth();

  useEffect(() => {
    if (!loading && userRole) {
      const normalizedRole = userRole.toLowerCase();
      const isHousehold = normalizedRole === "household" || normalizedRole === "employer";
      
      if (!isHousehold) {
        console.error("Access denied. Role is:", userRole);
        toast.error("Access Denied: This feature is only for Employers/Households.");
      }
    }
  }, [userRole, loading]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 font-sans">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">Verifying Role</p>
        </div>
      </div>
    );
  }

  const normalizedRole = (userRole || "").toLowerCase();
  const isHousehold = normalizedRole === "household" || normalizedRole === "employer";

  if (!isHousehold) {
    return <Navigate to="/platform" replace />;
  }

  return <Outlet />;
};

export default HouseholdProtectedRoute;