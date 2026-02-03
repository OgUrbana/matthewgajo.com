import { Target } from "../icons.tsx/Target";
import { Timer } from "../icons.tsx/Timer";
import Translate from "../icons.tsx/Translate";
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
          <p className="text-[7rem] font-semibold leading-none tracking-wider -mb-2 font-inter">
            159
          </p>
          <p className="text-2xl font-semibold mt-2">wpm</p>
        </div>
        <div className="flex items-center gap-4">
          {stats.map(({ Icon, label }) => (
            <div key={label} className="flex items-center gap-1 tracking-wider">
              <Icon className="text-[#20ad6b] w-6 h-6" />
              <p className="text-lg">{label}</p>
            </div>
          ))}
        </div>
      </div>
      <span className="text-[14rem] font-semibold font-inter absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-linear-to-b from-[#1F3737] from-18% to-[rgba(27,49,49,0.02)] to-75% bg-clip-text text-transparent -z-10">
        159
      </span>
    </BentoCard>
  );
}
