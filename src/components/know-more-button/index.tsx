import ArrowDown from "@/svgs/arrow-down.svg";
import { Button } from "@/components/button";
import { cn } from "@/lib/utils";

const KnowMoreButton = ({
  onClick,
  opened,
  className,
}: {
  onClick: () => void;
  opened?: boolean;
  className?: string;
}) => (
  <Button
    variant="vanilla"
    size="auto"
    className={cn("group items-center justify-center gap-4", className)}
    onClick={onClick}
  >
    <div className="flex items-center justify-center gap-4">
      <div className="text-base tracking-tight underline sm:text-lg">
        {opened ? "Show less" : "Know more"}
      </div>
      <ArrowDown
        className={cn("h-6 w-6 transition-transform duration-300 group-hover:translate-y-1", {
          "rotate-180": opened,
        })}
      />
    </div>
  </Button>
);
export default KnowMoreButton;
