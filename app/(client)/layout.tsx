import Footer from "@/components/Footer";
import Header from "@/components/Header";
import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s -- Shopcart online store",
    default: "Shopcart online store",
  },
  description: "Shopcart online store, Your one stop shop for all you needs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
