import { Target, Timer, Translate } from "../Icons";
import BentoCard from "./BentoCard";

export default function TypingCard() {
  const stats = [
    { Icon: Timer, label: "15s" },
    { Icon: Target, label: "99%" },
    { Icon: Translate, label: "EN" },
  ];

  return (
    <BentoCard className="h-full">
      <div className="absolute bottom-7 left-7 flex flex-col gap-2">
        <div className="flex items-end tracking-wider">
          <p className="font-inter -mb-2 text-[7rem] leading-none font-semibold tracking-wider">
            159
          </p>
          <p className="mt-2 text-2xl font-semibold">wpm</p>
        </div>
        <div className="flex items-center gap-4">
          {stats.map(({ Icon, label }) => (
            <div key={label} className="flex items-center gap-1 tracking-wider">
              <Icon className="h-6 w-6 text-[#20ad6b]" />
              <p className="text-lg">{label}</p>
            </div>
          ))}
        </div>
      </div>
      <span className="font-inter absolute top-1/2 left-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 bg-linear-to-b from-[#1F3737] from-18% to-[rgba(27,49,49,0.02)] to-75% bg-clip-text text-[14rem] font-semibold text-transparent">
        159
      </span>
    </BentoCard>
  );
}
