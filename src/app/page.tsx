import Header from "@/layouts/Headers/Header";
import HomeOnePage from "./(homes)/home-one/page";
import BackToTop from "@/components/Common/BackToTop";
import Wrapper from "@/layouts/Wrapper";
import CommonFooter from "@/layouts/Footers/CommonFooter";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Property for Sale & Rent in Malaysia | Apartments, Condos, Houses & Bungalows",
  description:
    "Find your perfect property in Malaysia. Browse apartments for rent, houses for sale, condos, landed properties, and bungalows in Kuala Lumpur, Selangor, Penang, Johor, Cheras, and other major areas. Competing with iProperty and PropertyGuru for the best Malaysian real estate listings.",
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
