import React from "react";
import { MessageCircle } from "lucide-react";

export default function CTA() {
  const waLink = "https://wa.me/6285337280512?text=Halo%20CocoSam%2C%20saya%20tertarik%20untuk%20kerja%20sama%20supply%20VCO%20untuk%20bisnis%20saya";

  return (
    <section id="kontak" className="py-20 bg-brand-green-800 text-white relative overflow-hidden">
      {/* Background Decorative Rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-brand-green-700/50 rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] border border-brand-green-600/30 rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <span className="text-xs font-extrabold uppercase tracking-widest text-brand-green-300 bg-brand-green-900/60 border border-brand-green-700 px-4 py-1.5 rounded-full inline-block mb-4">
          B2B PARTNERSHIP
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
          Siap Supply Kebutuhan Bisnis Anda?
        </h2>
        <p className="text-brand-green-100 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Hubungi tim penjualan kami sekarang juga untuk mendiskusikan harga khusus bulk order, custom size, kemasan private label, atau kontrak supply rutin.
        </p>

        <div className="flex flex-col items-center">
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-3 bg-white hover:bg-brand-cream-50 text-brand-green-800 hover:text-brand-green-900 px-8 py-4.5 rounded-full font-extrabold text-lg sm:text-xl shadow-2xl hover:shadow-white/10 hover:-translate-y-0.5 transition-all duration-200"
          >
            <MessageCircle className="w-6 h-6 fill-brand-green-800" />
            <span>Chat via WhatsApp Business</span>
          </a>
          <span className="text-xs text-brand-green-200 mt-4 flex items-center space-x-1.5">
            <span className="inline-block w-2.5 h-2.5 bg-green-400 rounded-full animate-ping" />
            <span>Customer service kami online siap melayani negosiasi</span>
          </span>
        </div>
      </div>
    </section>
  );
}
