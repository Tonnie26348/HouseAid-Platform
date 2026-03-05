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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";
import { ShieldCheck, Mail, Lock, User, ArrowLeft, Briefcase, Users } from "lucide-react";
import { motion } from "framer-motion";

const formSchema = z
  .object({
    fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
    email: z.string().email({ message: "Invalid email address." }),
    password: z.string().min(6, { message: "Password must be at least 6 characters." }),
    confirmPassword: z.string(),
    role: z.enum(["employer", "worker"], {
      required_error: "Please select your role.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ["confirmPassword"],
  });

const Join = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        emailRedirectTo: "https://tonnie26348.github.io/HouseAid-Platform/",
        data: {
          full_name: values.fullName,
          role: values.role,
        },
      },
    });

    if (signUpError) {
      toast({
        title: "Registration Failed",
        description: signUpError.message,
        variant: "destructive",
      });
      return;
    }

    if (signUpData.user) {
        setRegisteredEmail(values.email);
        setIsSubmitted(true);
        toast({
            title: "Account Created!",
            description: "Please check your email to verify your account.",
        });
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center font-sans">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white p-10 md:p-16 rounded-[3rem] shadow-xl shadow-gray-200/50 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-2 bg-primary" />
          
          <div className="mb-10 inline-flex items-center justify-center w-24 h-24 rounded-[2rem] bg-primary/10 text-primary">
             <Mail className="w-12 h-12" strokeWidth={2.5} />
          </div>

          <h1 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">Confirm Your Email</h1>
          <p className="text-gray-500 font-medium mb-10 leading-relaxed text-lg">
            We've sent a secure verification link to <br />
            <span className="text-primary font-bold">{registeredEmail}</span>. <br />
            Please click the link to activate your HouseAid account.
          </p>

          <div className="space-y-4">
            <Button asChild size="lg" className="w-full h-14 rounded-2xl font-black shadow-lg shadow-primary/20">
              <Link to="/login">Proceed to Login</Link>
            </Button>
            <Button 
              variant="ghost" 
              className="w-full h-12 rounded-xl font-bold text-gray-400 hover:text-gray-900"
              onClick={() => setIsSubmitted(false)}
            >
              Didn't get the email? Try again.
            </Button>
          </div>

          <div className="mt-12 flex items-center justify-center gap-2 text-gray-300 font-bold text-[10px] uppercase tracking-widest">
             <ShieldCheck className="w-3.5 h-3.5" />
             <span>HouseAid Secure Verification</span>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-white font-sans">
      {/* Left Side: Visual Content */}
      <div className="hidden lg:flex w-1/2 bg-secondary/5 relative overflow-hidden items-center justify-center p-12">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-3xl translate-y-1/2 translate-x-1/2" />
        
        <div className="relative z-10 max-w-lg">
          <div className="mb-12">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-6 leading-tight">Join Kenya's Most Trusted Domestic Network.</h2>
            <p className="text-gray-600 text-xl font-medium leading-relaxed">
              Whether you're looking for professional help or searching for your next workspace, we've got you covered.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary flex-shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Verified Profiles</h4>
                <p className="text-sm text-gray-500 font-medium">Every member is background checked for maximum safety.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary flex-shrink-0">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Seamless Matching</h4>
                <p className="text-sm text-gray-500 font-medium">Find the perfect match based on skills and location.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 md:px-16 lg:px-24 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md w-full mx-auto"
        >
          <Link to="/" className="inline-flex items-center text-gray-500 hover:text-primary mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-2">Create Account</h1>
            <p className="text-gray-500 font-medium text-lg">Join the future of domestic work in Kenya.</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-bold text-sm">Full Name</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="John Doe"
                          className="pl-10 h-11 border-gray-200 rounded-xl focus:ring-primary focus:border-primary"
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-bold text-sm">Email Address</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          type="email"
                          placeholder="name@example.com"
                          className="pl-10 h-11 border-gray-200 rounded-xl focus:ring-primary focus:border-primary"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-bold text-sm">Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="••••••••"
                          className="h-11 border-gray-200 rounded-xl focus:ring-primary focus:border-primary"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-bold text-sm">Confirm</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="••••••••"
                          className="h-11 border-gray-200 rounded-xl focus:ring-primary focus:border-primary"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-bold text-sm">I want to...</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-11 border-gray-200 rounded-xl focus:ring-primary">
                          <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="employer">
                          <div className="flex items-center gap-2">
                            <Briefcase className="w-4 h-4 text-primary" />
                            <span>Hire Professional Help</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="worker">
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-secondary" />
                            <span>Find Domestic Work</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full h-12 text-lg font-bold rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.01] transition-all mt-4">
                Create Account
              </Button>
            </form>
          </Form>

          <p className="mt-8 text-center text-gray-600 font-medium">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-bold hover:underline underline-offset-4">
              Sign In
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Join;

