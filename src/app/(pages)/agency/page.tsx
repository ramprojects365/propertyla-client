import BreadcrumbArea from "@/components/Breadcrumb/BreadcrumbArea";
import CtaArea from "@/components/CTA/CtaArea";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agency - Property-La Real Estate React NextJs Template",
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
