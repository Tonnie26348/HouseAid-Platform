import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

// --- Messaging ---
export const useMessages = (receiverId?: string) => {
  const queryClient = useQueryClient();

  const messages = useQuery({
    queryKey: ["messages", receiverId],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
        .order("created_at", { ascending: true });

      if (error) throw error;
      return data;
    },
    enabled: !!receiverId,
  });

  const sendMessage = useMutation({
    mutationFn: async ({ receiverId, content }: { receiverId: string; content: string }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("messages")
        .insert([{ sender_id: user.id, receiver_id, content }])
        .select();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
  });

  return { messages, sendMessage };
};

// --- Reviews ---
export const useReviews = (revieweeId?: string) => {
  const queryClient = useQueryClient();

  const reviews = useQuery({
    queryKey: ["reviews", revieweeId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("reviews")
        .select("*, reviewer:profiles!reviewer_id(full_name, avatar_url)")
        .eq("reviewee_id", revieweeId);

      if (error) throw error;
      return data;
    },
    enabled: !!revieweeId,
  });

  const addReview = useMutation({
    mutationFn: async (review: { reviewee_id: string; rating: number; comment: string; contract_id?: number }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("reviews")
        .insert([{ ...review, reviewer_id: user.id }])
        .select();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
  });

  return { reviews, addReview };
};

// --- Payments ---
export const usePayments = (contractId?: number) => {
  return useQuery({
    queryKey: ["payments", contractId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("payments")
        .select("*")
        .eq("contract_id", contractId);

      if (error) throw error;
      return data;
    },
    enabled: !!contractId,
  });
};

// --- Verification ---
export const useVerification = () => {
  const queryClient = useQueryClient();

  const request = useQuery({
    queryKey: ["verification"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("verification_requests")
        .select("*")
        .eq("worker_id", user.id)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
  });

  const submitRequest = useMutation({
    mutationFn: async (formData: { id_document_url: string; police_clearance_url: string }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("verification_requests")
        .insert([{ ...formData, worker_id: user.id }])
        .select();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["verification"] });
    },
  });

  return { request, submitRequest };
};
