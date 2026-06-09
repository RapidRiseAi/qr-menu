import { AdminShell } from "@/components/admin/shell";
import { categories, menuItems } from "@/lib/menu/demo-data";
export default function GlobalMenuPage() {
  return (
    <AdminShell
      title="Global standard menu"
      subtitle="Maintain categories, items, allergens, media and push updates to branches."
    >
      <div className="mb-4 rounded-3xl border border-hennies-orange/30 bg-hennies-orange/10 p-4">
        <h2 className="text-xl font-black">Push global menu updates</h2>
        <p className="text-sm text-white/65">
          Production flow should diff global items against branch overrides
          before publishing.
        </p>
      </div>
      <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
        <div className="rounded-3xl border border-white/10 bg-white/8 p-4">
          <h2 className="text-xl font-black">Categories</h2>
          {categories.map((c) => (
            <p
              key={c.slug}
              className="mt-2 rounded-2xl bg-white/10 px-3 py-2 text-sm font-bold"
            >
              {c.display_order}. {c.name}
            </p>
          ))}
        </div>
        <div className="rounded-3xl bg-white p-4 text-hennies-navy">
          <h2 className="text-xl font-black">Global items</h2>
          <div className="mt-3 grid gap-2">
            {menuItems.slice(0, 30).map((i) => (
              <div
                key={i.id}
                className="flex items-center justify-between rounded-2xl bg-slate-50 p-3"
              >
                <span className="font-bold">{i.name}</span>
                <span className="font-black text-hennies-orange">
                  R{i.base_price}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
