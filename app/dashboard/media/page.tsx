import { BranchSwitcher } from "@/components/dashboard/branch-switcher";
import { DashboardShell } from "@/components/dashboard/shell";
import { branchFromSearchParams } from "@/lib/menu/branch-context";

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};
export default async function MediaPage({ searchParams }: Props) {
  const branch = await branchFromSearchParams(searchParams);
  return (
    <DashboardShell
      title="Media uploads"
      subtitle="Upload branch logos, item images, videos and special artwork into Supabase Storage."
      branch={branch}
    >
      <BranchSwitcher branch={branch} basePath="/dashboard/media" />
      <div className="grid gap-5 xl:grid-cols-[1fr_360px]">
        <form action="/api/upload" method="post" encType="multipart/form-data" className="rounded-[2rem] border border-white/10 bg-white/8 p-6">
          <h2 className="text-2xl font-black">
            Upload asset for {branch.name}
          </h2>
          <p className="mt-2 text-sm font-semibold text-white/65">
            Files are stored in the configured Supabase Storage bucket and can
            be used as item, special or branch media.
          </p>
          <div className="mt-5 grid gap-3">
            <input type="hidden" name="branch_id" value={branch.id} />
            <input
              type="hidden"
              name="restaurant_group_id"
              value="00000000-0000-0000-0000-000000000001"
            />
            <input
              name="file"
              type="file"
              accept="image/*,video/*"
              className="rounded-2xl bg-white/10 px-4 py-3"
            />
            <input
              name="alt_text"
              placeholder="Alt text"
              className="rounded-2xl px-4 py-3"
            />
            <button className="rounded-full bg-hennies-orange px-5 py-3 font-black text-white shadow-orange">
              Upload media
            </button>
          </div>
        </form>
        <aside className="rounded-[2rem] border border-white/10 bg-hennies-blue p-5">
          <h3 className="text-xl font-black">Production notes</h3>
          <ul className="mt-3 space-y-2 text-sm font-semibold text-white/65">
            <li>• Replace demo image URLs with approved branch photography.</li>
            <li>• Use short alt text for accessibility.</li>
            <li>• Videos should be compressed before upload.</li>
          </ul>
        </aside>
      </div>
    </DashboardShell>
  );
}
