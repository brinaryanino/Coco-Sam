"use client";

import React, { useState, useEffect, useRef } from "react";
import { Users, ShoppingBag, Star, ShieldCheck } from "lucide-react";

interface StatsProps {
  activeMitra: number;
  totalSold: number;
}

export default function Stats({ activeMitra, totalSold }: StatsProps) {
  const targetMitra = 42 + activeMitra;
  const targetSold = 1420 + totalSold;

  const [mitraCount, setMitraCount] = useState(0);
  const [soldCount, setSoldCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.1 }
    );

    const currentSection = sectionRef.current;
    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;

    // Animate Mitra Count (0 to targetMitra)
    let mitraStart = 0;
    const mitraDuration = 1200; // 1.2 seconds
    const mitraStep = Math.max(Math.floor(mitraDuration / targetMitra), 15);

    const mitraTimer = setInterval(() => {
      mitraStart += 1;
      if (mitraStart >= targetMitra) {
        setMitraCount(targetMitra);
        clearInterval(mitraTimer);
      } else {
        setMitraCount(mitraStart);
      }
    }, mitraStep);

    // Animate Sold Count (0 to targetSold)
    let soldStart = 0;
    const soldDuration = 1800; // 1.8 seconds
    const soldFps = 40;
    const totalTicks = Math.floor((soldDuration / 1000) * soldFps);
    const soldIncrement = Math.ceil(targetSold / totalTicks);

    const soldTimer = setInterval(() => {
      soldStart += soldIncrement;
      if (soldStart >= targetSold) {
        setSoldCount(targetSold);
        clearInterval(soldTimer);
      } else {
        setSoldCount(soldStart);
      }
    }, 1000 / soldFps);

    return () => {
      clearInterval(mitraTimer);
      clearInterval(soldTimer);
    };
  }, [hasAnimated, targetMitra, targetSold]);

  const cards = [
    {
      title: "Jumlah Mitra CocoSam",
      value: `${mitraCount}+`,
      desc: "Hotel, SPA, Villa, & Restoran aktif mempercayakan supply VCO kepada kami.",
      icon: <Users className="w-6 h-6 text-brand-green-600" />,
      bg: "from-brand-green-50/40 to-brand-green-100/20 border-brand-green-100/50",
    },
    {
      title: "Botol Terjual",
      value: `${soldCount.toLocaleString("id-ID")}+`,
      desc: "Botol minyak kelapa murni kualitas premium didistribusikan di Lombok & sekitarnya.",
      icon: <ShoppingBag className="w-6 h-6 text-brand-brown-600" />,
      bg: "from-brand-brown-50/40 to-brand-brown-100/20 border-brand-brown-100/50",
    },
    {
      title: "Tingkat Kepuasan Mitra",
      value: "99.4%",
      desc: "Survei loyalitas berkala atas ketepatan pengiriman dan standar kemurnian VCO.",
      icon: <Star className="w-6 h-6 text-amber-500 fill-amber-500/10" />,
      bg: "from-amber-50/30 to-amber-100/10 border-amber-100/40",
    },
    {
      title: "Kapasitas Produksi",
      value: "5.000 L / bln",
      desc: "Kemampuan supply stabil IKM Al-Amin untuk memenuhi kebutuhan rantai bisnis B2B.",
      icon: <ShieldCheck className="w-6 h-6 text-blue-500" />,
      bg: "from-blue-50/30 to-blue-100/10 border-blue-100/40",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-16 bg-white relative overflow-hidden border-t border-gray-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className={`p-8 rounded-3xl border bg-gradient-to-br ${card.bg} shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between`}
            >
              <div className="space-y-4">
                <div className="p-3 bg-white rounded-2xl shadow-xs border border-gray-100/50 w-fit">
                  {card.icon}
                </div>
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">
                  {card.title}
                </h3>
              </div>
              <div className="mt-6">
                <p className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                  {card.value}
                </p>
                <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
