import React from "react";
import { ShieldCheck, Award, Leaf } from "lucide-react";

export default function TrustBadges() {
  return (
    <div className="bg-brand-green-700 text-white py-6 shadow-md relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-center md:text-left">
          {/* Certificate row */}
          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10">
            <div className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-brand-brown-300 fill-brand-brown-300/20" />
              <span className="text-sm font-semibold tracking-wider uppercase">Halal Indonesia</span>
            </div>
            <div className="h-4 w-px bg-brand-green-600 hidden sm:block" />
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-brand-green-300" />
              <span className="text-sm font-semibold tracking-wider uppercase">Izin P-IRT Approved</span>
            </div>
            <div className="h-4 w-px bg-brand-green-600 hidden sm:block" />
            <div className="flex items-center space-x-2">
              <Leaf className="w-5 h-5 text-green-300 fill-green-300/10" />
              <span className="text-sm font-semibold tracking-wider uppercase">100% Nature Cold-Pressed</span>
            </div>
          </div>

          {/* IKM Al-Amin Lombok Label */}
          <div className="text-xs sm:text-sm font-medium text-brand-green-100 bg-brand-green-800/80 px-4 py-1.5 rounded-full border border-brand-green-600/30">
            Diproduksi oleh: <span className="font-bold text-white">CocoSam, Lombok - Indonesia</span>
          </div>
        </div>
      </div>
    </div>
  );
}
