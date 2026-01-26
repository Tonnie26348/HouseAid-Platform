import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useParams } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import DashboardLayout from "@/components/shared/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

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
            household:profiles (full_name, avatar_url)
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
            const { data, error } = await supabase
                .from('job_applications')
                .select('id')
                .eq('job_id', id)
                .eq('worker_id', user.id)
                .single();
            
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
                title: "Error applying for job",
                description: error.message,
                variant: "destructive",
            });
        } else {
            toast({
                title: "Successfully applied for the job!",
            });
            setApplied(true);
        }
    }
  }

  if (loading) {
    return <div>Loading job details...</div>;
  }

  if (!job) {
    return <div>Job not found</div>;
  }

  return (
    <DashboardLayout>
      <Card>
        <CardHeader>
          <CardTitle>{job.title}</CardTitle>
          <CardDescription>{job.location}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-4">
            <Link to={`/platform/employer/${job.household_id}`} className="flex items-center">
                <img src={job.household?.avatar_url || 'https://via.placeholder.com/40'} alt={job.household?.full_name} className="w-10 h-10 rounded-full mr-4" />
                <div>
                  <p className="font-semibold hover:underline">{job.household?.full_name}</p>
                  <p className="text-sm text-gray-500">Household</p>
                </div>
            </Link>
          </div>
        
          <p className="mb-4">{job.description}</p>
          <div className="flex justify-between items-center mt-4">
            <div>
              <p className="font-bold">KSH {job.salary} / month</p>
              <p className="text-sm text-gray-500 capitalize">{job.job_type}</p>
            </div>
            {user?.user_metadata.role === 'worker' && (
                <Button onClick={handleApply} disabled={applied}>
                    {applied ? 'Applied' : 'Apply Now'}
                </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default JobDetail;
