"use client";

import { useState, useEffect, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import BentoCard from "@/components/bento/BentoCard";
import { cn } from "@/lib/utils";
import Link from 'next/link';

/** Same speed for overlay + caption (enter & exit), kept quick */
const FOCUS_ANIMATION_MS = 320;

interface ProjectShowcaseProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  emoji?: string;
  href?: string;
  cardClassName?: string;
  /** Tailwind classes for tilt/transform effect on the content (removed on arrow hover) */
  tiltClassName?: string;
}

export default function ProjectShowcase({
  children,
  title,
  description,
  emoji,
  href,
  cardClassName,
  tiltClassName,
}: ProjectShowcaseProps) {
  // SSR-safe "am I on the client?" that won't cause hydration mismatches.
  // During SSR + hydration, this is false; it flips to true after hydration.
  const canUseDOM = useSyncExternalStore(
    () => () => { },
    () => true,
    () => false
  );
  const [isHovered, setIsHovered] = useState(false);
  const [isElevated, setIsElevated] = useState(false);
  const exitTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!isHovered) {
      const id = setTimeout(() => {
        setIsElevated(false);
        exitTimeoutRef.current = null;
      }, FOCUS_ANIMATION_MS);
      exitTimeoutRef.current = id;
      return () => clearTimeout(id);
    }
    if (exitTimeoutRef.current) {
      clearTimeout(exitTimeoutRef.current);
      exitTimeoutRef.current = null;
    }
  }, [isHovered]);

  const arrowIcon = (
    <svg
      width="20"
      height="20"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 10L10 4M10 4H5.5M10 4V8.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const arrowClasses = cn(
    // Bottom-left of the card (not the SVG)
    "absolute bottom-0 left-0",
    "w-9 h-9 rounded-full",
    "bg-white/5 backdrop-blur-sm",
    "flex items-center justify-center",
    // thicker border (matches your reference)
    "border-2 border-white/15",
    // hover treatment (same feel as reference, using your dark theme colors)
    "hover:bg-white/5 hover:border-black/10",
    "transition-all ease-in-out",
    "text-white/70",
    "cursor-pointer"
  );

  const arrowStyle: React.CSSProperties = {
    transitionDuration: `${FOCUS_ANIMATION_MS}ms`,
  };

  const arrowHandlers = {
    onMouseEnter: () => {
      setIsHovered(true);
      setIsElevated(true);
    },
    onMouseLeave: () => setIsHovered(false),
  };

  return (
    <>
      {/* Full-page dim overlay — portalled to body */}
      {canUseDOM &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className={cn(
              "fixed inset-0 bg-black/80 z-50 pointer-events-none transition-opacity ease-in-out",
              isHovered ? "opacity-100" : "opacity-0"
            )}
            style={{ transitionDuration: `${FOCUS_ANIMATION_MS}ms` }}
          />,
          document.body
        )}

      {/* Card wrapper — relative so the caption can be absolutely positioned below */}
      <div
        className={cn(
          "relative h-full",
          isElevated ? "z-51" : ""
        )}
      >
        <BentoCard
          className={cn(
            "overflow-hidden h-full transition-colors",
            isHovered && "project-showcase-borderless",
            cardClassName
          )}
        >
          <div className="relative flex-1 min-h-0">
            <div
              className={cn(
                "transition-transform ease-in-out h-full",
                !isHovered && tiltClassName
              )}
              style={{
                transitionDuration: `${FOCUS_ANIMATION_MS}ms`,
              }}
            >
              {children}
            </div>
            {href ? (
              <Link
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${title}`}
                className={arrowClasses}
                style={arrowStyle}
                {...arrowHandlers}
              >
                {arrowIcon}
              </Link>
            ) : (
              <button
                aria-label={`View ${title}`}
                className={arrowClasses}
                style={arrowStyle}
                {...arrowHandlers}
              >
                {arrowIcon}
              </button>
            )}
          </div>
        </BentoCard>

        {/* Caption — absolutely positioned below the card, lives in the overlay layer */}
        <div
          className={cn(
            "absolute left-0 right-0 top-full mt-3 px-1",
            "transition-opacity ease-in-out pointer-events-none",
            isHovered ? "opacity-100" : "opacity-0"
          )}
          style={{
            transitionDuration: `${FOCUS_ANIMATION_MS}ms`,
          }}
        >
          <p className="text-sm leading-5 text-white/70">
            {emoji && <span className="mr-1.5">{emoji}</span>}
            <span className="font-semibold text-white/90">{title}</span>
            {description && (
              <span className="text-white/50"> &mdash; {description}</span>
            )}
          </p>
        </div>
      </div>
    </>
  );
}
