import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { type SupabaseClient } from "@supabase/supabase-js";
import { Database } from "db";

export function useSupaClient(
  onAuthenticated?: (supa: SupabaseClient) => void,
  onNotAuthenticated?: (supa: SupabaseClient) => void
) {
  const supa = useSupabaseClient<Database>();
  const session = useSession();
  if (session?.user) {
    onAuthenticated && onAuthenticated(supa);
  } else {
    onNotAuthenticated && onNotAuthenticated(supa);
  }
  return { supa, session };
}
