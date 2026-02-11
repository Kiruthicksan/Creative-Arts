import { create } from "zustand";
import API from "../services/api";

const useOrderStore = create((set) => ({
  orders: [],
  recentPurchases: [],
  loading: false,
  error: null,

  getAllOrders: async () => {
    try {
      set({ loading: true });
      const response = await API.get("/orders/all");
      set({ orders: response.data.orders, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  getRecentPurchases: async () => {
    try {
      set({ loading: true });
      const response = await API.get("/orders/library");
      // The library endpoint returns flattened items from paid orders
      set({ recentPurchases: response.data.items || [], loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default useOrderStore;
