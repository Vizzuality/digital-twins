"use client";

import { createPortal } from "react-dom";

import { AnimatePresence, motion } from "framer-motion";

import { useIsMobile } from "@/lib/hooks";
import { cn } from "@/lib/utils";

type MenuLinesProps = {
  colorClass?: string;
  verticalClassName?: string;
  columns: number[];
};

const MenuLines = ({ columns = [], verticalClassName }: MenuLinesProps) => {
  const screenWidth = window.innerWidth;
  const initialX = screenWidth - 470;
  const isMobile = useIsMobile();
  if (isMobile) return null;
  return (
    <>
      <AnimatePresence>
        <div className="menu-vertical-lines container pointer-events-none fixed inset-0 z-40 h-full w-full">
          <motion.div className={cn("absolute inset-0 h-full w-full", verticalClassName)}>
            {columns.map((x, index) => (
              <motion.div
                initial={{ x: initialX }}
                animate={{ x: [screenWidth, initialX, x, initialX] }}
                transition={{ duration: 3, times: [0, 0.1, 0.5, 1], ease: "easeOut" }}
                key={`line-y-menu-${index}`}
                className={cn("absolute h-full w-px bg-light-green")}
              />
            ))}
          </motion.div>
        </div>
      </AnimatePresence>
    </>
  );
};

export default (props: MenuLinesProps) => createPortal(<MenuLines {...props} />, document.body);
