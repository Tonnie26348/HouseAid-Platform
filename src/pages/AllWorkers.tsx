import { supabase } from "@/lib/supabase";
import React from 'react';
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/components/ui/use-toast";
import DashboardLayout from "@/components/shared/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// Define Zod schema for hiring form
const hireFormSchema = z.object({
  salary: z.coerce.number().min(1, { message: "Salary must be a positive number." }),
  payment_basis: z.enum(["hourly", "daily", "weekly", "monthly"], {
    required_error: "Please select a payment basis.",
  }),
  start_date: z.date({
    required_error: "A start date is required.",
  }),
  end_date: z.date().optional(), // End date can be optional
});

const AllWorkers = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [workers, setWorkers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  // New state variables for hiring modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState<any>(null);
  const [isHiring, setIsHiring] = useState(false);

  const form = useForm<z.infer<typeof hireFormSchema>>({
    resolver: zodResolver(hireFormSchema),
    defaultValues: {
      salary: 0,
      payment_basis: "monthly", // Default to monthly
      start_date: new Date(),
      end_date: undefined,
    },
  });

  const handleHire = async (values: z.infer<typeof hireFormSchema>) => {
    if (!user || !selectedWorker) {
      toast({
        title: "Error",
        description: "Employer or worker not selected.",
        variant: "destructive",
      });
      return;
    }

    setIsHiring(true);
    const { error } = await supabase.from("contracts").insert({
      employer_id: user.id,
      worker_id: selectedWorker.id,
      start_date: values.start_date.toISOString(),
      end_date: values.end_date?.toISOString() || null,
      salary: values.salary,
      payment_basis: values.payment_basis,
      status: "pending", // Initial status
    });

    if (error) {
      toast({
        title: "Error hiring worker",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Hiring offer sent!",
        description: `An offer has been sent to ${selectedWorker.full_name}.`,
      });
      setIsModalOpen(false);
      setSelectedWorker(null);
      form.reset();
    }
    setIsHiring(false);
  };

  useEffect(() => {
    const fetchAllWorkers = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("role", "worker"); // Filter to only show profiles with role 'worker'

      if (error) {
        toast({
          title: "Error fetching workers",
          description: error.message,
          variant: "destructive",
        });
      } else if (data) {
        setWorkers(data);
      }
      setLoading(false);
    };

    fetchAllWorkers();
  }, [toast]);

  useEffect(() => {
    const fetchAllWorkers = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("role", "worker"); // Filter to only show profiles with role 'worker'

      if (error) {
        toast({
          title: "Error fetching workers",
          description: error.message,
          variant: "destructive",
        });
      } else if (data) {
        setWorkers(data);
      }
      setLoading(false);
    };

    fetchAllWorkers();
  }, [toast]);

  if (loading) {
    return <DashboardLayout><div>Loading all workers...</div></DashboardLayout>;
  }

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">All Available Workers</h1>
      </div>

      {workers.length === 0 ? (
        <Card>
          <CardContent className="py-6 text-center">
            <p className="text-lg text-gray-600">No workers found at the moment.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {workers.map((worker: any) => (
            <Card key={worker.id}>
              <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={worker.avatar_url || 'https://placehold.co/150x150'} />
                  <AvatarFallback>{worker.full_name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{worker.full_name}</CardTitle>
                  <CardDescription className="capitalize">Worker</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-2">
                  Skills: {worker.skills?.join(', ') || 'N/A'}
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  Experience: {worker.experience || 'N/A'}
                </p>
                {/* Potentially add a button to view worker details or hire them */}
                <Button variant="outline" size="sm" asChild>
                  <Link to={`/platform/profile/${worker.id}`}>View Profile</Link>
                </Button>
                {user?.user_metadata.role === 'employer' && (
                  <Button
                    size="sm"
                    onClick={() => {
                      setSelectedWorker(worker);
                      setIsModalOpen(true);
                      form.reset({
                        salary: 0,
                        payment_basis: "monthly",
                        start_date: new Date(),
                        end_date: undefined,
                      });
                    }}
                  >
                    Hire Worker
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Hire {selectedWorker?.full_name}</DialogTitle>
            <DialogDescription>
              Enter contract details for {selectedWorker?.full_name}.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleHire)} className="space-y-4">
              <FormField
                control={form.control}
                name="salary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Salary (KSH)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="payment_basis"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Basis</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a payment basis" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="hourly">Hourly</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="start_date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Start Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="end_date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>End Date (Optional)</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit" disabled={isHiring}>
                  {isHiring ? "Sending Offer..." : "Send Offer"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default AllWorkers;
