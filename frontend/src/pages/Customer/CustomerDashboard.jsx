import CreativeResources from "../../components/Customer/CreativeResources";
import Header from "../../components/Customer/CustomerDashboard/Header";
import DailySpotlight from "../../components/Customer/CustomerDashboard/DailySpotlight";
import FeaturedProducts from "../../components/Guest/HomePage/FeaturedProducts";
import TrendingNow from "../../components/Customer/CustomerDashboard/TrendingNow";
import JumpBackIn from "../../components/Customer/CustomerDashboard/JumpBackIn";

const CustomerDashboard = () => {
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <Header />

        {/* Hero Spotlight */}
        <DailySpotlight />

        {/* Recent Purchases */}
        <JumpBackIn />

        {/* Catalog Grid */}
        <TrendingNow />

        {/* Blog / Education */}
        <CreativeResources />
      </div>
    </>
  );
};

export default CustomerDashboard;
