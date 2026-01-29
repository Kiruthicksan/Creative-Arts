import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  CreditCard,
  Calendar,
  Lock,
  User,
  ShieldCheck,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import useCartStore from "../../store/useCartStore";
import { Link, useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const { cart } = useCartStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvc: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      navigate("/confirmation-page");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <Link
          to="/cart"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-purple-600 transition-colors mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Cart</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Details Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 sm:p-8 border-b border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <h1 className="text-2xl font-serif font-bold text-gray-900">
                    Payment Details
                  </h1>
                  <div className="flex gap-2">
                    <div className="w-8 h-5 bg-gray-100 rounded flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80 -ml-1"></div>
                    </div>
                    <div className="w-8 h-5 bg-gray-100 rounded flex items-center justify-center">
                      <div className="w-3 h-3 bg-blue-600/80"></div>
                    </div>
                  </div>
                </div>
                <p className="text-gray-500 text-sm">
                  Complete your purchase securely
                </p>
              </div>

              <div className="p-6 sm:p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Card Selection (Visual Only for now as requested) */}
                  <div className="p-4 border-2 border-purple-500 bg-purple-50/50 rounded-xl flex items-center gap-4 cursor-pointer relative">
                    <div className="w-5 h-5 rounded-full border-[5px] border-purple-600 bg-white"></div>
                    <div className="w-12 h-12 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-purple-600 shadow-sm">
                      <CreditCard className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">
                        Credit / Debit Card
                      </h3>
                      <p className="text-sm text-gray-500">
                        Pay securely with your bank card
                      </p>
                    </div>
                    <div className="absolute top-4 right-4">
                      <CheckCircle className="w-5 h-5 text-purple-600" />
                    </div>
                  </div>

                  {/* Card Form */}
                  <div className="space-y-4 pt-2">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700 block">
                        Card Number
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="cardNumber"
                          placeholder="0000 0000 0000 0000"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all font-mono"
                        />
                        <CreditCard className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700 block">
                        Cardholder Name
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="cardName"
                          placeholder="Enter name as provided on card"
                          value={formData.cardName}
                          onChange={handleInputChange}
                          className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
                        />
                        <User className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700 block">
                          Expiry Date
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            name="expiry"
                            placeholder="MM / YY"
                            value={formData.expiry}
                            onChange={handleInputChange}
                            className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all font-mono"
                          />
                          <Calendar className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700 block">
                          CVC / CVV
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            name="cvc"
                            placeholder="123"
                            maxLength={4}
                            value={formData.cvc}
                            onChange={handleInputChange}
                            className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all font-mono"
                          />
                          <Lock className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-xl font-bold shadow-lg shadow-purple-200 flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                      ) : (
                        <>
                          <ShieldCheck className="w-5 h-5" />
                          Pay ₹{cart.totalPrice}
                        </>
                      )}
                    </button>
                  </div>

                  <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                    <Lock className="w-3 h-3" />
                    <p>Your transaction is secured with SSL encryption</p>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>

          {/* Order Summary Sidebar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 max-h-60 overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-gray-300 mb-6">
                {cart.items.map((item) => (
                  <div key={item._id} className="flex gap-3">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                      <img
                        src={item.asset?.previewImages?.[0]?.secure_url}
                        alt={item.asset.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-gray-900 text-sm truncate">
                        {item.asset.title}
                      </h4>
                      <p className="text-xs text-gray-500 mb-1">
                        {item.asset.author}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">
                          Qty: {item.quantity}
                        </span>
                        <span className="font-semibold text-sm text-gray-900">
                          ₹{item.asset.price * item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-6 border-t border-gray-100">
                <div className="flex justify-between text-gray-500 text-sm">
                  <span>Subtotal</span>
                  <span>₹{cart.totalPrice}</span>
                </div>
                <div className="flex justify-between text-gray-500 text-sm">
                  <span>Tax (Estimated)</span>
                  <span>₹0</span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                  <span className="font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-purple-600">
                    ₹{cart.totalPrice}
                  </span>
                </div>
              </div>

              <div className="mt-6 bg-blue-50 p-4 rounded-xl flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <p className="text-sm text-blue-700">
                  After payment, you will receive an email with your download
                  links instantly.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
