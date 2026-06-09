import { createServiceClient } from "@/lib/supabase/server";
import { CustomerMenu } from "./customer-menu";
export default async function MenuTokenPage({
  params,
}: {
  params: Promise<{ qr_token: string }>;
}) {
  const { qr_token } = await params;
  const supabase = await createServiceClient();
  const { data: table } = await supabase
    .from("restaurant_tables")
    .select("*, branch:branches(*)")
    .eq("qr_token", qr_token)
    .single();
  if (!table || !table.is_active)
    return (
      <main className="grid min-h-screen place-items-center bg-black p-5 text-white">
        <div className="rounded-3xl bg-white/10 p-6 text-center">
          <h1 className="text-2xl font-black">QR code inactive</h1>
          <p className="mt-2 text-white/60">
            Please ask staff for a fresh table QR code.
          </p>
        </div>
      </main>
    );
  const [{ data: categoriesData }, { data: itemsData }] = await Promise.all([
    supabase
      .from("menu_categories")
      .select("*")
      .eq("branch_id", table.branch_id)
      .eq("is_active", true)
      .order("display_order"),
    supabase
      .from("menu_items")
      .select("*")
      .eq("branch_id", table.branch_id)
      .eq("is_available", true)
      .order("display_order"),
  ]);
  return (
    <CustomerMenu
      token={qr_token}
      branch={table.branch}
      table={table}
      categories={(categoriesData || []) as any[]}
      items={(itemsData || []) as any}
    />
  );
}
