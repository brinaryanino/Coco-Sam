"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Menu, X, MessageCircle, ChevronDown, Camera, Users, Sparkles } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuItems = [
    { name: "Beranda", href: "#hero" },
    { name: "Manfaat", href: "#manfaat" },
    { name: "Produk", href: "#produk" },
    { name: "Testimoni", href: "#testimoni" },
  ];

  const dropdownSubItems = [
    { name: "Kenapa Kami", href: "#kenapa-kami", icon: <Sparkles className="w-4 h-4 text-brand-green-600" /> },
    { name: "Tentang Kami", href: "#tentang-kami", icon: <Users className="w-4 h-4 text-brand-green-600" /> },
    { name: "Dokumentasi Foto ↗", href: "/dokumentasi", target: "_blank", icon: <Camera className="w-4 h-4 text-brand-green-600" /> },
  ];

  const waLink = "https://wa.me/6285337280512?text=Halo%20CocoSam%2C%20saya%20tertarik%20untuk%20kerja%20sama%20supply%20VCO%20untuk%20bisnis%20saya";

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-brand-green-100 shadow-xs transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <a href="#hero" className="flex items-center space-x-2.5 group">
            <div className="relative w-10 h-10 flex-shrink-0">
              <Image
                src="/hero-image.png"
                alt="CocoSam Logo"
                fill
                className="object-contain transform group-hover:scale-105 transition-transform duration-300"
                sizes="40px"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold tracking-tight text-brand-green-700 font-sans">
                Coco<span className="text-brand-brown-500">Sam</span>
              </span>
              <span className="text-[10px] tracking-widest text-brand-green-600 font-semibold uppercase -mt-1">
                Virgin Coconut Oil
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex space-x-7 items-center">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-brand-green-700 font-medium transition-colors duration-200 text-sm"
              >
                {item.name}
              </a>
            ))}

            {/* Dropdown for Kenapa Kami, Tentang Kami, & Dokumentasi */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                onMouseEnter={() => setIsDropdownOpen(true)}
                className="flex items-center space-x-1 text-gray-600 hover:text-brand-green-700 font-medium transition-colors duration-200 text-sm py-2"
              >
                <span>Tentang Kami</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? "rotate-180 text-brand-green-600" : ""}`} />
              </button>

              {/* Dropdown Menu Box */}
              {isDropdownOpen && (
                <div
                  onMouseLeave={() => setIsDropdownOpen(false)}
                  className="absolute right-0 top-full mt-1 w-56 bg-white border border-gray-100 rounded-2xl shadow-xl py-2 z-50 animate-fadeIn"
                >
                  {dropdownSubItems.map((subItem) => (
                    <a
                      key={subItem.name}
                      href={subItem.href}
                      target={subItem.target}
                      rel={subItem.target ? "noopener noreferrer" : undefined}
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center space-x-3 px-4 py-2.5 text-xs font-semibold text-gray-700 hover:text-brand-green-800 hover:bg-brand-green-50/60 transition-colors"
                    >
                      {subItem.icon}
                      <span>{subItem.name}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* WhatsApp CTA Icon Only Button */}
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-brand-green-500 hover:bg-brand-green-600 text-white flex items-center justify-center shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200"
              title="Hubungi WhatsApp B2B"
              aria-label="WhatsApp B2B"
            >
              <MessageCircle className="w-5 h-5 fill-white text-brand-green-500" />
            </a>
          </div>

          {/* Mobile Right Controls: WhatsApp Icon + Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-3">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-brand-green-500 hover:bg-brand-green-600 text-white flex items-center justify-center shadow-sm"
              title="WhatsApp B2B"
              aria-label="WhatsApp B2B"
            >
              <MessageCircle className="w-4 h-4 fill-white text-brand-green-500" />
            </a>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-brand-green-700 p-2 hover:bg-brand-green-50 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Links Drawer */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-brand-green-50 px-4 pt-4 pb-6 space-y-2 shadow-inner">
          {menuItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-brand-green-700 hover:bg-brand-green-50 rounded-lg transition-all duration-200"
            >
              {item.name}
            </a>
          ))}

          {/* Mobile Dropdown Items List */}
          <div className="pt-2 border-t border-gray-100 space-y-1">
            <span className="block px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-brand-green-700">
              Profil & Informasi
            </span>
            {dropdownSubItems.map((subItem) => (
              <a
                key={subItem.name}
                href={subItem.href}
                target={subItem.target}
                rel={subItem.target ? "noopener noreferrer" : undefined}
                onClick={() => setIsOpen(false)}
                className="flex items-center space-x-2.5 px-3 py-2 text-sm font-medium text-gray-600 hover:text-brand-green-800 hover:bg-brand-green-50 rounded-lg transition-all"
              >
                {subItem.icon}
                <span>{subItem.name}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
