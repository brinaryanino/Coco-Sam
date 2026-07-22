import React from "react";
import { MessageCircle, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-green-900 text-brand-green-100 pt-16 pb-8 border-t border-brand-green-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pb-12 border-b border-brand-green-800">
          
          {/* Brand Info */}
          <div className="md:col-span-5">
            <a href="#hero" className="flex items-center space-x-2 mb-4">
              <svg
                className="w-8 h-8 text-brand-green-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="13" r="8" className="fill-brand-green-900/50 stroke-brand-green-400" />
                <path d="M12 5a7 7 0 0 1 7 7" className="stroke-brand-green-300" />
                <path d="M12 9a3 3 0 0 1 3 3" className="stroke-brand-green-400" />
                <path d="M12 5c0-2 2-3 4-3s2 2 1 4-3 1-5-1z" className="fill-brand-green-400 stroke-brand-green-400" />
              </svg>
              <span className="text-2xl font-extrabold text-white tracking-tight">
                Coco<span className="text-brand-brown-400">Sam</span>
              </span>
            </a>
            <p className="text-sm text-brand-green-200 max-w-sm mb-6 leading-relaxed">
              Penyedia utama Virgin Coconut Oil (VCO) 100% dingin dan murni di Lombok. Kami berkomitmen menyuplai produk wellness alami berkualitas tinggi secara higienis bagi kemajuan bisnis spa dan hospitality Anda.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Navigasi Halaman</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#hero" className="hover:text-white transition-colors">Beranda</a></li>
              <li><a href="#manfaat" className="hover:text-white transition-colors">Manfaat VCO</a></li>
              <li><a href="#kenapa-kami" className="hover:text-white transition-colors">Kenapa Pilih Kami</a></li>
              <li><a href="#produk" className="hover:text-white transition-colors">Spesifikasi Produk</a></li>
              <li><a href="#testimoni" className="hover:text-white transition-colors">Testimoni Mitra</a></li>
              <li><a href="#tentang-kami" className="hover:text-white transition-colors">Tentang Kami</a></li>
              <li><a href="/dokumentasi" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors text-brand-green-300 font-semibold flex items-center gap-1">Dokumentasi Foto ↗</a></li>
              <li><a href="/admin" className="opacity-20 hover:opacity-100 transition-opacity text-xs mt-1 block">Portal Admin</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-4">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Kontak Kami</h4>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-start space-x-2.5">
                <MapPin className="w-5 h-5 text-brand-green-400 mt-0.5 flex-shrink-0" />
                <span>Diproduksi di Lombok, Nusa Tenggara Barat, Indonesia</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <MessageCircle className="w-5 h-5 text-brand-green-400 flex-shrink-0" />
                <a href="https://wa.me/6285337280512" className="hover:text-white transition-colors">+62 853-3728-0512</a>
              </li>
              <li className="flex items-center space-x-2.5">
                <svg className="w-5 h-5 text-brand-green-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
                <a href="https://instagram.com/cocosam02" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">@cocosam02</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-green-300">
          <p>© {currentYear} CocoSam Lombok. All rights reserved.</p>
          <p>Diproduksi oleh CocoSam, Lombok - Indonesia</p>
        </div>
      </div>
    </footer>
  );
}
