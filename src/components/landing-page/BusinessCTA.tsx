import React from "react";
import Link from "next/link";

export default function BusinessCTA() {
  return (
    <section className="w-full mt-[98px] mb-24 px-4 md:px-8 xl:px-0 font-poppins">
      <div className="flex flex-col items-center gap-[40px] text-center">
        {/* Header Block (Title and Subtitle) */}
        <div className="flex flex-col items-center gap-[20px] max-w-[607px]">
          <h2 className="text-3xl md:text-[36px] font-medium leading-tight md:leading-[48px] text-[#16123E] tracking-tight">
            Bookly for Business
          </h2>
          <p className="text-lg md:text-[24px] font-normal leading-normal md:leading-[32px] text-[#757575]">
            Stop losing revenue to no-shows and missed calls.
          </p>
        </div>

        {/* Body Description */}
        <p className="w-full text-lg md:text-[24px] font-normal leading-normal md:leading-[36px] text-black font-sans">
          Bookly fills your calendar, protects your income, and brings you new customers — automatically
        </p>

        {/* CTA Button */}
        <Link
          href="/list-your-business"
          className="flex flex-row items-center justify-center py-3 px-6 gap-[8px] w-full sm:w-[290px] h-[48px] bg-[#141414] hover:bg-black text-white rounded-full transition-all active:scale-95 cursor-pointer font-inter font-semibold text-[15.7px] leading-[24px]"
        >
          <span>List your Business - It’s free</span>
          {/* White arrow icon */}
          <svg
            className="w-[18px] h-[18px] text-white shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </Link>
      </div>
    </section>
  );
}
