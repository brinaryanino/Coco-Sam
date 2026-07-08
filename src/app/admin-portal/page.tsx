"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Eye, ShieldAlert, ArrowRight, Lock, KeyRound } from "lucide-react";

export default function AdminPortalPage() {
  const [passcode, setPasscode] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const CORRECT_PASSCODE = "cocosam2026"; // Passcode to unlock the portal

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === CORRECT_PASSCODE) {
      setIsAuthorized(true);
      setErrorMsg("");
    } else {
      setErrorMsg("Passcode salah! Silakan coba lagi.");
      setPasscode("");
    }
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-brand-cream-100 flex items-center justify-center p-4">
        {/* Passcode Gate Screen */}
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-brand-green-100 shadow-xl text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-brand-green-50 text-brand-green-600 flex items-center justify-center mx-auto shadow-inner border border-brand-green-100/50">
            <Lock className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Gateway</h1>
            <p className="text-gray-500 text-sm mt-1">Masukkan passcode khusus untuk mengakses portal navigasi admin.</p>
          </div>

          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl font-semibold flex items-center justify-center gap-1.5 animate-shake">
              <ShieldAlert className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleUnlock} className="space-y-4">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
                <KeyRound className="w-5 h-5" />
              </span>
              <input
                required
                type="password"
                placeholder="Passcode Admin"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-green-500 text-center font-bold tracking-widest bg-gray-50/50"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-brand-green-500 hover:bg-brand-green-600 text-white font-bold py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              Masuk Portal
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Unlocked Admin Gateway Screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-cream-100 via-white to-brand-green-50/20 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative backdrop blobs */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-brand-green-100/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-20 w-96 h-96 bg-brand-brown-100/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto w-full relative z-10 space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <svg className="w-12 h-12 text-brand-green-500 mx-auto transform hover:rotate-12 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="13" r="8" className="fill-brand-green-50/50 stroke-brand-green-500" />
            <path d="M12 5a7 7 0 0 1 7 7" className="stroke-brand-green-300" />
            <path d="M12 9a3 3 0 0 1 3 3" className="stroke-brand-green-400" />
            <path d="M12 5c0-2 2-3 4-3s2 2 1 4-3 1-5-1z" className="fill-brand-green-400 stroke-brand-green-400" />
          </svg>
          <div className="flex flex-col">
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">CocoSam Admin Gateway</h1>
            <p className="text-gray-500 text-sm mt-1.5">Akses cepat ke navigasi publik dan manajemen penjualan B2B.</p>
          </div>
        </div>

        {/* Option Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: User-End (Landing Page) */}
          <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-8 relative group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-green-50 text-brand-green-600 flex items-center justify-center shadow-inner border border-brand-green-100/50">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">1. Halaman Depan (User-End)</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Tinjau tampilan publik landing page CocoSam yang diakses oleh calon mitra (Hotel, Spa, Villa, Resto) untuk memesan produk VCO secara mandiri.
              </p>
            </div>
            <Link
              href="/"
              className="inline-flex items-center justify-center space-x-2 w-full bg-brand-green-500 hover:bg-brand-green-600 text-white font-bold py-3.5 rounded-xl shadow-md transition-colors"
            >
              <span>Buka Landing Page</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Card 2: Admin Dashboard */}
          <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-8 relative group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-brown-50 text-brand-brown-600 flex items-center justify-center shadow-inner border border-brand-brown-100/50">
                <KeyRound className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">2. Dashboard Penjualan (Admin)</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Akses panel kontrol backend untuk merekap omzet bulanan, mengelola status invoice pesanan, memantau pengiriman kurir, dan mendata prospek lead contoh produk.
              </p>
            </div>
            <Link
              href="/admin"
              className="inline-flex items-center justify-center space-x-2 w-full bg-brand-brown-500 hover:bg-brand-brown-600 text-white font-bold py-3.5 rounded-xl shadow-md transition-colors"
            >
              <span>Masuk Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Lock footer */}
        <div className="text-center pt-4">
          <button
            onClick={() => setIsAuthorized(false)}
            className="text-xs font-bold text-gray-400 hover:text-red-500 transition-colors uppercase tracking-wider"
          >
            Log Out / Kunci Kembali Portal
          </button>
        </div>
      </div>
    </div>
  );
}
