import { motion } from "framer-motion";
import { ShoppingCart, Heart, Share2, CheckCircle } from "lucide-react";
import useCartStore from "../../store/useCartStore";
import useWishlistStore from "../../store/useWishlistStore"; // Import store

const PurchasePanel = ({ product }) => {
  const addToCart = useCartStore((state) => state.addToCart);
  // Correctly use selector for loading and isInCart
  const loading = useCartStore((state) => state.loading);
  const isInCartValue = useCartStore((state) => state.isInCart(product._id));

  const { toggleWishlist, isInWishlist } = useWishlistStore(); // Destructure wishlist store
  const isWishlisted = isInWishlist(product._id); // Check status

  const handleClick = () => {
    if (isInCartValue) return;
    addToCart(product._id);
  };

  const handleWishlistClick = () => {
    toggleWishlist(product._id);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <motion.button
          disabled={loading || isInCartValue}
          whileTap={{ scale: 0.95 }}
          className={`flex-1 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3.5 rounded-xl flex items-center justify-center gap-2 text-base font-semibold shadow-lg shadow-purple-200 transition-all ${
            isInCartValue ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleClick}
        >
          <ShoppingCart className="w-5 h-5" />
          {isInCartValue ? "In Cart" : loading ? "Adding..." : "Add to Cart"}
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.95 }}
          className={`p-3.5 rounded-xl border transition-colors ${
            isWishlisted
              ? "border-rose-200 bg-rose-50 text-rose-500 hover:bg-rose-100"
              : "border-gray-200 hover:border-gray-300 text-gray-700 hover:bg-gray-50"
          }`}
          onClick={handleWishlistClick}
        >
          <Heart
            className={`w-5 h-5 ${isWishlisted ? "fill-rose-500 text-rose-500" : ""}`}
            style={{ width: "20px", height: "20px" }} // Added explicit size
          />
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.95 }}
          className="p-3.5 rounded-xl border border-gray-200 hover:border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <Share2 className="w-5 h-5" />
        </motion.button>
      </div>

      <div className="flex items-center justify-between gap-4 py-2">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <CheckCircle className="w-4 h-4 text-green-500" />
          <span>Instant download</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <CheckCircle className="w-4 h-4 text-green-500" />
          <span>Lifetime access</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <CheckCircle className="w-4 h-4 text-green-500" />
          <span>Free updates</span>
        </div>
      </div>
    </div>
  );
};

export default PurchasePanel;
