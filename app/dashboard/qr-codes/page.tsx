import { DashboardShell } from "@/components/dashboard/nav";
import { requireBranchUser } from "@/lib/auth/branch";
import { QrCard } from "@/components/qr/qr-card";
import { menuUrl } from "@/lib/qr/url";
import { getRequestOrigin } from "@/lib/qr/request-origin";
export default async function QrCodesPage() {
  const { supabase, branch } = await requireBranchUser();
  const origin = await getRequestOrigin();
  const { data: tablesData } = await supabase
    .from("restaurant_tables")
    .select("*")
    .eq("branch_id", branch.id)
    .order("table_number");
  const tables = (tablesData || []) as any[];
  return (
    <DashboardShell branchName={branch.name}>
      <div className="no-print flex items-center justify-between gap-3">
        <h1 className="text-3xl font-black">Print QR codes</h1>
        <div className="rounded-2xl border border-white/15 px-4 py-3 text-sm text-white/70">
          Use browser print
        </div>
      </div>
      <p className="no-print mt-4 rounded-2xl bg-gold px-4 py-3 font-bold text-black">
        Press Ctrl/Cmd + P to print all QR cards.
      </p>
      <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {tables.map((t: any) => (
          <QrCard
            key={t.id}
            print
            url={menuUrl(t.qr_token, origin)}
            title={branch.name}
            subtitle={`${t.table_number} ${t.table_name || ""}`}
          />
        ))}
      </div>
    </DashboardShell>
  );
}
