import { cn } from "@/lib/utils";

import ArrowRight from "@/svgs/arrow-right.svg";

const Arrows = ({
  changeTextIndex,
  textIndex,
  isMaxIndex = false,
}: {
  changeTextIndex: (index: number) => void;
  textIndex: number;
  isMaxIndex?: boolean;
}) => (
  <div className="mt-1 flex items-start gap-0.5">
    <button
      type="button"
      onClick={() => changeTextIndex(-1)}
      title="Previous text"
      disabled={textIndex === 0}
      aria-disabled={textIndex === 0}
    >
      <div className="sr-only">Previous text</div>
      <ArrowRight
        className={cn("h-6 w-6 -rotate-180 p-[2px] text-white", {
          "opacity-50": textIndex === 0,
        })}
      />
    </button>
    <button
      type="button"
      onClick={() => changeTextIndex(1)}
      title="Next text"
      disabled={isMaxIndex}
      aria-disabled={isMaxIndex}
    >
      <div className="sr-only">Next text</div>
      <ArrowRight
        className={cn("h-6 w-6 p-[2px] text-white", {
          "opacity-50": isMaxIndex,
        })}
      />
    </button>
  </div>
);

export default Arrows;
