import { Geist, Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import React from "react";
import GlobalVideoModal from "@/components/Popup/GlobalVideoModal";
import { VideoProvider } from "@/provider/VideoProvider";
import AppProvider from "@/provider/AppProvider";
import ReduxProvider from "@/redux/provider";
import "slick-carousel/slick/slick.css";
import type { Metadata } from "next";
import { Toaster } from "sonner";
import "swiper/css/bundle";
import GoogleMapsProvider from "../components/HeroBanner/subComponents/GoogleMapsProvider";
import "./globals.scss";

// Load Plus Jakarta Sans from Google Fonts
const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

// Load Geist Sans & Geist Mono
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Property for Sale & Rent in Malaysia | Houses, Condos & Apartments",
  description:
    "Find the latest properties for sale and rent in Malaysia including houses, condos, apartments and commercial properties. Search properties in Kuala Lumpur, Selangor, Penang and across Malaysia.",
  openGraph: {
    title: "Propertyl - Find Your Dream Property",
    description:
      "Search thousands of verified properties for sale or rent in Malaysia.",
    url: "https://propertyla.com.my",
    siteName: "Propertyla",
    images: [
      {
        url: "https://propertyla.com.my/_next/static/media/home-bg.8927b835.jpg",
        width: 1200,
        height: 800,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // If children is a plain object (e.g. an error object) stringify it so React doesn't try to render it directly.
  const sanitizedChildren =
    typeof children === "object" &&
    children !== null &&
    !React.isValidElement(children)
      ? JSON.stringify(children)
      : children;

  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${plusJakartaSans.variable} ${geistSans.variable} ${geistMono.variable}`}
      >
        <ReduxProvider>
          <VideoProvider>
            <AppProvider>
              <GoogleMapsProvider>{sanitizedChildren}</GoogleMapsProvider>
            </AppProvider>
            <Toaster position="top-center" richColors />
            <GlobalVideoModal />
          </VideoProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
