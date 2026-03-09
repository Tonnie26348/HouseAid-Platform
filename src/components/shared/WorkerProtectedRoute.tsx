import { useAuth } from "@/hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

const WorkerProtectedRoute = () => {
  const { profile, loading } = useAuth();

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

  if (profile?.role !== "Domestic Worker") {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default WorkerProtectedRoute;

