import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/components/ui/use-toast";
import DashboardLayout from "@/components/shared/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const WorkerContracts = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [contracts, setContracts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkerContracts = async () => {
      if (user) {
        setLoading(true);
        const { data, error } = await supabase
          .from("contracts")
          .select(`
            *,
            employer:employer_id (id, full_name, avatar_url)
          `)
          .eq("worker_id", user.id);

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

    fetchWorkerContracts();
  }, [user, toast]);

  const handleContractAction = async (contractId: number, status: 'accepted' | 'rejected') => {
    const { error } = await supabase
      .from("contracts")
      .update({ status: status })
      .eq("id", contractId);

    if (error) {
      toast({
        title: `Error ${status} contract`,
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: `Contract ${status}!`,
        description: `The contract has been ${status}.`,
      });
      // Remove the contract from the list or update its status locally
      setContracts((prev) => prev.filter((contract) => contract.id !== contractId));
    }
  };

  if (loading) {
    return <DashboardLayout><div>Loading your contracts...</div></DashboardLayout>;
  }

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">My Contracts</h1>
      </div>

      {contracts.length === 0 ? (
        <Card>
          <CardContent className="py-6 text-center">
            <p className="text-lg text-gray-600">You have no new contract offers or active contracts.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
          {contracts.map((contract: any) => (
            <Card key={contract.id}>
              <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={contract.employer?.avatar_url || 'https://via.placeholder.com/150'} />
                  <AvatarFallback>{contract.employer?.full_name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{contract.employer?.full_name}</CardTitle>
                  <CardDescription>
                    {contract.status === 'pending' ? 'Pending Offer' : `Status: ${contract.status}`}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-2">
                  Role: {contract.job_id ? 'Specific Job' : 'Direct Hire'}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  Salary: KSH {contract.salary} / {contract.payment_basis}
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  Start Date: {new Date(contract.start_date).toLocaleDateString()}
                  {contract.end_date && ` - ${new Date(contract.end_date).toLocaleDateString()}`}
                </p>

                {contract.status === 'pending' && (
                  <div className="flex space-x-2">
                    <Button onClick={() => handleContractAction(contract.id, 'accepted')}>Accept Offer</Button>
                    <Button variant="outline" onClick={() => handleContractAction(contract.id, 'rejected')}>Reject Offer</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default WorkerContracts;
