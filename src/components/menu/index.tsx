'use client';

import HoverRepeatAnimation from "@/components/animations/hover-repeat";
import { useRecoilState } from "recoil";
import { menuAtom } from "@/store";
import Link from "next/link";
import { MotionButton } from "@/components/button";
import { motion } from "framer-motion";
import CloseSmall from "@/svgs/close-small.svg";
import Logo from "@/svgs/logo.svg";
import Instagram from "@/svgs/instagram.svg";
import Linkedin from "@/svgs/linkedin.svg";
import dynamic from "next/dynamic";

const MenuLines = dynamic(() => import("@/components/menu-lines"), { ssr: false });

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
      <CloseSmall className="w-[10px] h-[10px]" />
    </MotionButton>
  );

  return (
    <>
      {openedMenu && <MenuLines verticalClassName="absolute right-0" columns={[0, 254, 270, 430, 1074]} />}
      <motion.nav
        className="fixed top-0 w-full overflow-auto xl:w-[470px] right-0 h-full bg-light-green flex flex-col p-10 justify-between z-50"
        initial={{ x: "100%" }}
        animate={{ x: openedMenu ? 0 : "100%" }}
        transition={{ type: "linear", duration: 0.3 }}
      >
        <div className="flex flex-col gap-[72px] pb-10">
          <CloseMenuButton />
          <ul className="text-xl xl:text-3xl text-green-700 font-semibold space-y-8 max-w-[292px]">
            <li>
              <Link href="/" onClick={() => setOpenedMenu(false)}>
                <HoverRepeatAnimation>Home</HoverRepeatAnimation></Link>
            </li>
            <li>
              <Link href="/case-study-energy" onClick={() => setOpenedMenu(false)}><HoverRepeatAnimation className="pb-1">Case Studies: Energy</HoverRepeatAnimation></Link>
            </li>
            <li>
              <Link href="/about" onClick={() => setOpenedMenu(false)}><HoverRepeatAnimation>About Us</HoverRepeatAnimation></Link>
            </li>
            <li>
              <a href="mailto:earth-communication@bsc.es" onClick={() => setOpenedMenu(false)}><HoverRepeatAnimation>Contact</HoverRepeatAnimation></a>
            </li>
          </ul>
        </div>
        <div className="flex justify-between items-end">
          <Logo className="w-60 h-10 text-green-900" />
          <ul className="flex gap-[15px]">
            <li>
              <a href="https://www.instagram.com/bsc_cns/" target="_blank">
                <Instagram className="w-6 h-6" />
                <div className="sr-only">Instagram</div>
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/company/barcelona-supercomputing-center/" target="_blank">
                <div className="sr-only">Linkedin</div>
                <Linkedin className="w-6 h-6" />
              </a>
            </li>
          </ul>
        </div>
      </motion.nav>
    </>
  );
};