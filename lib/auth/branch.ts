import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
export async function requireBranchUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  const { data: membership, error } = await supabase
    .from("branch_users")
    .select("role, branch:branches(*, restaurant_group:restaurant_groups(*))")
    .eq("user_id", user.id)
    .eq("is_active", true)
    .single();
  if (error || !membership)
    redirect("/login?error=No%20active%20branch%20membership");
  return {
    supabase,
    user,
    role: membership.role as string,
    branch: membership.branch as any,
  };
}
