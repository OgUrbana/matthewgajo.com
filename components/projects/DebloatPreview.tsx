"use client";

import { useState, useCallback } from "react";
import { createPortal } from "react-dom";
import {
  ChatBubbleOvalLeftIcon,
  ChevronRightIcon,
  HomeIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  CameraIcon,
  BookOpenIcon,
} from "@heroicons/react/24/outline";

const DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"] as const;
const PROMPTS = [
  "I'm feeling bloated!",
  "How did I do today?",
  "What should I eat?",
] as const;

export default function DebloatPreview() {
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [isInside, setIsInside] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const onMouseEnter = useCallback(() => setIsInside(true), []);
  const onMouseLeave = useCallback(() => {
    setIsInside(false);
    setIsPressed(false);
  }, []);
  const onMouseMove = useCallback((e: React.MouseEvent) => {
    setCursor({ x: e.clientX, y: e.clientY });
  }, []);
  const onMouseDown = useCallback(() => setIsPressed(true), []);
  const onMouseUp = useCallback(() => setIsPressed(false), []);

  const customCursor = typeof document !== "undefined" && createPortal(
    <div
      aria-hidden
      className="pointer-events-none fixed transition-opacity duration-200"
      style={{
        left: cursor.x,
        top: cursor.y,
        opacity: isInside ? 1 : 0,
        transform: "translate(-50%, -50%)",
        zIndex: 9999,
      }}
    >
      <div
        className="h-5 w-5 rounded-full transition-transform duration-150 ease-out"
        style={{
          background: "rgba(120, 120, 120, 0.35)",
          transform: isPressed ? "scale(0.82)" : "scale(1)",
        }}
      />
    </div>,
    document.body
  );

  return (
    <>
      {customCursor}
      <div
        className="flex h-full w-full flex-col overflow-hidden bg-white"
        style={{
          fontFamily: "system-ui, -apple-system, sans-serif",
          cursor: isInside ? "none" : undefined,
        }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onMouseMove={onMouseMove}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
      >
        {/* Spacer for dynamic island / status bar */}
        <div className="h-[58px] shrink-0" />

        {/* Header */}
        <div className="flex items-center justify-between px-[20px] pb-[10px]">
          <span className="text-[26px] font-bold tracking-tight text-black">
            debloat
          </span>
          <div className="flex items-center gap-[4px] rounded-full bg-[#f0c5bc]/30 px-[10px] py-[5px]">
            🔥
            <span className="text-[14px] font-semibold leading-none text-[#e1b2a8]">
              0
            </span>
          </div>
        </div>

        {/* Week Selector */}
        <div className="mx-[18px] flex items-center justify-between rounded-[16px] px-[6px] py-[8px]">
          {DAYS.map((day, i) => {
            const date = i + 1;
            const isSelected = i === 2;
            const isMarked = i === 2;
            return (
              <div key={day} className="flex flex-col items-center gap-5 bg-[#fdf8f5] rounded-full py-2 px-2">
                <span className="text-sm font-medium tracking-wide text-black">
                  {day}
                </span>
                <div
                  className={`flex h-[34px] w-[34px] items-center justify-center rounded-full text-sm font-semibold ${isSelected
                    ? "bg-[#daaa9c] text-black"
                    : isMarked
                      ? "bg-[#f0c5bc] text-[#8B6B5E]"
                      : "bg-[#f6efe9] text-gray-500"
                    }`}
                >
                  {date}
                </div>
              </div>
            );
          })}
        </div>

        {/* Status Card */}
        <div className="mx-[18px] mt-[14px] flex items-center justify-between rounded-[20px] bg-[#fdf8f5] px-[20px] py-[18px]">
          <div>
            <p className="text-md leading-[18px] text-text-muted">
              Your status
            </p>
            <p className="text-md leading-[18px] text-text-muted">
              for today is{" "}
              <span className="font-semibold text-[#e1b2a8]">Fair</span>
            </p>
            <p className="mt-[4px] text-sm text-text-muted">
              Last updated 7:38PM
            </p>
          </div>
          <GutGauge value={50} />
        </div>

        {/* AI Bot Card */}
        <div className="mx-[18px] mt-[14px] rounded-[20px] bg-[#fdf8f5] px-[20px] py-[16px]">
          <div className="flex items-center gap-[6px]">
            <span className="text-md leading-none">🤖</span>
            <span className="text-md font-bold text-black">AI Bot</span>
          </div>
          <p className="mt-[4px] text-sm text-text-muted">
            Saturday, February 7, 2026
          </p>
          <p className="mt-[10px] text-md font-bold text-black">
            Ask Anything
          </p>

          <div className="mt-[8px] flex flex-col">
            {PROMPTS.map((prompt, i) => (
              <div
                key={i}
                className={`flex items-center justify-between py-[10px] ${i < PROMPTS.length - 1 ? "border-b border-[#dedadb]/30" : ""
                  }`}
              >
                <div className="flex items-center gap-[8px]">
                  <ChatBubbleOvalLeftIcon className="h-[16px] w-[16px] text-text-muted" />
                  <span className="text-sm text-text-muted">{prompt}</span>
                </div>
                <ChevronRightIcon className="h-[14px] w-[14px] text-text-muted" />
              </div>
            ))}
          </div>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Bottom Navigation */}
        <div className="mb-12 mx-12 flex items-center justify-around rounded-full bg-[#fdf8f5] py-[12px]">
          <HomeIcon className="h-6 w-6 text-[#daaa9c]" />
          <ChartBarIcon className="h-6 w-6 text-[#daaa9c]" />
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f0c5bc]">
            <CameraIcon className="h-6 w-6 text-white" />
          </div>
          <BookOpenIcon className="h-6 w-6 text-[#daaa9c]" />
          <Cog6ToothIcon className="h-6 w-6 text-[#daaa9c]" />
        </div>
      </div>
    </>
  );
}

/* ── Semi-circular gut health gauge ── */

function GutGauge({ value }: { value: number }) {
  const r = 28;
  const cx = 40;
  const cy = 42;
  const arcPath = `M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`;
  const totalLen = Math.PI * r;
  const fillLen = (value / 100) * totalLen;

  return (
    <div className="flex flex-col items-center">
      <svg width="80" height="50" viewBox="0 0 80 50">
        {/* Background arc */}
        <path
          d={arcPath}
          fill="none"
          stroke="#dedadb"
          strokeWidth="10"
          strokeLinecap="round"
        />
        {/* Filled arc */}
        <path
          d={arcPath}
          fill="none"
          stroke="#daaa9c"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={`${fillLen} ${totalLen}`}
        />
        {/* Value */}
        <text
          x={cx}
          y={cy}
          textAnchor="middle"
          dominantBaseline="auto"
          style={{ fontSize: "20px", fontWeight: "bold", fill: "#2D2D2D" }}
        >
          {value}
        </text>
      </svg>
      <span
        className="text-sm text-text-muted"
        style={{ marginTop: "-4px" }}
      >
        Gut
      </span>
    </div>
  );
}
