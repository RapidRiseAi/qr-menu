import { DashboardShell } from "@/components/dashboard/nav";
import { requireBranchUser } from "@/lib/auth/branch";
import { Card } from "@/components/ui/card";
import { OPEN_ORDER_STATUSES } from "@/lib/constants";
import { tableLabel } from "@/lib/utils/format";
import { StatusButtons } from "@/components/orders/status-buttons";
export const revalidate = 5;
export default async function KitchenPage() {
  const { supabase, branch } = await requireBranchUser();
  const { data: ordersData } = await supabase
    .from("orders")
    .select("*, table:restaurant_tables(*), order_items(*)")
    .eq("branch_id", branch.id)
    .in("status", OPEN_ORDER_STATUSES as unknown as string[])
    .order("created_at");
  const orders = (ordersData || []) as any[];
  return (
    <DashboardShell branchName={branch.name}>
      <h1 className="text-4xl font-black">Kitchen display</h1>
      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        {orders.map((o: any) => (
          <Card key={o.id} className="border-gold/30">
            <div className="flex justify-between">
              <h2 className="text-3xl font-black text-gold">
                {tableLabel(o.table)}
              </h2>
              <span className="rounded-full bg-white px-3 py-2 font-black text-black">
                {o.status}
              </span>
            </div>
            <p className="mt-1 text-white/50">{o.order_number}</p>
            <div className="mt-4 grid gap-3">
              {o.order_items.map((i: any) => (
                <div key={i.id} className="rounded-2xl bg-white/10 p-4">
                  <b className="text-xl">
                    {i.quantity} × {i.item_name_snapshot}
                  </b>
                  {i.item_note && (
                    <p className="mt-1 text-gold">Note: {i.item_note}</p>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-5">
              <StatusButtons orderId={o.id} current={o.status} />
            </div>
          </Card>
        ))}
        {orders.length === 0 && <Card>No open kitchen orders.</Card>}
      </div>
    </DashboardShell>
  );
}
