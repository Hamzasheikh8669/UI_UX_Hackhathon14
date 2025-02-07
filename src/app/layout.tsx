"use client";

import { usePathname } from "next/navigation";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400"], 
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isAdmin = pathname.startsWith("/admin");
  const isOrders = pathname.startsWith("/orders");
  const isCustomers = pathname.startsWith("/customers");
  const isStatistics = pathname.startsWith("/product-data");
  const isReviews = pathname.startsWith("/reviews");
  const studioAndHome =
    !isAdmin && !isOrders && !isCustomers && !isStatistics && !isReviews;

  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={` ${poppins.className} antialiased`}
        >
          {studioAndHome && <Navbar />}
          {children}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
