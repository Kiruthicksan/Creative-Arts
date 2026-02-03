import {create} from "zustand";
import API from "../services/api";
const useDashboardStore = create((set) => ({
    totalUsers: 0,
   
    getTotalUsers: async () => {
        try {
            const response = await API.get("/dashboard/total-users");
            set({totalUsers: response.data.data.total});
        } catch (error) {
            console.log(error);
        }
    }
}))

export default useDashboardStore;
