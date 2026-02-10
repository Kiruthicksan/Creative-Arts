import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  User,
  Calendar,
  Package,
  ArrowRight,
  Sparkles,
  Clock,
} from "lucide-react";
import useAuthStore from "../../store/useAuthStore";
import ProfileHeader from "../../components/Customer/ProfilePage/ProfileHeader";
import ProfileLeftSidebar from "../../components/Customer/ProfilePage/ProfileLeftSidebar";

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
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
          <div className="text-gray-400 font-medium">Loading profile...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FC] text-gray-900 pb-20 pt-8 font-sans relative overflow-hidden selection:bg-purple-100 selection:text-purple-900">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]"></div>
      <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-white via-white/60 to-transparent"></div>

      {/* Animated Blobs */}
      <div className="absolute top-20 right-[5%] w-[600px] h-[600px] bg-purple-200/30 rounded-full blur-[100px] animate-pulse mix-blend-multiply"></div>
      <div
        className="absolute top-40 left-[5%] w-[500px] h-[500px] bg-blue-200/30 rounded-full blur-[100px] animate-pulse mix-blend-multiply"
        style={{ animationDelay: "2s" }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">
        {/* Header Section */}
        <ProfileHeader user={user} logout={logout} />

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Sidebar Details */}
          <ProfileLeftSidebar user={user} formatDate={formatDate} />

          {/* Right Column: Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-8"
          >
            <div className="bg-white/70 backdrop-blur-xl rounded-3xl border border-white shadow-xl shadow-purple-900/5 min-h-[500px] flex flex-col">
              <div className="p-8 border-b border-gray-100/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h3 className="text-2xl font-bold font-serif text-gray-900 flex items-center gap-3">
                  <span className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                    <Clock size={24} />
                  </span>
                  Recent Orders
                </h3>
                <button className="text-sm font-bold text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-5 py-2.5 rounded-xl transition-all">
                  View Full History
                </button>
              </div>

              <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
                <div className="w-24 h-24 rounded-3xl bg-gray-50 border border-gray-100 flex items-center justify-center mb-6 relative group">
                  <div className="absolute inset-0 bg-purple-100 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <Package
                    size={40}
                    className="text-gray-300 relative z-10 group-hover:text-purple-500 transition-colors duration-300"
                  />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">
                  No orders yet
                </h4>
                <p className="text-gray-500 max-w-sm mx-auto mb-8 leading-relaxed">
                  Start your creative journey! Purchase a digital asset to see
                  your order history here.
                </p>
                <Link
                  to="/"
                  className="px-8 py-4 bg-gray-900 hover:bg-black text-white rounded-2xl font-bold transition-all shadow-xl shadow-gray-900/10 hover:-translate-y-1 hover:shadow-gray-900/20 flex items-center gap-2"
                >
                  Explore Collections
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
