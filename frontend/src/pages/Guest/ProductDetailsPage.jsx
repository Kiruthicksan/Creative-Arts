import { useParams } from "react-router-dom";

import { useEffect, useState } from "react";

import ProductDetailsSection from "../../components/Guest/ProductDetailsSection";
import ProductDescriptionAndReviews from "../../components/Guest/ProductDescriptionAndReviews";
import useAssetsStore from "../../store/useAssetsStore";
import { Loader } from "lucide-react";

const ProductDetailsPage = () => {
  const { id } = useParams();

  const { asset, getAssetsById, loading } = useAssetsStore();

  useEffect(() => {
    getAssetsById(id);
  }, [id]);

  const [activeTab, setActiveTab] = useState("description");

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Loader className="animate-spin text-purple-600 w-10 h-10" />
      </div>
    );
  }
  if (!asset) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-xl text-gray-500 font-medium">Product not found</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-50 font-sans selection:bg-purple-100 selection:text-purple-900">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-white to-transparent"></div>
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-purple-300/30 rounded-full blur-3xl animate-pulse"></div>
      <div
        className="absolute top-1/4 -left-40 w-[500px] h-[500px] bg-indigo-300/30 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 lg:px-8 space-y-16">
        <ProductDetailsSection product={asset} />
        <ProductDescriptionAndReviews
          product={asset}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>
    </div>
  );
};

export default ProductDetailsPage;
