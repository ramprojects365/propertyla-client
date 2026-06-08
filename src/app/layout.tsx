import type { Metadata } from "next";
import { Geist, Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";

import "slick-carousel/slick/slick.css";
import "swiper/css/bundle";
import "./globals.scss";
import RootProviders from "./RootProviders";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://propertyla.com.my"),

  title: {
    default: "PropertyLa Malaysia Real Estate",
    template: "%s | PropertyLa",
  },

  description:
    "Find condos, houses, apartments and rooms for rent or sale in Malaysia with PropertyLa. Connect with verified agents and discover your next property.",

  applicationName: "PropertyLa",

  keywords: [
    "PropertyLa",
    "Malaysia real estate",
    "Malaysia property",
    "condos Malaysia",
    "houses Malaysia",
    "apartments Malaysia",
    "property for rent Malaysia",
    "property for sale Malaysia",
  ],

  authors: [{ name: "PropertyLa" }],
  creator: "PropertyLa",
  publisher: "PropertyLa",

  alternates: {
    canonical: "https://propertyla.com.my",
  },

  openGraph: {
    title: "PropertyLa Malaysia Real Estate",
    description:
      "Find condos, houses, apartments and rooms for rent or sale in Malaysia with PropertyLa.",
    url: "https://propertyla.com.my",
    siteName: "PropertyLa",
    images: [
      {
        url: "https://propertyla.com.my/assets/img/logo/logo-icon-blue.png",
        width: 512,
        height: 512,
        alt: "PropertyLa Logo",
      },
    ],
    locale: "en_MY",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "PropertyLa Malaysia Real Estate",
    description:
      "Find condos, houses, apartments and rooms for rent or sale in Malaysia with PropertyLa.",
    images: ["https://propertyla.com.my/assets/img/logo/logo-icon-blue.png"],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "PropertyLa",
    alternateName: "PropertyLa Malaysia Real Estate",
    url: "https://propertyla.com.my",
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "PropertyLa",
    url: "https://propertyla.com.my",
    logo: "https://propertyla.com.my/assets/img/logo/logo-icon-blue.png",
  };

  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${plusJakartaSans.variable} ${geistSans.variable} ${geistMono.variable}`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />

        <RootProviders>{children}</RootProviders>
      </body>
    </html>
  );
}