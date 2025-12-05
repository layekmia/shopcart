import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ClerkProvider } from "@clerk/nextjs"

export const metadata: Metadata = {
  title: {
    template: "%s -- Shopcart online store",
    default: "Shopcart online store"
  },
  description: "Shopcart online store, Your one stop shop for all you needs"
}

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],  // required
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${poppins.className}`}
        >
          <Header />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
