interface IFooterLinkDT {
  label: string;
  href: string;
}

export const quickLinks: IFooterLinkDT[] = [
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Pricing", href: "/pricing" },
  { label: "Our FAQ", href: "/faq" },
];

export const serviceLinks: IFooterLinkDT[] = [
  { label: "Terms & Conditions", href: "#" },
  { label: "Contact", href: "/contact" },
];
