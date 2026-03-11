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
      console.log("Synchronizing profile for:", userId);
      
      // Clear any stale queries before fetching new profile
      queryClient.clear();

      let { data, error } = await supabase
        .from("profiles")
        .select("id, full_name, avatar_url, role")
        .eq("id", userId)
        .maybeSingle();

      if (error) {
        console.error("Profile sync error:", error);
        return;
      }

      // Self-healing: If profile doesn't exist, create it from metadata
      if (!data) {
        console.log("Profile missing in DB, auto-generating...");
        const metaRole = (userMetadata?.role || "worker").toLowerCase();
        const newProfile = {
          id: userId,
          full_name: userMetadata?.full_name || 'HouseAid User',
          role: metaRole.includes('employer') || metaRole.includes('household') ? 'employer' : 
                metaRole.includes('admin') ? 'admin' : 'worker',
          updated_at: new Date()
        };
        
        const { data: createdData, error: createError } = await supabase
          .from("profiles")
          .upsert(newProfile)
          .select()
          .single();

        if (createError) {
          console.error("Critical: Auto-profile creation failed:", createError);
        } else {
          console.log("Profile restored successfully.");
          setProfile(createdData);
        }
      } else {
        setProfile(data);
      }
    } catch (error) {
      console.error("Unexpected authentication sync failure:", error);
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
        console.error("Session initialization failed:", error);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth Event Triggered:", event);
      
      if (event === 'SIGNED_OUT') {
        console.log("Clearing all secure states...");
        queryClient.clear();
        setProfile(null);
        setSession(null);
        setUser(null);
      } else if (session?.user) {
        setSession(session);
        setUser(session.user);
        await fetchProfile(session.user.id, session.user.user_metadata);
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
