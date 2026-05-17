"use client";

import realStateImg from "../../../public/assets/img/rent/about/real-state.jpg";
import BathroomsSvg from "../SVG/PropertySvg/BathroomsSvg";
import { RentMetaItemProps } from "@/types/property-d-t";
import BedroomsSvg from "../SVG/PropertySvg/BedroomsSvg";
import LivingSvg from "../SVG/PropertySvg/LivingSvg";
import { formatPrice } from "../Utils/formatPrice";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "@/config/constants";

interface Property {
  id: string;
  propertyName?: string;
  title?: string;
  location?: string;
  bedrooms?: number;
  bathrooms?: number;
  livingArea?: number;
  price?: number;
  listingType?: string;
  images?: unknown[];
}

const RentMetaItem: React.FC<RentMetaItemProps> = ({ icon, value, label }) => (
  <div className="tp-rent-meta-item">
    <div className="tp-rent-meta-content d-flex">
      <span>{icon}</span>
      <p>{value}</p>
    </div>
    <p>{label}</p>
  </div>
);

export default function RealestateAboutArea() {
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/properties`);
        if (!res.ok) throw new Error("Failed to fetch properties");

        const data = await res.json();
        const properties = Array.isArray(data) ? data : data?.data || [];

        if (properties.length > 0) {
          // Sort by createdAt or updatedAt to get the most recent
          const sorted = properties.sort((a: any, b: any) => {
            const dateA = new Date(a.createdAt || a.updatedAt || 0);
            const dateB = new Date(b.createdAt || b.updatedAt || 0);
            return dateB.getTime() - dateA.getTime();
          });

          setProperty(sorted[0]);
        }
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const getCoverImage = (images: unknown[]): string => {
    if (!images || !Array.isArray(images) || images.length === 0) return "";

    const first = images[0];
    if (typeof first === "string") return first;
    if (typeof first === "object" && first !== null) {
      const item = first as Record<string, unknown>;
      return ((item.url || item.imageUrl || item.src) as string) || "";
    }
    return "";
  };

  if (loading) {
    return (
      <section className="tp-realstate-ptb pt-120 pb-140">
        <div className="container">
          <div className="text-center">
            <p>Loading featured property...</p>
          </div>
        </div>
      </section>
    );
  }

  if (!property) {
    return (
      <section className="tp-realstate-ptb pt-120 pb-140">
        <div className="container">
          <div className="text-center">
            <p>No featured property available at the moment.</p>
          </div>
        </div>
      </section>
    );
  }

  const coverImage = getCoverImage(property.images || []);
  const metaItems: RentMetaItemProps[] = [
    {
      icon: <BedroomsSvg />,
      value: String(property.bedrooms || "0"),
      label: "Bedrooms",
    },
    {
      icon: <BathroomsSvg />,
      value: String(property.bathrooms || "0"),
      label: "Bathrooms",
    },
    {
      icon: <LivingSvg />,
      value: property.livingArea ? `${property.livingArea}m²` : "N/A",
      label: "Living Area",
    },
  ];

  return (
    <section className="tp-realstate-ptb pt-120 pb-140">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="tp-realstate-heading text-center mb-40">
              <h3 className="tp-section-title">
                Featured Properties on <br /> PropertyLa
              </h3>
            </div>
          </div>
        </div>
        <div className="col-lg-12">
          <div
            className="tp-realstate-thumb p-relative wow fadeInUp"
            data-wow-duration="1s"
            data-wow-delay=".3s"
          >
            <Image
              src={coverImage || realStateImg}
              alt={
                property.propertyName || property.title || "Featured Property"
              }
              width={800}
              height={600}
              unoptimized
            />
            <div
              className="tp-realstate-box wow fadeInUp"
              data-wow-duration="1s"
              data-wow-delay=".5s"
            >
              <div className="tp-rent-item p-relative">
                <div className="tp-rent-content">
                  <h4 className="tp-rent-title">
                    <Link
                      className="textline"
                      href={`/property-details/${property.id}`}
                    >
                      {property.propertyName ||
                        property.title ||
                        "Featured Property"}
                    </Link>
                  </h4>
                  <p>{property.location || "Malaysia"}</p>
                  <div className="tp-rent-meta-list d-flex justify-content-between align-items-center">
                    {metaItems.map((item, index) => (
                      <RentMetaItem key={index} {...item} />
                    ))}
                  </div>
                  <div className="tp-rent-btn-box d-flex justify-content-between align-items-center">
                    <div className="tp-rent-btn">
                      <Link
                        className="tp-btn"
                        href={`/property-details/${property.id}`}
                      >
                        View Details
                      </Link>
                    </div>
                    <div className="tp-rent-price">
                      <span>{formatPrice(property.price || 0, false)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
