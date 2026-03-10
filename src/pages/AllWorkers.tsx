import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Star, 
  ShieldCheck, 
  Search, 
  Filter, 
  MapPin, 
  UserCheck,
  GraduationCap
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import Messaging from "@/components/shared/Messaging";
import ReviewForm from "@/components/shared/ReviewForm";
import MPesaPayment from "@/components/shared/MPesaPayment";

const AllWorkers = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [workers, setWorkers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: "",
    skill: "all",
  });

  const fetchWorkers = async () => {
    setLoading(true);
    let query = supabase
      .from("profiles")
      .select(`
        *,
        verification:verification_requests(status),
        enrollments:enrollments(status, course:courses(title))
      `)
      .eq("role", "worker");

    if (filters.search) {
      query = query.ilike("full_name", `%${filters.search}%`);
    }

    const { data, error } = await query;

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      let filteredData = data || [];
      if (filters.skill !== "all") {
        filteredData = filteredData.filter(w => 
          w.skills?.some((s: string) => s.toLowerCase().includes(filters.skill.toLowerCase()))
        );
      }
      setWorkers(filteredData);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchWorkers();
  }, [filters.skill]);

  return (
    <div className="flex flex-col gap-8">
      {/* Modern Search Bar */}
      <div className="bg-white p-6 rounded-[2rem] md:rounded-[2.5rem] shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input 
              placeholder="Search professionals by name..." 
              className="pl-12 h-12 md:h-14 rounded-xl md:rounded-2xl border-gray-100 focus:ring-primary text-base md:text-lg"
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              onKeyDown={(e) => e.key === 'Enter' && fetchWorkers()}
            />
          </div>
          <Button size="lg" className="h-12 md:h-14 px-8 rounded-xl md:rounded-2xl shadow-lg shadow-primary/20 w-full md:w-auto" onClick={fetchWorkers}>
            Find Talent
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar Filters */}
        <aside className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-gray-100 shadow-sm sticky top-24">
            <div className="flex items-center gap-2 mb-6 md:mb-8">
              <Filter className="w-5 h-5 text-primary" />
              <h3 className="font-black text-xl text-gray-900">Filters</h3>
            </div>
            
            <div className="space-y-8">
              <div className="space-y-4">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Specialization</label>
                <Select onValueChange={(val) => setFilters({ ...filters, skill: val })} value={filters.skill}>
                  <SelectTrigger className="rounded-xl h-12 border-gray-100 font-bold">
                    <SelectValue placeholder="All Specializations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Fields</SelectItem>
                    <SelectItem value="nanny">Childcare / Nanny</SelectItem>
                    <SelectItem value="chef">Culinary / Chef</SelectItem>
                    <SelectItem value="cleaning">Housekeeping</SelectItem>
                    <SelectItem value="gardening">Gardening</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Card className="bg-primary/5 border-none p-6 rounded-3xl">
                 <div className="flex items-center gap-2 mb-2">
                    <UserCheck className="w-4 h-4 text-primary" />
                    <span className="text-sm font-bold text-primary">Pro Tip</span>
                 </div>
                 <p className="text-xs text-primary/70 leading-relaxed font-medium">
                   Verified professionals with the blue badge have passed our rigorous 
                   background check.
                 </p>
              </Card>
            </div>
          </div>
        </aside>

        {/* Workers Grid */}
        <div className="lg:col-span-3">
          {loading ? (
            <div className="grid md:grid-cols-2 gap-6">
              {[1,2,3,4].map(i => <div key={i} className="h-80 bg-white animate-pulse rounded-[2.5rem] border border-gray-100" />)}
            </div>
          ) : workers.length === 0 ? (
            <div className="text-center py-20 md:py-24 bg-white rounded-[2rem] md:rounded-[3rem] border border-dashed border-gray-200 px-6">
              <Search className="w-12 h-12 md:w-16 md:h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg md:text-xl font-bold text-gray-900">No professionals found</h3>
              <p className="text-gray-500 text-sm md:text-base">Try adjusting your search or filters.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {workers.map((worker, idx) => (
                <motion.div
                  key={worker.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Card className="group hover:shadow-2xl transition-all duration-500 rounded-[2rem] md:rounded-[2.5rem] border-none shadow-sm overflow-hidden bg-white h-full">
                    <CardContent className="p-0">
                      <div className="p-6 md:p-8">
                        <div className="flex items-center gap-4 md:gap-5 mb-6">
                          <div className="relative">
                            <Avatar className="w-16 h-16 md:w-20 md:h-20 border-4 border-gray-50 shadow-sm group-hover:scale-105 transition-transform duration-500">
                              <AvatarImage src={worker.avatar_url} />
                              <AvatarFallback className="text-xl bg-primary/10 text-primary font-bold">
                                {worker.full_name?.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            {worker.verification?.[0]?.status === 'approved' && (
                              <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-sm">
                                <ShieldCheck className="w-5 h-5 md:w-6 md:h-6 text-blue-500" fill="currentColor" />
                              </div>
                            )}
                          </div>
                          <div className="min-w-0">
                            <h3 className="text-xl md:text-2xl font-black text-gray-900 group-hover:text-primary transition-colors truncate">
                              {worker.full_name}
                            </h3>
                            <div className="flex items-center gap-1.5 text-gray-400 font-bold text-[10px] md:text-xs uppercase tracking-widest mt-1">
                              <Star className="w-3 h-3 text-yellow-500 fill-current" />
                              <span>4.9 (24 Reviews)</span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4 mb-8">
                          <div className="flex flex-wrap gap-2">
                            {worker.skills?.slice(0, 3).map((skill: string, i: number) => (
                              <Badge key={i} className="bg-gray-50 text-gray-600 border-none font-bold text-[10px] uppercase tracking-tighter px-3 py-1">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                          
                          {/* Certification Badges */}
                          {worker.enrollments?.some((e: any) => e.status === 'completed') && (
                            <div className="flex flex-wrap gap-2 mt-2">
                              {worker.enrollments
                                .filter((e: any) => e.status === 'completed')
                                .map((e: any, i: number) => (
                                  <Badge key={i} className="bg-primary/10 text-primary border-none font-black text-[9px] uppercase tracking-widest px-2 py-0.5 flex items-center gap-1">
                                    <GraduationCap className="w-3 h-3" />
                                    {e.course?.title} Certified
                                  </Badge>
                                ))}
                            </div>
                          )}
                          <div className="flex items-center justify-between text-sm font-bold">
                             <div className="flex items-center gap-1.5 text-gray-500">
                                <MapPin className="w-4 h-4" />
                                <span>Nairobi</span>
                             </div>
                             <div className="text-primary">
                                KSh {worker.hourly_rate?.toLocaleString() || '1,000'} / day
                             </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-2 md:gap-3">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" className="rounded-xl font-bold border-2 h-10 md:h-11 px-0 text-xs md:text-sm">Chat</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px] rounded-[2rem] p-0 overflow-hidden">
                              <DialogHeader className="p-6 pb-0"><DialogTitle>Chat with {worker.full_name}</DialogTitle></DialogHeader>
                              <div className="h-[400px]">
                                <Messaging receiverId={worker.id} receiverName={worker.full_name} />
                              </div>
                            </DialogContent>
                          </Dialog>

                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" className="rounded-xl font-bold border-2 h-10 md:h-11 px-0 text-xs md:text-sm">Rate</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px] rounded-[2rem]">
                              <DialogHeader><DialogTitle>Rate {worker.full_name}</DialogTitle></DialogHeader>
                              <ReviewForm revieweeId={worker.id} />
                            </DialogContent>
                          </Dialog>

                          <Dialog>
                            <DialogTrigger asChild>
                              <Button className="rounded-xl font-bold shadow-lg shadow-primary/10 h-10 md:h-11 px-0 bg-green-600 hover:bg-green-700 text-xs md:text-sm">Hire</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px] rounded-[2rem]">
                              <DialogHeader><DialogTitle>Hire {worker.full_name}</DialogTitle></DialogHeader>
                              <MPesaPayment amount={worker.hourly_rate || 1000} workerName={worker.full_name} />
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllWorkers;