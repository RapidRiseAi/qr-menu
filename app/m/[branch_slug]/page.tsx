import { notFound } from "next/navigation";
import { MenuExperience } from "@/components/public-menu/menu-experience";
import { getBranchBySlug, menuForBranch } from "@/lib/menu/demo-data";

type Props = { params: Promise<{ branch_slug: string }> };
export default async function PublicMenuPage({ params }: Props) {
  const { branch_slug } = await params;
  const branch = getBranchBySlug(branch_slug);
  if (!branch) notFound();
  const menu = menuForBranch();
  return (
    <MenuExperience
      branch={branch}
      categories={menu.categories}
      items={menu.items}
      specials={menu.specials}
    />
  );
}
