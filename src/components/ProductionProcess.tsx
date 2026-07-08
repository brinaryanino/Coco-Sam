import React from "react";
import { CheckCircle2 } from "lucide-react";

export default function ProductionProcess() {
  const steps = [
    {
      step: "01",
      title: "Kelapa Pilihan Lombok",
      desc: "Dipanen langsung oleh petani lokal di Lombok. Kami hanya memilih kelapa matang segar berkualitas terbaik untuk menjamin rasa dan aroma premium.",
    },
    {
      step: "02",
      title: "Cold-Press (Tanpa Panas)",
      desc: "Diekstrak dengan metode cold-press mekanis tanpa pemanasan sedikit pun. Suhu dingin konstan menjaga nutrisi, enzim, dan asam laurat tetap utuh.",
    },
    {
      step: "03",
      title: "Penyaringan Higienis",
      desc: "Melalui proses filtrasi ganda dalam lingkungan produksi higienis IKM Al-Amin. Menghasilkan minyak kelapa murni yang bening kristal bebas ampas.",
    },
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden border-t border-gray-50">
      {/* Decorative leaf background */}
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-green-50/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-green-500 bg-brand-green-50 px-4 py-1.5 rounded-full inline-block mb-3">
            PROSES HIGIENIS & ORGANIK
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
            Bagaimana CocoSam Diproduksi?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600">
            Dari pohon kelapa tropis Lombok hingga ke tangan Anda, kami mengawal setiap proses dengan standar kebersihan tertinggi tanpa modifikasi kimiawi.
          </p>
        </div>

        {/* Steps Timeline Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative">
          {/* Decorative connector line on desktop */}
          <div className="hidden lg:block absolute top-16 left-1/6 right-1/6 h-[2px] bg-brand-green-100 z-0" />

          {steps.map((item, index) => (
            <div key={index} className="relative z-10 flex flex-col items-center text-center px-4">
              {/* Number Badge */}
              <div className="w-16 h-16 rounded-full bg-brand-green-500 text-white font-extrabold text-xl flex items-center justify-center shadow-lg border-4 border-white mb-6 group-hover:scale-105 transition-transform">
                {item.step}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed max-w-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Short declaration footer */}
        <div className="mt-16 text-center max-w-xl mx-auto bg-brand-green-50/50 rounded-2xl p-6 border border-brand-green-100/50">
          <p className="text-sm text-brand-green-800 font-semibold flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-brand-green-600 flex-shrink-0" />
            <span>Garansi 100% Bebas Pengawet, Pemutih, dan Pewangi Buatan.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
