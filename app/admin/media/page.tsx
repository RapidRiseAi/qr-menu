import { AdminShell } from "@/components/admin/shell";
export default function AdminMediaPage() {
  return (
    <AdminShell
      title="Global media assets"
      subtitle="Upload approved logos, brand imagery and global menu media."
    >
      <div className="rounded-[2rem] border border-dashed border-white/20 bg-white/5 p-8 text-center">
        <h2 className="text-2xl font-black">Brand asset upload area</h2>
        <p className="mt-2 text-white/65">
          No copyrighted logo is hardcoded. Upload approved franchise assets
          here.
        </p>
        <input
          type="file"
          accept="image/*,video/*"
          className="mt-5 rounded-2xl bg-white/10 px-4 py-3"
        />
      </div>
    </AdminShell>
  );
}
