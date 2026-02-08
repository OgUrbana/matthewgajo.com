"use client";

import type { GameResults } from "@/lib/modules/typeracer.types";
import { GHOST_WPM } from "@/lib/utils/typeracer.constants";

export interface TypeRacerResultsProps {
  results: GameResults;
  resultRef: React.RefObject<HTMLDivElement | null>;
}

export default function TypeRacerResults({
  results,
  resultRef,
}: TypeRacerResultsProps) {
  return (
    <div ref={resultRef} className="flex flex-col items-center py-4">
      <div className="mb-6 text-center" style={{ opacity: 0 }}>
        <p className="mb-2 text-3xl">
          {results.beatGhost ? "🏆" : "👻"}
        </p>
        <p className="font-inter text-lg font-medium text-zinc-300">
          {results.beatGhost ? "You beat me!" : "I win this time!"}
        </p>
      </div>

      <div className="mb-6 text-center" style={{ opacity: 0 }}>
        <p
          className={`font-inter text-7xl font-bold ${results.beatGhost ? "text-emerald-400" : "text-zinc-200"}`}
        >
          {results.wpm}
        </p>
        <p className="text-sm text-zinc-500">wpm</p>
      </div>

      <div
        className="mb-6 flex items-center gap-3 text-sm text-zinc-400"
        style={{ opacity: 0 }}
      >
        <span>{results.accuracy}% accuracy</span>
        <span className="text-zinc-700">·</span>
        <span>
          {results.errors} error{results.errors !== 1 ? "s" : ""}
        </span>
        <span className="text-zinc-700">·</span>
        <span>{results.time}s</span>
      </div>

      <div
        className="mb-8 flex items-center gap-4 text-sm"
        style={{ opacity: 0 }}
      >
        <span className="font-inter font-semibold text-emerald-400">
          You: {results.wpm} wpm
        </span>
        <span className="text-zinc-600">vs</span>
        <span className="font-inter font-semibold text-yellow-400">
          Me: {GHOST_WPM} wpm
        </span>
      </div>

      <div
        className="flex items-center gap-1 text-xs text-zinc-600"
        style={{ opacity: 0 }}
      >
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
