import React, { useState, useMemo } from "react";
import {
  Search,
  Filter,
  SlidersHorizontal,
  ChevronDown,
  Check,
} from "lucide-react";
import ProductCard from "../../components/Guest/ProductCard";
import { productsData } from "../../data/mockData";
import useAssestsStore from "../../store/useAssestsStore";

const BrowsePage = () => {
  // State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");
  const [selectedFilters, setSelectedFilters] = useState({
    price: [],
    format: [],
    rating: [],
  });
  const [visibleCount, setVisibleCount] = useState(6);

  const {assests} = useAssestsStore()

  // Constants
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

  const filterOptions = [
    {
      id: "price",
      title: "Price Range",
      options: [
        { label: "Under ₹30", value: "under-30" },
        { label: "₹30 - ₹50", value: "30-50" },
        { label: "₹50 - ₹100", value: "50-100" },
        { label: "₹100+", value: "100-plus" },
      ],
    },
    {
      id: "format",
      title: "File Format",
      options: [
        { label: "FIG", value: "FIG" },
        { label: "PSD", value: "PSD" },
        { label: "AI", value: "AI" },
        { label: "PNG/JPG", value: "PNG" },
        { label: "blend", value: "blend" },
      ],
    },
    {
      id: "rating",
      title: "Rating",
      options: [
        { label: "4 Stars & Up", value: "4" },
        { label: "3 Stars & Up", value: "3" },
        { label: "2 Stars & Up", value: "2" },
      ],
    },
  ];

  // Handlers
  const toggleFilter = (sectionId, value) => {
    setSelectedFilters((prev) => {
      const section = prev[sectionId];
      const newSection = section.includes(value)
        ? section.filter((item) => item !== value)
        : [...section, value];
      return { ...prev, [sectionId]: newSection };
    });
  };

  // Derived State (Filtering Logic)
  const filteredProducts = useMemo(() => {
    return productsData.filter((product) => {
      // 1. Search Query
      if (
        searchQuery &&
        !product.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !product.description.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      // 2. Category
      if (selectedCategory !== "All" && product.category !== selectedCategory) {
        return false;
      }

      // 3. Price Filter
      if (selectedFilters.price.length > 0) {
        const passesPrice = selectedFilters.price.some((range) => {
          if (range === "under-30") return product.price < 30;
          if (range === "30-50")
            return product.price >= 30 && product.price <= 50;
          if (range === "50-100")
            return product.price > 50 && product.price <= 100;
          if (range === "100-plus") return product.price > 100;
          return false;
        });
        if (!passesPrice) return false;
      }

      // 4. Format Filter
      if (selectedFilters.format.length > 0) {
        if (!selectedFilters.format.includes(product.fileFormat)) return false;
      }

      // 5. Rating Filter
      if (selectedFilters.rating.length > 0) {
        const passesRating = selectedFilters.rating.some(
          (minRating) => product.rating >= Number(minRating),
        );
        if (!passesRating) return false;
      }

      return true;
    });
  }, [productsData, searchQuery, selectedCategory, selectedFilters]);

  // Derived State (Sorting Logic)
  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      switch (sortBy) {
        case "Newest":
          return b.id - a.id;
        case "Popular":
          return b.downloads - a.downloads;
        case "Price: Low to High":
          return a.price - b.price;
        case "Price: High to Low":
          return b.price - a.price;
        default:
          return 0;
      }
    });
  }, [filteredProducts, sortBy]);

  const displayedProducts = sortedProducts.slice(0, visibleCount);

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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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

          {filterOptions.map((section) => (
            <div key={section.id}>
              <h3 className="font-semibold text-gray-900 mb-3 text-sm">
                {section.title}
              </h3>
              <div className="space-y-2">
                {section.options.map((opt) => {
                  const isSelected = selectedFilters[section.id].includes(
                    opt.value,
                  );
                  return (
                    <label
                      key={opt.value}
                      className="flex items-center gap-3 cursor-pointer group select-none"
                    >
                      <div
                        className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                          isSelected
                            ? "bg-purple-600 border-purple-600"
                            : "bg-white border-gray-300 group-hover:border-purple-500"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          toggleFilter(section.id, opt.value);
                        }}
                      >
                        {isSelected && (
                          <Check size={12} className="text-white" />
                        )}
                      </div>
                      <span
                        className={`text-sm transition-colors ${isSelected ? "text-gray-900 font-medium" : "text-gray-600 group-hover:text-gray-900"}`}
                        onClick={() => toggleFilter(section.id, opt.value)}
                      >
                        {opt.label}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          {/* Sort & Results Bar */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-gray-500 text-sm font-medium">
              Showing {sortedProducts.length} results
            </span>

            <div className="relative group">
              <button className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-purple-600 transition-colors">
                {sortBy} <ChevronDown size={14} />
              </button>
              {/* Dropdown */}
              <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 py-2">
                {sortOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setSortBy(opt)}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 hover:text-purple-600 ${
                      sortBy === opt
                        ? "text-purple-600 font-medium"
                        : "text-gray-600"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Grid */}
          {displayedProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Search className="text-gray-400" size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-900">
                No products found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search or filters to find what you're looking
                for.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                  setSelectedFilters({ price: [], format: [], rating: [] });
                }}
                className="mt-6 text-purple-600 font-semibold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}

          {/* Load More */}
          {displayedProducts.length < sortedProducts.length && (
            <div className="mt-12 flex justify-center">
              <button
                onClick={() => setVisibleCount((prev) => prev + 6)}
                className="px-8 py-3 rounded-full border border-gray-200 text-gray-600 font-semibold hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900 transition-all"
              >
                Load More Assets
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrowsePage;
