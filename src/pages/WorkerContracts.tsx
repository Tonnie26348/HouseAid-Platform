import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/components/ui/use-toast";
import DashboardLayout from "@/components/shared/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FileCheck, 
  XCircle, 
  Calendar, 
  DollarSign, 
  MapPin, 
  Clock, 
  ArrowRight,
  ShieldCheck,
  Briefcase
} from "lucide-react";

const WorkerContracts = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [contracts, setContracts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkerContracts = async () => {
      if (user) {
        setLoading(true);
        const { data, error } = await supabase
          .from("contracts")
          .select(`
            *,
            employer:employer_id (id, full_name, avatar_url, address)
          `)
          .eq("worker_id", user.id);

        if (error) {
          toast({ title: "Error", description: error.message, variant: "destructive" });
        } else {
          setContracts(data || []);
        }
        setLoading(false);
      }
    };
    fetchWorkerContracts();
  }, [user, toast]);

  const handleContractAction = async (contractId: number, status: 'accepted' | 'rejected') => {
    const { error } = await supabase
      .from("contracts")
      .update({ status: status })
      .eq("id", contractId);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ 
        title: status === 'accepted' ? "Agreement Active!" : "Offer Declined", 
        description: `You have successfully ${status} the contract.` 
      });
      setContracts(contracts.map(c => c.id === contractId ? { ...c, status } : c));
    }
  };

  if (loading) {
    return (
      <DashboardLayout pageTitle="Contract Offers">
        <div className="grid gap-6 md:grid-cols-2 animate-pulse">
          {[1,2].map(i => <div key={i} className="h-80 bg-white rounded-[2.5rem] border border-gray-100" />)}
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout pageTitle="Career Agreements">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
           <div>
             <h2 className="text-3xl font-black text-gray-900 tracking-tight">Contract Management</h2>
             <p className="text-gray-500 font-medium">Review and manage your professional employment offers.</p>
           </div>
           <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white shadow-sm border border-gray-100">
              <ShieldCheck className="w-5 h-5 text-green-600" />
              <span className="font-bold text-gray-900 text-sm uppercase tracking-widest">Legal Protection Active</span>
           </div>
        </div>

        {contracts.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-[3rem] border border-dashed border-gray-200">
            <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900">No offers yet</h3>
            <p className="text-gray-500 max-w-xs mx-auto">Apply for jobs to receive contract offers from households.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            <AnimatePresence mode="popLayout">
              {contracts.map((contract, idx) => (
                <motion.div
                  key={contract.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card className="rounded-[2.5rem] border-none shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden bg-white group h-full flex flex-col">
                    <CardHeader className="p-8">
                      <div className="flex justify-between items-start mb-6">
                        <Badge className={cn(
                          "rounded-full px-4 py-1 border font-black uppercase text-[10px] tracking-widest",
                          contract.status === 'pending' ? 'bg-yellow-50 text-yellow-600 border-yellow-100' :
                          contract.status === 'accepted' ? 'bg-green-50 text-green-600 border-green-100' :
                          'bg-gray-50 text-gray-400 border-gray-100'
                        )}>
                          {contract.status === 'pending' ? 'New Offer' : contract.status}
                        </Badge>
                        <div className="text-gray-400 font-bold text-xs uppercase tracking-widest">#{contract.id}</div>
                      </div>
                      
                      <div className="flex items-center gap-4 mb-6">
                        <Avatar className="w-16 h-16 border-4 border-gray-50 shadow-sm group-hover:scale-105 transition-transform duration-500">
                          <AvatarImage src={contract.employer?.avatar_url} />
                          <AvatarFallback className="text-xl bg-primary/5 text-primary font-bold">
                            {contract.employer?.full_name?.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="text-2xl font-black text-gray-900 truncate">
                            {contract.employer?.full_name}
                          </h3>
                          <div className="flex items-center gap-1.5 text-gray-400 font-bold text-xs uppercase tracking-widest mt-1">
                            <MapPin className="w-3 h-3 text-primary" />
                            <span>{contract.employer?.address || 'Verified Household'}</span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="p-8 pt-0 flex-1 flex flex-col">
                      <div className="bg-gray-50/50 rounded-3xl p-6 space-y-4 mb-8">
                         <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2 text-gray-400 font-bold text-[10px] uppercase tracking-tighter">
                               <DollarSign className="w-3.5 h-3.5" /> Proposed Salary
                            </div>
                            <span className="font-black text-gray-900">KSh {contract.salary?.toLocaleString()} / {contract.payment_basis}</span>
                         </div>
                         <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2 text-gray-400 font-bold text-[10px] uppercase tracking-tighter">
                               <Calendar className="w-3.5 h-3.5" /> Start Date
                            </div>
                            <span className="font-bold text-gray-700">{new Date(contract.start_date).toLocaleDateString()}</span>
                         </div>
                      </div>

                      <div className="mt-auto space-y-3">
                        {contract.status === 'pending' ? (
                          <div className="grid grid-cols-2 gap-3">
                            <Button 
                              onClick={() => handleContractAction(contract.id, 'accepted')}
                              className="rounded-xl h-12 font-black shadow-lg shadow-primary/10 bg-primary hover:bg-primary/90"
                            >
                              <FileCheck className="w-4 h-4 mr-2" /> Accept
                            </Button>
                            <Button 
                              variant="outline"
                              onClick={() => handleContractAction(contract.id, 'rejected')}
                              className="rounded-xl h-12 font-black border-2 hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-all"
                            >
                              <XCircle className="w-4 h-4 mr-2" /> Decline
                            </Button>
                          </div>
                        ) : (
                          <Button variant="outline" className="w-full rounded-xl h-12 font-black border-2" asChild>
                             <Link to="/platform/messages">
                               Message Household <ArrowRight className="ml-2 w-4 h-4" />
                             </Link>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');

export default WorkerContracts;

