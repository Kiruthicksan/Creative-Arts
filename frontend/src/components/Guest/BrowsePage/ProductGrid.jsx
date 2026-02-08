import ProductCard from "../ProductCard";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } },
};

const ProductGrid = ({ products }) => {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {products.map((product) => (
        <motion.div key={product.id} variants={item}>
          <ProductCard
            {...product}
            image={product.previewImages?.[0]?.secure_url}
            id={product._id}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ProductGrid;
