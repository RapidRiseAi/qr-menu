"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function updateBranchMenuOverride(formData: FormData) {
  const supabase = await createClient();
  const payload = {
    branch_id: String(formData.get("branch_id") || ""),
    menu_item_id: String(formData.get("menu_item_id") || ""),
    branch_price: Number(formData.get("branch_price") || 0),
    branch_description: String(formData.get("branch_description") || ""),
    is_available_branch: formData.get("is_available_branch") === "on",
    is_sold_out: formData.get("is_sold_out") === "on",
    is_hidden: formData.get("is_hidden") === "on",
  };
  if (!payload.branch_id || !payload.menu_item_id) return;
  await supabase
    .from("branch_menu_overrides")
    .upsert(payload, { onConflict: "branch_id,menu_item_id" });
  revalidatePath("/dashboard/menu");
}

export async function createBranchSpecial(formData: FormData) {
  const supabase = await createClient();
  await supabase.from("specials").insert({
    branch_id: String(formData.get("branch_id") || "") || null,
    restaurant_group_id: String(formData.get("restaurant_group_id") || ""),
    title: String(formData.get("title") || ""),
    description: String(formData.get("description") || ""),
    image_url: String(formData.get("image_url") || ""),
    is_global: false,
    is_active: true,
  });
  revalidatePath("/dashboard/specials");
}
