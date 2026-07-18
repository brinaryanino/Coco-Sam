"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Info, Target, Users, BookOpen, CheckCircle } from "lucide-react";

export default function AboutUs() {
  const [activeTab, setActiveTab] = useState<"desc" | "vision" | "structure">("desc");

  const structureData = {
    leader: { name: "Samsudin, S.Kom", role: "Ketua" },
    core: [
      { name: "Alus Wirahada Kusuma", role: "Sekretaris" },
      { name: "Ilham Efendi, Amd", role: "Bendahara" }
    ],
    departments: [
      {
        title: "Media & Promosi",
        members: ["Nur Aini (CO)", "Maulida"]
      },
      {
        title: "Produksi",
        members: ["Muhaimin (CO)", "Menim", "Sundung", "Layim"]
      },
      {
        title: "Bahan Baku & Penjualan",
        members: ["Sumiati, S.Pd (CO)", "Milase"]
      }
    ]
  };

  return (
    <section id="tentang-kami" className="py-24 bg-white relative overflow-hidden border-t border-brand-green-100/30">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-brand-green-50/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-brown-50/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-green-600 bg-brand-green-100/60 px-4 py-1.5 rounded-full inline-block mb-3 border border-brand-green-200/50">
            PROFIL USAHA
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
            Tentang CocoSam
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600">
            Inisiatif pemberdayaan ekonomi masyarakat desa di Lombok melalui pengolahan kelapa premium yang berkelanjutan.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1 bg-gray-50 border border-gray-100 rounded-2xl shadow-sm gap-1 max-w-full overflow-x-auto">
            <button
              onClick={() => setActiveTab("desc")}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === "desc"
                  ? "bg-brand-green-500 text-white shadow-sm"
                  : "text-gray-500 hover:text-brand-green-700 hover:bg-gray-100/50"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Deskripsi Usaha</span>
            </button>
            <button
              onClick={() => setActiveTab("vision")}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === "vision"
                  ? "bg-brand-green-500 text-white shadow-sm"
                  : "text-gray-500 hover:text-brand-green-700 hover:bg-gray-100/50"
              }`}
            >
              <Target className="w-4 h-4" />
              <span>Visi & Misi</span>
            </button>
            <button
              onClick={() => setActiveTab("structure")}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === "structure"
                  ? "bg-brand-green-500 text-white shadow-sm"
                  : "text-gray-500 hover:text-brand-green-700 hover:bg-gray-100/50"
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Struktur Organisasi</span>
            </button>
          </div>
        </div>

        {/* Tab Content Panels */}
        <div className="bg-brand-cream-50/50 border border-brand-green-100/30 rounded-3xl p-6 sm:p-10 shadow-lg min-h-[400px] flex flex-col justify-center transition-all duration-300">
          
          {/* Panel: Description */}
          {activeTab === "desc" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fadeIn">
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center gap-2 text-brand-green-700 mb-2">
                  <Info className="w-6 h-6" />
                  <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900">Mengenal CocoSam</h3>
                </div>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  CocoSam merupakan kelompok usaha berbasis masyarakat desa yang bergerak di bidang pengolahan hasil perkebunan kelapa menjadi produk bernilai tambah tinggi, khususnya Virgin Coconut Oil (VCO). Usaha ini didirikan sebagai bentuk inisiatif pemberdayaan ekonomi masyarakat melalui pemanfaatan sumber daya lokal yang melimpah, namun selama ini belum dioptimalkan secara maksimal.
                </p>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  CocoSam tidak hanya berfokus pada produksi, tetapi juga mengusung konsep <strong>community-based enterprise</strong>, di mana masyarakat desa dilibatkan secara aktif dalam seluruh rantai nilai usaha, mulai dari pengadaan bahan baku, proses produksi, hingga pemasaran produk. Dengan pendekatan tersebut, CocoSam hadir bukan hanya sebagai unit bisnis, tetapi juga sebagai motor penggerak ekonomi desa yang berorientasi pada keberlanjutan (sustainability), kemandirian, dan peningkatan kesejahteraan masyarakat.
                </p>
              </div>
              <div className="lg:col-span-5 relative h-64 sm:h-80 rounded-2xl overflow-hidden shadow-md border border-brand-green-100/50">
                <Image
                  src="/image1.jpg"
                  alt="Kelapa Segar Lombok"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 30vw"
                />
              </div>
            </div>
          )}

          {/* Panel: Vision & Mission */}
          {activeTab === "vision" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch animate-fadeIn">
              {/* Vision Card */}
              <div className="bg-white border border-brand-green-100/40 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col space-y-6">
                <div className="flex items-center space-x-3 text-brand-green-600">
                  <div className="p-2.5 bg-brand-green-50 rounded-xl">
                    <Target className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-extrabold text-gray-900">Visi Usaha</h4>
                </div>
                <ul className="space-y-4 flex-1">
                  <li className="flex items-start space-x-3 text-sm sm:text-base text-gray-600 leading-relaxed">
                    <CheckCircle className="w-5 h-5 text-brand-green-600 flex-shrink-0 mt-0.5" />
                    <span>Menjadi usaha pengolahan kelapa yang berdaya saing dan berkelanjutan.</span>
                  </li>
                  <li className="flex items-start space-x-3 text-sm sm:text-base text-gray-600 leading-relaxed">
                    <CheckCircle className="w-5 h-5 text-brand-green-600 flex-shrink-0 mt-0.5" />
                    <span>Mewujudkan kemandirian ekonomi masyarakat melalui optimalisasi potensi kelapa lokal.</span>
                  </li>
                </ul>
              </div>

              {/* Mission Card */}
              <div className="bg-white border border-brand-green-100/40 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col space-y-6">
                <div className="flex items-center space-x-3 text-brand-green-600">
                  <div className="p-2.5 bg-brand-green-50 rounded-xl">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-extrabold text-gray-900">Misi Usaha</h4>
                </div>
                <ul className="space-y-4 flex-1 text-sm sm:text-base text-gray-600 leading-relaxed">
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-brand-green-500 flex-shrink-0 mt-0.5" />
                    <span>Mengolah kelapa menjadi produk VCO dan produk turunan kelapa lainnya dengan standar kualitas yang konsisten.</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-brand-green-500 flex-shrink-0 mt-0.5" />
                    <span>Memberdayakan masyarakat melalui pelatihan dan keterlibatan dalam proses produksi.</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-brand-green-500 flex-shrink-0 mt-0.5" />
                    <span>Mengembangkan pemasaran produk untuk menjangkau pasar lokal hingga nasional bahkan internasional.</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-brand-green-500 flex-shrink-0 mt-0.5" />
                    <span>Menciptakan sistem usaha yang berkelanjutan dan memberikan nilai tambah bagi masyarakat desa.</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Panel: Structure */}
          {activeTab === "structure" && (
            <div className="space-y-12 animate-fadeIn text-center">
              {/* Structure Image */}
              <div className="max-w-2xl mx-auto rounded-2xl overflow-hidden shadow-lg border border-brand-green-100 bg-white p-3">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src="/struktur-organisasi.jpg"
                    alt="Bagan Struktur Organisasi CocoSam"
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>
              </div>

              {/* Accessible Interactive Cards Structure */}
              <div className="space-y-8 max-w-4xl mx-auto">
                <div className="border-t border-brand-green-200/50 pt-8">
                  <h4 className="text-sm font-extrabold uppercase tracking-widest text-brand-green-700 mb-6">
                    Susunan Kepengurusan Usaha
                  </h4>
                </div>

                {/* Leader */}
                <div className="max-w-xs mx-auto">
                  <div className="bg-white border-2 border-brand-green-500 rounded-2xl p-4 shadow-sm">
                    <span className="text-[10px] uppercase font-extrabold tracking-wider text-brand-green-600 block mb-1">
                      {structureData.leader.role}
                    </span>
                    <h5 className="font-extrabold text-gray-900 text-base">{structureData.leader.name}</h5>
                  </div>
                </div>

                {/* Core Officers */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
                  {structureData.core.map((officer, index) => (
                    <div key={index} className="bg-white border border-brand-green-200/60 rounded-2xl p-4 shadow-sm">
                      <span className="text-[10px] uppercase font-extrabold tracking-wider text-gray-500 block mb-1">
                        {officer.role}
                      </span>
                      <h5 className="font-extrabold text-gray-900 text-sm">{officer.name}</h5>
                    </div>
                  ))}
                </div>

                {/* Departments */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {structureData.departments.map((dept, index) => (
                    <div key={index} className="bg-white border border-brand-green-100 rounded-2xl p-5 shadow-sm text-left">
                      <h5 className="text-xs font-extrabold uppercase tracking-wider text-brand-green-700 border-b border-brand-green-50 pb-2.5 mb-3">
                        {dept.title}
                      </h5>
                      <ul className="space-y-1.5">
                        {dept.members.map((name, idx) => (
                          <li key={idx} className="text-sm text-gray-600 font-semibold flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-green-400" />
                            <span>{name}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
