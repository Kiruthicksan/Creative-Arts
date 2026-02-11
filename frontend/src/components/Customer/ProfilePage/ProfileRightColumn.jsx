import { motion } from "framer-motion";
import {
  Package,
  Clock,
  ShoppingBag,
  Download,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { Link } from "react-router-dom";

const ProfileRightColumn = ({ recentPurchases, formatDate }) => {
  return (
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
            Recent Activity
          </h3>
          {recentPurchases.length > 0 && (
            <Link
              to="/library"
              className="group flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-5 py-2.5 rounded-xl transition-all"
            >
              View Full History
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          )}
        </div>

        <div className="flex-1 p-8">
          {recentPurchases.length > 0 ? (
            <div className="space-y-4">
              {recentPurchases.slice(0, 10).map((purchase, index) => (
                <motion.div
                  key={purchase.id || index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-white border border-gray-100 hover:border-purple-100 hover:shadow-lg hover:shadow-purple-900/5 transition-all duration-300"
                >
                  <div className="flex items-center gap-5">
                    <div className="h-14 w-14 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-purple-600 group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300 shadow-sm">
                      <ShoppingBag size={22} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 group-hover:text-purple-700 transition-colors text-lg">
                        {purchase.title}
                      </h4>
                      <div className="flex items-center gap-3 text-sm text-gray-500 font-medium mt-1">
                        <span className="flex items-center gap-1.5">
                          <Clock size={14} />
                          {formatDate(purchase.createdAt)}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                        <span className="text-green-600 bg-green-50 px-2.5 py-0.5 rounded-md text-xs font-bold uppercase tracking-wider">
                          Completed
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mt-4 sm:mt-0 pl-[76px] sm:pl-0">
                    <span className="font-bold text-gray-900 text-lg sm:text-base mr-4 hidden sm:block">
                      {purchase.price ? `₹${purchase.price}` : "Paid"}
                    </span>
                    <button
                      className="p-2.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all border border-transparent hover:border-indigo-100"
                      title="View Details"
                    >
                      <ExternalLink size={18} />
                    </button>
                    <button
                      className="p-2.5 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all border border-transparent hover:border-purple-100"
                      title="Download Invoice"
                    >
                      <Download size={18} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
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
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileRightColumn;
