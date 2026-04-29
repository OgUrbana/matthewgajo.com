"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import * as motion from "motion/react-client";
import { AnimatePresence } from "motion/react";
import { useMotionValue, useSpring } from "motion/react";
import {
  HandRaisedIcon,
  BriefcaseIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  DocumentTextIcon,
  BookmarkIcon,
} from "@heroicons/react/24/outline";

const NAV_ITEMS = [
  { label: "Hello", href: "#", Icon: HandRaisedIcon },
  { label: "Work", href: "#projects", Icon: BriefcaseIcon },
  {
    label: "Contact",
    href: "mailto:matthew.gajo@gmail.com",
    Icon: ChatBubbleOvalLeftEllipsisIcon,
  },
  { label: "Resume", href: "/resume", Icon: DocumentTextIcon },
  {
    label: "Source",
    href: "https://github.com/OgUrbana/matthewgajo.com",
    Icon: BookmarkIcon,
  },
] as const;

export default function BottomNav() {
  const [hoveredLabel, setHoveredLabel] = useState<string | null>(null);
  const dockRef = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(0);
  const smoothX = useSpring(rawX, { stiffness: 500, damping: 40 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dockRef.current) return;
    const rect = dockRef.current.getBoundingClientRect();
    rawX.set(e.clientX - rect.left);
  };

  return (
    <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <div
        ref={dockRef}
        className="relative pointer-events-auto"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoveredLabel(null)}
      >
        {/* Tooltip that follows cursor X */}
        <AnimatePresence>
          {hoveredLabel && (
            <motion.div
              key={hoveredLabel}
              className="absolute bottom-full left-0 pointer-events-none mb-3"
              style={{ x: smoothX }}
            >
              <div style={{ transform: "translateX(-50%)" }}>
                <motion.span
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.15 }}
                  className="block whitespace-nowrap rounded-full bg-zinc-800/90 border border-zinc-700/60 px-3 py-1 text-xs font-medium text-zinc-200 backdrop-blur-sm shadow-lg"
                >
                  {hoveredLabel}
                </motion.span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dock */}
        <div className="flex items-center gap-1 rounded-full bg-zinc-900/80 border border-zinc-800/60 px-4 py-3 backdrop-blur-md shadow-2xl">
          {NAV_ITEMS.map(({ label, href, Icon }) => (
            <Link
              key={label}
              href={href}
              target={href.startsWith("http") || href.startsWith("mailto") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              onMouseEnter={() => setHoveredLabel(label)}
              className="flex items-center justify-center size-10 rounded-full text-zinc-400 transition-colors duration-150 hover:text-zinc-100 hover:bg-zinc-800/60"
              aria-label={label}
            >
              <Icon className="size-5" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
