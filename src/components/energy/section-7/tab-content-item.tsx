import ArrowRight from "@/svgs/arrow-right.svg";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { TAB_CONTENT } from "./data";
import Image from "next/image";

const Arrows = ({ changeTextIndex, textIndex, isMaxIndex }: {
  changeTextIndex: (index: number) => void,
  textIndex: number;
  isMaxIndex: boolean;
}) => (
  <div className="items-start gap-0.5 flex mt-1">
    <button
      type="button"
      onClick={() => changeTextIndex(-1)}
      title="Previous text"
      disabled={textIndex === 0}
      aria-disabled={textIndex === 0}
    >
      <div className='sr-only'>Previous text</div>
      <ArrowRight className={cn("w-6 h-6 p-[2px] -rotate-180 text-white",
        {
          'opacity-50': textIndex === 0
        }
      )} />
    </button>
    <button
      type="button"
      onClick={() => changeTextIndex(1)}
      title="Next text"
      disabled={isMaxIndex}
      aria-disabled={isMaxIndex}
    >
      <div className='sr-only'>Next text</div>
      <ArrowRight className={cn("w-6 h-6 p-[2px] text-white",
        {
          'opacity-50': isMaxIndex
        }
      )} />
    </button>
  </div>
);

const TabContentItem = ({ index = 0 }: { index: number }) => {
  const [textIndex, setTextIndex] = useState(0);
  const maxIndex = TAB_CONTENT[index].length - 1;
  const content = TAB_CONTENT[index][textIndex];
  const changeTextIndex = (index: number) => {
    setTextIndex((prevIndex) => {
      let newIndex = prevIndex + index;
      if (newIndex < 0) {
        newIndex = 0;
      } else if (newIndex > maxIndex) {
        newIndex = maxIndex;
      }
      return newIndex
    }
    );
  }

  return (
    <div className="relative text-white text-xl h-full w-full flex p-6 gap-6">
      <div className="min-w-[225px] p-3 flex-1 flex h-full items-center">
        <Image
          className="w-[225px] h-[256px]"
          alt=""
          src={content.image}
          height={256}
          width={225}
        />
      </div>
      <div className="text-base relative flex flex-col justify-between h-full gap-4 leading-[24px] min-h-[470px]">
        {content.text}
        <div className="flex items-center gap-0.5">
          {Array(TAB_CONTENT[index].length).fill(null).map((_, index) => (
            <div key={index} className={cn("rounded-full bg-white ", {
              'w-[14px] h-[14px]': textIndex === index,
              'w-2 h-2': textIndex !== index
            })} />
          ))}
        </div>
      </div>
      <Arrows textIndex={textIndex} changeTextIndex={changeTextIndex} isMaxIndex={textIndex === maxIndex} />
    </div>);
}

export default TabContentItem;