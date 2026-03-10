import { createContext, useContext, useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { useQueryClient } from "@tanstack/react-query";

type Profile = {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  role: string;
};

type AuthContextType = {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  userRole: string | null;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  profile: null,
  loading: true,
  userRole: null,
  signOut: async () => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const queryClient = useQueryClient();

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, full_name, avatar_url, role")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Profile fetch error:", error);
        // If we can't get the profile, the session might be corrupt
        setProfile(null);
        return;
      }
      setProfile(data);
    } catch (error) {
      console.error("Unexpected profile fetch error:", error);
      setProfile(null);
    }
  };

  useEffect(() => {
    const getInitialSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          await fetchProfile(session.user.id);
        }
      } catch (error) {
        console.error("Error getting session:", error);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth event:", event);
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED' || !profile) {
          await fetchProfile(session.user.id);
        }
      } else {
        setProfile(null);
        if (event === 'SIGNED_OUT' || event === 'USER_UPDATED') {
          queryClient.clear();
        }
      }
      setLoading(false);
    });

    // Periodic session verification to prevent stale states
    const verifyInterval = setInterval(async () => {
      const { data: { session: currentSession } } = await supabase.auth.getSession();
      if (!currentSession && user) {
        console.warn("Session expired in background");
        setUser(null);
        setSession(null);
        setProfile(null);
        queryClient.clear();
      }
    }, 1000 * 60 * 2); // Check every 2 minutes

    return () => {
      subscription.unsubscribe();
      clearInterval(verifyInterval);
    };
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    queryClient.clear();
    setSession(null);
    setUser(null);
    setProfile(null);
  };

  // Helper to get normalized role from either profile or metadata
  const rawRole = (profile?.role || user?.user_metadata?.role || "worker").toLowerCase();
  const userRole = rawRole.includes("worker") ? "worker" : 
                   rawRole.includes("employer") || rawRole.includes("household") ? "employer" : 
                   rawRole.includes("admin") ? "admin" : "worker";

  const value = {
    session,
    user,
    profile,
    loading,
    userRole,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
