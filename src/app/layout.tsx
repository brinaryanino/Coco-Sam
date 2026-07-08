import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CocoSam | Virgin Coconut Oil (VCO) Murni B2B Supply Lombok",
  description: "Virgin Coconut Oil (VCO) 100% murni dan dingin (cold-pressed) diproduksi higienis di Lombok. Mitra supply resmi untuk SPA, Restoran, Hotel, dan Villa. Hubungi kami untuk bulk order.",
  keywords: ["VCO Lombok", "Virgin Coconut Oil Lombok", "VCO B2B", "Minyak Kelapa Murni Lombok", "Supply Hotel Lombok", "VCO Spa Lombok", "IKM Al-Amin Lombok"],
  openGraph: {
    title: "CocoSam | Virgin Coconut Oil (VCO) Murni B2B Supply Lombok",
    description: "Virgin Coconut Oil (VCO) 100% murni untuk kebutuhan SPA, Restoran, Hotel, dan Villa di Lombok. Layanan custom size & private label.",
    type: "website",
    locale: "id_ID",
    url: "https://cocosam.com",
    siteName: "CocoSam",
  },
  alternates: {
    canonical: "https://cocosam.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased text-gray-800 bg-brand-cream-100`}>
        {children}
      </body>
    </html>
  );
}
