export type BranchRole = "super_admin" | "branch_admin" | "staff" | "kitchen";
export function canManageMenu(role: string) {
  return ["super_admin", "branch_admin"].includes(role);
}
export function canManageTables(role: string) {
  return ["super_admin", "branch_admin"].includes(role);
}
export function canManageOrders(role: string) {
  return ["super_admin", "branch_admin", "staff", "kitchen"].includes(role);
}
