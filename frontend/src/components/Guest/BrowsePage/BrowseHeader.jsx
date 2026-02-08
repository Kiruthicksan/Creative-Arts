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
    <div className="relative pt-8 pb-6">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center md:text-left mb-8">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4 tracking-tight">
            Browse{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
              Collection
            </span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl leading-relaxed">
            Explore thousands of premium handcrafted assets from top creators
            around the world.
          </p>
        </div>

        {/* Search & Main Controls */}
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="flex-1 relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl opacity-20 blur-lg group-hover:opacity-30 transition-opacity"></div>
            <div className="relative bg-white rounded-2xl shadow-xl shadow-purple-900/5 flex items-center p-2 border border-gray-100">
              <Search
                className="ml-4 text-gray-400 group-focus-within:text-purple-600 transition-colors"
                size={22}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search 'Abstract 3D' or 'Minimalist Logo'..."
                className="flex-1 px-4 py-3 bg-transparent border-none outline-none text-gray-900 placeholder-gray-400 font-medium"
              />
            </div>
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
