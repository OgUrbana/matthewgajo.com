"use client";

import { useState, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

export interface CustomCursorZoneProps {
  children: React.ReactNode;
  /** Cursor circle size (default: 20) */
  size?: number;
  /** Cursor background, e.g. "rgba(120, 120, 120, 0.35)" (default) */
  cursorBackground?: string;
  /** Scale when pressed (default: 0.82) */
  pressScale?: number;
  /** z-index of the cursor (default: 9999) */
  zIndex?: number;
  /** Extra class for the wrapper when cursor is active */
  wrapperClassName?: string;
}

export default function CustomCursorZone({
  children,
  size = 20,
  cursorBackground = "rgba(120, 120, 120, 0.35)",
  pressScale = 0.82,
  zIndex = 9999,
  wrapperClassName,
}: CustomCursorZoneProps) {
  const [mounted, setMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [isInside, setIsInside] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    if (!mounted || typeof window === "undefined") return;
    const mql = window.matchMedia("(min-width: 768px)");
    const id = setTimeout(() => setIsDesktop(mql.matches), 0);
    const handler = () => setIsDesktop(mql.matches);
    mql.addEventListener("change", handler);
    return () => {
      clearTimeout(id);
      mql.removeEventListener("change", handler);
    };
  }, [mounted]);

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

  const showCursor = mounted && isDesktop;
  const customCursor =
    showCursor &&
    typeof document !== "undefined" &&
    createPortal(
      <div
        aria-hidden
        className="pointer-events-none fixed transition-opacity duration-200"
        style={{
          left: cursor.x,
          top: cursor.y,
          opacity: isInside ? 1 : 0,
          transform: "translate(-50%, -50%)",
          zIndex,
        }}
      >
        <div
          className="rounded-full transition-transform duration-150 ease-out"
          style={{
            width: size,
            height: size,
            background: cursorBackground,
            transform: isPressed ? `scale(${pressScale})` : "scale(1)",
          }}
        />
      </div>,
      document.body
    );

  return (
    <>
      {customCursor}
      <div
        className={cn("h-full w-full", wrapperClassName)}
        style={{ cursor: showCursor && isInside ? "none" : undefined }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onMouseMove={onMouseMove}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
      >
        {children}
      </div>
    </>
  );
}
