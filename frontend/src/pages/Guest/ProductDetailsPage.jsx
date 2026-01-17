import {
  ChevronLeft,
  Star,
  Download,
  FileText,
  Database,
  ShieldCheck,
  ShoppingCart,
  Heart,
  Share2,
  CheckCircle,
} from "lucide-react";
import { motion } from "framer-motion";

import { useParams } from "react-router-dom";
import { productsData } from "../../data/mockData";
import { useState } from "react";
import Footer from "../../components/public/Footer";

const ProductDetailsPage = () => {
  const { id } = useParams();

  const product = productsData.find((product) => product.id === parseInt(id));

  const [activeTab, setActiveTab] = useState("description");

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl text-gray-500">Product not found</p>
      </div>
    );
  }

  return (
    <div className=" max-w-7xl mx-auto  p-8 space-y-14">
      <div className="flex flex-col gap-8 font-sans">
        {/* Back Button */}
        <div>
          <button
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
            onClick={() => window.history.back()}
          >
            <ChevronLeft size={18} /> Back to Browse
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Column - Images */}
          <div className="w-full lg:w-1/2 flex flex-col gap-6">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-sm group">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Badges */}
              <div className="absolute top-4 left-4">
                {product.featured && (
                  <span className="bg-pink-500 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
                    Featured
                  </span>
                )}
              </div>
              {product.discount > 0 && (
                <div className="absolute top-4 right-4">
                  <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
                    -{product.discount}% OFF
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnails */}
            <div className="flex gap-4">
              <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-indigo-600 cursor-pointer p-0.5">
                <img
                  src={product.image}
                  alt=""
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <div className="w-24 h-24 rounded-2xl overflow-hidden border border-transparent hover:border-gray-300 cursor-pointer opacity-70 hover:opacity-100 transition-all">
                <div className="w-full h-full bg-slate-900 flex items-center justify-center">
                  <span className="text-xs text-gray-500 font-mono">CODE</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Product Details */}
          <div className="w-full lg:w-1/2 flex flex-col gap-8">
            {/* Header Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-100 ring-2 ring-gray-50 shadow-sm">
                  <img
                    src={`https://ui-avatars.com/api/?name=${product.author}&background=random`}
                    alt={product.author}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-sm font-semibold text-gray-900">
                  {product.author}
                </span>
                <span className="bg-purple-100 text-purple-700 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  ui kits
                </span>
              </div>

              <h1 className="text-5xl font-serif font-bold text-gray-900 leading-tight">
                {product.title}
              </h1>

              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1 text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      fill={
                        i < Math.floor(product.rating) ? "currentColor" : "none"
                      }
                      className={
                        i < Math.floor(product.rating)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>
                <span className="font-bold text-gray-900">
                  {product.rating}
                </span>
                <span className="text-gray-500">
                  ({product.reviews} reviews)
                </span>
                <span className="text-gray-300">•</span>
                <span className="text-gray-500 flex items-center gap-1">
                  {product.downloads.toLocaleString()} downloads
                </span>
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed text-lg">
              {product.description} A comprehensive set of tools and components
              designed to help you build faster and better. Includes all
              necessary files and documentation.
            </p>

            {/* Info Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <InfoCard
                icon={<FileText size={20} className="text-purple-500" />}
                label="Format"
                value="ZIP (Figma, React)"
              />
              <InfoCard
                icon={<Database size={20} className="text-purple-500" />}
                label="Size"
                value="245 MB"
              />
              <InfoCard
                icon={<Download size={20} className="text-purple-500" />}
                label="Downloads"
                value={product.downloads.toLocaleString()}
              />
              <InfoCard
                icon={<ShieldCheck size={20} className="text-purple-500" />}
                label="License"
                value="Commercial"
              />
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {["ui-kit", "figma", "react", "dashboard", "saas"].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-lg bg-gray-50 text-gray-600 text-xs font-medium hover:bg-gray-100 transition-colors cursor-pointer border border-gray-100"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="w-full h-px bg-gray-100 my-2"></div>

            {/* Price & Cart */}
            <div className="flex flex-col gap-2">
              <span className="text-gray-500 text-sm">Price</span>
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-gray-900">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-400 line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3.5 rounded-xl flex items-center justify-center gap-2 text-base font-semibold shadow-lg shadow-purple-200 transition-all"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="p-3.5 rounded-xl border border-gray-200 hover:border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Heart className="w-5 h-5" />
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="p-3.5 rounded-xl border border-gray-200 hover:border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Share2 className="w-5 h-5" />
                </motion.button>
              </div>

              <div className="flex items-center justify-between gap-4 py-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Instant download</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Lifetime access</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Free updates</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-16">
        <div className="flex items-center gap-8 border-b border-gray-200 mb-8">
          <button
            className={`pb-4 text-sm font-semibold transition-colors relative ${
              activeTab === "description"
                ? "text-purple-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("description")}
          >
            Description
            {activeTab === "description" && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600"
              />
            )}
          </button>
          <button
            className={`pb-4 text-sm font-semibold transition-colors relative ${
              activeTab === "reviews"
                ? "text-purple-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("reviews")}
          >
            Reviews ({product.reviews})
            {activeTab === "reviews" && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600"
              />
            )}
          </button>
        </div>

        <div className="min-h-[200px]">
          {activeTab === "description" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-8 text-gray-600 max-w-4xl"
            >
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">
                  About This Product
                </h3>
                <p className="leading-relaxed">
                  {product.description} An immersive cyberpunk story set in
                  Neo-Tokyo 2089. Follow detective Kai through neon-lit streets
                  in this gripping 180-page novella. Available in PDF and EPUB
                  formats.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">
                  What's Included
                </h3>
                <ul className="space-y-2 list-none">
                  <li className="flex items-center gap-2">
                    High-resolution files in multiple formats (PDF, EPUB)
                  </li>
                  <li className="flex items-center gap-2">
                    Complete documentation and usage guide
                  </li>
                  <li className="flex items-center gap-2">
                    Commercial license for unlimited projects
                  </li>
                  <li className="flex items-center gap-2">
                    Free lifetime updates
                  </li>
                  <li className="flex items-center gap-2">
                    24/7 customer support
                  </li>
                </ul>
              </div>
            </motion.div>
          )}

          {activeTab === "reviews" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center justify-center py-12 text-center"
            >
              <p className="text-gray-500">
                No reviews yet. Be the first to review this product!
              </p>
            </motion.div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

const InfoCard = ({ icon, label, value }) => (
  <div className="flex flex-col gap-2 p-4 bg-gray-50 rounded-2xl border border-gray-100/50">
    <div className="p-2 bg-white rounded-lg w-fit shadow-sm">{icon}</div>
    <div className="flex flex-col">
      <span className="text-xs text-gray-500 font-medium">{label}</span>
      <span className="text-sm font-semibold text-gray-900 leading-tight">
        {value}
      </span>
    </div>
  </div>
);

export default ProductDetailsPage;
