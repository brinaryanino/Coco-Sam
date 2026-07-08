import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustBadges from "@/components/TrustBadges";
import Benefits from "@/components/Benefits";
import B2BFocus from "@/components/B2BFocus";
import ProductDetail from "@/components/ProductDetail";
import Testimonials from "@/components/Testimonials";
import ProductionProcess from "@/components/ProductionProcess";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustBadges />
        <Benefits />
        <B2BFocus />
        <ProductDetail />
        <Testimonials />
        <ProductionProcess />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
