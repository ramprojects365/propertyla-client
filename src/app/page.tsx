import Header from "@/layouts/Headers/Header";
import HomeOnePage from "./(homes)/home-one/page";
import BackToTop from "@/components/Common/BackToTop";
import Wrapper from "@/layouts/Wrapper";
import CommonFooter from "@/layouts/Footers/CommonFooter";
import { Metadata } from "next";
import HomeAdvisorPopup from "@/components/Advisor/HomeAdvisorPopup";

export const metadata: Metadata = {
  title:
    "Property for Sale & Rent in Kuala Lumpur & Klang Valley | Condos, Houses, Apartments",
  description:
    "Find your perfect property in Kuala Lumpur, Selangor, Cheras, Puchong & Klang Valley. Browse condos for rent, houses for sale, apartments, and landed properties. Malaysia's trusted real estate platform.",
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
        <HomeAdvisorPopup />
        <CommonFooter />
      </Wrapper>
    </>
  );
};

export default Home;
