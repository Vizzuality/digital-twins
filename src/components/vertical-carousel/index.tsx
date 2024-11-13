"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, Children } from "react";

const VerticalCarousel = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) => {
  const content = Children.toArray(children);
  const [index, setIndex] = useState(0);

  const contentAnimation = {
    initial: {
      y: "100%",
      opacity: 0,
      transition: { ease: "linear", duration: 0.5 },
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: { ease: "linear", duration: 0.5 },
    },
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % content.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [content.length]);

  return (
    <div className={className}>
      <div className="relative h-[3rem] overflow-hidden">
        <AnimatePresence initial={false}>
          {content.map(
            (child, i) =>
              i === index && (
                <motion.div
                  key={`carousel-item-${i}`}
                  className="absolute w-full"
                  variants={contentAnimation}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  {child}
                </motion.div>
              ),
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default VerticalCarousel;
