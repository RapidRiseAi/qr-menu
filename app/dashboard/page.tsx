import { BranchQr } from "@/components/qr/branch-qr";
import { DashboardShell } from "@/components/dashboard/shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PUBLIC_BRANCHES } from "@/lib/constants";
import { menuItems, specials } from "@/lib/menu/demo-data";
export default function DashboardPage() {
  const branch = PUBLIC_BRANCHES[0];
  const soldOut = 3;
  return (
    <DashboardShell
      title="Branch dashboard"
      subtitle="Manage your branch’s visual menu, QR code and specials."
    >
      <div className="grid gap-4 md:grid-cols-4">
        {[
          ["Public menu", `/m/${branch.slug}`],
          ["Total items", menuItems.length],
          ["Sold out", soldOut],
          ["Active specials", specials.length],
        ].map(([k, v]) => (
          <Card key={String(k)}>
            <p className="text-sm text-white/55">{k}</p>
            <p className="mt-2 text-3xl font-black">{v}</p>
          </Card>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap gap-3">
        <Button href="/dashboard/menu">Edit Menu</Button>
        <Button href="/dashboard/specials" variant="ghost">
          Manage Specials
        </Button>
        <Button href="/dashboard/media" variant="ghost">
          Upload Media
        </Button>
        <Button href="/dashboard/qr" variant="light">
          Download QR
        </Button>
      </div>
      <div className="mt-6">
        <BranchQr branchName={branch.name} slug={branch.slug} />
      </div>
    </DashboardShell>
  );
}
