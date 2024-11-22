import type { Metadata } from "next";

import Footer from "@/components/footer";
import Header from "@/components/header";

export const metadata: Metadata = {
  title: "Barcelona Supercomputing Center",
  description: "Barcelona Supercomputing Center",
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
