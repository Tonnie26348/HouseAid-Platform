import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useParams, Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import DashboardLayout from "@/components/shared/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { 
  MapPin, 
  Calendar, 
  DollarSign, 
  Briefcase, 
  ArrowLeft, 
  ShieldCheck, 
  Clock,
  Share2,
  CheckCircle2
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";

const JobDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [applied, setApplied] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchJob = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("jobs")
        .select(`
            *,
            household:profiles (id, full_name, avatar_url, bio, address)
        `)
        .eq("id", id)
        .single();

      if (error) {
        toast({
          title: "Error fetching job details",
          description: error.message,
          variant: "destructive",
        });
      } else {
        setJob(data);
      }
      setLoading(false);
    };

    const checkApplication = async () => {
        if (user && id) {
            const { data } = await supabase
                .from('job_applications')
                .select('id')
                .eq('job_id', id)
                .eq('worker_id', user.id)
                .maybeSingle();
            
            if (data) {
                setApplied(true);
            }
        }
    }

    fetchJob();
    checkApplication();
  }, [id, user, toast]);

  const handleApply = async () => {
    if (user && id) {
        const { error } = await supabase.from('job_applications').insert({
            job_id: id,
            worker_id: user.id,
        });

        if (error) {
            toast({
                title: "Error applying",
                description: error.message,
                variant: "destructive",
            });
        } else {
            toast({
                title: "Application Sent!",
                description: "The household has been notified of your interest.",
            });
            setApplied(true);
        }
    }
  }

  if (loading) {
    return (
      <DashboardLayout pageTitle="Loading Job...">
        <div className="animate-pulse space-y-8">
          <div className="h-48 bg-gray-100 rounded-[2.5rem]" />
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 h-96 bg-gray-100 rounded-[2rem]" />
            <div className="h-64 bg-gray-100 rounded-[2rem]" />
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!job) {
    return (
      <DashboardLayout pageTitle="Job Not Found">
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold">This job listing no longer exists.</h2>
          <Button asChild className="mt-4"><Link to="/platform/jobs">Browse Jobs</Link></Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout pageTitle="Job Details">
      <div className="max-w-6xl mx-auto space-y-8 pb-20">
        {/* Back Button */}
        <Link to="/platform/jobs" className="inline-flex items-center text-gray-500 hover:text-primary transition-colors font-medium">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Job Listings
        </Link>

        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-gray-100 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8">
             <Button variant="ghost" size="icon" className="rounded-full"><Share2 className="w-5 h-5 text-gray-400" /></Button>
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-start justify-between">
            <div className="space-y-6">
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-primary/10 text-primary hover:bg-primary/20 rounded-full px-4 py-1 text-sm font-bold border-none capitalize">
                  {job.job_type}
                </Badge>
                <Badge className="bg-green-50 text-green-600 hover:bg-green-100 rounded-full px-4 py-1 text-sm font-bold border-none">
                  Active Listing
                </Badge>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
                {job.title}
              </h1>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Location</p>
                    <p className="font-bold text-gray-700">{job.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400">
                    <DollarSign className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Salary</p>
                    <p className="font-bold text-gray-700">KSh {job.salary?.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Basis</p>
                    <p className="font-bold text-gray-700 capitalize">{job.job_type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Posted</p>
                    <p className="font-bold text-gray-700">{new Date(job.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {user?.user_metadata.role === 'worker' && (
              <div className="w-full md:w-auto">
                <Button 
                  size="lg" 
                  onClick={handleApply} 
                  disabled={applied}
                  className={cn(
                    "w-full md:w-auto h-16 px-12 rounded-2xl text-lg font-bold shadow-xl transition-all active:scale-95",
                    applied ? "bg-green-50 text-green-600 hover:bg-green-50 shadow-none border-2 border-green-100" : "shadow-primary/20"
                  )}
                >
                  {applied ? (
                    <span className="flex items-center gap-2"><CheckCircle2 className="w-6 h-6" /> Application Sent</span>
                  ) : 'Apply for this Job'}
                </Button>
              </div>
            )}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="rounded-[2rem] border-none shadow-sm p-8 md:p-10 bg-white">
              <h2 className="text-2xl font-extrabold text-gray-900 mb-6 flex items-center gap-3">
                <Briefcase className="w-6 h-6 text-primary" />
                Job Description
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-600 text-lg leading-relaxed whitespace-pre-wrap">
                  {job.description}
                </p>
              </div>
            </Card>

            <Card className="rounded-[2rem] border-none shadow-sm p-8 bg-primary/5 border border-primary/10">
              <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5" />
                HouseAid Safety Guarantee
              </h3>
              <p className="text-primary/80 font-medium">
                We verify all employers and job listings to ensure a safe workspace for our professionals. 
                Always communicate through the HouseAid platform for your safety.
              </p>
            </Card>
          </div>

          {/* Sidebar - Employer Info */}
          <aside className="space-y-8">
            <Card className="rounded-[2rem] border-none shadow-sm p-8 bg-white sticky top-24">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">About the Household</h3>
              
              <Link to={`/platform/employer/${job.household_id}`} className="group block text-center mb-8">
                <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-gray-50 group-hover:scale-105 transition-transform">
                  <AvatarImage src={job.household?.avatar_url} />
                  <AvatarFallback className="text-2xl bg-primary/10 text-primary">{job.household?.full_name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <h4 className="text-xl font-extrabold text-gray-900 group-hover:text-primary transition-colors">
                  {job.household?.full_name}
                </h4>
                <div className="flex items-center justify-center gap-1 text-gray-400 mt-1 font-medium">
                   <MapPin className="w-3 h-3" />
                   <span className="text-xs">{job.household?.address || 'Verified Address'}</span>
                </div>
              </Link>

              <div className="space-y-4 mb-8">
                 <p className="text-sm text-gray-600 text-center leading-relaxed italic">
                   "{job.household?.bio || 'No household description provided yet.'}"
                 </p>
              </div>

              <Button asChild variant="outline" className="w-full rounded-xl h-12 font-bold border-2">
                <Link to={`/platform/employer/${job.household_id}`}>View Household Profile</Link>
              </Button>
            </Card>
          </aside>
        </div>
      </div>
    </DashboardLayout>
  );
};

const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');

export default JobDetail;

