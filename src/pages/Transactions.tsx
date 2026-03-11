import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CreditCard, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Clock, 
  CheckCircle2, 
  Search,
  Filter,
  DollarSign,
  TrendingUp,
  Wallet
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const Transactions = () => {
  const { user, userRole } = useAuth();
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchPayments = async () => {
      if (!user) return;
      setLoading(true);
      
      // Fetch payments through the contracts relationship
      const { data, error } = await supabase
        .from('payments')
        .select(`
          *,
          contract:contracts(
            employer:profiles!contracts_employer_id_fkey(full_name),
            worker:profiles!contracts_worker_id_fkey(full_name)
          )
        `)
        .order('created_at', { ascending: false });

      if (!error && data) {
        setPayments(data);
      }
      setLoading(false);
    };

    fetchPayments();
  }, [user]);

  const stats = {
    total: payments.reduce((acc, curr) => acc + (curr.status === 'completed' ? curr.amount : 0), 0),
    pending: payments.reduce((acc, curr) => acc + (curr.status === 'pending' ? curr.amount : 0), 0),
    count: payments.length
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Financial Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
         <div>
           <h2 className="text-3xl font-black text-gray-900 tracking-tight">Financial Overview</h2>
           <p className="text-gray-500 font-medium">Track your earnings and payments securely.</p>
         </div>
         <Button className="h-12 rounded-xl font-bold bg-primary shadow-lg shadow-primary/20">
            <Wallet className="w-4 h-4 mr-2" /> Withdraw Funds
         </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
         <Card className="rounded-[2rem] border-none shadow-sm bg-white p-8 overflow-hidden relative group">
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform duration-500">
               <TrendingUp className="w-24 h-24 text-primary" />
            </div>
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Total {userRole === 'worker' ? 'Earned' : 'Spent'}</p>
            <h3 className="text-4xl font-black text-gray-900">KSh {stats.total.toLocaleString()}</h3>
            <div className="mt-4 flex items-center gap-2 text-green-500 font-bold text-xs">
               <ArrowUpRight className="w-4 h-4" /> +12.5% from last month
            </div>
         </Card>

         <Card className="rounded-[2rem] border-none shadow-sm bg-white p-8 overflow-hidden relative group">
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform duration-500">
               <Clock className="w-24 h-24 text-orange-500" />
            </div>
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Pending Clearance</p>
            <h3 className="text-4xl font-black text-gray-900">KSh {stats.pending.toLocaleString()}</h3>
            <p className="mt-4 text-gray-400 font-medium text-xs">Awaiting transaction verification</p>
         </Card>

         <Card className="rounded-[2rem] border-none shadow-sm bg-gray-900 text-white p-8 overflow-hidden relative group">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform duration-500">
               <CreditCard className="w-24 h-24 text-primary" />
            </div>
            <p className="text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Active Contracts</p>
            <h3 className="text-4xl font-black text-white">{stats.count}</h3>
            <p className="mt-4 text-primary font-bold text-xs">View active agreements</p>
         </Card>
      </div>

      {/* Transactions List */}
      <Card className="rounded-[2.5rem] border-none shadow-sm bg-white overflow-hidden">
         <div className="p-8 border-b border-gray-50 flex flex-col md:flex-row gap-4 justify-between items-center">
            <h3 className="text-xl font-black text-gray-900">Transaction History</h3>
            <div className="relative w-full md:w-80">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
               <Input placeholder="Search transactions..." className="pl-10 h-11 rounded-xl border-gray-100 font-medium" />
            </div>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead className="bg-gray-50/50">
                  <tr>
                     <th className="p-8 text-[10px] font-black text-gray-400 uppercase tracking-widest">Transaction</th>
                     <th className="p-8 text-[10px] font-black text-gray-400 uppercase tracking-widest">Party</th>
                     <th className="p-8 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                     <th className="p-8 text-[10px] font-black text-gray-400 uppercase tracking-widest">Date</th>
                     <th className="p-8 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Amount</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-50">
                  <AnimatePresence>
                     {payments.map((p, i) => (
                        <motion.tr 
                          key={p.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="hover:bg-gray-50/50 transition-colors group"
                        >
                           <td className="p-8">
                              <div className="flex items-center gap-4">
                                 <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", 
                                   p.status === 'completed' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600')}>
                                    {userRole === 'worker' ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                                 </div>
                                 <div>
                                    <p className="font-bold text-gray-900 leading-none mb-1">{p.payment_method}</p>
                                    <p className="text-[10px] text-gray-400 font-black font-mono tracking-tighter">{p.transaction_id || 'HA-000000'}</p>
                                 </div>
                              </div>
                           </td>
                           <td className="p-8">
                              <p className="font-bold text-gray-700">
                                 {userRole === 'worker' ? p.contract?.employer?.full_name : p.contract?.worker?.full_name}
                              </p>
                           </td>
                           <td className="p-8">
                              <Badge className={cn("rounded-full border-none px-3 py-0.5 text-[9px] font-black uppercase tracking-widest",
                                p.status === 'completed' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600')}>
                                 {p.status}
                              </Badge>
                           </td>
                           <td className="p-8 text-sm text-gray-500 font-medium">
                              {new Date(p.created_at).toLocaleDateString()}
                           </td>
                           <td className="p-8 text-right">
                              <span className="text-lg font-black text-gray-900">KSh {p.amount.toLocaleString()}</span>
                           </td>
                        </motion.tr>
                     ))}
                  </AnimatePresence>
               </tbody>
            </table>
            
            {payments.length === 0 && !loading && (
               <div className="py-32 text-center">
                  <CreditCard className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                  <p className="font-bold text-gray-400 uppercase tracking-widest text-sm">No transactions yet</p>
               </div>
            )}
         </div>
      </Card>
    </div>
  );
};

export default Transactions;
