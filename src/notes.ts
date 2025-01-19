import { supabase } from "./client";

supabase
  .from("notes")
  .select("*")
  .then((data) => {
    console.log(data);
  });
