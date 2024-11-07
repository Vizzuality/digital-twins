import type { Metadata } from "next";
import { Roboto } from "next/font/google"
import { cn } from "@/lib/utils"
import "./globals.css";
import Header from "@/components/header";
import Menu from "@/components/menu";

const fontSans = Roboto({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "700", "900"],
});

import ContextWrapper from "@/app/contextWrapper";
export const metadata: Metadata = {
  title: "Barcelona Supercomputing Center",
  description: "Barcelona Supercomputing Center",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased scroll-smooth",
        fontSans.variable
      )}>
        <ContextWrapper>
          <Header />
          <Menu />
          {children}
        </ContextWrapper>
      </body>
    </html >
  );
}
