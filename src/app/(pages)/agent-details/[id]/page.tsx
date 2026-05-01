import { propertyData } from "@/data/propertyData";
import { PageParamsProps } from "@/types/custom-interface";

export default async function generateMetadata(props: PageParamsProps) {
  const resolvedParams = await props.params;
  const { id } = resolvedParams;
  const property = propertyData.find((item) => item.id == Number(id));
  return {
    title: property?.title ? property.title : "Agent Details",
  };
}
