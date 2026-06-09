import { BranchSwitcher } from "@/components/dashboard/branch-switcher";
import { DashboardShell } from "@/components/dashboard/shell";
import { BranchQr } from "@/components/qr/branch-qr";
import { branchFromSearchParams } from "@/lib/menu/branch-context";

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};
export default async function QrPage({ searchParams }: Props) {
  const branch = await branchFromSearchParams(searchParams);
  return (
    <DashboardShell
      title="Branch QR code"
      subtitle="Generate, download and print the single public menu QR poster for this branch."
      branch={branch}
    >
      <BranchSwitcher branch={branch} basePath="/dashboard/qr" />
      <BranchQr branchName={branch.name} slug={branch.slug} />
    </DashboardShell>
  );
}
