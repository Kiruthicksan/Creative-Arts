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
import ProductDetailsSection from "../../components/Guest/ProductDetailsSection";

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
      <ProductDetailsSection product={product} />
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



export default ProductDetailsPage;
