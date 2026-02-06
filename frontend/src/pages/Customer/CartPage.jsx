import React from "react";
import useCartStore from "../../store/useCartStore";
import {
  Tag,
  Trash2,
  ArrowRight,
  ShieldCheck,
  Check,
  ShoppingBag,
  Minus,
  Plus,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

const CartPage = () => {
  const { cart, removeFromCart } = useCartStore();

  const navigate = useNavigate();

  if (cart.items.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 bg-gray-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md mx-auto"
        >
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-10 h-10 text-gray-400" />
          </div>
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">
            Your cart is empty
          </h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Looks like you haven't added anything to your cart yet. Start
            exploring our amazing digital products!
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-purple-200"
          >
            Start Shopping
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-serif font-bold text-gray-900 mb-8">
          Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items List - Takes up 2 columns */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="divide-y divide-gray-100">
                {cart.items.map((item) => (
                  <CartItem
                    key={item._id}
                    item={item}
                    removeFromCart={removeFromCart}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary - Takes up 1 column */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({cart.totalItems} items)</span>
                  <span className="font-semibold text-gray-900">
                    ₹{cart.totalPrice}
                  </span>
                </div>
              </div>

              {/* Coupon Input */}
              <div className="flex gap-3 mb-8">
                <input
                  type="text"
                  placeholder="Coupon code"
                  className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
                />
                <button className="p-2.5 bg-white border border-gray-200 rounded-xl text-gray-500 hover:text-purple-600 hover:border-purple-200 transition-colors">
                  <Tag className="w-5 h-5" />
                </button>
              </div>

              {/* Total */}
              <div className="flex justify-between items-center mb-6 pt-4 border-t border-gray-100">
                <span className="text-lg font-bold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-gray-900">
                  ₹{cart.totalPrice}
                </span>
              </div>

              {/* Checkout Button */}
              <button
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-xl font-bold shadow-lg shadow-purple-200 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                onClick={() => navigate("/payment")}
              >
                Proceed to Checkout
                <ArrowRight className="w-5 h-5" />
              </button>

              {/* Trust Badge */}
              <div className="flex items-center justify-center gap-2 mt-6 text-xs text-green-600 font-medium">
                <ShieldCheck className="w-4 h-4" />
                <span>Secure checkout with SSL encryption</span>
              </div>

              {/* Benefits List */}
              <div className="mt-8 space-y-3 pt-6 border-t border-gray-100">
                {[
                  "Instant download after purchase",
                  "Lifetime access to your purchases",
                  "Free updates included",
                ].map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 text-sm text-gray-500"
                  >
                    <Check className="w-4 h-4 text-green-500 mt-0.5" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CartItem = ({ item, removeFromCart }) => {
  return (
    <div key={item._id} className="p-6 flex gap-6 group">
      {/* Product Image */}
      <div className="w-24 h-24 sm:w-32 sm:h-32 shrink-0 bg-gray-100 rounded-xl overflow-hidden border border-gray-200">
        <img
          src={item.asset?.previewImages?.[0]?.secure_url}
          alt={item.asset?.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col sm:flex-row justify-between">
        <div className="flex flex-col gap-1">
          <h3 className="font-bold text-gray-900 text-lg leading-tight">
            {item.asset?.title}
          </h3>
          <p className="text-sm text-gray-500 font-medium">
            by <span className="text-gray-700">{item.asset?.author}</span>
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Digital download - Instant access
          </p>
        </div>

        {/* Actions & Price */}
        <div className="flex flex-row sm:flex-col justify-between items-center sm:items-end mt-4 sm:mt-0">
          <button
            onClick={() => removeFromCart(item.asset._id)}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all text-sm flex items-center gap-1 group-hover:bg-gray-50"
            title="Remove from cart"
          >
            <Trash2 className="w-5 h-5" />
          </button>
          <span className="text-xl font-bold text-gray-900">
            ₹{item.asset?.price}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
