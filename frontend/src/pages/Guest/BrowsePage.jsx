import React, { useState } from "react";
import {
  Search,
  Filter,
  SlidersHorizontal,
  ChevronDown,
  Check,
} from "lucide-react";
import ProductCard from "../../components/Guest/ProductCard";
import { productsData } from "../../data/mockData";

const BrowsePage = () => {
  // Dumb UI state for visual feedback only
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");

  const categories = [
    "All",
    "Illustrations",
    "UI Kits",
    "3D Assets",
    "Fonts",
    "Templates",
    "Icons",
  ];
  const sortOptions = [
    "Newest",
    "Popular",
    "Price: Low to High",
    "Price: High to Low",
  ];

  // Filters Sidebar Data (Static UI)
  const filters = [
    {
      title: "Price Range",
      options: ["Under ₹30", "₹30 - ₹50", "₹50 - ₹100", "₹100+"],
    },
    {
      title: "File Format",
      options: ["FIG", "PSD", "AI", "PNG/JPG", "blend"],
    },
    {
      title: "Rating",
      options: ["4 Stars & Up", "3 Stars & Up", "2 Stars & Up"],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Browse Collection
          </h1>
          <p className="text-gray-500 max-w-2xl">
            Explore thousands of premium handcrafted assets from top creators
            around the world.
          </p>

          {/* Search & Main Controls */}
          <div className="mt-8 flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search 'Abstract 3D' or 'Minimalist Logo'..."
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all"
              />
            </div>
          </div>

          {/* Category Scroll Container */}
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
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 flex flex-col lg:flex-row gap-10">
        {/* Sidebar Filters - Desktop */}
        <div className="hidden lg:block w-64 space-y-8 shrink-0">
          <div className="flex items-center gap-2 font-bold text-gray-900 pb-4 border-b border-gray-100">
            <SlidersHorizontal size={18} /> Filters
          </div>

          {filters.map((section, idx) => (
            <div key={idx}>
              <h3 className="font-semibold text-gray-900 mb-3 text-sm">
                {section.title}
              </h3>
              <div className="space-y-2">
                {section.options.map((opt, i) => (
                  <label
                    key={i}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <div className="w-5 h-5 rounded border border-gray-300 flex items-center justify-center group-hover:border-purple-500 transition-colors bg-white">
                      {/* Dummy check state */}
                      {i === 0 && idx === 0 && (
                        <Check size={12} className="text-purple-600" />
                      )}
                    </div>
                    <span className="text-gray-600 text-sm group-hover:text-gray-900 transition-colors">
                      {opt}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          {/* Sort & Results Bar */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-gray-500 text-sm font-medium">
              Showing 124 results
            </span>

            <div className="relative group">
              <button className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-purple-600 transition-colors">
                {sortBy} <ChevronDown size={14} />
              </button>
              {/* Dropdown (Visual only) */}
              <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 py-2">
                {sortOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setSortBy(opt)}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-purple-600"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Repeat specific products multiple times to fill the grid for demo */}
            {[...productsData, ...productsData].map((product, idx) => (
              <ProductCard key={idx} {...product} />
            ))}
          </div>

          {/* Load More */}
          <div className="mt-12 flex justify-center">
            <button className="px-8 py-3 rounded-full border border-gray-200 text-gray-600 font-semibold hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900 transition-all">
              Load More Assets
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowsePage;
