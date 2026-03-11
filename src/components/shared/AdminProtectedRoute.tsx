import { useAuth } from "@/hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "sonner";
import { useEffect } from "react";

const AdminProtectedRoute = () => {
  const { userRole, loading } = useAuth();

  useEffect(() => {
    if (!loading && userRole && userRole !== "admin") {
      toast.error("Administrative Access Required");
    }
  }, [userRole, loading]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50/50">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (userRole !== "admin") {
    return <Navigate to="/platform" replace />;
  }

  return <Outlet />;
};

export default AdminProtectedRoute;
