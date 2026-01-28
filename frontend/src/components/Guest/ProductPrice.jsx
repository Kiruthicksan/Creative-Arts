import React from "react";

const ProductPrice = ({ product }) => {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-gray-500 text-sm">Price</span>
      <div className="flex items-baseline gap-3">
        <span className="text-4xl font-bold text-gray-900">
          ₹{product.price}
        </span>
        {product.originalPrice && (
          <span className="text-xl text-gray-400 line-through">
            ₹{product.originalPrice}
          </span>
        )}
      </div>
    </div>
  );
};

export default ProductPrice;
