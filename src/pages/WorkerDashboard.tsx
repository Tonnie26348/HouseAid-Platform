import DashboardLayout from "@/components/shared/DashboardLayout";
import DashboardCard from "@/components/shared/DashboardCard";
import { Briefcase, Handshake, DollarSign, ShieldCheck, ShieldAlert, MessageSquare, Star, ArrowRight, Zap, TrendingUp, GraduationCap, Award } from "lucide-react";
import { useVerification } from "@/hooks/useDatabase";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

const WorkerDashboard = () => {
  const { request } = useVerification();

  const getVerificationStatus = () => {
    if (!request.data) return "Not Verified";
    return request.data.status;
  };

  const status = getVerificationStatus();

  return (
    <DashboardLayout pageTitle="Worker Dashboard">
      <div className="space-y-6 md:space-y-8">

        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
           <div>
             <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">Welcome back!</h2>
             <p className="text-gray-500 font-medium mt-1 text-sm md:text-base">Here's what's happening with your professional career today.</p>
           </div>
           <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white shadow-sm border border-gray-100 w-fit">
              <Star className="w-5 h-5 text-yellow-500 fill-current" />
              <span className="font-bold text-gray-900 text-lg">4.9</span>
              <span className="text-gray-400 text-[10px] md:text-sm font-bold uppercase tracking-wider">PRO SCORE</span>
           </div>
        </div>

        {/* Verification Alerts */}
        {status === "Not Verified" && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
            <Alert variant="destructive" className="rounded-[1.5rem] md:rounded-[2rem] border-none shadow-xl shadow-red-100 p-6 md:p-8 bg-white border-l-8 border-l-red-500">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-red-50 text-red-600 flex items-center justify-center flex-shrink-0">
                    <ShieldAlert className="h-6 w-6 md:h-7 md:w-7" />
                  </div>
                  <div>
                    <AlertTitle className="text-lg md:text-xl font-black text-gray-900 mb-1">Verify Your Profile</AlertTitle>
                    <AlertDescription className="text-gray-500 font-medium text-sm md:text-lg leading-relaxed">
                      Complete your professional verification to build trust and unlock premium job opportunities.
                    </AlertDescription>
                  </div>
                </div>
                <Button size="lg" className="rounded-xl h-12 md:h-14 px-6 md:px-8 font-black shadow-lg shadow-primary/20 w-full md:w-auto" asChild>
                  <Link to="/platform/profile">Verify Now</Link>
                </Button>
              </div>
            </Alert>
          </motion.div>
        )}

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <DashboardCard
            title="Available Jobs"
            value={15}
            description="High-match opportunities"
            icon={Briefcase}
            valueColorClass="text-primary"
          />
          <DashboardCard
            title="Active Contracts"
            value={2}
            description="Ongoing engagements"
            icon={Handshake}
            valueColorClass="text-green-600"
          />
          <DashboardCard
            title="Certifications"
            value={1}
            description="Earned badges"
            icon={Award}
            valueColorClass="text-blue-600"
          />
          <DashboardCard
            title="New Messages"
            value={3}
            description="Unread notifications"
            icon={MessageSquare}
            valueColorClass="text-orange-600"
          />
        </div>

        {/* Training Academy Banner */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
          <Card className="rounded-[2rem] md:rounded-[3rem] border-none shadow-2xl shadow-primary/5 bg-gradient-to-r from-primary to-primary/80 text-white p-8 md:p-12 overflow-hidden relative">
            <div className="absolute top-0 right-0 p-8 opacity-20 rotate-12 hidden md:block">
               <GraduationCap className="w-48 h-48 md:w-64 md:h-64" />
            </div>
            <div className="relative z-10 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 rounded-full bg-white/20 text-white text-xs md:text-sm font-bold mb-4 md:mb-6 backdrop-blur-md">
                <Zap className="w-3 md:w-4 h-3 md:h-4 fill-current" />
                <span>BOOST YOUR EARNINGS</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black mb-4 md:mb-6 tracking-tight leading-tight">
                Unlock Premium Jobs with <br />
                <span className="text-secondary">Skills Academy.</span>
              </h2>
              <p className="text-base md:text-xl text-primary-foreground/90 font-medium mb-8 md:mb-10 leading-relaxed">
                Complete certified courses in Childcare, Culinary Arts, and Professional Etiquette 
                to increase your daily rates by up to 40%.
              </p>
              <Button asChild size="lg" variant="secondary" className="h-14 md:h-16 px-8 md:px-10 text-lg md:text-xl rounded-xl md:rounded-2xl font-black shadow-2xl transition-all hover:scale-105 active:scale-95 w-full md:w-auto">
                <Link to="/platform/academy">Enter Academy <ArrowRight className="ml-3 w-5 h-5 md:w-6 md:h-6" /></Link>
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Detailed Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
           {/* Recent Activity */}
           <Card className="lg:col-span-2 rounded-[1.5rem] md:rounded-[2.5rem] border-none shadow-sm bg-white overflow-hidden">
              <CardHeader className="p-6 md:p-8 border-b border-gray-50 flex flex-row items-center justify-between">
                 <CardTitle className="text-xl md:text-2xl font-black text-gray-900">Recent Applications</CardTitle>
                 <Button variant="ghost" className="font-bold text-primary">View All</Button>
              </CardHeader>
              <CardContent className="p-0">
                 <div className="divide-y divide-gray-50">
                    {[
                      { title: "Executive Chef", household: "The Kamau Household", status: "In Review", date: "2h ago" },
                      { title: "Senior Nanny", household: "Kilimani Residence", status: "Interviewing", date: "1d ago" },
                      { title: "Home Manager", household: "Muthaiga Estate", status: "Contract Sent", date: "3d ago" }
                    ].map((app, i) => (
                      <div key={i} className="p-6 md:p-8 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors">
                         <div className="flex gap-4 min-w-0">
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-primary/5 flex items-center justify-center text-primary font-bold flex-shrink-0">
                               {app.household.charAt(4)}
                            </div>
                            <div className="min-w-0">
                               <h4 className="font-bold text-gray-900 text-base md:text-lg truncate">{app.title}</h4>
                               <p className="text-sm text-gray-400 font-medium truncate">{app.household}</p>
                            </div>
                         </div>
                         <div className="text-right flex-shrink-0">
                            <div className="text-[10px] md:text-sm font-black text-primary uppercase tracking-tighter mb-1">{app.status}</div>
                            <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{app.date}</div>
                         </div>
                      </div>
                    ))}
                 </div>
              </CardContent>
           </Card>

           {/* Sidebar: Recommended & Pro Stats */}
           <div className="space-y-6 md:space-y-8">
              <Card className="rounded-[1.5rem] md:rounded-[2.5rem] border-none shadow-xl shadow-primary/5 bg-gray-900 text-white p-6 md:p-8 overflow-hidden relative">
                 <div className="absolute top-0 right-0 p-4 opacity-10">
                    <TrendingUp className="w-24 h-24 md:w-32 md:h-32" />
                 </div>
                 <h3 className="text-lg md:text-xl font-black mb-6 relative z-10">Pro Insights</h3>
                 <div className="space-y-4 md:space-y-6 relative z-10">
                    <div className="flex justify-between items-center text-sm md:text-base">
                       <span className="text-gray-400 font-bold">Profile Views</span>
                       <span className="font-black text-primary">124</span>
                    </div>
                    <div className="flex justify-between items-center text-sm md:text-base">
                       <span className="text-gray-400 font-bold">Search Appearances</span>
                       <span className="font-black text-primary">48</span>
                    </div>
                    <div className="flex justify-between items-center text-sm md:text-base">
                       <span className="text-gray-400 font-bold">Interview Rate</span>
                       <span className="font-black text-primary">12%</span>
                    </div>
                 </div>
                 <Button className="w-full mt-6 md:mt-8 rounded-xl h-11 md:h-12 font-bold relative z-10" variant="secondary">
                    Optimize Profile
                 </Button>
              </Card>

              <Card className="rounded-[1.5rem] md:rounded-[2.5rem] border-none shadow-sm bg-white p-6 md:p-8">
                 <h3 className="text-lg md:text-xl font-black text-gray-900 mb-6 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-orange-500 fill-current" />
                    Recommended
                 </h3>
                 <div className="space-y-4 md:space-y-6">
                    {[1, 2].map((i) => (
                      <div key={i} className="group cursor-pointer">
                         <h4 className="font-bold text-gray-900 group-hover:text-primary transition-colors text-sm md:text-base">Childcare Specialist</h4>
                         <p className="text-xs md:text-sm text-gray-400 font-medium">Kilimani • KSh 2,500/day</p>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full rounded-xl h-11 md:h-12 font-bold border-2 mt-2 text-sm">
                       Explore Jobs <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                 </div>
              </Card>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default WorkerDashboard;