import { createBranchSpecial } from "@/app/dashboard/actions";
import { BranchSwitcher } from "@/components/dashboard/branch-switcher";
import { DashboardShell } from "@/components/dashboard/shell";
import { branchFromSearchParams } from "@/lib/menu/branch-context";
import { specials } from "@/lib/menu/demo-data";

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};
export default async function SpecialsPage({ searchParams }: Props) {
  const branch = await branchFromSearchParams(searchParams);
  return (
    <DashboardShell
      title="Specials editor"
      subtitle="Create branch-only specials, preview global promotions and manage the visuals shown on this branch menu."
      branch={branch}
    >
      <BranchSwitcher branch={branch} basePath="/dashboard/specials" />
      <form
        action={createBranchSpecial}
        className="mb-5 rounded-[2rem] border border-dashed border-hennies-orange/35 bg-white/8 p-5 xl:p-6"
      >
        <input type="hidden" name="branch_id" value={branch.id} />
        <input type="hidden" name="branch_slug" value={branch.slug} />
        <input
          type="hidden"
          name="restaurant_group_id"
          value="00000000-0000-0000-0000-000000000001"
        />
        <h2 className="text-2xl font-black">Create {branch.name} special</h2>
        <div className="mt-4 grid gap-3 xl:grid-cols-2">
          <input
            name="title"
            placeholder="Special title"
            className="rounded-2xl px-4 py-3"
          />
          <input
            name="image_url"
            placeholder="Image URL or uploaded media URL"
            className="rounded-2xl px-4 py-3"
          />
          <textarea
            name="description"
            placeholder="Customer-facing description"
            className="min-h-28 rounded-2xl px-4 py-3 xl:col-span-2"
          />
          <button className="rounded-full bg-hennies-orange px-5 py-3 text-sm font-black text-white shadow-orange xl:w-fit">
            Save branch special
          </button>
        </div>
      </form>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {specials.map((s) => (
          <article
            key={s.id}
            className="overflow-hidden rounded-3xl border border-white/10 bg-white text-hennies-navy shadow-2xl"
          >
            <img
              src={s.image_url}
              alt=""
              className="h-48 w-full object-cover"
            />
            <div className="p-4">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-hennies-orange">
                {s.is_global ? "Global" : branch.name}
              </p>
              <h3 className="text-2xl font-black leading-tight">{s.title}</h3>
              <p className="mt-2 text-sm font-semibold text-slate-600">
                {s.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </DashboardShell>
  );
}
