import { create } from "zustand";
import API from "../services/api";
import { toast } from "react-hot-toast";

const useWishlistStore = create((set, get) => ({
  wishlist: [],
  loading: false,

  fetchWishlist: async () => {
    try {
      set({ loading: true });
      const response = await API.get("/wishlist");
      set({ wishlist: response.data, loading: false });
    } catch (error) {
      console.error("Failed to fetch wishlist", error);
      set({ loading: false });
    }
  },

  toggleWishlist: async (productId) => {
    try {
      const response = await API.post("/wishlist/toggle", { productId });
      set({ wishlist: response.data.wishlist });

      if (response.data.added) {
        toast.success("Added to Wishlist");
      } else {
        toast.success("Removed from Wishlist");
      }
      return response.data;
    } catch (error) {
      console.error("Failed to update wishlist", error);
      toast.error("Failed to update wishlist");
    }
  },

  isInWishlist: (productId) => {
    const { wishlist } = get();
    // Ensure wishlist is an array before calling some
    if (!Array.isArray(wishlist)) return false;
    return wishlist.some((item) => item._id === productId);
  },
}));

export default useWishlistStore;
