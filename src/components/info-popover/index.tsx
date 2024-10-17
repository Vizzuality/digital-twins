import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import Info from "@/svgs/info.svg"

type InfoPopoverProps = {
  children: React.ReactNode;
  content: React.ReactNode;
};

const InfoPopover: React.FC<InfoPopoverProps> = ({ children, content }) => {
  return (
    <Popover>
      <PopoverTrigger className="underline group relative">
        {children}
        <Info className="absolute -right-2 -top-2.5 h-4 w-4 transform group-hover:rotate-90 transition-transform" />
      </PopoverTrigger>
      <PopoverContent side="top" sideOffset={24}
      >{content}</PopoverContent>
    </Popover>
  );
}
export default InfoPopover;