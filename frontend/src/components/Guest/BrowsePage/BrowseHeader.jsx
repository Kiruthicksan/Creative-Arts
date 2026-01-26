import { Search } from "lucide-react";
import BrowseHeaderCategoryTab from "./BrowseHeaderCategoryTab";

const BrowseHeader = ({
  searchQuery,
  setSearchQuery,
  categories,
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
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
        <BrowseHeaderCategoryTab
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>
    </div>
  );
};

export default BrowseHeader;
