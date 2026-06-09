import { AdminShell } from "@/components/admin/shell";
import { Card } from "@/components/ui/card";
import { PUBLIC_BRANCHES } from "@/lib/constants";
import { categories, menuItems, specials } from "@/lib/menu/demo-data";
export default function AdminPage() {
  return (
    <AdminShell
      title="Global command centre"
      subtitle="Manage restaurant groups, branches and the standard Hennie’s-style global menu."
    >
      <div className="grid gap-4 md:grid-cols-4">
        {[
          ["Branches", PUBLIC_BRANCHES.length],
          ["Global categories", categories.length],
          ["Global items", menuItems.length],
          ["Specials", specials.length],
        ].map(([k, v]) => (
          <Card key={String(k)}>
            <p className="text-sm text-white/55">{k}</p>
            <p className="mt-2 text-4xl font-black">{v}</p>
          </Card>
        ))}
      </div>
    </AdminShell>
  );
}
