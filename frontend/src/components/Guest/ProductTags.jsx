import React from 'react'

const ProductTags = ({product}) => {
  return (
    <div className="flex flex-wrap gap-2">
            {["ui-kit", "figma", "react", "dashboard", "saas"].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-lg bg-gray-50 text-gray-600 text-xs font-medium hover:bg-gray-100 transition-colors cursor-pointer border border-gray-100"
              >
                {tag}
              </span>
            ))}
          </div>
  )
}

export default ProductTags