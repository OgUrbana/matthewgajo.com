"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import * as motion from "motion/react-client";

import BentoCard from "./BentoCard";
import SpotifyPopup from "./SpotifyPopup";
import { ArrowRight } from "../Icons";
import {
  PlayIcon,
  PauseIcon,
  BackwardIcon,
  ForwardIcon,
} from "@heroicons/react/24/solid";

import { SONGS } from "@/lib/spotifySongs";

const SKIP_BACK_THRESHOLD_SEC = 3;
const FADE_DURATION_MS = 400;
const TARGET_VOLUME = 0.1;

function fadeVolume(
  audio: HTMLAudioElement,
  from: number,
  to: number,
  onComplete?: () => void,
) {
  const start = performance.now();
  const run = () => {
    const elapsed = performance.now() - start;
    const t = Math.min(elapsed / FADE_DURATION_MS, 1);
    audio.volume = from + (to - from) * t;
    if (t < 1) {
      requestAnimationFrame(run);
    } else {
      onComplete?.();
    }
  };
  requestAnimationFrame(run);
}

export default function SpotifyCard() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const song = SONGS[currentIndex];
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < SONGS.length - 1;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !song?.audioSrc) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => {
      if (!isNaN(audio.duration)) setDuration(audio.duration);
    };
    const handleEnded = () => {
      if (hasNext) {
        setCurrentIndex((i) => i + 1);
        setCurrentTime(0);
        setDuration(0);
      } else {
        setCurrentIndex(0);
        setCurrentTime(0);
        setDuration(0);
      }
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("durationchange", updateDuration);
    audio.addEventListener("ended", handleEnded);

    if (audio.readyState >= 1) updateDuration();

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("durationchange", updateDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [song?.audioSrc, hasNext]);

  const isPlayingRef = useRef(isPlaying);
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  // When changing track, load new src and reset time; auto-play if was playing with fade in
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !song?.audioSrc) return;
    audio.src = song.audioSrc;
    audio.currentTime = 0;
    queueMicrotask(() => {
      setCurrentTime(0);
      setDuration(0);
    });
    if (isPlayingRef.current) {
      audio.volume = 0;
      audio.play().catch(() => setIsPlaying(false));
      fadeVolume(audio, 0, TARGET_VOLUME);
    }
  }, [currentIndex, song?.audioSrc]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      setIsPlaying(false);
      fadeVolume(audio, audio.volume, 0, () => audio.pause());
    } else {
      audio.volume = 0;
      audio.play().catch(() => { });
      fadeVolume(audio, 0, TARGET_VOLUME);
      setIsPlaying(true);
    }
  };

  const handleSeek = (newTime: number) => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const goPrevious = () => {
    if (currentTime > SKIP_BACK_THRESHOLD_SEC) {
      handleSeek(0);
    } else if (hasPrevious) {
      switchToIndex(currentIndex - 1);
    } else {
      switchToIndex(SONGS.length - 1);
    }
  };

  const goNext = () => {
    if (hasNext) {
      switchToIndex(currentIndex + 1);
    } else {
      switchToIndex(0);
    }
  };

  const switchToIndex = (nextIndex: number) => {
    const audio = audioRef.current;
    if (isPlaying && audio) {
      fadeVolume(audio, audio.volume, 0, () => {
        audio.pause();
        setCurrentIndex(nextIndex);
      });
    } else {
      setCurrentIndex(nextIndex);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <>
      <audio ref={audioRef} src={song?.audioSrc} preload="metadata" />

      <BentoCard className="h-full w-full">
        <div className="flex gap-4">
          <motion.div
            className="relative h-28 w-28 shrink-0 cursor-pointer overflow-hidden rounded-xl"
            onClick={() => setIsExpanded(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Image
              src={song.image}
              className="object-cover"
              alt={`${song.title} album cover`}
              fill
            />
          </motion.div>
          <div className="flex w-full flex-col justify-between">
            <div className="font-sf">
              <p className="text-text-muted flex items-center gap-1 text-sm">
                iPhone <ArrowRight className="w-4" /> big ass tv
              </p>
              <p className="text-xl font-medium">{song.title}</p>
              <p className="text-text-muted font-medium">{song.artist}</p>
            </div>

            <div className="flex w-full items-center justify-between gap-4">
              <motion.button
                type="button"
                onClick={goPrevious}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="cursor-pointer transition-opacity hover:opacity-70"
                aria-label="Previous track"
              >
                <BackwardIcon className="size-8" />
              </motion.button>
              <motion.button
                type="button"
                onClick={togglePlayPause}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="cursor-pointer transition-opacity hover:opacity-70"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <PauseIcon className="size-8" />
                ) : (
                  <PlayIcon className="size-8" />
                )}
              </motion.button>
              <motion.button
                type="button"
                onClick={goNext}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="cursor-pointer transition-opacity hover:opacity-70"
                aria-label="Next track"
              >
                <ForwardIcon className="size-8" />
              </motion.button>
            </div>
          </div>
        </div>
      </BentoCard>

      <SpotifyPopup
        isOpen={isExpanded}
        onClose={() => setIsExpanded(false)}
        title={song.title}
        artist={song.artist}
        image={song.image}
        isPlaying={isPlaying}
        currentTime={currentTime}
        duration={duration}
        progress={progress}
        onTogglePlayPause={togglePlayPause}
        onSeek={handleSeek}
        onPrevious={goPrevious}
        onNext={goNext}
        formatTime={formatTime}
      />
    </>
  );
}
