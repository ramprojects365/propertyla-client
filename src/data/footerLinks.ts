interface IFooterLinkDT {
  label: string;
  href: string;
}

export const quickLinks: IFooterLinkDT[] = [
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog/costly-mistakes-malaysians-make-when-buying-property" },
  { label: "Pricing", href: "/pricing" },
  { label: "Our FAQ", href: "/faq" },
];

export const serviceLinks: IFooterLinkDT[] = [
  { label: "EMI Calculator", href: "/emi-calculator" },
  { label: "Interior Design", href: "/interior-design" },
  { label: "Terms & Conditions", href: "#" },
  { label: "Contact", href: "/contact" },
];
