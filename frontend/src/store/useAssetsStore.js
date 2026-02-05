import { create } from "zustand";
import API from "../services/api";

const useAssetsStore = create((set) => ({
  assets: [],
  asset: null,
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

  getAssetsById: async (id) => {
    if (!id || id === "undefined") {
      return set({ error: "Invalid Product ID", loading: false });
    }
    try {
      set({ loading: true });
      const response = await API.get(`/assets/${id}`);
      set({ asset: response.data });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  deleteAsset: async (id) => {
    try {
      set({ loading: true });
      await API.delete(`/assets/${id}`);
      set((state) => ({
        assets: state.assets.filter((asset) => asset._id !== id),
        loading: false,
      }));
      return { success: true };
    } catch (error) {
      set({ error: error.message, loading: false });
      return { success: false, error: error.message };
    }
  },

  createProduct: async (productData) => {
    try {
      set({ loading: true });
      const response = await API.post("/assets", productData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      set((state) => ({
        assets: [...state.assets, response.data],
        loading: false,
      }));
      return { success: true };
    } catch (error) {
      set({ error: error.message, loading: false });
      return {
        success: false,
        error: error.message || "Failed to create product",
      };
    }
  },
}));

export default useAssetsStore;
