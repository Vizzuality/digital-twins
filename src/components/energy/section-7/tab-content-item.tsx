import { useState } from "react";

import Image from "next/image";

import { useGesture } from "@use-gesture/react";

import { useIsMobile } from "@/lib/hooks";
import StepDots from "@/components/step-dots";
import Arrows from "@/components/arrows";

import { TAB_CONTENT } from "./data";

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
      <div className="flex h-full min-w-[225px] flex-1 items-start justify-between sm:max-xl:w-full xl:items-center">
        <Image
          className="h-[392px] w-[249px]"
          alt=""
          src={content.image}
          width={635}
          height={793}
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
          <StepDots
            sectionName="home-2"
            colorClass="bg-white"
            vertical={false}
            stepsNumber={TAB_CONTENT[index].length}
            currentStep={textIndex}
            onClick={(index) => {
              setTextIndex(index);
            }}
          />
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
