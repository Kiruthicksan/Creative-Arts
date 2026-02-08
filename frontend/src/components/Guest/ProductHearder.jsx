import { Star } from "lucide-react";
import InfoGrid from "./InfoGrid";
import ProductTags from "./ProductTags";
import ProductPrice from "./ProductPrice";
import PurchasePanel from "./PurchasePanel";
import { motion } from "framer-motion";

const ProductHearder = ({ product }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="w-full lg:w-1/2 flex flex-col gap-8"
    >
      {/* Header Info */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-purple-100 shadow-sm">
            <img
              src={`https://ui-avatars.com/api/?name=${product.author}&background=random`}
              alt={product.author}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">
              Created by
            </span>
            <span className="text-sm font-bold text-gray-900">
              {product.author}
            </span>
          </div>
          <span className="ml-auto bg-purple-50 text-purple-700 text-xs font-bold px-3 py-1 rounded-full border border-purple-100 uppercase tracking-wide">
            ui kits
          </span>
        </div>

        <h1 className="text-4xl lg:text-5xl font-serif font-bold leading-tight">
          <span className="bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 bg-clip-text text-transparent">
            {product.title}
          </span>
        </h1>

        <div className="flex flex-wrap items-center gap-6 text-sm">
          <div className="flex items-center gap-2 bg-yellow-50 px-3 py-1.5 rounded-lg border border-yellow-100">
            <div className="flex text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  fill={
                    i < Math.floor(product.rating) ? "currentColor" : "none"
                  }
                  className={
                    i < Math.floor(product.rating)
                      ? "text-yellow-500"
                      : "text-gray-300"
                  }
                />
              ))}
            </div>
            <span className="font-bold text-gray-900">{product.rating}</span>
            <span className="text-gray-500">({product.reviews} reviews)</span>
          </div>

          <div className="h-4 w-px bg-gray-200"></div>

          <span className="text-gray-600 flex items-center gap-1.5 font-medium">
            <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            {product.downloads.toLocaleString()} active downloads
          </span>
        </div>
      </div>

      <p className="text-gray-600 leading-relaxed text-lg border-l-4 border-purple-200 pl-4 italic">
        {product.description}
      </p>

      {/* Info Grid */}
      {/* <InfoGrid product={product} /> */}

      {/* Tags */}
      <ProductTags product={product} />

      <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-2"></div>

      {/* Price & Cart */}
      <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 border border-white shadow-xl shadow-purple-900/5">
        <ProductPrice product={product} />
        <div className="mt-6">
          <PurchasePanel product={product} />
        </div>
      </div>
    </motion.div>
  );
};

export default ProductHearder;
