import React from "react";

const BrowseHeaderCategoryTab = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <div className="flex items-center gap-3 mt-8 overflow-x-auto pb-4 scrollbar-hide mask-linear-gradient">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setSelectedCategory(cat)}
          className={`px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300 shadow-sm ${
            selectedCategory === cat
              ? "bg-gray-900 text-white shadow-lg shadow-gray-900/20 transform scale-105"
              : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:bg-gray-50 hover:shadow"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default BrowseHeaderCategoryTab;
