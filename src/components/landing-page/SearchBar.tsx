"use client";

import React, { useState, useRef, useEffect } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Search01Icon,
  Location05Icon,
  Clock01Icon,
} from "@hugeicons/core-free-icons";
import SearchTimePicker from "./SearchTimePicker";
import SearchSuggestionsDropdown from "./SearchSuggestionsDropdown";

interface SearchBarProps {
  onSearch?: (searchQuery: string, locationQuery: string, selectedTime: string) => void;
  className?: string;
}

export default function SearchBar({ onSearch, className = "" }: SearchBarProps) {
  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");

  // Time selector states
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState("Any Time");
  
  const [currentLocationActive, setCurrentLocationActive] = useState(false);

  // Search dropdown states
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [dropdownFilter, setDropdownFilter] = useState("All");
  const [activeSegment, setActiveSegment] = useState<"search" | "location" | "time" | null>(null);
  const [hoveredSegment, setHoveredSegment] = useState<"search" | "location" | "time" | null>(null);
  
  const searchBarRef = useRef<HTMLDivElement>(null);
  const timeSelectorRef = useRef<HTMLDivElement>(null);
  const [dropdownWidth, setDropdownWidth] = useState<number | null>(null);

  useEffect(() => {
    let frameId: number;
    const updateWidth = () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
      frameId = requestAnimationFrame(() => {
        if (searchBarRef.current && timeSelectorRef.current) {
          const searchRect = searchBarRef.current.getBoundingClientRect();
          const timeRect = timeSelectorRef.current.getBoundingClientRect();
          const width = (timeRect.left + timeRect.width / 2) - searchRect.left;
          setDropdownWidth(width);
        }
      });
    };

    updateWidth();
    window.addEventListener("resize", updateWidth, { passive: true });
    const timer = setTimeout(updateWidth, 100);

    return () => {
      window.removeEventListener("resize", updateWidth);
      clearTimeout(timer);
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
    };
  }, [showSearchDropdown]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
        setShowSearchDropdown(false);
        setShowTimePicker(false);
        setActiveSegment(null);
      } else if (timeSelectorRef.current && !timeSelectorRef.current.contains(event.target as Node)) {
        setShowTimePicker(false);
        setActiveSegment((prev) => (prev === "time" ? null : prev));
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const handleSelectTime = (time: string) => {
    setSelectedTime(time);
  };

  return (
    <div className={`w-full max-w-[900px] flex flex-col items-center ${className} font-poppins`}>
      {/* Search Bar container */}
      <div 
        ref={searchBarRef} 
        className={`w-full rounded-2xl md:rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.05)] border border-[#E8E6FF] p-2 md:p-3 flex flex-col md:flex-row items-center gap-2 md:gap-0 relative transition-colors duration-300 ${
          activeSegment !== null ? "bg-[#F2F2F2]" : "bg-white"
        } ${showSearchDropdown ? "z-[200]" : "z-30"}`}
      >
        {/* Search Input */}
        <div
          onMouseEnter={() => setHoveredSegment("search")}
          onMouseLeave={() => setHoveredSegment(null)}
          className={`flex-1 w-full flex items-center gap-3 px-6 py-2.5 md:py-1.5 transition-all duration-300 ${
            activeSegment === "search"
              ? "bg-white shadow-[0_4px_12px_rgba(0,0,0,0.08)] rounded-full z-10"
              : activeSegment !== null
                ? "hover:bg-black/5 rounded-full"
                : "hover:bg-[#F2F2F2] rounded-full"
          }`}
        >
          <HugeiconsIcon icon={Search01Icon} className="text-[#111111]" />
          <input
            type="text"
            placeholder="What are you looking for"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => {
              setShowSearchDropdown(true);
              setActiveSegment("search");
              setShowTimePicker(false);
            }}
            className="w-full h-10 text-sm text-[#1C1B1C] placeholder-[#757575] bg-transparent outline-none font-medium"
          />
        </div>

        {/* Divider 1 */}
        {activeSegment !== "search" && activeSegment !== "location" && hoveredSegment !== "search" && hoveredSegment !== "location" && (
          <div className="hidden md:block w-[1px] h-8 bg-[#EBEBEB]" />
        )}

        {/* Location Selector */}
        <div
          onMouseEnter={() => setHoveredSegment("location")}
          onMouseLeave={() => setHoveredSegment(null)}
          className={`relative flex-1 w-full flex items-center gap-3 px-6 py-2.5 md:py-1.5 transition-all duration-300 ${
            activeSegment === "location"
              ? "bg-white shadow-[0_4px_12px_rgba(0,0,0,0.08)] rounded-full z-10"
              : activeSegment !== null
                ? "hover:bg-black/5 rounded-full"
                : "hover:bg-[#F2F2F2] rounded-full"
          }`}
        >
          <HugeiconsIcon icon={Location05Icon} className="text-[#111111]" />
          <input
            type="text"
            placeholder="Anywhere in Cyprus"
            value={locationQuery}
            onChange={(e) => setLocationQuery(e.target.value)}
            onFocus={() => {
              setActiveSegment("location");
              setShowTimePicker(false);
              setShowSearchDropdown(false);
              if (typeof window !== "undefined" && window.innerWidth < 768) {
                setShowSearchDropdown(true);
              }
            }}
            className="w-full h-10 text-sm text-[#1C1B1C] placeholder-[#757575] bg-transparent outline-none font-medium"
          />

          {/* Location Dropdown (Desktop) */}
          {activeSegment === "location" && (
            <div className="hidden md:flex absolute top-[110%] left-0 w-[350px] h-[590px] p-5 bg-white rounded-[12px] shadow-2xl z-50 border border-neutral-200/80 flex-col gap-[40px] overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200 font-poppins text-left">
              <div className="flex flex-row justify-between items-center w-[310px] h-10 shrink-0 gap-[83px]">
                <span className="font-poppins font-medium text-[18px] leading-[26px] text-[#111111] select-none">Current Location</span>
                <button
                  type="button"
                  onClick={() => {
                    setCurrentLocationActive(!currentLocationActive);
                    if (!currentLocationActive) {
                      setLocationQuery("Current location");
                    } else {
                      setLocationQuery("");
                    }
                  }}
                  className={`w-[78px] h-10 rounded-[20px] flex items-center transition-all duration-300 ${currentLocationActive ? "pl-[40px] pr-[6px] bg-[#3586B8]" : "pl-[6px] pr-[40px] bg-[#D3D3D3]"}`}
                >
                  <div className="w-8 h-8 rounded-full bg-[rgba(0,0,0,0.2)] transition-all duration-200" />
                </button>
              </div>

              <div className="flex flex-col items-start gap-[12px] w-[310px] shrink-0">
                {[
                  "Larnaca, Cyprus",
                  "Limassol, Cyprus",
                  "Pafos, Cyprus",
                  "Nicosia, Cyprus",
                  "Ayia Napa, Cyprus",
                  "Protaras, Cyprus"
                ].map((loc, index, arr) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => {
                      setLocationQuery(loc);
                      setActiveSegment(null);
                    }}
                    className="w-[310px] flex flex-col items-start gap-[12px] group cursor-pointer border-0 bg-transparent text-left"
                  >
                    <div className="flex flex-row items-center gap-[16px] w-[310px] h-[30px]">
                      <HugeiconsIcon icon={Location05Icon} className="text-[#0C0C0C] w-6 h-6 shrink-0" />
                      <span className="font-poppins font-medium text-[18px] leading-[30px] text-[#111111] group-hover:text-neutral-600 transition-colors">
                        {loc}
                      </span>
                    </div>
                    {index < arr.length - 1 && (
                      <div className="w-[310px] h-0 border-t border-[#ACAAB4]" />
                    )}
                  </button>
                ))}
              </div>

              <div className="flex flex-col items-start gap-[16px] w-[310px] shrink-0">
                <span className="font-poppins font-medium text-[18px] leading-[30px] text-[#111111] select-none">Recent</span>
                <div className="flex flex-col items-start gap-[12px] w-[310px]">
                  {[
                    "Pafos, Cyprus",
                    "Limassol, Cyprus"
                  ].map((loc, index, arr) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => {
                        setLocationQuery(loc);
                        setActiveSegment(null);
                      }}
                      className="w-[310px] flex flex-col items-start gap-[12px] group cursor-pointer border-0 bg-transparent text-left"
                    >
                      <div className="flex flex-row items-center gap-[16px] w-[310px] h-[30px]">
                        <HugeiconsIcon icon={Location05Icon} className="text-[#0C0C0C] w-6 h-6 shrink-0" />
                        <span className="font-poppins font-medium text-[18px] leading-[30px] text-[#111111] group-hover:text-neutral-600 transition-colors">
                          {loc}
                        </span>
                      </div>
                      {index < arr.length - 1 && (
                        <div className="w-[310px] h-0 border-t border-[#ACAAB4]" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Divider 2 */}
        {activeSegment !== "location" && activeSegment !== "time" && hoveredSegment !== "location" && hoveredSegment !== "time" && (
          <div className="hidden md:block w-[1px] h-8 bg-[#EBEBEB]" />
        )}

        {/* Time Selector */}
        <div
          ref={timeSelectorRef}
          onMouseEnter={() => setHoveredSegment("time")}
          onMouseLeave={() => setHoveredSegment(null)}
          className={`relative flex-1 w-full flex items-center justify-between px-6 py-2.5 md:py-1.5 md:mr-2 transition-all duration-300 ${
            activeSegment === "time"
              ? "bg-white shadow-[0_4px_12px_rgba(0,0,0,0.08)] rounded-full z-10"
              : activeSegment !== null
                ? "hover:bg-black/5 rounded-full"
                : "hover:bg-[#F2F2F2] rounded-full"
          }`}
        >
          <button
            type="button"
            onClick={() => {
              if (typeof window !== "undefined" && window.innerWidth < 768) {
                setShowSearchDropdown(true);
                setActiveSegment("time");
                setShowTimePicker(false);
              } else {
                const nextVal = !showTimePicker;
                setShowTimePicker(nextVal);
                if (nextVal) {
                  setShowSearchDropdown(false);
                  setActiveSegment("time");
                } else {
                  setActiveSegment(null);
                }
              }
            }}
            className="w-full flex items-center gap-3 text-left py-2 text-sm text-[#757575] hover:text-[#1C1B1C] transition-colors cursor-pointer border-0 bg-transparent"
          >
            <HugeiconsIcon icon={Clock01Icon} className="text-[#111111]" />
            <span className="text-[#1C1B1C] font-medium truncate">
              {selectedTime === "Any Time" ? "Anytime" : selectedTime}
            </span>
          </button>

          {/* Time Picker Popup Dropdown */}
          {showTimePicker && (
            <SearchTimePicker onSelectTime={handleSelectTime} />
          )}
        </div>

        {/* Search Action Button */}
        <button
          type="button"
          className="w-full md:w-auto bg-[#1C1B1C] hover:bg-black text-white px-6 py-3 rounded-xl md:rounded-full flex items-center justify-center gap-2 text-sm font-semibold transition-all duration-200 cursor-pointer shrink-0 active:scale-95"
          onClick={() => {
            if (onSearch) {
              onSearch(searchQuery, locationQuery, selectedTime);
            }
            setShowSearchDropdown(false);
            setShowTimePicker(false);
            setActiveSegment(null);
          }}
        >
          <span>Search</span>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>

        {/* Search Suggestions dropdown wrapper */}
        {showSearchDropdown && (
          <SearchSuggestionsDropdown
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            locationQuery={locationQuery}
            setLocationQuery={setLocationQuery}
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
            dropdownFilter={dropdownFilter}
            setDropdownFilter={setDropdownFilter}
            dropdownWidth={dropdownWidth}
            activeSegment={activeSegment}
            setActiveSegment={setActiveSegment}
            setShowSearchDropdown={setShowSearchDropdown}
            setShowTimePicker={setShowTimePicker}
            currentLocationActive={currentLocationActive}
            setCurrentLocationActive={setCurrentLocationActive}
            onSearch={onSearch}
          />
        )}
      </div>
    </div>
  );
}
