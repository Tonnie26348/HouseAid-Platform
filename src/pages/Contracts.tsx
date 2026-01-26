import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/components/ui/use-toast";
import DashboardLayout from "@/components/shared/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Contracts = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [contracts, setContracts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContracts = async () => {
      if (user) {
        setLoading(true);
        const { data, error } = await supabase
          .from("contracts")
          .select(`
            *,
            job:jobs (title, description),
            worker:profiles!contracts_worker_id_fkey (full_name, avatar_url, skills, experience),
            employer:profiles!contracts_employer_id_fkey (full_name, avatar_url, address)
          `)
          .or(`worker_id.eq.${user.id},employer_id.eq.${user.id}`);

        if (error) {
          toast({
            title: "Error fetching contracts",
            description: error.message,
            variant: "destructive",
          });
        } else if (data) {
          setContracts(data);
        }
        setLoading(false);
      }
    };

    fetchContracts();
  }, [user, toast]);

  if (loading) {
    return <div>Loading contracts...</div>;
  }

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">My Contracts</h1>
      </div>

      {contracts.length === 0 ? (
        <Card>
          <CardContent className="py-6 text-center">
            <p className="text-lg text-gray-600">You don't have any contracts yet.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {contracts.map((contract: any) => (
            <Card key={contract.id}>
              <CardHeader>
                <CardTitle>{contract.job.title}</CardTitle>
                <CardDescription className="capitalize">{contract.status}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-2">
                  <Avatar>
                    <AvatarImage src={contract.worker.avatar_url || 'https://via.placeholder.com/40'} />
                    <AvatarFallback>{contract.worker.full_name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{contract.worker.full_name}</p>
                    <p className="text-sm text-gray-500">Worker</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <Avatar>
                    <AvatarImage src={contract.employer.avatar_url || 'https://via.placeholder.com/40'} />
                    <AvatarFallback>{contract.employer.full_name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{contract.employer.full_name}</p>
                    <p className="text-sm text-gray-500">Employer</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Job Description: {contract.job.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default Contracts;
