import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Property Details | PropertyLA Malaysia Real Estate",
  description: "View comprehensive property details including photos, specifications, location maps, and pricing information for properties across Malaysia.",
};

export default function PropertyDetails() {
  redirect("/search");
  return null;
}
