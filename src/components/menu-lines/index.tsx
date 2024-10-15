'use client';

import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { createPortal } from 'react-dom';

type MenuLinesProps = {
  colorClass?: string;
  verticalClassName?: string;
  columns: number[];
};

const MenuLines = ({
  columns = [],
  verticalClassName,
}: MenuLinesProps) => {
  const screenWidth = window.innerWidth;
  const initialX = screenWidth - 470;
  return <>
    <AnimatePresence>
      <div className='menu-vertical-lines container fixed inset-0 w-full h-full pointer-events-none z-40'>
        <motion.div className={cn('w-full h-full absolute inset-0',
          verticalClassName)}
        >
          {
            columns.map((x, index) => (
              <motion.div
                initial={{ x: initialX }}
                animate={{ x: [screenWidth, initialX, x, initialX] }}
                transition={{ duration: 3, times: [0, 0.1, 0.5, 1], ease: "easeOut" }}
                key={`line-y-menu-${index}`}
                className={cn("h-full w-px absolute bg-light-green")} />
            ))
          }
        </motion.div>
      </div>
    </AnimatePresence >
  </>
};

export default (props: MenuLinesProps) => createPortal(<MenuLines {...props} />, document.body);