import InteriorPartnersSlider from "@/components/InteriorDesign/InteriorPartnersSlider";
import heroBg from "../../../../public/assets/img/others/breadcrumb.jpg";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Interior Design Partners Malaysia | PropertyLA",
  description:
    "Meet trusted interior designers and studios in Malaysia. Browse partner profiles, portfolios, and contact teams for residential and commercial fit-outs.",
};

export default function InteriorDesignPage() {
  return (
    <>
      <section className="position-relative text-white overflow-hidden">
        <div className="position-absolute top-0 start-0 w-100 h-100">
          <Image
            src={heroBg}
            alt=""
            fill
            priority
            className="object-fit-cover"
            sizes="100vw"
          />
          <div
            className="position-absolute top-0 start-0 w-100 h-100"
            style={{
              background:
                "linear-gradient(105deg, rgba(0,59,92,0.88) 0%, rgba(0,59,92,0.55) 45%, rgba(0,0,0,0.35) 100%)",
            }}
            aria-hidden
          />
        </div>
        <div className="container position-relative" style={{ zIndex: 1 }}>
          <div className="row justify-content-center py-5" style={{ paddingTop: "clamp(4rem, 12vw, 7rem)", paddingBottom: "clamp(3rem, 8vw, 5rem)" }}>
            <div className="col-lg-10 col-xl-9 text-center">
              <span className="d-inline-block small text-uppercase tracking-wide mb-3" style={{ letterSpacing: "0.12em", opacity: 0.9 }}>
                Services
              </span>
              <h1 className="text-white mb-3" style={{ fontWeight: 700, fontSize: "clamp(1.85rem, 4.5vw, 2.75rem)", lineHeight: 1.2 }}>
                Interior design for Malaysian homes &amp; workspaces
              </h1>
              <p className="mb-0 mx-auto text-white" style={{ maxWidth: "640px", lineHeight: 1.75, opacity: 0.95, fontSize: "1.05rem" }}>
                From concept to site completion, our vetted partners help you plan layouts, materials,
                lighting, and joinery — whether you are renovating a condo, landed home, or a small
                commercial studio. Explore profiles below and reach out directly to the team that fits your style.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-80 pb-120">
        <div className="container">
          <div className="text-center mb-50">
            <span className="tp-section-title-pre">Partners</span>
            <h2 className="tp-section-title">Our trusted interior partners</h2>
            <p className="text-muted mx-auto mb-0" style={{ maxWidth: "620px" }}>
              Scroll sideways to explore designers. Each card opens a dedicated profile with portfolio imagery,
              service highlights, and quick share options.
            </p>
          </div>
          <InteriorPartnersSlider />
        </div>
      </section>
    </>
  );
}
