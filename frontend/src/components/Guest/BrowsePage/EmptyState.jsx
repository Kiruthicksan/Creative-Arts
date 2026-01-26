import { Search } from "lucide-react";

const EmptyState = ({ handleClear }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <Search className="text-gray-400" size={24} />
      </div>
      <h3 className="text-lg font-bold text-gray-900">No products found</h3>
      <p className="text-gray-500">
        Try adjusting your search or filters to find what you're looking for.
      </p>
      <button
        onClick={handleClear}
        className="mt-6 text-purple-600 font-semibold hover:underline"
      >
        Clear all filters
      </button>
    </div>
  );
};

export default EmptyState;
