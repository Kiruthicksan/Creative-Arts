import { useEffect, useState } from "react";
import useAssestsStore from "../../store/useAssestsStore";
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

const BrowsePage = ({ category }) => {
  // States to manage the options.
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(category || "All");

  useEffect(() => {
    if (category) {
      setSelectedCategory(category);
    }else{
      setSelectedCategory("All");
    }
  }, [category]);
  const [sortBy, setSortBy] = useState("Newest");
  const [selectedFilters, setSelectedFilters] = useState(DEFAULT_FILTERS);
  const [visibleCount, setVisibleCount] = useState(6);

  // Store.
  const { assests } = useAssestsStore();

  // Used custom hook to seprate logic to filter products.
  const { sortedProducts, displayedProducts } = useBrowseProducts({
    products: assests,
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
    <div className="min-h-screen bg-white">
      {/* Header Section */}

      <BrowseHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 flex flex-col lg:flex-row gap-10">
        {/* Sidebar Filters - Desktop */}
        <FilterSidebar
          filterOptions={filterOptions}
          selectedFilters={selectedFilters}
          toggleFilter={toggleFilter}
        />

        {/* Product Grid */}
        <div className="flex-1">
          {/* Sort & Results Bar */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-gray-500 text-sm font-medium">
              Showing {sortedProducts.length} results
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
  );
};

export default BrowsePage;
