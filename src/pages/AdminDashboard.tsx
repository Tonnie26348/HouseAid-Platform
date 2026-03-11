import React, { useState, useEffect } from "react";
import { 
  Users, 
  ShieldCheck, 
  Briefcase, 
  TrendingUp, 
  Search, 
  CheckCircle2, 
  XCircle, 
  MoreVertical,
  Trash2,
  Mail,
  Activity,
  Globe,
  Database
} from "lucide-react";
import DashboardCard from "@/components/shared/DashboardCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { motion, AnimatePresence } from "framer-motion";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    pendingVerifications: 0,
    activeJobs: 0,
    totalContracts: 0
  });
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<any[]>([]);
  const [verifications, setVerifications] = useState<any[]>([]);
  const [jobs, setJobs] = useState<any[]>([]);
  const { toast } = useToast();

  const fetchData = async () => {
    setLoading(true);
    try {
      const { count: userCount } = await supabase.from('profiles').select('*', { count: 'exact', head: true });
      const { count: pendingCount } = await supabase.from('verification_requests').select('*', { count: 'exact', head: true }).eq('status', 'pending');
      const { count: jobCount } = await supabase.from('jobs').select('*', { count: 'exact', head: true });
      const { count: contractCount } = await supabase.from('contracts').select('*', { count: 'exact', head: true });

      setStats({
        totalUsers: userCount || 0,
        pendingVerifications: pendingCount || 0,
        activeJobs: jobCount || 0,
        totalContracts: contractCount || 0
      });

      const { data: userData } = await supabase.from('profiles').select('*').order('created_at', { ascending: false }).limit(20);
      setUsers(userData || []);

      const { data: verifData } = await supabase.from('verification_requests').select('*, profile:profiles(full_name, avatar_url, role)').eq('status', 'pending');
      setVerifications(verifData || []);

      const { data: jobData } = await supabase.from('jobs').select('*, employer:profiles(full_name)').limit(20);
      setJobs(jobData || []);

    } catch (error: any) {
      toast({ title: "System Error", description: "Failed to sync platform data.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAction = async (table: string, id: string, status: string) => {
    const { error } = await supabase.from(table).update({ status }).eq('id', id);
    if (!error) {
      toast({ title: "Action Successful", description: `Record marked as ${status}.` });
      fetchData();
    }
  };

  const handleDelete = async (table: string, id: string) => {
    if (!confirm("Permanent Delete? This cannot be reversed.")) return;
    const { error } = await supabase.from(table).delete().eq('id', id);
    if (!error) {
      toast({ title: "Deleted", description: "The record has been permanently removed." });
      fetchData();
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Dynamic Command Header */}
      <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-gray-100 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
         <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
            <div>
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest mb-4">
                  <Activity className="w-3 h-3" /> System Control Active
               </div>
               <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight">Platform Command.</h2>
               <p className="text-gray-500 font-medium mt-2 text-sm md:text-lg">Real-time oversight of the HouseAid ecosystem.</p>
            </div>
            <div className="flex gap-3">
               <Button onClick={fetchData} className="h-14 px-8 rounded-2xl font-black shadow-xl shadow-primary/20 hover:scale-105 transition-all">
                  Sync Database
               </Button>
            </div>
         </div>
      </div>

      {/* Modern Analytics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard title="Total Users" value={stats.totalUsers} icon={Users} valueColorClass="text-primary" />
        <DashboardCard title="Verifications" value={stats.pendingVerifications} icon={ShieldCheck} valueColorClass="text-blue-600" />
        <DashboardCard title="Active Jobs" value={stats.activeJobs} icon={Briefcase} valueColorClass="text-orange-600" />
        <DashboardCard title="Global Health" value="100%" icon={Globe} valueColorClass="text-green-600" />
      </div>

      <Tabs defaultValue="overview" className="space-y-8">
        <TabsList className="bg-white p-1.5 rounded-2xl shadow-sm border border-gray-100 h-14 w-fit flex-wrap">
          <TabsTrigger value="overview" className="rounded-xl px-8 font-black text-xs md:text-sm data-[state=active]:bg-primary data-[state=active]:text-white">Overview</TabsTrigger>
          <TabsTrigger value="users" className="rounded-xl px-8 font-black text-xs md:text-sm data-[state=active]:bg-primary data-[state=active]:text-white">Accounts</TabsTrigger>
          <TabsTrigger value="verif" className="rounded-xl px-8 font-black text-xs md:text-sm data-[state=active]:bg-primary data-[state=active]:text-white">Security Queue</TabsTrigger>
        </TabsList>

        {/* Dashboard Overview */}
        <TabsContent value="overview">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="rounded-[2.5rem] border-none shadow-sm bg-white p-8">
                 <CardHeader className="p-0 mb-8 border-b border-gray-50 pb-6 flex flex-row items-center justify-between">
                    <CardTitle className="text-xl font-black">Recent Growth</CardTitle>
                    <TrendingUp className="w-5 h-5 text-green-500" />
                 </CardHeader>
                 <div className="space-y-6">
                    {users.slice(0, 5).map((u, i) => (
                       <div key={i} className="flex items-center justify-between group">
                          <div className="flex items-center gap-4">
                             <Avatar className="w-10 h-10 border-2 border-white shadow-sm">
                                <AvatarFallback className="bg-primary/5 text-primary font-bold">{u.full_name?.charAt(0)}</AvatarFallback>
                             </Avatar>
                             <div>
                                <p className="font-bold text-gray-900 leading-none mb-1">{u.full_name}</p>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{u.role}</p>
                             </div>
                          </div>
                          <Badge className="bg-gray-50 text-gray-400 border-none rounded-full px-3 text-[9px] font-black uppercase tracking-tighter">New User</Badge>
                       </div>
                    ))}
                 </div>
              </Card>

              <Card className="rounded-[2.5rem] border-none shadow-sm bg-gray-900 text-white p-10 relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-8 opacity-10"><Database className="w-48 h-48" /></div>
                 <h3 className="text-2xl font-black mb-4 relative z-10">Infrastructure Health</h3>
                 <p className="text-gray-400 font-medium mb-8 leading-relaxed relative z-10">API endpoints, Auth systems, and Storage buckets are operating within normal parameters.</p>
                 <div className="space-y-4 relative z-10">
                    <div className="flex justify-between border-b border-white/5 pb-4"><span className="text-gray-500 font-bold">API Latency</span><span className="font-black text-primary">24ms</span></div>
                    <div className="flex justify-between border-b border-white/5 pb-4"><span className="text-gray-500 font-bold">Auth Errors</span><span className="font-black text-green-500">0.0%</span></div>
                    <div className="flex justify-between"><span className="text-gray-500 font-bold">Uptime</span><span className="font-black text-primary">99.99%</span></div>
                 </div>
              </Card>
           </div>
        </TabsContent>

        {/* Account Management */}
        <TabsContent value="users">
           <Card className="rounded-[2.5rem] border-none shadow-sm bg-white overflow-hidden">
              <div className="p-8 border-b border-gray-50 flex justify-between items-center">
                 <h3 className="text-2xl font-black">User Directory</h3>
                 <div className="relative w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input placeholder="Search global directory..." className="pl-10 h-11 rounded-xl border-gray-100" />
                 </div>
              </div>
              <div className="overflow-x-auto">
                 <table className="w-full text-left">
                    <thead className="bg-gray-50/50">
                       <tr>
                          <th className="p-8 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Profile</th>
                          <th className="p-8 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Platform Role</th>
                          <th className="p-8 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Actions</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                       {users.map((u) => (
                          <tr key={u.id} className="hover:bg-gray-50/30 transition-colors">
                             <td className="p-8">
                                <div className="flex items-center gap-4">
                                   <Avatar className="w-12 h-12 border-4 border-gray-50">
                                      <AvatarImage src={u.avatar_url} />
                                      <AvatarFallback className="bg-primary/5 text-primary font-black">{u.full_name?.charAt(0)}</AvatarFallback>
                                   </Avatar>
                                   <div>
                                      <p className="font-black text-gray-900 text-lg leading-none mb-1">{u.full_name}</p>
                                      <p className="text-xs text-gray-400 font-bold font-mono">{u.id.slice(0, 16)}...</p>
                                   </div>
                                </div>
                             </td>
                             <td className="p-8">
                                <Badge className={cn("rounded-full px-4 py-1 border-none font-black text-[10px] uppercase tracking-widest",
                                   u.role === 'admin' ? 'bg-purple-100 text-purple-600' :
                                   u.role === 'employer' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                                )}>
                                   {u.role}
                                </Badge>
                             </td>
                             <td className="p-8 text-right">
                                <DropdownMenu>
                                   <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="icon" className="rounded-xl h-10 w-10"><MoreVertical className="w-5 h-5 text-gray-400" /></Button>
                                   </DropdownMenuTrigger>
                                   <DropdownMenuContent className="rounded-2xl p-2 border-gray-100 shadow-2xl" align="end">
                                      <DropdownMenuItem className="rounded-xl gap-3 font-bold py-3"><Mail className="w-4 h-4 text-gray-400" /> Send Warning</DropdownMenuItem>
                                      <DropdownMenuItem onClick={() => handleDelete('profiles', u.id)} className="rounded-xl gap-3 font-bold py-3 text-red-600 focus:text-red-600 focus:bg-red-50"><Trash2 className="w-4 h-4" /> Terminate Account</DropdownMenuItem>
                                   </DropdownMenuContent>
                                </DropdownMenu>
                             </td>
                          </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
           </Card>
        </TabsContent>

        {/* Verification Queue */}
        <TabsContent value="verif">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <AnimatePresence mode="popLayout">
                 {verifications.map((v) => (
                    <motion.div key={v.id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}>
                       <Card className="rounded-[2.5rem] border-none shadow-sm bg-white p-8">
                          <div className="flex justify-between items-start mb-8">
                             <div className="flex gap-4">
                                <Avatar className="w-16 h-16 border-4 border-gray-50 shadow-sm">
                                   <AvatarImage src={v.profile?.avatar_url} />
                                   <AvatarFallback className="bg-primary/5 text-primary font-black text-xl">{v.profile?.full_name?.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                   <h4 className="text-xl font-black text-gray-900 leading-none mb-2">{v.profile?.full_name}</h4>
                                   <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Professional Identity Check</p>
                                </div>
                             </div>
                             <Badge className="bg-yellow-50 text-yellow-600 border-none px-4 py-1 text-[10px] font-black uppercase tracking-widest animate-pulse">Pending</Badge>
                          </div>
                          
                          <div className="bg-gray-50 rounded-2xl p-6 mb-8">
                             <p className="text-sm text-gray-500 font-medium leading-relaxed italic">"Account documents have been uploaded and are ready for system verification."</p>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                             <Button onClick={() => handleAction('verification_requests', v.id, 'approved')} className="rounded-xl h-12 font-black bg-green-600 hover:bg-green-700 shadow-xl shadow-green-100">
                                <CheckCircle2 className="w-4 h-4 mr-2" /> Approve
                             </Button>
                             <Button onClick={() => handleAction('verification_requests', v.id, 'rejected')} variant="outline" className="rounded-xl h-12 font-black border-2 border-red-50 text-red-600 hover:bg-red-50 transition-all">
                                <XCircle className="w-4 h-4 mr-2" /> Decline
                             </Button>
                          </div>
                       </Card>
                    </motion.div>
                 ))}
              </AnimatePresence>
              {verifications.length === 0 && (
                 <div className="col-span-full py-32 text-center bg-white rounded-[3rem] border-2 border-dashed border-gray-100">
                    <ShieldCheck className="w-16 h-16 text-gray-200 mx-auto mb-6" />
                    <h3 className="text-xl font-black text-gray-400 uppercase tracking-widest">No pending verifications</h3>
                 </div>
              )}
           </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');

export default AdminDashboard;
