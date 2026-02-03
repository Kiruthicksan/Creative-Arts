import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Download, Search, BookOpen, Calendar, ArrowRight } from "lucide-react";
import API from "../../services/api";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

const Library = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchLibrary = async () => {
      try {
        const { data } = await API.get("/orders/library");
        if (data.success) {
          setItems(data.items);
        }
      } catch (error) {
        console.error("Failed to fetch library:", error);
        toast.error("Could not load your library");
      } finally {
        setLoading(false);
      }
    };

    fetchLibrary();
  }, []);

  const filteredItems = items.filter((item) =>
    item.title?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">
              My Library
            </h1>
            <p className="text-gray-500">
              Accessed {items.length} premium digital assets
            </p>
          </div>

          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Search your library..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all shadow-sm"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200"
          >
            <div className="w-20 h-20 bg-purple-50 rounded-2xl flex items-center justify-center mx-auto mb-6 transform rotate-3">
              <BookOpen className="w-10 h-10 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Your library is empty
            </h2>
            <p className="text-gray-500 max-w-md mx-auto mb-8">
              You haven't purchased any digital assets yet. Explore our
              collection to find something amazing!
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-purple-200 hover:shadow-purple-300 transform hover:-translate-y-1"
            >
              Browse Collection
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredItems.map((item, index) => (
              <motion.div
                key={`${item._id}-${item.orderId}-${index}`} // Unique key for duplicates
                variants={itemVariants}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:border-purple-100 transition-all group duration-300"
              >
                {/* Image */}
                <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
                  <img
                    src={item.previewImages?.[0]?.secure_url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <button
                      onClick={() =>
                        window.open(item.downloadFile?.secure_url, "_blank")
                      }
                      className="w-full bg-white text-gray-900 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-purple-50 hover:text-purple-600 transition-colors shadow-lg"
                    >
                      <Download className="w-5 h-5" />
                      Download Now
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold px-2.5 py-1 bg-purple-50 text-purple-600 rounded-full uppercase tracking-wide">
                      {item.category}
                    </span>
                    <div
                      className="flex items-center gap-1 text-xs text-gray-400"
                      title={`Purchased on ${new Date(item.purchaseDate).toLocaleDateString()}`}
                    >
                      <Calendar className="w-3 h-3" />
                      {new Date(item.purchaseDate).toLocaleDateString(
                        undefined,
                        { month: "short", day: "numeric", year: "2-digit" },
                      )}
                    </div>
                  </div>

                  <h3 className="font-bold text-gray-900 mb-1 line-clamp-1 group-hover:text-purple-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4 line-clamp-1">
                    by {item.author}
                  </p>

                  <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                    <div className="text-xs text-gray-400">
                      Version {item.downloadFile?.version || "1.0"}
                    </div>
                    <div className="text-xs text-gray-400">
                      {(item.downloadFile?.size / (1024 * 1024)).toFixed(1)} MB
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Library;
