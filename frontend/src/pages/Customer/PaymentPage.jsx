import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  CreditCard,
  User,
  ShieldCheck,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Lock,
  Sparkles,
} from "lucide-react";
import useCartStore from "../../store/useCartStore";
import useAuthStore from "../../store/useAuthStore";
import API from "../../services/api";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const PaymentPage = () => {
  const { cart, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    cardName: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await loadRazorpay();
    if (!res) {
      setLoading(false);
      toast.error("Razorpay SDK failed to load. Check your connection.");
      return;
    }

    try {
      // 1. Create Order on Backend
      const { data } = await API.post("/orders/create");

      if (!data.success) {
        throw new Error("Failed to create order");
      }

      const options = {
        key: data.key,
        amount: data.order.amount,
        currency: data.order.currency,
        name: "Creative Arts",
        description: "Purchase of Digital Assets",
        order_id: data.order.id,
        handler: async function (response) {
          try {
            const verifyRes = await API.post("/orders/verify", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verifyRes.data.success) {
              const orderDetails = {
                items: cart.items,
                totalPrice: cart.totalPrice,
              };
              clearCart();
              toast.success("Payment Successful!");
              navigate("/confirmation-page", { state: orderDetails });
            } else {
              toast.error("Payment verification failed.");
            }
          } catch (err) {
            console.error(err);
            toast.error("Payment verification failed.");
          }
        },
        prefill: {
          name: user?.userName || formData.cardName || "User",
          email: user?.email,
          contact: "9999999999",
        },
        theme: {
          color: "#9333ea",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

      paymentObject.on("payment.failed", function (response) {
        toast.error(response.error.description);
        setLoading(false);
      });
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message ||
          "Something went wrong initializing payment",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 relative font-sans selection:bg-purple-100 selection:text-purple-900">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-white to-transparent"></div>
        <div className="absolute -left-20 top-20 w-72 h-72 bg-purple-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -right-20 bottom-20 w-72 h-72 bg-indigo-300/20 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-8">
          <Link
            to="/cart"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-purple-600 font-bold transition-all group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Cart
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Payment Section (8 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-8 space-y-8"
          >
            <div className="bg-white/60 backdrop-blur-xl rounded-2xl shadow-sm border border-white/50 overflow-hidden">
              <div className="p-8 border-b border-gray-100/50 flex justify-between items-center">
                <div>
                  <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">
                    Payment Details
                  </h1>
                  <p className="text-gray-500">
                    Complete your purchase securely
                  </p>
                </div>
                <div className="hidden sm:flex gap-2">
                  <div className="h-8 w-12 bg-gray-100/80 rounded flex items-center justify-center">
                    <div className="h-4 w-4 rounded-full bg-red-500/80 -mr-1"></div>
                    <div className="h-4 w-4 rounded-full bg-yellow-500/80"></div>
                  </div>
                  <div className="h-8 w-12 bg-gray-100/80 rounded flex items-center justify-center">
                    <div className="h-4 w-8 bg-blue-600/80 rounded-sm"></div>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Selected Payment Method */}
                  <div className="relative group cursor-pointer">
                    <div className="absolute inset-0 bg-purple-600/5 rounded-xl blur-xl group-hover:bg-purple-600/10 transition-colors"></div>
                    <div className="relative p-6 bg-gradient-to-br from-white to-purple-50/30 rounded-xl border-2 border-purple-500 flex items-center gap-5 shadow-sm">
                      <div className="w-14 h-14 rounded-xl bg-white border border-purple-100 flex items-center justify-center text-purple-600 shadow-md shadow-purple-900/5">
                        <CreditCard className="w-7 h-7" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 text-lg">
                          Razorpay Secure Checkout
                        </h3>
                        <p className="text-sm text-gray-500 mt-0.5">
                          Redirects to Razorpay to complete payment securely
                        </p>
                      </div>
                      <div className="bg-purple-600 text-white p-1 rounded-full">
                        <CheckCircle className="w-5 h-5" />
                      </div>
                    </div>
                  </div>

                  {/* Input Fields */}
                  <div className="space-y-4">
                    <label className="block text-sm font-bold text-gray-700">
                      Cardholder Name (Optional)
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                        <User className="w-5 h-5" />
                      </div>
                      <input
                        type="text"
                        name="cardName"
                        placeholder="John Doe"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-4 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all font-medium placeholder:text-gray-400"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="group relative w-full bg-gray-900 hover:bg-purple-600 text-white py-4 rounded-xl font-bold text-lg shadow-xl shadow-purple-900/10 hover:shadow-purple-600/20 transition-all flex items-center justify-center gap-3 overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                      <div className="relative flex items-center gap-2">
                        {loading ? (
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : (
                          <>
                            <ShieldCheck className="w-5 h-5" />
                            <span>Pay Securely ₹{cart.totalPrice}</span>
                          </>
                        )}
                      </div>
                    </button>
                    <div className="text-center mt-4 flex items-center justify-center gap-2 text-xs text-gray-500 font-medium">
                      <Lock className="w-3 h-3 text-green-600" />
                      Encrypted and Secured by 256-bit SSL
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>

          {/* Order Summary (4 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-4"
          >
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl shadow-purple-900/5 border border-white/50 p-6 md:p-8 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                Order Summary
                <Sparkles className="w-4 h-4 text-yellow-500 fill-current" />
              </h2>

              <div className="space-y-6 mb-8 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {cart.items.map((item) => (
                  <div key={item._id} className="flex gap-4 group">
                    <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden shrink-0 border border-gray-200">
                      <img
                        src={item.asset?.previewImages?.[0]?.secure_url}
                        alt={item.asset?.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                      <h4 className="font-bold text-gray-900 text-sm truncate mb-1">
                        {item.asset?.title}
                      </h4>
                      <p className="text-xs text-gray-500 mb-2">
                        {item.asset?.author}
                      </p>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500 bg-gray-100 px-2 py-0.5 rounded text-xs font-bold">
                          x{item.quantity}
                        </span>
                        <span className="font-bold text-gray-900">
                          ₹{item.asset?.price * item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-6 border-t border-gray-200/60">
                <div className="flex justify-between text-gray-600 text-sm">
                  <span>Subtotal</span>
                  <span className="font-semibold">₹{cart.totalPrice}</span>
                </div>
                <div className="flex justify-between text-gray-600 text-sm">
                  <span>Platform Fee</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-gray-200/60">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-purple-600 bg-purple-50 px-3 py-1 rounded-lg">
                    ₹{cart.totalPrice}
                  </span>
                </div>
              </div>

              <div className="mt-6 bg-blue-50/50 border border-blue-100 p-4 rounded-xl flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <p className="text-xs text-blue-700 leading-relaxed font-medium">
                  You'll get instant access to your assets immediately after
                  payment confirmation.
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
