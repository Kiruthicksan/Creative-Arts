import CreativeResources from "../../components/Customer/CreativeResources";
import Header from "../../components/Customer/CustomerDashboard/Header";
import FlashDeal from "../../components/Customer/CustomerDashboard/FlashDeal";
import FreshArrivals from "../../components/Customer/CustomerDashboard/FreshArrivals";

import TopCreators from "../../components/Customer/CustomerDashboard/TopCreators";
import TrendingNow from "../../components/Customer/CustomerDashboard/TrendingNow";

const CustomerDashboard = () => {
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <Header />

        <FreshArrivals />
        <FlashDeal />
        <TrendingNow />
        <TopCreators />
        <CreativeResources />
      </div>
    </>
  );
};

export default CustomerDashboard;
