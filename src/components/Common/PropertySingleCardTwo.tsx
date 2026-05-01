import BathsroomTwoSvg from "@/components/SVG/PropertySvg/BathsroomTwoSvg";
import BedroomsTwoSvg from "@/components/SVG/PropertySvg/BedroomsTwoSvg";
import LivingTwoSvg from "@/components/SVG/PropertySvg/LivingTwoSvg";
import MapMarkerSvg from "@/components/SVG/PropertySvg/MapMarkerIcon";
import { IFeaturedPropertyDT } from "@/types/property-d-t";
import { formatPrice } from "../Utils/formatPrice";
import Image from "next/image";
import Link from "next/link";

interface propertyProps {
  item: IFeaturedPropertyDT;
}

export default function PropertySingleCardTwo({ item }: propertyProps) {
  const detailsHref = `/property-details/${item.id}`;

  return (
    <div
      className={`tp-listing-2-item ${item.spacing && "mb-30"} ${
        item.wowAnimation && "wow fadeInUp"
      }`}
      data-wow-duration={item.wowDelay ? "1s" : undefined}
      data-wow-delay={item.wowDelay ? item.wowDelay : undefined}
    >
      <div className="tp-rent-item p-relative">
        <div className="tp-rent-thumb p-relative">
          <Link href={detailsHref}>
            {typeof item.image === "string" ? (
              <img
                src={item.image}
                alt="property image"
                style={{ width: "100%", height: "250px", objectFit: "cover" }}
              />
            ) : (
              <Image src={item.image} alt="property image" />
            )}
          </Link>

          {item.showTags && (
            <div className="tp-rent-tags">
              {item.isForRent && <Link href={detailsHref}>FOR RENT</Link>}
              {item.isForSale && (
                <Link className="two" href={detailsHref}>
                  FOR SALE
                </Link>
              )}
              {item.isFeatured && (
                <Link className="two" href={detailsHref}>
                  FEATURED
                </Link>
              )}
            </div>
          )}
        </div>
        <div className="tp-rent-content">
          <h4 className="tp-rent-title">
            <Link className="textline" href={detailsHref}>
              {item.title}
            </Link>
          </h4>
          <p>
            <MapMarkerSvg /> {item.address}
          </p>
          <div className="tp-rent-meta-list d-flex justify-content-between align-items-center">
            <div className="tp-rent-meta-item">
              <div className="tp-rent-meta-content d-flex">
                <span>
                  <BedroomsTwoSvg />
                </span>
                <p>{item.bedrooms} Bed</p>
              </div>
            </div>
            <div className="tp-rent-meta-item">
              <div className="tp-rent-meta-content d-flex">
                <span>
                  <BathsroomTwoSvg />
                </span>
                <p>{item.bathrooms} Baths</p>
              </div>
            </div>
            <div className="tp-rent-meta-item">
              <div className="tp-rent-meta-content d-flex">
                <span>
                  <LivingTwoSvg />
                </span>
                <p>{item.livingArea}</p>
              </div>
            </div>
          </div>
          <div className="tp-rent-btn-box d-flex justify-content-between align-items-center">
            <div className="tp-rent-btn">
              <Link className="tp-btn" href={detailsHref}>
                View Details
              </Link>
            </div>
            <div className="tp-rent-price">
              <span>{formatPrice(item.price, true)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
