import BreadcrumbArea from "@/components/Breadcrumb/BreadcrumbArea";
import ContactAreaTwo from "@/components/Contact/ContactAreaTwo";
import ContactFormTwo from "@/components/Form/ContactFormTwo";
import MapArea from "@/components/Contact/MapArea";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact PropertyLa | Malaysia Real Estate Agents & Property Services",
  description:
    "Get in touch with PropertyLa experts for Malaysian real estate. Contact our agents for apartments, condos, landed houses, and bungalows in Kuala Lumpur, Selangor, Penang, Johor and nationwide. Browse property-for-sale/klang-valley and investment-property-malaysia listings. Your trusted alternative to iProperty and PropertyGuru.",
};

export default function Contact() {
  return (
    <>
      {/* breadcrumb area start */}
      <BreadcrumbArea title="Contact us" />
      {/* breadcrumb area end */}

      {/* contact area start */}
      <ContactAreaTwo />
      {/* contact area end */}

      {/* map area start  */}
      <MapArea />
      {/* map area end  */}

      {/* contact form area start */}
      <section className="tp-contact-inner-form-ptb">
        <div className="container">
          <div className="tp-contact-inner-form-shape">
            <h4 className="tp-contact-inner-form-shape-title">real estate</h4>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="tp-contact-inner-wrap">
                <h4 className="tp-contact-inner-wrap-title">
                  {`Let’s`} talk. Have a project in mind?
                </h4>
                <ContactFormTwo />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
