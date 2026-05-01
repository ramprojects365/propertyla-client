import BreadcrumbArea from "@/components/Breadcrumb/BreadcrumbArea";
import CartArea from "@/components/shop/CartArea";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cart - buy house KL",
  description: "3 Bedroom Condo for Sale in KLCC | PropertyKL",
};

export default function Cart() {
  return (
    <main>
      {/* -- Breadcrumb start -- */}
      <BreadcrumbArea title="Cart" />
      {/* -- Breadcrumb end -- */}

      {/* -- Cart area start -- */}
      <CartArea />
      {/* -- Cart area end -- */}
    </main>
  );
}
