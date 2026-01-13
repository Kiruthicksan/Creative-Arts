import HeroSection from "../../components/Guest/HeroSection";
import BrowseCategories from "../../components/Guest/BrowseCategories";
import FeaturedProducts from "../../components/Guest/FeaturedProducts";
const HomePage = () => {
    return (
        <div>
           <HeroSection /> 
           <BrowseCategories />
           <FeaturedProducts />
        </div>
    );
};

export default HomePage;
