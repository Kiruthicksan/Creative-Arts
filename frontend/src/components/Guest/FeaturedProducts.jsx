import React from "react";
import { Star } from "lucide-react";
import ProductCard from "./ProductCard";
const FeaturedProducts = () => {
  return (
    <div className="bg-gray-50">
      <div className="max-w-6xl mx-auto  mb-20 px-4 py-20">
        <p className="flex items-center gap-2 text-amber-600  mb-2 ">
          <Star className="w-5 h-5 text-amber-600 fill-amber-600 stroke-amber-600" />
          Editor's Choice
        </p>
        <h2 className="text-3xl font-bold mb-2 text-gray-900">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-10">
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
