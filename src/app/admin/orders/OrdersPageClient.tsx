"use client";

import React, { useState } from "react";
import { createOrder, updateOrderStatus, addPayment, addShipment } from "@/app/actions/sales";
import { Plus, X, Landmark, Truck, RefreshCw, ShoppingCart, MessageSquare, AlertCircle } from "lucide-react";

interface OrdersPageClientProps {
  initialOrders: any[];
  customers: any[];
  products: any[];
}

export default function OrdersPageClient({
  initialOrders,
  customers,
  products,
}: OrdersPageClientProps) {
  const [orders, setOrders] = useState(initialOrders);
  
  // Modals
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isShipmentModalOpen, setIsShipmentModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // New Order Form state
  const [customerId, setCustomerId] = useState("");
  const [orderItems, setOrderItems] = useState<{ productId: string; quantity: number; unitPrice: number }[]>([
    { productId: "", quantity: 1, unitPrice: 0 },
  ]);
  const [orderNotes, setOrderNotes] = useState("");

  // Payment Form state
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("BANK_TRANSFER");

  // Shipment Form state
  const [courierName, setCourierName] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");

  // Status Form state
  const [newStatus, setNewStatus] = useState("");

  // Helper: Format Rupiah
  const formatRp = (num: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(num);
  };

  // Handler: Select product in order form
  const handleProductChange = (index: number, productId: string) => {
    const selectedProd = products.find((p) => p.id === productId);
    const updated = [...orderItems];
    updated[index].productId = productId;
    updated[index].unitPrice = selectedProd ? selectedProd.basePrice : 0;
    setOrderItems(updated);
  };

  // Handler: Change qty in order form
  const handleQtyChange = (index: number, qty: number) => {
    const updated = [...orderItems];
    updated[index].quantity = Math.max(1, qty);
    setOrderItems(updated);
  };

  // Handler: Change unit price (B2B negotiation)
  const handlePriceChange = (index: number, price: number) => {
    const updated = [...orderItems];
    updated[index].unitPrice = Math.max(0, price);
    setOrderItems(updated);
  };

  // Handler: Add item row in order form
  const addOrderItemRow = () => {
    setOrderItems([...orderItems, { productId: "", quantity: 1, unitPrice: 0 }]);
  };

  // Handler: Remove item row in order form
  const removeOrderItemRow = (index: number) => {
    if (orderItems.length > 1) {
      setOrderItems(orderItems.filter((_, i) => i !== index));
    }
  };

  // Calculate total for order form
  const calculateOrderFormTotal = () => {
    return orderItems.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  };

  // Submit: Create Order
  const handleCreateOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Validate items
    const invalidItems = orderItems.some((item) => !item.productId || item.quantity <= 0);
    if (invalidItems || !customerId) {
      setErrorMsg("Semua produk dan pelanggan wajib diisi dengan benar.");
      return;
    }

    const res = await createOrder({
      customerId,
      items: orderItems,
      notes: orderNotes,
    });

    if (res.success && res.order) {
      // Reload page to get fresh data
      window.location.reload();
    } else {
      setErrorMsg(res.error || "Gagal membuat pesanan.");
    }
  };

  // Submit: Log Payment
  const handleAddPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrder || paymentAmount <= 0) return;

    const res = await addPayment({
      orderId: selectedOrder.id,
      amount: paymentAmount,
      paymentMethod,
    });

    if (res.success) {
      window.location.reload();
    }
  };

  // Submit: Log Shipment
  const handleAddShipment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrder) return;

    const res = await addShipment({
      orderId: selectedOrder.id,
      courierName,
      trackingNumber,
    });

    if (res.success) {
      window.location.reload();
    }
  };

  // Submit: Update Status
  const handleUpdateStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrder || !newStatus) return;

    const res = await updateOrderStatus(selectedOrder.id, newStatus);
    if (res.success) {
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header action */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pesanan (Orders)</h1>
          <p className="text-gray-500 text-sm">Kelola transaksi supply, pembayaran, dan logistik pengiriman CocoSam.</p>
        </div>
        <button
          onClick={() => {
            setCustomerId("");
            setOrderItems([{ productId: "", quantity: 1, unitPrice: 0 }]);
            setOrderNotes("");
            setErrorMsg(null);
            setIsOrderModalOpen(true);
          }}
          className="inline-flex items-center space-x-2 bg-brand-green-500 hover:bg-brand-green-600 text-white font-bold px-5 py-3 rounded-2xl shadow-sm transition-all"
        >
          <Plus className="w-5 h-5" />
          <span>Buat Order Baru</span>
        </button>
      </div>

      {/* Orders List Table */}
      <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-gray-400 font-semibold uppercase tracking-wider text-xs">
                <th className="py-3 px-4">Invoice / Tanggal</th>
                <th className="py-3 px-4">Mitra B2B</th>
                <th className="py-3 px-4">Detail Produk</th>
                <th className="py-3 px-4">Nilai Tagihan</th>
                <th className="py-3 px-4">Status Bayar</th>
                <th className="py-3 px-4">Status Order</th>
                <th className="py-3 px-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-gray-400">Belum ada invoice pesanan terdaftar.</td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                    {/* Invoice */}
                    <td className="py-4 px-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-brand-green-700">{order.invoiceNumber}</span>
                        <span className="text-xs text-gray-400">
                          {new Date(order.orderDate).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </td>
                    
                    {/* Customer */}
                    <td className="py-4 px-4 font-semibold text-gray-800">
                      <div className="flex flex-col">
                        <span>{order.customer.name}</span>
                        <span className="text-[10px] uppercase font-bold text-brand-green-600 tracking-wider">
                          {order.customer.type}
                        </span>
                      </div>
                    </td>
                    
                    {/* Items detail summary */}
                    <td className="py-4 px-4 max-w-xs text-xs text-gray-500">
                      <div className="space-y-1">
                        {order.orderItems.map((item: any) => (
                          <div key={item.id}>
                            • {item.product.name} ({item.product.size}) x {item.quantity}{" "}
                            <span className="text-gray-400">@{formatRp(item.unitPrice)}</span>
                          </div>
                        ))}
                        {order.notes && (
                          <div className="text-[10px] text-brand-brown-600 font-medium italic mt-1 bg-brand-cream-50 px-2 py-0.5 rounded border border-brand-brown-100/30 flex items-center gap-1">
                            <MessageSquare className="w-3 h-3" />
                            <span>{order.notes}</span>
                          </div>
                        )}
                      </div>
                    </td>
                    
                    {/* Amount */}
                    <td className="py-4 px-4 font-bold text-gray-900">{formatRp(order.totalAmount)}</td>
                    
                    {/* Payment Status */}
                    <td className="py-4 px-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider ${
                        order.paymentStatus === "PAID"
                          ? "bg-green-100 text-green-800"
                          : order.paymentStatus === "PARTIAL"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-red-100 text-red-800"
                      }`}>
                        {order.paymentStatus}
                      </span>
                    </td>
                    
                    {/* Order Status */}
                    <td className="py-4 px-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider ${
                        order.status === "DELIVERED"
                          ? "bg-green-100 text-green-800"
                          : order.status === "SHIPPED"
                          ? "bg-blue-100 text-blue-800"
                          : order.status === "PROCESSING"
                          ? "bg-yellow-100 text-yellow-800"
                          : order.status === "CANCELLED"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    
                    {/* Actions */}
                    <td className="py-4 px-4 text-center">
                      <div className="inline-flex rounded-lg border border-gray-100 bg-white p-1 shadow-sm gap-1">
                        {order.paymentStatus !== "PAID" && (
                          <button
                            onClick={() => {
                              setSelectedOrder(order);
                              setPaymentAmount(order.totalAmount - order.payments.reduce((sum: number, p: any) => sum + p.amount, 0));
                              setPaymentMethod("BANK_TRANSFER");
                              setIsPaymentModalOpen(true);
                            }}
                            className="p-2 hover:bg-amber-50 text-amber-600 rounded-lg transition-colors"
                            title="Catat Pembayaran"
                          >
                            <Landmark className="w-4 h-4" />
                          </button>
                        )}
                        {order.status !== "SHIPPED" && order.status !== "DELIVERED" && order.status !== "CANCELLED" && (
                          <button
                            onClick={() => {
                              setSelectedOrder(order);
                              setCourierName("");
                              setTrackingNumber("");
                              setIsShipmentModalOpen(true);
                            }}
                            className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                            title="Kirim Pesanan"
                          >
                            <Truck className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => {
                            setSelectedOrder(order);
                            setNewStatus(order.status);
                            setIsStatusModalOpen(true);
                          }}
                          className="p-2 hover:bg-gray-50 text-gray-600 rounded-lg transition-colors"
                          title="Ubah Status Order"
                        >
                          <RefreshCw className="w-4 h-4" />
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
      {/* MODAL: CREATE ORDER */}
      {/* ====================================================== */}
      {isOrderModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setIsOrderModalOpen(false)}
              className="absolute top-6 right-6 text-gray-400 hover:bg-gray-50 p-2 rounded-xl"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <ShoppingCart className="w-6 h-6 text-brand-green-500" />
              <span>Buat Pesanan Baru</span>
            </h3>

            {errorMsg && (
              <div className="p-4 mb-5 bg-red-50 border border-red-200 text-red-700 text-sm rounded-2xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleCreateOrder} className="space-y-5">
              {/* Customer Select */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-400 uppercase">Pelanggan / Mitra B2B</label>
                <select
                  required
                  value={customerId}
                  onChange={(e) => setCustomerId(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-white text-sm"
                >
                  <option value="">-- Pilih Mitra --</option>
                  {customers.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.type})
                    </option>
                  ))}
                </select>
              </div>

              {/* Items Section */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-gray-400 uppercase block">Daftar Produk & Kuantitas</label>
                <div className="space-y-3 max-h-56 overflow-y-auto pr-2">
                  {orderItems.map((item, idx) => (
                    <div key={idx} className="flex gap-3 items-center">
                      <select
                        required
                        value={item.productId}
                        onChange={(e) => handleProductChange(idx, e.target.value)}
                        className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm bg-white"
                      >
                        <option value="">-- Pilih Produk --</option>
                        {products.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.name} ({p.size}) - Stok: {p.stock}
                          </option>
                        ))}
                      </select>
                      <input
                        required
                        type="number"
                        min="1"
                        placeholder="Qty"
                        value={item.quantity}
                        onChange={(e) => handleQtyChange(idx, parseInt(e.target.value) || 1)}
                        className="w-20 border border-gray-200 rounded-xl px-3 py-2 text-sm text-center"
                      />
                      <input
                        required
                        type="number"
                        min="0"
                        placeholder="Harga"
                        value={item.unitPrice}
                        onChange={(e) => handlePriceChange(idx, parseInt(e.target.value) || 0)}
                        className="w-32 border border-gray-200 rounded-xl px-3 py-2 text-sm text-center"
                      />
                      <button
                        type="button"
                        onClick={() => removeOrderItemRow(idx)}
                        disabled={orderItems.length === 1}
                        className="p-2 hover:bg-red-50 text-red-500 rounded-xl disabled:opacity-30"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={addOrderItemRow}
                  className="text-xs font-bold text-brand-green-600 hover:text-brand-green-700 mt-2 block"
                >
                  + Tambah Baris Produk
                </button>
              </div>

              {/* Notes */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-400 uppercase">Catatan Kustomisasi (Opsional)</label>
                <textarea
                  placeholder="Instruksi labeling logo custom, repacking, atau jadwal delivery..."
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm h-20"
                />
              </div>

              {/* Total Calculation */}
              <div className="border-t border-gray-100 pt-4 flex justify-between items-center bg-gray-50 p-4 rounded-2xl">
                <span className="font-bold text-gray-500 text-sm">Estimasi Total Tagihan</span>
                <span className="font-extrabold text-xl text-gray-900">{formatRp(calculateOrderFormTotal())}</span>
              </div>

              {/* Submit buttons */}
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsOrderModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-500 font-bold text-sm hover:bg-gray-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-brand-green-500 hover:bg-brand-green-600 text-white font-bold text-sm shadow-sm"
                >
                  Buat Invoice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ====================================================== */}
      {/* MODAL: LOG PAYMENT */}
      {/* ====================================================== */}
      {isPaymentModalOpen && selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
            <button onClick={() => setIsPaymentModalOpen(false)} className="absolute top-6 right-6 text-gray-400">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-bold text-gray-900 mb-6">Catat Pembayaran ({selectedOrder.invoiceNumber})</h3>

            <form onSubmit={handleAddPayment} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-400 uppercase">Jumlah Pembayaran</label>
                <input
                  required
                  type="number"
                  min="1"
                  max={selectedOrder.totalAmount}
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(parseInt(e.target.value) || 0)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-gray-800"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-400 uppercase">Metode Pembayaran</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-white text-sm"
                >
                  <option value="BANK_TRANSFER">Transfer Bank</option>
                  <option value="CASH">Tunai (Cash)</option>
                  <option value="COD">Cash on Delivery (COD)</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsPaymentModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-500 font-bold text-sm hover:bg-gray-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-brand-green-500 hover:bg-brand-green-600 text-white font-bold text-sm"
                >
                  Simpan Pembayaran
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ====================================================== */}
      {/* MODAL: LOG SHIPMENT */}
      {/* ====================================================== */}
      {isShipmentModalOpen && selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
            <button onClick={() => setIsShipmentModalOpen(false)} className="absolute top-6 right-6 text-gray-400">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-bold text-gray-900 mb-6">Kirim Barang ({selectedOrder.invoiceNumber})</h3>

            <form onSubmit={handleAddShipment} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-400 uppercase">Nama Kurir / Supir</label>
                <input
                  required
                  type="text"
                  placeholder="Contoh: Pak Budi (Supir Internal)"
                  value={courierName}
                  onChange={(e) => setCourierName(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-400 uppercase">Nomor Resi / Kargo (Opsional)</label>
                <input
                  type="text"
                  placeholder="Jika memakai kargo logistik"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsShipmentModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-500 font-bold text-sm hover:bg-gray-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-brand-green-500 hover:bg-brand-green-600 text-white font-bold text-sm"
                >
                  Konfirmasi Pengiriman
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ====================================================== */}
      {/* MODAL: UPDATE STATUS */}
      {/* ====================================================== */}
      {isStatusModalOpen && selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
            <button onClick={() => setIsStatusModalOpen(false)} className="absolute top-6 right-6 text-gray-400">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-bold text-gray-900 mb-6">Ubah Status Order</h3>

            <form onSubmit={handleUpdateStatus} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-400 uppercase">Status Pesanan</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-white text-sm"
                >
                  <option value="PENDING">PENDING (Menunggu Konfirmasi)</option>
                  <option value="CONFIRMED">CONFIRMED (Diterima & Disiapkan)</option>
                  <option value="PROCESSING">PROCESSING (Sedang Diproduksi/Kemas)</option>
                  <option value="SHIPPED">SHIPPED (Dalam Pengiriman)</option>
                  <option value="DELIVERED">DELIVERED (Barang Telah Sampai)</option>
                  <option value="CANCELLED">CANCELLED (Dibatalkan)</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsStatusModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-500 font-bold text-sm hover:bg-gray-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-brand-green-500 hover:bg-brand-green-600 text-white font-bold text-sm"
                >
                  Update Status
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
