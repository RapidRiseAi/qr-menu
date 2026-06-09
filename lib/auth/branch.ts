import { createClient } from "@/lib/supabase/server";
export async function getCurrentProfile() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;
  const { data } = await supabase
    .from("profiles")
    .select("*, branch:branches(*)")
    .eq("auth_user_id", user.id)
    .single();
  return data;
}
