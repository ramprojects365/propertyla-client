import BreadcrumbArea from "@/components/Breadcrumb/BreadcrumbArea";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agent Details - cheap house Kuala Lumpur",
};

export default async function AgentDetails() {
  return (
    <main>
      <>
        {/* breadcrumb area */}
        <BreadcrumbArea title="Agent Details" />
        {/* breadcrumb area end */}
      </>
    </main>
  );
}
