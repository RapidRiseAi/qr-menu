import Link from "next/link";
import { PUBLIC_BRANCHES } from "@/lib/constants";
import { withBranch, type PublicBranch } from "@/lib/menu/branch-context";

export function BranchSwitcher({
  branch,
  basePath,
}: {
  branch: PublicBranch;
  basePath: string;
}) {
  return (
    <div className="mb-5 rounded-[1.75rem] border border-white/10 bg-white/8 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,.06)]">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.24em] text-hennies-sky">
            Active branch workspace
          </p>
          <h2 className="mt-1 text-2xl font-black">{branch.name}</h2>
          <p className="text-sm font-semibold text-white/60">
            Public menu:{" "}
            <span className="text-hennies-orange">/m/{branch.slug}</span>
          </p>
        </div>
        <div className="no-scrollbar flex gap-2 overflow-x-auto xl:flex-wrap xl:justify-end">
          {PUBLIC_BRANCHES.map((candidate) => (
            <Link
              key={candidate.slug}
              href={withBranch(basePath, candidate.slug)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-black transition ${candidate.slug === branch.slug ? "bg-hennies-orange text-white shadow-orange" : "bg-white/10 text-white/75 hover:bg-white/15"}`}
            >
              {candidate.name.replace("Hennie’s ", "")}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
