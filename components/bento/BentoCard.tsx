import { cn } from "@/lib/utils";

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
}

const BentoCard = ({ children, className }: BentoCardProps) => {
  return (
    <div className={cn("card group rounded-3xl", className)}>
      <div className="card-content rounded-3xl">{children}</div>
    </div>
  );
};

export default BentoCard;
