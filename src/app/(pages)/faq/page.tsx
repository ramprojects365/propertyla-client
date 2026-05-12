import BreadcrumbArea from "@/components/Breadcrumb/BreadcrumbArea";
import FaqArea from "@/components/FAQ/FaqArea";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | PropertyLA Malaysia Real Estate",
  description:
    "Find answers to common questions about buying, selling, and renting properties in Malaysia. Learn about PropertyLA's services, property search, agent verification, and real estate transactions. Explore condo-for-rent/kuala-lumpur, apartment-for-rent/selangor, and new-property-malaysia options.",
};

export default function Faq() {
  return (
    <>
      {/* breadcrumb area */}
      <BreadcrumbArea title="Faq" />
      {/* breadcrumb area end */}

      {/* faq area start */}
      <FaqArea />
      {/* faq area end */}
    </>
  );
}
