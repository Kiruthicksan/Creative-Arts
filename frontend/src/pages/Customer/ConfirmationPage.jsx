import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check, Download, Home, FileText, Loader } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import useCartStore from "../../store/useCartStore";
import confetti from "canvas-confetti";

const ConfirmationPage = () => {
  const { cart } = useCartStore();
  const location = useLocation();
  const orderData = location.state || cart;
  const displayItems = orderData.items || [];
  const displayTotal = orderData.totalPrice || 0;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate payment confirmation delay
    const timer = setTimeout(() => {
      setLoading(false);
      triggerConfetti();
    }, 2000); // 2-second loading state

    return () => clearTimeout(timer);
  }, []);

  const triggerConfetti = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const random = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: random(0.1, 0.3), y: random(0.5, 0.6) },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: random(0.7, 0.9), y: random(0.5, 0.6) },
      });
    }, 250);
  };

  // --- Loading State Render ---
  if (loading) {
    return (
      <div className="fixed inset-0 z-50 bg-gray-50 flex flex-col items-center justify-center ">
        <div className="max-w-sm w-full text-center space-y-6">
          {/* Animated Spinner & Check */}
          <div className="relative w-24 h-24 mx-auto">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="absolute inset-0 rounded-full border-4 border-purple-100 border-t-purple-600"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Check className="w-8 h-8 text-purple-600 opacity-20" />
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-bold text-gray-900 font-serif">
              Confirming your payment...
            </h2>
            <p className="text-gray-500 text-sm">
              Please wait while we secure your order.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // --- Success State Render ---
  return (
    <div className="fixed inset-0 z-50 bg-gray-50 overflow-y-auto w-full h-full flex items-center justify-center p-4 selection:bg-purple-100 selection:text-purple-900">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-white to-transparent"></div>
        <div className="absolute -left-20 top-20 w-72 h-72 bg-purple-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -right-20 bottom-20 w-72 h-72 bg-indigo-300/20 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl shadow-purple-900/10 overflow-hidden border border-white/50 relative z-10"
      >
        {/* Header Section */}
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 h-32 relative flex justify-center items-end pb-12">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        </div>

        <div className="px-8 pb-10 pt-0 text-center relative">
          {/* Floating Checkmark Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.2,
            }}
            className="w-24 h-24 bg-white rounded-full p-2 mx-auto -mt-12 mb-6 shadow-xl shadow-green-900/10 relative z-10"
          >
            <div className="w-full h-full bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center shadow-inner ring-4 ring-green-50">
              <Check className="w-12 h-12 text-white stroke-[3px]" />
            </div>
          </motion.div>

          <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">
            Payment Successful!
          </h1>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            Thank you for your purchase. Your order has been securely processed
            and is ready for download.
          </p>

          {/* Order Details Card */}
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 mb-8 text-left">
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200">
              <span className="text-gray-500 text-sm font-medium">
                Order ID
              </span>
              <span className="font-mono font-bold text-gray-900 tracking-wide">
                #ORD-{Math.floor(Math.random() * 100000)}
              </span>
            </div>

            <div className="space-y-4 mb-4 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
              {displayItems.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-4">
                  No items details found
                </p>
              ) : (
                displayItems.map((item) => (
                  <div
                    key={item._id || item.asset?._id}
                    className="flex justify-between items-center group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white rounded-lg border border-gray-200 overflow-hidden shrink-0">
                        <img
                          src={item.asset?.previewImages?.[0]?.secure_url}
                          alt=""
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-gray-900 line-clamp-1">
                          {item.asset?.title}
                        </span>
                        <span className="text-xs text-gray-400">
                          Digital Download
                        </span>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-gray-900">
                      ₹{item.asset?.price}
                    </span>
                  </div>
                ))
              )}
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
              <span className="font-bold text-gray-900">Total Paid</span>
              <span className="text-2xl font-bold text-green-600">
                ₹{displayTotal}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/library"
              className="inline-flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-gray-900/20 hover:-translate-y-0.5 active:translate-y-0"
            >
              <Download className="w-5 h-5" />
              Go to Downloads
            </Link>

            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 bg-white border border-gray-200 hover:border-purple-200 hover:bg-purple-50 text-gray-700 hover:text-purple-700 px-8 py-4 rounded-xl font-bold transition-all"
            >
              <Home className="w-5 h-5" />
              Return Home
            </Link>
          </div>
        </div>

        <div className="bg-gray-50 p-4 border-t border-gray-100 flex items-center justify-center gap-2 text-xs text-gray-500 font-medium">
          <FileText className="w-3 h-3" />
          <span>A receipt has been sent to your email address.</span>
        </div>
      </motion.div>
    </div>
  );
};

export default ConfirmationPage;
