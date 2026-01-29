import { create } from "zustand";
import API from "../services/api";

const useAssetsStore = create((set) => ({
  assets: [],
  loading: false,
  error: null,

  getAssets: async () => {
    try {
      set({ loading: true });
      const response = await API.get("/assets");
      set({ assets: response.data });
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

export default useAssetsStore;
