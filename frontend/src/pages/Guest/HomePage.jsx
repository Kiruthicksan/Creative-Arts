import HeroSection from "../../components/Guest/HeroSection";
import BrowseCategories from "../../components/Guest/BrowseCategories";
import FeaturedProducts from "../../components/Guest/FeaturedProducts";
import Trending from "../../components/Guest/Trending";
const HomePage = () => {
    return (
        <div>
           <HeroSection /> 
           <BrowseCategories />
           <FeaturedProducts />
           <Trending />
        </div>
    );
};

export default HomePage;
