"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ListChecks } from "lucide-react";

export default function ProductDetail() {
  const images = ["/image2.jpg", "/image3.jpg", "/image4.jpg", "/image5.jpg"];
  const [activeImage, setActiveImage] = useState("/image2.jpg");

  return (
    <section id="produk" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Product Image & Gallery */}
          <div className="lg:col-span-6 flex flex-col items-center relative">
            <div className="relative w-[320px] h-[440px] sm:w-[420px] sm:h-[560px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white transform hover:scale-[1.01] transition-transform duration-300">
              <Image
                src={activeImage}
                alt="CocoSam Virgin Coconut Oil Product Detail Shot"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white text-left">
                <span className="bg-brand-green-500 text-white font-bold text-xs uppercase px-3 py-1 rounded-full mb-2 inline-block">
                  Premium Quality
                </span>
                <h3 className="text-xl font-bold">100% Virgin Coconut Oil Murni</h3>
                <p className="text-xs text-brand-green-200 mt-1">Processed without chemical additives or heating.</p>
              </div>
            </div>
            {/* Background absolute frame */}
            <div className="absolute -z-10 -left-4 -top-4 w-[320px] h-[440px] sm:w-[420px] sm:h-[560px] border-2 border-dashed border-brand-brown-200 rounded-3xl pointer-events-none" />

            {/* Thumbnails Gallery */}
            <div className="flex space-x-3 mt-8">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(img)}
                  className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                    activeImage === img
                      ? "border-brand-green-500 scale-105 ring-2 ring-brand-green-200"
                      : "border-gray-200 opacity-60 hover:opacity-100 hover:scale-105"
                  }`}
                  aria-label={`Show product image ${i + 1}`}
                >
                  <Image
                    src={img}
                    alt={`Product thumbnail ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Product Info */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <span className="text-xs font-extrabold uppercase tracking-widest text-brand-green-500 bg-brand-green-50 px-4 py-1.5 rounded-full inline-block self-start mb-4">
              SPESIFIKASI PRODUK
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
              Virgin Coconut Oil (VCO) CocoSam
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Minyak kelapa murni yang didapat dari kelapa segar pilihan khas Lombok. Diproses menggunakan metode cold-press (tanpa pemanasan) sehingga menghasilkan cairan minyak bening sejernih air, beraroma kelapa segar alami khas kelapa matang, dan tidak gatal di tenggorokan.
            </p>

            {/* Product Meta Specifications */}
            <div className="space-y-4 mb-8">
              <div className="flex border-b border-gray-100 pb-3 justify-between">
                <span className="text-gray-500 font-medium">Bahan Baku (Ingredients)</span>
                <span className="font-bold text-brand-green-700">100% Fresh Coconut (Tanpa Pemanasan)</span>
              </div>
              <div className="flex border-b border-gray-100 pb-3 justify-between">
                <span className="text-gray-500 font-medium">Kemasan Retail Standard</span>
                <span className="font-bold text-gray-800">Botol Kaca Premium 100ml</span>
              </div>
              <div className="flex border-b border-gray-100 pb-3 justify-between">
                <span className="text-gray-500 font-medium">Kustomisasi B2B (Bulk/Repack)</span>
                <span className="font-bold text-brand-brown-600">Tersedia (Custom size: Literan / Drum)</span>
              </div>
              <div className="flex border-b border-gray-100 pb-3 justify-between">
                <span className="text-gray-500 font-medium">Asal Produksi</span>
                <span className="font-bold text-gray-800">Lombok, Indonesia</span>
              </div>
            </div>

            {/* Usage Directions Card */}
            <div className="bg-brand-cream-50/60 rounded-2xl p-6 border border-brand-green-100/50">
              <h3 className="font-bold text-brand-green-800 flex items-center space-x-2 mb-3">
                <ListChecks className="w-5 h-5" />
                <span>Petunjuk Penggunaan</span>
              </h3>
              <ul className="text-sm text-gray-600 space-y-2.5">
                <li className="flex items-start space-x-2">
                  <span className="text-brand-green-500 font-bold mr-1">•</span>
                  <span><strong>Konsumsi Internal:</strong> Minum 1 - 2 sendok makan per hari bagi orang dewasa untuk menjaga daya tahan tubuh dan menurunkan kolesterol.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-brand-green-500 font-bold mr-1">•</span>
                  <span><strong>Penggunaan Luar:</strong> Oleskan tipis pada kulit wajah/tubuh sebagai pelembap alami, hair mask, base massage oil, atau aroma treatment.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
