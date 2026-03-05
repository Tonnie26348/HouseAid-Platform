import { useNavigate } from "react-router-dom";
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
import { Lock, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const formSchema = z
  .object({
    password: z.string().min(6, { message: "Password must be at least 6 characters." }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ["confirmPassword"],
  });

const UpdatePassword = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { error } = await supabase.auth.updateUser({
      password: values.password,
    });

    if (error) {
      toast({
        title: "Update Failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Security Updated",
        description: "Your password has been reset successfully.",
      });
      navigate("/platform");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center font-sans relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl translate-y-1/2 translate-x-1/2" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full relative z-10"
      >
        <div className="mb-10 inline-flex items-center justify-center w-20 h-20 rounded-[2rem] bg-green-50 text-green-600 shadow-sm border border-green-100/50">
           <ShieldCheck className="w-10 h-10" strokeWidth={2.5} />
        </div>

        <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">Secure Account</h1>
        <p className="text-gray-500 font-medium text-lg mb-10 leading-relaxed">
          Create a new strong password to regain full access to your HouseAid account.
        </p>

        <CardContentWrapper className="rounded-[2.5rem] border-none shadow-xl shadow-gray-200/50 p-8 md:p-10 bg-white text-left">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-bold ml-1">New Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                          type="password"
                          placeholder="••••••••"
                          className="pl-11 h-12 border-gray-200 rounded-xl focus:ring-primary shadow-none"
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
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-bold ml-1">Confirm New Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                          type="password"
                          placeholder="••••••••"
                          className="pl-11 h-12 border-gray-200 rounded-xl focus:ring-primary shadow-none"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full h-14 text-lg font-black rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.01] transition-all">
                Update Security
              </Button>
            </form>
          </Form>
        </CardContentWrapper>

        <div className="mt-12 flex items-center justify-center gap-2 text-gray-300 font-bold text-[10px] uppercase tracking-widest leading-none">
           <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
           <span>256-bit AES Encryption Active</span>
        </div>
      </motion.div>
    </div>
  );
};

const CardContentWrapper = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white border rounded-xl ${className}`}>{children}</div>
);

export default UpdatePassword;
