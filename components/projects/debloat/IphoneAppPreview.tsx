"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/* ─── Public types ─── */

export interface AppTab {
  key: string;
  icon: ReactNode;
  label?: string;
}

interface IphoneAppPreviewProps {
  /** Key of the tab shown on first render */
  initialTab?: string;
  /** Tab definitions rendered in the bottom nav */
  tabs: AppTab[];
  /** Map of tab key → screen content */
  screens: Record<string, ReactNode>;
  /** Extra classes on the outermost wrapper (sizing, e.g. h-[90%]) */
  className?: string;
  /** Tailwind bg class for the screen area */
  screenBg?: string;
}

/* ─── Component ─── */

export default function IphoneAppPreview({
  initialTab,
  tabs,
  screens,
  className,
  screenBg = "bg-[#FFF8F4]",
}: IphoneAppPreviewProps) {
  const [activeTab, setActiveTab] = useState(
    initialTab ?? tabs[0]?.key ?? ""
  );

  return (
    /* Root — sized by the caller via className (e.g. h-[90%]).
       aspect-ratio derives the missing dimension. */
    <div
      className={cn("relative mx-auto", className)}
      style={{ aspectRatio: "430 / 932" }}
    >
      {/* ── Case / outer bezel ── */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#2a2a2a] via-[#1c1c1c] to-[#2a2a2a] shadow-xl"
        style={{ borderRadius: "15% / 6.9%" }}
      >
        {/* Side buttons */}
        <div className="absolute -left-[0.6%] top-[19%] w-[0.7%] h-[3.5%] rounded-l-sm bg-[#222]" />
        <div className="absolute -left-[0.6%] top-[26%] w-[0.7%] h-[7%] rounded-l-sm bg-[#222]" />
        <div className="absolute -left-[0.6%] top-[35%] w-[0.7%] h-[7%] rounded-l-sm bg-[#222]" />
        <div className="absolute -right-[0.6%] top-[31%] w-[0.7%] h-[11%] rounded-r-sm bg-[#222]" />

        {/* ── Inner bezel ── */}
        <div
          className="absolute bg-black"
          style={{
            inset: "1.4%",
            borderRadius: "14% / 6.5%",
          }}
        >
          {/* ── Screen ── */}
          <div
            className={cn(
              "absolute overflow-hidden flex flex-col",
              screenBg
            )}
            style={{
              inset: "0.9%",
              borderRadius: "13.2% / 6.1%",
            }}
          >
            {/* Dynamic Island */}
            <div className="flex-shrink-0 flex justify-center pt-[2.2%] pb-[1%] relative z-20">
              <div
                className="bg-black rounded-full"
                style={{ width: "28%", aspectRatio: "128 / 33" }}
              />
            </div>

            {/* Scrollable screen content */}
            <div
              className="flex-1 min-h-0 overflow-y-auto overscroll-contain"
              style={{ scrollbarWidth: "none" }}
            >
              {screens[activeTab]}
            </div>

            {/* ── Bottom navigation bar ── */}
            <div className="flex-shrink-0 px-[6%] pb-[5%] pt-[1.5%]">
              <div className="flex justify-around items-center rounded-full bg-white/80 backdrop-blur-lg py-[3%] shadow-[0_1px_6px_rgba(0,0,0,0.06)] border border-white/50">
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    aria-label={tab.label ?? tab.key}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveTab(tab.key);
                    }}
                    className={cn(
                      "flex items-center justify-center rounded-full transition-all duration-200 p-[6%]",
                      activeTab === tab.key
                        ? "text-[#C49A82] bg-[#C49A82]/10"
                        : "text-[#C0B2A8] hover:text-[#C49A82]/60"
                    )}
                  >
                    {tab.icon}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
