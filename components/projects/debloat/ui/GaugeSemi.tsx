import { cn } from "@/lib/utils";

interface GaugeSemiProps {
  /** 0–100 */
  value: number;
  /** Text below the number (e.g. "Gut Score") */
  label?: string;
  className?: string;
  /** Arc fill colour */
  color?: string;
  /** Arc track colour */
  trackColor?: string;
}

export default function GaugeSemi({
  value,
  label,
  className,
  color = "#C49A82",
  trackColor = "#EDE0D8",
}: GaugeSemiProps) {
  const r = 40;
  const sw = 8;
  const cx = 50;
  const cy = 46;
  const circumference = Math.PI * r;
  const clamped = Math.min(Math.max(value, 0), 100);
  const dashLength = (clamped / 100) * circumference;

  return (
    <svg
      viewBox="0 0 100 56"
      className={cn("w-full h-auto", className)}
      aria-label={`${value}${label ? ` ${label}` : ""}`}
    >
      {/* Track */}
      <path
        d={`M ${cx - r},${cy} A ${r},${r} 0 0,1 ${cx + r},${cy}`}
        fill="none"
        stroke={trackColor}
        strokeWidth={sw}
        strokeLinecap="round"
      />
      {/* Progress */}
      <path
        d={`M ${cx - r},${cy} A ${r},${r} 0 0,1 ${cx + r},${cy}`}
        fill="none"
        stroke={color}
        strokeWidth={sw}
        strokeLinecap="round"
        strokeDasharray={`${dashLength} ${circumference}`}
      />
      {/* Value */}
      <text
        x={cx}
        y={label ? cy - 6 : cy - 2}
        textAnchor="middle"
        dominantBaseline="auto"
        fill="#3a3330"
        fontSize="20"
        fontWeight="700"
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        {value}
      </text>
      {label && (
        <text
          x={cx}
          y={cy + 6}
          textAnchor="middle"
          dominantBaseline="auto"
          fill="#a09890"
          fontSize="8"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          {label}
        </text>
      )}
    </svg>
  );
}
