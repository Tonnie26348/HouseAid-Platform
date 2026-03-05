import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Search, HelpCircle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center font-sans overflow-hidden relative">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
         <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full blur-[120px]" />
         <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
        <div className="mb-8 relative inline-block">
           <motion.div 
             animate={{ rotate: [0, 10, -10, 0] }}
             transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
             className="text-[12rem] font-black text-primary/10 select-none leading-none"
           >
             404
           </motion.div>
           <div className="absolute inset-0 flex items-center justify-center">
              <Search className="w-24 h-24 text-primary" strokeWidth={2.5} />
           </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">Lost in the Household?</h1>
        <p className="text-xl text-gray-500 font-medium mb-12 max-w-lg mx-auto leading-relaxed">
          The page you're looking for doesn't exist or has been moved to a new address. 
          Let's get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="h-14 px-8 rounded-2xl font-black shadow-xl shadow-primary/20">
            <Link to="/"><Home className="w-5 h-5 mr-2" /> Back to Home</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="h-14 px-8 rounded-2xl border-2 font-black">
            <Link to="/contact"><HelpCircle className="w-5 h-5 mr-2" /> Get Support</Link>
          </Button>
        </div>

        <div className="mt-20 pt-8 border-t border-gray-100 max-w-xs mx-auto">
           <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Quick Shortcuts</p>
           <div className="flex justify-center gap-6">
              <Link to="/platform/jobs" className="text-sm font-bold text-gray-600 hover:text-primary transition-colors">Find Jobs</Link>
              <Link to="/platform/all-workers" className="text-sm font-bold text-gray-600 hover:text-primary transition-colors">Hire Talent</Link>
           </div>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;

export default NotFound;
