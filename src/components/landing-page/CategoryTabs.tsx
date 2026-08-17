import React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Car04Icon,
  DashboardSquare02Icon,
  FootballIcon,
  HealtcareIcon,
  PartyIcon,
  SailboatOffshoreIcon,
  WellnessIcon,
} from "@hugeicons/core-free-icons";

interface CategoryTabsProps {
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
}

export default function CategoryTabs({
  selectedCategory,
  setSelectedCategory,
}: CategoryTabsProps) {
  return (
    <section className="w-full max-w-[1440px] mx-auto px-4 md:px-[64px] mt-16 font-poppins">
      <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-8 gap-4 justify-items-center pb-4 w-full">
        {/* ALL Category Card */}
        <button
          onClick={() => setSelectedCategory("all")}
          className={`flex w-[150px] h-[108px] flex-col items-center justify-center gap-[24px] rounded-xl transition-all duration-200 cursor-pointer shrink-0 ${
            selectedCategory === "all"
              ? "bg-[#111111] text-[#FCFAF9] shadow-md scale-105"
              : "bg-white text-[#111111] border border-neutral-100 hover:shadow-sm"
          }`}
        >
          <HugeiconsIcon icon={DashboardSquare02Icon} size={24} strokeWidth={1.5} />
          <span className="text-xs font-semibold tracking-wider uppercase">All</span>
        </button>

        {/* BEAUTY & WELLNESS */}
        <button
          onClick={() => setSelectedCategory("wellness")}
          className={`flex w-[150px] h-[108px] flex-col items-center justify-center gap-[24px] rounded-xl transition-all duration-200 cursor-pointer shrink-0 ${
            selectedCategory === "wellness"
              ? "bg-[#111111] text-[#817469] shadow-md scale-105"
              : "bg-white text-[#817469] border border-neutral-100 hover:shadow-sm"
          }`}
        >
          <div className="p-1 rounded bg-[#EDE3DE]">
            <HugeiconsIcon icon={WellnessIcon} size={24} strokeWidth={1.5} color="#111111" />
          </div>
          <span className="text-xs font-semibold tracking-wider uppercase text-center">Beauty & Wellness</span>
        </button>

        {/* HEALTH & FITNESS */}
        <button
          onClick={() => setSelectedCategory("health")}
          className={`flex w-[150px] h-[108px] flex-col items-center justify-center gap-[24px] rounded-xl transition-all duration-200 cursor-pointer shrink-0 ${
            selectedCategory === "health"
              ? "bg-[#111111] text-[#817469] shadow-md scale-105"
              : "bg-white text-[#817469] border border-neutral-100 hover:shadow-sm"
          }`}
        >
          <div className="p-1 rounded bg-[#EDE3DE]">
            <HugeiconsIcon icon={HealtcareIcon} size={24} strokeWidth={1.5} color="#111111" />
          </div>
          <span className="text-xs font-semibold tracking-wider uppercase text-center">Health & Fitness</span>
        </button>

        {/* SPORTS & ACTIVITIES */}
        <button
          onClick={() => setSelectedCategory("sports")}
          className={`flex w-[150px] h-[108px] flex-col items-center justify-center gap-[24px] rounded-xl transition-all duration-200 cursor-pointer shrink-0 ${
            selectedCategory === "sports"
              ? "bg-[#111111] text-[#817469] shadow-md scale-105"
              : "bg-white text-[#817469] border border-neutral-100 hover:shadow-sm"
          }`}
        >
          <div className="p-1 rounded bg-[#EDE3DE]">
            <HugeiconsIcon icon={FootballIcon} size={24} strokeWidth={1.5} color="#111111" />
          </div>
          <span className="text-xs font-semibold tracking-wider uppercase text-center">Sports & Activities</span>
        </button>

        {/* EXPERIENCES & TOURS */}
        <button
          onClick={() => setSelectedCategory("experiences")}
          className={`flex w-[150px] h-[108px] flex-col items-center justify-center gap-[24px] rounded-xl transition-all duration-200 cursor-pointer shrink-0 ${
            selectedCategory === "experiences"
              ? "bg-[#111111] text-[#817469] shadow-md scale-105"
              : "bg-white text-[#817469] border border-neutral-100 hover:shadow-sm"
          }`}
        >
          <div className="p-1 rounded bg-[#EDE3DE]">
            <HugeiconsIcon icon={SailboatOffshoreIcon} size={24} strokeWidth={1.5} color="#111111" />
          </div>
          <span className="text-xs font-semibold tracking-wider uppercase text-center">Experiences & Tours</span>
        </button>

        {/* ENTERTAINMENT & EVENTS */}
        <button
          onClick={() => setSelectedCategory("entertainment")}
          className={`flex w-[150px] h-[108px] flex-col items-center justify-center gap-[24px] rounded-xl transition-all duration-200 cursor-pointer shrink-0 ${
            selectedCategory === "entertainment"
              ? "bg-[#111111] text-[#817469] shadow-md scale-105"
              : "bg-white text-[#817469] border border-neutral-100 hover:shadow-sm"
          }`}
        >
          <div className="p-1 rounded bg-[#EDE3DE]">
            <HugeiconsIcon icon={PartyIcon} size={24} strokeWidth={1.5} color="#111111" />
          </div>
          <span className="text-xs font-semibold tracking-wider uppercase text-center">Events & Shows</span>
        </button>

        {/* AUTOMOTIVE */}
        <button
          onClick={() => setSelectedCategory("automotive")}
          className={`flex w-[150px] h-[108px] flex-col items-center justify-center gap-[24px] rounded-xl transition-all duration-200 cursor-pointer shrink-0 ${
            selectedCategory === "automotive"
              ? "bg-[#111111] text-[#817469] shadow-md scale-105"
              : "bg-white text-[#817469] border border-neutral-100 hover:shadow-sm"
          }`}
        >
          <div className="p-1 rounded bg-[#EDE3DE]">
            <HugeiconsIcon icon={Car04Icon} size={24} strokeWidth={1.5} color="#111111" />
          </div>
          <span className="text-xs font-semibold tracking-wider uppercase text-center">Automotive</span>
        </button>
      </div>
    </section>
  );
}
