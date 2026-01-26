import { create } from "zustand";
import API from "../services/api";

const useAssestsStore = create((set) => ({
  assests: [],
  loading: false,
  error: null,

  getAssests: async () => {
    try {
      const response = await API.get("/assets");
      set({ assests: response.data });
    } catch (error) {
      set({ error: error.message });
    }
  },

  getAssetsById : async (id) => {
    try {
      const response = await API.get(`/assets/${id}`);
      set({ asset: response.data });
    } catch (error) {
      set({ error: error.message });
    }
  }
}));

export default useAssestsStore;
