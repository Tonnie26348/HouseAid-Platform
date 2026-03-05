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
import { Mail, ArrowLeft, KeyRound } from "lucide-react";
import { motion } from "framer-motion";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

const ForgotPassword = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { error } = await supabase.auth.resetPasswordForEmail(values.email, {
        redirectTo: `${window.location.origin}/HouseAid-System/update-password`,
    });

    if (error) {
      toast({
        title: "Request Failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Email Sent",
        description: "Please check your inbox for the reset link.",
      });
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center font-sans relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full relative z-10"
      >
        <Link to="/login" className="inline-flex items-center text-gray-500 hover:text-primary mb-12 transition-colors font-medium">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Sign In
        </Link>

        <div className="mb-10 inline-flex items-center justify-center w-20 h-20 rounded-[2rem] bg-primary/10 text-primary">
           <KeyRound className="w-10 h-10" strokeWidth={2.5} />
        </div>

        <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">Forgot Password?</h1>
        <p className="text-gray-500 font-medium text-lg mb-10 leading-relaxed">
          No worries, it happens. Enter your email and we'll send you a secure link to reset your access.
        </p>

        <Card className="rounded-[2.5rem] border-none shadow-xl shadow-gray-200/50 p-8 md:p-10 bg-white text-left">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-bold ml-1">Email Address</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                          type="email"
                          placeholder="name@example.com"
                          className="pl-11 h-12 border-gray-200 rounded-xl focus:ring-primary"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full h-14 text-lg font-black rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.01] transition-all">
                Send Reset Link
              </Button>
            </form>
          </Form>
        </Card>

        <p className="mt-10 text-sm font-bold text-gray-400 uppercase tracking-widest leading-none">
           Secure Recovery System
        </p>
      </motion.div>
    </div>
  );
};

const Card = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white border rounded-xl ${className}`}>{children}</div>
);

export default ForgotPassword;

