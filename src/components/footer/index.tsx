import Logo from "@/svgs/logo.svg";
import Link from "next/link";
import HoverRepeatAnimation from "@/components/animations/hover-repeat";
import { cn } from "@/lib/utils";
import Vizzuality from "@/svgs/vizzuality.svg";

const Footer = ({ backgroundClass = "bg-green-700" }) => {
  return (
    <footer className={cn("w-full flex-col flex text-white", backgroundClass)}>
      <div className="justify-center flex">
        <div className="w-1/2 px-[100px] py-20 border-r border-white/20 flex flex-col gap-20">
          <div className="text-sm font-medium uppercase max-w-[258px] tracking-widest">Digital Twins: <div>Innovative Research for a Sustainable Future</div></div>
          <div className="text-lg font-bold leading-8">Lorem ipsum dolor sit amet consectetur. Sagittis praesent tempus euismod tincidunt duis phasellus aliquam facilisis consectetur.</div>
          <Logo className="text-white" />
        </div>
        <div className="w-1/2 px-[100px] py-20 flex">
          <ul className="space-y-8">
            <li className="text-white text-base font-bold underline">
              <Link href="/"><HoverRepeatAnimation>
                Home
              </HoverRepeatAnimation>
              </Link>
            </li>
            <li className="text-white text-base font-bold underline">
              <Link href="/"><HoverRepeatAnimation>Impact mode: Energy</HoverRepeatAnimation></Link>
            </li>
            <li className="text-white text-base font-bold underline">
              <Link href="/"><HoverRepeatAnimation>About Us</HoverRepeatAnimation></Link>
            </li>
            <li className="text-white text-base font-bold underline">
              <Link href="/"><HoverRepeatAnimation>Contact</HoverRepeatAnimation></Link>
            </li>
          </ul>
        </div >
      </div>
      <div className="px-[100px] py-6 w-full gap-10 flex border-t border-white/20 text-white/50 text-lg leading-relaxed">
        <div>© Barcelona Supercomputing Center, 2024</div>
        <div className="items-center gap-1 flex">
          <div>Designed and Developed by </div>
          <Vizzuality />
        </div>
      </div>
    </footer >
  );
}

export default Footer;