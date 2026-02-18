import React, { useEffect } from "react";
import useWishlistStore from "../../store/useWishlistStore";
import ProductGrid from "../../components/Guest/BrowsePage/ProductGrid";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

const WishlistPage = () => {
  const { wishlist, fetchWishlist, loading } = useWishlistStore();

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8">
        {/* --- Header Section --- */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <Heart className="w-8 h-8 text-rose-500 fill-rose-500" />
              Your Wishlist
            </h1>
            <p className="text-gray-500 mt-1">
              Save your favorite assets for later.
            </p>
          </div>
        </div>

        {/* --- Wishlist Content --- */}
        {wishlist.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 bg-white/50 rounded-2xl border border-gray-200 border-dashed" >
            <Heart className="w-16 h-16 text-gray-300" />
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-gray-900">
                Your wishlist is empty
              </h3>
              <p className="text-gray-500 max-w-sm mx-auto">
                Seems like you haven't saved any assets yet. Browse our
                collection and find something amazing!
              </p>
            </div>
            <Link
              to="/browse"
              className="px-6 py-2.5 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors font-medium"
            >
              Browse Assets
            </Link>
          </div>
        ) : (
          <div className="bg-white/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-100">
            <ProductGrid products={wishlist} />
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
