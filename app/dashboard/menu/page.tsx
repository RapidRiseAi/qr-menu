import { DashboardShell } from "@/components/dashboard/nav";
import { requireBranchUser } from "@/lib/auth/branch";
import { Card, WhiteCard } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Field, inputClass } from "@/components/ui/form";
import { MenuMedia } from "@/components/menu/media-card";
import {
  deleteCategory,
  deleteMenuItem,
  saveCategory,
  saveMenuItem,
} from "../actions";
import { UploadField } from "./upload-field";
import { money } from "@/lib/utils/format";
export default async function MenuPage() {
  const { supabase, branch } = await requireBranchUser();
  const { data: categoriesData } = await supabase
    .from("menu_categories")
    .select("*")
    .eq("branch_id", branch.id)
    .order("display_order");
  const { data: itemsData } = await supabase
    .from("menu_items")
    .select("*")
    .eq("branch_id", branch.id)
    .order("display_order");
  const categories = (categoriesData || []) as any[];
  const items = (itemsData || []) as any[];
  return (
    <DashboardShell branchName={branch.name}>
      <h1 className="text-3xl font-black">Menu management</h1>
      <div className="mt-5 grid gap-5 lg:grid-cols-[360px_1fr]">
        <div className="grid gap-5">
          <Card>
            <h2 className="text-xl font-bold">Add category</h2>
            <form action={saveCategory} className="mt-4 grid gap-3">
              <Field label="Category name">
                <input name="name" className={inputClass} required />
              </Field>
              <Field label="Display order">
                <input
                  name="display_order"
                  type="number"
                  defaultValue={0}
                  className={inputClass}
                />
              </Field>
              <label className="text-sm">
                <input name="is_active" type="checkbox" defaultChecked /> Active
              </label>
              <Button>Add category</Button>
            </form>
          </Card>
          <Card>
            <h2 className="text-xl font-bold">Add menu item</h2>
            <form action={saveMenuItem} className="mt-4 grid gap-3">
              <Field label="Category">
                <select name="category_id" className={inputClass} required>
                  {categories.map((c: any) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Name">
                <input name="name" className={inputClass} required />
              </Field>
              <Field label="Description">
                <textarea name="description" className={inputClass} />
              </Field>
              <Field label="Price">
                <input
                  name="price"
                  type="number"
                  step="0.01"
                  className={inputClass}
                  required
                />
              </Field>
              <Field label="Media type">
                <select name="media_type" className={inputClass}>
                  <option value="none">None</option>
                  <option value="image">Image</option>
                  <option value="video">Video</option>
                </select>
              </Field>
              <UploadField />
              <Field label="Display order">
                <input
                  name="display_order"
                  type="number"
                  defaultValue={0}
                  className={inputClass}
                />
              </Field>
              <label className="text-sm">
                <input name="is_available" type="checkbox" defaultChecked />{" "}
                Available
              </label>
              <Button>Add item</Button>
            </form>
          </Card>
        </div>
        <div className="grid gap-5">
          {categories.map((cat: any) => (
            <Card key={cat.id}>
              <div className="flex items-center justify-between gap-3">
                <form action={saveCategory} className="flex flex-1 gap-2">
                  <input type="hidden" name="id" value={cat.id} />
                  <input
                    name="name"
                    defaultValue={cat.name}
                    className={inputClass}
                  />
                  <input
                    type="hidden"
                    name="display_order"
                    value={cat.display_order}
                  />
                  <Button variant="ghost">Save</Button>
                </form>
                <form action={deleteCategory}>
                  <input type="hidden" name="id" value={cat.id} />
                  <Button variant="danger">Delete</Button>
                </form>
              </div>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {items
                  .filter((i: any) => i.category_id === cat.id)
                  .map((item: any) => (
                    <WhiteCard key={item.id}>
                      <MenuMedia
                        type={item.media_type}
                        url={item.media_url}
                        name={item.name}
                      />
                      <form action={saveMenuItem} className="mt-4 grid gap-2">
                        <input type="hidden" name="id" value={item.id} />
                        <input
                          type="hidden"
                          name="category_id"
                          value={cat.id}
                        />
                        <input
                          name="name"
                          defaultValue={item.name}
                          className={inputClass}
                        />
                        <textarea
                          name="description"
                          defaultValue={item.description}
                          className={inputClass}
                        />
                        <input
                          name="price"
                          type="number"
                          step="0.01"
                          defaultValue={item.price}
                          className={inputClass}
                        />
                        <select
                          name="media_type"
                          defaultValue={item.media_type}
                          className={inputClass}
                        >
                          <option value="none">None</option>
                          <option value="image">Image</option>
                          <option value="video">Video</option>
                        </select>
                        <input
                          name="media_url"
                          defaultValue={item.media_url || ""}
                          className={inputClass}
                          placeholder="Media URL"
                        />
                        <input
                          name="display_order"
                          type="number"
                          defaultValue={item.display_order}
                          className={inputClass}
                        />
                        <label className="text-sm">
                          <input
                            name="is_available"
                            type="checkbox"
                            defaultChecked={item.is_available}
                          />{" "}
                          Available
                        </label>
                        <div className="flex gap-2">
                          <Button>Save</Button>
                          <span className="ml-auto font-black">
                            {money(item.price)}
                          </span>
                        </div>
                      </form>
                      <form action={deleteMenuItem} className="mt-2">
                        <input type="hidden" name="id" value={item.id} />
                        <Button variant="danger" className="w-full">
                          Delete item
                        </Button>
                      </form>
                    </WhiteCard>
                  ))}
              </div>
              {items.filter((i: any) => i.category_id === cat.id).length ===
                0 && (
                <p className="mt-4 text-white/50">
                  No items in this category yet.
                </p>
              )}
            </Card>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
