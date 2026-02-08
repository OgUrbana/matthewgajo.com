import { cn } from "@/lib/utils";

interface SoftCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function SoftCard({ children, className }: SoftCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl p-3",
        "bg-[#FFF9F6]",
        "shadow-[0_1px_4px_rgba(0,0,0,0.04)]",
        className
      )}
    >
      {children}
    </div>
  );
}
