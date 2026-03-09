import DashboardLayout from "@/components/shared/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import DashboardCard from "@/components/shared/DashboardCard";
import { Briefcase, Users, Handshake, Star, CreditCard, MessageSquare, Plus, ArrowRight, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";

const EmployerDashboard = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-8">

        {/* Header Action */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
           <div>
             <h2 className="text-3xl font-black text-gray-900 tracking-tight">Management Overview</h2>
             <p className="text-gray-500 font-medium mt-1">Easily manage your household recruitment and payroll.</p>
           </div>
           <Button asChild size="lg" className="rounded-xl h-14 px-8 font-black shadow-lg shadow-primary/20">
             <Link to="/platform/jobs/new"><Plus className="w-5 h-5 mr-2" /> Post New Opening</Link>
           </Button>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
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

        <div className="grid lg:grid-cols-3 gap-8">
           {/* Active Professionals */}
           <Card className="lg:col-span-2 rounded-[2.5rem] border-none shadow-sm bg-white overflow-hidden">
              <CardHeader className="p-8 border-b border-gray-50 flex flex-row items-center justify-between">
                 <CardTitle className="text-2xl font-black text-gray-900">Active Professionals</CardTitle>
                 <Button variant="ghost" className="font-bold text-primary">Manage All</Button>
              </CardHeader>
              <CardContent className="p-0">
                 <div className="divide-y divide-gray-50">
                    {[
                      { name: "Mary Njeri", role: "Childcare Specialist", salary: "25,000", status: "On Duty" },
                      { name: "Grace Akinyi", role: "Home Manager", salary: "35,000", status: "Off Duty" }
                    ].map((worker, i) => (
                      <div key={i} className="p-8 flex items-center justify-between hover:bg-gray-50 transition-colors">
                         <div className="flex gap-4">
                            <Avatar className="w-14 h-14 border-2 border-gray-50">
                               <AvatarFallback className="bg-primary/5 text-primary font-bold">{worker.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                               <h4 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                                 {worker.name}
                                 <ShieldCheck className="w-4 h-4 text-blue-500" />
                               </h4>
                               <p className="text-sm text-gray-400 font-medium">{worker.role} • KSh {worker.salary}/mo</p>
                            </div>
                         </div>
                         <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-green-600 text-xs font-black uppercase tracking-widest">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-600" />
                            {worker.status}
                         </div>
                      </div>
                    ))}
                 </div>
              </CardContent>
           </Card>

           {/* Quick Actions & Tips */}
           <div className="space-y-8">
              <Card className="rounded-[2.5rem] border-none shadow-xl shadow-primary/5 bg-gray-900 text-white p-8">
                 <h3 className="text-xl font-black mb-6">Employer Toolkit</h3>
                 <div className="space-y-4">
                    <Button className="w-full justify-between h-14 rounded-2xl bg-white/5 border-white/10 hover:bg-white/10 font-bold" variant="outline">
                       Review Applications <ArrowRight className="w-4 h-4" />
                    </Button>
                    <Button className="w-full justify-between h-14 rounded-2xl bg-white/5 border-white/10 hover:bg-white/10 font-bold" variant="outline">
                       Process Payments <ArrowRight className="w-4 h-4" />
                    </Button>
                    <Button className="w-full justify-between h-14 rounded-2xl bg-white/5 border-white/10 hover:bg-white/10 font-bold" variant="outline">
                       Legal Templates <ArrowRight className="w-4 h-4" />
                    </Button>
                 </div>
              </Card>

              <Card className="rounded-[2.5rem] border-none shadow-sm bg-white p-8">
                 <h3 className="text-xl font-black text-gray-900 mb-4">Household Security</h3>
                 <p className="text-gray-500 font-medium text-sm mb-6 leading-relaxed">
                   Your account is protected by world-class identity verification and GPS-secured work sessions.
                 </p>
                 <div className="flex items-center gap-3 p-4 rounded-2xl bg-green-50 text-green-600">
                    <ShieldCheck className="w-6 h-6" />
                    <span className="font-bold text-sm">Security Level: Maximum</span>
                 </div>
              </Card>
           </div>
        </div>
      </div>
  );
};

export default EmployerDashboard;


