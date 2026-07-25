"use client";

import React, { useState, useEffect, useRef } from "react";
import { Quote, Star, Building2, User, ChevronLeft, ChevronRight } from "lucide-react";
import { getTestimonialsList } from "@/app/actions/testimonials";

interface TestimonialItem {
  id: string;
  category: string;
  categoryLabel: string;
  author: string;
  role: string;
  quote: string;
  highlight: boolean;
}

export default function Testimonials() {
  const [filter, setFilter] = useState<"ALL" | "MITRA" | "KONSUMEN">("ALL");
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadData() {
      const res = await getTestimonialsList();
      if (res.success && res.data) {
        setTestimonials(res.data);
      }
      setIsLoading(false);
    }
    loadData();
  }, []);

  const filteredTestimonials = filter === "ALL" 
    ? testimonials 
    : testimonials.filter(t => t.category === filter);

  const mitraCount = testimonials.filter(t => t.category === "MITRA").length;
  const konsumenCount = testimonials.filter(t => t.category === "KONSUMEN").length;

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -380, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 380, behavior: "smooth" });
    }
  };

  return (
    <section id="testimoni" className="py-24 bg-brand-cream-100/30 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-brand-green-600 bg-brand-green-100/70 px-4 py-1.5 rounded-full inline-block mb-3 border border-brand-green-200/50">
              TESTIMONI NYATA
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
              Ulasan dari Mitra & Konsumen CocoSam
            </h2>
            <p className="mt-2 text-base text-gray-600">
              Geser / slide ke samping untuk membaca pengalaman mitra bisnis B2B & konsumen kami.
            </p>
          </div>

          {/* Controls: Filter & Arrow Buttons */}
          <div className="flex items-center gap-3 flex-wrap">
            {/* Filter Tabs */}
            <div className="inline-flex p-1 bg-white border border-gray-200 rounded-2xl shadow-xs gap-1">
              <button
                onClick={() => setFilter("ALL")}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  filter === "ALL"
                    ? "bg-brand-green-500 text-white shadow-xs"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                Semua ({testimonials.length})
              </button>
              <button
                onClick={() => setFilter("MITRA")}
                className={`flex items-center gap-1 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  filter === "MITRA"
                    ? "bg-brand-green-500 text-white shadow-xs"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Mitra ({mitraCount})</span>
              </button>
              <button
                onClick={() => setFilter("KONSUMEN")}
                className={`flex items-center gap-1 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  filter === "KONSUMEN"
                    ? "bg-brand-green-500 text-white shadow-xs"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>Konsumen ({konsumenCount})</span>
              </button>
            </div>

            {/* Slider Arrow Buttons */}
            <div className="flex items-center space-x-2">
              <button
                onClick={scrollLeft}
                className="w-10 h-10 rounded-full bg-white border border-gray-200 shadow-xs hover:bg-brand-green-50 hover:border-brand-green-200 text-gray-700 hover:text-brand-green-700 flex items-center justify-center transition-all"
                aria-label="Previous Testimonials"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={scrollRight}
                className="w-10 h-10 rounded-full bg-white border border-gray-200 shadow-xs hover:bg-brand-green-50 hover:border-brand-green-200 text-gray-700 hover:text-brand-green-700 flex items-center justify-center transition-all"
                aria-label="Next Testimonials"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Testimonials Horizontal Carousel Slider */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-6 pb-6 pt-2 scroll-smooth snap-x snap-mandatory no-scrollbar"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {filteredTestimonials.map((t, idx) => (
            <div
              key={t.id || idx}
              className={`w-[300px] sm:w-[380px] md:w-[420px] flex-shrink-0 snap-start p-7 rounded-3xl border border-gray-200/60 ${
                t.category === "MITRA" ? "bg-brand-green-50/40" : "bg-white"
              } shadow-sm hover:shadow-md transition-all duration-300 relative flex flex-col justify-between`}
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 text-brand-green-200/50 pointer-events-none">
                <Quote className="w-10 h-10 transform rotate-180 fill-current" />
              </div>

              {/* Content */}
              <div>
                {/* Category Badge & Rating */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full ${
                    t.category === "MITRA" 
                      ? "bg-brand-green-100 text-brand-green-800 border border-brand-green-200/60" 
                      : "bg-blue-50 text-blue-800 border border-blue-100"
                  }`}>
                    {t.categoryLabel}
                  </span>
                  <div className="flex space-x-0.5 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                </div>

                {/* Quote text */}
                <div className="text-gray-700 text-sm leading-relaxed mb-6 whitespace-pre-line relative z-10 min-h-[80px]">
                  &ldquo;{t.quote}&rdquo;
                </div>
              </div>

              {/* Author Info */}
              <div className="flex items-center space-x-3 border-t border-gray-200/40 pt-4 mt-2">
                <div className="w-10 h-10 rounded-full bg-brand-green-600 text-white font-extrabold flex items-center justify-center text-sm shadow-inner flex-shrink-0">
                  {t.author.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm leading-snug">{t.author}</h4>
                  <p className="text-xs text-gray-500 font-medium">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
