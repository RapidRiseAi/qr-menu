import { requireBranchUser } from "@/lib/auth/branch";
import { DashboardShell } from "@/components/dashboard/nav";
import { Card } from "@/components/ui/card";
import { LinkButton } from "@/components/ui/button";
import { OPEN_ORDER_STATUSES } from "@/lib/constants";
export default async function Dashboard() {
  const { supabase, branch } = await requireBranchUser();
  const today = new Date().toISOString().slice(0, 10);
  const [
    { count: todays },
    { count: active },
    { count: items },
    { count: tables },
  ] = await Promise.all([
    supabase
      .from("orders")
      .select("id", { count: "exact", head: true })
      .eq("branch_id", branch.id)
      .gte("created_at", today),
    supabase
      .from("orders")
      .select("id", { count: "exact", head: true })
      .eq("branch_id", branch.id)
      .in("status", OPEN_ORDER_STATUSES as unknown as string[]),
    supabase
      .from("menu_items")
      .select("id", { count: "exact", head: true })
      .eq("branch_id", branch.id),
    supabase
      .from("restaurant_tables")
      .select("id", { count: "exact", head: true })
      .eq("branch_id", branch.id)
      .eq("is_active", true),
  ]);
  return (
    <DashboardShell branchName={branch.name}>
      <h1 className="text-3xl font-black">Today’s operations</h1>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["Today’s orders", todays],
          ["Open orders", active],
          ["Menu items", items],
          ["Active tables", tables],
        ].map(([label, value]) => (
          <Card key={label as string}>
            <p className="text-sm text-white/50">{label}</p>
            <p className="mt-3 text-4xl font-black">{value ?? 0}</p>
          </Card>
        ))}
      </div>
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <LinkButton href="/dashboard/menu">Manage Menu</LinkButton>
        <LinkButton href="/dashboard/tables" variant="secondary">
          Manage Tables
        </LinkButton>
        <LinkButton href="/dashboard/orders" variant="ghost">
          View Orders
        </LinkButton>
        <LinkButton href="/dashboard/qr-codes" variant="ghost">
          QR Codes
        </LinkButton>
      </div>
    </DashboardShell>
  );
}
