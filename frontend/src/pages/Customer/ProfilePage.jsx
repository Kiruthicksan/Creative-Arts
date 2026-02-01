import React, { useEffect } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Calendar,
  Edit,
  LogOut,
  Package,
  Heart,
  MapPin,
  Shield,
  Settings,
  CreditCard,
} from "lucide-react";
import useAuthStore from "../../store/useAuthStore";

// Helper to format dates
const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
};

const ProfilePage = () => {
  const { user, logout } = useAuthStore();

  // Loading state handling could be improved, but relying on auth guard for now
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center text-gray-900">
        <div className="animate-pulse">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 pb-12 pt-8 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-6 md:p-10 border border-gray-100 shadow-xl shadow-purple-900/5 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50 pointer-events-none"></div>

          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-purple-50 text-purple-700 text-xs font-medium rounded-full border border-purple-100 flex items-center gap-1.5">
                  <User size={12} /> Member
                </span>
                {user.role === "admin" && (
                  <span className="px-3 py-1 bg-amber-50 text-amber-700 text-xs font-medium rounded-full border border-amber-100 flex items-center gap-1">
                    <Shield size={10} /> Admin
                  </span>
                )}
              </div>

              <div>
                <h1 className="text-3xl md:text-4xl font-bold font-serif text-gray-900 tracking-tight">
                  {user.userName || "Guest User"}
                </h1>
                <p className="text-gray-500 text-base md:text-lg flex items-center gap-2 mt-1">
                  <Mail size={16} className="text-purple-500" /> {user.email}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 w-full md:w-auto">
              <button className="flex-1 md:flex-none px-6 py-2.5 bg-white text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 shadow-sm border border-gray-200 active:scale-95 cursor-pointer group">
                <Edit
                  size={18}
                  className="text-gray-400 group-hover:text-purple-600 transition-colors"
                />
                <span>Edit Profile</span>
              </button>
              <button
                onClick={logout}
                className="flex-1 md:flex-none px-6 py-2.5 bg-red-50 text-red-600 rounded-xl font-medium hover:bg-red-100 transition-colors border border-red-100 flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
              >
                <LogOut size={18} /> <span>Logout</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column: Personal Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h3 className="text-lg font-semibold mb-6 text-gray-900 font-serif border-b border-gray-100 pb-4">
                Personal Details
              </h3>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-purple-50 rounded-lg text-purple-600">
                    <Calendar size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Joined Date</p>
                    <p className="text-gray-900 font-medium">
                      {formatDate(user.createdAt)}
                    </p>
                  </div>
                </div>
                {/* <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-pink-50 rounded-lg text-pink-600">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="text-gray-900 font-medium">
                      {user.location || "Not set"}
                    </p>
                  </div>
                </div> */}
                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-emerald-50 rounded-lg text-emerald-600">
                    <User size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="text-gray-900 font-medium">
                      {user.fullName || user.userName || "Not provided"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-2xl p-1 border border-gray-100 shadow-sm overflow-hidden">
              <button className="w-full text-left px-5 py-4 hover:bg-gray-50 transition-colors flex items-center justify-between group cursor-pointer">
                <span className="flex items-center gap-3 text-gray-700">
                  <Settings
                    size={18}
                    className="text-gray-400 group-hover:text-purple-600"
                  />{" "}
                  Account Settings
                </span>
                <span className="text-gray-400 group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </button>
              <div className="h-[1px] bg-gray-100 mx-5" />
              <button className="w-full text-left px-5 py-4 hover:bg-gray-50 transition-colors flex items-center justify-between group cursor-pointer">
                <span className="flex items-center gap-3 text-gray-700">
                  <CreditCard
                    size={18}
                    className="text-gray-400 group-hover:text-purple-600"
                  />{" "}
                  Payment Methods
                </span>
                <span className="text-gray-400 group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </button>
            </div>
          </motion.div>

          {/* Right Column: Dashboard & Activity */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="md:col-span-2 space-y-6"
          >
            {/* Stats Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                {
                  label: "Total Orders",
                  value: user.ordersCount || "0",
                  icon: Package,
                  color: "text-blue-600",
                  bg: "bg-blue-50",
                },
                {
                  label: "Wishlist",
                  value: user.wishlistCount || "0",
                  icon: Heart,
                  color: "text-rose-600",
                  bg: "bg-rose-50",
                },
                {
                  label: "Reviews",
                  value: user.reviewsCount || "0",
                  icon: Edit,
                  color: "text-amber-600",
                  bg: "bg-amber-50",
                },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-white p-5 rounded-2xl border border-gray-100 hover:border-purple-100 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/5 group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`p-2 rounded-lg ${stat.bg} ${stat.color} transition-transform group-hover:scale-110`}
                    >
                      <stat.icon size={20} />
                    </div>
                    <span className="text-xs text-gray-400 font-mono tracking-wider">
                      LIFETIME
                    </span>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1 group-hover:translate-x-1 transition-transform">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Recent Activity / Content Placeholder */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <h3 className="text-lg font-semibold font-serif text-gray-900">
                  Recent Orders
                </h3>
                <button className="text-sm font-medium text-purple-600 hover:text-purple-700 transition-colors cursor-pointer">
                  View All History
                </button>
              </div>

              <div className="min-h-[300px] flex flex-col items-center justify-center p-8 text-gray-500 space-y-4">
                <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-2">
                  <Package size={32} className="opacity-40" />
                </div>
                <div className="text-center">
                  <p className="text-gray-900 font-medium">No orders yet</p>
                  <p className="text-sm mt-1 max-w-xs mx-auto">
                    When you place an order, it will appear here for you to
                    track and review.
                  </p>
                </div>
                <button className="mt-4 px-6 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-full text-sm font-medium transition-colors border border-transparent shadow-lg shadow-gray-200 cursor-pointer">
                  Start Browsing
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
