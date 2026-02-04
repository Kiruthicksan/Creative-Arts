import { create } from "zustand";
import API from "../services/api";

const useUsersStore = create((set) => ({
  users: [],

  fetchAllUsers: async () => {
    try {
      const response = await API.get("/user/all");
      set({ users: response.data });
    } catch (error) {
      console.log(error);
    }
  },
}));

export default useUsersStore;