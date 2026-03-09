import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
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
import VerificationForm from "@/components/shared/VerificationForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Briefcase, ShieldCheck, Camera, MapPin, DollarSign } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const profileSchema = z.object({
  full_name: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  avatar_url: z.string().url({ message: "Invalid URL." }).optional().or(z.literal('')),
  skills: z.string().optional(),
  experience: z.string().optional(),
  availability: z.string().optional(),
  hourly_rate: z.coerce.number().optional(),
  address: z.string().optional(),
  family_members: z.coerce.number().optional(),
  bio: z.string().optional(),
  expectations: z.string().optional(),
  household_rules: z.string().optional(),
  contact_preferences: z.string().optional(),
  benefits_offered: z.string().optional(),
  payment_basis: z.string().optional(),
});

const Profile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      full_name: "",
      avatar_url: "",
      skills: "",
      experience: "",
      availability: "",
      hourly_rate: 0,
      address: "",
      family_members: 0,
      payment_basis: "monthly",
      bio: "",
      expectations: "",
      household_rules: "",
      contact_preferences: "",
      benefits_offered: "",
    },
  });

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (error) {
          toast({ title: "Error", description: error.message, variant: "destructive" });
        } else if (data) {
          setProfile(data);
          form.reset({
            full_name: data.full_name || '',
            avatar_url: data.avatar_url || '',
            skills: data.skills?.join(', ') || '',
            experience: data.experience || '',
            availability: data.availability || '',
            hourly_rate: data.hourly_rate || 0,
            address: data.address || '',
            family_members: data.family_members || 0,
            payment_basis: data.payment_basis || 'monthly',
            bio: data.bio || '',
            expectations: data.expectations || '',
            household_rules: data.household_rules || '',
            contact_preferences: data.contact_preferences || '',
            benefits_offered: data.benefits_offered?.join(', ') || '',
          });
        }
      } catch (err: any) {
        console.error("Profile fetch error:", err);
        toast({ title: "Error", description: "Failed to load profile", variant: "destructive" });
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [user, toast, form]);

  const onSubmit = async (values: z.infer<typeof profileSchema>) => {
    if (user) {
        const { error } = await supabase.from("profiles").update({
            ...values,
            skills: values.skills?.split(',').map(s => s.trim()),
            benefits_offered: values.benefits_offered?.split(',').map(s => s.trim()),
            updated_at: new Date(),
        }).eq("id", user.id);

        if (error) {
            toast({ title: "Update Failed", description: error.message, variant: "destructive" });
        } else {
            toast({ title: "Success", description: "Profile updated successfully." });
        }
    }
  };

  const uploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.[0] || !user) return;
    const file = event.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}.${fileExt}`;
    
    setUploading(true);
    const { error } = await supabase.storage.from('avatars').upload(fileName, file, { upsert: true });

    if (error) {
      toast({ title: "Upload Error", description: error.message, variant: "destructive" });
    } else {
      const { data } = supabase.storage.from('avatars').getPublicUrl(fileName);
      form.setValue('avatar_url', data.publicUrl);
      onSubmit(form.getValues());
      toast({ title: "Avatar Updated" });
    }
    setUploading(false);
  };

  if (loading) return (
    <div className="flex items-center justify-center h-[60vh]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">Loading Profile</p>
      </div>
    </div>
  );

  const role = profile?.role?.toLowerCase();
  const isWorker = role === "domestic worker" || role === "worker";

  return (
    <div className="max-w-5xl mx-auto pb-10">
        <Tabs defaultValue="personal" className="space-y-6 md:space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
             <div className="flex items-center gap-4 md:gap-6">
                <div className="relative group flex-shrink-0">
                   <Avatar className="w-20 h-20 md:w-24 md:h-24 border-4 border-white shadow-xl transition-transform group-hover:scale-105">
                      <AvatarImage src={form.watch('avatar_url')} />
                      <AvatarFallback className="bg-primary/5 text-primary text-xl md:text-2xl font-black">{form.watch('full_name')?.charAt(0)}</AvatarFallback>
                   </Avatar>
                   <label className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full shadow-lg cursor-pointer hover:bg-primary/90 transition-colors">
                      <Camera className="w-3 h-3 md:w-4 md:h-4" />
                      <input type="file" className="hidden" onChange={uploadAvatar} disabled={uploading} />
                   </label>
                </div>
                <div className="min-w-0">
                   <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight truncate">{profile?.full_name}</h2>
                   <p className="text-gray-500 font-bold uppercase text-[8px] md:text-[10px] tracking-[0.2em]">{profile?.role} Account</p>
                </div>
             </div>
             
             <TabsList className="bg-white p-1 rounded-xl md:rounded-2xl shadow-sm border border-gray-100 h-12 md:h-14 w-fit">
                <TabsTrigger value="personal" className="rounded-lg md:rounded-xl px-4 md:px-6 font-bold gap-2 h-full data-[state=active]:bg-primary data-[state=active]:text-white text-xs md:text-sm">
                   <User className="w-3 h-3 md:w-4 md:h-4" /> Personal
                </TabsTrigger>
                <TabsTrigger value="professional" className="rounded-lg md:rounded-xl px-4 md:px-6 font-bold gap-2 h-full data-[state=active]:bg-primary data-[state=active]:text-white text-xs md:text-sm">
                   <Briefcase className="w-3 h-3 md:w-4 md:h-4" /> Professional
                </TabsTrigger>
                <TabsTrigger value="verification" className="rounded-lg md:rounded-xl px-4 md:px-6 font-bold gap-2 h-full data-[state=active]:bg-primary data-[state=active]:text-white text-xs md:text-sm">
                   <ShieldCheck className="w-3 h-3 md:w-4 md:h-4" /> Trust
                </TabsTrigger>
             </TabsList>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 md:space-y-8">
              <TabsContent value="personal" className="focus-visible:outline-none">
                <Card className="rounded-[1.5rem] md:rounded-[2.5rem] border-none shadow-sm p-6 md:p-12 bg-white">
                  <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                    <FormField
                      control={form.control}
                      name="full_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold text-gray-700 ml-1 text-sm">Legal Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" className="h-12 rounded-xl border-gray-200" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold text-gray-700 ml-1 text-sm">Current Location</FormLabel>
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
                  </div>
                  <div className="mt-6 md:mt-8">
                    <FormField
                      control={form.control}
                      name="bio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold text-gray-700 ml-1 text-sm">Biography / Household Intro</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Tell us about yourself or your household..." className="min-h-[120px] md:min-h-[150px] rounded-xl border-gray-200" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="professional" className="focus-visible:outline-none">
                <Card className="rounded-[1.5rem] md:rounded-[2.5rem] border-none shadow-sm p-6 md:p-12 bg-white">
                  {isWorker ? (
                    <div className="space-y-6 md:space-y-8">
                      <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                        <FormField
                          control={form.control}
                          name="skills"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-bold text-gray-700 ml-1 text-sm">Specializations (comma-separated)</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g. Cooking, Childcare, Cleaning" className="h-12 rounded-xl border-gray-200" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="hourly_rate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-bold text-gray-700 ml-1 text-sm">Base Rate (KSH)</FormLabel>
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
                        name="experience"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-bold text-gray-700 ml-1 text-sm">Work History & Qualifications</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Describe your professional journey..." className="min-h-[120px] md:min-h-[150px] rounded-xl border-gray-200" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  ) : (
                    <div className="space-y-6 md:space-y-8">
                       <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                          <FormField
                            control={form.control}
                            name="family_members"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="font-bold text-gray-700 ml-1 text-sm">Household Size</FormLabel>
                                <FormControl>
                                  <Input type="number" className="h-12 rounded-xl border-gray-200" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="benefits_offered"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="font-bold text-gray-700 ml-1 text-sm">Perks Offered</FormLabel>
                                <FormControl>
                                  <Input placeholder="Meals, Accommodation, Health" className="h-12 rounded-xl border-gray-200" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                       </div>
                       <FormField
                        control={form.control}
                        name="expectations"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-bold text-gray-700 ml-1 text-sm">Household Expectations</FormLabel>
                            <FormControl>
                              <Textarea placeholder="What are you looking for in a professional?" className="min-h-[120px] md:min-h-[150px] rounded-xl border-gray-200" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                </Card>
              </TabsContent>

              <TabsContent value="verification" className="focus-visible:outline-none">
                <div className="grid gap-6 md:gap-8">
                   <VerificationForm />
                   <Card className="rounded-[1.5rem] md:rounded-[2rem] border-none shadow-sm p-6 md:p-8 bg-primary/5 border border-primary/10">
                      <h3 className="text-lg md:text-xl font-bold text-primary mb-4 flex items-center gap-2">
                         <ShieldCheck className="w-5 h-5" /> Trust & Safety Badges
                      </h3>
                      <p className="text-primary/80 font-medium text-xs md:text-sm leading-relaxed mb-6">
                         Verified profiles earn the blue checkmark and receive 4x more visibility 
                         in search results. Complete your documents to join the elite tier.
                      </p>
                      <div className="flex gap-4">
                         <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center opacity-30"><ShieldCheck className="w-5 h-5 md:w-6 md:h-6 text-primary" /></div>
                         <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center opacity-30"><ShieldCheck className="w-5 h-5 md:w-6 md:h-6 text-primary" /></div>
                         <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center opacity-30"><ShieldCheck className="w-5 h-5 md:w-6 md:h-6 text-primary" /></div>
                      </div>
                   </Card>
                </div>
              </TabsContent>

              <div className="flex flex-col sm:flex-row justify-end gap-3 md:gap-4 pt-4">
                 <Button type="button" variant="outline" className="h-12 md:h-14 px-6 md:px-8 rounded-xl font-bold border-2 w-full sm:w-auto">Discard Changes</Button>
                 <Button type="submit" className="h-12 md:h-14 px-10 md:px-12 rounded-xl font-black shadow-lg shadow-primary/20 w-full sm:w-auto">Save Profile</Button>
              </div>
            </form>
          </Form>
        </Tabs>
      </div>
  );
};

export default Profile;