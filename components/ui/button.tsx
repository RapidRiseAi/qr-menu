import Link from "next/link";
import { cn } from "@/lib/utils/style";
type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
};
export function Button({ className, variant = "primary", ...props }: Props) {
  return <button className={cn(buttonClass(variant), className)} {...props} />;
}
export function LinkButton({
  href,
  className,
  variant = "primary",
  children,
}: {
  href: string;
  className?: string;
  variant?: Props["variant"];
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className={cn(buttonClass(variant), className)}>
      {children}
    </Link>
  );
}
function buttonClass(v?: Props["variant"]) {
  return cn(
    "inline-flex items-center justify-center rounded-2xl px-4 py-3 text-sm font-bold transition disabled:opacity-50",
    v === "primary" && "bg-gold text-black shadow-glow",
    v === "secondary" && "bg-white text-black",
    v === "ghost" &&
      "border border-white/15 bg-white/5 text-white hover:bg-white/10",
    v === "danger" && "bg-red-500 text-white",
  );
}
