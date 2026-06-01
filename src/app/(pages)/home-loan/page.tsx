import HomeLoanCalculator from "@/components/Tools/HomeLoanCalculator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Loan Calculator Malaysia | PropertyLa",
  description:
    "Estimate Malaysia mortgage repayments, upfront costs, stamp duty, legal fees, MRTA, MLTA, and total loan cost with PropertyLa's home loan calculator.",
};

export default function HomeLoanPage() {
  return <HomeLoanCalculator />;
}
