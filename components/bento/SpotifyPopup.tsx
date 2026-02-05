"use client";

import Image from "next/image";
import * as motion from "motion/react-client";
import { AnimatePresence } from "motion/react";
import {
  PlayIcon,
  PauseIcon,
  BackwardIcon,
  ForwardIcon,
} from "@heroicons/react/24/solid";
import { ArrowRight } from "../Icons";
import SpotifyProgressBar from "./SpotifyProgressBar";

interface SpotifyPopupProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  artist: string;
  image: string;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  progress: number;
  onTogglePlayPause: () => void;
  onSeek: (newTime: number) => void;
  onPrevious: () => void;
  onNext: () => void;
  formatTime: (time: number) => string;
}

export default function SpotifyPopup({
  isOpen,
  onClose,
  title,
  artist,
  image,
  isPlaying,
  currentTime,
  duration,
  progress,
  onTogglePlayPause,
  onSeek,
  onPrevious,
  onNext,
  formatTime,
}: SpotifyPopupProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex cursor-default items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 300,
            }}
            className="relative mx-4 w-full max-w-md cursor-default overflow-hidden rounded-3xl bg-linear-to-b from-zinc-900 to-black shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Spotify Icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="absolute top-6 right-6 z-10"
            >
              <svg className="h-10 w-10" viewBox="0 0 24 24" fill="#1DB954">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
              </svg>
            </motion.div>

            {/* Album Cover */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, type: "spring", damping: 20 }}
              className="relative aspect-square w-full"
            >
              <Image
                src={image}
                className="object-cover"
                alt={`${title} album cover`}
                fill
                priority
              />
            </motion.div>

            {/* Song Info and Controls */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="p-8"
            >
              <div className="font-sf mb-6 text-white">
                <p className="mb-2 flex items-center gap-1 text-sm text-gray-400">
                  iPhone <ArrowRight className="w-4" /> big ass tv
                </p>
                <motion.p
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mb-1 text-2xl font-semibold"
                >
                  {title}
                </motion.p>
                <motion.p
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.35 }}
                  className="text-lg text-gray-400"
                >
                  {artist}
                </motion.p>
              </div>

              <SpotifyProgressBar
                progress={progress}
                currentTime={currentTime}
                duration={duration}
                onSeek={onSeek}
                formatTime={formatTime}
              />

              {/* Playback Controls */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex items-center justify-center gap-8"
              >
                <motion.button
                  type="button"
                  onClick={onPrevious}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="cursor-pointer text-white transition-opacity hover:opacity-70"
                  aria-label="Previous track"
                >
                  <BackwardIcon className="size-10" />
                </motion.button>
                <motion.button
                  type="button"
                  onClick={onTogglePlayPause}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="cursor-pointer text-white transition-opacity hover:opacity-70"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? (
                    <PauseIcon className="size-12" />
                  ) : (
                    <PlayIcon className="size-12" />
                  )}
                </motion.button>
                <motion.button
                  type="button"
                  onClick={onNext}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="cursor-pointer text-white transition-opacity hover:opacity-70"
                  aria-label="Next track"
                >
                  <ForwardIcon className="size-10" />
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
