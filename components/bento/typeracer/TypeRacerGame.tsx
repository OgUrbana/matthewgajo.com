"use client";

import type { CharState } from "@/lib/modules/typeracer.types";
import { GHOST_WPM, GHOST_ACCURACY, TEST_DURATION } from "@/lib/utils/typeracer.constants";
import Link from "next/link";

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
}: TypeRacerGameProps) {
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
          onKeyDown={onKeyDown}
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
      </div>
    </div>
  );
}
