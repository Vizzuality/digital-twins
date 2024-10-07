'use client';

import { PropsWithChildren } from "react";
import { EasingDefinition, Variants, motion } from "framer-motion";

const ANIMATION_EASE: EasingDefinition = "linear";
const ANIMATION_DURATION = 0.15;

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

const HoverRepeatAnimation = ({ children }: PropsWithChildren) => {
  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      animate="rest"
      className="relative overflow-hidden"
    >
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
