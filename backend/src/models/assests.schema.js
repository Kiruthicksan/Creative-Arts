import mongoose from "mongoose";

const AssestsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      enum: [
        "Illustrations",
        "Posters",
        "Graphic Design",
        "Short Novels",
        "ConceptArt",
        "Other",
      ],
    },
    included : {
      type : String,
      required : true
    },
    image: [
      {
        public_id: {
          type: String,
          required: true,
        },
        secure_url: {
          type: String,
          required: true,
        },
      },
    ],
    price: {
      type: Number,
      required: true,
    },
    originalPrice: {
      type: Number,
    },
    discount: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    downloads: {
      type: Number,
      default: 0,
    },
    author: {
      type: String,
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export const Assests = mongoose.model("Assests", AssestsSchema);
