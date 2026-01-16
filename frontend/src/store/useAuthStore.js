import { create } from "zustand";
import API from "../services/api";

const useAuthStore = create((set) => ({
  user: null,
  isLoading: false,
  error: null,

  login: async (email, password) => {
    try {
      set({ isLoading: true, error: null });
      const response = await API.post("/auth/login", { email, password });
      set({ user: response.data.user, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Login failed",
      });
    }
  },

  register: async (email, password, userName) => {
    try {
      set({ isLoading: true, error: null });
      const response = await API.post("/auth/register", {
        email,
        password,
        userName,
      });
      set({ user: response.data.user, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Registration failed",
      });
    }
  },

  profile : async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await API.get("/user/profile");
      set({ user: response.data.user, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Profile fetch failed",
      });
    }
  },
  logout : async () => {
    try {
      set({ isLoading: true, error: null });
      await API.post("/auth/logout");
      set({ user: null, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Logout failed",
      });
    }
  }
}));

export default useAuthStore;
