import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/components/ui/use-toast";
import DashboardLayout from "@/components/shared/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Search, 
  MessageSquare, 
  ShieldCheck, 
  Calendar, 
  MapPin, 
  MoreVertical,
  Plus
} from "lucide-react";
import { motion } from "framer-motion";

const MyWorkers = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [workers, setWorkers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyWorkers = async () => {
      if (user) {
        setLoading(true);
        const { data, error } = await supabase
          .from("contracts")
          .select(`
            *,
            worker:worker_id (id, full_name, avatar_url, skills, experience)
          `)
          .eq("employer_id", user.id);

        if (error) {
          toast({ title: "Error", description: error.message, variant: "destructive" });
        } else if (data) {
          setWorkers(data.map((c: any) => ({ ...c.worker, contract_status: c.status, contract_id: c.id })));
        }
        setLoading(false);
      }
    };
    fetchMyWorkers();
  }, [user, toast]);

  if (loading) {
    return (
      <DashboardLayout pageTitle="My Team">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 animate-pulse">
          {[1,2,3].map(i => <div key={i} className="h-80 bg-white rounded-[2.5rem] border border-gray-100" />)}
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout pageTitle="Manage Staff">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
           <div>
             <h2 className="text-3xl font-black text-gray-900 tracking-tight">Your Professional Team</h2>
             <p className="text-gray-500 font-medium">Overview of active staff and their performance status.</p>
           </div>
           <Button asChild size="lg" className="rounded-xl h-14 px-8 font-black shadow-lg shadow-primary/20">
             <Link to="/platform/all-workers"><Plus className="w-5 h-5 mr-2" /> Recruit New Talent</Link>
           </Button>
        </div>

        {workers.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-[3rem] border border-dashed border-gray-200">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900">No professionals hired yet</h3>
            <p className="text-gray-500 max-w-xs mx-auto mb-8">Start your recruitment journey by browsing our verified domestic professionals.</p>
            <Button asChild size="lg" className="rounded-xl h-12 px-8 font-bold">
              <Link to="/platform/all-workers">Browse Workers</Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {workers.map((worker, idx) => (
              <motion.div
                key={worker.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="rounded-[2.5rem] border-none shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden bg-white group">
                  <CardContent className="p-0">
                    <div className="p-8">
                      <div className="flex justify-between items-start mb-6">
                        <div className="relative">
                          <Avatar className="w-20 h-20 border-4 border-gray-50 shadow-sm group-hover:scale-105 transition-transform duration-500">
                            <AvatarImage src={worker.avatar_url} />
                            <AvatarFallback className="text-xl bg-primary/5 text-primary font-bold">
                              {worker.full_name?.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-sm">
                            <ShieldCheck className="w-6 h-6 text-blue-500" fill="currentColor" />
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" className="rounded-full"><MoreVertical className="w-5 h-5 text-gray-400" /></Button>
                      </div>

                      <div className="space-y-1 mb-6">
                        <h3 className="text-2xl font-black text-gray-900 truncate">{worker.full_name}</h3>
                        <Badge className="bg-green-50 text-green-600 border-none rounded-full px-3 font-bold uppercase text-[10px] tracking-widest">
                          {worker.contract_status} Agreement
                        </Badge>
                      </div>

                      <div className="space-y-4 mb-8">
                        <div className="flex flex-wrap gap-2">
                          {worker.skills?.slice(0, 3).map((skill: string, i: number) => (
                            <Badge key={i} className="bg-gray-50 text-gray-500 border-none font-bold text-[10px] uppercase tracking-tighter px-3 py-1">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center gap-4 text-gray-400 font-bold text-xs uppercase tracking-widest">
                           <div className="flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5" /> <span>Hired 2024</span>
                           </div>
                           <div className="flex items-center gap-1.5">
                              <MapPin className="w-3.5 h-3.5" /> <span>On-site</span>
                           </div>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Button variant="outline" className="flex-1 rounded-xl font-bold border-2 h-12" asChild>
                          <Link to={`/platform/profile`}>Details</Link>
                        </Button>
                        <Button className="flex-1 rounded-xl font-bold shadow-lg shadow-primary/10 h-12 gap-2">
                          <MessageSquare className="w-4 h-4" /> Chat
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default MyWorkers;

export default MyWorkers;
