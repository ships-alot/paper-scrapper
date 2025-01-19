import dotenv from "dotenv";

import { createClient } from "@supabase/supabase-js";

// get the supabase url and key from the .env file

// Load environment variables from .env file
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error("Supabase URL and Key must be provided");
}

export const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function signInWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("Error signing in:", error.message);
    return null;
  }

  return data;
}
