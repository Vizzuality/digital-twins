import dynamic from "next/dynamic";
import Link from "next/link";

import { cn } from "@/lib/utils";

import HoverRepeatAnimation from "@/components/animations/hover-repeat";

import Logo from "@/svgs/logo.svg";



const Lines = dynamic(() => import("@/components/lines"), { ssr: false });

const Footer = ({ backgroundClass = "bg-green-700" }) => {
  return (
    <footer className={cn("relative flex w-full flex-col text-white", backgroundClass)}>
      {/* Line as separator for xl up */}
      <Lines sectionName="footer" columns={[]} rows={[360]} colorClass="bg-white/20" />
      <div className="container px-0">
        <div className="flex justify-center">
          <div className="flex w-1/2 flex-col gap-20 px-[20px] py-10 max-xl:container sm:py-10 xl:px-[100px] xl:py-20">
            <div className="max-w-[258px] text-sm font-medium uppercase tracking-widest">
              Digital Twins: <div>Innovative Research for a Sustainable Future</div>
            </div>
            <Logo className="w-40 min-w-40 text-white xl:w-60 xl:min-w-60" />
          </div>
          <div className="flex w-1/2 px-[20px] py-10 xl:px-[100px] xl:py-20">
            <ul className="space-y-8">
              <li className="text-base font-bold text-white underline">
                <Link href="/">
                  <HoverRepeatAnimation>Home</HoverRepeatAnimation>
                </Link>
              </li>
              <li className="text-base font-bold text-white underline">
                <Link href="/case-study-energy">
                  <HoverRepeatAnimation>Case studies: Energy</HoverRepeatAnimation>
                </Link>
              </li>
              <li className="text-base font-bold text-white underline">
                <Link href="/about">
                  <HoverRepeatAnimation>About Us</HoverRepeatAnimation>
                </Link>
              </li>
              <li className="text-base font-bold text-white underline">
                <Link href="mailto:earth-communication@bsc.es">
                  <HoverRepeatAnimation>Contact</HoverRepeatAnimation>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col max-xl:gap-1 xl:flex-row w-full border-white/20 px-[20px] py-6 text-xs leading-relaxed text-white/50 max-xl:border-t xl:px-[100px] xl:text-lg">
          <div className="xl:w-1/2">
            <a href="https://www.bsc.es" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/80 underline">
              © Barcelona Supercomputing Center
            </a>
            , 2024
          </div>
          <div className="xl:px-[100px] xl:inline-flex flex-col gap-3 xl:flex-row xl:items-center xl:gap-1 xl:text-base">
            <span>Designed and Developed by </span>
            <a href="https://www.vizzuality.com/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/80 underline">
              vizzuality
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
