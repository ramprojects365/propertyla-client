import HomeLoanCalculator from "@/components/Tools/HomeLoanCalculator";
import BreadcrumbArea from "@/components/Breadcrumb/BreadcrumbArea";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Loan EMI Calculator Malaysia | PropertyLA",
  description:
    "Estimate your monthly home loan repayment (EMI) in Malaysia from property price, down payment, interest rate, and loan tenure. Quick guide for buyers — confirm figures with your bank.",
};

export default function EmiCalculatorPage() {
  return (
    <>
      <BreadcrumbArea title="EMI Calculator" showBackground={false} />
      <HomeLoanCalculator />
    </>
  );
}
