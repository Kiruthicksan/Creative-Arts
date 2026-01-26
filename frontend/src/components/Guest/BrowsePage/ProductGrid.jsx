import ProductCard from "../ProductCard"

const ProductGrid = ({products}) => {
  return (
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} {...product} image={product.image?.[0]?.secure_url} id={product._id}/>
              ))}
            </div>
  )
}

export default ProductGrid