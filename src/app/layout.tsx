"use client";

import { Geist, Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import React, { useEffect } from "react";
import GlobalVideoModal from "@/components/Popup/GlobalVideoModal";
import { VideoProvider } from "@/provider/VideoProvider";
import AppProvider from "@/provider/AppProvider";
import ReduxProvider from "@/redux/provider";
import "slick-carousel/slick/slick.css";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Add scroll detection for profile icon styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        document.body.classList.add("scrolled");
      } else {
        document.body.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // If children is a plain object (e.g. an error object) stringify it so React doesn't try to render it directly.
  const sanitizedChildren =
    typeof children === "object" &&
    children !== null &&
    !React.isValidElement(children)
      ? JSON.stringify(children)
      : children;

  return (
    <html lang="en">
      <head>
        <meta property="og:title" content="PropertyLa - Find Your Dream Property in Malaysia" />
        <meta property="og:description" content="Discover the best properties for sale and rent in Malaysia. Trusted real estate platform with verified agents." />
        <meta property="og:image" content="https://www.propertyla.com.my/assets/img/logo/logo-icon-blue.png" />
        <meta property="og:url" content="https://www.propertyla.com.my" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="PropertyLa" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="PropertyLa - Find Your Dream Property in Malaysia" />
        <meta name="twitter:description" content="Discover the best properties for sale and rent in Malaysia. Trusted real estate platform with verified agents." />
        <meta name="twitter:image" content="https://www.propertyla.com.my/assets/img/logo/logo-icon-blue.png" />
      </head>
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
