import { BranchQr } from "@/components/qr/branch-qr";
import { BranchSwitcher } from "@/components/dashboard/branch-switcher";
import { DashboardShell } from "@/components/dashboard/shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { branchFromSearchParams, withBranch } from "@/lib/menu/branch-context";
import { menuItems, specials } from "@/lib/menu/demo-data";

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};
export default async function DashboardPage({ searchParams }: Props) {
  const branch = await branchFromSearchParams(searchParams);
  const branchSpecials = specials.filter(
    (special) => special.is_global || !special.is_global,
  );
  const soldOut =
    branch.slug === "hennies-boksburg"
      ? 4
      : branch.slug === "hennies-randburg"
        ? 2
        : 3;
  return (
    <DashboardShell
      title="Branch dashboard"
      subtitle="Manage the visual menu, branch-specific overrides, specials, media and the single QR code for this branch."
      branch={branch}
    >
      <BranchSwitcher branch={branch} basePath="/dashboard" />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          ["Public menu", `/m/${branch.slug}`],
          ["Total items", menuItems.length],
          ["Sold out", soldOut],
          ["Active specials", branchSpecials.length],
        ].map(([k, v]) => (
          <Card key={String(k)} className="bg-white/8">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-hennies-sky">
              {k}
            </p>
            <p className="mt-3 break-words text-3xl font-black">{v}</p>
          </Card>
        ))}
      </div>
      <div className="mt-5 grid gap-3 md:grid-cols-4">
        <Button href={withBranch("/dashboard/menu", branch.slug)}>
          Edit Menu
        </Button>
        <Button
          href={withBranch("/dashboard/specials", branch.slug)}
          variant="ghost"
        >
          Manage Specials
        </Button>
        <Button
          href={withBranch("/dashboard/media", branch.slug)}
          variant="ghost"
        >
          Upload Media
        </Button>
        <Button href={withBranch("/dashboard/qr", branch.slug)} variant="light">
          Download QR
        </Button>
      </div>
      <div className="mt-6 rounded-[2rem] border border-white/10 bg-white/6 p-4 xl:p-6">
        <BranchQr branchName={branch.name} slug={branch.slug} />
      </div>
    </DashboardShell>
  );
}
