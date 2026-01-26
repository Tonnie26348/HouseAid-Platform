import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import DashboardLayout from "@/components/shared/DashboardLayout";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";

const searchSchema = z.object({
    search: z.string().optional(),
    job_type: z.string().optional(),
    min_salary: z.coerce.number().optional(),
    max_salary: z.coerce.number().optional(),
});

const Jobs = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      search: "",
      job_type: "",
      min_salary: 0,
      max_salary: 0,
    },
  });

  const fetchJobs = async (values: z.infer<typeof searchSchema> = {}) => {
    setLoading(true);
    let query = supabase.from("jobs").select(`
        *,
        household:profiles (full_name, avatar_url)
    `);

    if (values.search) {
        query = query.or(`title.ilike.%${values.search}%,description.ilike.%${values.search}%,location.ilike.%${values.search}%`);
    }
    if (values.job_type) {
        query = query.eq('job_type', values.job_type);
    }
    if (values.min_salary) {
        query = query.gte('salary', values.min_salary);
    }
    if (values.max_salary) {
        query = query.lte('salary', values.max_salary);
    }

    const { data, error } = await query;

    if (error) {
      toast({
        title: "Error fetching jobs",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setJobs(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const onSubmit = (values: z.infer<typeof searchSchema>) => {
    fetchJobs(values);
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Find a Job</h1>
      </div>
      
      <Card className="mb-4">
        <CardContent className="pt-6">
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Input placeholder="Search by title, description, location..." {...form.register("search")} />
                <Select onValueChange={(value) => form.setValue('job_type', value)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Job Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="full-time">Full-time</SelectItem>
                        <SelectItem value="part-time">Part-time</SelectItem>
                        <SelectItem value="one-time">One-time</SelectItem>
                    </SelectContent>
                </Select>
                <Input type="number" placeholder="Min Salary" {...form.register("min_salary")} />
                <Input type="number" placeholder="Max Salary" {...form.register("max_salary")} />
                <Button type="submit">Search</Button>
            </form>
        </CardContent>
      </Card>

      {loading ? (
        <div>Loading jobs...</div>
      ) : (
        <div className="grid gap-4">
            {jobs.map(job => (
                <Card key={job.id}>
                    <CardHeader>
                        <CardTitle>{job.title}</CardTitle>
                        <CardDescription>{job.location}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>{job.description}</p>
                        <div className="flex justify-between items-center mt-4">
                            <div>
                                <p className="font-bold">KSH {job.salary} / month</p>
                                <p className="text-sm text-gray-500 capitalize">{job.job_type}</p>
                            </div>
                            <Button asChild>
                                <Link to={`/platform/jobs/${job.id}`}>View Job</Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default Jobs;
