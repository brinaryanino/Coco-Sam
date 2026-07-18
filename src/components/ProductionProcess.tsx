"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  CheckCircle2,
  TreePine,
  Sparkles,
  Zap,
  ShieldCheck,
  Package,
  Truck,
  ArrowRight,
} from "lucide-react";

export default function ProductionProcess() {
  const [activeStep, setActiveStep] = useState(0);

    const steps = [
    {
      title: "Sumber Kelapa Pilihan",
      shortTitle: "Sumber Kelapa",
      desc: "Dipanen langsung dari perkebunan pesisir Pulau Lombok oleh petani lokal mitra CocoSam. Kami hanya memilih kelapa matang segar pilihan untuk menghasilkan VCO dengan kualitas terbaik, rasa lembut, dan aroma khas kelapa segar.",
      image: "/fresh-coconut.jpg",
      icon: <TreePine className="w-6 h-6" />,
      highlights: ["Kelapa Pesisir Lombok", "Petani Lokal Mitra", "Matang & Segar"],
    },
    {
      title: "Proses Pembersihan",
      shortTitle: "Pembersihan",
      desc: "Kelapa segar yang dikupas segera dipisahkan dari tempurungnya. Daging kelapa dicuci bersih menggunakan air steril mengalir secara higienis untuk mengeliminasi potensi kontaminan sebelum masuk ke tahap ekstraksi.",
      image: "/pembersihan.jpg",
      icon: <Sparkles className="w-6 h-6" />,
      highlights: ["Pencucian Air Steril", "Higienitas Terjaga", "Bebas Kontaminan"],
    },
    {
      title: "Cold Process (Cold Press)",
      shortTitle: "Cold Process",
      desc: "Diekstrak dengan metode cold-press mekanis tanpa pemanasan sedikit pun (non-thermal). Suhu dingin konstan selama pengepresan menjaga kandungan asam laurat, antioksidan, dan nutrisi alami kelapa tetap utuh sempurna.",
      image: "/cold-process.jpg",
      icon: <Zap className="w-6 h-6" />,
      highlights: ["Metode Non-Thermal", "Kandungan Nutrisi Utuh", "Asam Laurat Tinggi"],
    },
    {
      title: "Proses Filterisasi",
      shortTitle: "Filterisasi",
      desc: "Minyak kelapa murni disaring berlapis menggunakan mikro-filter steril untuk memisahkan sisa ampas kelapa dan air secara sempurna, menghasilkan VCO dengan tingkat kejernihan tinggi tanpa merusak nutrisi kelapa.",
      image: "/filterisasi.jpg",
      icon: <Sparkles className="w-6 h-6" />,
      highlights: ["Penyaringan Berlapis", "Mikro-Filter Steril", "Kadar Air Terendah"],
    },
    {
      title: "Quality Control (QC) Ketat",
      shortTitle: "QC Ketat",
      desc: "Setiap batch minyak kelapa murni diuji secara teliti untuk memastikan kadar air terendah (< 0.1%), kejernihan kristal bening, serta aroma khas kelapa segar bebas bau tengik sesuai standar izin edar P-IRT dan Halal Indonesia.",
      image: "/image5.jpg",
      icon: <ShieldCheck className="w-6 h-6" />,
      highlights: ["Uji Kejernihan", "Kadar Air < 0.1%", "Izin P-IRT & Halal"],
    },
    {
      title: "Pengemasan & Distribusi B2B",
      shortTitle: "Distribusi B2B",
      desc: "VCO dikemas secara steril ke wadah food-grade premium dan didistribusikan secara terjadwal langsung ke Hotel, Spa, Villa, dan Restoran mitra. Kami menjamin armada khusus untuk ketepatan waktu pengiriman.",
      image: "/distribusi-proses.jpg",
      icon: <Truck className="w-6 h-6" />,
      highlights: ["Armada Khusus B2B", "Kemasan Premium", "Pengiriman Terjadwal"],
    },
  ];

  // Auto advance timeline every 10 seconds (unless user clicked)
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 10000);
    return () => clearInterval(timer);
  }, [steps.length]);

  return (
    <section className="py-24 bg-brand-cream-50 relative overflow-hidden border-t border-brand-green-100/30">
      {/* Background gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-green-50/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-brown-50/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-green-600 bg-brand-green-100/60 px-4 py-1.5 rounded-full inline-block mb-3 border border-brand-green-200/50">
            KUALITAS EKSTRA PREMIUM & ORGANIK
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
            Alur Produksi VCO CocoSam
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600">
            Dari pohon kelapa eksotis Lombok hingga ke tangan Anda, kami mengawal setiap proses dengan standar kebersihan tertinggi dan metode alami.
          </p>
        </div>

        {/* Timeline Navigation - Horizontal on desktop, grid/scroll on mobile */}
        <div className="mb-12 overflow-x-auto pb-4 scrollbar-none">
          <div className="flex items-center justify-between min-w-[768px] relative px-4">
            {/* Background Line */}
            <div className="absolute left-10 right-10 top-1/2 -translate-y-1/2 h-1 bg-gray-200/80 -z-10 rounded-full">
              <div
                className="h-full bg-gradient-to-r from-brand-green-500 to-brand-green-600 rounded-full transition-all duration-500"
                style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
              />
            </div>

            {/* Timeline Steps */}
            {steps.map((item, index) => {
              const isActive = index === activeStep;
              const isPast = index < activeStep;

              return (
                <button
                  key={index}
                  onClick={() => setActiveStep(index)}
                  className="flex flex-col items-center group relative focus:outline-none"
                  style={{ width: "100px" }}
                >
                  {/* Step node/circle */}
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center border-4 transition-all duration-300 shadow-sm ${
                      isActive
                        ? "bg-brand-green-500 border-white text-white scale-110 ring-4 ring-brand-green-100"
                        : isPast
                        ? "bg-brand-green-50 border-brand-green-200 text-brand-green-600"
                        : "bg-white border-gray-200 text-gray-400 hover:border-brand-green-300 hover:text-brand-green-600"
                    }`}
                  >
                    {item.icon}
                  </div>

                  {/* Step label */}
                  <span
                    className={`mt-3 text-xs text-center font-bold tracking-tight transition-colors duration-200 ${
                      isActive ? "text-brand-green-700 font-extrabold" : "text-gray-500"
                    }`}
                  >
                    0{index + 1}. {item.shortTitle}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Step Content Showcase Card */}
        <div className="bg-white rounded-3xl border border-brand-green-100/50 shadow-xl overflow-hidden transform transition-all duration-500">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Image Section */}
            <div className="lg:col-span-5 relative h-64 sm:h-80 lg:h-auto min-h-[300px]">
              <Image
                src={steps[activeStep].image}
                alt={steps[activeStep].title}
                fill
                className="object-cover transition-all duration-500 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/50 via-transparent to-transparent pointer-events-none" />
              {/* Step indicator badge */}
              <div className="absolute bottom-6 left-6 text-white z-10">
                <span className="text-3xl font-extrabold text-brand-green-300 tracking-wider">
                  0{activeStep + 1}
                </span>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-200 mt-1">
                  LANGKAH DARI 06
                </p>
              </div>
            </div>

            {/* Description Text Section */}
            <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-extrabold text-gray-900 mb-4 transition-colors">
                  {steps[activeStep].title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  {steps[activeStep].desc}
                </p>

                {/* Highlights checkmarks */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {steps[activeStep].highlights.map((h, i) => (
                    <div
                      key={i}
                      className="flex items-center space-x-2 bg-brand-green-50/50 border border-brand-green-100/30 px-3 py-2 rounded-xl text-xs font-semibold text-brand-green-800"
                    >
                      <CheckCircle2 className="w-4 h-4 text-brand-green-600 flex-shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation help */}
              <div className="mt-10 pt-6 border-t border-gray-100 flex justify-between items-center text-xs">
                <span className="text-gray-400 font-semibold uppercase tracking-wider">
                  Auto-Advance aktif (10 dtk)
                </span>
                <button
                  onClick={() => setActiveStep((prev) => (prev + 1) % steps.length)}
                  className="flex items-center gap-1.5 text-brand-green-600 hover:text-brand-green-800 font-bold hover:underline"
                >
                  <span>Langkah Selanjutnya</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quality Seal Footer */}
        <div className="mt-16 text-center max-w-xl mx-auto bg-brand-green-50/50 rounded-2xl p-5 border border-brand-green-100/50">
          <p className="text-xs sm:text-sm text-brand-green-800 font-bold flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-brand-green-600 flex-shrink-0" />
            <span>Garansi 100% Organik: Bebas bahan kimia pengawet, pemutih, dan pewangi buatan.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
