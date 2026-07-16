import React from "react";
import Image from "next/image";
import { MessageCircle, ShieldCheck, Award, Leaf } from "lucide-react";

export default function Hero() {
  const waLink = "https://wa.me/6285337280512?text=Halo%20CocoSam%2C%20saya%20tertarik%20untuk%20kerja%20sama%20supply%20VCO%20untuk%20bisnis%20saya";

  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-16 flex items-center bg-gradient-to-br from-brand-cream-100 via-white to-brand-green-50/30 overflow-hidden">
      {/* Decorative leaf background elements */}
      <div className="absolute top-1/4 -left-12 w-64 h-64 bg-brand-green-100/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-brand-brown-100/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Text Content */}
          <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left">
            {/* Tagline Badge */}
            <div className="inline-flex items-center self-center lg:self-start space-x-2 bg-brand-green-100/60 border border-brand-green-200/50 px-4 py-1.5 rounded-full text-brand-green-800 font-semibold text-xs uppercase tracking-wider mb-6 animate-pulse">
              <Leaf className="w-3.5 h-3.5 fill-brand-green-800" />
              <span>Premium B2B Supply — 100% Produk Asli Lombok</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-none mb-6">
              Kemurnian Alami <br className="hidden sm:inline" />
              <span className="text-brand-green-500 bg-gradient-to-r from-brand-green-600 to-brand-green-400 bg-clip-text text-transparent">
                Asli Pulau Lombok
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0 mb-8 leading-relaxed">
              Virgin Coconut Oil (VCO) premium hasil cold-press kelapa segar pesisir Lombok. Diproses higienis untuk menyuplai kebutuhan rutin eksklusif{" "}
              <span className="font-semibold text-brand-green-700">SPA, Hotel, Villa, dan Restoran</span> Anda.
            </p>

            {/* CTA Buttons */}
            <div className="flex justify-center lg:justify-start mb-12">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-3 bg-brand-green-500 hover:bg-brand-green-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>Pesan via WhatsApp</span>
              </a>
            </div>

            {/* Trust Badges */}
            <div className="border-t border-gray-100 pt-8 grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0">
              <div className="flex flex-col items-center lg:items-start">
                <div className="flex items-center space-x-1.5 text-brand-green-600 mb-1">
                  <Leaf className="w-5 h-5 fill-brand-green-100" />
                  <span className="font-bold text-xs uppercase tracking-wider text-gray-800">100% Nature</span>
                </div>
                <span className="text-[11px] text-gray-500 text-center lg:text-left">Tanpa Bahan Kimia</span>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <div className="flex items-center space-x-1.5 text-brand-green-600 mb-1">
                  <Award className="w-5 h-5 text-amber-600" />
                  <span className="font-bold text-xs uppercase tracking-wider text-gray-800">Halal Certified</span>
                </div>
                <span className="text-[11px] text-gray-500 text-center lg:text-left">MUI Indonesia</span>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <div className="flex items-center space-x-1.5 text-brand-green-600 mb-1">
                  <ShieldCheck className="w-5 h-5 text-blue-600" />
                  <span className="font-bold text-xs uppercase tracking-wider text-gray-800">BPOM RI</span>
                </div>
                <span className="text-[11px] text-gray-500 text-center lg:text-left">Terdaftar Resmi</span>
              </div>
            </div>
          </div>

          {/* Image Showcase */}
          <div className="lg:col-span-5 relative flex justify-center">
            {/* Outer soft glow card */}
            <div className="relative w-[320px] h-[440px] sm:w-[360px] sm:h-[485px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white transform hover:scale-[1.02] transition-transform duration-300">
              <Image
                src="/image1.jpg"
                alt="CocoSam Virgin Coconut Oil Lombok Sunset Shot"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Overlay shadow bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              {/* Image floating badge */}
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="text-xs uppercase tracking-widest text-brand-green-300 font-bold mb-1">Original Product Shot</p>
                <h3 className="text-lg font-bold leading-tight">Diproduksi Langsung di Lombok, Nusa Tenggara Barat</h3>
              </div>
            </div>
            {/* Background circular detail */}
            <div className="absolute -z-10 -right-6 -bottom-6 w-full h-full border-2 border-dashed border-brand-green-200 rounded-3xl pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
