"use client";

import React, { useState } from "react";
import { createCustomer, updateCustomerStatus, updateCustomer } from "@/app/actions/sales";
import { Plus, X, Phone, Mail, MapPin, UserPlus, CheckCircle, HelpCircle, Edit } from "lucide-react";

interface CustomersPageClientProps {
  initialCustomers: any[];
}

export default function CustomersPageClient({
  initialCustomers,
}: CustomersPageClientProps) {
  const [customers, setCustomers] = useState(initialCustomers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCustomerId, setEditingCustomerId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Form states
  const [name, setName] = useState("");
  const [type, setType] = useState("SPA");
  const [picName, setPicName] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState("ACTIVE");

  // Submit handler: Create Customer
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!name || !picName || !whatsappNumber || !address) {
      setErrorMsg("Nama Mitra, Nama PIC, No WhatsApp, dan Alamat wajib diisi.");
      return;
    }

    const cleanWa = whatsappNumber.replace(/[^0-9]/g, "");

    const res = await createCustomer({
      name,
      type,
      picName,
      whatsappNumber: cleanWa,
      email: email || undefined,
      address,
      status,
    });

    if (res.success && res.customer) {
      window.location.reload();
    } else {
      setErrorMsg(res.error || "Gagal mendaftarkan mitra.");
    }
  };

  // Status handler: Update customer status
  const handleToggleStatus = async (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === "ACTIVE" ? "INACTIVE" : "ACTIVE";
    const res = await updateCustomerStatus(id, nextStatus);
    if (res.success) {
      window.location.reload();
    }
  };

  const handlePromoteLead = async (id: string) => {
    const res = await updateCustomerStatus(id, "ACTIVE");
    if (res.success) {
      window.location.reload();
    }
  };

  // Submit handler: Edit Customer
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!editingCustomerId || !name || !picName || !whatsappNumber || !address) {
      setErrorMsg("Nama Mitra, Nama PIC, No WhatsApp, dan Alamat wajib diisi.");
      return;
    }

    const res = await updateCustomer(editingCustomerId, {
      name,
      type,
      picName,
      whatsappNumber,
      email: email || undefined,
      address,
      status,
    });

    if (res.success) {
      window.location.reload();
    } else {
      setErrorMsg(res.error || "Gagal memperbarui data mitra.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header action */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pelanggan & Leads Mitra</h1>
          <p className="text-gray-500 text-sm">Kelola data mitra B2B (Hotel, Spa, Villa, Resto) dan pantau status lead pengiriman sample.</p>
        </div>
        <button
          onClick={() => {
            setName("");
            setType("SPA");
            setPicName("");
            setWhatsappNumber("");
            setEmail("");
            setAddress("");
            setStatus("ACTIVE");
            setErrorMsg(null);
            setIsModalOpen(true);
          }}
          className="inline-flex items-center space-x-2 bg-brand-green-500 hover:bg-brand-green-600 text-white font-bold px-5 py-3 rounded-2xl shadow-sm transition-all"
        >
          <Plus className="w-5 h-5" />
          <span>Tambah Mitra</span>
        </button>
      </div>

      {/* Customers List Table */}
      <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-gray-400 font-semibold uppercase tracking-wider text-xs">
                <th className="py-3 px-4">Nama Mitra / Kategori</th>
                <th className="py-3 px-4">PIC / Hubungan</th>
                <th className="py-3 px-4">Detail Kontak</th>
                <th className="py-3 px-4">Alamat Pengiriman</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {customers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-gray-400">Belum ada mitra terdaftar.</td>
                </tr>
              ) : (
                customers.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50/50 transition-colors">
                    {/* Name & Type */}
                    <td className="py-4 px-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-900">{c.name}</span>
                        <span className="text-[10px] uppercase font-extrabold text-brand-green-600 tracking-wider">
                          {c.type}
                        </span>
                      </div>
                    </td>
                    
                    {/* PIC */}
                    <td className="py-4 px-4 font-semibold text-gray-700">{c.picName}</td>
                    
                    {/* Contact details */}
                    <td className="py-4 px-4 text-xs space-y-1 text-gray-500">
                      <div className="flex items-center space-x-1.5">
                        <Phone className="w-3.5 h-3.5 text-gray-400" />
                        <a href={`https://wa.me/${c.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="hover:text-brand-green-600 hover:underline">
                          +{c.whatsappNumber}
                        </a>
                      </div>
                      {c.email && (
                        <div className="flex items-center space-x-1.5">
                          <Mail className="w-3.5 h-3.5 text-gray-400" />
                          <span>{c.email}</span>
                        </div>
                      )}
                    </td>
                    
                    {/* Address */}
                    <td className="py-4 px-4 max-w-xs text-xs text-gray-500">
                      <div className="flex items-start space-x-1.5">
                        <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                        <span className="leading-relaxed">{c.address}</span>
                      </div>
                    </td>
                    
                    {/* Status Badge */}
                    <td className="py-4 px-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider ${
                        c.status === "ACTIVE"
                          ? "bg-green-100 text-green-800"
                          : c.status === "LEAD"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}>
                        {c.status}
                      </span>
                    </td>
                    
                    <td className="py-4 px-4 text-center">
                      <div className="flex justify-center gap-2">
                        {c.status === "LEAD" && (
                          <button
                            onClick={() => handlePromoteLead(c.id)}
                            className="inline-flex items-center space-x-1 border border-brand-green-200 hover:border-brand-green-500 bg-brand-green-50/50 hover:bg-brand-green-50 text-brand-green-700 px-3 py-1.5 rounded-xl text-xs font-bold transition-all"
                          >
                            <CheckCircle className="w-3.5 h-3.5" />
                            <span>Jadikan Aktif</span>
                          </button>
                        )}
                        {c.status !== "LEAD" && (
                          <button
                            onClick={() => handleToggleStatus(c.id, c.status)}
                            className={`border px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                              c.status === "ACTIVE"
                                ? "border-red-200 hover:border-red-500 bg-red-50/50 hover:bg-red-50 text-red-600"
                                : "border-green-200 hover:border-green-500 bg-green-50/50 hover:bg-green-50 text-green-700"
                            }`}
                          >
                            {c.status === "ACTIVE" ? "Nonaktifkan" : "Aktifkan"}
                          </button>
                        )}
                        <button
                          onClick={() => {
                            setEditingCustomerId(c.id);
                            setName(c.name);
                            setType(c.type);
                            setPicName(c.picName);
                            setWhatsappNumber(c.whatsappNumber);
                            setEmail(c.email || "");
                            setAddress(c.address);
                            setStatus(c.status);
                            setErrorMsg(null);
                            setIsEditModalOpen(true);
                          }}
                          className="border border-gray-200 hover:border-gray-400 bg-white hover:bg-gray-50 text-gray-600 px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1"
                          title="Edit Profil Mitra"
                        >
                          <Edit className="w-3.5 h-3.5" />
                          <span>Edit</span>
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
      {/* MODAL: ADD CUSTOMER */}
      {/* ====================================================== */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 text-gray-400 hover:bg-gray-50 p-2 rounded-xl"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <UserPlus className="w-6 h-6 text-brand-green-500" />
              <span>Daftarkan Mitra B2B Baru</span>
            </h3>

            {errorMsg && (
              <div className="p-4 mb-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase">Nama Instansi / Mitra</label>
                <input
                  required
                  type="text"
                  placeholder="Contoh: Sheraton Senggigi Resort"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase">Tipe Instansi</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 bg-white text-sm"
                  >
                    <option value="SPA">SPA</option>
                    <option value="HOTEL">HOTEL</option>
                    <option value="VILLA">VILLA</option>
                    <option value="RESTO">RESTO</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase">Status Awal</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 bg-white text-sm"
                  >
                    <option value="ACTIVE">ACTIVE (Mitra Aktif)</option>
                    <option value="LEAD">LEAD (Prospek Sample)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase">Nama PIC Penanggung Jawab</label>
                <input
                  required
                  type="text"
                  placeholder="Contoh: Ni Wayan Suasti (Spa Mgr)"
                  value={picName}
                  onChange={(e) => setPicName(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase">WhatsApp PIC (Format: 62...)</label>
                  <input
                    required
                    type="text"
                    placeholder="Contoh: 6285337280512"
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase">Email Mitra (Opsional)</label>
                  <input
                    type="email"
                    placeholder="Contoh: pic@hotel.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase">Alamat Pengiriman Lengkap</label>
                <textarea
                  required
                  placeholder="Nama jalan, nomor, kecamatan, kabupaten, area Lombok..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm h-16"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-500 font-bold text-sm hover:bg-gray-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-brand-green-500 hover:bg-brand-green-600 text-white font-bold text-sm"
                >
                  Daftarkan Mitra
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* ====================================================== */}
      {/* MODAL: EDIT CUSTOMER */}
      {/* ====================================================== */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="absolute top-6 right-6 text-gray-400 hover:bg-gray-50 p-2 rounded-xl"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Edit className="w-6 h-6 text-brand-green-500" />
              <span>Edit Profil Mitra B2B</span>
            </h3>

            {errorMsg && (
              <div className="p-4 mb-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase">Nama Instansi / Mitra</label>
                <input
                  required
                  type="text"
                  placeholder="Contoh: Sheraton Senggigi Resort"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase">Tipe Instansi</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 bg-white text-sm"
                  >
                    <option value="SPA">SPA</option>
                    <option value="HOTEL">HOTEL</option>
                    <option value="VILLA">VILLA</option>
                    <option value="RESTO">RESTO</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase">Status Mitra</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 bg-white text-sm"
                  >
                    <option value="ACTIVE">ACTIVE (Mitra Aktif)</option>
                    <option value="LEAD">LEAD (Prospek Sample)</option>
                    <option value="INACTIVE">INACTIVE (Nonaktif)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase">Nama PIC Penanggung Jawab</label>
                <input
                  required
                  type="text"
                  placeholder="Contoh: Ni Wayan Suasti (Spa Mgr)"
                  value={picName}
                  onChange={(e) => setPicName(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase">WhatsApp PIC (Format: 62...)</label>
                  <input
                    required
                    type="text"
                    placeholder="Contoh: 6285337280512"
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase">Email Mitra (Opsional)</label>
                  <input
                    type="email"
                    placeholder="Contoh: pic@hotel.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase">Alamat Pengiriman Lengkap</label>
                <textarea
                  required
                  placeholder="Nama jalan, nomor, kecamatan, kabupaten, area Lombok..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm h-16"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-500 font-bold text-sm hover:bg-gray-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-brand-green-500 hover:bg-brand-green-600 text-white font-bold text-sm"
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
