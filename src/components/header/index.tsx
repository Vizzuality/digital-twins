"use client";

import { useState, useEffect, useRef } from "react";

import { useRecoilState } from "recoil";

import { cn } from "@/lib/utils";

import { menuAtom } from "@/store";

import HoverRepeatAnimation from "@/components/animations/hover-repeat";
import { MotionButton } from "@/components/button";


import Logo from "@/svgs/logo.svg";
import Menu from "@/svgs/menu.svg";

export default function Header({ colorClassName = 'bg-blue-900' }: { colorClassName?: string }) {
  const [, setOpenedMenu] = useRecoilState(menuAtom);
  const [isVisible, setIsVisible] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);
  const lastScrollY = useRef(0);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY.current) {
      // Scrolling down
      setIsVisible(false);
    } else {
      // Scrolling up
      setIsVisible(true);
    }
    setIsAtTop(currentScrollY === 0);
    lastScrollY.current = currentScrollY;
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const MenuButton = () => (
    <MotionButton
      onClick={() => setOpenedMenu(true)}
      variant="light-green"
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      <HoverRepeatAnimation isChild>
        <div className="text-sm font-medium uppercase text-light-green">MENU</div>
      </HoverRepeatAnimation>
      <Menu className="h-4 w-4" />
    </MotionButton>
  );

  return (
    <header
      className={cn(
        "fixed inset-0 z-40 flex h-[90px] w-full py-6 transition-transform duration-500",
        {
          "translate-y-0": isVisible,
          "-translate-y-full": !isVisible,
          [colorClassName]: !isAtTop,
          "bg-transparent": isAtTop,
        },
      )}
    >
      <div className="container flex items-center justify-between px-10">
        <Logo className="h-10 w-40 text-white xl:w-60" />
        <MenuButton />
      </div>
    </header>
  );
}
