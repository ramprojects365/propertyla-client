import { dashboardReviews } from "@/data/reviewData";
import DashboardLayout from "@/layouts/DashboardLayout";
import ReviewItem from "./components/ReviewSingleItem";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Property Reviews & Ratings | PropertyLA Malaysia",
  description: "Read and write property reviews on PropertyLA. Share your experience with Malaysia real estate agents, properties, and services to help others make informed decisions.",
};

export default function DashboardReview() {
  return (
    <DashboardLayout>
      <div className="tp-dashboard-new-property">
        <h5 className="tp-dashboard-new-title">Information</h5>
        <div className="tp-postbox-comment">
          <ul>
            {dashboardReviews.map((review, index) => (
              <ReviewItem key={index} {...review} />
            ))}
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
}
