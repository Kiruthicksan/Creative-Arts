import React from "react";

const BrowseHeaderCategoryTab = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <div className="flex items-center gap-2 mt-6 overflow-x-auto pb-2 scrollbar-hide">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setSelectedCategory(cat)}
          className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors border ${
            selectedCategory === cat
              ? "bg-gray-900 text-white border-gray-900"
              : "bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default BrowseHeaderCategoryTab;
