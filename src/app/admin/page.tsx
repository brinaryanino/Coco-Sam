import React from "react";
import Link from "next/link";
import { getDashboardStats } from "@/app/actions/sales";
import { DollarSign, ShoppingBag, Users, Calendar, ArrowUpRight } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const result = await getDashboardStats();
  
  if (!result.success || !result.stats) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 text-red-700 rounded-2xl">
        Gagal memuat statistik dashboard: {result.error || "Unknown error"}
      </div>
    );
  }

  const { stats } = result;

  // Format currency helper (Rupiah)
  const formatRp = (num: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(num);
  };

  const cardItems = [
    {
      title: "Total Omzet (B2B)",
      value: formatRp(stats.totalRevenue),
      desc: "Total nilai dari pesanan aktif",
      icon: <DollarSign className="w-6 h-6 text-brand-green-600" />,
      bg: "bg-brand-green-50/50 border-brand-green-100",
    },
    {
      title: "Omzet Terbayar (Lunas)",
      value: formatRp(stats.paidRevenue),
      desc: "Pembayaran lunas yang telah diterima",
      icon: <DollarSign className="w-6 h-6 text-amber-600" />,
      bg: "bg-amber-50/50 border-amber-100",
    },
    {
      title: "Total Pesanan",
      value: stats.totalOrdersCount,
      desc: "Jumlah pesanan masuk keseluruhan",
      icon: <ShoppingBag className="w-6 h-6 text-blue-600" />,
      bg: "bg-blue-50/50 border-blue-100",
    },
    {
      title: "Mitra B2B",
      value: `${stats.activeCustomers} Aktif / ${stats.leadsCount} Prospek`,
      desc: "Total pelanggan dan lead sample",
      icon: <Users className="w-6 h-6 text-purple-600" />,
      bg: "bg-purple-50/50 border-purple-100",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Halo Admin CocoSam!</h1>
          <p className="text-gray-500 text-sm mt-0.5">Berikut adalah rekap performa supply VCO untuk hotel, spa, dan villa hari ini.</p>
        </div>
        <div className="flex space-x-3">
          <Link
            href="/admin/orders"
            className="bg-brand-green-500 hover:bg-brand-green-600 text-white font-bold px-4 py-2.5 rounded-xl text-sm shadow-sm transition-all"
          >
            Lihat Pesanan
          </Link>
          <Link
            href="/admin/customers"
            className="border border-gray-200 hover:border-gray-300 text-gray-600 font-bold px-4 py-2.5 rounded-xl text-sm bg-white shadow-sm transition-all"
          >
            Manage Mitra
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cardItems.map((item, idx) => (
          <div key={idx} className={`p-6 rounded-3xl border ${item.bg} bg-white shadow-sm flex items-start justify-between`}>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">{item.title}</span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 mt-2">{item.value}</h3>
              <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
            </div>
            <div className="p-3 bg-white rounded-2xl shadow-inner border border-gray-100/50">
              {item.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Orders List */}
        <div className="lg:col-span-8 bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-900 text-lg">Pesanan Terbaru</h3>
            <Link href="/admin/orders" className="text-sm font-semibold text-brand-green-600 hover:underline flex items-center gap-0.5">
              <span>Semua Pesanan</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-gray-400 font-semibold uppercase tracking-wider text-xs">
                  <th className="py-3 px-4">Invoice</th>
                  <th className="py-3 px-4">Mitra B2B</th>
                  <th className="py-3 px-4">Tanggal</th>
                  <th className="py-3 px-4">Total</th>
                  <th className="py-3 px-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {stats.recentOrders.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-6 text-center text-gray-400">Belum ada pesanan masuk.</td>
                  </tr>
                ) : (
                  stats.recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 px-4 font-bold text-brand-green-700">{order.invoiceNumber}</td>
                      <td className="py-4 px-4">
                        <div className="flex flex-col">
                          <span className="font-semibold text-gray-800">{order.customer.name}</span>
                          <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">{order.customer.type}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-500">
                        {new Date(order.orderDate).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td className="py-4 px-4 font-semibold text-gray-800">{formatRp(order.totalAmount)}</td>
                      <td className="py-4 px-4 text-center">
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
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Client Type Distribution Chart (CSS-based) */}
        <div className="lg:col-span-4 bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
          <h3 className="font-bold text-gray-900 text-lg mb-6">Distribusi Mitra B2B</h3>
          <div className="space-y-5">
            {["SPA", "HOTEL", "VILLA", "RESTO"].map((type) => {
              const count = stats.typeDistribution[type] || 0;
              const total = stats.totalCustomers || 1;
              const percent = Math.round((count / total) * 100);
              
              const barColors: Record<string, string> = {
                SPA: "bg-brand-green-500",
                HOTEL: "bg-blue-500",
                VILLA: "bg-amber-500",
                RESTO: "bg-purple-500",
              };

              return (
                <div key={type} className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold uppercase tracking-wider text-gray-500">{type}</span>
                    <span className="font-semibold text-gray-800">{count} Mitra ({percent}%)</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                    <div
                      className={`${barColors[type] || "bg-gray-500"} h-full rounded-full transition-all duration-500`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 border-t border-gray-100 pt-6 space-y-3">
            <h4 className="font-bold text-gray-800 text-xs uppercase tracking-wider">Ringkasan Aktivitas</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-3 rounded-2xl text-center">
                <span className="text-[10px] uppercase font-bold text-gray-400">Total Mitra</span>
                <p className="text-lg font-bold text-gray-900">{stats.totalCustomers}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-2xl text-center">
                <span className="text-[10px] uppercase font-bold text-gray-400">Total Transaksi</span>
                <p className="text-lg font-bold text-gray-900">{stats.totalOrdersCount}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
