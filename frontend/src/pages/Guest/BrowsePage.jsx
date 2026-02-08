import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import BrowseHeader from "../../components/Guest/BrowsePage/BrowseHeader";
import {
  categories,
  DEFAULT_FILTERS,
  filterOptions,
  sortOptions,
} from "../../config/browseConfig";
import { useBrowseProducts } from "../../hooks/useBrowseProducts";
import FilterSidebar from "../../components/Guest/BrowsePage/FilterSidebar";
import SortDropDown from "../../components/Guest/BrowsePage/SortDropDown";
import ProductGrid from "../../components/Guest/BrowsePage/ProductGrid";
import EmptyState from "../../components/Guest/BrowsePage/EmptyState";
import LoadMoreButton from "../../components/Guest/BrowsePage/LoadMoreButton";
import useAssetsStore from "../../store/useAssetsStore";

const BrowsePage = ({ category }) => {
  // States to manage the options.

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(category || "All");
  const [sortBy, setSortBy] = useState("Newest");
  const [selectedFilters, setSelectedFilters] = useState(DEFAULT_FILTERS);
  const [visibleCount, setVisibleCount] = useState(6);

  // useEffect to set the category.
  useEffect(() => {
    if (category) {
      setSelectedCategory(category);
    } else {
      setSelectedCategory("All");
    }
  }, [category]);

  // Store.
  const { assets } = useAssetsStore();

  // Used custom hook to seprate logic to filter products.
  const { sortedProducts, displayedProducts } = useBrowseProducts({
    products: assets,
    searchQuery,
    selectedCategory,
    selectedFilters,
    sortBy,
    visibleCount,
  });

  // Function to toggle filters.
  const toggleFilter = (sectionId, value) => {
    setSelectedFilters((prev) => {
      const section = prev[sectionId];
      const newSection = section.includes(value)
        ? section.filter((item) => item !== value)
        : [...section, value];

      return { ...prev, [sectionId]: newSection };
    });
  };

  // Function to clear all filters.
  const clearAll = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedFilters(DEFAULT_FILTERS);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-50 font-sans selection:bg-purple-100 selection:text-purple-900">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-white via-white/80 to-transparent"></div>
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-purple-300/20 rounded-full blur-3xl animate-pulse"></div>
      <div
        className="absolute top-60 -left-20 w-[400px] h-[400px] bg-indigo-300/20 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>

      <div className="relative z-10">
        {/* Header Section */}
        <BrowseHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        {/* Main Content Area */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 flex flex-col lg:flex-row gap-10">
          {/* Sidebar Filters - Desktop */}
          <FilterSidebar
            filterOptions={filterOptions}
            selectedFilters={selectedFilters}
            toggleFilter={toggleFilter}
          />

          {/* Product Grid */}
          <div className="flex-1">
            {/* Sort & Results Bar */}
            <div className="flex items-center justify-between mb-8 bg-white/60 backdrop-blur-md p-4 rounded-xl border border-white shadow-sm">
              <span className="text-gray-600 text-sm font-medium pl-2">
                Showing{" "}
                <span className="font-bold text-gray-900">
                  {sortedProducts.length}
                </span>{" "}
                results
              </span>

              <SortDropDown
                sortOptions={sortOptions}
                sortBy={sortBy}
                setSortBy={setSortBy}
              />
            </div>

            {/* Grid */}
            {displayedProducts.length > 0 ? (
              <ProductGrid products={displayedProducts} />
            ) : (
              <EmptyState handleClear={clearAll} />
            )}

            {/* Load More */}
            {displayedProducts.length < sortedProducts.length && (
              <LoadMoreButton setVisibleCount={setVisibleCount} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowsePage;
