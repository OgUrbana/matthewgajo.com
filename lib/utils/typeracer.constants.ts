/**
 * TypeRacer game – constants and pure helpers
 * Centralized in lib/utils for DRY and single source of truth.
 */

export const GHOST_WPM = 159;
export const GHOST_ACCURACY = 99;
export const GHOST_CPS = (GHOST_WPM * 5) / 60;
export const TEST_DURATION = 15; // seconds

export const WORD_POOL = [
  "the", "be", "to", "of", "and", "a", "in", "that", "have", "it",
  "for", "not", "on", "with", "he", "as", "you", "do", "at", "this",
  "but", "his", "by", "from", "they", "we", "say", "her", "she", "or",
  "an", "will", "my", "one", "all", "would", "there", "their", "what",
  "so", "up", "out", "if", "about", "who", "get", "which", "go", "me",
  "when", "make", "can", "like", "time", "no", "just", "him", "know",
  "take", "people", "into", "year", "your", "good", "some", "could",
  "them", "see", "other", "than", "then", "now", "look", "only", "come",
  "its", "over", "think", "also", "back", "after", "use", "two", "how",
  "our", "work", "first", "well", "way", "even", "new", "want", "because",
  "any", "these", "give", "day", "most", "us", "great", "between",
  "need", "under", "long", "here", "thing", "many", "right", "hand",
  "high", "very", "still", "find", "place", "each", "where", "move",
  "turn", "part", "change", "house", "world", "home", "keep", "point",
  "last", "city", "old", "open", "start", "life", "while", "might",
  "few", "close", "end", "down", "should", "never", "state", "run",
  "own", "before", "off", "follow", "during", "always", "both", "small",
  "another", "around", "again", "form", "face", "general", "problem",
  "fact", "plan", "mean", "possible", "consider",
];

/** Seeded PRNG (Lehmer / Park-Miller) — returns 1..2^31-2 */
export function nextSeed(s: number): number {
  return (s * 16807) % 2147483647;
}

/** Generate a passage of random common words (~100 words, ~500 chars) */
export function generatePassage(seed: number): string {
  let s = seed;
  const words: string[] = [];
  for (let i = 0; i < 100; i++) {
    s = nextSeed(s);
    words.push(WORD_POOL[s % WORD_POOL.length]);
  }
  return words.join(" ");
}

/** Deterministic ghost micro-pauses */
export function seededPauses(totalChars: number, seed = 42): Set<number> {
  const pauses = new Set<number>();
  let s = seed;
  const count = Math.max(1, Math.floor(totalChars * 0.01));
  for (let i = 0; i < count; i++) {
    s = nextSeed(s);
    pauses.add(s % totalChars);
  }
  return pauses;
}
