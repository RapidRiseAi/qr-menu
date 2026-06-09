import { AdminShell } from "@/components/admin/shell";
import { PUBLIC_BRANCHES } from "@/lib/constants";
export default function BranchesPage() {
  return (
    <AdminShell
      title="Manage branches"
      subtitle="Create branches, assign admins and copy public menu links."
    >
      <div className="grid gap-4 md:grid-cols-3">
        {PUBLIC_BRANCHES.map((b) => (
          <article
            key={b.slug}
            className="rounded-3xl bg-white p-5 text-hennies-navy"
          >
            <p className="text-xs font-black uppercase text-hennies-orange">
              Active branch
            </p>
            <h2 className="mt-1 text-2xl font-black">{b.name}</h2>
            <p className="mt-2 text-sm text-slate-600">{b.address}</p>
            <p className="mt-3 rounded-2xl bg-hennies-aqua/15 p-3 text-sm font-bold">
              /m/{b.slug}
            </p>
          </article>
        ))}
      </div>
    </AdminShell>
  );
}
