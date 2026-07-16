"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import {
  createProductAdmin,
  updateProductAdmin,
  deleteProductAdmin,
  uploadProductImage,
} from "@/app/actions/products";
import {
  Plus,
  X,
  Edit,
  Trash2,
  Package,
  Search,
  Image as ImageIcon,
  Loader2,
  Sparkles,
  Filter,
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  sku: string;
  size: string;
  basePrice: number;
  stock: number;
  category: string;
  imageUrl: string | null;
}

interface ProductsPageClientProps {
  initialProducts: Product[];
}

export default function ProductsPageClient({
  initialProducts,
}: ProductsPageClientProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentProductId, setCurrentProductId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [size, setSize] = useState("100ml");
  const [basePrice, setBasePrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [category, setCategory] = useState("VCO");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);

  const categories = ["VCO", "Produk Kecantikan", "Kebutuhan Spa"];

  // Handle SKU auto-generation helper
  const handleNameChange = (val: string) => {
    setName(val);
    if (!isEditMode) {
      // Auto-generate a slug-like SKU
      const cleanName = val
        .toUpperCase()
        .replace(/[^A-Z0-9\s]/g, "")
        .replace(/\s+/g, "-");
      const cleanSize = size.toUpperCase().replace(/\s+/g, "");
      setSku(`${cleanName}-${cleanSize}`);
    }
  };

  const handleSizeChange = (val: string) => {
    setSize(val);
    if (!isEditMode) {
      const cleanName = name
        .toUpperCase()
        .replace(/[^A-Z0-9\s]/g, "")
        .replace(/\s+/g, "-");
      const cleanSize = val.toUpperCase().replace(/\s+/g, "");
      setSku(`${cleanName}-${cleanSize}`);
    }
  };

  // Image change handler
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Open modal for Create
  const handleOpenAddModal = () => {
    setName("");
    setSku("");
    setSize("100ml");
    setBasePrice(0);
    setStock(0);
    setCategory("VCO");
    setImageFile(null);
    setImagePreview(null);
    setExistingImageUrl(null);
    setErrorMsg(null);
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  // Open modal for Edit
  const handleOpenEditModal = (p: Product) => {
    setName(p.name);
    setSku(p.sku);
    setSize(p.size);
    setBasePrice(p.basePrice);
    setStock(p.stock);
    setCategory(p.category);
    setImageFile(null);
    setImagePreview(null);
    setExistingImageUrl(p.imageUrl);
    setErrorMsg(null);
    setIsEditMode(true);
    setCurrentProductId(p.id);
    setIsModalOpen(true);
  };

  // Convert File to Base64 helper
  const getBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  // Form Submit handler (Create or Update)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsSubmitting(true);

    try {
      if (!name || !sku || !size || basePrice <= 0 || stock < 0) {
        throw new Error("Mohon lengkapi semua kolom dengan data yang valid.");
      }

      let finalImageUrl = existingImageUrl || undefined;

      // Upload image to Supabase if a new file is selected
      if (imageFile) {
        const base64Data = await getBase64(imageFile);
        const uploadRes = await uploadProductImage(
          imageFile.name,
          base64Data,
          imageFile.type
        );

        if (!uploadRes.success || !uploadRes.publicUrl) {
          throw new Error(uploadRes.error || "Gagal mengunggah gambar produk.");
        }
        finalImageUrl = uploadRes.publicUrl;
      }

      if (isEditMode && currentProductId) {
        // Edit Action
        const res = await updateProductAdmin(currentProductId, {
          name,
          sku,
          size,
          basePrice: Number(basePrice),
          stock: Number(stock),
          category,
          imageUrl: finalImageUrl,
        });

        if (res.success && res.product) {
          setIsModalOpen(false);
          window.location.reload();
        } else {
          throw new Error(res.error || "Gagal memperbarui produk.");
        }
      } else {
        // Create Action
        const res = await createProductAdmin({
          name,
          sku,
          size,
          basePrice: Number(basePrice),
          stock: Number(stock),
          category,
          imageUrl: finalImageUrl,
        });

        if (res.success && res.product) {
          setIsModalOpen(false);
          window.location.reload();
        } else {
          throw new Error(res.error || "Gagal membuat produk baru.");
        }
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Terjadi kesalahan sistem.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete handler
  const handleDeleteProduct = async (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus produk ini secara permanen?")) {
      const res = await deleteProductAdmin(id);
      if (res.success) {
        window.location.reload();
      } else {
        alert(`Gagal menghapus produk: ${res.error}`);
      }
    }
  };

  // Filter and Search logic
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.sku.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategoryFilter === "ALL" || p.category === selectedCategoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategoryFilter]);

  // Format currency helper (Rupiah)
  const formatRp = (num: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(num);
  };

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Katalog & Stok Produk</h1>
          <p className="text-gray-500 text-sm">
            Kelola produk CocoSam, perbarui kuantitas stok B2B, harga dasar, kategori, dan gambar produk.
          </p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="inline-flex items-center space-x-2 bg-brand-green-500 hover:bg-brand-green-600 text-white font-bold px-5 py-3 rounded-2xl shadow-sm transition-all self-stretch sm:self-auto text-center justify-center"
        >
          <Plus className="w-5 h-5" />
          <span>Tambah Produk</span>
        </button>
      </div>

      {/* Control bar: Search and Filter */}
      <div className="bg-white border border-gray-100 rounded-3xl p-4 shadow-sm flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
            <Search className="w-5 h-5" />
          </span>
          <input
            type="text"
            placeholder="Cari berdasarkan nama produk atau SKU..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-green-500 bg-gray-50/50"
          />
        </div>

        {/* Filter categories */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5 mr-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <span>Kategori:</span>
          </span>
          <button
            onClick={() => setSelectedCategoryFilter("ALL")}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all border ${
              selectedCategoryFilter === "ALL"
                ? "bg-brand-green-500 text-white border-brand-green-500 shadow-sm"
                : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
            }`}
          >
            Semua Kategori
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategoryFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all border ${
                selectedCategoryFilter === cat
                  ? "bg-brand-green-500 text-white border-brand-green-500 shadow-sm"
                  : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product List Table */}
      <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-gray-400 font-semibold uppercase tracking-wider text-xs">
                <th className="py-3 px-4 w-16 text-center">Gambar</th>
                <th className="py-3 px-4">Nama Produk / SKU</th>
                <th className="py-3 px-4">Kategori</th>
                <th className="py-3 px-4">Ukuran</th>
                <th className="py-3 px-4">Stok</th>
                <th className="py-3 px-4">Harga B2B (Base)</th>
                <th className="py-3 px-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-400">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <Package className="w-10 h-10 text-gray-300" />
                      <span className="font-semibold text-sm">Produk tidak ditemukan</span>
                      <span className="text-xs text-gray-400">Silakan tambahkan produk baru atau ubah filter pencarian Anda.</span>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                    {/* Thumbnail Image */}
                    <td className="py-4 px-4 text-center">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-gray-100 border border-gray-200 flex items-center justify-center mx-auto shadow-inner">
                        {p.imageUrl ? (
                          <Image
                            src={p.imageUrl}
                            alt={p.name}
                            fill
                            className="object-cover"
                            sizes="48px"
                          />
                        ) : (
                          <ImageIcon className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                    </td>

                    {/* Name & SKU */}
                    <td className="py-4 px-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-900 leading-tight">
                          {p.name}
                        </span>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 mt-0.5">
                          {p.sku}
                        </span>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-4 px-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider border ${
                          p.category === "VCO"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                            : p.category === "Produk Kecantikan"
                            ? "bg-pink-50 text-pink-700 border-pink-100"
                            : "bg-blue-50 text-blue-700 border-blue-100"
                        }`}
                      >
                        {p.category}
                      </span>
                    </td>

                    {/* Size */}
                    <td className="py-4 px-4 font-semibold text-gray-600">
                      {p.size}
                    </td>

                    {/* Stock */}
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            p.stock === 0
                              ? "bg-red-500 animate-pulse"
                              : p.stock < 20
                              ? "bg-amber-500"
                              : "bg-green-500"
                          }`}
                        />
                        <span
                          className={`font-bold ${
                            p.stock === 0
                              ? "text-red-600"
                              : p.stock < 20
                              ? "text-amber-600"
                              : "text-gray-800"
                          }`}
                        >
                          {p.stock} unit
                        </span>
                      </div>
                    </td>

                    {/* Price */}
                    <td className="py-4 px-4 font-bold text-gray-900">
                      {formatRp(p.basePrice)}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-4 text-center">
                      <div className="flex justify-center items-center gap-2">
                        <button
                          onClick={() => handleOpenEditModal(p)}
                          className="border border-gray-200 hover:border-brand-green-500 bg-white hover:bg-brand-green-50 text-gray-600 hover:text-brand-green-700 p-2 rounded-xl transition-all"
                          title="Edit Produk"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(p.id)}
                          className="border border-gray-200 hover:border-red-500 bg-white hover:bg-red-50 text-gray-600 hover:text-red-600 p-2 rounded-xl transition-all"
                          title="Hapus Produk"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ====================================================== */}
      {/* MODAL: ADD / EDIT PRODUCT */}
      {/* ====================================================== */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl relative overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 text-gray-400 hover:bg-gray-50 p-2 rounded-xl"
            >
              <X className="w-5 h-5" />
            </button>
            
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              {isEditMode ? (
                <Edit className="w-6 h-6 text-brand-green-500" />
              ) : (
                <Sparkles className="w-6 h-6 text-brand-green-500" />
              )}
              <span>{isEditMode ? "Edit Detail Produk" : "Tambah Produk Baru"}</span>
            </h3>

            {errorMsg && (
              <div className="p-4 mb-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Product Name */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase">Nama Produk</label>
                <input
                  required
                  type="text"
                  placeholder="Contoh: Virgin Coconut Oil Gold"
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* Size */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase">Ukuran</label>
                  <select
                    value={size}
                    onChange={(e) => handleSizeChange(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 bg-white text-sm"
                  >
                    <option value="100ml">100ml</option>
                    <option value="250ml">250ml</option>
                    <option value="500ml">500ml</option>
                    <option value="1L">1L</option>
                    <option value="5L">5L</option>
                    <option value="20L">20L</option>
                    <option value="Custom">Custom</option>
                  </select>
                </div>

                {/* Category */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase">Kategori</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 bg-white text-sm"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* Price */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase">Harga B2B (Rp)</label>
                  <input
                    required
                    type="number"
                    min="1"
                    placeholder="Contoh: 150000"
                    value={basePrice || ""}
                    onChange={(e) => setBasePrice(Number(e.target.value))}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm"
                  />
                </div>

                {/* Stock */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase">Kuantitas Stok</label>
                  <input
                    required
                    type="number"
                    min="0"
                    placeholder="Contoh: 50"
                    value={stock === 0 ? "0" : stock || ""}
                    onChange={(e) => setStock(Number(e.target.value))}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm"
                  />
                </div>
              </div>

              {/* SKU code */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase">
                  Kode SKU (Unik)
                </label>
                <input
                  required
                  type="text"
                  placeholder="Contoh: VCO-GOLD-1L"
                  value={sku}
                  onChange={(e) => setSku(e.target.value.toUpperCase())}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-mono uppercase bg-gray-50/50 focus:bg-white"
                />
              </div>

              {/* Image Upload */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase block">Gambar Produk</label>
                
                {/* Image Previews */}
                <div className="flex items-center gap-4">
                  <div className="relative w-20 h-20 bg-gray-50 border border-gray-200 rounded-2xl flex items-center justify-center shadow-inner overflow-hidden flex-shrink-0">
                    {imagePreview ? (
                      <Image
                        src={imagePreview}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                    ) : existingImageUrl ? (
                      <Image
                        src={existingImageUrl}
                        alt="Current"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <ImageIcon className="w-8 h-8 text-gray-300" />
                    )}
                  </div>

                  <div className="flex-1 space-y-1">
                    <input
                      type="file"
                      accept="image/*"
                      id="product-image-file"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="product-image-file"
                      className="inline-block border border-gray-300 hover:border-brand-green-500 bg-white hover:bg-brand-green-50 text-gray-700 hover:text-brand-green-700 font-bold px-4 py-2 rounded-xl text-xs cursor-pointer shadow-xs transition-all"
                    >
                      Pilih File Gambar
                    </label>
                    <p className="text-[10px] text-gray-400">
                      Maksimal ukuran 5MB (.jpg, .png, .webp)
                    </p>
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  disabled={isSubmitting}
                  className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-500 font-bold text-sm hover:bg-gray-50 disabled:opacity-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-xl bg-brand-green-500 hover:bg-brand-green-600 text-white font-bold text-sm flex items-center justify-center gap-1.5 shadow-md hover:shadow-lg disabled:opacity-70 disabled:hover:shadow-none min-w-[140px]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Mengunggah...</span>
                    </>
                  ) : (
                    <span>{isEditMode ? "Simpan Produk" : "Tambah Produk"}</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
