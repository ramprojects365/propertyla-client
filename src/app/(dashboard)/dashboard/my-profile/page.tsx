import UserProfileForm from "@/components/Form/UserProfileForm";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Malaysia Property News, Guides & Investment Tips",
  description:
    "Read the latest Malaysia property news, home buying guides, investment tips and market trends.",
};

export default function MyProfile() {
  return (
    <>
      <DashboardLayout>
        <div className="tp-dashboard-profile-wrapper">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 24,
            }}
          >
            <h5 className="tp-dashboard-new-title" style={{ margin: 0 }}>
              Account Settings
            </h5>
          </div>

          <UserProfileForm />
        </div>
      </DashboardLayout>
    </>
  );
}
