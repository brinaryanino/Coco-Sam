"use client";

import React, { useState } from "react";
import { Menu, X, MessageCircle } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Beranda", href: "#hero" },
    { name: "Manfaat", href: "#manfaat" },
    { name: "Kenapa Kami", href: "#kenapa-kami" },
    { name: "Produk", href: "#produk" },
    { name: "Testimoni", href: "#testimoni" },
    { name: "Tentang Kami", href: "#tentang-kami" },
    { name: "Dokumentasi ↗", href: "/dokumentasi", target: "_blank" },
  ];

  const waLink = "https://wa.me/6285337280512?text=Halo%20CocoSam%2C%20saya%20tertarik%20untuk%20kerja%20sama%20supply%20VCO%20untuk%20bisnis%20saya";

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-brand-green-100 shadow-xs transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <a href="#hero" className="flex items-center space-x-2 group">
            <svg
              className="w-10 h-10 text-brand-green-500 transform group-hover:rotate-12 transition-transform duration-300"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Green Coconut SVG */}
              <circle cx="12" cy="13" r="8" className="fill-brand-green-50/50 stroke-brand-green-500" strokeWidth="2" />
              <path d="M12 5a7 7 0 0 1 7 7" className="stroke-brand-green-400" />
              <path d="M12 9a3 3 0 0 1 3 3" className="stroke-brand-green-600" />
              {/* Leaf top */}
              <path d="M12 5c0-2 2-3 4-3s2 2 1 4-3 1-5-1z" className="fill-brand-green-500 stroke-brand-green-600" />
            </svg>
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
          <div className="hidden md:flex space-x-8 items-center">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target={item.target}
                rel={item.target ? "noopener noreferrer" : undefined}
                className="text-gray-600 hover:text-brand-green-700 font-medium transition-colors duration-200"
              >
                {item.name}
              </a>
            ))}
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-brand-green-500 hover:bg-brand-green-600 text-white px-5 py-2.5 rounded-full font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>WhatsApp B2B</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
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

      {/* Mobile Nav Links */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-brand-green-50 px-4 pt-4 pb-6 space-y-3 shadow-inner">
          {menuItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              target={item.target}
              rel={item.target ? "noopener noreferrer" : undefined}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-brand-green-700 hover:bg-brand-green-50 rounded-lg transition-all duration-200"
            >
              {item.name}
            </a>
          ))}
          <div className="pt-2">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="flex justify-center items-center space-x-2 w-full bg-brand-green-500 hover:bg-brand-green-600 text-white px-5 py-3 rounded-full font-semibold shadow-md transition-all duration-200"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              <span>Hubungi via WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
