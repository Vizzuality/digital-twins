'use client';

import HoverRepeatAnimation from "@/components/animations/hover-repeat";
import { useRecoilState } from "recoil";
import { menuAtom } from "@/store";
import { MotionButton } from "@/components/button";
import Menu from "@/svgs/menu.svg";
import Logo from "@/svgs/logo.svg";

export default function Header() {
  const [, setOpenedMenu] = useRecoilState(menuAtom);

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
    <div className="fixed inset-0 w-full h-[90px] py-6 bg-blue-900 flex z-20">
      <div className="container flex justify-between items-center">
        <Logo className="w-60 h-10 text-white" />
        <MenuButton />
      </div>
    </div>
  );
};