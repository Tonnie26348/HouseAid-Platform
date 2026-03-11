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

  const fetchProfile = async (userId: string, userMetadata: any) => {
    try {
      let { data, error } = await supabase
        .from("profiles")
        .select("id, full_name, avatar_url, role")
        .eq("id", userId)
        .maybeSingle();

      if (error) {
        console.error("Profile fetch error:", error);
        return;
      }

      // If profile doesn't exist, create it immediately
      if (!data) {
        console.log("Profile missing, creating for user:", userId);
        const newProfile = {
          id: userId,
          full_name: userMetadata?.full_name || 'HouseAid User',
          role: userMetadata?.role || 'worker',
          updated_at: new Date()
        };
        
        const { data: createdData, error: createError } = await supabase
          .from("profiles")
          .upsert(newProfile)
          .select()
          .single();

        if (createError) {
          console.error("Failed to auto-create profile:", createError);
        } else {
          setProfile(createdData);
        }
      } else {
        setProfile(data);
      }
    } catch (error) {
      console.error("Unexpected profile sync error:", error);
    }
  };

  useEffect(() => {
    const getInitialSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          await fetchProfile(session.user.id, session.user.user_metadata);
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
          await fetchProfile(session.user.id, session.user.user_metadata);
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
  const getDerivedRole = () => {
    // 1. Priority: Actual database profile
    if (profile?.role) return profile.role.toLowerCase();
    
    // 2. Secondary: Fresh user metadata (crucial for first-time login)
    if (user?.user_metadata?.role) return user.user_metadata.role.toLowerCase();
    
    // 3. Fallback
    return "worker";
  };

  const rawRole = getDerivedRole();
  const userRole = rawRole.includes("admin") ? "admin" : 
                   (rawRole.includes("employer") || rawRole.includes("household")) ? "employer" : 
                   "worker";

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
