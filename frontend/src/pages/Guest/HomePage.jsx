import HeroSection from "../../components/Guest/HeroSection";
import BrowseCategories from "../../components/Guest/BrowseCategories";
import FeaturedProducts from "../../components/Guest/FeaturedProducts";
import Trending from "../../components/Guest/Trending";
import WhyChooseUs from "../../components/Guest/WhyChooseUs";
import Footer from "../../components/public/Footer";
const HomePage = () => {
    return (
        <div>
           <HeroSection /> 
           <BrowseCategories />
           <FeaturedProducts />
           <Trending />
           <WhyChooseUs />
           <Footer />
        </div>
    );
};

export default HomePage;
