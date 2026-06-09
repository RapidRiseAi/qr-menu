import type { OrderStatus } from "@/lib/constants";
export interface PosOrderPayload {
  branchId: string;
  orderId: string;
  orderNumber: string;
  tableId: string;
  total: number;
  items: Array<{
    menuItemId: string | null;
    name: string;
    quantity: number;
    price: number;
    note?: string | null;
  }>;
}
export interface PosTable {
  id: string;
  name: string;
  number: string;
  active: boolean;
}
export interface PosIntegration {
  createOrder(order: PosOrderPayload): Promise<{ externalOrderId?: string }>;
  updateOrderStatus(orderId: string, status: OrderStatus): Promise<void>;
  syncMenu(branchId: string): Promise<void>;
  getTables(branchId: string): Promise<PosTable[]>;
}
