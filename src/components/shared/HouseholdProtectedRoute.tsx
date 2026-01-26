import { useAuth } from "@/hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";
import DashboardLayout from "./DashboardLayout"; // Assuming this is for unauthorized layout

const HouseholdProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const userRole = user.user_metadata.role;

  if (userRole !== "employer") { // Assuming 'employer' role for household
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-4xl font-bold text-red-600 mb-4">Unauthorized Access</h1>
          <p className="text-lg text-gray-700 mb-8">
            You do not have permission to view this page.
          </p>
          {/* <Button asChild>
            <Link to="/platform">Go to Dashboard</Link>
          </Button> */}
        </div>
      </DashboardLayout>
    );
  }

  return <Outlet />;
};

export default HouseholdProtectedRoute;
