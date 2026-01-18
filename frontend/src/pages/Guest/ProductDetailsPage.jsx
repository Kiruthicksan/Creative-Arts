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
import ProductDescriptionAndReviews from "../../components/Guest/ProductDescriptionAndReviews";

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
      <ProductDescriptionAndReviews product={product} activeTab={activeTab} setActiveTab={setActiveTab} />
      <Footer />
    </div>
  );
};



export default ProductDetailsPage;
