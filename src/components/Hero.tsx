import React from "react";
import Image from "next/image";
import { MessageCircle, ShieldCheck, Award, Leaf } from "lucide-react";

export default function Hero() {
  const waLink = "https://wa.me/6285337280512?text=Halo%20CocoSam%2C%20saya%20tertarik%20untuk%20kerja%20sama%20supply%20VCO%20untuk%20bisnis%20saya";

  return (
    <section id="hero" className="relative min-h-[90vh] pt-24 pb-12 sm:pt-28 sm:pb-16 flex items-center bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          {/* Text Content */}
          <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left">
            {/* Tagline Badge */}
            <div className="inline-flex items-center self-center lg:self-start space-x-2 bg-brand-green-100/60 border border-brand-green-200/50 px-3.5 py-1.5 rounded-full text-brand-green-800 font-semibold text-xs uppercase tracking-wider mb-5 sm:mb-6 animate-pulse">
              <Leaf className="w-3.5 h-3.5 fill-brand-green-800" />
              <span>100% Produk Asli Lombok</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight sm:leading-none mb-4 sm:mb-6">
              Kemurnian Alami <br className="hidden sm:inline" />
              <span className="text-brand-green-500 bg-gradient-to-r from-brand-green-600 to-brand-green-400 bg-clip-text text-transparent">
                Asli Pulau Lombok
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0 mb-6 sm:mb-8 leading-relaxed">
              Virgin Coconut Oil (VCO) premium hasil cold-press kelapa segar pesisir Lombok. Diproses higienis untuk menyuplai kebutuhan rutin eksklusif{" "}
              <span className="font-semibold text-brand-green-700">SPA, Hotel, Villa, dan Restoran</span> Anda.
            </p>

            {/* CTA Buttons */}
            <div className="flex justify-center lg:justify-start mb-8 sm:mb-12">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 bg-brand-green-500 hover:bg-brand-green-600 text-white px-7 py-3.5 sm:px-8 sm:py-4 rounded-full font-bold text-base sm:text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>Pesan via WhatsApp</span>
              </a>
            </div>

            {/* Trust Badges */}
            <div className="border-t border-gray-100 pt-6 sm:pt-8 grid grid-cols-3 gap-2 sm:gap-4 max-w-md mx-auto lg:mx-0">
              <div className="flex flex-col items-center lg:items-start">
                <div className="flex items-center space-x-1 sm:space-x-1.5 text-brand-green-600 mb-1">
                  <Leaf className="w-4 h-4 sm:w-5 sm:h-5 fill-brand-green-100" />
                  <span className="font-bold text-[10px] sm:text-xs uppercase tracking-wider text-gray-800">100% Nature</span>
                </div>
                <span className="text-[10px] sm:text-[11px] text-gray-500 text-center lg:text-left">Tanpa Bahan Kimia</span>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <div className="flex items-center space-x-1 sm:space-x-1.5 text-brand-green-600 mb-1">
                  <Award className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" />
                  <span className="font-bold text-[10px] sm:text-xs uppercase tracking-wider text-gray-800">Halal Certified</span>
                </div>
                <span className="text-[10px] sm:text-[11px] text-gray-500 text-center lg:text-left">MUI Indonesia</span>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <div className="flex items-center space-x-1 sm:space-x-1.5 text-brand-green-600 mb-1">
                  <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                  <span className="font-bold text-[10px] sm:text-xs uppercase tracking-wider text-gray-800">Izin P-IRT</span>
                </div>
                <span className="text-[10px] sm:text-[11px] text-gray-500 text-center lg:text-left">Dinas Kesehatan</span>
              </div>
            </div>
          </div>

          {/* Image Showcase */}
          <div className="lg:col-span-5 relative flex justify-center mt-4 lg:mt-0">
            <div className="relative w-full max-w-[280px] xs:max-w-[320px] sm:max-w-[360px] lg:max-w-[420px] aspect-[4/5] rounded-3xl overflow-hidden bg-white">
              <Image
                src="/hero-image.png"
                alt="CocoSam Virgin Coconut Oil Lombok"
                fill
                priority
                className="object-contain"
                sizes="(max-width: 768px) 90vw, 40vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
