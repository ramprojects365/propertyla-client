import PropertyLayout from "@/components/Layout/PropertyLayout";
import PropertyListing from "@/components/RealEstate/PropertyStyleOne/PropertyListing";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search Properties in Kuala Lumpur, Selangor, Cheras, Puchong | PropertyLA Malaysia",
  description:
    "Search properties for sale and rent in Klang Valley. Find condos, houses, apartments, and landed properties in Kuala Lumpur, Selangor, Cheras, Puchong. Filter by location, price, property type. Malaysia's trusted real estate platform.",
};

export default function PropertyOne() {
  return (
    <>
      {/* property area start */}
      <PropertyLayout>
        <PropertyListing />
      </PropertyLayout>
      {/* property area end */}
    </>
  );
}
