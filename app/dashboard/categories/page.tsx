import { BranchSwitcher } from "@/components/dashboard/branch-switcher";
import { DashboardShell } from "@/components/dashboard/shell";
import { branchFromSearchParams } from "@/lib/menu/branch-context";
import { categories } from "@/lib/menu/demo-data";

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};
export default async function CategoriesPage({ searchParams }: Props) {
  const branch = await branchFromSearchParams(searchParams);
  return (
    <DashboardShell
      title="Category editor"
      subtitle="Control branch category visibility, display order and menu navigation styling."
      branch={branch}
    >
      <BranchSwitcher branch={branch} basePath="/dashboard/categories" />
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {categories.map((c) => (
          <div
            key={c.slug}
            className="rounded-3xl border border-white/10 bg-white/8 p-4 shadow-xl"
          >
            <p className="text-xs font-black uppercase tracking-[0.2em] text-hennies-aqua">
              #{c.display_order} · {c.color_theme}
            </p>
            <h2 className="mt-2 text-2xl font-black leading-tight">{c.name}</h2>
            <p className="mt-2 text-sm font-semibold text-white/65">
              {c.description}
            </p>
            <div className="mt-4 flex items-center justify-between rounded-2xl bg-white/8 px-3 py-2">
              <span className="text-xs font-bold">Visible on menu</span>
              <input type="checkbox" defaultChecked />
            </div>
          </div>
        ))}
      </div>
    </DashboardShell>
  );
}
