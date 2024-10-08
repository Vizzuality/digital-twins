'use client';

import { useState, useEffect } from "react";
import HoverRepeatAnimation from "@/components/animations/hover-repeat";
import { useRecoilState } from "recoil";
import { menuAtom } from "@/store";
import { MotionButton } from "@/components/button";
import { cn } from "@/lib/utils";
import Menu from "@/svgs/menu.svg";
import Logo from "@/svgs/logo.svg";

const useScrolled = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return isScrolled;
}

export default function Header() {
  const [, setOpenedMenu] = useRecoilState(menuAtom);
  const isScrolled = useScrolled();
  const MenuButton = () => (
    <MotionButton onClick={() => setOpenedMenu(true)}
      variant="light-green"
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      <HoverRepeatAnimation isChild>
        <div className="text-light-green text-sm font-medium uppercase">MENU</div>
      </HoverRepeatAnimation>
      <Menu className="w-4 h-4" />
    </MotionButton >
  );

  return (
    <div className={cn("fixed inset-0 w-full h-[90px] py-6 flex z-20 transition-colors duration-500",
      {
        "bg-blue-900": isScrolled,
        "bg-transparent": !isScrolled
      })
    }>
      <div className="container flex justify-between items-center">
        <Logo className="w-60 h-10 text-white" />
        <MenuButton />
      </div>
    </ div >
  );
};