import { motion } from "framer-motion";
import { ShoppingCart, Heart, Share2, CheckCircle } from "lucide-react";

const PurchasePanel = ({ product }) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3.5 rounded-xl flex items-center justify-center gap-2 text-base font-semibold shadow-lg shadow-purple-200 transition-all"
        >
          <ShoppingCart className="w-5 h-5" />
          Add to Cart
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.95 }}
          className="p-3.5 rounded-xl border border-gray-200 hover:border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <Heart className="w-5 h-5" />
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
