import { cn } from "@/lib/utils/style";
export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-white/10 bg-white/[.06] p-5 shadow-2xl backdrop-blur",
        className,
      )}
      {...props}
    />
  );
}
export function WhiteCard({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-3xl bg-white p-5 text-slate-950 shadow-xl",
        className,
      )}
      {...props}
    />
  );
}
