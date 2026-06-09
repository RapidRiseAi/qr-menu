"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function updateBranchMenuOverride(formData: FormData) {
  const supabase = await createClient();
  const payload = {
    branch_id: String(formData.get("branch_id") || ""),
    branch_slug: String(formData.get("branch_slug") || ""),
    menu_item_id: String(formData.get("menu_item_id") || ""),
    branch_price: Number(formData.get("branch_price") || 0),
    branch_description: String(formData.get("branch_description") || ""),
    branch_image_url: String(formData.get("branch_image_url") || "") || null,
    branch_video_url: String(formData.get("branch_video_url") || "") || null,
    is_available_branch: formData.get("is_available_branch") === "on",
    is_sold_out: formData.get("is_sold_out") === "on",
    is_hidden: formData.get("is_hidden") === "on",
  };
  if (!payload.branch_id || !payload.menu_item_id) return;
  const { branch_slug, ...override } = payload;
  await supabase
    .from("branch_menu_overrides")
    .upsert(override, { onConflict: "branch_id,menu_item_id" });
  revalidatePath("/dashboard/menu");
  if (branch_slug) {
    revalidatePath(`/m/${branch_slug}`);
  } else {
    revalidatePath("/m/[branch_slug]", "page");
  }
}

export async function createBranchSpecial(formData: FormData) {
  const supabase = await createClient();
  const branchSlug = String(formData.get("branch_slug") || "");
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
  if (branchSlug) revalidatePath(`/m/${branchSlug}`);
}
