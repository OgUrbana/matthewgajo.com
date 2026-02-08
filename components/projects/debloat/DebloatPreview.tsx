"use client";

import IphoneAppPreview, { type AppTab } from "./IphoneAppPreview";
import { HomeScreen, AnalyticsScreen, JournalScreen } from "./DebloatScreens";

/* ─── Nav icons (currentColor, 18×18) ─── */

function HomeIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function AnalyticsIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
    </svg>
  );
}

/* ─── Tabs & screens configuration ─── */

const TABS: AppTab[] = [
  { key: "home", icon: <HomeIcon />, label: "Home" },
  { key: "analytics", icon: <AnalyticsIcon />, label: "Analytics" },
  { key: "journal", icon: <BookIcon />, label: "Journal" },
];

const SCREENS: Record<string, React.ReactNode> = {
  home: <HomeScreen />,
  analytics: <AnalyticsScreen />,
  journal: <JournalScreen />,
};

/* ─── Public component ─── */

interface DebloatPreviewProps {
  className?: string;
}

export default function DebloatPreview({ className }: DebloatPreviewProps) {
  return (
    <IphoneAppPreview
      initialTab="home"
      tabs={TABS}
      screens={SCREENS}
      className={className}
      screenBg="bg-[#FFF8F4]"
    />
  );
}
