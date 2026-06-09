import { DashboardShell } from "@/components/dashboard/nav";
import { requireBranchUser } from "@/lib/auth/branch";
import { Card } from "@/components/ui/card";
import { money, prettyDate, tableLabel } from "@/lib/utils/format";
import { StatusButtons } from "@/components/orders/status-buttons";
export default async function OrderDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { supabase, branch } = await requireBranchUser();
  const { data: order } = await supabase
    .from("orders")
    .select(
      "*, table:restaurant_tables(*), order_items(*), order_status_history(*)",
    )
    .eq("id", id)
    .eq("branch_id", branch.id)
    .single();
  if (!order)
    return (
      <DashboardShell branchName={branch.name}>
        <Card>Order not found.</Card>
      </DashboardShell>
    );
  return (
    <DashboardShell branchName={branch.name}>
      <h1 className="text-3xl font-black">{order.order_number}</h1>
      <Card className="mt-5">
        <p className="text-gold font-bold">{tableLabel(order.table)}</p>
        <p className="text-white/60">{prettyDate(order.created_at)}</p>
        <p className="mt-2">
          Customer: {order.customer_name || "Walk-in"}{" "}
          {order.customer_phone || ""}
        </p>
        {order.order_note && (
          <p className="mt-2 rounded-2xl bg-white/10 p-3">
            Note: {order.order_note}
          </p>
        )}
        <div className="mt-5 grid gap-3">
          {order.order_items.map((i: any) => (
            <div key={i.id} className="rounded-2xl bg-white p-4 text-slate-950">
              <div className="flex justify-between">
                <b>
                  {i.quantity} × {i.item_name_snapshot}
                </b>
                <b>{money(i.line_total)}</b>
              </div>
              {i.item_note && (
                <p className="mt-1 text-sm text-slate-500">
                  Note: {i.item_note}
                </p>
              )}
            </div>
          ))}
        </div>
        <div className="mt-5 flex justify-between text-2xl font-black">
          <span>Total</span>
          <span>{money(order.total)}</span>
        </div>
        <div className="mt-5">
          <StatusButtons orderId={order.id} current={order.status} />
        </div>
      </Card>
      <Card className="mt-5">
        <h2 className="font-bold">Status history</h2>
        {order.order_status_history?.map((h: any) => (
          <p key={h.id} className="mt-2 text-sm text-white/60">
            {h.status} · {prettyDate(h.created_at)}
          </p>
        ))}
      </Card>
    </DashboardShell>
  );
}
