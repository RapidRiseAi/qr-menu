import Link from "next/link";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import { cn } from "@/lib/utils/style";

type Props = {
  children: ReactNode;
  variant?: "primary" | "ghost" | "light";
  href?: string;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement> &
  AnchorHTMLAttributes<HTMLAnchorElement>;
export function Button({
  children,
  variant = "primary",
  href,
  className,
  ...props
}: Props) {
  const classes = cn(
    "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-black transition",
    variant === "primary" &&
      "bg-hennies-orange text-white shadow-orange hover:-translate-y-0.5",
    variant === "ghost" &&
      "border border-white/15 bg-white/10 text-white hover:bg-white/15",
    variant === "light" && "bg-white text-hennies-navy hover:bg-hennies-cream",
    className,
  );
  if (href)
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
