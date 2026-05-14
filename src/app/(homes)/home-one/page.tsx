//import AboutHomeMain from "@/components/About/AboutHomeMain";
import HomeApartmentArea from "@/components/Apartment/HomeApartment";
//import HomeApartmentTypes from "@/components/Apartment/HomeApartmentTypes";
//import BrandAreaOne from "@/components/Barnd/BarndAreaOne";
import HomeBlogArea from "@/components/Blog/HomeBlogArea";
//import HomeApproachCounter from "@/components/Counter/HomeApproachCounter";
import HeroBannerOne from "@/components/HeroBanner/HeroBannerOne";
import HomePropertiesByCity from "@/components/Neighborhood/HomePropertiesByCity";
//import HomeNewsletter from "@/components/Newsletter/HomeNewsletter";
//import FeatureShowcaseCategory from "@/components/Property/FeatureShowcaseCategory";
import PropertyHome from "@/components/Property/PropertyHome";
//import HomeTestimonialArea from "@/components/Testimonial/HomeTestimonialArea";
//import TextSlide from "@/components/Features/TextSlide";
import TrustBadges from "@/components/UI/TrustBadges";
import TrustedAgents from "@/components/TrustedAgents/TrustedAgents";
import React from "react";

export default function HomeOnePage() {
  return (
    <>
      {/* hero banner  */}
      <HeroBannerOne />
      <div style={{ backgroundColor: "#fff" }}>
        <PropertyHome />
      </div>
      {/* hero banner end */}
      {/*feature area*/}
      {/* <FeatureShowcaseCategory /> */}
      {/*feature area end*/}
      {/* about area  */}
      {/* <AboutHomeMain /> */}
      {/* about area end */}
      {/* apartment area type*/}
      {/* <HomeApartmentTypes /> */}
      {/*apartment area type end */}
      {/* newsletter area */}
      {/* <HomeNewsletter /> */}
      {/* newsletter area end */}
      {/* apartment area*/}

      {/* apartment area end*/}
      {/* rent area */}

      {/* rent area end */}

      {/* explore area */}
      <div style={{ backgroundColor: "rgb(240, 244, 253)" }}>
        <HomePropertiesByCity />
      </div>
      {/* explore area end */}
      {/* counter area */}
      {/* <HomeApproachCounter /> */}
      {/* counter area end */}
      {/* testimonial area */}
      {/* <HomeTestimonialArea /> */}
      {/* testimonial area end */}
      {/* text slide */}
      {/* <TextSlide /> */}
      {/* text slide end*/}
      {/* team area */}
      {/* team area end*/}
      {/* barnd area */}
      {/* <BrandAreaOne /> */}
      {/* barnd area end */}
      {/* blog area */}
      {/* blog area end */}
      {/* <HomeApartmentArea /> */}
      <div style={{ backgroundColor: "#fff" }}>
        <TrustedAgents />
      </div>
      <div style={{ backgroundColor: "rgb(240, 244, 253)" }}>
        <HomeBlogArea />
      </div>
      {/* Trusted Agents Section */}

      {/* Trust Badges Section */}
      <section style={{ padding: "40px 0", backgroundColor: "#fff" }}>
        <div className="container">
          <div style={{ textAlign: "center" }}>
            <h3
              style={{
                fontSize: "24px",
                marginBottom: "30px",
                color: "#003B5C",
              }}
            >
              Why Choose PropertyLA?
            </h3>
            <TrustBadges />
          </div>
        </div>
      </section>
    </>
  );
}
