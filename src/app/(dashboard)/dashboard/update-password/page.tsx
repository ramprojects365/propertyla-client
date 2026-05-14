import UpdatePasswordForm from "@/components/Form/UpdatePasswordForm";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Update Password | PropertyLA Account Settings",
  description:
    "Update your PropertyLA account password securely. Change your password to keep your account protected.",
};

export default function UpdatePassword() {
  return (
    <>
      <DashboardLayout>
        <div className="tp-dashboard-profile-wrapper">
          <UpdatePasswordForm />
        </div>
      </DashboardLayout>
    </>
  );
}
