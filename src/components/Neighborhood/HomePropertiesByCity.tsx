import neighbourhoodsData from "@/data/exploreAreaData";
import NavigateArrowSvg from "../SVG/NavigateArrowSvg";
import Image from "next/image";
import Link from "next/link";

export default function HomePropertiesByCity() {
  return (
    <section className="tp-explore-area pb-100">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="tp-explore-heading mb-55">
              <span className="tp-section-title-pre">PROPERTIES BY CITY</span>
              <h3 className="tp-section-title">Explore the neighbourhoods</h3>
            </div>
          </div>
        </div>
        <div
          className="row wow fadeInUp"
          data-wow-duration="1s"
          data-wow-delay=".7s"
        >
          {/* Render neighbourhood property items with dynamic grid sizing */}
          {neighbourhoodsData.map((property, index) => (
            <div
              key={property.id}
              className={`col-lg-${
                index === 0 ? 6 : index === 3 ? 4 : index === 4 ? 5 : 3
              }`}
            >
              {(() => {
                const params = new URLSearchParams();
                params.set("q", property.name);
                params.set("city", property.name);
                const href = `/search?${params.toString()}`;

                return (
              <div className="tp-explore-item text-center mb-30">
                <div className="tp-explore-thumb p-relative">
                  <Link href={href}>
                    <Image src={property.image} alt={property.name} />
                  </Link>
                  <div className="tp-explore-content">
                    <h4 className="tp-explore-title">
                      <Link className="textline" href={href}>
                        {property.name}
                      </Link>
                    </h4>
                    <span>{property.count} Property</span>
                  </div>
                  <div className="tp-explore-btn">
                    <Link href={href}>
                      <span>
                        <NavigateArrowSvg />
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
                );
              })()}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
