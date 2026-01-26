import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";
import DashboardLayout from "@/components/shared/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

const EmployerProfileView = () => {
  const { id } = useParams(); // Get employer ID from URL
  const { toast } = useToast();
  const [employerProfile, setEmployerProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployerProfile = async () => {
      if (!id) {
        toast({
          title: "Error",
          description: "Employer ID not found in URL.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      setLoading(true);
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        toast({
          title: "Error fetching employer profile",
          description: error.message,
          variant: "destructive",
        });
      } else if (data) {
        setEmployerProfile(data);
      }
      setLoading(false);
    };

    fetchEmployerProfile();
  }, [id, toast]);

  if (loading) {
    return (
      <DashboardLayout pageTitle="Employer Profile">
        <div className="text-center py-8">Loading employer profile...</div>
      </DashboardLayout>
    );
  }

  if (!employerProfile) {
    return (
      <DashboardLayout pageTitle="Employer Profile">
        <div className="text-center py-8">Employer profile not found.</div>
      </DashboardLayout>
    );
  }

  // Determine the page title dynamically
  const pageTitle = employerProfile.full_name ? `${employerProfile.full_name}'s Profile` : "Employer Profile";

  return (
    <DashboardLayout pageTitle={pageTitle}>
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="flex flex-col md:flex-row items-center gap-4 p-6">
          <Avatar className="h-24 w-24">
            <AvatarImage src={employerProfile.avatar_url || 'https://via.placeholder.com/150'} alt={employerProfile.full_name || "Employer Avatar"} />
            <AvatarFallback>{employerProfile.full_name ? employerProfile.full_name.charAt(0) : 'E'}</AvatarFallback>
          </Avatar>
          <div className="text-center md:text-left">
            <CardTitle className="text-3xl font-bold">{employerProfile.full_name}</CardTitle>
            <CardDescription className="text-lg text-gray-600">Employer</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="p-6 pt-0 space-y-6">
          {employerProfile.bio && (
            <div>
              <h3 className="text-xl font-semibold mb-2">About Our Household</h3>
              <p className="text-gray-700">{employerProfile.bio}</p>
            </div>
          )}

          {employerProfile.family_members > 0 && (
            <>
              <Separator />
              <div>
                <h3 className="text-xl font-semibold mb-2">Household Details</h3>
                <p className="text-gray-700">Family Members: {employerProfile.family_members}</p>
                {employerProfile.address && <p className="text-gray-700">Address: {employerProfile.address}</p>}
              </div>
            </>
          )}

          {employerProfile.expectations && (
            <>
              <Separator />
              <div>
                <h3 className="text-xl font-semibold mb-2">Worker Expectations</h3>
                <p className="text-gray-700">{employerProfile.expectations}</p>
              </div>
            </>
          )}

          {employerProfile.household_rules && (
            <>
              <Separator />
              <div>
                <h3 className="text-xl font-semibold mb-2">Household Rules</h3>
                <p className="text-gray-700">{employerProfile.household_rules}</p>
              </div>
            </>
          )}

          {employerProfile.benefits_offered && employerProfile.benefits_offered.length > 0 && (
            <>
              <Separator />
              <div>
                <h3 className="text-xl font-semibold mb-2">Benefits Offered</h3>
                <div className="flex flex-wrap gap-2">
                  {employerProfile.benefits_offered.map((benefit: string, index: number) => (
                    <Badge key={index} variant="secondary">{benefit}</Badge>
                  ))}
                </div>
              </div>
            </>
          )}

          {employerProfile.contact_preferences && (
            <>
              <Separator />
              <div>
                <h3 className="text-xl font-semibold mb-2">Contact Preferences</h3>
                <p className="text-gray-700">{employerProfile.contact_preferences}</p>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default EmployerProfileView;