import Header from "@/layouts/Headers/Header";
import HomeOnePage from "./(homes)/home-one/page";
import BackToTop from "@/components/Common/BackToTop";
import Wrapper from "@/layouts/Wrapper";
import CommonFooter from "@/layouts/Footers/CommonFooter";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Properties for Sale in Malaysia | Houses, Condos & Apartments Listings",
  description:
    "Browse thousands of properties for sale in Malaysia. Discover houses, condos, apartments and new developments across Kuala Lumpur, Selangor, Penang and Johor.",
};

const Home = () => {
  return (
    <>
      <Wrapper>
        <Header />
        <main>
          <HomeOnePage />
        </main>
        <BackToTop />
        <CommonFooter />
      </Wrapper>
    </>
  );
};

export default Home;
