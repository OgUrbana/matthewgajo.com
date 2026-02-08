"use client";

import {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  useCallback,
} from "react";
import { animate } from "animejs";
import type { GameState, CharState, TypeRacerPopupProps, GameResults } from "@/lib/modules/typeracer.types";
import {
  GHOST_WPM,
  TEST_DURATION,
  generatePassage,
  seededPauses,
} from "@/lib/utils/typeracer.constants";
import TypeRacerGame from "./TypeRacerGame";
import TypeRacerResults from "./TypeRacerResults";

const GHOST_CPS = (GHOST_WPM * 5) / 60;

export default function TypeRacerPopup({
  isOpen,
  onClose,
}: TypeRacerPopupProps) {
  const [mounted, setMounted] = useState(false);
  const [gameState, setGameState] = useState<GameState>("running");
  const [passage, setPassage] = useState("");
  const [charStates, setCharStates] = useState<CharState[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [results, setResults] = useState<GameResults | null>(null);
  const [liveWpm, setLiveWpm] = useState(0);
  const [liveAccuracy, setLiveAccuracy] = useState(100);
  const [timeRemaining, setTimeRemaining] = useState(TEST_DURATION);
  const [ghostCharIndex, setGhostCharIndex] = useState(0);
  const [isFocused, setIsFocused] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [textOffset, setTextOffset] = useState(0);

  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const userCaretRef = useRef<HTMLDivElement>(null);
  const ghostCaretRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const startTimeRef = useRef<number | null>(null);
  const correctCountRef = useRef(0);
  const incorrectCountRef = useRef(0);
  const statsIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tabPressedRef = useRef(false);
  const tabTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const ghostPausesRef = useRef<Set<number>>(new Set());
  const isClosingRef = useRef(false);
  const prefersReducedMotion = useRef(false);
  const passageSeedRef = useRef(0);
  const lineHeightRef = useRef(0);

  const hasStarted = startTimeRef.current !== null;

  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  const newPassage = useCallback(() => {
    const seed = Math.floor(Math.random() * 2147483646) + 1;
    passageSeedRef.current = seed;
    const text = generatePassage(seed);
    setPassage(text);
    setCharStates(new Array(text.length).fill("untyped") as CharState[]);
    setCurrentIndex(0);
    correctCountRef.current = 0;
    incorrectCountRef.current = 0;
    startTimeRef.current = null;
    setLiveWpm(0);
    setLiveAccuracy(100);
    setTimeRemaining(TEST_DURATION);
    setGhostCharIndex(0);
    setResults(null);
    setIsTyping(false);
    setTextOffset(0);
    ghostPausesRef.current = seededPauses(text.length);
    setGameState("running");
  }, []);

  const cleanup = useCallback(() => {
    if (statsIntervalRef.current) {
      clearInterval(statsIntervalRef.current);
      statsIntervalRef.current = null;
    }
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = null;
    }
    if (tabTimeoutRef.current) {
      clearTimeout(tabTimeoutRef.current);
      tabTimeoutRef.current = null;
    }
  }, []);

  useEffect(() => cleanup, [cleanup]);

  const handleCloseAnimation = useCallback(() => {
    if (isClosingRef.current) return;
    isClosingRef.current = true;
    cleanup();

    const dur = prefersReducedMotion.current ? 0 : 200;

    const done = () => {
      isClosingRef.current = false;
      setMounted(false);
    };

    if (dur === 0) {
      done();
      return;
    }

    if (overlayRef.current) {
      animate(overlayRef.current, {
        opacity: [1, 0],
        duration: dur,
        ease: "inQuad",
      });
    }
    if (contentRef.current) {
      animate(contentRef.current, {
        opacity: [1, 0],
        scale: [1, 0.95],
        duration: dur + 50,
        ease: "inQuad",
        onComplete: done,
      });
    } else {
      done();
    }
  }, [cleanup]);

  useEffect(() => {
    if (isOpen && !mounted) {
      isClosingRef.current = false;
      setMounted(true);
      newPassage();
    } else if (!isOpen && mounted && !isClosingRef.current) {
      handleCloseAnimation();
    }
  }, [isOpen, mounted, newPassage, handleCloseAnimation]);

  useEffect(() => {
    if (mounted && isOpen && !isClosingRef.current) {
      requestAnimationFrame(() => {
        const dur = prefersReducedMotion.current ? 0 : 300;
        if (overlayRef.current) {
          animate(overlayRef.current, {
            opacity: [0, 1],
            duration: dur,
            ease: "outQuad",
          });
        }
        if (contentRef.current) {
          animate(contentRef.current, {
            opacity: [0, 1],
            scale: [0.95, 1],
            duration: dur > 0 ? 350 : 0,
            ease: "outQuad",
          });
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted]);

  const handleRestart = useCallback(() => {
    cleanup();
    newPassage();
    requestAnimationFrame(() => inputRef.current?.focus());
  }, [cleanup, newPassage]);

  useEffect(() => {
    if (!mounted) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "Tab") {
        e.preventDefault();
        tabPressedRef.current = true;
        if (tabTimeoutRef.current) clearTimeout(tabTimeoutRef.current);
        tabTimeoutRef.current = setTimeout(() => {
          tabPressedRef.current = false;
        }, 2000);
        return;
      }
      if (e.key === "Enter" && tabPressedRef.current) {
        e.preventDefault();
        tabPressedRef.current = false;
        handleRestart();
        return;
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [mounted, onClose, handleRestart]);

  const finishGame = useCallback(
    (passageText: string) => {
      const endTime = performance.now();
      const elapsed = startTimeRef.current
        ? (endTime - startTimeRef.current) / 1000
        : TEST_DURATION;

      cleanup();

      const correct = correctCountRef.current;
      const incorrect = incorrectCountRef.current;
      const total = correct + incorrect;

      const wpm = Math.round((correct / 5 / (elapsed / 60)) || 0);
      const accuracy =
        total > 0 ? Math.round((correct / total) * 100) : 100;

      let ghostChars = GHOST_CPS * elapsed;
      for (const pc of ghostPausesRef.current) {
        if (Math.floor(ghostChars) >= pc) ghostChars -= 0.5;
      }
      ghostChars = Math.min(ghostChars, passageText.length);

      const userCharsTyped = correct;
      const beatGhost = userCharsTyped > ghostChars;

      setResults({
        wpm,
        accuracy,
        time: Math.round(elapsed * 100) / 100,
        errors: incorrect,
        ghostCharsTyped: Math.round(ghostChars),
        userCharsTyped,
        beatGhost,
      });
      setGameState("finished");

      requestAnimationFrame(() => {
        if (resultRef.current && !prefersReducedMotion.current) {
          const items = resultRef.current.children;
          Array.from(items).forEach((el, i) => {
            animate(el as HTMLElement, {
              opacity: [0, 1],
              y: [16, 0],
              duration: 350,
              delay: i * 60,
              ease: "outQuad",
            });
          });
        }
      });
    },
    [cleanup],
  );

  const startStatsLoop = useCallback(
    (passageLen: number) => {
      if (statsIntervalRef.current) clearInterval(statsIntervalRef.current);

      statsIntervalRef.current = setInterval(() => {
        if (!startTimeRef.current) return;
        const elapsed = (performance.now() - startTimeRef.current) / 1000;
        const remaining = Math.max(0, TEST_DURATION - elapsed);
        setTimeRemaining(remaining);

        if (remaining <= 0) {
          finishGame(passage);
          return;
        }

        if (elapsed > 0.5) {
          setLiveWpm(
            Math.round((correctCountRef.current / 5 / (elapsed / 60)) || 0),
          );
        }

        const total = correctCountRef.current + incorrectCountRef.current;
        if (total > 0) {
          setLiveAccuracy(
            Math.round((correctCountRef.current / total) * 100),
          );
        }

        if (passageLen > 0) {
          let ghostChars = GHOST_CPS * elapsed;
          let pauseDeduction = 0;
          for (const pc of ghostPausesRef.current) {
            if (Math.floor(ghostChars) >= pc) pauseDeduction += 0.5;
          }
          ghostChars = Math.max(
            0,
            Math.min(ghostChars - pauseDeduction, passageLen),
          );
          setGhostCharIndex(Math.floor(ghostChars));
        }
      }, 100);
    },
    [passage, finishGame],
  );

  const markTyping = useCallback(() => {
    setIsTyping(true);
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => setIsTyping(false), 500);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (gameState !== "running") return;

      if (e.ctrlKey || e.metaKey) {
        if (e.key === "v" || e.key === "V") e.preventDefault();
        return;
      }
      if (e.altKey) return;

      if (e.key === "Tab" || e.key === "Escape") return;
      if (e.key === "Enter") return;

      e.preventDefault();

      if (e.repeat) return;

      if (e.key === "Backspace") {
        if (currentIndex > 0) {
          const prevIdx = currentIndex - 1;
          const prevChar = passage[prevIdx];
          const prevState = charStates[prevIdx];
          if (prevChar === " " && prevState === "correct") {
            let wordStart = prevIdx - 1;
            while (wordStart >= 0 && passage[wordStart] !== " ") wordStart--;
            wordStart += 1;
            const wordFullyCorrect = charStates
              .slice(wordStart, prevIdx)
              .every((s) => s === "correct");
            if (wordFullyCorrect) {
              markTyping();
              return;
            }
          }
          setCurrentIndex(prevIdx);
          setCharStates((prev) => {
            const next = [...prev];
            next[prevIdx] = "untyped";
            return next;
          });
        }
        markTyping();
        return;
      }

      if (e.key.length !== 1) return;

      const expected = passage[currentIndex];
      if (expected === " " && e.key !== " ") return;
      if (expected !== " " && e.key === " ") return;

      if (startTimeRef.current === null) {
        startTimeRef.current = performance.now();
        startStatsLoop(passage.length);
      }

      const isCorrect = e.key === passage[currentIndex];

      if (isCorrect) {
        correctCountRef.current++;
      } else {
        incorrectCountRef.current++;
      }

      setCharStates((prev) => {
        const next = [...prev];
        next[currentIndex] = isCorrect ? "correct" : "incorrect";
        return next;
      });

      const newIdx = currentIndex + 1;
      setCurrentIndex(newIdx);
      markTyping();

      if (newIdx >= passage.length) {
        finishGame(passage);
      }
    },
    [gameState, currentIndex, passage, charStates, startStatsLoop, finishGame, markTyping],
  );

  const handlePaste = useCallback(
    (e: React.ClipboardEvent) => e.preventDefault(),
    [],
  );

  useLayoutEffect(() => {
    if (gameState === "finished") return;
    if (!textContainerRef.current) return;

    const container = textContainerRef.current;

    if (lineHeightRef.current === 0) {
      const firstChar = container.querySelector(
        '[data-ci="0"]',
      ) as HTMLElement | null;
      if (firstChar) {
        lineHeightRef.current = firstChar.offsetHeight * 1.625;
      }
    }

    if (userCaretRef.current && passage.length > 0) {
      const idx = Math.min(currentIndex, passage.length - 1);
      const atEnd = currentIndex >= passage.length;
      const charEl = container.querySelector(
        `[data-ci="${idx}"]`,
      ) as HTMLElement | null;
      if (charEl) {
        const left = atEnd
          ? charEl.offsetLeft + charEl.offsetWidth
          : charEl.offsetLeft;
        const top = charEl.offsetTop;
        userCaretRef.current.style.left = `${left}px`;
        userCaretRef.current.style.top = `${top}px`;
        userCaretRef.current.style.height = `${charEl.offsetHeight}px`;

        const lh = lineHeightRef.current;
        if (lh > 0) {
          const currentLine = Math.floor(top / lh);
          const newOffset = currentLine > 1 ? (currentLine - 1) * lh : 0;
          if (newOffset !== textOffset) {
            setTextOffset(newOffset);
          }
        }
      }
    }

    if (ghostCaretRef.current && passage.length > 0) {
      if (ghostCharIndex <= 0 || !hasStarted) {
        ghostCaretRef.current.style.opacity = "0";
      } else {
        const gIdx = Math.min(ghostCharIndex, passage.length - 1);
        const charEl = container.querySelector(
          `[data-ci="${gIdx}"]`,
        ) as HTMLElement | null;
        if (charEl) {
          ghostCaretRef.current.style.opacity = "0.7";
          ghostCaretRef.current.style.left = `${charEl.offsetLeft}px`;
          ghostCaretRef.current.style.top = `${charEl.offsetTop}px`;
          ghostCaretRef.current.style.height = `${charEl.offsetHeight}px`;
        }
      }
    }
  }, [
    currentIndex,
    ghostCharIndex,
    gameState,
    passage.length,
    textOffset,
    hasStarted,
  ]);

  useEffect(() => {
    if (gameState === "running" && mounted) {
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [gameState, mounted]);

  const timerDisplay = hasStarted
    ? Math.ceil(timeRemaining)
    : TEST_DURATION;

  const textMaxHeight =
    lineHeightRef.current > 0
      ? lineHeightRef.current * 3
      : 130;

  if (!mounted) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      style={{ opacity: 0 }}
    >
      <div
        ref={contentRef}
        className="relative mx-4 w-full max-w-4xl"
        onClick={(e) => e.stopPropagation()}
        style={{ opacity: 0 }}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-10 right-0 cursor-pointer rounded-lg p-1.5 text-zinc-600 transition-colors hover:text-zinc-400"
          aria-label="Close"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {gameState === "running" && (
          <TypeRacerGame
            passage={passage}
            charStates={charStates}
            liveWpm={liveWpm}
            liveAccuracy={liveAccuracy}
            timerDisplay={timerDisplay}
            ghostCharIndex={ghostCharIndex}
            isFocused={isFocused}
            setIsFocused={setIsFocused}
            isTyping={isTyping}
            textOffset={textOffset}
            textMaxHeight={textMaxHeight}
            hasStarted={hasStarted}
            inputRef={inputRef}
            textContainerRef={textContainerRef}
            userCaretRef={userCaretRef}
            ghostCaretRef={ghostCaretRef}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
          />
        )}

        {gameState === "finished" && results && (
          <TypeRacerResults results={results} resultRef={resultRef} />
        )}
      </div>
    </div>
  );
}
