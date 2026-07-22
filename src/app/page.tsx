import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustBadges from "@/components/TrustBadges";
import Benefits from "@/components/Benefits";
import B2BFocus from "@/components/B2BFocus";
import Stats from "@/components/Stats";
import ProductDetail from "@/components/ProductDetail";
import Testimonials from "@/components/Testimonials";
import ProductionProcess from "@/components/ProductionProcess";
import AboutUs from "@/components/AboutUs";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import { getLandingStats } from "@/app/actions/products";

export default async function Home() {
  const statsRes = await getLandingStats();
  const activeMitra = statsRes.activeMitra || 42;
  const totalSold = statsRes.totalSold || 1420;
  const satisfactionRate = statsRes.satisfactionRate || "99.4%";
  const productionCapacity = statsRes.productionCapacity || "5.000 L / bln";

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustBadges />
        <Benefits />
        <B2BFocus />
        <Stats 
          activeMitra={activeMitra} 
          totalSold={totalSold} 
          satisfactionRate={satisfactionRate}
          productionCapacity={productionCapacity}
        />
        <ProductDetail />
        <Testimonials />
        <ProductionProcess />
        <AboutUs />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
