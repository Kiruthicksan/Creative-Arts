import { useMemo } from "react";

export const useBrowseProducts = ({
  products,
  searchQuery,
  selectedCategory,
  selectedFilters,
  sortBy,
  visibleCount,
}) => {
  // Filter products based on search, category, price, and rating.
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Search
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const title = product.title?.toLowerCase() || "";
        const description = product.description?.toLowerCase() || "";
        if (!title.includes(query) && !description.includes(query)) {
          return false;
        }
      }

      // Category
      if (selectedCategory !== "All" && product.category !== selectedCategory) {
        return false;
      }

      // Price
      if (selectedFilters.price.length > 0) {
        const price = Number(product.price);
        const passesPrice = selectedFilters.price.some((range) => {
          if (range === "under-500") return price < 500;
          if (range === "500-1000") return price >= 500 && price <= 1000;
          if (range === "1000-2000") return price > 1000 && price <= 2000;
          if (range === "2000-plus") return price > 2000;
          return false;
        });
        if (!passesPrice) return false;
      }
        // Rating
      if (selectedFilters.rating.length > 0) {
        const passesRating = selectedFilters.rating.some((minRating) => {
          product.rating >= Number(minRating);
        });
        if (!passesRating) return false;
      }
      return true;
    });
  }, [products, selectedCategory, selectedFilters, searchQuery]);

// Sort products based on selected sort option.
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

// Display products based on visible count.
  const displayedProducts = sortedProducts.slice(0, visibleCount);

  return {
    filteredProducts,
    sortedProducts,
    displayedProducts,
  };
};
