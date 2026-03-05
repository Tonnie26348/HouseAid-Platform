import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShieldAlert, ArrowLeft, Lock } from "lucide-react";
import { motion } from "framer-motion";

const Unauthorized = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-center font-sans">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white p-10 md:p-16 rounded-[3rem] shadow-xl shadow-gray-200/50 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-red-500" />
        
        <div className="mb-10 inline-flex items-center justify-center w-24 h-24 rounded-[2rem] bg-red-50 text-red-500">
           <ShieldAlert className="w-12 h-12" strokeWidth={2.5} />
        </div>

        <h1 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">Access Restricted</h1>
        <p className="text-gray-500 font-medium mb-10 leading-relaxed">
          You don't have the necessary permissions to view this secure area. 
          If you believe this is an error, please contact your administrator.
        </p>

        <div className="space-y-4">
          <Button asChild size="lg" className="w-full h-14 rounded-2xl font-black shadow-lg shadow-primary/20 bg-gray-900 hover:bg-gray-800">
            <Link to="/platform">Return to Dashboard</Link>
          </Button>
          <Button asChild variant="ghost" className="w-full h-12 rounded-xl font-bold text-gray-400 hover:text-gray-900">
            <Link to="/" className="inline-flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
          </Button>
        </div>

        <div className="mt-12 flex items-center justify-center gap-2 text-gray-300 font-bold text-[10px] uppercase tracking-widest">
           <Lock className="w-3.5 h-3.5" />
           <span>Secure Gateway Protocol</span>
        </div>
      </motion.div>
    </div>
  );
};

export default Unauthorized;

