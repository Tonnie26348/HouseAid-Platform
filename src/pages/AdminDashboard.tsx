import React, { useState, useEffect } from "react";
import { 
  Users, 
  ShieldCheck, 
  FileText, 
  AlertTriangle, 
  TrendingUp, 
  DollarSign, 
  Search, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  MoreVertical,
  Trash2,
  Mail,
  UserCheck,
  Briefcase
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

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    pendingVerifications: 0,
    activeContracts: 0,
    totalRevenue: 0,
    activeJobs: 0
  });
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<any[]>([]);
  const [verifications, setVerifications] = useState<any[]>([]);
  const [jobs, setJobs] = useState<any[]>([]);
  const { toast } = useToast();

  const fetchData = async () => {
    setLoading(true);
    try {
      // 1. Fetch Stats
      const { count: userCount } = await supabase.from('profiles').select('*', { count: 'exact', head: true });
      const { count: pendingCount } = await supabase.from('verification_requests').select('*', { count: 'exact', head: true }).eq('status', 'pending');
      const { count: contractCount } = await supabase.from('contracts').select('*', { count: 'exact', head: true }).eq('status', 'active');
      const { count: jobCount } = await supabase.from('jobs').select('*', { count: 'exact', head: true });

      setStats({
        totalUsers: userCount || 0,
        pendingVerifications: pendingCount || 0,
        activeContracts: contractCount || 0,
        totalRevenue: 1250000, // Dummy for now
        activeJobs: jobCount || 0
      });

      // 2. Fetch Users
      const { data: userData } = await supabase.from('profiles').select('*').order('created_at', { ascending: false }).limit(50);
      setUsers(userData || []);

      // 3. Fetch Verifications
      const { data: verifData } = await supabase.from('verification_requests').select('*, profile:profiles(full_name, avatar_url, role)').order('created_at', { ascending: false });
      setVerifications(verifData || []);

      // 4. Fetch Jobs
      const { data: jobData } = await supabase.from('jobs').select('*, employer:profiles(full_name)').order('created_at', { ascending: false });
      setJobs(jobData || []);

    } catch (error: any) {
      toast({ title: "Admin Error", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleApproveVerification = async (requestId: string, workerId: string) => {
    const { error } = await supabase.from('verification_requests').update({ status: 'approved' }).eq('id', requestId);
    if (!error) {
      toast({ title: "Approved!", description: "Professional is now verified." });
      fetchData();
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm("Are you sure? This will delete the account and all associated data.")) return;
    const { error } = await supabase.from('profiles').delete().eq('id', userId);
    if (!error) {
      toast({ title: "User Deleted" });
      fetchData();
    }
  };

  return (
    <div className="space-y-6 md:space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
         <div>
           <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">System Control</h2>
           <p className="text-gray-500 font-medium mt-1 text-sm md:text-base">Managing HouseAid growth and safety.</p>
         </div>
         <Button onClick={fetchData} variant="outline" className="rounded-xl border-2 font-bold h-12 px-6">
           Refresh Data
         </Button>
      </div>

      {/* Admin Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <DashboardCard title="Total Users" value={stats.totalUsers} icon={Users} valueColorClass="text-primary" />
        <DashboardCard title="Pending Review" value={stats.pendingVerifications} icon={ShieldCheck} valueColorClass="text-blue-600" />
        <DashboardCard title="Active Contracts" value={stats.activeContracts} icon={FileText} valueColorClass="text-green-600" />
        <DashboardCard title="Open Jobs" value={stats.activeJobs} icon={Briefcase} valueColorClass="text-orange-600" />
      </div>

      <Tabs defaultValue="users" className="space-y-6 md:space-y-8">
        <TabsList className="bg-white p-1.5 rounded-2xl shadow-sm border border-gray-100 h-14 w-fit">
          <TabsTrigger value="users" className="rounded-xl px-8 font-black text-sm data-[state=active]:bg-primary data-[state=active]:text-white">
            Users
          </TabsTrigger>
          <TabsTrigger value="verifications" className="rounded-xl px-8 font-black text-sm data-[state=active]:bg-primary data-[state=active]:text-white">
            Verifications
          </TabsTrigger>
          <TabsTrigger value="jobs" className="rounded-xl px-8 font-black text-sm data-[state=active]:bg-primary data-[state=active]:text-white">
            Jobs
          </TabsTrigger>
        </TabsList>

        {/* Users Management */}
        <TabsContent value="users">
          <Card className="rounded-[2rem] border-none shadow-sm overflow-hidden bg-white">
            <div className="p-6 md:p-8 border-b border-gray-50 flex flex-col md:flex-row gap-4 justify-between">
              <h3 className="text-xl font-black text-gray-900">User Management</h3>
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input placeholder="Search users..." className="pl-10 rounded-xl h-11 border-gray-100" />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50/50">
                  <tr>
                    <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest">User</th>
                    <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest">Role</th>
                    <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest">Joined</th>
                    <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {users.map((u) => (
                    <tr key={u.id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="p-6">
                        <div className="flex items-center gap-4">
                           <Avatar className="w-10 h-10 border-2 border-white shadow-sm">
                             <AvatarImage src={u.avatar_url} />
                             <AvatarFallback className="bg-primary/5 text-primary font-bold">{u.full_name?.charAt(0)}</AvatarFallback>
                           </Avatar>
                           <div>
                              <p className="font-bold text-gray-900 leading-none mb-1">{u.full_name}</p>
                              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{u.id.slice(0, 8)}...</p>
                           </div>
                        </div>
                      </td>
                      <td className="p-6">
                        <Badge className={cn(
                          "rounded-full px-3 py-0.5 border-none font-bold text-[10px] uppercase tracking-tighter",
                          u.role === 'admin' ? 'bg-purple-100 text-purple-600' :
                          u.role === 'employer' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                        )}>
                          {u.role}
                        </Badge>
                      </td>
                      <td className="p-6 text-sm text-gray-500 font-medium">
                        {new Date(u.created_at || Date.now()).toLocaleDateString()}
                      </td>
                      <td className="p-6">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 text-gray-400"><MoreVertical className="w-4 h-4" /></Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="rounded-xl p-2 border-gray-100 shadow-xl" align="end">
                            <DropdownMenuItem className="rounded-lg gap-2 text-sm font-bold text-gray-600"><Mail className="w-4 h-4" /> Message</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDeleteUser(u.id)} className="rounded-lg gap-2 text-sm font-bold text-red-600 focus:text-red-600 focus:bg-red-50"><Trash2 className="w-4 h-4" /> Delete Account</DropdownMenuItem>
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

        {/* Verification Tab */}
        <TabsContent value="verifications">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {verifications.map((v) => (
              <Card key={v.id} className="rounded-[2.5rem] border-none shadow-sm bg-white overflow-hidden p-8 flex flex-col">
                <div className="flex justify-between items-start mb-6">
                   <Avatar className="w-16 h-16 border-4 border-gray-50 shadow-sm">
                      <AvatarImage src={v.profile?.avatar_url} />
                      <AvatarFallback className="bg-primary/5 text-primary font-bold">{v.profile?.full_name?.charAt(0)}</AvatarFallback>
                   </Avatar>
                   <Badge className={cn("rounded-full border-none px-4 py-1 text-[10px] font-black uppercase tracking-widest", 
                     v.status === 'pending' ? 'bg-yellow-100 text-yellow-600' : 'bg-green-100 text-green-600')}>
                     {v.status}
                   </Badge>
                </div>
                <h4 className="text-xl font-black text-gray-900 mb-2">{v.profile?.full_name}</h4>
                <p className="text-sm text-gray-500 font-medium mb-6 leading-relaxed">Verification request submitted on {new Date(v.created_at).toLocaleDateString()}. Documentation is ready for review.</p>
                
                <div className="mt-auto flex gap-3">
                   <Button onClick={() => handleApproveVerification(v.id, v.worker_id)} className="flex-1 rounded-xl h-11 font-bold bg-green-600 hover:bg-green-700 shadow-lg shadow-green-100"><CheckCircle2 className="w-4 h-4 mr-2" /> Approve</Button>
                   <Button variant="outline" className="flex-1 rounded-xl h-11 font-bold border-2"><XCircle className="w-4 h-4 mr-2" /> Decline</Button>
                </div>
              </Card>
            ))}
            {verifications.length === 0 && (
              <div className="lg:col-span-3 text-center py-20 bg-white rounded-[2rem] border-2 border-dashed border-gray-100">
                 <ShieldCheck className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                 <p className="font-bold text-gray-400 uppercase tracking-widest text-sm">No pending requests</p>
              </div>
            )}
          </div>
        </TabsContent>

        {/* Jobs Management */}
        <TabsContent value="jobs">
           <Card className="rounded-[2rem] border-none shadow-sm overflow-hidden bg-white p-8">
              <div className="grid gap-6">
                {jobs.map((j) => (
                  <div key={j.id} className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 rounded-3xl border border-gray-50 hover:bg-gray-50/50 transition-colors">
                     <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-primary/5 text-primary flex items-center justify-center flex-shrink-0">
                           <Briefcase className="w-6 h-6" />
                        </div>
                        <div>
                           <h4 className="font-black text-gray-900 text-lg">{j.title}</h4>
                           <p className="text-sm text-gray-400 font-medium">Employer: {j.employer?.full_name} • {j.location}</p>
                        </div>
                     </div>
                     <div className="flex items-center gap-3">
                        <Badge className="bg-blue-50 text-blue-600 border-none rounded-full px-4 font-bold">Active</Badge>
                        <Button variant="ghost" size="icon" className="rounded-full text-red-400 hover:text-red-600 hover:bg-red-50"><Trash2 className="w-5 h-5" /></Button>
                     </div>
                  </div>
                ))}
              </div>
           </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');

export default AdminDashboard;
