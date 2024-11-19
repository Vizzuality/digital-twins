import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import InfoDark from "@/svgs/info-dark.svg";
import Info from "@/svgs/info.svg";

type InfoPopoverProps = {
  children: React.ReactNode;
  content: React.ReactNode;
  variant?: "light" | "dark";
};

const InfoPopover: React.FC<InfoPopoverProps> = ({ children, content, variant = "light" }) => {
  const InfoComponent = variant === "light" ? Info : InfoDark;
  return (
    <Popover>
      <PopoverTrigger className="group relative underline">
        {children}
        <InfoComponent className="absolute -right-2 -top-2.5 h-4 w-4 transform transition-transform group-hover:rotate-45" />
      </PopoverTrigger>
      <PopoverContent
        className="text-xs"
        side="top"
        sideOffset={20}
        align="start"
        variant={variant}
      >
        {content}
      </PopoverContent>
    </Popover>
  );
};
export default InfoPopover;
