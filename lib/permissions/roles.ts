export type UserRole = "super_admin" | "branch_admin";
export function canManageGlobalMenu(role?: string | null) {
  return role === "super_admin";
}
export function canManageBranch(role?: string | null) {
  return role === "super_admin" || role === "branch_admin";
}
export function isValidRole(role?: string | null): role is UserRole {
  return role === "super_admin" || role === "branch_admin";
}
