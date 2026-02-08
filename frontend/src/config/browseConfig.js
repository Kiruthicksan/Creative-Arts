export const categories = [
  "All",
  "Cozy",
  "Sci-fi",
  "Fantasy",
  "Horror",
 
];

export const sortOptions = [
  "Newest",
  "Popular",
  "Price: Low to High",
  "Price: High to Low",
];

export const filterOptions = [
  {
    id: "price",
    title: "Price Range",
    options: [
      { label: "Under ₹500", value: "under-500" },
      { label: "₹500 - ₹1000", value: "500-1000" },
      { label: "₹1000 - ₹2000", value: "1000-2000" },
      { label: "₹2000+", value: "2000-plus" },
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

export const DEFAULT_FILTERS = {
  price: [],
  format: [],
  rating: [],
};
