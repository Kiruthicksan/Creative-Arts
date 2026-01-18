import { motion } from "framer-motion";
import { Star,  ShoppingCart, Heart, Share2, CheckCircle } from "lucide-react";
import InfoGrid from "./InfoGrid";
import ProductTags from "./ProductTags";

const ProductHearder = ({product}) => {
  return (
    <div className="w-full lg:w-1/2 flex flex-col gap-8">
          {/* Header Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-100 ring-2 ring-gray-50 shadow-sm">
                <img
                  src={`https://ui-avatars.com/api/?name=${product.author}&background=random`}
                  alt={product.author}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-sm font-semibold text-gray-900">
                {product.author}
              </span>
              <span className="bg-purple-100 text-purple-700 text-xs font-medium px-2.5 py-0.5 rounded-full">
                ui kits
              </span>
            </div>

            <h1 className="text-5xl font-serif font-bold text-gray-900 leading-tight">
              {product.title}
            </h1>

            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill={
                      i < Math.floor(product.rating) ? "currentColor" : "none"
                    }
                    className={
                      i < Math.floor(product.rating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>
              <span className="font-bold text-gray-900">{product.rating}</span>
              <span className="text-gray-500">({product.reviews} reviews)</span>
              <span className="text-gray-300">•</span>
              <span className="text-gray-500 flex items-center gap-1">
                {product.downloads.toLocaleString()} downloads
              </span>
            </div>
          </div>

          <p className="text-gray-600 leading-relaxed text-lg">
            {product.description} A comprehensive set of tools and components
            designed to help you build faster and better. Includes all necessary
            files and documentation.
          </p>

          {/* Info Grid */}
         <InfoGrid product={product} />

          {/* Tags */}
         <ProductTags product={product} />

          <div className="w-full h-px bg-gray-100 my-2"></div>

          {/* Price & Cart */}
          <div className="flex flex-col gap-2">
            <span className="text-gray-500 text-sm">Price</span>
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-gray-900">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-gray-400 line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3.5 rounded-xl flex items-center justify-center gap-2 text-base font-semibold shadow-lg shadow-purple-200 transition-all"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.95 }}
                className="p-3.5 rounded-xl border border-gray-200 hover:border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <Heart className="w-5 h-5" />
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.95 }}
                className="p-3.5 rounded-xl border border-gray-200 hover:border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <Share2 className="w-5 h-5" />
              </motion.button>
            </div>

            <div className="flex items-center justify-between gap-4 py-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Instant download</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Lifetime access</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Free updates</span>
              </div>
            </div>
          </div>
        </div>
  )
}

export default ProductHearder