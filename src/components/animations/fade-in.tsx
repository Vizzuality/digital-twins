import { useRef, FC, useState, useEffect } from "react";

import { motion, AnimatePresence } from "framer-motion";

import { useIsMobile } from "@/lib/hooks";

const FadeIn: FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay }) => {
  const ref = useRef(null);
  const isMobile = useIsMobile();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (isMobile || !isClient) {
    return <>{children}</>;
  }

  return (
    <AnimatePresence>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 100 }}
        viewport={{ once: true }}
        whileInView={{ opacity: 1, y: 0, transition: { delay, ease: "easeIn", duration: 0.5 } }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default FadeIn;
