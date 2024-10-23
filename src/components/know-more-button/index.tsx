import ArrowDown from "@/svgs/arrow-down.svg";
import { Button } from "@/components/button";
import { cn } from "@/lib/utils";

const KnowMoreButton = ({ onClick, opened, className }: {
  onClick: () => void;
  opened?: boolean;
  className?: string;
}) => (
  <Button variant="vanilla" size="auto" className={cn("justify-center items-center gap-4 group", className)} onClick={onClick}>
    <div className="justify-center items-center gap-4 flex">
      <div className="text-base lg:text-lg underline tracking-tight">{opened ? 'Show less' : 'Know more'}</div>
      <ArrowDown className={cn("w-6 h-6 group-hover:translate-y-1 transition-transform duration-300",
        { "rotate-180": opened })}
      />
    </div>
  </Button>
);
export default KnowMoreButton;