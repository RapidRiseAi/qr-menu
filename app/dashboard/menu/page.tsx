import { DashboardShell } from "@/components/dashboard/shell";
import { menuItems, categories } from "@/lib/menu/demo-data";
export default function MenuEditorPage() {
  return (
    <DashboardShell
      title="Branch menu editor"
      subtitle="Search, filter and override branch-specific item details. Supabase saves are wired for production data through the schema."
    >
      <div className="mb-4 grid gap-3 md:grid-cols-[1fr_260px]">
        <input placeholder="Search item…" className="rounded-2xl px-4 py-3" />
        <select className="rounded-2xl px-4 py-3">
          <option>All categories</option>
          {categories.map((c) => (
            <option key={c.slug}>{c.name}</option>
          ))}
        </select>
      </div>
      <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white text-hennies-navy">
        <table className="w-full text-sm">
          <thead className="bg-hennies-aqua/15 text-left">
            <tr>
              <th className="p-3">Preview</th>
              <th className="p-3">Item</th>
              <th className="p-3">Price override</th>
              <th className="p-3">Available</th>
              <th className="p-3">Sold out</th>
              <th className="p-3">Media</th>
            </tr>
          </thead>
          <tbody>
            {menuItems.slice(0, 80).map((item) => (
              <tr key={item.id} className="border-t border-slate-100">
                <td className="p-3">
                  <img
                    src={item.image_url}
                    alt=""
                    className="h-14 w-20 rounded-xl object-cover"
                  />
                </td>
                <td className="p-3">
                  <p className="font-black">{item.name}</p>
                  <p className="line-clamp-1 text-slate-500">
                    {item.description}
                  </p>
                </td>
                <td className="p-3">
                  <input
                    defaultValue={item.base_price}
                    className="w-24 rounded-xl border px-3 py-2"
                  />
                </td>
                <td className="p-3">
                  <input type="checkbox" defaultChecked />
                </td>
                <td className="p-3">
                  <input type="checkbox" />
                </td>
                <td className="p-3">
                  <input
                    type="file"
                    accept="image/*,video/*"
                    className="max-w-40 text-xs"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardShell>
  );
}
