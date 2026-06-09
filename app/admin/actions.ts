"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

const DEMO_RESTAURANT_GROUP_ID = "00000000-0000-0000-0000-000000000001";

function toSlug(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function createBranch(formData: FormData) {
  const supabase = await createClient();
  const branchName = String(formData.get("branch_name") || "").trim();
  const rawSlug = String(formData.get("branch_slug") || "").trim();
  const branchSlug = toSlug(rawSlug || branchName);

  if (!branchName || !branchSlug) return;

  await supabase.from("branches").insert({
    restaurant_group_id: DEMO_RESTAURANT_GROUP_ID,
    branch_name: branchName,
    branch_slug: branchSlug,
    address: String(formData.get("address") || "").trim(),
    phone: String(formData.get("phone") || "").trim(),
    email: String(formData.get("email") || "").trim(),
    trading_hours: String(formData.get("trading_hours") || "").trim(),
    is_active: true,
  });

  revalidatePath("/admin/branches");
}
