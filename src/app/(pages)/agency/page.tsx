import BreadcrumbArea from "@/components/Breadcrumb/BreadcrumbArea";
import CtaArea from "@/components/CTA/CtaArea";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Real Estate Agencies in Malaysia | PropertyLA Agency Network",
  description: "Discover top real estate agencies in Malaysia on PropertyLA. Connect with professional agencies specializing in residential, commercial, and investment properties across Kuala Lumpur, Selangor, Penang and more.",
};

export default function Agency() {
  return (
    <>
      {/* breadcrumb area */}
      <BreadcrumbArea title="Agency" />
      {/* breadcrumb area end */}

      {/* cta area */}
      <CtaArea wrapClass="tp-cta-4-ptb" />
      {/* cta area end */}
    </>
  );
}
