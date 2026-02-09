"use client";

import { useRef, useCallback } from "react";
import { SpeakerWaveIcon, SpeakerXMarkIcon } from "@heroicons/react/24/outline";
import type { CharState } from "@/lib/modules/typeracer.types";
import { GHOST_WPM, GHOST_ACCURACY, TEST_DURATION } from "@/lib/utils/typeracer.constants";
import Link from "next/link";

const KEYPRESS_SOUND = "/keypress.mp3";

export interface TypeRacerGameProps {
  passage: string;
  charStates: CharState[];
  liveWpm: number;
  liveAccuracy: number;
  timerDisplay: number;
  ghostCharIndex: number;
  isFocused: boolean;
  setIsFocused: (v: boolean) => void;
  isTyping: boolean;
  textOffset: number;
  textMaxHeight: number;
  hasStarted: boolean;
  inputRef: React.RefObject<HTMLInputElement | null>;
  textContainerRef: React.RefObject<HTMLDivElement | null>;
  userCaretRef: React.RefObject<HTMLDivElement | null>;
  ghostCaretRef: React.RefObject<HTMLDivElement | null>;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onPaste: (e: React.ClipboardEvent) => void;
  muted: boolean;
  setMuted: (v: boolean) => void;
}

export default function TypeRacerGame({
  passage,
  charStates,
  liveWpm,
  liveAccuracy,
  timerDisplay,
  ghostCharIndex,
  isFocused,
  setIsFocused,
  isTyping,
  textOffset,
  textMaxHeight,
  hasStarted,
  inputRef,
  textContainerRef,
  userCaretRef,
  ghostCaretRef,
  onKeyDown,
  onPaste,
  muted,
  setMuted,
}: TypeRacerGameProps) {
  const audioContextRef = useRef<AudioContext | null>(null);
  const decodePromiseRef = useRef<Promise<AudioBuffer> | null>(null);

  const getContextAndBuffer = useCallback((): Promise<{
    context: AudioContext;
    buffer: AudioBuffer;
  }> => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
    }
    const context = audioContextRef.current;

    if (!decodePromiseRef.current) {
      decodePromiseRef.current = fetch(KEYPRESS_SOUND)
        .then((r) => r.arrayBuffer())
        .then((ab) => context.decodeAudioData(ab));
    }

    return decodePromiseRef.current.then((buffer) => ({
      context,
      buffer,
    }));
  }, []);

  const playKeypressSound = useCallback(() => {
    getContextAndBuffer().then(({ context, buffer }) => {
      const source = context.createBufferSource();
      source.buffer = buffer;
      const gain = context.createGain();
      source.connect(gain);
      gain.connect(context.destination);

      const now = context.currentTime;
      const duration = buffer.duration;
      const fadeIn = 0.015;
      const fadeOut = 0.04;

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(1, now + fadeIn);
      gain.gain.setValueAtTime(1, now + Math.max(fadeIn, duration - fadeOut));
      gain.gain.linearRampToValueAtTime(0, now + duration);

      source.start(0);
      source.onended = () => {
        source.disconnect();
        gain.disconnect();
      };
    }).catch(() => {});
  }, [getContextAndBuffer]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      const isCharacterKey =
        e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey;
      if (isCharacterKey && !muted) {
        playKeypressSound();
      }
      onKeyDown(e);
    },
    [onKeyDown, playKeypressSound, muted]
  );

  return (
    <div
      className="cursor-text"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Stats row */}
      <div className="mb-6 flex items-end justify-between">
        <div>
          {hasStarted ? (
            <>
              <p className="font-inter text-4xl font-bold leading-none text-emerald-400">
                {liveWpm}
              </p>
              <p className="mt-1 text-sm text-zinc-500">
                wpm&nbsp;&nbsp;·&nbsp;&nbsp;{liveAccuracy}% acc
              </p>
            </>
          ) : (
            <>
              <p className="font-inter text-4xl font-bold leading-none text-emerald-400">
                {TEST_DURATION}
              </p>
              <div className="mt-1 text-sm text-zinc-500 flex items-center gap-1">
                <p>
                  Think you can beat me?
                </p>
                <Link className='text-emerald-600 hover:text-emerald-300 transition-colors' href="https://monkeytype.com/profile/matthewgajo" target="_blank">
                  @matthewgajo
                </Link>
              </div>
            </>
          )}
        </div>

        <div className="text-right">
          {hasStarted && (
            <p className="font-inter text-2xl font-bold leading-none text-zinc-300">
              {timerDisplay}
              <span className="text-sm font-normal text-zinc-500">s</span>
            </p>
          )}
          <p className="mt-1 text-sm text-white">
            <span>👻</span>
            <span className="ml-1">
              {GHOST_WPM} wpm&nbsp;·&nbsp;{GHOST_ACCURACY}%
            </span>
          </p>
        </div>
      </div>

      {/* Text passage area */}
      <div
        className="relative overflow-hidden"
        style={{ height: textMaxHeight }}
      >
        {!isFocused && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/60 backdrop-blur-[2px]">
            <p className="text-sm font-medium text-zinc-300">
              Click here to focus
            </p>
          </div>
        )}

        <div
          ref={textContainerRef}
          className="relative select-none whitespace-pre-wrap font-mono text-2xl leading-relaxed tracking-wide"
          style={{
            transform: `translateY(-${textOffset}px)`,
            transition: "transform 150ms ease-out",
          }}
        >
          <div
            ref={userCaretRef}
            className="absolute z-20 w-[2.5px] rounded-full bg-emerald-400"
            style={{
              transition: "left 80ms ease-out, top 80ms ease-out",
              willChange: "left, top",
              animation: isTyping
                ? "none"
                : "caretBlink 1s step-end infinite",
            }}
          />
          <div
            ref={ghostCaretRef}
            className="absolute z-10 w-[2.5px] rounded-full bg-yellow-400"
            style={{
              opacity: 0,
              transition:
                "left 150ms ease-out, top 150ms ease-out, opacity 300ms",
              willChange: "left, top",
            }}
          />

          {passage.split("").map((char, i) => {
            let cls = "text-zinc-600";
            if (charStates[i] === "correct") cls = "text-zinc-100";
            else if (charStates[i] === "incorrect") cls = "text-red-400";

            return (
              <span
                key={i}
                data-ci={i}
                className={`${cls} transition-colors duration-75`}
              >
                {char}
              </span>
            );
          })}
        </div>

        <input
          ref={inputRef}
          type="text"
          value=""
          onChange={() => { }}
          onKeyDown={handleKeyDown}
          onPaste={onPaste}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="absolute inset-0 z-30 h-full w-full cursor-default opacity-0"
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          aria-label="Type the passage"
        />
      </div>

      <div className="mt-8 flex items-center justify-center gap-1 text-xs text-zinc-600">
        <kbd className="rounded border border-zinc-700/50 bg-zinc-800/50 px-1.5 py-0.5 font-mono text-[0.65rem] text-zinc-500">
          tab
        </kbd>
        <span className="text-zinc-700">+</span>
        <kbd className="rounded border border-zinc-700/50 bg-zinc-800/50 px-1.5 py-0.5 font-mono text-[0.65rem] text-zinc-500">
          enter
        </kbd>
        <span className="ml-1 text-zinc-600">- restart test</span>
        <span className="mx-1.5 text-zinc-700">·</span>
        <button
          type="button"
          onClick={() => setMuted(!muted)}
          className="flex items-center gap-1 rounded border border-zinc-700/50 bg-zinc-800/50 px-1.5 py-0.5 text-zinc-500 transition-colors hover:bg-zinc-700/50 hover:text-zinc-400"
          aria-label={muted ? "Unmute keypress sound" : "Mute keypress sound"}
        >
          {muted ? (
            <SpeakerXMarkIcon className="h-3.5 w-3.5" />
          ) : (
            <SpeakerWaveIcon className="h-3.5 w-3.5" />
          )}
          <span className="text-[0.65rem]">{muted ? "Unmute" : "Mute"}</span>
        </button>
      </div>
    </div>
  );
}
