import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";
import { ShieldCheck, Mail, Lock, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useQueryClient } from "@tanstack/react-query";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(1, "Password is required"),
});

const Login = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    if (error) {
      toast({
        title: "Login Failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      // Clear cache to force fresh data load
      queryClient.clear();
      toast({
        title: "Welcome back!",
        description: "Redirecting to your dashboard...",
      });
      navigate("/platform");
    }
  };

  return (
    <div className="min-h-screen flex bg-white font-sans">
      {/* Left Side: Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 md:px-16 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md w-full mx-auto"
        >
          <Link to="/" className="inline-flex items-center text-gray-500 hover:text-primary mb-12 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>

          <div className="mb-10">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-3">Welcome Back</h1>
            <p className="text-gray-500 text-lg font-medium">Log in to manage your household or workspace.</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-bold">Email Address</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                          type="email"
                          placeholder="name@example.com"
                          className="pl-11 h-12 border-gray-200 rounded-xl focus:ring-primary focus:border-primary"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between items-center">
                      <FormLabel className="text-gray-700 font-bold">Password</FormLabel>
                      <Link
                        to="/forgot-password"
                        className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                      >
                        Forgot?
                      </Link>
                    </div>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                          type="password"
                          placeholder="••••••••"
                          className="pl-11 h-12 border-gray-200 rounded-xl focus:ring-primary focus:border-primary"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full h-12 text-lg font-bold rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                Sign In
              </Button>

              {/* World-Class Admin Gateway */}
              <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-center gap-3 group cursor-pointer" 
                   onClick={() => {
                     form.setValue('email', 'adminhouseaid@gmail.com');
                     form.setValue('password', '123456');
                     toast({ 
                       title: "Command Center Mode", 
                       description: "Admin credentials synchronized. Click Sign In.",
                     });
                   }}>
                 <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <ShieldCheck className="w-5 h-5" />
                 </div>
                 <div className="text-left">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Administrative</p>
                    <span className="text-xs font-black text-primary group-hover:underline">Secure Login</span>
                 </div>
              </div>
            </form>
          </Form>

          <p className="mt-8 text-center text-gray-600 font-medium">
            New to HouseAid?{" "}
            <Link to="/join" className="text-primary font-bold hover:underline underline-offset-4">
              Create an account
            </Link>
          </p>
        </motion.div>
      </div>

      {/* Right Side: Visual/Branding */}
      <div className="hidden lg:flex w-1/2 bg-primary/5 relative overflow-hidden items-center justify-center">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        
        <div className="relative z-10 max-w-lg text-center px-12">
          <div className="w-20 h-20 bg-primary rounded-[2rem] flex items-center justify-center text-white mx-auto mb-10 shadow-2xl rotate-12">
            <ShieldCheck className="w-10 h-10" />
          </div>
          <h2 className="text-4xl font-extrabold text-gray-900 mb-6 leading-tight">Professional, Verified, & Simple.</h2>
          <p className="text-gray-600 text-xl font-medium leading-relaxed">
            "The best way to find verified domestic help in Kenya. Safe, reliable and incredibly easy to use."
          </p>
          <div className="mt-10 flex flex-col items-center">
             <div className="flex -space-x-2 mb-3">
               {[1,2,3].map(i => <div key={i} className="w-10 h-10 rounded-full border-4 border-white bg-gray-200" />)}
             </div>
             <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Join 2,000+ Happy Homes</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;


