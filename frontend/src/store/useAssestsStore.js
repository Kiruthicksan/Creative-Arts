import { create } from "zustand";
import API from "../services/api";

const useAssestsStore = create((set) => ({
  assests: [],
  loading: false,
  error: null,

  getAssests: async () => {
    try {
      set({ loading: true });
      const response = await API.get("/assets");
      set({ assests: response.data });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  getAssetsById : async (id) => {
    try { 
      set({ loading: true });
      const response = await API.get(`/assets/${id}`);
      set({ asset: response.data });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  }
}));

export default useAssestsStore;
