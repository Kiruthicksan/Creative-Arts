import { Star } from "lucide-react";
import InfoGrid from "./InfoGrid";
import ProductTags from "./ProductTags";
import ProductPrice from "./ProductPrice";
import PurchasePanel from "./PurchasePanel";

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
          <ProductPrice product={product} />
        
          <PurchasePanel product={product} />
         
        </div>
  )
}

export default ProductHearder