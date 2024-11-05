import Image from "next/image";
import CursorSelect from "@/svgs/cursor-select.svg";
import { cn } from "@/lib/utils";

const TabTriggerItem = ({ title, subtitle, image, disabled, index, isSelected, isHovered }:
  {
    title: string;
    subtitle: string;
    image: string;
    index: number;
    disabled?: boolean;
    isSelected: boolean;
    isHovered: boolean;
  }
) => (
  <div className={cn("flex gap-3 w-full min-w-[300px] h-fit transition-all duration-500 flex-1",
    {
      'h-[143px]': isSelected || isHovered,
      'h-[79px]': !isSelected && !isHovered
    }
  )} >
    <div className={cn("w-[80px] overflow-hidden relative transition-all duration-500")}>
      <Image
        className={cn(
          {
            'opacity-80': !isSelected && !isHovered,
          }
        )}
        height={143}
        width={90}
        objectFit="cover"
        style={{ objectPosition: 'center' }}
        src={image}
        alt=""
      />
    </div>
    <div className={cn("p-[10px] xl:p-4 xl:pr-0 flex flex-col text-left items-start justify-start w-[calc(100vw_-_140px)] xl:max-w-[212px] whitespace-normal",
      {
        'text-blue-900 bg-light-green': isSelected,
        'text-white bg-white/5': !isSelected && isHovered,
        'text-white': !isSelected && !isHovered

      }
    )}>
      <div className="text-[18px] leading-[21px] flex justify-between w-full items-center xl:pr-4">
        <div>
          {'0'}{index + 1}
        </div>
        {isSelected && <div className="text-blue-950/30 text-2xs">
          Selected profile
        </div>}
        {(isHovered && !isSelected && !disabled) &&
          (<div className="text-light-green text-2xs flex items-center gap-2">
            Select profile
            <CursorSelect />
          </div>
          )}
      </div>
      <div className="text-[22px] leading-[25px] pb-2 xl:pb-4">
        {title}
      </div>
      <div className={cn("text-xs font-normal leading-[16px] transition-opacity duration-500", {
        'opacity-1': isSelected || isHovered,
        'opacity-0': !isSelected && !isHovered
      })}>
        {subtitle}
      </div>
    </div>
  </div >
);

export default TabTriggerItem;