"use client";

import dynamic from "next/dynamic";
import Link from "next/link";

import { motion } from "framer-motion";
import { useRecoilState } from "recoil";

import { menuAtom } from "@/store";

import HoverRepeatAnimation from "@/components/animations/hover-repeat";
import { MotionButton } from "@/components/button";

import CloseSmall from "@/svgs/close-small.svg";
import Instagram from "@/svgs/instagram.svg";
import Linkedin from "@/svgs/linkedin.svg";
import Logo from "@/svgs/logo.svg";

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
        <div className="text-sm font-medium uppercase text-green-700">MENU</div>
      </HoverRepeatAnimation>
      <CloseSmall className="h-[10px] w-[10px]" />
    </MotionButton>
  );

  return (
    <>
      {openedMenu && (
        <MenuLines verticalClassName="absolute right-0" columns={[0, 254, 270, 430, 1074]} />
      )}
      <motion.nav
        className="fixed right-0 top-0 z-50 flex h-full w-full flex-col justify-between overflow-auto bg-light-green p-10 xl:w-[470px]"
        initial={{ x: "100%" }}
        animate={{ x: openedMenu ? 0 : "100%" }}
        transition={{ type: "linear", duration: 0.3 }}
      >
        <div className="flex flex-col gap-[72px] pb-10">
          <CloseMenuButton />
          <ul className="max-w-[292px] space-y-8 text-xl font-semibold text-green-700 xl:text-3xl">
            <li>
              <Link href="/" onClick={() => setOpenedMenu(false)}>
                <HoverRepeatAnimation>Home</HoverRepeatAnimation>
              </Link>
            </li>
            <li>
              <Link href="/case-study-energy" onClick={() => setOpenedMenu(false)}>
                <HoverRepeatAnimation className="pb-1">Case Studies: Energy</HoverRepeatAnimation>
              </Link>
            </li>
            <li>
              <Link href="/about" onClick={() => setOpenedMenu(false)}>
                <HoverRepeatAnimation>About Us</HoverRepeatAnimation>
              </Link>
            </li>
            <li>
              <a href="mailto:earth-communication@bsc.es" onClick={() => setOpenedMenu(false)}>
                <HoverRepeatAnimation>Contact</HoverRepeatAnimation>
              </a>
            </li>
          </ul>
        </div>
        <div className="flex items-end justify-between">
          <Logo className="h-10 w-60 text-green-900" />
          <ul className="flex gap-[15px]">
            <li>
              <a href="https://www.instagram.com/bsc_cns/" target="_blank">
                <Instagram className="h-6 w-6" />
                <div className="sr-only">Instagram</div>
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/company/barcelona-supercomputing-center/"
                target="_blank"
              >
                <div className="sr-only">Linkedin</div>
                <Linkedin className="h-6 w-6" />
              </a>
            </li>
          </ul>
        </div>
      </motion.nav>
    </>
  );
}
