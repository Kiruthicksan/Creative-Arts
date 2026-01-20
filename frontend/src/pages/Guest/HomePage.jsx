import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";
import HeroSection from "../../components/Guest/HeroSection";
import BrowseCategories from "../../components/Guest/BrowseCategories";
import FeaturedProducts from "../../components/Guest/FeaturedProducts";
import Trending from "../../components/Guest/Trending";
import WhyChooseUs from "../../components/Guest/WhyChooseUs";
import Footer from "../../components/public/Footer";

const HomePage = () => {
  const { user, isAuthenticated, isLoading } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && isAuthenticated && user) {
      if (user.role === "admin") {
        navigate("/admin-dashboard");
      } else if (user.role === "customer") {
        navigate("/customer-dashboard");
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
