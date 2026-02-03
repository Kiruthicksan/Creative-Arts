import { create } from "zustand";
import API from "../services/api";
const useDashboardStore = create((set) => ({
  totalUsers: 0,
  userGrowth: 0,
  totalRevenue: 0,
  revenueGrowth: 0,

  getTotalUsers: async () => {
    try {
      const response = await API.get("/dashboard/total-users");
      set({
        totalUsers: response.data.data.totalUsers,
        userGrowth: response.data.data.userGrowth,
        totalRevenue: response.data.data.totalRevenue,
        revenueGrowth: response.data.data.revenueGrowth,
      });
    } catch (error) {
      console.log(error);
    }
  },
}));

export default useDashboardStore;
