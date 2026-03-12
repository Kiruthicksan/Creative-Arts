import { create } from "zustand";
import API from "../services/api";
import toast from "react-hot-toast";

const useWishlistStore = create((set, get) => ({
  wishlist: [],
  loading: false,

  getWishlist: async () => {
    try {
      set({ loading: true });
      const response = await API.get("/wishlist");
      set({ wishlist: response.data, loading: false });
    } catch (error) {
      set({ loading: false });
      console.log(error);
    }
  },

  toggleWishlist: async (productId) => {
    try {
      // Optimistic update
      const currentWishlist = get().wishlist;
      const isInWishlist = currentWishlist.some((item) => (item._id || item) === productId);
      
      set({ loading: true });
      const response = await API.post("/wishlist/toggle", { productId });
      set({ wishlist: response.data.wishlist, loading: false });
      
      if (response.data.added) {
        toast.success(response.data.message || "Added to wishlist");
      } else {
        toast.success(response.data.message || "Removed from wishlist");
      }
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || "Failed to update wishlist");
    }
  },

  isInWishlist: (productId) => {
    return get().wishlist.some((item) => (item._id || item) === productId);
  },
}));

export default useWishlistStore;
