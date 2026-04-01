import HeroSection from "../components/HeroSection";
import FlashSales from "../components/FlashSales/FlashSales";
import BrowseCategory from "../components/FlashSales/BrowseCategory";
import ProductBanner from "../components/ProductTimer/ProductBanner";
import PromoSection from "../components/FlashSales/Promosection/PromoSection";
function Home() {
  return (
    <>
    <HeroSection/>
    <FlashSales/>
    <BrowseCategory/>
    <FlashSales/>
    <ProductBanner/>
    <FlashSales/>
    <PromoSection/>
    
    </>
  );
}

export default Home;