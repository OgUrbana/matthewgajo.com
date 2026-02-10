import { cn } from "@/lib/utils";

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
}

const BentoCard = ({ children, className }: BentoCardProps) => {
  return (
    <div className={cn("card group rounded-3xl", className)}>
      <div className="card-content min-h-0 flex flex-1 flex-col overflow-hidden rounded-3xl">
        {children}
      </div>
    </div>
  );
};

export default BentoCard;
