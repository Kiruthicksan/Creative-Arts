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

  deleteUser: async (id) => {
    try {
      await API.delete(`/user/delete/${id}`);
      set((state) => ({
        users: state.users.filter((user) => user._id !== id),
      }));
      return { success: true };
    } catch (error) {
      console.log(error);
      return { success: false, error: error.message };
    }
  },
}));

export default useUsersStore;
