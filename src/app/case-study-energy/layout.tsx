import type { Metadata } from "next";

import Footer from "@/components/footer";
import Header from "@/components/header";

export const metadata: Metadata = {
  title: "Barcelona Supercomputing Center - Case Study Energy",
  description: "Barcelona Supercomputing Center",
};

export default function EnergyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header colorClassName="bg-blue-950" />
      {children}
      <Footer backgroundClass="bg-blue-900" />
    </>
  );
}
