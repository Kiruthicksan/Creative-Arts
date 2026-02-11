import React from "react";
import useCartStore from "../../store/useCartStore";
import {
  Tag,
  Trash2,
  ArrowRight,
 
  Check,
  ShoppingBag,
  Sparkles,
  CreditCard,
  Lock,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

/**
 * @component CartPage
 * @description Displays the user's shopping cart with a premium, responsive design.
 * Features include:
 * - Dynamic background elements (consistent with other pages).
 * - Animated list items.
 * - Sticky order summary panel.
 * - Glassmorphism effects for a modern look.
 *
 * @returns {JSX.Element} The rendered Cart page.
 */
const CartPage = () => {
  const { cart, removeFromCart } = useCartStore();
  const navigate = useNavigate();

  // ---------------------------------------------------------------------------
  // Empty State Render
  // ---------------------------------------------------------------------------
  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">
        {/* Dynamic Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-white to-transparent"></div>
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-purple-300/30 rounded-full blur-3xl animate-pulse"></div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-md mx-auto relative z-10"
        >
          <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-purple-100 ring-4 ring-purple-50">
            <ShoppingBag className="w-12 h-12 text-purple-300" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4 font-serif">
            Your cart is empty
          </h2>
          <p className="text-gray-500 mb-8 leading-relaxed text-lg">
            Looks like you haven't found your perfect asset yet.
            <br />
            Our library is full of hidden gems!
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-gray-900 hover:bg-purple-600 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-purple-500/30 hover:-translate-y-1"
          >
            Explore Assets
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // Main Cart Render (With Items)
  // ---------------------------------------------------------------------------
  return (
    <div className="min-h-screen bg-gray-50 relative font-sans selection:bg-purple-100 selection:text-purple-900">
      {/* --- Dynamic Background Elements --- */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-white to-transparent"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-300/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Page Header */}
        <div className="flex items-end gap-4 mb-10">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 leading-tight">
            Shopping Cart
          </h1>
          <span className="text-gray-500 font-medium mb-1.5 text-lg">
            ({cart.totalItems} items)
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* --- Left Column: Cart Items List (8 cols) --- */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white/60 backdrop-blur-xl rounded-2xl shadow-sm border border-white/50 overflow-hidden">
              <div className="p-6 md:p-8 space-y-8">
                <AnimatePresence mode="popLayout">
                  {cart.items.map((item) => (
                    <CartItem
                      key={item._id || item.asset._id}
                      item={item}
                      removeFromCart={removeFromCart}
                    />
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Continue Shopping Link */}
            <div className="flex justify-start">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-gray-500 hover:text-purple-600 font-bold transition-colors group"
              >
                <ArrowRight className="w-5 h-5 rotate-180 group-hover:-translate-x-1 transition-transform" />
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* --- Right Column: Order Summary (4 cols) --- */}
          <div className="lg:col-span-4">
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl shadow-purple-900/5 border border-white/50 p-6 md:p-8 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                Order Summary
                <Sparkles className="w-5 h-5 text-yellow-500 fill-current" />
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-900">
                    ₹{cart.totalPrice}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Taxes</span>
                  <span className="text-green-600 font-medium">
                    Calculated at checkout
                  </span>
                </div>
              </div>

              {/* Coupon Input */}
              <div className="flex gap-2 mb-8">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Coupon code"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all placeholder:text-gray-400"
                  />
                </div>
                <button className="px-4 py-2 bg-gray-900 text-white rounded-xl text-sm font-bold hover:bg-purple-600 transition-colors">
                  Apply
                </button>
              </div>

              <div className="w-full h-px bg-gray-100 mb-6"></div>

              {/* Total */}
              <div className="flex justify-between items-end mb-8">
                <span className="text-lg font-bold text-gray-700">Total</span>
                <span className="text-3xl font-bold text-gray-900 leading-none">
                  ₹{cart.totalPrice}
                </span>
              </div>

              {/* Checkout Button */}
              <button
                className="w-full bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 hover:bg-pos-100 bg-size-200 text-white py-4 rounded-xl font-bold shadow-lg shadow-purple-200 flex items-center justify-center gap-3 transition-all active:scale-[0.98] group"
                onClick={() => navigate("/payment")}
              >
                <CreditCard className="w-5 h-5" />
                Proceed to Checkout
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Security & Benefits */}
              <div className="mt-6 flex flex-col gap-4">
                <div className="flex items-center justify-center gap-2 text-xs text-gray-500 font-medium bg-gray-50 py-2 rounded-lg border border-gray-100">
                  <Lock className="w-3 h-3 text-green-600" />
                  <span>Secure SSL Encrypted Payment</span>
                </div>

                <div className="space-y-2">
                  {[
                    "Instant download access",
                    "Lifetime updates included",
                    "Premium support",
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-sm text-gray-500"
                    >
                      <Check className="w-4 h-4 text-green-500" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Sub-Components
// ---------------------------------------------------------------------------

const CartItem = ({ item, removeFromCart }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col sm:flex-row gap-6 p-4 rounded-xl hover:bg-gray-50/50 transition-colors border border-transparent hover:border-gray-100 group"
    >
      {/* Product Image */}
      <div className="w-full sm:w-32 h-32 shrink-0 bg-gray-100 rounded-lg overflow-hidden border border-gray-200 relative">
        <img
          src={item.asset?.previewImages?.[0]?.secure_url}
          alt={item.asset?.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors"></div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-gray-900 text-xl leading-tight hover:text-purple-600 transition-colors cursor-pointer">
              {item.asset?.title}
            </h3>
            <span className="font-bold text-gray-900 text-lg">
              ₹{item.asset?.price}
            </span>
          </div>
          <p className="text-gray-500 font-medium mt-1">
            by <span className="text-gray-900">{item.asset?.author}</span>
          </p>
        </div>

        <div className="flex justify-between items-end mt-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 text-xs font-bold px-2.5 py-1 rounded-md border border-green-100">
              <Check className="w-3 h-3" />
              In Stock
            </span>
            <span className="text-xs text-gray-400">Digital License</span>
          </div>

          <button
            onClick={() => removeFromCart(item.asset._id)}
            className="text-gray-400 hover:text-red-500 hover:bg-red-50 px-3 py-2 rounded-lg transition-all text-sm font-medium flex items-center gap-2 group/btn"
          >
            <Trash2 className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
            Remove
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default CartPage;
