import { updateBranchMenuOverride } from "@/app/dashboard/actions";
import { BranchSwitcher } from "@/components/dashboard/branch-switcher";
import { DashboardShell } from "@/components/dashboard/shell";
import { branchFromSearchParams } from "@/lib/menu/branch-context";
import { categories, menuItems } from "@/lib/menu/demo-data";

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};
export default async function MenuEditorPage({ searchParams }: Props) {
  const branch = await branchFromSearchParams(searchParams);
  return (
    <DashboardShell
      title="Branch menu editor"
      subtitle="Adjust branch-specific prices, descriptions, availability, sold-out flags and replacement media. Changes save as branch overrides and the branch QR menu uses this branch workspace."
      branch={branch}
    >
      <BranchSwitcher branch={branch} basePath="/dashboard/menu" />
      <div className="mb-5 grid gap-3 xl:grid-cols-[1fr_280px_220px]">
        <input
          placeholder="Search item by name, ingredient or tag…"
          className="rounded-2xl border border-white/10 bg-white px-4 py-3 text-sm font-semibold text-slate-950"
        />
        <select className="rounded-2xl border border-white/10 bg-white px-4 py-3 text-sm font-semibold text-slate-950">
          <option>All categories</option>
          {categories.map((c) => (
            <option key={c.slug}>{c.name}</option>
          ))}
        </select>
        <a
          href={`/m/${branch.slug}`}
          target="_blank"
          className="inline-flex items-center justify-center rounded-2xl bg-hennies-orange px-4 py-3 text-sm font-black text-white shadow-orange"
        >
          Preview public menu
        </a>
      </div>

      <div className="hidden overflow-hidden rounded-[2rem] border border-white/10 bg-white text-hennies-navy shadow-2xl xl:block">
        <table className="w-full text-sm">
          <thead className="bg-hennies-navy text-left text-white">
            <tr>
              <th className="p-4">Preview</th>
              <th className="p-4">Item</th>
              <th className="p-4">Category</th>
              <th className="p-4">Branch override</th>
              <th className="p-4">Flags</th>
              <th className="p-4">Save</th>
            </tr>
          </thead>
          <tbody>
            {menuItems.map((item) => {
              const category = categories.find(
                (c) => c.slug === item.category_slug,
              );
              return (
                <tr
                  key={item.id}
                  className="border-t border-slate-100 align-top"
                >
                  <td className="p-4">
                    <img
                      src={item.image_url}
                      alt=""
                      className="h-20 w-28 rounded-2xl object-cover"
                    />
                  </td>
                  <td className="max-w-sm p-4">
                    <p className="font-black">{item.name}</p>
                    <p className="mt-1 line-clamp-2 text-slate-500">
                      {item.description}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {item.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-hennies-aqua/15 px-2 py-1 text-[11px] font-bold"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="rounded-full bg-hennies-orange/10 px-3 py-1 text-xs font-black text-hennies-orange">
                      {category?.name}
                    </span>
                  </td>
                  <td className="p-4">
                    <form
                      id={`override-${item.id}`}
                      action={updateBranchMenuOverride}
                      className="grid gap-2"
                    >
                      <input type="hidden" name="branch_id" value={branch.id} />
                      <input type="hidden" name="branch_slug" value={branch.slug} />
                      <input
                        type="hidden"
                        name="menu_item_id"
                        value={item.id}
                      />
                      <input
                        name="branch_price"
                        defaultValue={item.base_price}
                        className="w-28 rounded-xl border px-3 py-2"
                      />
                      <textarea
                        name="branch_description"
                        defaultValue={item.description}
                        className="min-h-20 rounded-xl border px-3 py-2"
                      />
                      <input
                        name="branch_image_url"
                        defaultValue={item.image_url}
                        placeholder="Image URL"
                        className="rounded-xl border px-3 py-2"
                      />
                    </form>
                  </td>
                  <td className="p-4">
                    <label className="flex items-center gap-2 font-semibold">
                      <input
                        form={`override-${item.id}`}
                        name="is_available_branch"
                        type="checkbox"
                        defaultChecked
                      />{" "}
                      Available
                    </label>
                    <label className="mt-2 flex items-center gap-2 font-semibold">
                      <input
                        form={`override-${item.id}`}
                        name="is_sold_out"
                        type="checkbox"
                      />{" "}
                      Sold out
                    </label>
                    <label className="mt-2 flex items-center gap-2 font-semibold">
                      <input
                        form={`override-${item.id}`}
                        name="is_hidden"
                        type="checkbox"
                      />{" "}
                      Hidden
                    </label>
                  </td>
                  <td className="p-4">
                    <button
                      form={`override-${item.id}`}
                      className="rounded-full bg-hennies-navy px-4 py-2 text-xs font-black text-white"
                    >
                      Save override
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="grid gap-4 xl:hidden">
        {menuItems.map((item) => {
          const category = categories.find(
            (c) => c.slug === item.category_slug,
          );
          return (
            <form
              key={item.id}
              action={updateBranchMenuOverride}
              className="rounded-[1.5rem] border border-white/10 bg-white p-4 text-hennies-navy"
            >
              <input type="hidden" name="branch_id" value={branch.id} />
              <input type="hidden" name="branch_slug" value={branch.slug} />
              <input type="hidden" name="menu_item_id" value={item.id} />
              <div className="flex gap-3">
                <img
                  src={item.image_url}
                  alt=""
                  className="h-24 w-28 rounded-2xl object-cover"
                />
                <div className="min-w-0">
                  <p className="text-xs font-black uppercase text-hennies-orange">
                    {category?.name}
                  </p>
                  <h3 className="text-xl font-black leading-tight">
                    {item.name}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-sm text-slate-500">
                    {item.description}
                  </p>
                </div>
              </div>
              <div className="mt-4 grid gap-3">
                <input
                  name="branch_price"
                  defaultValue={item.base_price}
                  className="rounded-xl border px-3 py-2"
                />
                <textarea
                  name="branch_description"
                  defaultValue={item.description}
                  className="min-h-24 rounded-xl border px-3 py-2"
                />
                <input
                  name="branch_image_url"
                  defaultValue={item.image_url}
                  className="rounded-xl border px-3 py-2"
                />
                <div className="grid grid-cols-3 gap-2 text-sm font-semibold">
                  <label>
                    <input
                      name="is_available_branch"
                      type="checkbox"
                      defaultChecked
                    />{" "}
                    Available
                  </label>
                  <label>
                    <input name="is_sold_out" type="checkbox" /> Sold out
                  </label>
                  <label>
                    <input name="is_hidden" type="checkbox" /> Hidden
                  </label>
                </div>
                <button className="rounded-full bg-hennies-orange px-4 py-3 text-sm font-black text-white">
                  Save override
                </button>
              </div>
            </form>
          );
        })}
      </div>
    </DashboardShell>
  );
}
