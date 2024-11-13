import ArrowRight from "@/svgs/arrow-right.svg";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { TAB_CONTENT } from "./data";
import Image from "next/image";
import { useIsMobile } from "@/lib/hooks";
import { useGesture } from "@use-gesture/react";

const Arrows = ({
  changeTextIndex,
  textIndex,
  isMaxIndex,
}: {
  changeTextIndex: (index: number) => void;
  textIndex: number;
  isMaxIndex: boolean;
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

const TabContentItem = ({ index = 0 }: { index: number }) => {
  const [textIndex, setTextIndex] = useState(0);
  const maxIndex = TAB_CONTENT[index].length - 1;
  const content = TAB_CONTENT[index][textIndex];
  const isMobile = useIsMobile();

  const changeTextIndex = (index: number) => {
    setTextIndex((prevIndex) => {
      let newIndex = prevIndex + index;
      if (newIndex < 0) {
        newIndex = 0;
      } else if (newIndex > maxIndex) {
        newIndex = maxIndex;
      }
      return newIndex;
    });
  };

  const bind = useGesture({
    onDragEnd: ({ direction: [dx] }) => {
      if (dx > 0) {
        changeTextIndex(-1);
      } else if (dx < 0) {
        changeTextIndex(1);
      }
    },
  });

  return (
    <div
      {...bind()}
      className="relative flex h-full w-full flex-col gap-6 p-6 text-xl text-white xl:flex-row"
    >
      <div className="flex h-full min-w-[225px] flex-1 items-start justify-between p-3 xl:items-center">
        <Image
          className="h-[256px] w-[225px]"
          alt=""
          src={content.image}
          height={256}
          width={225}
        />
        {isMobile && (
          <Arrows
            textIndex={textIndex}
            changeTextIndex={changeTextIndex}
            isMaxIndex={textIndex === maxIndex}
          />
        )}
      </div>
      <div className="relative flex h-full flex-col justify-between gap-4 text-sm leading-[24px] xl:min-h-[392px] xl:text-base">
        {content.text}
        <div className="flex items-center justify-center gap-2 xl:justify-start xl:gap-0.5">
          {Array(TAB_CONTENT[index].length)
            .fill(null)
            .map((_, idx) => (
              <div
                key={idx}
                className={cn("rounded-full bg-white", {
                  "h-[14px] w-[14px]": textIndex === idx,
                  "h-2 w-2": textIndex !== idx,
                })}
              />
            ))}
        </div>
      </div>
      {!isMobile && (
        <Arrows
          textIndex={textIndex}
          changeTextIndex={changeTextIndex}
          isMaxIndex={textIndex === maxIndex}
        />
      )}
    </div>
  );
};

export default TabContentItem;
