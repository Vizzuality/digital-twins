import Logo from "@/svgs/logo.svg";
import Link from "next/link";
import HoverRepeatAnimation from "@/components/animations/hover-repeat";
import { cn } from "@/lib/utils";
import Vizzuality from "@/svgs/vizzuality.svg";

const Footer = ({ backgroundClass = "bg-green-700" }) => {
  return (
    <footer className={cn("w-full flex-col flex text-white", backgroundClass)}>
      <div className="justify-center flex">
        <div className="w-1/2 px-[20px] xl:px-[100px] py-10 xl:py-20 flex flex-col gap-20">
          <div className="text-sm font-medium uppercase max-w-[258px] tracking-widest">Digital Twins: <div>Innovative Research for a Sustainable Future</div></div>
          <Logo className="text-white w-40 xl:w-60" />
        </div>
        <div className="w-1/2 px-[20px] xl:px-[100px] py-10 xl:py-20 flex">
          <ul className="space-y-8">
            <li className="text-white text-base font-bold underline">
              <Link href="/"><HoverRepeatAnimation>
                Home
              </HoverRepeatAnimation>
              </Link>
            </li>
            <li className="text-white text-base font-bold underline">
              <Link href="/case-study-energy"><HoverRepeatAnimation>Case studies: Energy</HoverRepeatAnimation></Link>
            </li>
            <li className="text-white text-base font-bold underline">
              <Link href="/about"><HoverRepeatAnimation>About Us</HoverRepeatAnimation></Link>
            </li>
            <li className="text-white text-base font-bold underline">
              <Link href="mailto:earth-communication@bsc.es"><HoverRepeatAnimation>Contact</HoverRepeatAnimation></Link>
            </li>
          </ul>
        </div >
      </div>
      <div className="px-[20px] xl:px-[100px] py-6 w-full gap-10 flex border-t border-white/20 text-white/50 text-xs xl:text-lg leading-relaxed">
        <div className="max-w-[calc(50%-20px)]">© Barcelona Supercomputing Center, 2024</div>
        <div className="xl:items-center gap-3 xl:gap-1 flex-col xl:flex-row inline-flex xl:text-base">
          <span>Designed and Developed by </span>
          <a
            href="https://www.vizzuality.com/"
            target="_blank"
            rel="noopener noreferrer"
          >

            <Vizzuality />
          </a>
        </div>
      </div>
    </footer >
  );
}

export default Footer;
