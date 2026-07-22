"use client";

import React, { useState } from "react";
import { Quote, Star, Building2, User } from "lucide-react";

export default function Testimonials() {
  const [filter, setFilter] = useState<"ALL" | "MITRA" | "KONSUMEN">("ALL");

  const testimonials = [
    {
      category: "MITRA",
      categoryLabel: "Mitra Bisnis",
      author: "Matcha Spa Kuta",
      role: "Mitra Bisnis B2B",
      quote: "Kami membeli produk Cocosam ini untuk dijual kembali. Kualitas produknya konsisten, kemasan bagus, dan respon penjual sangat baik. Semoga kualitasnya selalu terjaga.✨✨",
      bgColor: "bg-brand-green-50/40",
      borderColor: "border-brand-green-100",
      highlight: false,
    },
    {
      category: "MITRA",
      categoryLabel: "Mitra Bisnis",
      author: "Nusa Tenggara for Nusantara Foundation",
      role: "Yayasan / Mitra Kerjasama",
      quote: "Cocosam memberikan pelayanan kerja sama yang ramah dan nyaman. Great product!\n\nSaya selalu tertarik dengan produk lokal. Produk yang bahan bakunya berasal dari daerah sendiri, diolah oleh masyarakat lokal, dan turut memberdayakan komunitas di sekitarnya. CocoSam adalah salah satunya. Keren banget!\n\nSelain berkualitas, CocoSam juga bisa menjadi pilihan hadiah atau oleh-oleh yang berkesan untuk membawa sedikit cerita tentang Lombok. Saya sudah beberapa kali menghadiahkan produk CocoSam kepada teman-teman dari luar negeri, dan mereka semua suka. Bravo, CocoSam! 👏",
      bgColor: "bg-brand-cream-50/60",
      borderColor: "border-brand-brown-200/50",
      highlight: true,
    },
    {
      category: "KONSUMEN",
      categoryLabel: "Konsumen",
      author: "Ayu",
      role: "Konsumen Setia",
      quote: "Setelah saya rutin pakai VCO dari CocoSam, rambut saya jadi tidak rontok banget lagi.",
      bgColor: "bg-white",
      borderColor: "border-gray-200/60",
      highlight: false,
    },
    {
      category: "KONSUMEN",
      categoryLabel: "Konsumen",
      author: "Esti",
      role: "Konsumen Setia",
      quote: "Karena saya rutin pakai VCO CocoSam rambut saya jadi jauh lebih lembut dan tebal.",
      bgColor: "bg-brand-green-50/30",
      borderColor: "border-brand-green-100/60",
      highlight: false,
    },
    {
      category: "KONSUMEN",
      categoryLabel: "Konsumen",
      author: "Zakuan",
      role: "Konsumen Setia",
      quote: "Review jujur, ini botol ke-3 VCO CocoSam yang telah saya pakai. Saya biasa pakai untuk sunscreen wajah atau kumur. Manfaatnya melembabkan kulit dan menyehatkan. Saya akan tetap berlangganan dengan VCO CocoSam 👍🏻",
      bgColor: "bg-white",
      borderColor: "border-gray-200/60",
      highlight: false,
    },
  ];

  const filteredTestimonials = filter === "ALL" 
    ? testimonials 
    : testimonials.filter(t => t.category === filter);

  return (
    <section id="testimoni" className="py-24 bg-brand-cream-100/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-green-600 bg-brand-green-100/70 px-4 py-1.5 rounded-full inline-block mb-3 border border-brand-green-200/50">
            TESTIMONI NYATA
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
            Ulasan dari Mitra & Konsumen CocoSam
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600">
            Pengalaman langsung dari mitra bisnis B2B dan pengguna setia Virgin Coconut Oil (VCO) CocoSam.
          </p>

          {/* Category Filter Tabs */}
          <div className="flex justify-center mt-8">
            <div className="inline-flex p-1 bg-white border border-gray-200 rounded-2xl shadow-sm gap-1">
              <button
                onClick={() => setFilter("ALL")}
                className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                  filter === "ALL"
                    ? "bg-brand-green-500 text-white shadow-xs"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                Semua Ulasan ({testimonials.length})
              </button>
              <button
                onClick={() => setFilter("MITRA")}
                className={`flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                  filter === "MITRA"
                    ? "bg-brand-green-500 text-white shadow-xs"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Mitra Bisnis (2)</span>
              </button>
              <button
                onClick={() => setFilter("KONSUMEN")}
                className={`flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                  filter === "KONSUMEN"
                    ? "bg-brand-green-500 text-white shadow-xs"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>Konsumen (3)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Testimonials Masonry/Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {filteredTestimonials.map((t, idx) => (
            <div
              key={idx}
              className={`p-7 rounded-3xl border ${t.borderColor} ${t.bgColor} shadow-sm hover:shadow-md transition-all duration-300 relative flex flex-col justify-between ${
                t.highlight ? "lg:col-span-2" : ""
              }`}
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 text-brand-green-200/50 pointer-events-none">
                <Quote className="w-10 h-10 transform rotate-180 fill-current" />
              </div>

              {/* Content */}
              <div>
                {/* Category Badge & Rating */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full ${
                    t.category === "MITRA" 
                      ? "bg-brand-green-100 text-brand-green-800 border border-brand-green-200/60" 
                      : "bg-blue-50 text-blue-800 border border-blue-100"
                  }`}>
                    {t.categoryLabel}
                  </span>
                  <div className="flex space-x-0.5 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                </div>

                {/* Quote text */}
                <div className="text-gray-700 text-sm leading-relaxed mb-6 whitespace-pre-line relative z-10">
                  &ldquo;{t.quote}&rdquo;
                </div>
              </div>

              {/* Author Info */}
              <div className="flex items-center space-x-3 border-t border-gray-200/40 pt-4 mt-2">
                <div className="w-10 h-10 rounded-full bg-brand-green-600 text-white font-extrabold flex items-center justify-center text-sm shadow-inner flex-shrink-0">
                  {t.author.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm leading-snug">{t.author}</h4>
                  <p className="text-xs text-gray-500 font-medium">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
