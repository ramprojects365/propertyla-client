interface IFooterLinkDT {
  label: string;
  href: string;
}

export const quickLinks: IFooterLinkDT[] = [
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog/costly-mistakes-malaysians-make-when-buying-property" },
  { label: "Pricing", href: "/pricing" },
  { label: "Our FAQ", href: "/faq" },
  { label: "Terms & Conditions", href: "#" },
  { label: "Contact", href: "/contact" },
];

export const serviceLinks: IFooterLinkDT[] = [
  { label: "EMI Calculator", href: "/emi-calculator" },
  { label: "Interior Design", href: "/interior-design" },
  { label: "Terms & Conditions", href: "#" },
  { label: "Contact", href: "/contact" },
];

export const locationLinks: IFooterLinkDT[] = [
  { label: "Kuala Lumpur", href: "/search?city=Kuala Lumpur" },
  { label: "Selangor", href: "/search?city=Selangor" },
  { label: "Cheras", href: "/search?city=Cheras" },
  { label: "Puchong", href: "/search?city=Puchong" },
  { label: "Klang Valley", href: "/search?city=Klang Valley" },
];

export const propertyTypeLinks: IFooterLinkDT[] = [
  { label: "Condos for Rent", href: "/search?type=rent&propertyType=condo" },
  { label: "Houses for Sale", href: "/search?type=sale&propertyType=house" },
  { label: "Apartments", href: "/search?propertyType=apartment" },
  { label: "Landed Properties", href: "/search?propertyType=landed" },
];
