
'use client';

import { motion, AnimatePresence, stagger } from 'framer-motion';
import { useEffect, useState, Children } from 'react';

const VerticalCarousel = ({ children, className }:
  { children: React.ReactNode, className: string }
) => {
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
    exit: {
      opacity: 0,
      y: "-100%",
      transition: { ease: "linear", duration: 0.5 },
    },
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (index + 1) % content.length;
      setIndex(nextIndex);
    }, 3000);
    return () => clearInterval(interval);
  }, [content.length, index]);

  return (
    <div className={className}>
      <motion.div className="relative h-[3rem] overflow-hidden">
        <AnimatePresence>
          <motion.div key={index} className="absolute w-full"
            variants={contentAnimation}
            initial="initial"
            animate="animate"
            exit="exit">
            {content[index]}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default VerticalCarousel;