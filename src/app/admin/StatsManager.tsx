"use client";

import React, { useState, useEffect } from "react";
import { getSiteStatsSettings, updateSiteStats } from "@/app/actions/products";
import { BarChart3, Save, CheckCircle2, RefreshCw } from "lucide-react";

export default function StatsManager() {
  const [mitraCount, setMitraCount] = useState("42");
  const [soldCount, setSoldCount] = useState("1420");
  const [satisfactionRate, setSatisfactionRate] = useState("99.4%");
  const [productionCapacity, setProductionCapacity] = useState("5.000 L / bln");

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    async function loadStats() {
      const res = await getSiteStatsSettings();
      if (res.success && res.data) {
        setMitraCount(res.data.mitraCount);
        setSoldCount(res.data.soldCount);
        setSatisfactionRate(res.data.satisfactionRate);
        setProductionCapacity(res.data.productionCapacity);
      }
      setIsLoading(false);
    }
    loadStats();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSuccessMsg("");

    const res = await updateSiteStats({
      mitraCount,
      soldCount,
      satisfactionRate,
      productionCapacity,
    });

    setIsSaving(false);
    if (res.success) {
      setSuccessMsg("Statistik landing page berhasil diperbarui!");
      setTimeout(() => setSuccessMsg(""), 4000);
    } else {
      alert("Gagal memperbarui statistik. Silakan coba lagi.");
    }
  };

  return (
    <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm space-y-6">
      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-brand-green-50 text-brand-green-600 rounded-2xl border border-brand-green-100">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-lg">Kelola Statistik Landing Page</h3>
            <p className="text-xs text-gray-500">Ubah jumlah mitra, angka penjualan, dan kapasitas produksi secara berkala.</p>
          </div>
        </div>
      </div>

      {successMsg && (
        <div className="p-4 bg-green-50 border border-green-200 text-green-700 text-xs font-bold rounded-2xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {isLoading ? (
        <div className="py-8 flex justify-center items-center text-gray-400 text-sm gap-2">
          <RefreshCw className="w-4 h-4 animate-spin" />
          <span>Memuat data statistik...</span>
        </div>
      ) : (
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                Jumlah Mitra
              </label>
              <input
                type="number"
                required
                value={mitraCount}
                onChange={(e) => setMitraCount(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm font-bold text-gray-800 focus:outline-none focus:border-brand-green-500"
                placeholder="42"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                Botol Terjual
              </label>
              <input
                type="number"
                required
                value={soldCount}
                onChange={(e) => setSoldCount(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm font-bold text-gray-800 focus:outline-none focus:border-brand-green-500"
                placeholder="1420"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                Kepuasan Mitra
              </label>
              <input
                type="text"
                required
                value={satisfactionRate}
                onChange={(e) => setSatisfactionRate(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm font-bold text-gray-800 focus:outline-none focus:border-brand-green-500"
                placeholder="99.4%"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                Kapasitas Produksi
              </label>
              <input
                type="text"
                required
                value={productionCapacity}
                onChange={(e) => setProductionCapacity(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm font-bold text-gray-800 focus:outline-none focus:border-brand-green-500"
                placeholder="5.000 L / bln"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center space-x-2 bg-brand-green-500 hover:bg-brand-green-600 text-white font-bold px-5 py-2.5 rounded-xl text-sm shadow-sm transition-all disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Menyimpan...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Simpan Statistik</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
