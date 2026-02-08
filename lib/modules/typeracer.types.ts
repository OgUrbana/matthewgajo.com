/**
 * TypeRacer game – shared types
 * Centralized in lib/modules for DRY and single source of truth.
 */

export type GameState = "running" | "finished";
export type CharState = "untyped" | "correct" | "incorrect";

export interface TypeRacerPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface GameResults {
  wpm: number;
  accuracy: number;
  time: number;
  errors: number;
  ghostCharsTyped: number;
  userCharsTyped: number;
  beatGhost: boolean;
}
