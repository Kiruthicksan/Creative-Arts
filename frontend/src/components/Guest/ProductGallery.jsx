import { useState } from "react"


const ProductGallery = ({product}) => {
  const [activeImage, setActiveImage] = useState(product.image?.[0]?.secure_url)
  return (
    <div className="w-full lg:w-1/2 flex flex-col gap-6">
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-sm group">
            <img
              src={activeImage}
              alt={product.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Badges */}
            <div className="absolute top-4 left-4">
              {product.featured && (
                <span className="bg-pink-500 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
                  Featured
                </span>
              )}
            </div>
            {product.discount > 0 && (
              <div className="absolute top-4 right-4">
                <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
                  -{product.discount}% OFF
                </span>
              </div>
            )}
          </div>

          {/* Thumbnails */}
          <div className="flex gap-4">
            <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-indigo-600 cursor-pointer p-0.5">
              <img
                src={product.image?.[0]?.secure_url}
                alt=""
                className="w-full h-full object-cover rounded-xl"
                onClick={() => setActiveImage(product.image?.[0]?.secure_url)}
              />
            </div>
            <div className="w-24 h-24 rounded-2xl overflow-hidden border border-transparent hover:border-gray-300 cursor-pointer opacity-70 hover:opacity-100 transition-all">
             <img
                src={product.image?.[1]?.secure_url}
                alt=""
                className="w-full h-full object-cover rounded-xl"
                onClick={() => setActiveImage(product.image?.[1]?.secure_url)}
              />
            </div>
            <div className="w-24 h-24 rounded-2xl overflow-hidden border border-transparent hover:border-gray-300 cursor-pointer opacity-70 hover:opacity-100 transition-all">
             <img
                src={product.image?.[2]?.secure_url}
                alt=""
                className="w-full h-full object-cover rounded-xl"
                onClick={() => setActiveImage(product.image?.[2]?.secure_url)}
              />
            </div>
          </div>
        </div>
  )
}

export default ProductGallery