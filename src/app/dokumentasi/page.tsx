"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Camera, ExternalLink, Image as ImageIcon, X, Sparkles, MessageCircle } from "lucide-react";

export default function DokumentasiPage() {
  const [activeCategory, setActiveCategory] = useState<"ALL" | "PROSES" | "MITRA" | "KONSUMEN">("ALL");
  const [selectedImage, setSelectedImage] = useState<{ src: string; title: string; category: string; categoryLabel: string; desc: string } | null>(null);

  const photos = [
    {
      src: "/header-img.png",
      title: "CocoSam Premium Virgin Coconut Oil",
      category: "MITRA",
      categoryLabel: "Klien & Mitra",
      desc: "Foto dokumentasi produk CocoSam VCO murni dingin untuk pasokan hotel & resort.",
    },
    {
      src: "/fresh-coconut.jpg",
      title: "Bahan Baku Kelapa Pesisir Lombok",
      category: "PROSES",
      categoryLabel: "Proses Produksi",
      desc: "Pemilihan kelapa pilihan langsung dari petani kelapa lokal di pesisir Lombok.",
    },
    {
      src: "/pembersihan.jpg",
      title: "Pembersihan & Pencucian Steril",
      category: "PROSES",
      categoryLabel: "Proses Produksi",
      desc: "Kelapa segar dikupas dan dicuci higienis mengalir dengan air steril.",
    },
    {
      src: "/cold-process.jpg",
      title: "Ekstraksi Cold-Process (Non-Thermal)",
      category: "PROSES",
      categoryLabel: "Proses Produksi",
      desc: "Proses ekstraksi tanpa pemanasan untuk mengunci nutrisi & asam laurat alami.",
    },
    {
      src: "/filterisasi.jpg",
      title: "Filterisasi Mikro Berlapis & QC",
      category: "PROSES",
      categoryLabel: "Proses Produksi",
      desc: "Penyaringan berlapis hingga menghasilkan minyak kelapa jernih kristal.",
    },
    {
      src: "/distribusi-proses.jpg",
      title: "Pengemasan & Distribusi B2B",
      category: "MITRA",
      categoryLabel: "Klien & Mitra",
      desc: "Kemasan steril siap didistribusikan ke Spa, Hotel, Villa, dan Restoran mitra.",
    },
    {
      src: "/image4.png",
      title: "Produk VCO Kemasan Premium",
      category: "KONSUMEN",
      categoryLabel: "Konsumen & Oleh-oleh",
      desc: "Pilihan favorit wisatawan & konsumen untuk hadiah oleh-oleh khas Lombok.",
    },
    {
      src: "/struktur-organisasi.jpg",
      title: "Tim & Pengurus Usaha CocoSam",
      category: "MITRA",
      categoryLabel: "Klien & Mitra",
      desc: "Bagan susunan kepengurusan kelompok usaha pemberdayaan masyarakat desa CocoSam.",
    },
    {
      src: "/image1.jpg",
      title: "Kunjungan & Edukasi Mitra",
      category: "MITRA",
      categoryLabel: "Klien & Mitra",
      desc: "Dokumentasi kunjungan kerja sama mitra bisnis B2B di Lombok.",
    },
    {
      src: "/image2.jpg",
      title: "Botol VCO 100ml & 1L Food-Grade",
      category: "KONSUMEN",
      categoryLabel: "Konsumen & Oleh-oleh",
      desc: "Kemasan travel size dan refilling ukuran 1 Liter untuk kebutuhan harian.",
    },
    {
      src: "/image3.jpg",
      title: "Pengujian Kualitas & Aroma",
      category: "PROSES",
      categoryLabel: "Proses Produksi",
      desc: "Pengujian bebas bau tengik dengan standar izin edar P-IRT & Halal.",
    },
    {
      src: "/image5.jpg",
      title: "Pengawasan Mutu Akhir (QC)",
      category: "PROSES",
      categoryLabel: "Proses Produksi",
      desc: "Kadar air terendah (< 0.1%) menjamin masa simpan alami tanpa bahan kimia.",
    },
  ];

  const filteredPhotos = activeCategory === "ALL" 
    ? photos 
    : photos.filter(p => p.category === activeCategory);

  const waLink = "https://wa.me/6285337280512?text=Halo%20CocoSam%2C%20saya%20tertarik%20melihat%20dokumentasi%20dan%20ingin%20bekerja%20sama";

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-cream-50 via-white to-brand-green-50/20 text-gray-800">
      {/* Top Header Navigation */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-bold text-gray-700 hover:text-brand-green-700 bg-gray-50 hover:bg-gray-100 px-4 py-2 rounded-xl transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Web Utama</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight text-brand-green-700 font-sans hidden sm:inline">
              Coco<span className="text-brand-brown-500">Sam</span>
            </span>
            <span className="text-xs bg-brand-green-100 text-brand-green-800 font-bold px-3 py-1 rounded-full border border-brand-green-200/60">
              Galeri Dokumentasi
            </span>
          </div>

          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-brand-green-500 hover:bg-brand-green-600 text-white text-xs sm:text-sm font-bold px-4 py-2 rounded-xl shadow-xs transition-all"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span className="hidden sm:inline">Hubungi via WA</span>
          </a>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Banner Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-green-600 bg-brand-green-100/70 px-4 py-1.5 rounded-full inline-block border border-brand-green-200/50">
            DOKUMENTASI DILENGKAPI FOTO NYATA
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
            Galeri Kegiatan & Dokumentasi CocoSam
          </h1>
          <p className="text-gray-600 text-base sm:text-lg">
            Dokumentasi alur proses produksi higienis, pengujian kualitas, serta foto bersama mitra bisnis B2B, klien, dan konsumen setia di Lombok.
          </p>

          {/* Filter Category Tabs */}
          <div className="flex justify-center pt-4">
            <div className="inline-flex p-1 bg-white border border-gray-200 rounded-2xl shadow-xs gap-1 flex-wrap justify-center">
              <button
                onClick={() => setActiveCategory("ALL")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeCategory === "ALL"
                    ? "bg-brand-green-500 text-white shadow-xs"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                Semua Foto ({photos.length})
              </button>
              <button
                onClick={() => setActiveCategory("PROSES")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeCategory === "PROSES"
                    ? "bg-brand-green-500 text-white shadow-xs"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                Proses Produksi (7)
              </button>
              <button
                onClick={() => setActiveCategory("MITRA")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeCategory === "MITRA"
                    ? "bg-brand-green-500 text-white shadow-xs"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                Klien & Mitra (3)
              </button>
              <button
                onClick={() => setActiveCategory("KONSUMEN")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeCategory === "KONSUMEN"
                    ? "bg-brand-green-500 text-white shadow-xs"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                Konsumen & Oleh-oleh (2)
              </button>
            </div>
          </div>
        </div>

        {/* Photos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedImage(photo)}
              className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              {/* Image Container */}
              <div className="relative h-64 w-full overflow-hidden bg-gray-100">
                <Image
                  src={photo.src}
                  alt={photo.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-white/90 backdrop-blur-xs text-brand-green-800 text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full shadow-xs">
                    {photo.categoryLabel}
                  </span>
                </div>

                {/* Hover Zoom Icon */}
                <div className="absolute bottom-4 right-4 z-10 w-9 h-9 rounded-full bg-white/80 text-gray-900 flex items-center justify-center shadow-md transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                  <Camera className="w-4 h-4" />
                </div>
              </div>

              {/* Card Footer Content */}
              <div className="p-5">
                <h3 className="font-bold text-gray-900 text-base leading-snug group-hover:text-brand-green-600 transition-colors">
                  {photo.title}
                </h3>
                <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                  {photo.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Lightbox / High-Res Preview Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-800">
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image Box */}
            <div className="relative h-[65vh] w-full bg-black">
              <Image
                src={selectedImage.src}
                alt={selectedImage.title}
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Modal Caption Box */}
            <div className="p-6 bg-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-t border-gray-100">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand-green-600 bg-brand-green-50 px-3 py-1 rounded-full">
                  {selectedImage.categoryLabel}
                </span>
                <h3 className="text-xl font-bold text-gray-900 mt-1">{selectedImage.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{selectedImage.desc}</p>
              </div>
              <button
                onClick={() => setSelectedImage(null)}
                className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold rounded-xl transition-all"
              >
                Tutup Pratinjau
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-8 text-center text-xs text-gray-500">
        <p>© {new Date().getFullYear()} CocoSam Lombok. Semua hak cipta dilindungi.</p>
      </footer>
    </div>
  );
}
