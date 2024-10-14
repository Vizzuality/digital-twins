import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, FC } from "react";

const FadeIn: FC<{ children: React.ReactNode, delay?: number }> = ({ children, delay }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <AnimatePresence>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 100 }}
        animate={isInView ? { opacity: 1, y: 0, transition: { delay, ease: 'easeIn', duration: 0.5 } } : {}}
        exit={{ opacity: 1 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default FadeIn;
