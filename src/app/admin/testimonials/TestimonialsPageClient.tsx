"use client";

import React, { useState } from "react";
import {
  MessageSquare,
  Plus,
  Edit2,
  Trash2,
  Star,
  Building2,
  User,
  CheckCircle2,
  X,
  Sparkles,
} from "lucide-react";
import {
  createTestimonialAction,
  updateTestimonialAction,
  deleteTestimonialAction,
} from "@/app/actions/testimonials";

interface TestimonialItem {
  id: string;
  category: string;
  categoryLabel: string;
  author: string;
  role: string;
  quote: string;
  highlight: boolean;
}

export default function TestimonialsPageClient({
  initialData,
}: {
  initialData: TestimonialItem[];
}) {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(initialData);
  const [filter, setFilter] = useState<"ALL" | "MITRA" | "KONSUMEN">("ALL");

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TestimonialItem | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Form states
  const [category, setCategory] = useState("MITRA");
  const [author, setAuthor] = useState("");
  const [role, setRole] = useState("");
  const [quote, setQuote] = useState("");
  const [highlight, setHighlight] = useState(false);

  const openCreateModal = () => {
    setEditingItem(null);
    setCategory("MITRA");
    setAuthor("");
    setRole("");
    setQuote("");
    setHighlight(false);
    setIsModalOpen(true);
  };

  const openEditModal = (item: TestimonialItem) => {
    setEditingItem(item);
    setCategory(item.category);
    setAuthor(item.author);
    setRole(item.role);
    setQuote(item.quote);
    setHighlight(item.highlight);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const categoryLabel = category === "MITRA" ? "Mitra Bisnis" : "Konsumen";

    if (editingItem) {
      const res = await updateTestimonialAction(editingItem.id, {
        category,
        categoryLabel,
        author,
        role,
        quote,
        highlight,
      });

      if (res.success) {
        setTestimonials((prev) =>
          prev.map((t) =>
            t.id === editingItem.id
              ? {
                  ...t,
                  category,
                  categoryLabel,
                  author,
                  role,
                  quote,
                  highlight,
                }
              : t
          )
        );
        setIsModalOpen(false);
      } else {
        alert("Gagal memperbarui testimoni: " + (res.error || ""));
      }
    } else {
      const res = await createTestimonialAction({
        category,
        categoryLabel,
        author,
        role,
        quote,
        highlight,
      });

      if (res.success) {
        window.location.reload();
      } else {
        alert("Gagal menambah testimoni: " + (res.error || ""));
      }
    }

    setIsSaving(false);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus testimoni dari "${name}"?`)) {
      return;
    }

    const res = await deleteTestimonialAction(id);
    if (res.success) {
      setTestimonials((prev) => prev.filter((t) => t.id !== id));
    } else {
      alert("Gagal menghapus testimoni: " + (res.error || ""));
    }
  };

  const filteredItems =
    filter === "ALL"
      ? testimonials
      : testimonials.filter((t) => t.category === filter);

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Kelola Testimoni & Ulasan</h1>
          <p className="text-gray-500 text-sm mt-0.5">
            Tambah, edit, atau hapus ulasan dari mitra B2B & konsumen yang tampil di landing page.
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center space-x-2 bg-brand-green-500 hover:bg-brand-green-600 text-white font-bold px-5 py-3 rounded-2xl shadow-md transition-all text-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Testimoni Baru</span>
        </button>
      </div>

      {/* Filter Category Tabs */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div className="inline-flex p-1 bg-white border border-gray-200 rounded-2xl shadow-xs gap-1">
          <button
            onClick={() => setFilter("ALL")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filter === "ALL"
                ? "bg-brand-green-500 text-white shadow-xs"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Semua ({testimonials.length})
          </button>
          <button
            onClick={() => setFilter("MITRA")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filter === "MITRA"
                ? "bg-brand-green-500 text-white shadow-xs"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Mitra Bisnis</span>
          </button>
          <button
            onClick={() => setFilter("KONSUMEN")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filter === "KONSUMEN"
                ? "bg-brand-green-500 text-white shadow-xs"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Konsumen</span>
          </button>
        </div>
      </div>

      {/* Testimonials List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.length === 0 ? (
          <div className="col-span-full py-12 text-center text-gray-400 bg-white rounded-3xl border border-gray-100 p-8">
            Belum ada testimoni dalam kategori ini.
          </div>
        ) : (
          filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm flex flex-col justify-between relative hover:shadow-md transition-all"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span
                    className={`text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full ${
                      item.category === "MITRA"
                        ? "bg-brand-green-100 text-brand-green-800 border border-brand-green-200/60"
                        : "bg-blue-50 text-blue-800 border border-blue-100"
                    }`}
                  >
                    {item.categoryLabel}
                  </span>
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => openEditModal(item)}
                      className="p-1.5 text-gray-400 hover:text-brand-green-600 hover:bg-brand-green-50 rounded-xl transition-all"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id, item.author)}
                      className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                      title="Hapus"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex space-x-0.5 text-amber-400 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>

                <p className="text-gray-700 text-sm leading-relaxed mb-6 whitespace-pre-line">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">{item.author}</h4>
                  <p className="text-xs text-gray-500">{item.role}</p>
                </div>
                {item.highlight && (
                  <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-md">
                    Featured
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal Add / Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6 relative border border-gray-100">
            <div className="flex justify-between items-center border-b border-gray-100 pb-4">
              <h3 className="text-lg font-bold text-gray-900">
                {editingItem ? "Edit Testimoni" : "Tambah Testimoni Baru"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-1">
                  Kategori
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold focus:outline-none focus:border-brand-green-500"
                >
                  <option value="MITRA">Mitra Bisnis (B2B / Spa / Hotel / Resto)</option>
                  <option value="KONSUMEN">Konsumen (Pengguna Langsung)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-1">
                  Nama Penulis / Institusi
                </label>
                <input
                  type="text"
                  required
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Contoh: Matcha Spa Kuta / Ayu"
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold focus:outline-none focus:border-brand-green-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-1">
                  Jabatan / Status
                </label>
                <input
                  type="text"
                  required
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="Contoh: Spa Manager / Konsumen Setia"
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold focus:outline-none focus:border-brand-green-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-1">
                  Isi Ulasan / Testimoni
                </label>
                <textarea
                  required
                  rows={4}
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  placeholder="Ketik isi testimoni..."
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold focus:outline-none focus:border-brand-green-500"
                />
              </div>

              <div className="flex items-center space-x-2 pt-1">
                <input
                  type="checkbox"
                  id="highlight"
                  checked={highlight}
                  onChange={(e) => setHighlight(e.target.checked)}
                  className="w-4 h-4 text-brand-green-600 rounded focus:ring-brand-green-500"
                />
                <label htmlFor="highlight" className="text-xs font-bold text-gray-700">
                  Tampilkan sebagai kartu lebar (Featured card)
                </label>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2.5 bg-brand-green-500 hover:bg-brand-green-600 text-white rounded-xl text-sm font-bold shadow-sm transition-all disabled:opacity-50"
                >
                  {isSaving ? "Menyimpan..." : "Simpan Testimoni"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
