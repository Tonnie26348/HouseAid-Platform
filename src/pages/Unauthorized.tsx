import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/components/shared/DashboardLayout";

const Unauthorized = () => {
  return (
    <DashboardLayout>
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Unauthorized Access</h1>
        <p className="text-lg text-gray-700 mb-8">
          You do not have permission to view this page.
        </p>
        <Button asChild>
          <Link to="/platform">Go to Dashboard</Link>
        </Button>
      </div>
    </DashboardLayout>
  );
};

export default Unauthorized;
