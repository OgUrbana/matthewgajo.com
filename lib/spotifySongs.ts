export interface Song {
  title: string;
  artist: string;
  image: string;
  audioSrc: string;
}

export const SONGS: Song[] = [
  {
    title: "Creatures in Heaven",
    artist: "Glass Animals",
    image: "/creatures.webp",
    audioSrc: "/creatures.mp3",
  },
  {
    title: "TWENTIES",
    artist: "GIVEON",
    image: "/giveonalbum.jpg",
    audioSrc: "/twenties.mp3",
  },
  {
    title: "The Fate of Ophelia",
    artist: "Taylor Swift",
    image: "/ophelia.webp",
    audioSrc: "/Ophelia.mp3",
  },
  {
    title: "A COLD PLAY",
    artist: "The Kid LAROI",
    image: "/acoldplay.jpg",
    audioSrc: "/acoldplay.mp3",
  },
  {
    title: "Manchild",
    artist: "Sabrina Carpenter",
    image: "/manchild.jpg",
    audioSrc: "/manchild.mp3",
  },
];
