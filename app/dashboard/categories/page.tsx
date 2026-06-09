import { DashboardShell } from "@/components/dashboard/shell";
import { categories } from "@/lib/menu/demo-data";
export default function CategoriesPage() {
  return (
    <DashboardShell
      title="Category editor"
      subtitle="Control branch category visibility, order and visual themes."
    >
      <div className="grid gap-3 md:grid-cols-2">
        {categories.map((c) => (
          <div
            key={c.slug}
            className="rounded-3xl border border-white/10 bg-white/8 p-4"
          >
            <p className="text-xs font-black uppercase tracking-[0.2em] text-hennies-aqua">
              #{c.display_order} · {c.color_theme}
            </p>
            <h2 className="text-2xl font-black">{c.name}</h2>
            <p className="text-sm text-white/65">{c.description}</p>
          </div>
        ))}
      </div>
    </DashboardShell>
  );
}
