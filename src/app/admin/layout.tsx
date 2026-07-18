"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ShoppingCart, Users, Package, ArrowLeft, Menu, X, Lock, KeyRound, ShieldAlert } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const pathname = usePathname();
  const CORRECT_PASSCODE = "cocosam2026";

  // Check auth session on mount
  useEffect(() => {
    const sessionAuth = sessionStorage.getItem("cocosam_admin_auth");
    if (sessionAuth === "true") {
      setIsAuthorized(true);
    }
    setIsLoading(false);
  }, []);

  // Close sidebar automatically on mobile when route changes
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === CORRECT_PASSCODE) {
      sessionStorage.setItem("cocosam_admin_auth", "true");
      setIsAuthorized(true);
      setErrorMsg("");
    } else {
      setErrorMsg("Passcode salah! Silakan coba lagi.");
      setPasscode("");
    }
  };

  const handleLock = () => {
    sessionStorage.removeItem("cocosam_admin_auth");
    setIsAuthorized(false);
  };

  const sidebarItems = [
    { name: "Dashboard", href: "/admin", icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: "Pesanan (Orders)", href: "/admin/orders", icon: <ShoppingCart className="w-5 h-5" /> },
    { name: "Pelanggan (Customers)", href: "/admin/customers", icon: <Users className="w-5 h-5" /> },
    { name: "Produk (Products)", href: "/admin/products", icon: <Package className="w-5 h-5" /> },
  ];

  // Loading state to prevent flash of lockscreen when session is valid
  if (isLoading) {
    return (
      <div className="min-h-screen bg-brand-cream-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-green-700" />
      </div>
    );
  }

  // Display Lock Screen if not authorized
  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-brand-cream-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-brand-green-100 shadow-xl text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-brand-green-50 text-brand-green-600 flex items-center justify-center mx-auto shadow-inner border border-brand-green-100/50">
            <Lock className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Protected Admin Area</h1>
            <p className="text-gray-500 text-sm mt-1">Masukkan passcode khusus untuk mengakses dashboard administrasi B2B.</p>
          </div>

          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl font-semibold flex items-center justify-center gap-1.5">
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
              Masuk Dashboard
            </button>
          </form>
          <div className="pt-2">
            <Link href="/" className="text-xs font-semibold text-brand-green-700 hover:underline">
              ← Kembali ke Halaman Utama
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Display Admin Dashboard when authorized
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
        <div className="p-4 border-t border-brand-green-800 space-y-2">
          <button
            onClick={handleLock}
            className="flex items-center justify-center space-x-2 w-full bg-red-800/80 hover:bg-red-700 text-white py-2 rounded-xl font-bold text-xs transition-all"
          >
            <Lock className="w-4 h-4" />
            <span>Kunci Panel Admin</span>
          </button>
          
          <Link
            href="/"
            className="flex items-center justify-center space-x-2 w-full bg-brand-green-800 hover:bg-brand-green-700 text-white py-2.5 rounded-xl font-bold text-xs transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Web</span>
          </Link>
          <div className="mt-4 text-[10px] text-brand-green-300 text-center uppercase tracking-wider font-semibold">
            Diproduksi oleh CocoSam
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
