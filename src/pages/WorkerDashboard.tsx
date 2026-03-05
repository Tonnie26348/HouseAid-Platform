import DashboardLayout from "@/components/shared/DashboardLayout";
import DashboardCard from "@/components/shared/DashboardCard";
import { Briefcase, Handshake, DollarSign, ShieldCheck, ShieldAlert, MessageSquare, Star, ArrowRight, Zap, TrendingUp } from "lucide-react";
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
    <DashboardLayout pageTitle="Worker Overview">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
           <div>
             <h2 className="text-3xl font-black text-gray-900 tracking-tight">Welcome back!</h2>
             <p className="text-gray-500 font-medium mt-1">Here's what's happening with your professional career today.</p>
           </div>
           <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white shadow-sm border border-gray-100">
              <Star className="w-5 h-5 text-yellow-500 fill-current" />
              <span className="font-bold text-gray-900 text-lg">4.9</span>
              <span className="text-gray-400 text-sm font-bold">PRO SCORE</span>
           </div>
        </div>

        {/* Verification Alerts */}
        {status === "Not Verified" && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
            <Alert variant="destructive" className="rounded-[2rem] border-none shadow-xl shadow-red-100 p-8 bg-white border-l-8 border-l-red-500">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center flex-shrink-0">
                    <ShieldAlert className="h-7 w-7" />
                  </div>
                  <div>
                    <AlertTitle className="text-xl font-black text-gray-900 mb-1">Verify Your Profile</AlertTitle>
                    <AlertDescription className="text-gray-500 font-medium text-lg leading-relaxed">
                      Complete your professional verification to build trust and unlock premium job opportunities.
                    </AlertDescription>
                  </div>
                </div>
                <Button size="lg" className="rounded-xl h-14 px-8 font-black shadow-lg shadow-primary/20" asChild>
                  <Link to="/platform/profile">Verify Now</Link>
                </Button>
              </div>
            </Alert>
          </motion.div>
        )}

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
            title="New Messages"
            value={3}
            description="Unread notifications"
            icon={MessageSquare}
            valueColorClass="text-orange-600"
          />
          <DashboardCard
            title="Total Earnings"
            value="KSh 12.5k"
            description="Earnings this month"
            icon={DollarSign}
            valueColorClass="text-purple-600"
          />
        </div>

        {/* Detailed Info Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
           {/* Recent Activity */}
           <Card className="lg:col-span-2 rounded-[2.5rem] border-none shadow-sm bg-white overflow-hidden">
              <CardHeader className="p-8 border-b border-gray-50 flex flex-row items-center justify-between">
                 <CardTitle className="text-2xl font-black text-gray-900">Recent Applications</CardTitle>
                 <Button variant="ghost" className="font-bold text-primary">View All</Button>
              </CardHeader>
              <CardContent className="p-0">
                 <div className="divide-y divide-gray-50">
                    {[
                      { title: "Executive Chef", household: "The Kamau Household", status: "In Review", date: "2h ago" },
                      { title: "Senior Nanny", household: "Kilimani Residence", status: "Interviewing", date: "1d ago" },
                      { title: "Home Manager", household: "Muthaiga Estate", status: "Contract Sent", date: "3d ago" }
                    ].map((app, i) => (
                      <div key={i} className="p-8 flex items-center justify-between hover:bg-gray-50 transition-colors">
                         <div className="flex gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary font-bold">
                               {app.household.charAt(4)}
                            </div>
                            <div>
                               <h4 className="font-bold text-gray-900 text-lg">{app.title}</h4>
                               <p className="text-sm text-gray-400 font-medium">{app.household}</p>
                            </div>
                         </div>
                         <div className="text-right">
                            <div className="text-sm font-black text-primary uppercase tracking-tighter mb-1">{app.status}</div>
                            <div className="text-xs text-gray-400 font-bold uppercase tracking-widest">{app.date}</div>
                         </div>
                      </div>
                    ))}
                 </div>
              </CardContent>
           </Card>

           {/* Sidebar: Recommended & Pro Stats */}
           <div className="space-y-8">
              <Card className="rounded-[2.5rem] border-none shadow-xl shadow-primary/5 bg-gray-900 text-white p-8 overflow-hidden relative">
                 <div className="absolute top-0 right-0 p-4 opacity-10">
                    <TrendingUp className="w-32 h-32" />
                 </div>
                 <h3 className="text-xl font-black mb-6 relative z-10">Pro Insights</h3>
                 <div className="space-y-6 relative z-10">
                    <div className="flex justify-between items-center">
                       <span className="text-gray-400 font-bold">Profile Views</span>
                       <span className="font-black text-primary">124</span>
                    </div>
                    <div className="flex justify-between items-center">
                       <span className="text-gray-400 font-bold">Search Appearances</span>
                       <span className="font-black text-primary">48</span>
                    </div>
                    <div className="flex justify-between items-center">
                       <span className="text-gray-400 font-bold">Interview Rate</span>
                       <span className="font-black text-primary">12%</span>
                    </div>
                 </div>
                 <Button className="w-full mt-8 rounded-xl h-12 font-bold relative z-10" variant="secondary">
                    Optimize Profile
                 </Button>
              </Card>

              <Card className="rounded-[2.5rem] border-none shadow-sm bg-white p-8">
                 <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-orange-500 fill-current" />
                    Recommended
                 </h3>
                 <div className="space-y-6">
                    {[1, 2].map((i) => (
                      <div key={i} className="group cursor-pointer">
                         <h4 className="font-bold text-gray-900 group-hover:text-primary transition-colors">Childcare Specialist</h4>
                         <p className="text-sm text-gray-400 font-medium">Kilimani • KSh 2,500/day</p>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full rounded-xl h-12 font-bold border-2 mt-2">
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
