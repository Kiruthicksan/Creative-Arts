import { useParams } from "react-router-dom";

import { useEffect, useState } from "react";

import ProductDetailsSection from "../../components/Guest/ProductDetailsSection";
import ProductDescriptionAndReviews from "../../components/Guest/ProductDescriptionAndReviews";
import useAssetsStore from "../../store/useAssetsStore";
import { Loader } from "lucide-react";

const ProductDetailsPage = () => {
  const { id } = useParams();

  const { asset, getAssetsById, loading } = useAssetsStore();
  console.log(asset);
  useEffect(() => {
    getAssetsById(id);
  }, [id]);

  const [activeTab, setActiveTab] = useState("description");

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="animate-spin text-purple-600 w-8 h-8" />
      </div>
    );
  }
  if (!asset) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl text-gray-500">Product not found</p>
      </div>
    );
  }

  return (
    <div className=" max-w-7xl mx-auto  p-8 space-y-14">
      <ProductDetailsSection product={asset} />
      <ProductDescriptionAndReviews
        product={asset}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </div>
  );
};

export default ProductDetailsPage;
