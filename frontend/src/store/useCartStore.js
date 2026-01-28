import { create } from "zustand";
import API from "../services/api";
import { toast } from "react-hot-toast";

const useCartStore = create((set, get) => ({
  cart: { items: [], totalItems: 0, totalPrice: 0 },
  loading: false,

  getCart: async () => {
    try {
      set({ loading: true });
      const response = await API.get("/cart/get-cart");
      set({ cart: response.data.cart });
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },
  addToCart: async (assetId) => {
    try {
      set({ loading: true });
      const response = await API.post("/cart/add-to-cart", {
        assetId,
      });
      set({ cart: response.data.cart });
      toast.success("Asset added to cart");
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },
  isInCart: (assetId) => {
    return get().cart.items.some(
      (item) => item.asset._id === assetId || item.asset === assetId,
    );
  },
  removeFromCart: async (assetId) => {
    try {
      set({ loading: true });
      const response = await API.delete("/cart/remove-cart", {
        data: { assetId },
      });
      set({ cart: response.data.cart });
      toast.success("Asset removed from cart");
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },
  updateQuantity: async (assetId, quantity) => {
    try {
      set({ loading: true });
      const response = await API.put("/cart/update-quantity", {
        assetId,
        quantity,
      });
      set({ cart: response.data.cart });
      toast.success("Quantity updated in cart");
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },
}));

export default useCartStore;
