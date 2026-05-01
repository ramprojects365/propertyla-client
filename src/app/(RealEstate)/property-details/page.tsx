import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Property Details - Property-La Real Estate React NextJs Template",
};

export default function PropertyDetails() {
  redirect("/search");
  return null;
}
