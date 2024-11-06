import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import Info from "@/svgs/info.svg"
import InfoDark from "@/svgs/info-dark.svg"
import { useIsMobile } from "@/lib/hooks"

type InfoPopoverProps = {
  children: React.ReactNode;
  content: React.ReactNode;
  variant?: "light" | "dark";
};

const InfoPopover: React.FC<InfoPopoverProps> = ({ children, content, variant = "light" }) => {
  const InfoComponent = variant === "light" ? Info : InfoDark;
  const isMobile = useIsMobile();
  return (
    <Popover>
      <PopoverTrigger className="underline group relative">
        {children}
        <InfoComponent className="absolute -right-2 -top-2.5 h-4 w-4 transform group-hover:rotate-45 transition-transform" />
      </PopoverTrigger>
      <PopoverContent className="text-xs" side="top" sideOffset={isMobile ? 20 : 0} align="end"
        variant={variant}
      >{content}</PopoverContent>
    </Popover>
  );
}
export default InfoPopover;