import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const spaceGrotesk = localFont({
  src: [
    {
      path: "../fonts/SpaceGrotesk-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/SpaceGrotesk-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/SpaceGrotesk-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-space-grotesk",
  display: "swap",
});

const roboto = localFont({
  src: [
    {
      path: "../fonts/Roboto-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Roboto-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/Roboto-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://petfeb.com"),
  title: {
    default: "Pet-Feb Solar | Reliable Clean Energy Solutions in Nigeria",
    template: "%s | Pet-Feb Solar",
  },
  description:
    "Nigeria's trusted clean energy partner. High-efficiency solar kits, smart hybrid inverters, lithium battery storage, professional installation, and Buy Small solar financing.",
  keywords: [
    "Solar Nigeria",
    "Pet-Feb Solar",
    "Solar inverters Port Harcourt",
    "Buy Small solar financing",
    "Solar panels Nigeria",
    "Lithium battery solar system",
    "Commercial solar installation",
  ],
  authors: [{ name: "Pet-Feb Solar" }],
  creator: "Pet-Feb Solar",
  publisher: "Pet-Feb Solar",
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "https://petfeb.com",
    siteName: "Pet-Feb Solar",
    title: "Pet-Feb Solar | Reliable Clean Energy Solutions in Nigeria",
    description:
      "Nigeria's trusted clean energy partner. High-efficiency solar kits, smart hybrid inverters, lithium battery storage, and flexible Buy Small solar financing.",
    images: [
      {
        url: "/api/websitepic/hero",
        width: 1200,
        height: 630,
        alt: "Pet-Feb Solar Clean Energy Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pet-Feb Solar | Reliable Clean Energy Solutions in Nigeria",
    description:
      "Nigeria's trusted clean energy partner. High-efficiency solar kits, smart hybrid inverters, lithium battery storage, and flexible Buy Small solar financing.",
    images: ["/api/websitepic/hero"],
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${spaceGrotesk.variable} ${roboto.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
