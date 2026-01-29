import { useParams } from "react-router-dom";

import { useState } from "react";

import ProductDetailsSection from "../../components/Guest/ProductDetailsSection";
import ProductDescriptionAndReviews from "../../components/Guest/ProductDescriptionAndReviews";
import useAssestsStore from "../../store/useAssetsStore";

const ProductDetailsPage = () => {
  const { id } = useParams();

  const { assests } = useAssestsStore();

  const product = assests.find((product) => product._id === id);

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
      <ProductDescriptionAndReviews
        product={product}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </div>
  );
};

export default ProductDetailsPage;
