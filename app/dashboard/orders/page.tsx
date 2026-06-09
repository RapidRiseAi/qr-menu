import { DashboardShell } from "@/components/dashboard/nav";
import { requireBranchUser } from "@/lib/auth/branch";
import { Card } from "@/components/ui/card";
import { LinkButton } from "@/components/ui/button";
import { money, prettyDate, tableLabel } from "@/lib/utils/format";
import { StatusButtons } from "@/components/orders/status-buttons";
export const revalidate = 10;
export default async function OrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; q?: string }>;
}) {
  const sp = await searchParams;
  const { supabase, branch } = await requireBranchUser();
  let query = supabase
    .from("orders")
    .select("*, table:restaurant_tables(*), order_items(*)")
    .eq("branch_id", branch.id)
    .order("created_at", { ascending: false });
  if (sp.status) query = query.eq("status", sp.status);
  const { data: ordersData } = await query;
  const orders = (ordersData || []) as any[];
  const filtered = sp.q
    ? orders.filter((o: any) =>
        tableLabel(o.table).toLowerCase().includes(sp.q!.toLowerCase()),
      )
    : orders;
  return (
    <DashboardShell branchName={branch.name}>
      <h1 className="text-3xl font-black">Orders</h1>
      <form className="mt-4 flex flex-wrap gap-2">
        <input
          name="q"
          placeholder="Search table"
          className="rounded-2xl px-4 py-3 text-slate-950"
        />
        <select name="status" className="rounded-2xl px-4 py-3 text-slate-950">
          <option value="">All statuses</option>
          {["New", "Accepted", "Preparing", "Ready", "Served", "Cancelled"].map(
            (s) => (
              <option key={s}>{s}</option>
            ),
          )}
        </select>
        <button className="rounded-2xl bg-gold px-4 py-3 font-bold text-black">
          Filter
        </button>
      </form>
      <div className="mt-5 grid gap-4">
        {filtered.map((o: any) => (
          <Card key={o.id}>
            <div className="flex flex-wrap justify-between gap-3">
              <div>
                <p className="text-sm text-white/50">
                  {prettyDate(o.created_at)}
                </p>
                <h2 className="text-2xl font-black">{o.order_number}</h2>
                <p className="font-semibold text-gold">{tableLabel(o.table)}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-black">{money(o.total)}</p>
                <p className="text-sm text-white/50">
                  {o.order_items?.length || 0} items
                </p>
              </div>
            </div>
            <div className="mt-4">
              <StatusButtons orderId={o.id} current={o.status} />
            </div>
            <div className="mt-4 flex justify-end">
              <LinkButton href={`/dashboard/orders/${o.id}`} variant="ghost">
                Open details
              </LinkButton>
            </div>
          </Card>
        ))}
        {filtered.length === 0 && (
          <Card>
            <p className="text-white/60">No orders match this view yet.</p>
          </Card>
        )}
      </div>
    </DashboardShell>
  );
}
