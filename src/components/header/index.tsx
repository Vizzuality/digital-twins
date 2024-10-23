'use client';

import HoverRepeatAnimation from "@/components/animations/hover-repeat";
import { useRecoilState } from "recoil";
import { menuAtom } from "@/store";
import { MotionButton } from "@/components/button";
import { cn } from "@/lib/utils";
import Menu from "@/svgs/menu.svg";
import Logo from "@/svgs/logo.svg";

export default function Header() {
  const [, setOpenedMenu] = useRecoilState(menuAtom);
  const isScrolled = true;
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
    <header className={cn("fixed inset-0 w-full h-[90px] py-6 flex z-40 transition-colors duration-500",
      {
        "bg-blue-900": isScrolled,
        "bg-transparent": !isScrolled
      })
    }>
      <div className="container flex justify-between items-center">
        <Logo className="w-40 xl:w-60 h-10 text-white" />
        <MenuButton />
      </div>
    </header>
  );
};