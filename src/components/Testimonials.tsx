import React from "react";
import { Quote, Star } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      quote: "Tamu villa kami selalu suka VCO dari CocoSam. Kualitasnya premium, sangat cocok untuk treatment massage spa dan aromanya menenangkan.",
      author: "Ni Wayan S.",
      role: "Spa Manager",
      company: "Lombok Oasis Wellness Spa",
      bgColor: "bg-brand-green-50/40",
      borderColor: "border-brand-green-100",
    },
    {
      quote: "Sangat terbantu dengan layanan custom repacking CocoSam. Kami bisa memesan botol mini berlogo villa kami sebagai amenities esensial premium.",
      author: "David Miller",
      role: "Villa Owner",
      company: "Senggigi Sanctuary Villas",
      bgColor: "bg-brand-cream-50/50",
      borderColor: "border-brand-brown-200/50",
    },
    {
      quote: "Untuk menu healthy salad dressing dan cooking, kami hanya menggunakan VCO berkualitas tinggi. Supply CocoSam selalu konsisten dan tepat waktu.",
      author: "Chef Gede",
      role: "Head Chef",
      company: "The Green Garden Restaurant Kuta",
      bgColor: "bg-brand-green-50/40",
      borderColor: "border-brand-green-100",
    },
  ];

  return (
    <section id="testimoni" className="py-24 bg-brand-cream-100/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-green-500 bg-brand-green-50 px-4 py-1.5 rounded-full inline-block mb-3">
            TESTIMONI MITRA
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
            Apa Kata Mitra Bisnis CocoSam?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600">
            Dengarkan tanggapan langsung dari para pemilik bisnis spa, resort, villa, dan restoran di Lombok yang telah bermitra dengan kami.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className={`p-8 rounded-3xl border ${t.borderColor} ${t.bgColor} shadow-sm hover:shadow-lg transition-all duration-300 relative flex flex-col justify-between`}
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-8 text-brand-green-200/60 pointer-events-none">
                <Quote className="w-12 h-12 transform rotate-180 fill-current" />
              </div>

              {/* Content */}
              <div>
                {/* Stars */}
                <div className="flex space-x-1 mb-6 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 text-sm sm:text-base italic leading-relaxed mb-8 relative z-10">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center space-x-3 border-t border-gray-100 pt-4">
                <div className="w-10 h-10 rounded-full bg-brand-green-600 text-white font-bold flex items-center justify-center text-sm shadow-inner">
                  {t.author.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">{t.author}</h4>
                  <p className="text-xs text-gray-500 font-medium">
                    {t.role} — <span className="text-brand-green-700 font-semibold">{t.company}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
