import React from "react";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

export default function ProductionProcess() {
  const steps = [
    {
      step: "01",
      title: "Kelapa Pilihan Lombok",
      desc: "Dipanen langsung oleh petani lokal di Lombok. Kami hanya memilih kelapa matang segar berkualitas terbaik untuk menjamin rasa dan aroma premium.",
      image: "/image3.jpg",
    },
    {
      step: "02",
      title: "Cold-Press (Tanpa Panas)",
      desc: "Diekstrak dengan metode cold-press mekanis tanpa pemanasan sedikit pun. Suhu dingin konstan menjaga nutrisi, enzim, dan asam laurat tetap utuh.",
      image: "/image4.jpg",
    },
    {
      step: "03",
      title: "Penyaringan Higienis",
      desc: "Melalui proses filtrasi ganda dalam lingkungan produksi higienis IKM Al-Amin. Menghasilkan minyak kelapa murni yang bening kristal bebas ampas.",
      image: "/image5.jpg",
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {steps.map((item, index) => (
            <div key={index} className="relative z-10 flex flex-col items-center text-center group">
              {/* Step Image Card */}
              <div className="relative w-full h-56 sm:h-64 rounded-3xl overflow-hidden shadow-md border-4 border-white mb-6 transform group-hover:scale-[1.02] transition-transform duration-300">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                {/* Number Badge Overlay */}
                <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-brand-green-500 text-white font-bold flex items-center justify-center shadow-md border-2 border-white text-sm">
                  {item.step}
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-brand-green-700 transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed max-w-sm">
                {item.desc}
              </p>
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
