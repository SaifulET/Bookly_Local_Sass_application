"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function TopBannerWrapper() {
  const router = useRouter();
  const [showBanner, setShowBanner] = useState(true);

  if (!showBanner) return null;

  return (
    <div className="w-full bg-[#96C3CD] text-[#111111] px-3 sm:px-[16px] py-2.5 sm:py-[16px] flex items-center justify-between transition-all duration-300 relative z-50 text-[10px] sm:text-xs md:text-sm font-medium">
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        <div className="w-[17px] h-[20px] flex items-center justify-center shrink-0">
          <Image src="/img/smallBLogo.svg" alt="B" className="w-full h-full object-contain" width={17} height={20} />
        </div>
        <span className="truncate">Reach new customers across Cyprus. Zero monthly fees. No risk</span>
      </div>

      <div className="flex items-center gap-2 sm:gap-4 shrink-0">
        <button
          onClick={() => router.push("/list-your-business")}
          className="bg-white hover:bg-neutral-50 text-[#1C1B1C] px-4 py-1.5 rounded-full font-semibold shadow-sm transition-all active:scale-95 cursor-pointer flex items-center gap-1.5 whitespace-nowrap text-[10px] sm:text-xs md:text-sm"
        >
          <span>List your Business</span>
          <svg className="w-3.5 h-3.5 text-[#111111] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
        <button
          onClick={() => setShowBanner(false)}
          className="text-[#1C1B1C] hover:opacity-75 transition-opacity cursor-pointer p-1"
          aria-label="Close Banner"
        >
          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
