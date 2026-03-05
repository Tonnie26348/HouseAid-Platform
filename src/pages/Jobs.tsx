import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
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
import { Search, MapPin, Briefcase, DollarSign, Filter, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const Jobs = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const [filters, setFilters] = useState({
    search: "",
    job_type: "all",
    min_salary: "",
  });

  const fetchJobs = async () => {
    setLoading(true);
    let query = supabase.from("jobs").select(`
        *,
        household:profiles (full_name, avatar_url)
    `);

    if (filters.search) {
      query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%,location.ilike.%${filters.search}%`);
    }
    if (filters.job_type !== "all") {
      query = query.eq('job_type', filters.job_type);
    }
    if (filters.min_salary) {
      query = query.gte('salary', parseInt(filters.min_salary));
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setJobs(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchJobs();
  }, [filters.job_type, filters.min_salary]);

  return (
    <DashboardLayout pageTitle="Find Your Next Workspace">
      <div className="flex flex-col gap-8">
        {/* Header & Search Bar */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input 
                placeholder="Search jobs by title, skills, or location..." 
                className="pl-12 h-14 rounded-2xl border-gray-100 focus:ring-primary text-lg"
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                onKeyDown={(e) => e.key === 'Enter' && fetchJobs()}
              />
            </div>
            <Button size="lg" className="h-14 px-8 rounded-2xl shadow-lg shadow-primary/20" onClick={fetchJobs}>
              Find Jobs
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <Filter className="w-5 h-5 text-primary" />
                <h3 className="font-bold text-lg">Filters</h3>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-sm font-bold text-gray-700">Job Type</label>
                  <Select onValueChange={(val) => setFilters({ ...filters, job_type: val })} value={filters.job_type}>
                    <SelectTrigger className="rounded-xl h-11 border-gray-100">
                      <SelectValue placeholder="All Types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                      <SelectItem value="one-time">One-time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-bold text-gray-700">Min Monthly Salary (KSH)</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input 
                      type="number" 
                      placeholder="e.g. 15,000" 
                      className="pl-9 rounded-xl h-11 border-gray-100"
                      value={filters.min_salary}
                      onChange={(e) => setFilters({ ...filters, min_salary: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Jobs List */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="grid gap-4">
                {[1,2,3].map(i => <div key={i} className="h-48 bg-gray-100 animate-pulse rounded-3xl" />)}
              </div>
            ) : jobs.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900">No jobs found</h3>
                <p className="text-gray-500">Try adjusting your filters or search terms.</p>
              </div>
            ) : (
              <div className="grid gap-6">
                {jobs.map((job, idx) => (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    key={job.id}
                  >
                    <Card className="group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-[2rem] border-none shadow-sm overflow-hidden bg-white">
                      <CardContent className="p-8">
                        <div className="flex flex-col md:flex-row justify-between gap-6">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <Badge variant="secondary" className="rounded-full bg-primary/5 text-primary hover:bg-primary/10 transition-colors capitalize">
                                {job.job_type}
                              </Badge>
                              <span className="text-xs font-medium text-gray-400">
                                Posted {new Date(job.created_at).toLocaleDateString()}
                              </span>
                            </div>
                            <h3 className="text-2xl font-extrabold text-gray-900 group-hover:text-primary transition-colors mb-2">
                              {job.title}
                            </h3>
                            <div className="flex items-center gap-4 text-gray-500 font-medium mb-4">
                              <div className="flex items-center gap-1.5">
                                <MapPin className="w-4 h-4" />
                                <span className="text-sm">{job.location}</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <DollarSign className="w-4 h-4" />
                                <span className="text-sm">KSh {job.salary?.toLocaleString()} / mo</span>
                              </div>
                            </div>
                            <p className="text-gray-600 line-clamp-2 leading-relaxed">
                              {job.description}
                            </p>
                          </div>
                          <div className="flex flex-row md:flex-col justify-end gap-3 min-w-[140px]">
                            <Button asChild variant="outline" className="rounded-xl h-12 font-bold border-2 hover:bg-gray-50">
                              <Link to={`/platform/jobs/${job.id}`}>Details</Link>
                            </Button>
                            <Button asChild className="rounded-xl h-12 font-bold shadow-lg shadow-primary/10">
                              <Link to={`/platform/jobs/${job.id}`}>
                                Apply Now <ArrowRight className="ml-2 w-4 h-4" />
                              </Link>
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
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Jobs;

export default Jobs;
