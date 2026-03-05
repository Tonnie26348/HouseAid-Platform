import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";
import DashboardLayout from "@/components/shared/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Users, 
  Info, 
  ClipboardCheck, 
  ShieldCheck, 
  MessageSquare,
  ArrowLeft,
  Heart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const EmployerProfileView = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [employer, setEmployer] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployer = async () => {
      if (!id) return;
      setLoading(true);
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        setEmployer(data);
      }
      setLoading(false);
    };

    fetchEmployer();
  }, [id, toast]);

  if (loading) {
    return (
      <DashboardLayout pageTitle="Loading Profile...">
        <div className="max-w-5xl mx-auto animate-pulse space-y-8">
           <div className="h-64 bg-gray-100 rounded-[2.5rem]" />
           <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2 h-96 bg-gray-100 rounded-[2rem]" />
              <div className="h-64 bg-gray-100 rounded-[2rem]" />
           </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!employer) return null;

  return (
    <DashboardLayout pageTitle={`${employer.full_name}'s Profile`}>
      <div className="max-w-5xl mx-auto space-y-8 pb-20">
        <Link to="/platform/jobs" className="inline-flex items-center text-gray-500 hover:text-primary transition-colors font-medium">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Listings
        </Link>

        {/* Profile Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden text-center md:text-left"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative flex flex-col md:flex-row gap-8 items-center">
            <Avatar className="w-32 h-32 border-4 border-white shadow-xl">
              <AvatarImage src={employer.avatar_url} />
              <AvatarFallback className="text-3xl bg-primary/10 text-primary">{employer.full_name?.charAt(0)}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1 space-y-4">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">{employer.full_name}</h1>
                <Badge className="bg-blue-50 text-blue-600 rounded-full px-4 border-none font-bold">Verified Household</Badge>
              </div>
              
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-gray-500 font-medium">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{employer.address || 'Nairobi, Kenya'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>{employer.family_members || '0'} Family Members</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
               <Button className="rounded-xl h-12 px-6 font-bold shadow-lg shadow-primary/20">
                 <MessageSquare className="w-4 h-4 mr-2" /> Message
               </Button>
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="md:col-span-2 space-y-8">
            <Card className="rounded-[2rem] border-none shadow-sm p-8 bg-white">
              <h3 className="text-xl font-extrabold text-gray-900 mb-6 flex items-center gap-2">
                <Info className="w-5 h-5 text-primary" />
                About Our Household
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed whitespace-pre-wrap">
                {employer.bio || "No household description provided."}
              </p>
            </Card>

            <div className="grid sm:grid-cols-2 gap-8">
               <Card className="rounded-[2rem] border-none shadow-sm p-8 bg-white">
                 <h3 className="text-lg font-extrabold text-gray-900 mb-4 flex items-center gap-2">
                   <ClipboardCheck className="w-5 h-5 text-secondary" />
                   Expectations
                 </h3>
                 <p className="text-sm text-gray-600 leading-relaxed">
                   {employer.expectations || "Standard professional conduct expected."}
                 </p>
               </Card>
               <Card className="rounded-[2rem] border-none shadow-sm p-8 bg-white">
                 <h3 className="text-lg font-extrabold text-gray-900 mb-4 flex items-center gap-2">
                   <ShieldCheck className="w-5 h-5 text-green-500" />
                   Household Rules
                 </h3>
                 <p className="text-sm text-gray-600 leading-relaxed">
                   {employer.household_rules || "Safety and mutual respect are our priority."}
                 </p>
               </Card>
            </div>
          </div>

          {/* Sidebar Info */}
          <aside className="space-y-8">
            <Card className="rounded-[2rem] border-none shadow-sm p-8 bg-white">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Benefits Offered</h3>
              <div className="flex flex-wrap gap-2">
                {employer.benefits_offered?.map((benefit: string, i: number) => (
                  <Badge key={i} className="bg-primary/5 text-primary border-none rounded-lg px-3 py-1.5 font-bold">
                    {benefit}
                  </Badge>
                )) || <p className="text-sm text-gray-400">Standard benefits packages apply.</p>}
              </div>
            </Card>

            <Card className="rounded-[2rem] border-none shadow-sm p-8 bg-gray-900 text-white overflow-hidden relative">
               <div className="absolute top-0 right-0 p-4 opacity-10">
                 <Heart className="w-20 h-20 fill-current" />
               </div>
               <h3 className="text-lg font-bold mb-4 relative z-10">Why work with us?</h3>
               <p className="text-gray-400 text-sm leading-relaxed relative z-10">
                 We believe in professional relationships built on trust and mutual respect. 
                 Join our household to start your next professional journey.
               </p>
            </Card>
          </aside>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EmployerProfileView;

