import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";
import useAssetsStore from "../../store/useAssetsStore"; // Import useAssetsStore
import Trending from "../../components/Guest/HomePage/Trending";
import WhyChooseUs from "../../components/Guest/WhyChooseUs";
import HeroSection from "../../components/Guest/HomePage/HeroSection";
import BrowseCategories from "../../components/Guest/HomePage/BrowseCategories";
import FeaturedProducts from "../../components/Guest/HomePage/FeaturedProducts";

const HomePage = () => {
  const { user, isAuthenticated, isLoading } = useAuthStore();
  const { getAssets } = useAssetsStore(); // Destructure getAssets
  const navigate = useNavigate();

  useEffect(() => {
    getAssets(); // Fetch all assets when HomePage mounts
  }, [getAssets]);

  useEffect(() => {
    if (!isLoading && isAuthenticated && user) {
      if (user.role === "admin") {
        navigate("/admin-dashboard");
      } else if (user.role === "customer") {
        navigate("/home");
      }
    }
  }, [isAuthenticated, user, navigate, isLoading]);

  if (isLoading || isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div>
      <HeroSection />
      <BrowseCategories />
      <FeaturedProducts />
      <Trending />
      <WhyChooseUs />
    </div>
  );
};

export default HomePage;
