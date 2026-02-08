import { cn } from "@/lib/utils";

const DAYS = [
  { label: "SUN", num: 1 },
  { label: "MON", num: 2 },
  { label: "TUE", num: 3 },
  { label: "WED", num: 4 },
  { label: "THU", num: 5 },
  { label: "FRI", num: 6 },
  { label: "SAT", num: 7 },
] as const;

interface WeekSelectorProps {
  /** Which day number is selected (1–7, default 7 = SAT) */
  selected?: number;
  className?: string;
}

export default function WeekSelector({
  selected = 7,
  className,
}: WeekSelectorProps) {
  return (
    <div className={cn("flex justify-between gap-0.5", className)}>
      {DAYS.map((day) => {
        const isActive = day.num === selected;
        return (
          <div key={day.label} className="flex flex-col items-center gap-[3px]">
            <span
              className={cn(
                "text-[7px] font-semibold uppercase tracking-wide leading-none",
                isActive ? "text-gray-800" : "text-gray-400"
              )}
            >
              {day.label}
            </span>
            <div
              className={cn(
                "w-[22px] h-[22px] rounded-full flex items-center justify-center",
                "text-[9px] font-semibold leading-none",
                isActive
                  ? "bg-[#C49A82] text-white"
                  : "bg-[#F0E6DE] text-[#B8A99F]"
              )}
            >
              {day.num}
            </div>
          </div>
        );
      })}
    </div>
  );
}
