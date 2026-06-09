import { DashboardShell } from "@/components/dashboard/shell";
export default function MediaPage() {
  return (
    <DashboardShell
      title="Media uploads"
      subtitle="Upload logos, item images and videos into Supabase Storage."
    >
      <div className="rounded-[2rem] border border-white/10 bg-white/8 p-6">
        <h2 className="text-2xl font-black">Upload asset</h2>
        <p className="mt-2 text-white/65">
          Use the storage bucket configured in Supabase. Every seeded image can
          be replaced later.
        </p>
        <form className="mt-5 grid gap-3">
          <input
            type="file"
            accept="image/*,video/*"
            className="rounded-2xl bg-white/10 px-4 py-3"
          />
          <input placeholder="Alt text" className="rounded-2xl px-4 py-3" />
          <button className="rounded-full bg-hennies-orange px-5 py-3 font-black">
            Upload media
          </button>
        </form>
      </div>
    </DashboardShell>
  );
}
