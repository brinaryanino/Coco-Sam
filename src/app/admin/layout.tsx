import React from "react";
import Link from "next/link";
import { LayoutDashboard, ShoppingCart, Users, Leaf, ArrowLeft } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sidebarItems = [
    { name: "Dashboard", href: "/admin", icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: "Pesanan (Orders)", href: "/admin/orders", icon: <ShoppingCart className="w-5 h-5" /> },
    { name: "Pelanggan (Customers)", href: "/admin/customers", icon: <Users className="w-5 h-5" /> },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-brand-green-900 text-white flex flex-col fixed inset-y-0 left-0 z-30 shadow-xl">
        {/* Brand */}
        <div className="h-20 flex items-center px-6 border-b border-brand-green-800">
          <Link href="/" className="flex items-center space-x-2">
            <svg className="w-8 h-8 text-brand-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="13" r="8" className="fill-brand-green-900/50 stroke-brand-green-400" />
              <path d="M12 5a7 7 0 0 1 7 7" className="stroke-brand-green-300" />
              <path d="M12 9a3 3 0 0 1 3 3" className="stroke-brand-green-400" />
              <path d="M12 5c0-2 2-3 4-3s2 2 1 4-3 1-5-1z" className="fill-brand-green-400 stroke-brand-green-400" />
            </svg>
            <span className="text-xl font-bold tracking-tight">
              Coco<span className="text-brand-brown-400">Sam</span> Admin
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          {sidebarItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center space-x-3 px-4 py-3 rounded-xl text-brand-green-100 hover:text-white hover:bg-brand-green-800 transition-colors"
            >
              {item.icon}
              <span className="font-semibold text-sm">{item.name}</span>
            </Link>
          ))}
        </nav>

        {/* Footer info & Exit */}
        <div className="p-4 border-t border-brand-green-800">
          <Link
            href="/"
            className="flex items-center justify-center space-x-2 w-full bg-brand-green-800 hover:bg-brand-green-700 text-white py-2.5 rounded-xl font-bold text-sm transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Web</span>
          </Link>
          <div className="mt-4 text-[10px] text-brand-green-300 text-center uppercase tracking-wider font-semibold">
            Diproduksi oleh IKM Al-Amin
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="pl-64 w-full flex flex-col min-h-screen">
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900">B2B Sales Portal</h2>
          <div className="flex items-center space-x-3">
            <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-ping" />
            <span className="text-sm font-semibold text-gray-500">Live Database Connected</span>
          </div>
        </header>
        <main className="flex-1 p-8 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}
