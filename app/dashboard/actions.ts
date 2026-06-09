"use server";
import { requireBranchUser } from "@/lib/auth/branch";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { slugToken } from "@/lib/utils/format";

export async function saveCategory(formData: FormData) {
  const { supabase, branch } = await requireBranchUser();
  const id = String(formData.get("id") || "");
  const payload = {
    branch_id: branch.id,
    name: String(formData.get("name") || ""),
    display_order: Number(formData.get("display_order") || 0),
    is_active: formData.get("is_active") !== "off",
  };
  if (!payload.name) return;
  if (id)
    await supabase
      .from("menu_categories")
      .update(payload)
      .eq("id", id)
      .eq("branch_id", branch.id);
  else await supabase.from("menu_categories").insert(payload);
  revalidatePath("/dashboard/menu");
}
export async function deleteCategory(formData: FormData) {
  const { supabase, branch } = await requireBranchUser();
  await supabase
    .from("menu_categories")
    .delete()
    .eq("id", String(formData.get("id")))
    .eq("branch_id", branch.id);
  revalidatePath("/dashboard/menu");
}
export async function saveMenuItem(formData: FormData) {
  const { supabase, branch } = await requireBranchUser();
  const id = String(formData.get("id") || "");
  const payload = {
    branch_id: branch.id,
    category_id: String(formData.get("category_id") || ""),
    name: String(formData.get("name") || ""),
    description: String(formData.get("description") || ""),
    price: Number(formData.get("price") || 0),
    media_type: String(formData.get("media_type") || "none"),
    media_url: String(formData.get("media_url") || "") || null,
    is_available: formData.get("is_available") === "on",
    display_order: Number(formData.get("display_order") || 0),
  };
  if (!payload.name || !payload.category_id) return;
  if (id)
    await supabase
      .from("menu_items")
      .update(payload)
      .eq("id", id)
      .eq("branch_id", branch.id);
  else await supabase.from("menu_items").insert(payload);
  revalidatePath("/dashboard/menu");
}
export async function deleteMenuItem(formData: FormData) {
  const { supabase, branch } = await requireBranchUser();
  await supabase
    .from("menu_items")
    .delete()
    .eq("id", String(formData.get("id")))
    .eq("branch_id", branch.id);
  revalidatePath("/dashboard/menu");
}
export async function saveTable(formData: FormData) {
  const { supabase, branch } = await requireBranchUser();
  const id = String(formData.get("id") || "");
  const payload: any = {
    branch_id: branch.id,
    table_number: String(formData.get("table_number") || ""),
    table_name: String(formData.get("table_name") || ""),
    is_active: formData.get("is_active") === "on",
  };
  if (!payload.table_number) return;
  if (id)
    await supabase
      .from("restaurant_tables")
      .update(payload)
      .eq("id", id)
      .eq("branch_id", branch.id);
  else
    await supabase
      .from("restaurant_tables")
      .insert({ ...payload, qr_token: slugToken(branch.code || "tbl") });
  revalidatePath("/dashboard/tables");
  revalidatePath("/dashboard/qr-codes");
}
export async function deleteTable(formData: FormData) {
  const { supabase, branch } = await requireBranchUser();
  await supabase
    .from("restaurant_tables")
    .delete()
    .eq("id", String(formData.get("id")))
    .eq("branch_id", branch.id);
  revalidatePath("/dashboard/tables");
}
export async function updateStatus(formData: FormData) {
  const { supabase, branch, user } = await requireBranchUser();
  const id = String(formData.get("id"));
  const status = String(formData.get("status"));
  await supabase
    .from("orders")
    .update({ status })
    .eq("id", id)
    .eq("branch_id", branch.id);
  await supabase
    .from("order_status_history")
    .insert({ order_id: id, status, changed_by: user.id });
  revalidatePath("/dashboard/orders");
  revalidatePath("/dashboard/kitchen");
}
export async function goto(path: string) {
  redirect(path);
}
