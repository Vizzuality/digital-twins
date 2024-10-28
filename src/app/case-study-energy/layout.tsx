import type { Metadata } from "next";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Barcelona Supercomputing Center",
  description: "Barcelona Supercomputing Center",
};

export default function EnergyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <Footer backgroundClass="bg-blue-900" />
    </>
  );
}