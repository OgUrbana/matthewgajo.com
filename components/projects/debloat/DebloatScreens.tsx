import GaugeSemi from "./ui/GaugeSemi";
import WeekSelector from "./ui/WeekSelector";
import SoftCard from "./ui/SoftCard";

/* ═══════════════════════════════════════════════════
   HOME SCREEN
   ═══════════════════════════════════════════════════ */

export function HomeScreen() {
  return (
    <div className="px-3 pt-1 pb-4 flex flex-col gap-2.5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-[14px] font-bold text-gray-900 tracking-tight">
          debloat
        </h1>
        <div className="flex items-center gap-[3px] bg-[#FFF0EA] rounded-full px-1.5 py-[2px]">
          <span className="text-[9px] leading-none">🔥</span>
          <span className="text-[9px] font-semibold text-[#C49A82] leading-none">
            0
          </span>
        </div>
      </div>

      {/* Week selector */}
      <WeekSelector selected={7} />

      {/* Status card */}
      <SoftCard>
        <div className="flex items-center justify-between gap-2">
          <div className="flex-1 min-w-0">
            <p className="text-[9px] text-gray-700 leading-[1.4]">
              Your status
              <br />
              for today is{" "}
              <span className="text-[#C49A82] font-semibold">Fair</span>
            </p>
            <p className="text-[7px] text-gray-400 mt-0.5">
              Last updated 7:38PM
            </p>
          </div>
          <div className="w-[58px] flex-shrink-0">
            <GaugeSemi value={50} label="Gut" />
          </div>
        </div>
      </SoftCard>

      {/* AI Bot card */}
      <SoftCard>
        <div className="flex items-center gap-1 mb-1">
          <span className="text-[11px] leading-none">😈</span>
          <span className="text-[10px] font-bold text-gray-900 leading-none">
            AI Bot
          </span>
        </div>
        <p className="text-[7px] text-gray-500 mb-1">
          Saturday, February 7, 2026
        </p>
        <p className="text-[9px] font-semibold text-gray-800 mb-2">
          Ask Anything
        </p>
        <div className="flex flex-col gap-1.5">
          {(
            [
              "I\u2019m feeling bloated!",
              "How did I do today?",
              "What should I eat?",
            ] as const
          ).map((q) => (
            <button
              key={q}
              className="flex items-center justify-between w-full border border-[#EDE0D8] rounded-xl px-2 py-[6px] text-left bg-white/50 hover:bg-white/80 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-1.5">
                <span className="text-[8px] leading-none">💬</span>
                <span className="text-[8px] text-gray-700 leading-none">
                  {q}
                </span>
              </div>
              <span className="text-[10px] text-gray-400 leading-none">
                ›
              </span>
            </button>
          ))}
        </div>
      </SoftCard>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   ANALYTICS SCREEN
   ═══════════════════════════════════════════════════ */

const DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const EMOJIS = ["😊", "😐", "😟", "😩"];

export function AnalyticsScreen() {
  return (
    <div className="px-3 pt-1 pb-4 flex flex-col gap-2.5">
      <h1 className="text-[12px] text-gray-500 font-medium">
        Trends &amp; analytics
      </h1>

      {/* Gut Score gauge */}
      <SoftCard className="flex items-center justify-center py-3">
        <div className="w-[110px]">
          <GaugeSemi value={40} label="Gut Score" />
        </div>
      </SoftCard>

      {/* Bloating levels */}
      <SoftCard>
        <h2 className="text-[10px] font-bold text-gray-900 mb-2">
          Bloating levels
        </h2>
        <div className="flex gap-1.5">
          {/* Emoji Y-axis */}
          <div className="flex flex-col justify-between py-0.5">
            {EMOJIS.map((emoji, i) => (
              <span key={i} className="text-[9px] leading-[14px]">
                {emoji}
              </span>
            ))}
          </div>
          {/* Chart area */}
          <div className="flex-1 flex flex-col justify-end">
            {/* The "bars" for each day (baseline placeholder data) */}
            <div className="flex gap-[3px] items-end">
              {DAYS.map((day) => (
                <div
                  key={day}
                  className="flex-1 flex flex-col items-center gap-[3px]"
                >
                  <div className="w-full h-[3px] rounded-full bg-[#C49A82]" />
                  <span className="text-[5px] text-gray-400 font-medium uppercase leading-none">
                    {day}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SoftCard>

      {/* Food Triggers */}
      <SoftCard className="py-4">
        <h2 className="text-[10px] font-bold text-gray-900 mb-3">
          Food Triggers
        </h2>
        <p className="text-[8px] text-[#C49A82]/50 text-center">
          No trigger data available
        </p>
      </SoftCard>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   JOURNAL SCREEN  (placeholder)
   ═══════════════════════════════════════════════════ */

export function JournalScreen() {
  return (
    <div className="px-3 pt-1 pb-4 flex flex-col gap-2.5">
      <h1 className="text-[12px] text-gray-500 font-medium">Journal</h1>

      {/* Hero card */}
      <SoftCard className="py-5">
        <div className="flex flex-col items-center gap-1">
          <span className="text-[16px]">📓</span>
          <p className="text-[9px] font-semibold text-gray-800">My Journal</p>
          <p className="text-[7px] text-gray-400">Your daily reflections</p>
        </div>
      </SoftCard>

      {/* Quick-access cards */}
      <div className="grid grid-cols-2 gap-2">
        <SoftCard className="py-3">
          <p className="text-[8px] font-semibold text-gray-700">Mood Log</p>
          <p className="text-[6px] text-gray-400 mt-0.5">
            Track how you feel
          </p>
        </SoftCard>
        <SoftCard className="py-3">
          <p className="text-[8px] font-semibold text-gray-700">Food Diary</p>
          <p className="text-[6px] text-gray-400 mt-0.5">
            What you ate today
          </p>
        </SoftCard>
      </div>

      <SoftCard className="py-3">
        <p className="text-[8px] font-semibold text-gray-700">
          Weekly Summary
        </p>
        <p className="text-[6px] text-gray-400 mt-0.5">
          Review your progress over the week
        </p>
      </SoftCard>
    </div>
  );
}
