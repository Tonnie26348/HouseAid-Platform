import DashboardLayout from "@/components/shared/DashboardLayout";
import DashboardCard from "@/components/shared/DashboardCard"; // Import DashboardCard
import { Briefcase, Handshake, DollarSign } from "lucide-react"; // Import icons

const WorkerDashboard = () => {
  return (
    <DashboardLayout pageTitle="Worker Dashboard">
      <div className="flex justify-between items-center mb-4">
      </div>
      <p className="mt-2 text-gray-600">Welcome to your dashboard. Here you can manage your profile, jobs, and more.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        <DashboardCard
          title="Available Jobs"
          value={15}
          description="New job opportunities"
          icon={Briefcase}
          valueColorClass="text-blue-600"
        />
        <DashboardCard
          title="Active Contracts"
          value={2}
          description="Contracts currently in progress"
          icon={Handshake}
          valueColorClass="text-green-600"
        />
        <DashboardCard
          title="Total Earnings"
          value="$1,250"
          description="Your total earnings this month"
          icon={DollarSign}
          valueColorClass="text-purple-600"
        />
      </div>
    </DashboardLayout>
  );
};

export default WorkerDashboard;
