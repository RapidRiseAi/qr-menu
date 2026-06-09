import { DashboardShell } from "@/components/dashboard/shell";
import { specials } from "@/lib/menu/demo-data";
export default function SpecialsPage() {
  return (
    <DashboardShell
      title="Specials editor"
      subtitle="Add branch-only specials or preview global promos."
    >
      <div className="mb-4 rounded-3xl border border-dashed border-white/20 bg-white/5 p-5">
        <h2 className="text-xl font-black">Create branch special</h2>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <input
            placeholder="Special title"
            className="rounded-2xl px-4 py-3"
          />
          <input
            type="file"
            accept="image/*"
            className="rounded-2xl bg-white/10 px-4 py-3"
          />
          <textarea
            placeholder="Description"
            className="rounded-2xl px-4 py-3 md:col-span-2"
          />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {specials.map((s) => (
          <article
            key={s.id}
            className="overflow-hidden rounded-3xl bg-white text-hennies-navy"
          >
            <img
              src={s.image_url}
              alt=""
              className="h-48 w-full object-cover"
            />
            <div className="p-4">
              <p className="text-xs font-black uppercase text-hennies-orange">
                {s.is_global ? "Global" : "Branch"}
              </p>
              <h3 className="text-2xl font-black">{s.title}</h3>
              <p className="text-sm text-slate-600">{s.description}</p>
            </div>
          </article>
        ))}
      </div>
    </DashboardShell>
  );
}
