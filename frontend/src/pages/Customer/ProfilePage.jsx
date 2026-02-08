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
    <div className="min-h-screen bg-gray-50 text-gray-900 pb-12 pt-8 font-sans relative overflow-hidden selection:bg-purple-100 selection:text-purple-900">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-white via-white/80 to-transparent"></div>
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-purple-300/20 rounded-full blur-3xl animate-pulse"></div>
      <div
        className="absolute top-60 -left-20 w-[400px] h-[400px] bg-indigo-300/20 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 md:p-10 border border-white shadow-xl shadow-purple-900/5 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50 pointer-events-none"></div>

          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-bold uppercase tracking-wider rounded-full border border-purple-200 flex items-center gap-1.5 shadow-sm">
                  <User size={12} className="stroke-[3]" /> Member
                </span>
                {user.role === "admin" && (
                  <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-bold uppercase tracking-wider rounded-full border border-amber-200 flex items-center gap-1 shadow-sm">
                    <Shield size={10} className="stroke-[3]" /> Admin
                  </span>
                )}
              </div>

              <div>
                <h1 className="text-4xl md:text-5xl font-bold font-serif text-gray-900 tracking-tight">
                  <span className="bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 bg-clip-text text-transparent">
                    {user.userName || "Guest User"}
                  </span>
                </h1>
                <p className="text-gray-500 text-base md:text-lg flex items-center gap-2 mt-2 font-medium">
                  <span className="p-1.5 bg-gray-100 rounded-full text-gray-600">
                    <Mail size={14} />
                  </span>{" "}
                  {user.email}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 w-full md:w-auto">
              <button className="flex-1 md:flex-none px-6 py-3 bg-white text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all flex items-center justify-center gap-2 shadow-sm border border-gray-200 hover:shadow-md active:scale-95 cursor-pointer group hover:-translate-y-0.5">
                <Edit
                  size={18}
                  className="text-gray-400 group-hover:text-purple-600 transition-colors"
                />
                <span>Edit Profile</span>
              </button>
              <button
                onClick={logout}
                className="flex-1 md:flex-none px-6 py-3 bg-red-50 text-red-600 rounded-xl font-semibold hover:bg-red-100 transition-all border border-red-100 flex items-center justify-center gap-2 active:scale-95 cursor-pointer hover:shadow-sm hover:border-red-200"
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
            <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 border border-white shadow-xl shadow-purple-900/5">
              <h3 className="text-lg font-bold mb-6 text-gray-900 font-serif border-b border-gray-200/50 pb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-purple-500 rounded-full"></span>
                Personal Details
              </h3>
              <div className="space-y-5">
                <div className="flex items-start gap-4 p-3 rounded-xl hover:bg-white/50 transition-colors">
                  <div className="p-3 bg-white rounded-xl text-purple-600 shadow-sm border border-purple-50">
                    <Calendar size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider font-bold">
                      Joined Date
                    </p>
                    <p className="text-gray-900 font-semibold mt-0.5">
                      {formatDate(user.createdAt)}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-3 rounded-xl hover:bg-white/50 transition-colors">
                  <div className="p-3 bg-white rounded-xl text-emerald-600 shadow-sm border border-emerald-50">
                    <User size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider font-bold">
                      Full Name
                    </p>
                    <p className="text-gray-900 font-semibold mt-0.5">
                      {user.fullName || user.userName || "Not provided"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-2 border border-white shadow-xl shadow-purple-900/5 overflow-hidden">
              <button className="w-full text-left px-4 py-4 hover:bg-white rounded-xl transition-all flex items-center justify-between group cursor-pointer">
                <span className="flex items-center gap-3 text-gray-700 font-medium">
                  <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-purple-50 group-hover:text-purple-600 transition-colors">
                    <Settings size={18} />
                  </div>
                  Account Settings
                </span>
                <span className="text-gray-300 group-hover:text-purple-500 group-hover:translate-x-1 transition-all">
                  →
                </span>
              </button>
              <div className="h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent mx-4" />
              <button className="w-full text-left px-4 py-4 hover:bg-white rounded-xl transition-all flex items-center justify-between group cursor-pointer">
                <span className="flex items-center gap-3 text-gray-700 font-medium">
                  <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-purple-50 group-hover:text-purple-600 transition-colors">
                    <CreditCard size={18} />
                  </div>
                  Payment Methods
                </span>
                <span className="text-gray-300 group-hover:text-purple-500 group-hover:translate-x-1 transition-all">
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
                  bg: "bg-blue-50 border-blue-100",
                },
                {
                  label: "Wishlist",
                  value: user.wishlistCount || "0",
                  icon: Heart,
                  color: "text-rose-600",
                  bg: "bg-rose-50 border-rose-100",
                },
                {
                  label: "Reviews",
                  value: user.reviewsCount || "0",
                  icon: Edit,
                  color: "text-amber-600",
                  bg: "bg-amber-50 border-amber-100",
                },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-white shadow-lg shadow-purple-900/5 hover:-translate-y-1 transition-all duration-300 group cursor-default"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`p-3 rounded-xl ${stat.bg} ${stat.color} border shadow-sm transition-transform group-hover:scale-110`}
                    >
                      <stat.icon size={22} />
                    </div>
                  </div>
                  <div className="text-4xl font-bold text-gray-900 mb-1 group-hover:translate-x-1 transition-transform tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-500 font-medium uppercase tracking-wide">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Activity / Content Placeholder */}
            <div className="bg-white/60 backdrop-blur-xl rounded-2xl border border-white overflow-hidden shadow-xl shadow-purple-900/5">
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <h3 className="text-lg font-bold font-serif text-gray-900 flex items-center gap-2">
                  <span className="w-1 h-6 bg-purple-500 rounded-full"></span>
                  Recent Orders
                </h3>
                <button className="text-sm font-semibold text-purple-600 hover:text-purple-700 transition-colors cursor-pointer px-4 py-2 hover:bg-purple-50 rounded-lg">
                  View All History
                </button>
              </div>

              <div className="min-h-[300px] flex flex-col items-center justify-center p-8 text-gray-500 space-y-4">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 border border-white shadow-inner flex items-center justify-center mb-2">
                  <Package size={36} className="text-gray-300" />
                </div>
                <div className="text-center">
                  <p className="text-gray-900 font-bold text-lg">
                    No orders yet
                  </p>
                  <p className="text-base text-gray-500 mt-2 max-w-sm mx-auto leading-relaxed">
                    When you purchase a digital asset, it will appear here for
                    instant access to your files.
                  </p>
                </div>
                <button className="mt-6 px-8 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-gray-900/20 cursor-pointer hover:-translate-y-1 active:scale-95">
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
