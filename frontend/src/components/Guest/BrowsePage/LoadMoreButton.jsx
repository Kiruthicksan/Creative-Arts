const LoadMoreButton = ({ setVisibleCount }) => {
  return (
    <div className="mt-12 flex justify-center">
      <button
        onClick={() => setVisibleCount((prev) => prev + 6)}
        className="px-8 py-3 rounded-full border border-gray-200 text-gray-600 font-semibold hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900 transition-all"
      >
        Load More Assets
      </button>
    </div>
  );
};

export default LoadMoreButton;
