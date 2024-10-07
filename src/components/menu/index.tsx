'use client';

import HoverRepeatAnimation from "@/components/animations/hover-repeat";
import { useRecoilState } from "recoil";
import { menuAtom } from "@/store";
import Link from "next/link";
import { MotionButton } from "@/components/button";
import { motion } from "framer-motion";

export default function Menu() {
  const [openedMenu, setOpenedMenu] = useRecoilState(menuAtom);

  const CloseMenuButton = () => (
    <MotionButton
      className="self-end"
      onClick={() => setOpenedMenu(false)}
      variant="green"
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      <HoverRepeatAnimation isChild>
        <div className="text-green-700 text-sm font-medium uppercase">MENU</div>
      </HoverRepeatAnimation>
      <img alt="Menu button" className="w-[10px] h-[10px]" src="/icons/close-small.svg" />
    </MotionButton>
  );

  return (
    <motion.div
      className="fixed top-0 w-[470px] right-0 h-full bg-light-green flex flex-col p-10 justify-between"
      initial={{ x: "100%" }}
      animate={{ x: openedMenu ? 0 : "100%" }}
      transition={{ type: "linear", duration: 0.3 }}
    >
      <div className="flex flex-col gap-[72px]">
        <CloseMenuButton />
        <ul className="text-3xl text-green-700 font-semibold space-y-8 max-w-[292px]">
          <li>
            <Link href="/">
              <HoverRepeatAnimation>Home</HoverRepeatAnimation></Link>
          </li>
          <li>
            <Link href="/"><HoverRepeatAnimation className="pb-1">Case Studies: Energy</HoverRepeatAnimation></Link>
          </li>
          <li>
            <Link href="/"><HoverRepeatAnimation>About Us</HoverRepeatAnimation></Link>
          </li>
          <li>
            <a href="mailto:#"><HoverRepeatAnimation>Contact</HoverRepeatAnimation></a>
          </li>
        </ul>
      </div>
      <div className="flex justify-between items-end">
        <img alt="Logo" className="w-60 h-10" src="/logo-green.svg" />
        <ul className="flex gap-[15px]">
          <li>
            <a href="/">
              <img alt="Instagram" className="w-6 h-6" src="/icons/instagram.svg" />
              <div className="sr-only">Instagram</div>
            </a>
          </li>
          <li>
            <a href="/">
              <div className="sr-only">Linkedin</div>
              <img alt="Linkedin" className="w-6 h-6" src="/icons/linkedin.svg" />
            </a>
          </li>
        </ul>
      </div>
    </motion.div>
  );
};