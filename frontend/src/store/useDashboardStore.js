import { create } from "zustand";
import API from "../services/api";
const useDashboardStore = create((set) => ({
  totalUsers: 0,
  userGrowth: 0,
  totalRevenue: 0,
  revenueGrowth: 0,
  totalOrders: 0,
  totalOrdersGrowth: 0,
  activeOrders: 0,
  activeOrdersGrowth: 0,
  recentUsers: [],
  dailyStats: [],

  getTotalUsers: async () => {
    try {
      const response = await API.get("/dashboard/total-users");
      set({
        totalUsers: response.data.data.totalUsers,
        userGrowth: response.data.data.userGrowth,
        totalRevenue: response.data.data.totalRevenue,
        revenueGrowth: response.data.data.revenueGrowth,
        totalOrders: response.data.data.totalOrders,
        totalOrdersGrowth: response.data.data.totalOrdersGrowth,
        activeOrders: response.data.data.activeOrders,
        activeOrdersGrowth: response.data.data.activeOrdersGrowth,
        recentUsers: response.data.data.recentUsers,
        dailyStats: response.data.data.dailyStats,
      });
    } catch (error) {
      console.log(error);
    }
  },
}));

export default useDashboardStore;
