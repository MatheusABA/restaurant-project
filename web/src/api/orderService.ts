import api from "./api";

interface OrderItem {
  name: string;
  price: number;
  quantity: number
}

class OrderService {
  async getAllOrders(token: string) {
    const response = await api.get("/order/getAllOrders", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }

  async getOrderById(token: string, id: number) {
    const response = await api.get(`/order/getOrderById/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }

  async closeOrder(token: string, id: number) {
    const response = await api.patch(`/order/updateOrderStatus/${id}`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
  
  async addOrderItem(token: string, id: number, item: OrderItem) {
    const response = await api.post(`/order/addOrderItem/${id}`,
      item,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
      });
    return response.data;
  }
}

export default new OrderService();