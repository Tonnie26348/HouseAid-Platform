import DashboardLayout from "@/components/shared/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import DashboardCard from "@/components/shared/DashboardCard"; // Import DashboardCard
import { Briefcase, Users, Handshake } from "lucide-react"; // Import icons

const EmployerDashboard = () => {
  return (
    <DashboardLayout pageTitle="Employer Dashboard">
      <div className="flex justify-between items-center mb-4">
        <Button asChild>
          <Link to="/platform/jobs/new">Create New Job</Link>
        </Button>
      </div>
      <p className="mt-2 text-gray-600">Welcome to your dashboard. Here you can manage your workers, contracts, and more.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        <DashboardCard
          title="Open Jobs"
          value={5}
          description="Currently active job postings"
          icon={Briefcase}
          valueColorClass="text-blue-600"
        />
        <DashboardCard
          title="Pending Applications"
          value={12}
          description="Applications awaiting your review"
          icon={Users}
          valueColorClass="text-yellow-600"
        />
        <DashboardCard
          title="Active Contracts"
          value={3}
          description="Ongoing contracts with workers"
          icon={Handshake}
          valueColorClass="text-green-600"
        />
      </div>
    </DashboardLayout>
  );
};

export default EmployerDashboard;
