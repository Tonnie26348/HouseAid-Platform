import React, { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate, Link } from "react-router-dom";
import { Briefcase, MapPin, DollarSign, ArrowLeft, Send } from "lucide-react";
import { motion } from "framer-motion";

const jobSchema = z.object({
  title: z.string().min(2, { message: "Please enter a descriptive title." }),
  description: z.string().min(10, { message: "Please provide more details (min 10 chars)." }),
  location: z.string().min(2, { message: "Location is required." }),
  salary: z.coerce.number().min(0, { message: "Salary must be 0 or more." }),
  job_type: z.enum(['full-time', 'part-time', 'one-time']),
});

const CreateJob = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  useEffect(() => {
    console.log("CreateJob component mounted. Current user:", user?.id);
  }, [user]);

  const form = useForm<z.infer<typeof jobSchema>>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
      salary: 0,
      job_type: 'full-time',
    },
  });

  const onSubmit = async (values: z.infer<typeof jobSchema>) => {
    if (!user) {
      toast({ title: "Session Error", description: "You must be logged in to post a job.", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    console.log("Attempting to post job:", values);

    try {
      const { error } = await supabase.from("jobs").insert({
        title: values.title,
        description: values.description,
        location: values.location,
        salary: values.salary,
        job_type: values.job_type,
        household_id: user.id,
      });

      if (error) {
        console.error("Supabase insert error:", error);
        toast({ title: "Post Failed", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Success!", description: "Your job listing is now live." });
        navigate("/platform");
      }
    } catch (err: any) {
      console.error("Unexpected error during post:", err);
      toast({ title: "Error", description: "An unexpected error occurred.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Log form errors if any exist
  const onInvalid = (errors: any) => {
    console.error("Form validation errors:", errors);
    toast({ 
      title: "Validation Error", 
      description: "Please check the form for missing required fields.", 
      variant: "destructive" 
    });
  };

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <Link to="/platform" className="inline-flex items-center text-gray-500 hover:text-primary transition-colors font-medium mb-8">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Dashboard
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="rounded-[2.5rem] border-none shadow-sm overflow-hidden bg-white">
          <div className="bg-primary/5 p-8 md:p-12 border-b border-primary/10">
             <h2 className="text-3xl font-black text-gray-900 tracking-tight mb-2 flex items-center gap-3">
               <Briefcase className="text-primary w-8 h-8" />
               Job Information
             </h2>
             <p className="text-gray-500 font-medium">Describe what you're looking for in a professional.</p>
          </div>

          <CardContent className="p-8 md:p-12">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit, onInvalid)} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold text-gray-700">Position Title</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Executive Chef, Senior Nanny" className="h-12 rounded-xl border-gray-200" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="job_type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold text-gray-700">Contract Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger className="h-12 rounded-xl border-gray-200">
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="full-time">Full-time</SelectItem>
                                <SelectItem value="part-time">Part-time</SelectItem>
                                <SelectItem value="one-time">One-time (Gig)</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold text-gray-700">Work Location</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <Input placeholder="e.g. Kilimani, Nairobi" className="pl-10 h-12 rounded-xl border-gray-200" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="salary"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold text-gray-700">Monthly Salary (KSH)</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <Input type="number" className="pl-10 h-12 rounded-xl border-gray-200" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold text-gray-700">Detailed Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Provide a clear description of duties, requirements, and household expectations..." 
                          className="min-h-[180px] rounded-xl border-gray-200 p-4" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="pt-4">
                  <Button type="submit" className="w-full h-14 rounded-xl text-lg font-bold shadow-lg shadow-primary/20 hover:scale-[1.01] transition-all" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Processing...
                      </div>
                    ) : (
                      <><Send className="w-5 h-5 mr-2" /> Post Listing</>
                    )}
                  </Button>
                  <p className="text-center text-xs text-gray-400 mt-4 font-medium uppercase tracking-widest">
                    Your listing will be visible to thousands of verified professionals.
                  </p>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default CreateJob;
