import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import DashboardCard from "@/components/shared/DashboardCard";
import { Briefcase, Users, Handshake, Star, CreditCard, MessageSquare, Plus, ArrowRight, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";

const EmployerDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Header Action */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
         <div>
           <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">Management Overview</h2>
           <p className="text-gray-500 font-medium mt-1 text-sm md:text-base">Easily manage your household recruitment and payroll.</p>
         </div>
         <Button 
           onClick={() => navigate("/platform/jobs/new")}
           size="lg" 
           className="rounded-xl h-12 md:h-14 px-6 md:px-8 font-black shadow-lg shadow-primary/20 bg-primary text-white hover:bg-primary/90 transition-all w-full md:w-auto"
         >
           <Plus className="w-5 h-5 mr-2" /> Post New Opening
         </Button>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-6">
        <DashboardCard
          title="Open Positions"
          value={5}
          description="Currently active job postings"
          icon={Briefcase}
          valueColorClass="text-primary"
        />
        <DashboardCard
          title="Total Applications"
          value={12}
          description="Pending your review"
          icon={Users}
          valueColorClass="text-yellow-600"
        />
        <DashboardCard
          title="Active Contracts"
          value={3}
          description="Ongoing engagements"
          icon={Handshake}
          valueColorClass="text-green-600"
        />
        <DashboardCard
          title="Avg. Talent Rating"
          value="4.8"
          description="Based on feedback"
          icon={Star}
          valueColorClass="text-yellow-500"
        />
        <DashboardCard
          title="Monthly Payroll"
          value="KSh 45k"
          description="Processed this month"
          icon={CreditCard}
          valueColorClass="text-purple-600"
        />
        <DashboardCard
          title="Unread Messages"
          value={7}
          description="Pending notifications"
          icon={MessageSquare}
          valueColorClass="text-orange-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
         {/* Active Professionals */}
         <Card className="lg:col-span-2 rounded-[1.5rem] md:rounded-[2.5rem] border-none shadow-sm bg-white overflow-hidden">
            <CardHeader className="p-6 md:p-8 border-b border-gray-50 flex flex-row items-center justify-between">
               <CardTitle className="text-xl md:text-2xl font-black text-gray-900">Active Professionals</CardTitle>
               <Button variant="ghost" className="font-bold text-primary">Manage All</Button>
            </CardHeader>
            <CardContent className="p-0">
               <div className="divide-y divide-gray-50">
                  {[
                    { name: "Mary Njeri", role: "Childcare Specialist", salary: "25,000", status: "On Duty" },
                    { name: "Grace Akinyi", role: "Home Manager", salary: "35,000", status: "Off Duty" }
                  ].map((worker, i) => (
                    <div key={i} className="p-6 md:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-gray-50 transition-colors">
                       <div className="flex gap-4">
                          <Avatar className="w-12 h-12 md:w-14 md:h-14 border-2 border-gray-50 flex-shrink-0">
                             <AvatarFallback className="bg-primary/5 text-primary font-bold">{worker.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="min-w-0">
                             <h4 className="font-bold text-gray-900 text-base md:text-lg flex items-center gap-2 truncate">
                               {worker.name}
                               <ShieldCheck className="w-4 h-4 text-blue-500 flex-shrink-0" />
                             </h4>
                             <p className="text-sm text-gray-400 font-medium truncate">{worker.role} • KSh {worker.salary}/mo</p>
                          </div>
                       </div>
                       <div className="flex items-center self-start sm:self-center gap-2 px-3 py-1 rounded-full bg-green-50 text-green-600 text-[10px] md:text-xs font-black uppercase tracking-widest w-fit">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-600" />
                          {worker.status}
                       </div>
                    </div>
                  ))}
               </div>
            </CardContent>
         </Card>

         {/* Quick Actions & Tips */}
         <div className="space-y-6 md:space-y-8">
            <Card className="rounded-[1.5rem] md:rounded-[2.5rem] border-none shadow-xl shadow-primary/5 bg-gray-900 text-white p-6 md:p-8">
               <h3 className="text-lg md:text-xl font-black mb-6">Employer Toolkit</h3>
               <div className="space-y-3 md:space-y-4">
                  <Button className="w-full justify-between h-12 md:h-14 rounded-xl md:rounded-2xl bg-white/5 border-white/10 hover:bg-white/10 font-bold px-4 text-sm md:text-base" variant="outline">
                     Review Applications <ArrowRight className="w-4 h-4" />
                  </Button>
                  <Button className="w-full justify-between h-12 md:h-14 rounded-xl md:rounded-2xl bg-white/5 border-white/10 hover:bg-white/10 font-bold px-4 text-sm md:text-base" variant="outline">
                     Process Payments <ArrowRight className="w-4 h-4" />
                  </Button>
                  <Button className="w-full justify-between h-12 md:h-14 rounded-xl md:rounded-2xl bg-white/5 border-white/10 hover:bg-white/10 font-bold px-4 text-sm md:text-base" variant="outline">
                     Legal Templates <ArrowRight className="w-4 h-4" />
                  </Button>
               </div>
            </Card>

            <Card className="rounded-[1.5rem] md:rounded-[2.5rem] border-none shadow-sm bg-white p-6 md:p-8">
               <h3 className="text-lg md:text-xl font-black text-gray-900 mb-4">Household Security</h3>
               <p className="text-gray-500 font-medium text-xs md:text-sm mb-6 leading-relaxed">
                 Your account is protected by world-class identity verification and GPS-secured work sessions.
               </p>
               <div className="flex items-center gap-3 p-4 rounded-xl md:rounded-2xl bg-green-50 text-green-600">
                  <ShieldCheck className="w-5 h-5 md:w-6 md:h-6" />
                  <span className="font-bold text-xs md:text-sm">Security Level: Maximum</span>
               </div>
            </Card>
         </div>
      </div>
    </div>
  );
};

export default EmployerDashboard;