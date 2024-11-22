import type { Metadata } from "next";

import { Roboto } from "next/font/google";

import { cn } from "@/lib/utils";

import ContextWrapper from "@/app/contextWrapper";

import "./globals.css";
import Header from "@/components/header";
import Menu from "@/components/menu";

const fontSans = Roboto({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "Barcelona Supercomputing Center",
  description: "Barcelona Supercomputing Center",
  authors: [{ name: "Vizzuality" }],
  robots: { index: true, follow: true },
  viewport: "width=device-width, initial-scale=1",
  openGraph: {
    title: "Barcelona Supercomputing Center",
    description: "Barcelona Supercomputing Center",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/media/media02.jpg",
        width: 630,
        height: 630,
        alt: "Barcelona Supercomputing Center",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Barcelona Supercomputing Center",
    description: "Barcelona Supercomputing Center",
    site: "@bsc",
    creator: "@bsc",
    images: [
      {
        url: "/images/media/media01.jpg",
        width: 1200,
        height: 630,
        alt: "Barcelona Supercomputing Center",
      },
    ],
  },
  icons: [
    { rel: "shortcut icon", url: "/favicon.ico", type: "image/x-icon" },
    { rel: "icon", url: "/images/media/favicon.ico", type: "image/x-icon" },
    {
      rel: "icon",
      url: "/images/media/android-chrome-192x192.png",
      sizes: "192x192",
      type: "image/png",
    },
    {
      rel: "icon",
      url: "/images/media/android-chrome-256x256.png",
      sizes: "256x256",
      type: "image/png",
    },
    {
      rel: "apple-touch-icon",
      url: "/images/media/apple-touch-icon.png",
      sizes: "72x72",
      type: "image/png",
    },
  ],
  manifest: "/images/media/site.webmanifest",
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body
        className={cn(
          "min-h-screen scroll-smooth bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <ContextWrapper>
          <Menu />
          {children}
        </ContextWrapper>
      </body>
    </html>
  );
}
