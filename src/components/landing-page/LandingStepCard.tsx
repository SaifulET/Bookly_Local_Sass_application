"use client";

import React, { useRef, useState, useEffect } from "react";

function useInView() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      {
        threshold: 0,
        rootMargin: "0px 0px -10px 0px"
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}

interface LandingStepCardProps {
  index: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function LandingStepCard({
  index,
  icon,
  title,
  description,
}: LandingStepCardProps) {
  const { ref, inView } = useInView();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const delay = isMobile ? 0 : index * 150;

  return (
    <div ref={ref} className="flex-1 min-w-0 h-full">
      <div
        className={`relative flex flex-col items-start p-5 gap-10 bg-white border border-[#E8E6FF] rounded-xl hover:shadow-md hover:-translate-y-1.5 hover:border-[#2E9DA7]/30 hover:duration-300 transition-all duration-[1400ms] ease-out h-full ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
        style={{ transitionDelay: `${delay}ms` }}
      >
        {/* Icon Container */}
        <div
          className="w-[68px] h-[68px] bg-[#2E9DA7] rounded-xl flex items-center justify-center shrink-0"
          style={{
            transform: inView ? "scale(1)" : "scale(0.5)",
            opacity: inView ? 1 : 0,
            transition: `transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay + 300}ms, opacity 0.3s ease ${delay + 300}ms`,
          }}
        >
          {icon}
        </div>

        {/* Text Area */}
        <div className="flex flex-col gap-3 w-full flex-1">
          <h3 className="text-[24px] font-medium leading-[32px] text-[#212121] tracking-tight font-poppins">
            {title}
          </h3>
          <p className="text-[16px] font-normal leading-[24px] text-[#757575]">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
