import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Footer from "@/components/Footer";


const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap", 
});

export const metadata: Metadata = {
  title: "NAMSSN || Unilorin",
  description:
    "The official website for the department of Mathematics, University of Ilorin Chapter.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased bg-[#FFFFFF]`}>
        {children}
        <Analytics />
        <Footer />
      </body>
    </html>
  );
}
