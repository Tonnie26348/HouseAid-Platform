import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/components/ui/use-toast";
import DashboardLayout from "@/components/shared/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const MyWorkers = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [workers, setWorkers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyWorkers = async () => {
      if (user) {
        setLoading(true);
        const { data, error } = await supabase
          .from("contracts")
          .select(`
            *,
            worker:worker_id (id, full_name, avatar_url, skills, experience)
          `)
          .eq("employer_id", user.id);

        if (error) {
          toast({
            title: "Error fetching workers",
            description: error.message,
            variant: "destructive",
          });
        } else if (data) {
          setWorkers(data.map((contract: any) => ({ ...contract.worker, contract_status: contract.status })));
        }
        setLoading(false);
      }
    };

    fetchMyWorkers();
  }, [user, toast]);

  if (loading) {
    return <div>Loading your workers...</div>;
  }

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">My Workers</h1>
        <Button asChild>
          <Link to="/platform/jobs">Find New Workers</Link>
        </Button>
      </div>

      {workers.length === 0 ? (
        <Card>
          <CardContent className="py-6 text-center">
            <p className="text-lg text-gray-600">You haven't hired any workers yet.</p>
            <Button asChild className="mt-4">
              <Link to="/platform/jobs">Browse Jobs to Find Workers</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {workers.map((worker: any) => (
            <Card key={worker.id}>
              <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={worker.avatar_url || 'https://via.placeholder.com/150'} />
                  <AvatarFallback>{worker.full_name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{worker.full_name}</CardTitle>
                  <CardDescription className="capitalize">{worker.contract_status} Contract</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-2">
                  Skills: {worker.skills?.join(', ') || 'N/A'}
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  Experience: {worker.experience || 'N/A'}
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link to={`/platform/workers/${worker.id}`}>View Details</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default MyWorkers;
