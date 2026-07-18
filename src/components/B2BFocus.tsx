import React from "react";
import { Truck, Percent, Sparkles, ShieldCheck } from "lucide-react";

export default function B2BFocus() {
  const points = [
    {
      icon: <Truck className="w-8 h-8 text-brand-green-600" />,
      title: "Supply Rutin & Konsisten",
      desc: "Menjamin ketersediaan stok VCO murni sepanjang tahun dengan jadwal pengiriman terjadwal langsung ke bisnis Anda di Lombok dan sekitarnya.",
    },
    {
      icon: <Sparkles className="w-8 h-8 text-brand-green-600" />,
      title: "Custom Size & Repacking",
      desc: "Butuh kemasan custom untuk kamar hotel atau amenities spa? Kami melayani custom repacking yang disesuaikan dengan branding logo dan brand Anda.",
    },
    {
      icon: <Percent className="w-8 h-8 text-brand-green-600" />,
      title: "Harga Grosir Terbaik",
      desc: "Dapatkan skema harga grosir (bulk pricing) yang bersaing untuk pemesanan volume besar demi efisiensi biaya operasional bisnis Anda.",
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-brand-green-600" />,
      title: "Kualitas Premium Terpercaya",
      desc: "Diproduksi secara higienis di Lombok. Telah bersertifikasi Halal & memiliki izin edar P-IRT untuk memberikan jaminan keamanan bagi tamu dan pelanggan Anda.",
    },
  ];

  return (
    <section id="kenapa-kami" className="py-24 bg-brand-cream-100/50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-green-50/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-brown-500 bg-brand-brown-100/40 px-4 py-1.5 rounded-full inline-block mb-3">
            MITRA B2B TERPERCAYA
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
            Kenapa Memilih CocoSam Untuk Bisnis Anda?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600">
            Kami memahami kebutuhan spesifik industri hospitality dan wellness. CocoSam siap menjadi partner supply VCO murni andalan hotel, villa, spa, dan restoran Anda.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {points.map((point, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-center text-center"
            >
              <div className="p-4 bg-brand-green-50 rounded-2xl mb-6 flex items-center justify-center">
                {point.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">{point.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{point.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
