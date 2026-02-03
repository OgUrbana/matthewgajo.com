"use client";

import { useEffect } from "react";
import TwitterCard from "./bento/TwitterCard";
import TypingCard from "./bento/TypingCard";
import SpotifyCard from "./bento/SpotifyCard";

export default function Bento() {
  useEffect(() => {
    const bento = document.getElementById("bento");

    if (!bento) return;

    const handleMouseMove = (e: MouseEvent) => {
      const cards = document.getElementsByClassName("card");

      for (const card of cards) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        (card as HTMLDivElement).style.setProperty("--mouse-x", `${x}px`);
        (card as HTMLDivElement).style.setProperty("--mouse-y", `${y}px`);
      }
    };

    bento.addEventListener("mousemove", handleMouseMove);

    return () => {
      bento.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section className="relative max-w-7xl mx-auto min-h-screen bg-background px-6 py-16">
      <div className="max-w-[1512px] mx-auto">
        {/* Bento Grid Layout */}
        <div id="bento" className="grid grid-cols-11 gap-5 auto-rows-fr">
          {/* Twitter Card - spans 3 columns on large screens */}
          <div className="lg:col-span-3 lg:row-span-3 lg:col-start-1">
            <TwitterCard />
          </div>

          {/* Typing Card - spans 4 columns on large screens */}
          <div className="lg:col-span-4 lg:row-span-3 lg:col-start-4">
            <TypingCard />
          </div>

          {/* Spotify Card - spans 4 columns on large screens */}
          <div className="lg:col-span-4 lg:row-span-2 lg:col-start-8">
            <SpotifyCard />
          </div>

          {/* Bottom left large card */}
          <div className="lg:col-span-7 lg:row-span-4 lg:col-start-1 lg:row-start-4">
            <SpotifyCard />
          </div>

          {/* Bottom right tall card */}
          <div className="lg:col-span-4 lg:row-span-5 lg:col-start-8 lg:row-start-3">
            <SpotifyCard />
          </div>

          {/* Placeholder for future cards */}
          {/* Add more bento cards here as you build them */}
        </div>
      </div>
    </section>
  );
}
