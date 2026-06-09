import { DashboardShell } from "@/components/dashboard/nav";
import { requireBranchUser } from "@/lib/auth/branch";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Field, inputClass } from "@/components/ui/form";
import { QrCard } from "@/components/qr/qr-card";
import { deleteTable, saveTable } from "../actions";
import { menuUrl } from "@/lib/qr/url";
export default async function TablesPage() {
  const { supabase, branch } = await requireBranchUser();
  const { data: tablesData } = await supabase
    .from("restaurant_tables")
    .select("*")
    .eq("branch_id", branch.id)
    .order("table_number");
  const tables = (tablesData || []) as any[];
  return (
    <DashboardShell branchName={branch.name}>
      <h1 className="text-3xl font-black">Tables & QR codes</h1>
      <div className="mt-5 grid gap-5 lg:grid-cols-[360px_1fr]">
        <Card>
          <h2 className="text-xl font-bold">Add table</h2>
          <form action={saveTable} className="mt-4 grid gap-3">
            <Field label="Table number">
              <input name="table_number" className={inputClass} required />
            </Field>
            <Field label="Table name">
              <input name="table_name" className={inputClass} />
            </Field>
            <label className="text-sm">
              <input name="is_active" type="checkbox" defaultChecked /> Active
            </label>
            <Button>Add table + QR</Button>
          </form>
        </Card>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {tables.map((t: any) => (
            <div key={t.id} className="grid gap-3">
              <Card>
                <form action={saveTable} className="grid gap-2">
                  <input type="hidden" name="id" value={t.id} />
                  <input
                    name="table_number"
                    defaultValue={t.table_number}
                    className={inputClass}
                  />
                  <input
                    name="table_name"
                    defaultValue={t.table_name}
                    className={inputClass}
                  />
                  <label className="text-sm">
                    <input
                      name="is_active"
                      type="checkbox"
                      defaultChecked={t.is_active}
                    />{" "}
                    Active
                  </label>
                  <Button>Save table</Button>
                </form>
                <form action={deleteTable} className="mt-2">
                  <input type="hidden" name="id" value={t.id} />
                  <Button variant="danger" className="w-full">
                    Delete
                  </Button>
                </form>
              </Card>
              <QrCard
                url={menuUrl(t.qr_token)}
                title={`${t.table_number} ${t.table_name || ""}`}
                subtitle={branch.name}
              />
            </div>
          ))}
          {tables.length === 0 && (
            <p className="text-white/50">
              No tables yet. Add your first table to generate its QR code.
            </p>
          )}
        </div>
      </div>
    </DashboardShell>
  );
}
