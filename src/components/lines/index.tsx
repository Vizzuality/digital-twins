'use client';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion, stagger } from 'framer-motion';

const Lines = ({
  sectionName,
  columns = [],
  rows = [],
  colorClass = 'bg-white/20'
}: {
  sectionName: string;
  columns?: number[];
  rows?: number[];
  colorClass?: string;
}) => {

  return <>
    <AnimatePresence>
      <div className='container absolute inset-0 w-full h-full'>
        <motion.div className='w-full h-full absolute inset-0 left-8 z-10'>
          {
            columns.map((x, index) => (
              <motion.div
                initial={{ x: -1000, opacity: 0 }}
                animate={{ x, opacity: 1 }}
                transition={{ delay: 0.1 + index * 0.1, duration: 0.1 }}
                key={`line-y-${sectionName}-${index}`}
                className={cn("h-full w-px  absolute", colorClass)} />
            ))
          }
        </motion.div>
      </div>
      <div className='w-full h-full absolute inset-0 z-10'>
        {rows.map((y, index) => (
          <motion.div
            initial={{ y: -1000, opacity: 0 }}
            animate={{ y, opacity: 1 }}
            transition={{ delay: 0.5 + index * 0.1, ease: 'linear', duration: 0.1 }}
            key={`line-x-${sectionName}-${index}`}
            className={cn("w-full h-px", colorClass)} />
        ))}
      </div>
    </AnimatePresence >
  </>
};

export default Lines;