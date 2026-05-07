import PropertyLayout from "@/components/Layout/PropertyLayout";
import PropertyListing from "@/components/RealEstate/PropertyStyleOne/PropertyListing";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Property Search Malaysia | Apartments for Rent, Houses for Sale, Condos & Landed Properties",
  description:
    "Search properties for sale and rent in Malaysia. Find apartments, condos, landed houses, bungalows in Kuala Lumpur, Selangor, Penang, Johor, Cheras and more. Your trusted alternative to iProperty and PropertyGuru for Malaysian real estate.",
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
