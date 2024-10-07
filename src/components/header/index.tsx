'use client';

import HoverRepeatAnimation from "@/components/animations/hover-repeat";
import { useRecoilState } from "recoil";
import { menuAtom } from "@/store";
import { MotionButton } from "@/components/button";

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
      <img alt="Menu button" className="w-4 h-4" src="/icons/menu.svg" />
    </MotionButton >
  );

  return (
    <div className="fixed inset-0 w-full h-[90px] py-6 bg-blue-900 flex">
      <div className="container flex justify-between items-center">
        <img alt="Logo" className="w-60 h-10" src="/logo.svg" />
        <MenuButton />
      </div>
    </div>
  );
};