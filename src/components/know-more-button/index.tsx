import ArrowDown from "@/svgs/arrow-down.svg";
import { Button } from "@/components/button";
import { cn } from "@/lib/utils";

const KnowMoreButton = ({ onClick, opened }: {
  onClick: () => void;
  opened?: boolean;
}) => (
  <Button variant="vanilla" size="auto" className="justify-center items-center gap-4 group" onClick={onClick}>
    <div className="justify-center items-center gap-4 flex">
      <div className="text-lg underline tracking-tight">{opened ? 'Show less' : 'Know more'}</div>
      <ArrowDown className={cn("w-6 h-6 group-hover:translate-y-1 transition-transform duration-300",
        { "rotate-180": opened })}
      />
    </div>
  </Button>
);
export default KnowMoreButton;