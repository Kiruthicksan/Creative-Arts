export const categories = [
  "All",
  "Illustrations",
  "Posters",
  "Graphic Design",
  "Short Novels",
  "ConceptArt",
  "Other",
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
      { label: "Under ₹30", value: "under-30" },
      { label: "₹30 - ₹50", value: "30-50" },
      { label: "₹50 - ₹100", value: "50-100" },
      { label: "₹100+", value: "100-plus" },
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
