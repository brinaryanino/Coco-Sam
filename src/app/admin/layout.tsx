"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ShoppingCart, Users, ArrowLeft, Menu, X } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Close sidebar automatically on mobile when route changes
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  const sidebarItems = [
    { name: "Dashboard", href: "/admin", icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: "Pesanan (Orders)", href: "/admin/orders", icon: <ShoppingCart className="w-5 h-5" /> },
    { name: "Pelanggan (Customers)", href: "/admin/customers", icon: <Users className="w-5 h-5" /> },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800 relative">
      {/* Mobile Sidebar Overlay Backdrop */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs lg:hidden transition-opacity duration-300"
        />
      )}

      {/* Sidebar Drawer */}
      <aside
        className={`w-64 bg-brand-green-900 text-white flex flex-col fixed inset-y-0 left-0 z-50 shadow-xl transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        {/* Brand Header */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-brand-green-800">
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
          {/* Close Sidebar Button (Mobile Only) */}
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-1 rounded-lg hover:bg-brand-green-800 text-brand-green-200 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation links */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-brand-green-800 text-white font-bold shadow-sm"
                    : "text-brand-green-100 hover:text-white hover:bg-brand-green-800/60"
                }`}
              >
                {item.icon}
                <span className="text-sm font-semibold">{item.name}</span>
              </Link>
            );
          })}
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
      <div className="w-full lg:pl-64 flex flex-col min-h-screen">
        {/* Top Header Bar */}
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-4 sm:px-8 shadow-sm">
          <div className="flex items-center space-x-3">
            {/* Hamburger Button (Mobile Only) */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-600 focus:outline-none"
              aria-label="Open Sidebar"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">B2B Sales Portal</h2>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-3">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
            <span className="text-xs sm:text-sm font-semibold text-gray-500">Live Database Connected</span>
          </div>
        </header>
        
        {/* Main Dashboard Pages */}
        <main className="flex-1 p-4 sm:p-8 bg-gray-50 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
