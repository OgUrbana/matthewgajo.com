"use client";

import { useEffect } from "react";
import * as motion from "motion/react-client";
import TwitterCard from "./bento/TwitterCard";
import TypingCard from "./bento/TypingCard";
import SpotifyCard from "./bento/SpotifyCard";
import CuriousCard from "./bento/CuriousCard";

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
    <section className="bg-background relative mx-auto min-h-screen max-w-7xl px-6 py-16">
      <div className="mx-auto max-w-[1512px]">
        {/* Bento Grid Layout */}
        <div id="bento" className="grid auto-rows-auto grid-cols-11 gap-5">
          {/* Twitter Card - spans 3 columns on large screens */}
          <motion.div
            layout
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: 0.6,
              delay: 0,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="lg:col-span-3 lg:col-start-1 lg:row-span-3"
          >
            <TwitterCard />
          </motion.div>

          {/* Typing Card - spans 4 columns on large screens */}
          <motion.div
            layout
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: 0.6,
              delay: 0.1,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="lg:col-span-4 lg:col-start-4 lg:row-span-3"
          >
            <TypingCard />
          </motion.div>

          {/* Spotify Card - spans 4 columns on large screens */}
          <motion.div
            layout
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: 0.6,
              delay: 0.2,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="lg:col-span-4 lg:col-start-8 lg:row-span-2"
          >
            <SpotifyCard />
          </motion.div>

          {/* Bottom left large card */}
          <motion.div
            layout
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: 0.6,
              delay: 0.3,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="lg:col-span-7 lg:col-start-1 lg:row-span-4 lg:row-start-4"
          >
            <SpotifyCard />
          </motion.div>

          {/* Bottom right tall card */}
          <motion.div
            layout
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: 0.6,
              delay: 0.4,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="lg:col-span-4 lg:col-start-8 lg:row-span-5 lg:row-start-3"
          >
            <CuriousCard />
          </motion.div>

          {/* Placeholder for future cards */}
          {/* Add more bento cards here as you build them */}
        </div>
      </div>
    </section>
  );
}
