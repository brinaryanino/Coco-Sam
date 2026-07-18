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
  const activeMitra = statsRes.activeMitra || 0;
  const totalSold = statsRes.totalSold || 0;

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustBadges />
        <Benefits />
        <B2BFocus />
        <Stats activeMitra={activeMitra} totalSold={totalSold} />
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
