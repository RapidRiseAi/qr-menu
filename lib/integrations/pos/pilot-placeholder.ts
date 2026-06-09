import type { PosIntegration, PosOrderPayload, PosTable } from "./types";
import type { OrderStatus } from "@/lib/constants";
export class PilotPlaceholderIntegration implements PosIntegration {
  async createOrder(_order: PosOrderPayload) {
    return { externalOrderId: undefined };
  }
  async updateOrderStatus(_orderId: string, _status: OrderStatus) {}
  async syncMenu(_branchId: string) {}
  async getTables(_branchId: string): Promise<PosTable[]> {
    return [];
  }
}
