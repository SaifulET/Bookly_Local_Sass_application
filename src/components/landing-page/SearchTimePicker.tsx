import React, { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Clock01Icon } from "@hugeicons/core-free-icons";

interface SearchTimePickerProps {
  onSelectTime: (time: string) => void;
}

export default function SearchTimePicker({ onSelectTime }: SearchTimePickerProps) {
  // Calendar & Time picker state
  const [selectedDate, setSelectedDate] = useState<Date>(new Date(2026, 7, 17)); // Default mock date (Aug 17, 2026)
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(7); // August (0-indexed)
  const [selectedTimeOption, setSelectedTimeOption] = useState<"Any time" | "Morning" | "Afternoon" | "Evening" | "Custom">("Any time");
  
  const [customStartTime, setCustomStartTime] = useState("04:00");
  const [customStartAmPm, setCustomStartAmPm] = useState<"AM" | "PM">("PM");
  const [customEndTime, setCustomEndTime] = useState("04:00");
  const [customEndAmPm, setCustomEndAmPm] = useState<"AM" | "PM">("PM");

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const getFormattedHeaderDate = (date: Date) => {
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${weekdays[date.getDay()]}, ${monthNames[date.getMonth()]} ${date.getDate()}`;
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

  const updateSelectedTimeDisplay = (
    date: Date,
    option: "Any time" | "Morning" | "Afternoon" | "Evening" | "Custom",
    startTime?: string,
    startAmPm?: string,
    endTime?: string,
    endAmPm?: string
  ) => {
    const formattedDate = date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    const currentStart = startTime || customStartTime;
    const currentStartAmPm = startAmPm || customStartAmPm;
    const currentEnd = endTime || customEndTime;
    const currentEndAmPm = endAmPm || customEndAmPm;

    if (option === "Custom") {
      onSelectTime(`${formattedDate}, ${currentStart} ${currentStartAmPm} - ${currentEnd} ${currentEndAmPm}`);
    } else {
      onSelectTime(`${formattedDate}, ${option}`);
    }
  };

  return (
    <div className="hidden md:flex absolute top-[110%] right-[-100px] md:right-[-250px] w-[95vw] max-w-[812px] md:w-[812px] md:h-[704px] p-5 bg-white rounded-[12px] shadow-2xl z-50 border border-neutral-200/80 animate-in fade-in slide-in-from-top-2 duration-200 flex-col gap-10 overflow-y-auto font-roboto">
      <div className="flex flex-col items-start gap-4 w-full">
        <div className="flex flex-row justify-between items-center w-full py-1">
          <div className="flex items-center gap-1 cursor-pointer">
            <span className="font-roboto font-medium text-sm text-[#111111]">{months[currentMonth]} {currentYear}</span>
            <svg className="w-4 h-4 text-[#111111]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <div className="flex items-center gap-0">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-neutral-100 transition-colors"
            >
              <svg className="w-6 h-6 text-[#111111]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={handleNextMonth}
              className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-neutral-100 transition-colors"
            >
              <svg className="w-6 h-6 text-[#111111]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <div className="w-full pt-0 pr-3 pb-3 pl-6 border-b border-[#CAC4D0]">
          <h3 className="font-roboto font-normal text-[32px] leading-10 text-[#111111] text-left">
            {getFormattedHeaderDate(selectedDate)}
          </h3>
        </div>

        <div className="grid grid-cols-7 w-full text-center px-3">
          {["S", "M", "T", "W", "T", "F", "S"].map((d, index) => (
            <span key={index} className="font-roboto font-normal text-base leading-6 text-[#111111] py-2">{d}</span>
          ))}
        </div>

        {(() => {
          const daysInMonth = getDaysInMonth(currentYear, currentMonth);
          const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
          const cells = [];
          for (let i = 0; i < firstDay; i++) {
            cells.push(<div key={`empty-${i}`} className="w-10 h-10" />);
          }
          for (let day = 1; day <= daysInMonth; day++) {
            const dateObj = new Date(currentYear, currentMonth, day);
            const isSelected = selectedDate &&
              selectedDate.getDate() === day &&
              selectedDate.getMonth() === currentMonth &&
              selectedDate.getFullYear() === currentYear;

            cells.push(
              <div key={`day-${day}`} className="h-10 flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedDate(dateObj);
                    updateSelectedTimeDisplay(dateObj, selectedTimeOption);
                  }}
                  className={`w-10 h-10 flex items-center justify-center rounded-full font-roboto text-base transition-colors ${isSelected
                      ? "bg-[#666666] text-white font-medium"
                      : "text-[#111111] hover:bg-neutral-100"
                    }`}
                >
                  {day}
                </button>
              </div>
            );
          }
          return <div className="grid grid-cols-7 w-full text-center gap-y-1 px-3">{cells}</div>;
        })()}
      </div>

      <div className="flex flex-col items-start gap-4 w-full mt-auto pt-4 border-t border-neutral-100">
        <div className="flex flex-row items-center justify-between w-full">
          <span className="font-roboto font-bold text-sm text-[#111111] shrink-0">Select time</span>
          <div className="flex flex-row items-center justify-between flex-1 ml-10">
            {[
              { id: "Any time", label: "Any time", sub: "" },
              { id: "Morning", label: "Morning", sub: "9am - 12pm" },
              { id: "Afternoon", label: "Afternoon", sub: "12pm - 5pm" },
              { id: "Evening", label: "Evening", sub: "5pm - 12am" }
            ].map((opt) => {
              const isActive = selectedTimeOption === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => {
                    setSelectedTimeOption(opt.id as any);
                    updateSelectedTimeDisplay(selectedDate, opt.id as any);
                  }}
                  className={`flex flex-col items-center justify-center transition-all ${isActive
                      ? "border border-[#3A506B] rounded-xl px-5 py-2.5 bg-white text-[#111111] font-bold shadow-sm"
                      : "border border-transparent text-[#4A607A] hover:bg-neutral-50 p-2"
                    }`}
                >
                  <span className="text-sm font-semibold">{opt.label}</span>
                  {opt.sub && <span className={`text-xs ${isActive ? 'text-[#111111] font-semibold' : 'text-[#7A8B9E]'}`}>{opt.sub}</span>}
                </button>
              );
            })}
            <button
              type="button"
              onClick={() => {
                setSelectedTimeOption("Custom");
                updateSelectedTimeDisplay(selectedDate, "Custom");
              }}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${selectedTimeOption === "Custom"
                  ? "bg-[#666666] text-white"
                  : "bg-[#E8EAEF] text-[#111111] hover:bg-neutral-200"
                }`}
            >
              Custom
            </button>
          </div>
        </div>

        {selectedTimeOption === "Custom" && (
          <div className="w-full mt-4 flex flex-col gap-4 animate-in fade-in slide-in-from-top-1 duration-200">
            <h4 className="font-roboto font-bold text-sm text-[#111111]">Custom Time</h4>
            <div className="flex flex-row gap-6 w-full">
              <div className="flex-grow flex flex-col gap-2">
                <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider">Start Time</span>
                <div className="flex items-center gap-3 px-4 py-2.5 border border-neutral-300 rounded-xl bg-white">
                  <HugeiconsIcon icon={Clock01Icon} className="text-neutral-500 w-5 h-5" />
                  <input
                    type="text"
                    value={customStartTime}
                    onChange={(e) => {
                      setCustomStartTime(e.target.value);
                      updateSelectedTimeDisplay(selectedDate, "Custom", e.target.value, customStartAmPm, customEndTime, customEndAmPm);
                    }}
                    className="w-16 text-sm text-[#1C1B1C] bg-transparent outline-none font-medium text-left"
                  />
                  <div className="flex bg-[#E8EAEF] rounded-full p-1 ml-auto">
                    <button
                      type="button"
                      onClick={() => {
                        setCustomStartAmPm("AM");
                        updateSelectedTimeDisplay(selectedDate, "Custom", customStartTime, "AM", customEndTime, customEndAmPm);
                      }}
                      className={`w-9 h-7 flex items-center justify-center text-xs font-semibold rounded-full transition-all ${customStartAmPm === "AM" ? "bg-[#666666] text-white shadow-sm" : "text-neutral-500"}`}
                    >
                      AM
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setCustomStartAmPm("PM");
                        updateSelectedTimeDisplay(selectedDate, "Custom", customStartTime, "PM", customEndTime, customEndAmPm);
                      }}
                      className={`w-9 h-7 flex items-center justify-center text-xs font-semibold rounded-full transition-all ${customStartAmPm === "PM" ? "bg-[#666666] text-white shadow-sm" : "text-neutral-500"}`}
                    >
                      PM
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex-grow flex flex-col gap-2">
                <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider">End Time</span>
                <div className="flex items-center gap-3 px-4 py-2.5 border border-neutral-300 rounded-xl bg-white">
                  <HugeiconsIcon icon={Clock01Icon} className="text-neutral-500 w-5 h-5" />
                  <input
                    type="text"
                    value={customEndTime}
                    onChange={(e) => {
                      setCustomEndTime(e.target.value);
                      updateSelectedTimeDisplay(selectedDate, "Custom", customStartTime, customStartAmPm, e.target.value, customEndAmPm);
                    }}
                    className="w-16 text-sm text-[#1C1B1C] bg-transparent outline-none font-medium text-left"
                  />
                  <div className="flex bg-[#E8EAEF] rounded-full p-1 ml-auto">
                    <button
                      type="button"
                      onClick={() => {
                        setCustomEndAmPm("AM");
                        updateSelectedTimeDisplay(selectedDate, "Custom", customStartTime, customStartAmPm, customEndTime, "AM");
                      }}
                      className={`w-9 h-7 flex items-center justify-center text-xs font-semibold rounded-full transition-all ${customEndAmPm === "AM" ? "bg-[#666666] text-white shadow-sm" : "text-neutral-500"}`}
                    >
                      AM
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setCustomEndAmPm("PM");
                        updateSelectedTimeDisplay(selectedDate, "Custom", customStartTime, customStartAmPm, customEndTime, "PM");
                      }}
                      className={`w-9 h-7 flex items-center justify-center text-xs font-semibold rounded-full transition-all ${customEndAmPm === "PM" ? "bg-[#666666] text-white shadow-sm" : "text-neutral-500"}`}
                    >
                      PM
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
