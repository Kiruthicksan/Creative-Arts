import mongoose from "mongoose";

const AssetsSchema = new mongoose.Schema(
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
    included: {
      type: String,
      required: true,
    },
    previewImages: [
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
    downloadFile: {
      public_id: String,
      secure_url: String,
      format: String,
      size: Number,
      version: {
        type: String,
        default: "v1.0",
      },
    },

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

export const Assets = mongoose.model("Assets", AssetsSchema);
