"use client";

import { PropsWithChildren } from "react";
import { EasingDefinition, Variants, motion } from "framer-motion";
import { cn } from "@/lib/utils";

const ANIMATION_EASE: EasingDefinition = "linear";
const ANIMATION_DURATION = 0.2;

const contentAnimation: Variants = {
  rest: {
    y: 0,
    transition: { ease: ANIMATION_EASE, duration: ANIMATION_DURATION },
  },
  hover: {
    y: "105%", // Added an extra 5% as a buffer
    transition: { ease: ANIMATION_EASE, duration: ANIMATION_DURATION },
  },
};

const duplicatedContentAnimation: Variants = {
  rest: {
    y: "-105%", // Added an extra 5% as a buffer
    transition: { ease: ANIMATION_EASE, duration: ANIMATION_DURATION },
  },
  hover: {
    y: 0,
    transition: { ease: ANIMATION_EASE, duration: ANIMATION_DURATION },
  },
};

interface HoverRepeatAnimationProps {
  className?: string;
  isChild?: boolean;
}

const HoverRepeatAnimation = ({
  children,
  className,
  isChild,
}: PropsWithChildren & HoverRepeatAnimationProps) => {
  const parentProps = isChild
    ? {}
    : {
        initial: "rest",
        whileHover: "hover",
        animate: "rest",
      };

  return (
    <motion.div {...parentProps} className={cn("relative overflow-hidden", className)}>
      <motion.div className="absolute" aria-hidden variants={duplicatedContentAnimation}>
        {children}
      </motion.div>
      <motion.div className="relative" variants={contentAnimation}>
        {children}
      </motion.div>
    </motion.div>
  );
};

export default HoverRepeatAnimation;
