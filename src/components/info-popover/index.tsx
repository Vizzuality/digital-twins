import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import Info from "@/svgs/info.svg"
import InfoDark from "@/svgs/info-dark.svg"

type InfoPopoverProps = {
  children: React.ReactNode;
  content: React.ReactNode;
  variant?: "light" | "dark";
};

const InfoPopover: React.FC<InfoPopoverProps> = ({ children, content, variant = "light" }) => {
  const InfoComponent = variant === "light" ? Info : InfoDark;
  return (
    <Popover>
      <PopoverTrigger className="underline group relative">
        {children}
        <InfoComponent className="absolute -right-2 -top-2.5 h-4 w-4 transform group-hover:rotate-90 transition-transform" />
      </PopoverTrigger>
      <PopoverContent side="top" sideOffset={24}
        variant={variant}
      >{content}</PopoverContent>
    </Popover>
  );
}
export default InfoPopover;