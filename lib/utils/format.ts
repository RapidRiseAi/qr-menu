export function money(value: number | string | null | undefined) {
  return new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
  }).format(Number(value ?? 0));
}
export function prettyDate(value: string) {
  return new Intl.DateTimeFormat("en-ZA", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}
export function tableLabel(
  table?: { table_number?: string | null; table_name?: string | null } | null,
) {
  return (
    [table?.table_number, table?.table_name].filter(Boolean).join(" · ") ||
    "Table"
  );
}
export function slugToken(prefix = "tbl") {
  return `${prefix}-${crypto.randomUUID().slice(0, 8)}-${Date.now().toString(36)}`;
}
