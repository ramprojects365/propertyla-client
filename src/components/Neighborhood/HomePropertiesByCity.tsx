import neighbourhoodsData from "@/data/exploreAreaData";
import NavigateArrowSvg from "../SVG/NavigateArrowSvg";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "@/contexts/LanguageContext";
import React from "react";

function HomePropertiesByCity() {
  const { t } = useTranslation();

  return (
    <section className="tp-explore-area pb-100" style={{ paddingTop: "50px" }}>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="tp-explore-heading mb-55">
              <span className="tp-section-title-pre">{t("home.propertiesByCity")}</span>
              <h3 className="tp-section-title">{t("home.exploreNeighbourhoods")}</h3>
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
                params.set("keyword", property.name);
                const href = `/search?${params.toString()}`;

                return (
                  <div className="tp-explore-item text-center mb-30">
                    <div className="tp-explore-thumb p-relative">
                      <Link href={href}>
                        <Image 
                          src={property.image} 
                          alt={property.name} 
                          loading="lazy"
                          width={0}
                          height={0}
                          sizes="100vw"
                          style={{ width: '100%', height: 'auto' }}
                        />
                      </Link>
                      <div className="tp-explore-content">
                        <h4 className="tp-explore-title">
                          <Link className="textline" href={href}>
                            {property.name}
                          </Link>
                        </h4>
                        <span>{property.count} {t("common.property")}</span>
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

export default React.memo(HomePropertiesByCity);
