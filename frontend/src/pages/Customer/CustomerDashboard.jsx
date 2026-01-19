import CreativeResources from "../../components/Customer/CreativeResources";
import FlashDeal from "../../components/Customer/FlashDeal";
import FreshArrivals from "../../components/Customer/FreshArrivals";
import Header from "../../components/Customer/Header";
import JumpBackIn from "../../components/Customer/JumpBackIn";
import TopCreators from "../../components/Customer/TopCreators";
import TrendingNow from "../../components/Customer/TrendingNow";


const CustomerDashboard = () => {
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <Header />
        <JumpBackIn />
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
