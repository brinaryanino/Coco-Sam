import React from "react";
import { CheckCircle2 } from "lucide-react";

export default function Benefits() {
  const benefits = [
    {
      title: "Bantu Menurunkan Kolesterol",
      desc: "Membantu menekan kolesterol jahat (LDL) dan meningkatkan kolesterol baik (HDL).",
    },
    {
      title: "Tingkatkan Metabolisme & Energi",
      desc: "Asam lemak rantai sedang (MCFA) langsung diubah menjadi energi instan oleh tubuh.",
    },
    {
      title: "Meningkatkan Imunitas Tubuh",
      desc: "Kaya asam laurat yang bersifat antivirus, antibakteri, dan antiprotozoa alami.",
    },
    {
      title: "Baik untuk Pencernaan & Kulit",
      desc: "Menjaga kesehatan lambung serta menutrisi kulit dari dalam maupun luar.",
    },
    {
      title: "Menjaga Kesehatan Jantung",
      desc: "Mendukung kelancaran aliran pembuluh darah dan kesehatan otot jantung.",
    },
    {
      title: "Perawatan Tubuh Alami",
      desc: "Sangat baik untuk pelembap kulit alami, hair mask, dan treatment spa tradisional.",
    },
    {
      title: "Pengganti Minyak Sehari-hari",
      desc: "Pilihan sehat pengganti mentega atau minyak sawit untuk masakan/salad dressing.",
    },
    {
      title: "Memperkuat Sistem Imun",
      desc: "Membantu menangkal radikal bebas dengan kandungan antioksidan tinggi.",
    },
    {
      title: "Membantu Mengelola Diabetes",
      desc: "Meningkatkan efisiensi sekresi insulin dan pemanfaatan glukosa darah.",
    },
  ];

  return (
    <section id="manfaat" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-green-500 bg-brand-green-50 px-4 py-1.5 rounded-full inline-block mb-3">
            MANFAAT VCO MURNI
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
            Kebaikan Alami dari Setiap Tetes Virgin Coconut Oil
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600">
            Berikut adalah manfaat penting Virgin Coconut Oil murni yang telah dibuktikan secara ilmiah, baik untuk konsumsi maupun perawatan tubuh luar.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, idx) => (
            <div
              key={idx}
              className="p-6 bg-brand-cream-50/40 rounded-2xl border border-brand-green-100 hover:border-brand-green-500 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  <CheckCircle2 className="w-6 h-6 text-brand-green-500 group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-brand-green-700 transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {benefit.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
