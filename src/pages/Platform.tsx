import { useAuth } from "@/hooks/useAuth";
import DashboardLayout from "@/components/shared/DashboardLayout";
import EmployerDashboard from "./EmployerDashboard";
import WorkerDashboard from "./WorkerDashboard";

const Platform = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <DashboardLayout>
      {user?.user_metadata.role === "employer" ? (
        <EmployerDashboard />
      ) : (
        <WorkerDashboard />
      )}
    </DashboardLayout>
  );
};

export default Platform;

