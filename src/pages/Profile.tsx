import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
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
import { useToast } from "@/components/ui/use-toast";
import DashboardLayout from "@/components/shared/DashboardLayout";
import { Textarea } from "@/components/ui/textarea";

const profileSchema = z.object({
  full_name: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  avatar_url: z.string().url({ message: "Invalid URL." }).optional().or(z.literal('')),
  // Worker specific
  skills: z.string().optional(),
  experience: z.string().optional(),
  availability: z.string().optional(),
  hourly_rate: z.coerce.number().optional(),
  // Household specific
  address: z.string().optional(),
  family_members: z.coerce.number().optional(),
  // New employer-specific fields
  bio: z.string().optional(),
  expectations: z.string().optional(),
  household_rules: z.string().optional(),
  contact_preferences: z.string().optional(),
  benefits_offered: z.array(z.string()).optional(),
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
      // New employer-specific fields
      bio: "",
      expectations: "",
      household_rules: "",
      contact_preferences: "",
      benefits_offered: [],
    },
  });

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        setLoading(true);
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (error) {
          toast({
            title: "Error fetching profile",
            description: error.message,
            variant: "destructive",
          });
        } else if (data) {
          console.log("Fetched avatar URL:", data.avatar_url);
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
            payment_basis: data.payment_basis || '',
            // New employer-specific fields
            bio: data.bio || '',
            expectations: data.expectations || '',
            household_rules: data.household_rules || '',
            contact_preferences: data.contact_preferences || '',
            benefits_offered: data.benefits_offered?.join(', ') || '',
          });
        }
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
            toast({
                title: "Error updating profile",
                description: error.message,
                variant: "destructive",
            });
        } else {
            toast({
                title: "Profile updated successfully!",
            });
        }
    }
  };

  const uploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) {
      return;
    }

    if (user) {
      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}.${fileExt}`;
      
      setUploading(true);

      const { error } = await supabase.storage
        .from('avatars')
        .upload(fileName, file, { upsert: true });

      if (error) {
        toast({
          title: "Error uploading avatar",
          description: error.message,
          variant: "destructive",
        });
      } else {
        const { data } = supabase.storage.from('avatars').getPublicUrl(fileName);
        form.setValue('avatar_url', data.publicUrl);
        // Automatically submit the form to save the new avatar URL
        onSubmit(form.getValues());
        toast({
            title: "Avatar updated successfully!",
        });
      }
      setUploading(false);
    }
  }
  
  if (loading) {
    return <div>Loading profile...</div>
  }

  return (
    <DashboardLayout>
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>
            This is how others will see you on the site.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="flex items-center space-x-4">
                <img src={form.watch('avatar_url') || 'https://via.placeholder.com/150'} alt="Avatar" className="w-20 h-20 rounded-full" />
                <div className="flex flex-col">
                  <FormLabel>Avatar</FormLabel>
                  <Input type="file" onChange={uploadAvatar} disabled={uploading} />
                  {uploading && <p>Uploading...</p>}
                </div>
              </div>

              <FormField
                control={form.control}
                name="full_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {profile?.role === 'worker' && (
                <>
                  <FormField
                    control={form.control}
                    name="skills"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Skills</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Cooking, Cleaning, Childcare" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="experience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Experience</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Tell us about your experience" {...field} value={field.value || ''} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="availability"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Availability</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Mon-Fri, 9am-5pm" {...field} />
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
                        <FormLabel>Monthly Rate (KSH)</FormLabel>
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
                            <SelectItem value="per day">Per Day</SelectItem>
                            <SelectItem value="per week">Per Week</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              {profile?.role === 'employer' && (
                <>
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input placeholder="Your address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="family_members"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of Family Members</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* New Employer Profile Fields */}
                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>About Your Household</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Tell us about your household and what you're looking for in a worker." {...field} value={field.value || ''} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="expectations"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Worker Expectations</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Describe your expectations for workers (e.g., punctuality, communication, responsibilities)." {...field} value={field.value || ''} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="household_rules"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Household Rules</FormLabel>
                        <FormControl>
                          <Textarea placeholder="List any important household rules or guidelines (e.g., no smoking, pet care)." {...field} value={field.value || ''} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="contact_preferences"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Preferences</FormLabel>
                        <FormControl>
                          <Input placeholder="How do you prefer to be contacted? (e.g., text, call, during work hours only)" {...field} />
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
                        <FormLabel>Benefits Offered (comma-separated)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Flexible hours, Meals provided, Transport allowance" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              <Button type="submit">Update Profile</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default Profile;
