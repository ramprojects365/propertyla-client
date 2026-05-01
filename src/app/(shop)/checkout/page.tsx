import BreadcrumbArea from "@/components/Breadcrumb/BreadcrumbArea";
import CheckoutArea from "@/components/shop/CheckoutArea";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout - New property launch Malaysia",
  description: "Houses & Condos for Sale in Selangor | PropertyKL",
};

export default function Checkout() {
  return (
    <main>
      {/* -- Breadcrumb start -- */}
      <BreadcrumbArea title="Checkout" />
      {/* -- Breadcrumb end -- */}

      {/* -- Checkout area start -- */}
      <CheckoutArea />
      {/* -- Checkout area end -- */}
    </main>
  );
}
