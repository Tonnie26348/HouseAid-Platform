import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/components/ui/use-toast";
import DashboardLayout from "@/components/shared/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Calendar, 
  MapPin, 
  DollarSign, 
  CheckCircle2, 
  Clock, 
  ArrowRight,
  ShieldCheck,
  MoreVertical
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Contracts = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [contracts, setContracts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContracts = async () => {
      if (user) {
        setLoading(true);
        const { data, error } = await supabase
          .from("contracts")
          .select(`
            *,
            job:jobs (title, description, location, salary),
            worker:profiles!contracts_worker_id_fkey (full_name, avatar_url),
            employer:profiles!contracts_employer_id_fkey (full_name, avatar_url)
          `)
          .or(`worker_id.eq.${user.id},employer_id.eq.${user.id}`);

        if (error) {
          toast({ title: "Error", description: error.message, variant: "destructive" });
        } else {
          setContracts(data || []);
        }
        setLoading(false);
      }
    };
    fetchContracts();
  }, [user, toast]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-green-50 text-green-600 border-green-100';
      case 'pending': return 'bg-yellow-50 text-yellow-600 border-yellow-100';
      case 'completed': return 'bg-blue-50 text-blue-600 border-blue-100';
      default: return 'bg-gray-50 text-gray-600 border-gray-100';
    }
  };

  if (loading) {
    return (
      <DashboardLayout pageTitle="My Contracts">
        <div className="grid gap-6 md:grid-cols-2 animate-pulse">
          {[1,2,3,4].map(i => <div key={i} className="h-64 bg-white rounded-[2rem] border border-gray-100" />)}
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout pageTitle="Contract Management">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
           <div>
             <h2 className="text-2xl font-black text-gray-900 tracking-tight">Active Agreements</h2>
             <p className="text-gray-500 font-medium">Manage your professional relationships and payment terms.</p>
           </div>
           <Button className="rounded-xl h-12 px-6 font-bold shadow-lg shadow-primary/10">
             <FileText className="w-4 h-4 mr-2" /> Export History
           </Button>
        </div>

        {contracts.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-[3rem] border border-dashed border-gray-200">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900">No active contracts</h3>
            <p className="text-gray-500 max-w-xs mx-auto">Once you hire a professional or get hired, your contracts will appear here.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {contracts.map((contract, idx) => (
              <motion.div
                key={contract.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="rounded-[2.5rem] border-none shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden bg-white group">
                  <CardHeader className="p-8 pb-0">
                    <div className="flex justify-between items-start mb-6">
                      <Badge className={cn("rounded-full px-4 py-1 border font-bold capitalize", getStatusColor(contract.status))}>
                        {contract.status}
                      </Badge>
                      <Button variant="ghost" size="icon" className="rounded-full"><MoreVertical className="w-5 h-5 text-gray-400" /></Button>
                    </div>
                    <CardTitle className="text-2xl font-black text-gray-900 group-hover:text-primary transition-colors">
                      {contract.job?.title || 'Professional Service'}
                    </CardTitle>
                    <div className="flex items-center gap-2 text-gray-400 font-bold text-xs uppercase tracking-widest mt-2">
                       <Clock className="w-3 h-3" />
                       <span>Started {new Date(contract.created_at).toLocaleDateString()}</span>
                    </div>
                  </CardHeader>

                  <CardContent className="p-8">
                    <div className="grid grid-cols-2 gap-6 mb-8">
                       <div className="space-y-3">
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Professional</p>
                          <div className="flex items-center gap-3">
                             <Avatar className="h-10 w-10 border-2 border-gray-50">
                               <AvatarImage src={contract.worker?.avatar_url} />
                               <AvatarFallback>{contract.worker?.full_name?.charAt(0)}</AvatarFallback>
                             </Avatar>
                             <span className="font-bold text-gray-700 truncate">{contract.worker?.full_name}</span>
                          </div>
                       </div>
                       <div className="space-y-3 text-right md:text-left">
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Employer</p>
                          <div className="flex items-center justify-end md:justify-start gap-3">
                             <span className="font-bold text-gray-700 truncate">{contract.employer?.full_name}</span>
                             <Avatar className="h-10 w-10 border-2 border-gray-50">
                               <AvatarImage src={contract.employer?.avatar_url} />
                               <AvatarFallback>{contract.employer?.full_name?.charAt(0)}</AvatarFallback>
                             </Avatar>
                          </div>
                       </div>
                    </div>

                    <div className="bg-gray-50 rounded-2xl p-4 flex items-center justify-between mb-8">
                       <div className="flex items-center gap-2 text-gray-600 font-bold">
                          <DollarSign className="w-4 h-4 text-green-600" />
                          <span>KSh {contract.job?.salary?.toLocaleString() || 'Negotiated'}</span>
                       </div>
                       <div className="flex items-center gap-2 text-gray-600 font-bold">
                          <MapPin className="w-4 h-4 text-primary" />
                          <span className="text-sm">{contract.job?.location || 'On-site'}</span>
                       </div>
                    </div>

                    <div className="flex gap-3">
                       <Button variant="outline" className="flex-1 rounded-xl h-12 font-bold border-2">View Details</Button>
                       <Button className="flex-1 rounded-xl h-12 font-bold shadow-lg shadow-primary/10">Manage Work</Button>
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

const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');

export default Contracts;

