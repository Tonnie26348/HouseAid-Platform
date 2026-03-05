import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://fulqnripzbokgiubrmtf.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ1bHFucmlwemJva2dpdWJybXRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI2OTcwMzAsImV4cCI6MjA4ODI3MzAzMH0.-p7ImbC48urKp8KMvoMyr5nLx2HfEoY92cJxeWNx2-A";

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL and anon key are required.");
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
