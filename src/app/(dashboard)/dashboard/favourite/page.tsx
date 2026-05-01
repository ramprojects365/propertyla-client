import PropertyPagination from "@/components/Common/pagination/PropertyPagination";
import DashboardLayout from "@/layouts/DashboardLayout";
import DashboardPropertyItem from "../property/components/DashboardPropertyItem";
import { propertyData } from "@/data/propertyData";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Property Agents in Malaysia | Find Trusted Real Estate Agents",
  description:
    "Connect with trusted property agents in Malaysia to buy, sell or rent homes. Browse verified real estate agents near you.",
};

export default function DashboardFavourite() {
  return (
    <>
      <DashboardLayout>
        <div className="tp-dashboard-property-wrapper">
          <div className="row">
            {/* My Property */}
            {propertyData.slice(55, 59).map((property) => (
              <DashboardPropertyItem property={property} key={property.id} />
            ))}
            {/* pagination area */}
            <div className="col-lg-12">
              <PropertyPagination />
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}
