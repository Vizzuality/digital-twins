import Image from "next/image";
import CursorSelect from "@/svgs/cursor-select.svg";
import { cn } from "@/lib/utils";

const TabTriggerItem = ({
  title,
  subtitle,
  image,
  disabled,
  index,
  isSelected,
  isHovered,
}: {
  title: string;
  subtitle: string;
  image: string;
  index: number;
  disabled?: boolean;
  isSelected: boolean;
  isHovered: boolean;
}) => (
  <div
    className={cn("flex h-fit w-full min-w-[300px] flex-1 gap-3 transition-all duration-500", {
      "h-[143px]": isSelected || isHovered,
      "h-[79px]": !isSelected && !isHovered,
    })}
  >
    <div className={cn("relative w-[80px] overflow-hidden transition-all duration-500")}>
      <Image
        className={cn({
          "opacity-80": !isSelected && !isHovered,
        })}
        height={143}
        width={90}
        objectFit="cover"
        style={{ objectPosition: "center" }}
        src={image}
        alt=""
      />
    </div>
    <div
      className={cn(
        "flex w-[calc(100vw_-_140px)] flex-col items-start justify-start whitespace-normal p-[10px] text-left xl:max-w-[212px] xl:p-4 xl:pr-0",
        {
          "bg-light-green text-blue-900": isSelected,
          "bg-white/5 text-white": !isSelected && isHovered,
          "text-white": !isSelected && !isHovered,
        },
      )}
    >
      <div className="flex w-full items-center justify-between text-[18px] leading-[21px] xl:pr-4">
        <div>
          {"0"}
          {index + 1}
        </div>
        {isSelected && <div className="text-2xs text-blue-950/30">Selected profile</div>}
        {isHovered && !isSelected && !disabled && (
          <div className="flex items-center gap-2 text-2xs text-light-green">
            Select profile
            <CursorSelect />
          </div>
        )}
      </div>
      <div className="pb-2 text-[22px] leading-[25px] xl:pb-4">{title}</div>
      <div
        className={cn("text-xs font-normal leading-[16px] transition-opacity duration-500", {
          "opacity-1": isSelected || isHovered,
          "opacity-0": !isSelected && !isHovered,
        })}
      >
        {subtitle}
      </div>
    </div>
  </div>
);

export default TabTriggerItem;
