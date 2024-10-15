'use client';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';

type LinesProps = {
  sectionName: string;
  rows?: number[];
  colorClass?: string;
  verticalClassName?: string;
} & (
    | { hoveringColumnsNumber: number; columns?: never; hoveredIndex: number | null }
    | { columns: number[]; hoveringColumnsNumber?: never; hoveredIndex?: never }
  );

const Lines = ({
  sectionName,
  columns = [],
  rows = [],
  colorClass = 'bg-white/20',
  verticalClassName,
  hoveringColumnsNumber = 0,
  hoveredIndex,
}: LinesProps) => {

  const gridColumns3 = {
    'grid transition-all duration-500': true,
    'grid-cols-[1.2fr_0.9fr_0.9fr]': hoveredIndex === 0,
    'grid-cols-[0.9fr_1.2fr_0.9fr]': hoveredIndex === 1,
    'grid-cols-[0.9fr_0.9fr_1.2fr]': hoveredIndex === 2,
    'grid-cols-[1fr_1fr_1fr]': hoveredIndex === null,
  };

  const gridColumns5 = {
    'grid transition-all duration-500': true,
    'grid-cols-[1.4fr_0.9fr_0.9fr_0.9fr_0.9fr]': hoveredIndex === 0,
    'grid-cols-[0.9fr_1.4fr_0.9fr_0.9fr_0.9fr]': hoveredIndex === 1,
    'grid-cols-[0.9fr_0.9fr_1.4fr_0.9fr_0.9fr]': hoveredIndex === 2,
    'grid-cols-[0.9fr_0.9fr_0.9fr_1.4fr_0.9fr]': hoveredIndex === 3,
    'grid-cols-[0.9fr_0.9fr_0.9fr_0.9fr_1.4fr]': hoveredIndex === 4,
    'grid-cols-[1fr_1fr_1fr_1fr_1fr]': hoveredIndex === null,
  };

  const gridColumns = hoveringColumnsNumber === 3 ? gridColumns3 : gridColumns5;

  return <>
    <AnimatePresence>
      {/* Vertical lines */}
      <div className='vertical-lines container absolute inset-0 w-full h-full pointer-events-none'>
        <motion.div className={cn('w-full h-full absolute inset-0 z-10',
          verticalClassName,
          hoveringColumnsNumber && gridColumns)}
        >
          {
            !!columns?.length ?
              columns.map((x, index) => (
                <motion.div
                  initial={{ x: 1000, opacity: 0 }}
                  animate={{ x, opacity: 1 }}
                  transition={{ delay: 0.1 + index * 0.1, duration: 0.1 }}
                  key={`line-y-${sectionName}-${index}`}
                  className={cn("h-full w-px absolute", colorClass)} />
              )) :
              (
                Array(hoveringColumnsNumber).fill(null).map((_, index) => (
                  <motion.div
                    key={`line-y-${sectionName}-${index}`}
                    className={cn("h-full w-px", colorClass)} />
                ))
              )
          }
        </motion.div>
      </div>
      {/* Horizontal lines */}
      <div className='horizontal-lines w-full h-full absolute inset-0 z-10 pointer-events-none'>
        {rows.map((y, index) => (
          <motion.div
            initial={{ y: -1000, opacity: 0 }}
            animate={{ y, opacity: 1 }}
            transition={{ delay: 0.1 + index * 0.1, ease: 'linear', duration: 0.1 }}
            key={`line-x-${sectionName}-${index}`}
            className={cn("w-full h-px", colorClass)} />
        ))}
      </div>
    </AnimatePresence >
  </>
};

export default Lines;