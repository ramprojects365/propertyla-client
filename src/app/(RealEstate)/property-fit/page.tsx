import PropertyFitResults from "@/components/Advisor/PropertyFitResults";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Property Fit | PropertyLa",
  description:
    "Ask property-fit questions in a chat-style preview on PropertyLa.",
};

export default function PropertyFitPage() {
  return <PropertyFitResults />;
}
