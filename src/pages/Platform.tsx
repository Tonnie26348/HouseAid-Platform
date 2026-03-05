import { useAuth } from "@/hooks/useAuth";
import EmployerDashboard from "./EmployerDashboard";
import WorkerDashboard from "./WorkerDashboard";
import { motion } from "framer-motion";

const Platform = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 font-sans">
         <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">Preparing Dashboard</p>
         </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50"
    >
      {user?.user_metadata.role === "employer" ? (
        <EmployerDashboard />
      ) : (
        <WorkerDashboard />
      )}
    </motion.div>
  );
};

export default Platform;

