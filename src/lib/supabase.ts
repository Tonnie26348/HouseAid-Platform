import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";

const supabaseUrl = "https://dccsvpussxdkfbseocon.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRjY3N2cHVzc3hka2Zic2VvY29uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMyMTEzNTgsImV4cCI6MjA4ODc4NzM1OH0.NFafUVGHel-ZV-7yPa-mCUFzjlY-kruE2TEKwlugaBI";

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL and anon key are required.");
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
