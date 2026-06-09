import { createBranch } from "@/app/admin/actions";
import { AdminShell } from "@/components/admin/shell";
import { PUBLIC_BRANCHES } from "@/lib/constants";
import { withBranch } from "@/lib/menu/branch-context";
export default function BranchesPage() {
  return (
    <AdminShell
      title="Manage branches"
      subtitle="Create branches, assign admins, preview branch workspaces and copy public menu links."
    >
      <form
        action={createBranch}
        className="mb-5 rounded-[2rem] border border-dashed border-white/20 bg-white/5 p-5"
      >
        <h2 className="text-2xl font-black">Create branch</h2>
        <p className="mt-2 text-sm font-semibold text-white/60">
          Adds a live branch row in Supabase. Assign the branch admin profile to
          this branch from Supabase Auth / profiles after creating the user.
        </p>
        <div className="mt-4 grid gap-3 xl:grid-cols-3">
          <input
            name="branch_name"
            required
            placeholder="Branch name"
            className="rounded-2xl px-4 py-3 text-hennies-navy"
          />
          <input
            name="branch_slug"
            placeholder="Branch slug, e.g. hennies-new-branch"
            className="rounded-2xl px-4 py-3 text-hennies-navy"
          />
          <input
            name="email"
            type="email"
            placeholder="Branch email"
            className="rounded-2xl px-4 py-3 text-hennies-navy"
          />
          <input
            name="address"
            placeholder="Customer-facing address"
            className="rounded-2xl px-4 py-3 text-hennies-navy"
          />
          <input
            name="phone"
            placeholder="Phone"
            className="rounded-2xl px-4 py-3 text-hennies-navy"
          />
          <input
            name="trading_hours"
            placeholder="Trading hours"
            className="rounded-2xl px-4 py-3 text-hennies-navy"
          />
          <button className="rounded-full bg-hennies-orange px-5 py-3 text-sm font-black text-white shadow-orange xl:w-fit">
            Create branch
          </button>
        </div>
      </form>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {PUBLIC_BRANCHES.map((b) => (
          <article
            key={b.slug}
            className="rounded-3xl border border-white/10 bg-white p-5 text-hennies-navy shadow-2xl"
          >
            <p className="text-xs font-black uppercase tracking-[0.2em] text-hennies-orange">
              Active branch
            </p>
            <h2 className="mt-1 text-2xl font-black">{b.name}</h2>
            <p className="mt-2 text-sm font-semibold text-slate-600">
              {b.address} · {b.trading_hours}
            </p>
            <p className="mt-3 rounded-2xl bg-hennies-aqua/15 p-3 text-sm font-black">
              /m/{b.slug}
            </p>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              <a
                className="rounded-full bg-hennies-navy px-4 py-2 text-center text-xs font-black text-white"
                href={`/m/${b.slug}`}
                target="_blank"
              >
                Public menu
              </a>
              <a
                className="rounded-full bg-hennies-orange px-4 py-2 text-center text-xs font-black text-white"
                href={withBranch("/dashboard", b.slug)}
              >
                Branch dashboard
              </a>
            </div>
          </article>
        ))}
      </div>
    </AdminShell>
  );
}
