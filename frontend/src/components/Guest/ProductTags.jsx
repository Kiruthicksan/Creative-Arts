import React from "react";

const ProductTags = ({ product }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {["ui-kit", "figma", "react", "dashboard", "saas"].map((tag) => (
        <span
          key={tag}
          className="px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-xs font-semibold hover:bg-indigo-100 transition-colors cursor-pointer border border-indigo-100 shadow-sm"
        >
          #{tag}
        </span>
      ))}
    </div>
  );
};

export default ProductTags;
