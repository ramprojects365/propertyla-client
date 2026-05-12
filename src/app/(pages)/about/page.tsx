import RealestateAboutArea from "@/components/PropertyFeature/RealestateAboutArea";
import BreadcrumbArea from "../../../components/Breadcrumb/BreadcrumbArea";
import AboutTestimonial from "@/components/Testimonial/AboutTestimonial";
import AboutHomeFive from "@/components/About/ReusableAboutArea";
import AboutPointArea from "@/components/About/AboutPointArea";
import ContactArea from "@/components/Contact/ContactArea";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "About PropertyLA | Malaysia's Premier Real Estate Platform for Rentals & Sales",
  description:
    "Discover PropertyLA, Malaysia's leading real estate platform for apartments, condos, landed houses, and bungalows. We serve Kuala Lumpur, Selangor, Penang, Johor, Cheras and nationwide. Explore new-property-malaysia listings and investment-property-malaysia opportunities. Your trusted alternative to iProperty and PropertyGuru for Malaysian property market.",
};

export default function About() {
  return (
    <>
      {/* breadcrumb area */}
      <BreadcrumbArea title="About us" />
      {/* breadcrumb area end */}
      {/* about area */}
      <AboutHomeFive />
      {/* about area end */}
      {/* about point area */}
      <AboutPointArea />
      {/* about point area end */}
      {/* realestate area */}
      <RealestateAboutArea />
      {/* realestate area end */}
      {/* testimonial area */}
      <AboutTestimonial />
      {/* testimonial area end */}
      {/* contact area */}
      <ContactArea btnClass="tp-countact-btn" />
      {/* contact area end */}
    </>
  );
}
