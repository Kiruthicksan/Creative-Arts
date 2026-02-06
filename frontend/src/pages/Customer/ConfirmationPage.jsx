import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight, Download, Home, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import useCartStore from "../../store/useCartStore";
import confetti from "canvas-confetti";

const ConfirmationPage = () => {
  const { cart } = useCartStore();

  useEffect(() => {
    // Fire confetti on mount
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
        origin: { x: random(0.1, 0.3), y: random(0.5, 0.6) }, // Vary origin
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: random(0.7, 0.9), y: random(0.5, 0.6) }, // Vary origin
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100"
        >
          {/* Header Section with Color Band */}
          <div className="bg-purple-600 h-32 relative flex justify-center items-end pb-12">
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
              className="w-24 h-24 bg-white rounded-full p-2 mx-auto -mt-12 mb-6 shadow-lg shadow-purple-200 relative z-10"
            >
              <div className="w-full h-full bg-green-500 rounded-full flex items-center justify-center">
                <Check className="w-12 h-12 text-white stroke-[3px]" />
              </div>
            </motion.div>

            <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">
              Payment Successful!
            </h1>
            <p className="text-gray-500 mb-8">
              Thank you for your purchase. Your order has been confirmed.
            </p>

            {/* Order Details Card */}
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 mb-8 text-left">
              <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200">
                <span className="text-gray-500 text-sm">Order ID</span>
                <span className="font-mono font-medium text-gray-900">
                  #ORD-{Math.floor(Math.random() * 100000)}
                </span>
              </div>

              <div className="space-y-4 mb-4">
                {cart.items.slice(0, 3).map((item) => (
                  <div
                    key={item._id}
                    className="flex justify-between items-center"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white rounded-lg border border-gray-200 overflow-hidden shrink-0">
                        <img
                          src={item.asset?.previewImages?.[0]?.secure_url}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-900 line-clamp-1">
                          {item.asset.title}
                        </span>
                        <span className="text-xs text-gray-500">
                          Digital Download
                        </span>
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">
                      ₹{item.asset.price}
                    </span>
                  </div>
                ))}
                {cart.items.length > 3 && (
                  <p className="text-xs text-center text-gray-500 italic pt-2">
                    + {cart.items.length - 3} more items
                  </p>
                )}
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <span className="font-bold text-gray-900">Total Paid</span>
                <span className="text-xl font-bold text-purple-600">
                  ₹
                  {cart.items.reduce(
                    (sum, item) => sum + (item.asset?.price || 0),
                    0,
                  )}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/customer-dashboard"
                className="inline-flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-lg shadow-purple-200 active:scale-95"
              >
                <Download className="w-5 h-5" />
                Go to Downloads
              </Link>

              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 bg-white border border-gray-200 hover:border-purple-200 hover:bg-purple-50 text-gray-700 hover:text-purple-700 px-8 py-3.5 rounded-xl font-bold transition-all active:scale-95"
              >
                <Home className="w-5 h-5" />
                Back to Home
              </Link>
            </div>
          </div>

          <div className="bg-gray-50 p-4 border-t border-gray-100 flex items-center justify-center gap-2 text-sm text-gray-500">
            <FileText className="w-4 h-4" />
            <span>A receipt has been sent to your email address.</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ConfirmationPage;
