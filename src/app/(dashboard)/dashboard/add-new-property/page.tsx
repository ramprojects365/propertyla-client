import DashboardLayout from "@/layouts/DashboardLayout";
import AddPropertyMain from "./components/AddPropertyMain";
import ProtectedRoute from "@/components/Auth/ProtectedRoute";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Commercial Properties for Sale & Rent in Malaysia",
  description:
    "Browse commercial properties in Malaysia including offices, retail shops, warehouses and industrial buildings for sale or rent.",
};

export default function AddProperty() {
  return (
    <ProtectedRoute redirectTo="/dashboard/add-new-property">
      <DashboardLayout>
        {/* tp dashboard area start */}
        <AddPropertyMain />
        {/* tp dashboard area end */}
      </DashboardLayout>
    </ProtectedRoute>
  );
}
