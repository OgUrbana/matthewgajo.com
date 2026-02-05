"use client";

import { useRef, useState, useEffect } from "react";
import * as motion from "motion/react-client";

interface SpotifyProgressBarProps {
  progress: number;
  currentTime: number;
  duration: number;
  onSeek: (newTime: number) => void;
  formatTime: (time: number) => string;
}

export default function SpotifyProgressBar({
  progress,
  currentTime,
  duration,
  onSeek,
  formatTime,
}: SpotifyProgressBarProps) {
  const progressBarRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const dragStartProgressRef = useRef(0);
  const dragStartXRef = useRef(0);
  const lastMoveXRef = useRef(0);
  const lastMoveTimeRef = useRef(0);
  const lastDragProgressRef = useRef(0);
  const velocityHistoryRef = useRef<
    Array<{ x: number; time: number; progress: number }>
  >([]);
  const hasDraggedRef = useRef(false);
  const momentumAnimationRef = useRef<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [, setIsProgressing] = useState(false);
  const [dragProgress, setDragProgress] = useState<number | null>(null);

  useEffect(() => {
    return () => {
      if (momentumAnimationRef.current) {
        cancelAnimationFrame(momentumAnimationRef.current);
      }
    };
  }, []);

  const handlePointerDown = (clientX: number) => {
    if (momentumAnimationRef.current) return;

    isDraggingRef.current = true;
    hasDraggedRef.current = false;
    setIsDragging(true);
    dragStartProgressRef.current = progress;
    lastDragProgressRef.current = progress;
    setDragProgress(progress);
    dragStartXRef.current = clientX;
    lastMoveXRef.current = clientX;
    lastMoveTimeRef.current = Date.now();
    velocityHistoryRef.current = [];
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handlePointerDown(e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (momentumAnimationRef.current) return;
    e.preventDefault();
    handlePointerDown(e.touches[0].clientX);
  };

  const handlePointerMove = (clientX: number) => {
    if (!isDraggingRef.current || !progressBarRef.current || !duration) return;

    const progressBar = progressBarRef.current.querySelector("div");
    if (!progressBar) return;

    const dragDistance = Math.abs(clientX - dragStartXRef.current);
    if (dragDistance > 3) hasDraggedRef.current = true;

    const barRect = progressBar.getBoundingClientRect();
    const deltaX = clientX - dragStartXRef.current;
    const deltaPercentage = (deltaX / barRect.width) * 100;
    const newProgress = Math.max(
      0,
      Math.min(100, dragStartProgressRef.current + deltaPercentage),
    );

    lastDragProgressRef.current = newProgress;
    setDragProgress(newProgress);

    const now = Date.now();
    velocityHistoryRef.current.push({
      x: clientX,
      time: now,
      progress: newProgress,
    });
    if (velocityHistoryRef.current.length > 5)
      velocityHistoryRef.current.shift();
    lastMoveXRef.current = clientX;
    lastMoveTimeRef.current = now;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handlePointerMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    handlePointerMove(e.touches[0].clientX);
  };

  const handlePointerUp = (clientX?: number) => {
    if (!isDraggingRef.current) {
      setIsDragging(false);
      return;
    }

    setIsDragging(false);
    isDraggingRef.current = false;

    if (
      !hasDraggedRef.current &&
      clientX != null &&
      progressBarRef.current &&
      duration
    ) {
      const progressBar = progressBarRef.current.querySelector("div");
      if (progressBar) {
        const barRect = progressBar.getBoundingClientRect();
        const clickX = clientX - barRect.left;
        const percentage = Math.max(0, Math.min(1, clickX / barRect.width));
        onSeek(percentage * duration);
      }
      setDragProgress(null);
      hasDraggedRef.current = false;
      return;
    }

    let didMomentum = false;
    if (velocityHistoryRef.current.length >= 2 && hasDraggedRef.current) {
      const history = velocityHistoryRef.current;
      const latest = history[history.length - 1];
      const oldest = history[0];
      const timeDelta = latest.time - oldest.time;
      const progressDelta = latest.progress - oldest.progress;
      const timeSinceLastMove = Date.now() - latest.time;
      const wasMoving = timeSinceLastMove < 150;

      if (wasMoving && timeDelta > 0 && timeDelta < 150) {
        const velocity = progressDelta / timeDelta;
        if (Math.abs(velocity) > 0.005) {
          didMomentum = true;
          setIsProgressing(true);
          const velocityScale = 0.3;
          const initialVelocity = velocity * velocityScale;
          const maxMomentumSeconds = 30;
          const maxProgressChange = (maxMomentumSeconds / duration) * 100;
          const startTime = performance.now();
          const momentumDurationMs = 600;
          const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

          const startProgress = lastDragProgressRef.current;
          let currentProgress = startProgress;
          let lastTime = startTime;
          const maxForward = Math.min(100, startProgress + maxProgressChange);
          const maxBack = Math.max(0, startProgress - maxProgressChange);

          const finishMomentum = () => {
            momentumAnimationRef.current = null;
            setIsProgressing(false);
            onSeek((currentProgress / 100) * duration);
            setDragProgress(null);
          };

          const animate = (time: number) => {
            const elapsed = time - startTime;
            const deltaTime = time - lastTime;
            lastTime = time;
            const t = Math.min(elapsed / momentumDurationMs, 1);
            const velocityFactor = 1 - easeOutCubic(t);
            const currentVelocity = initialVelocity * velocityFactor;
            const progressChange = currentVelocity * deltaTime;
            currentProgress = Math.max(
              maxBack,
              Math.min(maxForward, currentProgress + progressChange),
            );
            currentProgress = Math.max(0, Math.min(100, currentProgress));
            setDragProgress(currentProgress);
            if (t < 1) {
              momentumAnimationRef.current = requestAnimationFrame(animate);
            } else {
              finishMomentum();
            }
          };

          momentumAnimationRef.current = requestAnimationFrame(animate);
        }
      }
    }

    if (!didMomentum) {
      onSeek((lastDragProgressRef.current / 100) * duration);
      setDragProgress(null);
    }

    hasDraggedRef.current = false;
    velocityHistoryRef.current = [];
  };

  const handleMouseUp = (e?: React.MouseEvent) => {
    handlePointerUp(e?.clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    handlePointerUp(e.changedTouches[0]?.clientX);
  };

  const displayProgress = dragProgress ?? progress;
  const displayTime =
    dragProgress != null ? (dragProgress / 100) * duration : currentTime;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.38 }}
      className="mb-6 w-full"
    >
      <div
        ref={progressBarRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => handlePointerUp(undefined)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={() => handlePointerUp(undefined)}
        className="relative -my-3 w-full cursor-grab touch-none py-3 active:cursor-grabbing"
      >
        <motion.div
          className="relative h-2 w-full rounded-full bg-gray-700"
          animate={isDragging ? { scaleY: 1.5 } : { scaleY: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        >
          <motion.div
            className="pointer-events-none absolute top-0 left-0 h-full rounded-full bg-white"
            style={{ width: `${displayProgress}%` }}
            transition={
              dragProgress != null
                ? { duration: 0 }
                : { type: "spring", stiffness: 400, damping: 30 }
            }
          />
        </motion.div>
      </div>
      <div className="mt-2 flex items-center justify-between text-xs text-gray-400">
        <span>{formatTime(displayTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </motion.div>
  );
}
