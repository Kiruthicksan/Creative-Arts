import {
  ChevronLeft,
  Star,
  Download,
  FileText,
  Database,
  ShieldCheck,
  ShoppingCart,
  Heart,
  Share2,
  CheckCircle,
} from "lucide-react";
import BackButton from "./BackButton";
import ProductGallery from "./ProductGallery";
import ProductHearder from "./ProductHearder";

const ProductDetailsSection = ({ product }) => {
  return (
    <div className="flex flex-col gap-8 font-sans">
      {/* Back Button */}
     <BackButton />
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left Column - Images */}
       <ProductGallery product={product} />

        {/* Right Column - Product Details */}
        <ProductHearder product={product} />
      </div>
    </div>
  );
};

export default ProductDetailsSection;
