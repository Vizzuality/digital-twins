'use client';
import { Fragment } from 'react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, Children } from 'react';

const BouncingMarquee = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => setScreenWidth(window.innerWidth);
    updateWidth();

    window.addEventListener('resize', updateWidth);

    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  return (
    <div className={cn('overflow-hidden', className)}>
      <motion.div
        className="relative flex whitespace-nowrap gap-6" // Added 'whitespace-nowrap' to prevent line breaks within the text content
        animate={{ x: [50, -(screenWidth - 600)] }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
        style={{ willChange: 'transform' }}
      >
        {Children.toArray(children).map((child, index) => (
          <Fragment key={index}>
            <div>
              {child}
            </div>
            <div className='ml-2 border border-l h-8 border-light-green'></div>
          </Fragment>
        ))}
      </motion.div >
    </div >
  );
}

export default BouncingMarquee;
