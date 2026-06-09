import { DashboardShell } from "@/components/dashboard/shell";
import { BranchQr } from "@/components/qr/branch-qr";
import { PUBLIC_BRANCHES } from "@/lib/constants";
export default function QrPage() {
  const branch = PUBLIC_BRANCHES[0];
  return (
    <DashboardShell
      title="Branch QR code"
      subtitle="Generate, download and print the single branch QR poster."
    >
      <BranchQr branchName={branch.name} slug={branch.slug} />
    </DashboardShell>
  );
}
